// Grahsetu backend (starter). Secrets live only in environment variables.
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const {
  PORT = 3000, JWT_SECRET, NODE_ENV = 'development',
  RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET, ADMIN_PHONE
} = process.env;
if (!JWT_SECRET) { console.error('Set JWT_SECRET in .env / environment'); process.exit(1); }
const DEV = NODE_ENV !== 'production';

const db = new Database(process.env.DB_PATH || 'grahsetu.db');
db.exec(`
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, phone TEXT UNIQUE, role TEXT DEFAULT 'user', language TEXT DEFAULT 'hi', created_at TEXT DEFAULT CURRENT_TIMESTAMP, deleted_at TEXT);
CREATE TABLE IF NOT EXISTS otps(phone TEXT PRIMARY KEY, code_hash TEXT, expires INTEGER, tries INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS profiles(id INTEGER PRIMARY KEY, user_id INTEGER, name TEXT, dob TEXT, tob TEXT, place TEXT, lat REAL, lng REAL, tz TEXT, gender TEXT, is_primary INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS plans(id TEXT PRIMARY KEY, name TEXT, interval_days INTEGER, price_inr INTEGER);
CREATE TABLE IF NOT EXISTS payments(id INTEGER PRIMARY KEY, user_id INTEGER, plan_id TEXT, amount_paise INTEGER, status TEXT, order_id TEXT UNIQUE, payment_id TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS subscriptions(id INTEGER PRIMARY KEY, user_id INTEGER, plan_id TEXT, status TEXT, started_at TEXT, expires_at TEXT);
CREATE TABLE IF NOT EXISTS consents(id INTEGER PRIMARY KEY, user_id INTEGER, type TEXT, version TEXT, granted_at TEXT DEFAULT CURRENT_TIMESTAMP);
`);
const seed = db.prepare('INSERT OR IGNORE INTO plans VALUES(?,?,?,?)');
[['monthly', 'Monthly', 30, 149], ['quarterly', 'Quarterly', 90, 399], ['annual', 'Annual', 365, 1299]].forEach(p => seed.run(...p));

const app = express();
app.use(cors());
app.use(express.json({ verify: (req, _res, buf) => { req.rawBody = buf; } }));

const sha = s => crypto.createHash('sha256').update(String(s)).digest('hex');
const sign = u => jwt.sign({ uid: u.id, role: u.role }, JWT_SECRET, { expiresIn: '30d' });
function auth(req, res, next) {
  try {
    const t = (req.headers.authorization || '').replace('Bearer ', '');
    req.user = jwt.verify(t, JWT_SECRET); next();
  } catch { res.status(401).json({ error: 'unauthorized' }); }
}
const adminOnly = (req, res, next) => req.user.role === 'admin' ? next() : res.status(403).json({ error: 'forbidden' });

// ---------- Auth: mobile OTP ----------
app.post('/v1/auth/otp/send', (req, res) => {
  const phone = String(req.body.phone || '').replace(/\D/g, '');
  if (phone.length < 10) return res.status(400).json({ error: 'invalid phone' });
  const code = String(crypto.randomInt(100000, 999999));
  db.prepare('INSERT OR REPLACE INTO otps VALUES(?,?,?,0)').run(phone, sha(code + JWT_SECRET), Date.now() + 5 * 60e3);
  // TODO production: send SMS via a DLT-registered provider. Never return the OTP in production.
  if (DEV) { console.log('DEV OTP for', phone, code); return res.json({ ok: true, dev_otp: code }); }
  res.json({ ok: true });
});

app.post('/v1/auth/otp/verify', (req, res) => {
  const phone = String(req.body.phone || '').replace(/\D/g, '');
  const row = db.prepare('SELECT * FROM otps WHERE phone=?').get(phone);
  if (!row || row.expires < Date.now() || row.tries >= 5) return res.status(400).json({ error: 'otp expired or locked' });
  if (row.code_hash !== sha(String(req.body.code) + JWT_SECRET)) {
    db.prepare('UPDATE otps SET tries=tries+1 WHERE phone=?').run(phone);
    return res.status(400).json({ error: 'wrong otp' });
  }
  db.prepare('DELETE FROM otps WHERE phone=?').run(phone);
  let u = db.prepare('SELECT * FROM users WHERE phone=? AND deleted_at IS NULL').get(phone);
  if (!u) {
    const role = ADMIN_PHONE && ADMIN_PHONE.replace(/\D/g, '') === phone ? 'admin' : 'user';
    const id = db.prepare('INSERT INTO users(phone,role) VALUES(?,?)').run(phone, role).lastInsertRowid;
    u = db.prepare('SELECT * FROM users WHERE id=?').get(id);
  }
  res.json({ token: sign(u), user: { id: u.id, phone: u.phone, role: u.role } });
});

// Google login: verify the ID token server-side (add google-auth-library), then upsert user.
app.post('/v1/auth/google', (_req, res) => res.status(501).json({ error: 'TODO: verify Google ID token with google-auth-library' }));

// ---------- Consent & profiles ----------
app.post('/v1/consents', auth, (req, res) => {
  db.prepare('INSERT INTO consents(user_id,type,version) VALUES(?,?,?)').run(req.user.uid, req.body.type, req.body.version || '1');
  res.json({ ok: true });
});

app.post('/v1/profiles', auth, (req, res) => {
  const b = req.body;
  if (!b.name || !b.dob || !b.place) return res.status(400).json({ error: 'name, dob, place required' });
  const id = db.prepare('INSERT INTO profiles(user_id,name,dob,tob,place,lat,lng,tz,gender) VALUES(?,?,?,?,?,?,?,?,?)')
    .run(req.user.uid, b.name, b.dob, b.tob || null, b.place, b.lat || null, b.lng || null, b.tz || 'Asia/Kolkata', b.gender || null).lastInsertRowid;
  res.json({ id });
});
app.get('/v1/profiles', auth, (req, res) => res.json(db.prepare('SELECT * FROM profiles WHERE user_id=?').all(req.user.uid)));

// ---------- Kundli (engine placeholder) ----------
// Planet positions MUST come from a licensed ephemeris (Swiss Ephemeris or a licensed API). Not invented here.
app.get('/v1/kundli/:profileId', auth, (_req, res) =>
  res.status(501).json({ error: 'Plug in astrology engine in engine.js (Swiss Ephemeris / licensed API)' }));

// ---------- Numerology (real calculation) ----------
const reduce = n => { while (n > 9 && ![11, 22, 33].includes(n)) n = [...String(n)].reduce((a, c) => a + +c, 0); return n; };
const nameNo = s => reduce([...s.toUpperCase().replace(/[^A-Z]/g, '')].reduce((a, c) => a + ((c.charCodeAt(0) - 65) % 9) + 1, 0));
app.post('/v1/numerology', (req, res) => {
  const { name = '', dob = '' } = req.body;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return res.status(400).json({ error: 'dob must be YYYY-MM-DD' });
  res.json({
    life_path: reduce([...dob.replace(/-/g, '')].reduce((a, c) => a + +c, 0)),
    birth_number: reduce(+dob.slice(8)), name_number: nameNo(name),
    disclaimer: 'Astrological/numerological interpretation, not scientific, medical or financial advice.'
  });
});

// ---------- Plans, payments (Razorpay) ----------
app.get('/v1/plans', (_req, res) => res.json(db.prepare('SELECT * FROM plans').all()));

app.post('/v1/payments/order', auth, async (req, res) => {
  const plan = db.prepare('SELECT * FROM plans WHERE id=?').get(req.body.plan_id);
  if (!plan) return res.status(404).json({ error: 'plan not found' });
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) return res.status(500).json({ error: 'Razorpay keys not set' });
  const amount = plan.price_inr * 100;
  const r = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Basic ' + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64') },
    body: JSON.stringify({ amount, currency: 'INR', receipt: `u${req.user.uid}_${Date.now()}` })
  });
  const o = await r.json();
  if (!r.ok) return res.status(502).json({ error: 'razorpay error', detail: o.error && o.error.description });
  db.prepare('INSERT INTO payments(user_id,plan_id,amount_paise,status,order_id) VALUES(?,?,?,?,?)').run(req.user.uid, plan.id, amount, 'created', o.id);
  res.json({ order_id: o.id, amount, currency: 'INR', key_id: RAZORPAY_KEY_ID }); // key_id is public; secret never leaves server
});

function activate(orderId, paymentId) {
  const p = db.prepare('SELECT * FROM payments WHERE order_id=?').get(orderId);
  if (!p || p.status === 'paid') return; // idempotent
  const plan = db.prepare('SELECT * FROM plans WHERE id=?').get(p.plan_id);
  db.prepare("UPDATE payments SET status='paid', payment_id=? WHERE order_id=?").run(paymentId, orderId);
  const start = new Date(), end = new Date(Date.now() + plan.interval_days * 864e5);
  db.prepare("INSERT INTO subscriptions(user_id,plan_id,status,started_at,expires_at) VALUES(?,?,'active',?,?)").run(p.user_id, plan.id, start.toISOString(), end.toISOString());
}

app.post('/v1/payments/verify', auth, (req, res) => {
  const { razorpay_order_id: o, razorpay_payment_id: p, razorpay_signature: s } = req.body;
  const exp = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET || '').update(`${o}|${p}`).digest('hex');
  if (!s || exp.length !== s.length || !crypto.timingSafeEqual(Buffer.from(exp), Buffer.from(s))) return res.status(400).json({ error: 'bad signature' });
  activate(o, p); res.json({ ok: true });
});

// Webhook is the source of truth (handles closed-app payments).
app.post('/v1/payments/webhook', (req, res) => {
  const exp = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET || '').update(req.rawBody || '').digest('hex');
  if (req.headers['x-razorpay-signature'] !== exp) return res.status(400).end();
  if (req.body.event === 'payment.captured') {
    const pay = req.body.payload.payment.entity; activate(pay.order_id, pay.id);
  }
  res.json({ ok: true });
});

app.get('/v1/payments/history', auth, (req, res) =>
  res.json(db.prepare('SELECT id,plan_id,amount_paise,status,created_at FROM payments WHERE user_id=? ORDER BY id DESC').all(req.user.uid)));
app.get('/v1/subscription', auth, (req, res) =>
  res.json(db.prepare("SELECT * FROM subscriptions WHERE user_id=? AND status='active' AND expires_at>? ORDER BY id DESC").get(req.user.uid, new Date().toISOString()) || { status: 'none' }));

// ---------- Privacy: delete account & data ----------
app.delete('/v1/account', auth, (req, res) => {
  const id = req.user.uid;
  db.prepare('DELETE FROM profiles WHERE user_id=?').run(id);
  db.prepare("UPDATE users SET phone='deleted_'||id, deleted_at=CURRENT_TIMESTAMP WHERE id=?").run(id);
  res.json({ ok: true }); // payment records kept only as required for tax/legal compliance
});

// ---------- Admin ----------
app.get('/v1/admin/stats', auth, adminOnly, (_req, res) => res.json({
  users: db.prepare('SELECT COUNT(*) c FROM users WHERE deleted_at IS NULL').get().c,
  paid: db.prepare("SELECT COUNT(*) c, COALESCE(SUM(amount_paise),0)/100 inr FROM payments WHERE status='paid'").get(),
  active_subs: db.prepare("SELECT COUNT(*) c FROM subscriptions WHERE status='active' AND expires_at>?").get(new Date().toISOString()).c
}));

app.get('/health', (_req, res) => res.json({ ok: true }));
// website + installable PWA (flat files, only this allow-list is public)
const PUB = ['index.html', 'manifest.webmanifest', 'sw.js', 'icon.svg', 'icon-192.png', 'icon-512.png'];
app.get('/', (_req, res) => res.sendFile(require('path').join(__dirname, 'index.html')));
app.get('/:f', (req, res, next) => PUB.includes(req.params.f) ? res.sendFile(require('path').join(__dirname, req.params.f)) : next());
app.listen(PORT, () => console.log(`Grahsetu API on :${PORT} (${NODE_ENV})`));
require('./kundli')(app);
