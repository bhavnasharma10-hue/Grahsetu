const path = require('path');
const Astronomy = require('astronomy-engine');

const NAK = 360 / 27, YEAR_MS = 365.25 * 864e5;
const norm = x => ((x % 360) + 360) % 360;
const DASHA = [['Ke', 7], ['Ve', 20], ['Su', 6], ['Mo', 10], ['Ma', 7], ['Ra', 18], ['Ju', 16], ['Sa', 19], ['Me', 17]];
const BODY = { Me: 'Mercury', Ve: 'Venus', Ma: 'Mars', Ju: 'Jupiter', Sa: 'Saturn' };

const julian = d => d.getTime() / 864e5 + 2440587.5;
const lahiri = d => 22.460148 + (julian(d) - 2415020) / 36525 * 1.396042;

function tropLon(id, date) {
  if (id === 'Su') return norm(Astronomy.SunPosition(date).elon);
  if (id === 'Mo') return norm(Astronomy.EclipticGeoMoon(date).lon);
  if (id === 'Ra' || id === 'Ke') {
    const T = (julian(date) - 2451545) / 36525;
    const om = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + T * T * T / 450000;
    return norm(id === 'Ra' ? om : om + 180);
  }
  return norm(Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body[BODY[id]], date, true)).elon);
}

function ascendantTrop(date, lat, lon) {
  const ramc = norm(Astronomy.SiderealTime(date) * 15 + lon) * Math.PI / 180;
  const eps = Astronomy.e_tilt(Astronomy.MakeTime(date)).tobl * Math.PI / 180;
  const phi = lat * Math.PI / 180;
  return norm(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) * 180 / Math.PI);
}

const navSign = lon => { const s = Math.floor(lon / 30), n = Math.floor((lon % 30) / (30 / 9));
  const start = [0, 9, 6, 3][s % 4]; return (start + n) % 12; };

function offsetMin(tz, utcMs) {
  const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
  const p = Object.fromEntries(f.formatToParts(new Date(utcMs)).map(x => [x.type, x.value]));
  return Math.round((Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - utcMs) / 6e4);
}
function localToUtc(tz, y, m, d, h, mi) {
  const naive = Date.UTC(y, m - 1, d, h, mi); let g = naive;
  for (let i = 0; i < 3; i++) g = naive - offsetMin(tz, g) * 6e4;
  return g;
}

function dashas(moonSid, birth) {
  const idx = Math.floor(moonSid / NAK), frac = (moonSid % NAK) / NAK, s0 = idx % 9;
  const out = []; let t = birth.getTime();
  for (let i = 0; i < 10; i++) {
    const [lord, yrs] = DASHA[(s0 + i) % 9];
    const len = i === 0 ? yrs * (1 - frac) : yrs;
    const end = t + len * YEAR_MS;
    const full = end - yrs * YEAR_MS, ants = []; let a = full;
    for (let k = 0; k < 9; k++) {
      const [al, ay] = DASHA[((s0 + i) % 9 + k) % 9];
      const ae = a + yrs * ay / 120 * YEAR_MS;
      if (ae > t) ants.push({ lord: al, start: new Date(Math.max(a, t)).toISOString(), end: new Date(ae).toISOString() });
      a = ae;
    }
    out.push({ lord, start: new Date(t).toISOString(), end: new Date(end).toISOString(), antars: ants });
    t = end;
  }
  return { balanceYears: DASHA[s0][1] * (1 - frac), list: out };
}

function compute({ dob, tob, lat, lon, tz }) {
  const [y, m, d] = dob.split('-').map(Number), [h, mi] = tob.split(':').map(Number);
  const date = new Date(localToUtc(tz, y, m, d, h, mi));
  const ay = lahiri(date);
  const ids = ['Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa', 'Ra', 'Ke'];
  const asc = norm(ascendantTrop(date, lat, lon) - ay), lagna = Math.floor(asc / 30);
  const planets = ids.map(id => {
    const lon_ = norm(tropLon(id, date) - ay), sign = Math.floor(lon_ / 30);
    return { id, lon: lon_, sign, deg: lon_ % 30, house: (sign - lagna + 12) % 12 + 1,
      nak: Math.floor(lon_ / NAK), pada: Math.floor((lon_ % NAK) / (NAK / 4)) + 1, nav: navSign(lon_) };
  });
  const P = Object.fromEntries(planets.map(p => [p.id, p]));
  const navLagna = navSign(asc);
  const dasha = dashas(P.Mo.lon, date);
  const now = Date.now();
  const md = dasha.list.find(x => Date.parse(x.start) <= now && now < Date.parse(x.end));
  const ad = md && md.antars.find(x => Date.parse(x.start) <= now && now < Date.parse(x.end));

  const yogas = [];
  if ([1, 2, 4, 7, 8, 12].includes(P.Ma.house)) yogas.push({ id: 'manglik', house: P.Ma.house });
  if ([0, 3, 6, 9].includes((P.Ju.sign - P.Mo.sign + 12) % 12)) yogas.push({ id: 'gajakesari' });
  if (P.Su.sign === P.Me.sign) yogas.push({ id: 'budhaditya' });
  if (P.Mo.sign === P.Ma.sign) yogas.push({ id: 'chandramangal' });
  const own = { Ma: [0, 7, 9], Me: [2, 5], Ju: [8, 11, 3], Ve: [1, 6, 11], Sa: [9, 10, 6] };
  const pm = { Ma: 'ruchaka', Me: 'bhadra', Ju: 'hamsa', Ve: 'malavya', Sa: 'shasha' };
  Object.keys(pm).forEach(k => { if (own[k].includes(P[k].sign) && [1, 4, 7, 10].includes(P[k].house)) yogas.push({ id: pm[k] }); });
  const rel = ['Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa'].map(k => norm(P[k].lon - P.Ra.lon));
  if (rel.every(x => x < 180) || rel.every(x => x > 180)) yogas.push({ id: 'kaalsarp' });
  const satNow = Math.floor(norm(tropLon('Sa', new Date()) - lahiri(new Date())) / 30);
  const diff = (satNow - P.Mo.sign + 12) % 12;
  const sade = [11, 0, 1].includes(diff) ? { phase: diff === 11 ? 1 : diff === 0 ? 2 : 3 } : null;

  return { ayanamsa: ay, utc: date.toISOString(), lagna, lagnaDeg: asc % 30, navLagna, planets, dasha: { balanceYears: dasha.balanceYears, list: dasha.list, current: md ? { maha: md.lord, mahaEnd: md.end, antar: ad && ad.lord, antarEnd: ad && ad.end } : null }, yogas, sadeSati: sade };
}

const geoCache = new Map(), hits = new Map();
async function geocode(place) {
  const k = place.toLowerCase();
  if (geoCache.has(k)) return geoCache.get(k);
  const r = await fetch('https://geocoding-api.open-meteo.com/v1/search?count=5&language=en&format=json&name=' + encodeURIComponent(place));
  const j = await r.json();
  const list = j.results || [];
  const g = list.find(x => x.country_code === 'IN') || list[0];
  if (!g) return null;
  const out = { lat: g.latitude, lon: g.longitude, tz: g.timezone || 'Asia/Kolkata', label: [g.name, g.admin1, g.country].filter(Boolean).join(', ') };
  geoCache.set(k, out); return out;
}

module.exports = function (app) {
  app.get('/kundli-ui.js', (_q, res) => res.sendFile(path.join(__dirname, 'kundli-ui.js')));
  app.post('/v1/kundli', async (req, res) => {
    try {
      const ip = String(req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim();
      const hr = Math.floor(Date.now() / 36e5), key = ip + hr;
      hits.set(key, (hits.get(key) || 0) + 1);
      if (hits.size > 5000) hits.clear();
      if (hits.get(key) > 60) return res.status(429).json({ error: 'Too many requests, try later' });
      const b = req.body || {};
      if (!/^\d{4}-\d{2}-\d{2}$/.test(b.dob || '') || !/^\d{2}:\d{2}$/.test(b.tob || '') || !b.place)
        return res.status(400).json({ error: 'dob (YYYY-MM-DD), tob (HH:MM) and place required' });
      const yr = +b.dob.slice(0, 4);
      if (yr < 1900 || yr > 2100) return res.status(400).json({ error: 'year must be 1900-2100' });
      const g = await geocode(String(b.place).slice(0, 80));
      if (!g) return res.status(404).json({ error: 'place not found. Try "City, State"' });
      const out = compute({ dob: b.dob, tob: b.tob, lat: g.lat, lon: g.lon, tz: g.tz });
      res.json({ ok: true, place: g.label, lat: g.lat, lon: g.lon, tz: g.tz, ...out });
    } catch (e) { console.error('kundli error', e); res.status(500).json({ error: 'calculation failed' }); }
  });
};
