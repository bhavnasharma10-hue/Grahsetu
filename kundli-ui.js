(function(){
var SG=[['Aries','मेष'],['Taurus','वृषभ'],['Gemini','मिथुन'],['Cancer','कर्क'],['Leo','सिंह'],['Virgo','कन्या'],['Libra','तुला'],['Scorpio','वृश्चिक'],['Sagittarius','धनु'],['Capricorn','मकर'],['Aquarius','कुंभ'],['Pisces','मीन']];
var NK=[['Ashwini','अश्विनी'],['Bharani','भरणी'],['Krittika','कृत्तिका'],['Rohini','रोहिणी'],['Mrigashira','मृगशिरा'],['Ardra','आर्द्रा'],['Punarvasu','पुनर्वसु'],['Pushya','पुष्य'],['Ashlesha','आश्लेषा'],['Magha','मघा'],['Purva Phalguni','पूर्वा फाल्गुनी'],['Uttara Phalguni','उत्तरा फाल्गुनी'],['Hasta','हस्त'],['Chitra','चित्रा'],['Swati','स्वाति'],['Vishakha','विशाखा'],['Anuradha','अनुराधा'],['Jyeshtha','ज्येष्ठा'],['Mula','मूल'],['Purva Ashadha','पूर्वाषाढ़ा'],['Uttara Ashadha','उत्तराषाढ़ा'],['Shravana','श्रवण'],['Dhanishta','धनिष्ठा'],['Shatabhisha','शतभिषा'],['Purva Bhadrapada','पूर्वा भाद्रपद'],['Uttara Bhadrapada','उत्तरा भाद्रपद'],['Revati','रेवती']];
var PN={Su:['Sun','सूर्य'],Mo:['Moon','चंद्र'],Ma:['Mars','मंगल'],Me:['Mercury','बुध'],Ju:['Jupiter','गुरु'],Ve:['Venus','शुक्र'],Sa:['Saturn','शनि'],Ra:['Rahu','राहु'],Ke:['Ketu','केतु']};
var DL=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
var TR=[['courage and initiative','साहस और पहल'],['stability and love of beauty','स्थिरता और सौंदर्य-प्रेम'],['curiosity and communication','जिज्ञासा और संवाद'],['sensitivity and care','भावुकता और देखभाल'],['confidence and leadership','आत्मविश्वास और नेतृत्व'],['analysis and service','विश्लेषण और सेवा'],['balance and cooperation','संतुलन और सहयोग'],['depth and determination','गहराई और दृढ़ता'],['optimism and search for wisdom','आशावाद और ज्ञान की खोज'],['discipline and patience','अनुशासन और धैर्य'],['originality and humanity','मौलिकता और मानवता'],['imagination and compassion','कल्पना और करुणा']];
var YG={
manglik:['Mars is in house {h} from the Lagna. Traditionally this is called a Manglik placement and is considered in marriage matching.','मंगल लग्न से {h}वें भाव में है। परंपरा में इसे मांगलिक स्थिति कहते हैं और विवाह-मिलान में देखा जाता है।'],
gajakesari:['Jupiter is in a kendra from the Moon (Gajakesari yoga), traditionally linked with respect and good judgement.','गुरु चंद्र से केंद्र में है (गजकेसरी योग), जिसे परंपरा में सम्मान और विवेक से जोड़ा जाता है।'],
budhaditya:['Sun and Mercury share a sign (Budhaditya yoga), traditionally linked with intellect and speech.','सूर्य और बुध एक ही राशि में हैं (बुधादित्य योग), जिसे बुद्धि और वाणी से जोड़ा जाता है।'],
chandramangal:['Moon and Mars share a sign (Chandra-Mangal yoga), traditionally linked with drive towards earning.','चंद्र और मंगल एक ही राशि में हैं (चंद्र-मंगल योग), जिसे धन-प्रयास से जोड़ा जाता है।'],
ruchaka:['Ruchaka yoga (Pancha Mahapurusha, Mars): traditionally linked with courage and drive.','रुचक योग (पंच महापुरुष, मंगल): परंपरा में साहस और ऊर्जा से जुड़ा।'],
bhadra:['Bhadra yoga (Pancha Mahapurusha, Mercury): traditionally linked with intellect and communication.','भद्र योग (पंच महापुरुष, बुध): परंपरा में बुद्धि और संवाद से जुड़ा।'],
hamsa:['Hamsa yoga (Pancha Mahapurusha, Jupiter): traditionally linked with wisdom and ethics.','हंस योग (पंच महापुरुष, गुरु): परंपरा में ज्ञान और नैतिकता से जुड़ा।'],
malavya:['Malavya yoga (Pancha Mahapurusha, Venus): traditionally linked with comfort and artistic taste.','मालव्य योग (पंच महापुरुष, शुक्र): परंपरा में सुख और कला-रुचि से जुड़ा।'],
shasha:['Shasha yoga (Pancha Mahapurusha, Saturn): traditionally linked with discipline and perseverance.','शश योग (पंच महापुरुष, शनि): परंपरा में अनुशासन और परिश्रम से जुड़ा।'],
kaalsarp:['All seven planets lie on one side of the Rahu-Ketu axis. Astrologers differ on what this means; there is no need for fear.','सातों ग्रह राहु-केतु अक्ष के एक ओर हैं। इसके अर्थ पर ज्योतिषियों में मतभेद हैं; डरने की आवश्यकता नहीं।']};
var KD=null,KDK='',KDL=false,KDE='',CH='N';
function kk(){return [U.dob,U.tob,U.place].join('|')}
function hi(){return L=='hi'}
function sgn(i){return SG[i][hi()?1:0]}
function pn(id){return PN[id][hi()?1:0]}
function fd(s){return new Date(s).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}
function loadK(){
 if(KDL||(KDE&&KDK==kk()))return;
 KDL=true;KDE='';KDK=kk();var key=KDK;
 fetch('/v1/kundli',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({dob:U.dob,tob:U.tob,place:U.place})})
 .then(function(r){return r.json()}).then(function(d){KDL=false;if(d.ok){d._k=key;KD=d}else KDE=d.error||'Error';draw()})
 .catch(function(){KDL=false;KDE=hi()?'सर्वर से जुड़ नहीं पाया':'Could not reach server';draw()})}
function gate(fn){
 if(KD&&KD._k==kk())return fn(KD);
 if(KDE&&KDK==kk())return '<h2>'+t('kundli')+'</h2><div class="card">⚠ '+KDE+'<p class="mu">'+(hi()?'जन्म स्थान "शहर, राज्य" लिखें (जैसे Pune, Maharashtra)।':'Write birthplace as "City, State" (e.g. Pune, Maharashtra).')+'</p><button class="pri" onclick="HAS=false;go(\'birth\')">✎</button> <button class="btn" onclick="KDE=\'\';draw()">↻</button></div>';
 loadK();
 return '<h2>'+t('kundli')+'</h2><div class="card">⏳ '+(hi()?'आपकी कुंडली की गणना हो रही है…':'Calculating your Kundli…')+'</div>'}
function lab(list,x,y){var o='',i,c=0;for(i=0;i<list.length;i+=3){o+='<text x="'+x+'" y="'+(y+c*13)+'" text-anchor="middle" font-size="11" fill="var(--tx)">'+list.slice(i,i+3).join(' ')+'</text>';c++}return o}
function chartSVG(d,nav){
 var lag=nav?d.navLagna:d.lagna,by={};
 d.planets.forEach(function(p){var s=nav?p.nav:p.sign;(by[s]=by[s]||[]).push(p.id)});
 var o='<svg viewBox="0 0 300 300" width="100%" style="max-width:340px;display:block;margin:auto"><g fill="none" stroke="var(--ac)" stroke-width="1.5">';
 if(CH=='N'){
  o+='<rect x="5" y="5" width="290" height="290"/><path d="M5 5L295 295M295 5L5 295M150 5L295 150L150 295L5 150Z"/></g>';
  var pos=[[150,70],[75,28],[35,70],[75,145],[35,222],[75,262],[150,222],[225,262],[265,222],[225,145],[265,70],[225,28]];
  pos.forEach(function(p,h){var s=(lag+h)%12,l=(by[s]||[]).slice();if(h==0)l.unshift('Asc');
   o+='<text x="'+p[0]+'" y="'+p[1]+'" text-anchor="middle" font-size="10" fill="var(--mu)">'+(s+1)+'</text>'+lab(l,p[0],p[1]+13)})
 }else{
  o+='<rect x="5" y="5" width="290" height="290"/><path d="M80 5V295M155 5V295M230 5V295M5 80H295M5 155H295M5 230H295"/></g>';
  var cell={11:[0,0],0:[1,0],1:[2,0],2:[3,0],3:[3,1],4:[3,2],5:[3,3],6:[2,3],7:[1,3],8:[0,3],9:[0,2],10:[0,1]};
  for(var s in cell){var c=cell[s],x=c[0]*75+42,y=c[1]*75+22,l=(by[s]||[]).slice();if(+s==lag)l.unshift('Asc');
   o+='<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="9" fill="var(--mu)">'+SG[s][0].slice(0,3)+'</text>'+lab(l,x,y+14)}
 }
 return o+'</svg>'}
function dashaHtml(d){
 var c=d.dasha.current,o='<div class="card"><h3>Vimshottari Dasha</h3>';
 if(c)o+='<p><b>'+(hi()?'अभी: ':'Now: ')+pn(c.maha)+' → '+pn(c.antar)+'</b><br><span class="mu">'+(hi()?'महादशा समाप्त: ':'Mahadasha ends: ')+fd(c.mahaEnd)+' · '+(hi()?'अंतर्दशा समाप्त: ':'Antardasha ends: ')+fd(c.antarEnd)+'</span></p>';
 o+='<div class="scroll"><table>'+d.dasha.list.map(function(m){return '<tr><td><b>'+pn(m.lord)+'</b></td><td>'+fd(m.start)+'</td><td>'+fd(m.end)+'</td></tr>'}).join('')+'</table></div></div>';
 return o}
function yogaHtml(d){
 var o='<div class="card"><h3>'+(hi()?'योग और दोष (परंपरागत व्याख्या)':'Yogas and doshas (traditional interpretation)')+'</h3>';
 d.yogas.forEach(function(y){var t0=YG[y.id][hi()?1:0].replace('{h}',y.house||'');o+='<p>• '+t0+'</p>'});
 if(d.sadeSati)o+='<p>• '+(hi()?'साढ़ेसाती चरण '+d.sadeSati.phase+': शनि अभी आपकी चंद्र राशि के आसपास है; परंपरा में इसे धैर्य और अनुशासन का समय माना जाता है।':'Sade Sati phase '+d.sadeSati.phase+': Saturn is currently around your Moon sign, traditionally seen as a time for patience and discipline.')+'</p>';
 if(!d.yogas.length&&!d.sadeSati)o+='<p class="mu">'+(hi()?'कोई प्रमुख योग/दोष इस सूची में नहीं मिला।':'No major yoga or dosha from this checklist.')+'</p>';
 return o+'<p class="mu">'+(hi()?'यह ज्योतिषीय व्याख्या है, वैज्ञानिक या चिकित्सीय सलाह नहीं।':'This is an astrological interpretation, not scientific or medical advice.')+'</p></div>'}
function basics(d){
 var mo=d.planets[1];
 return '<div class="card"><table>'+[
  [hi()?'लग्न':'Lagna (Ascendant)',sgn(d.lagna)+' '+d.lagnaDeg.toFixed(1)+'°'],
  [hi()?'चंद्र राशि':'Moon sign (Rashi)',sgn(mo.sign)],
  [hi()?'नक्षत्र / पद':'Nakshatra / Pada',NK[mo.nak][hi()?1:0]+' / '+mo.pada],
  [hi()?'नक्षत्र स्वामी':'Nakshatra lord',pn(DL[mo.nak%9])],
  [hi()?'जन्म स्थान':'Birthplace',d.place],
  [hi()?'अयनांश':'Ayanamsa','Lahiri '+d.ayanamsa.toFixed(2)+'°']
 ].map(function(r){return '<tr><td>'+r[0]+'</td><td><b>'+r[1]+'</b></td></tr>'}).join('')+'</table></div>'}
function planetsHtml(d){
 return '<div class="card scroll"><h3>'+(hi()?'ग्रह स्थिति':'Planets')+'</h3><table><tr><th></th><th>'+(hi()?'राशि':'Sign')+'</th><th>°</th><th>'+(hi()?'भाव':'House')+'</th><th>'+t('nak')+'</th></tr>'+
 d.planets.map(function(p){return '<tr><td>'+pn(p.id)+'</td><td>'+sgn(p.sign)+'</td><td>'+p.deg.toFixed(1)+'</td><td>'+p.house+'</td><td>'+NK[p.nak][hi()?1:0]+' '+p.pada+'</td></tr>'}).join('')+'</table></div>'}
function toggle(){return '<div class="row noprint" style="margin:8px 0"><button class="btn" onclick="CH=\'N\';draw()">'+(hi()?'उत्तर भारतीय':'North Indian')+'</button><button class="btn" onclick="CH=\'S\';draw()">'+(hi()?'दक्षिण भारतीय':'South Indian')+'</button></div>'}
function charts(d){return toggle()+'<div class="card"><h3>'+(hi()?'जन्म कुंडली (लग्न)':'Birth chart (Lagna)')+'</h3>'+chartSVG(d,false)+'</div><div class="card"><h3>'+(hi()?'नवांश कुंडली':'Navamsa chart')+'</h3>'+chartSVG(d,true)+'</div>'}
V.kundli=function(){return gate(function(d){
 return '<h2>'+t('kundli')+' — '+U.name+' <a href="#" onclick="HAS=false;go(\'birth\');return false" style="color:var(--ac)">✎</a></h2><div class="mu">'+U.dob+' · '+U.tob+' · '+d.place+'</div>'+
 basics(d)+charts(d)+planetsHtml(d)+dashaHtml(d)+yogaHtml(d)+
 '<button class="pri noprint" onclick="go(\'report\')">📜 '+(hi()?'पूरी रिपोर्ट (PDF)':'Full report (PDF)')+'</button>'})};
V.report=function(){return gate(function(d){
 var mo=d.planets[1];
 var rem=hi()?['अपनी पसंद के मंत्र का शांत मन से जप','प्रतिदिन 10 मिनट ध्यान','ज़रूरतमंद की सहायता या दान','दीप जलाकर कृतज्ञता प्रकट करना']:['Chant a mantra you feel connected to, calmly','10 minutes of meditation each day','Help someone in need or offer charity','Light a diya and express gratitude'];
 return '<h2>'+(hi()?'कुंडली रिपोर्ट':'Kundli Report')+'</h2><div class="card"><b>'+U.name+'</b><div class="mu">'+U.dob+' · '+U.tob+' · '+d.place+'</div></div>'+basics(d)+
 '<div class="card"><h3>'+(hi()?'सार':'Summary')+'</h3><p>'+(hi()?'लग्न '+sgn(d.lagna)+': परंपरा में बाहरी व्यक्तित्व में '+TR[d.lagna][1]+' से जोड़ा जाता है। चंद्र राशि '+sgn(mo.sign)+': मन और भावनाओं में '+TR[mo.sign][1]+' से जोड़ा जाता है।':'Lagna '+sgn(d.lagna)+': traditionally linked in outer personality with '+TR[d.lagna][0]+'. Moon sign '+sgn(mo.sign)+': traditionally linked in mind and emotions with '+TR[mo.sign][0]+'.')+'</p></div>'+
 charts(d)+planetsHtml(d)+dashaHtml(d)+yogaHtml(d)+
 '<div class="card"><h3>'+t('rem')+'</h3>'+rem.map(function(x){return '<p>• '+x+'</p>'}).join('')+'</div>'+
 '<div class="card mu">'+t('disc')+'</div><button class="pri noprint" onclick="window.print()">🖨️ '+(hi()?'PDF सेव / प्रिंट':'Save as PDF / Print')+'</button>'})};
var _h=V.home;
V.home=function(){
 var o=_h();
 if(!HAS)return o;
 if(KD&&KD._k==kk()){var mo=KD.planets[1];
  o=o.replace(/<div class="card row"><div style="font-size:34px">🌙<\/div>[\s\S]*?<\/div><\/div><\/div>/,'<div class="card row"><div style="font-size:34px">🌙</div><div><b>'+t('moon')+': '+sgn(mo.sign)+'</b><div class="mu">'+t('nak')+': '+NK[mo.nak][hi()?1:0]+', '+(hi()?'पद ':'Pada ')+mo.pada+' · '+(hi()?'लग्न ':'Lagna ')+sgn(KD.lagna)+'</div></div></div>')}
 else loadK();
 return o};
var _r=V.rep;
V.rep=function(){return '<div class="card"><b>📜 '+(hi()?'मुफ़्त कुंडली रिपोर्ट':'Free Kundli Report')+'</b><div class="mu">'+(hi()?'आपके जन्म-विवरण से, PDF के रूप में सेव करें':'From your birth details, save as PDF')+'</div><button class="pri" style="margin-top:8px" onclick="go(\'report\')">'+(hi()?'रिपोर्ट देखें':'View report')+'</button></div>'+_r()};
var st=document.createElement('style');
st.textContent='@media print{nav,.top,.noprint,.disc{display:none!important}:root:root:root{--bg:#fff;--card:#fff;--tx:#000;--mu:#555;--bd:#ccc;--ac:#8a4a10;--ac2:#3b2275}body{background:#fff}.card{break-inside:avoid}}';
document.head.appendChild(st);
draw();
})();
