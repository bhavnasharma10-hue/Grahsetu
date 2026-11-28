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

(function(){
var SGN=[['Aries','मेष'],['Taurus','वृषभ'],['Gemini','मिथुन'],['Cancer','कर्क'],['Leo','सिंह'],['Virgo','कन्या'],['Libra','तुला'],['Scorpio','वृश्चिक'],['Sagittarius','धनु'],['Capricorn','मकर'],['Aquarius','कुंभ'],['Pisces','मीन']];
var SL=['Ma','Ve','Me','Mo','Su','Me','Ve','Ma','Ju','Sa','Sa','Ju'];
var PNM={Su:['Sun','सूर्य'],Mo:['Moon','चंद्र'],Ma:['Mars','मंगल'],Me:['Mercury','बुध'],Ju:['Jupiter','गुरु'],Ve:['Venus','शुक्र'],Sa:['Saturn','शनि'],Ra:['Rahu','राहु'],Ke:['Ketu','केतु']};
var PT={Su:['authority, confidence and recognition','अधिकार, आत्मविश्वास और पहचान'],Mo:['emotions, public dealings and care','भावनाएँ, जनसंपर्क और देखभाल'],Ma:['energy, courage and drive','ऊर्जा, साहस और पहल'],Me:['communication, business sense and learning','संवाद, व्यापारिक समझ और सीखना'],Ju:['wisdom, growth and guidance','ज्ञान, विकास और मार्गदर्शन'],Ve:['relationships, comfort and the arts','संबंध, सुख और कला'],Sa:['discipline, patience and long-term effort','अनुशासन, धैर्य और दीर्घकालीन परिश्रम'],Ra:['ambition, unconventional paths and sudden change','महत्वाकांक्षा, अलग राह और अचानक बदलाव'],Ke:['detachment, research and inner focus','वैराग्य, शोध और आंतरिक ध्यान']};
var HM={1:['self and vitality','स्वयं और जीवन-शक्ति'],2:['family and savings','परिवार और बचत'],4:['home, mind and learning foundations','घर, मन और शिक्षा की नींव'],5:['intellect and higher studies','बुद्धि और उच्च अध्ययन'],6:['daily work, service and wellness habits','दैनिक कार्य, सेवा और स्वास्थ्य की आदतें'],7:['partnership and marriage','साझेदारी और विवाह'],9:['fortune, higher learning and long journeys','भाग्य, उच्च शिक्षा और लंबी यात्राएँ'],10:['career and public standing','करियर और सामाजिक स्थान'],11:['gains and networks','लाभ और संपर्क'],12:['foreign lands and letting go','विदेश और त्याग']};
var TP={career:{h:[10,6],n:['career','करियर']},marriage:{h:[7,2],n:['marriage and relationships','विवाह और संबंध']},finance:{h:[2,11],n:['finance','धन']},education:{h:[5,4],n:['education','शिक्षा']},travel:{h:[9,12],n:['travel','यात्रा']},health:{h:[1,6],n:['health and wellness','स्वास्थ्य और कल्याण']},general:{h:[1,5],n:['life in general','सामान्य जीवन']}};
var RX={distress:/suicide|kill myself|end my life|want to die|आत्महत्या|मरना चाहत|जीना नहीं/i,career:/career|job|business|work|profession|promotion|नौकरी|करियर|व्यापार|कारोबार|रोज़गार|रोजगार/i,marriage:/marri|wedding|love|relationship|partner|spouse|विवाह|शादी|प्रेम|रिश्त|जीवनसाथी/i,finance:/money|finance|wealth|income|invest|धन|पैसा|पैसे|कमाई|निवेश/i,education:/educat|study|exam|school|college|student|शिक्षा|पढ़ाई|परीक्षा/i,travel:/travel|abroad|foreign|visa|यात्रा|विदेश/i,health:/health|wellness|sleep|स्वास्थ्य|सेहत|नींद/i,num:/numerolog|life path|अंकज्योतिष|मूलांक/i};
function hi(){return L=='hi'}
function i18(a){return a[hi()?1:0]}
function red(n){while(n>9&&n!=11&&n!=22&&n!=33)n=String(n).split('').reduce(function(a,b){return a+ +b},0);return n}
function red9(n){while(n>9)n=String(n).split('').reduce(function(a,b){return a+ +b},0);return n}
function lt(s){return s.toUpperCase().replace(/[^A-Z]/g,'').split('').reduce(function(a,c){return a+((c.charCodeAt(0)-65)%9)+1},0)}
var NI={1:['leadership, independence and initiative','नेतृत्व, स्वतंत्रता और पहल'],2:['cooperation, sensitivity and diplomacy','सहयोग, संवेदनशीलता और कूटनीति'],3:['creativity, expression and optimism','रचनात्मकता, अभिव्यक्ति और आशावाद'],4:['discipline, practicality and steadiness','अनुशासन, व्यावहारिकता और स्थिरता'],5:['freedom, curiosity and adaptability','स्वतंत्रता, जिज्ञासा और अनुकूलन'],6:['care, responsibility and harmony','देखभाल, ज़िम्मेदारी और सामंजस्य'],7:['reflection, study and inner search','चिंतन, अध्ययन और आत्म-खोज'],8:['ambition, management and material achievement','महत्वाकांक्षा, प्रबंधन और भौतिक उपलब्धि'],9:['compassion, idealism and completion','करुणा, आदर्श और पूर्णता'],11:['intuition and inspiration (master number)','अंतर्ज्ञान और प्रेरणा (मास्टर नंबर)'],22:['building on a large scale (master number)','बड़े स्तर पर निर्माण (मास्टर नंबर)'],33:['devoted service and teaching (master number)','समर्पित सेवा और शिक्षण (मास्टर नंबर)']};
var NN='';
V.num=function(){
 var nm=NN||U.name,d=(U.dob||'').split('-').map(Number);
 var ok=/[A-Za-z]/.test(nm);
 var lp=red(red(d[0])+red(d[1])+red(d[2])),bn=red9(d[2]),first=nm.trim().split(/\s+/)[0]||'';
 var dn=red(lt(nm)),na=red(lt(first));
 var rows=[[hi()?'जीवन पथ संख्या':'Life Path',lp],[hi()?'भाग्य/अभिव्यक्ति संख्या':'Destiny / Expression',dn],[hi()?'जन्म संख्या (मूलांक)':'Birth Number',bn],[hi()?'नाम संख्या (पहला नाम)':'Name Number (first name)',na]];
 return '<h2>'+t('num')+'</h2><div class="card"><label class="mu">'+(hi()?'पूरा नाम (अंग्रेज़ी अक्षरों में)':'Full name (English letters)')+'</label><input id="nmx" value="'+nm.replace(/"/g,'&quot;')+'"><div class="mu">'+(hi()?'जन्म तिथि: ':'Date of birth: ')+U.dob+'</div><button class="pri" style="margin-top:8px" onclick="NNset()">'+t('calc')+'</button>'+(ok?'':'<p class="mu">⚠ '+(hi()?'नाम अंग्रेज़ी में लिखें, तभी नाम की संख्या निकलेगी।':'Write the name in English letters to get name numbers.')+'</p>')+'</div>'+
 '<div class="grid" style="grid-template-columns:1fr 1fr">'+rows.map(function(r){return '<div class="tile"><b>'+r[1]+'</b>'+r[0]+'</div>'}).join('')+'</div>'+
 rows.map(function(r){return '<div class="card"><h3>'+r[0]+' '+r[1]+'</h3><p>'+(hi()?'अंकज्योतिष में यह संख्या परंपरागत रूप से ':'In numerology this number is traditionally linked with ')+i18(NI[r[1]])+(hi()?' से जोड़ी जाती है।':'.')+'</p></div>'}).join('')+
 '<div class="mu">'+(hi()?'गणना पाइथागोरियन विधि से है। यह मनोरंजन और व्यक्तिगत मार्गदर्शन के लिए व्याख्या है।':'Calculated with the Pythagorean method. Interpretation is for entertainment and personal guidance.')+'</div>'};
window.NNset=function(){NN=document.getElementById('nmx').value;draw()};
var JK=null,JKK='',JL=false,JE=false;
function kk(){return [U.dob,U.tob,U.place].join('|')}
function ensure(cb){
 if(JK&&JKK==kk())return cb(JK);
 if(JL)return setTimeout(function(){ensure(cb)},700);
 JL=true;var key=kk();
 fetch('/v1/kundli',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({dob:U.dob,tob:U.tob,place:U.place})})
 .then(function(r){return r.json()}).then(function(d){JL=false;if(d.ok){JK=d;JKK=key;cb(d)}else cb(null)}).catch(function(){JL=false;cb(null)})}
function sn(i){return SGN[i][hi()?1:0]}
function pl(id){return PNM[id][hi()?1:0]}
function fd(s){return new Date(s).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}
function houseLine(d,h){
 var sign=(d.lagna+h-1)%12,lord=SL[sign],lp=d.planets.filter(function(p){return p.id==lord})[0],occ=d.planets.filter(function(p){return p.house==h}).map(function(p){return pl(p.id)});
 var s=hi()?'भाव '+h+' ('+i18(HM[h])+') '+sn(sign)+' राशि में है, जिसका स्वामी '+pl(lord)+' भाव '+lp.house+' में है।':'House '+h+' ('+i18(HM[h])+') falls in '+sn(sign)+', ruled by '+pl(lord)+', which sits in house '+lp.house+'.';
 if(occ.length)s+=hi()?' यहाँ '+occ.join(', ')+' स्थित हैं।':' '+occ.join(', ')+(occ.length>1?' are':' is')+' placed here.';
 return {t:s,lord:lord}}
function answer(q,d){
 var tp='general';
 if(RX.distress.test(q))return hi()?'आपकी बात मैंने सुनी। अभी भविष्यवाणी का समय नहीं है। कृपया किसी भरोसेमंद व्यक्ति से बात करें या अपने शहर की हेल्पलाइन/डॉक्टर से तुरंत संपर्क करें। आप अकेली/अकेले नहीं हैं।':'I hear you. This is not a moment for predictions. Please talk to someone you trust or contact a local helpline or doctor right away. You are not alone.';
 if(RX.num.test(q)){var d0=U.dob.split('-').map(Number);var lp=red(red(d0[0])+red(d0[1])+red(d0[2]));return (hi()?'आपकी जीवन पथ संख्या '+lp+' है, जिसे अंकज्योतिष में परंपरागत रूप से '+i18(NI[lp])+' से जोड़ा जाता है। पूरा विवरण अंकज्योतिष टैब में है।':'Your Life Path number is '+lp+', traditionally linked in numerology with '+i18(NI[lp])+'. Full details are in the Numerology tab.')}
 ['career','marriage','finance','education','travel','health'].forEach(function(k){if(tp=='general'&&RX[k].test(q))tp=k});
 var T=TP[tp],pre=hi()?'आपकी कुंडली के अनुसार, '+i18(T.n)+' के बारे में: ':'According to your astrological chart, regarding '+i18(T.n)+': ';
 if(!d)return pre+(hi()?'कुंडली की गणना अभी नहीं हो पाई। कृपया जन्म-विवरण (शहर, राज्य) जाँचें और फिर पूछें।':'the chart could not be calculated right now. Please check your birth details (City, State) and ask again.');
 var lines=[],lords=[];
 T.h.forEach(function(h){var o=houseLine(d,h);lines.push(o.t);lords.push(o.lord)});
 var lord=lords[0],o=pre+lines.join(' ')+' ';
 o+=hi()?'परंपरा में '+pl(lord)+' को '+i18(PT[lord])+' से जोड़ा जाता है, इसलिए इस क्षेत्र में ये गुण दिख सकते हैं। ':'Traditionally '+pl(lord)+' is associated with '+i18(PT[lord])+', so these qualities may show up in this area. ';
 var c=d.dasha.current;
 if(c)o+=hi()?'अभी आप '+pl(c.maha)+' महादशा और '+pl(c.antar)+' अंतर्दशा में हैं (अंतर्दशा '+fd(c.antarEnd)+' तक)। ज्योतिष में '+pl(c.maha)+' को '+i18(PT[c.maha])+' से जोड़ा जाता है। ':'You are currently in the '+pl(c.maha)+' Mahadasha and '+pl(c.antar)+' Antardasha (Antardasha until '+fd(c.antarEnd)+'). Astrology traditionally links '+pl(c.maha)+' with '+i18(PT[c.maha])+'. ';
 if(tp=='health')o+=hi()?'यह केवल सामान्य जीवन-शैली का ज्योतिषीय चिंतन है, चिकित्सीय सलाह नहीं। स्वास्थ्य के लिए डॉक्टर से मिलें। ':'This is only a general lifestyle reflection, not medical advice. Please consult a doctor for health concerns. ';
 if(tp=='finance'||tp=='career')o+=hi()?'वित्तीय या पेशेवर निर्णय योग्य सलाहकार से परामर्श के बाद लें। ':'Please take financial or professional decisions after advice from a qualified professional. ';
 o+=hi()?'सरल, परंपरागत उपाय: शांत मन से मंत्र-जप, रोज़ कुछ देर ध्यान, और ज़रूरतमंद की मदद। ये संकेत मात्र हैं, निश्चित भविष्यवाणी नहीं।':'Simple traditional practices: calm mantra chanting, a little daily meditation, and helping someone in need. These are indications only, not certain predictions.';
 return o}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\n/g,'<br>')}
V.ai=function(){
 var chips=[['career',hi()?'करियर':'Career'],['marriage',hi()?'विवाह':'Marriage'],['finance',hi()?'धन':'Finance'],['education',hi()?'शिक्षा':'Education'],['travel',hi()?'यात्रा':'Travel'],['health',hi()?'स्वास्थ्य':'Health']];
 return '<h2>🪔 '+t('ai')+'</h2><div class="row" style="flex-wrap:wrap;margin-bottom:6px">'+chips.map(function(c){return '<button class="btn" onclick="askQ(\''+(hi()?{career:'मेरा करियर कैसा रहेगा?',marriage:'विवाह के बारे में बताइए',finance:'धन के बारे में बताइए',education:'शिक्षा के बारे में बताइए',travel:'यात्रा के बारे में बताइए',health:'स्वास्थ्य के बारे में बताइए'}[c[0]]:{career:'Tell me about my career',marriage:'Tell me about marriage',finance:'Tell me about finance',education:'Tell me about education',travel:'Tell me about travel',health:'Tell me about health'}[c[0]])+'\')">'+c[1]+'</button>'}).join('')+'</div>'+
 '<div class="card" id="chat" style="height:46vh;overflow:auto">'+(hist.length?'':'<div class="msg bot">'+(hi()?'नमस्ते '+U.name+'! आपकी कुंडली के आधार पर करियर, विवाह, धन, शिक्षा, यात्रा या स्वास्थ्य के बारे में पूछिए।':'Namaste '+U.name+'! Ask about career, marriage, finance, education, travel or health, based on your chart.')+'</div>')+hist.map(function(m){return '<div class="msg '+m[0]+'">'+m[1]+'</div>'}).join('')+'</div>'+
 '<div class="row"><input id="q" placeholder="'+t('ask')+'" onkeydown="if(event.key==\'Enter\')sendQ()"><button class="btn" onclick="sendQ()">'+t('send')+'</button></div><div class="mu">'+(hi()?'जवाब आपकी असली कुंडली की गणना और पारंपरिक नियमों पर आधारित हैं। यह निश्चित भविष्यवाणी नहीं है।':'Replies use your calculated chart and traditional rules. They are interpretations, not certain predictions.')+'</div>'};
window.askQ=function(q){document.getElementById('q').value=q;sendQ()};
window.sendQ=function(){
 var el=document.getElementById('q'),q=el.value.trim();if(!q)return;
 hist.push(['me',esc(q)],['bot','…']);var i=hist.length-1;draw();
 ensure(function(d){hist[i]=['bot',esc(answer(q,d))];draw()})};
})();
(function(){
var RAW='https://raw.githubusercontent.com/bhavnasharma10-hue/Grahsetu/main/pandits.json';
var PD=null,PE=false,VID=null;
function hi(){return L=='hi'}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function loadP(){
 if(PD||PE)return;PE=true;
 fetch(RAW+'?t='+Date.now()).then(function(r){return r.json()}).then(function(a){PD=Array.isArray(a)?a.filter(function(p){return p&&p.verified===true}):[];draw()}).catch(function(){PD=[];draw()})}
function digits(s){return String(s||'').replace(/\D/g,'')}
function msg(p){return hi()?'नमस्ते '+p.name+', मैं Grahsetu ऐप से '+U.name+' बोल रही/रहा हूँ। जन्म तिथि: '+U.dob+', समय: '+U.tob+', स्थान: '+U.place+'। मुझे परामर्श चाहिए।':'Namaste '+p.name+', this is '+U.name+' from the Grahsetu app. Date of birth: '+U.dob+', time: '+U.tob+', place: '+U.place+'. I would like a consultation.'}
window.startVideo=function(i){
 var p=PD[i],room='Grahsetu-'+Math.random().toString(36).slice(2,12);
 VID={i:i,url:'https://meet.jit.si/'+room};draw()};
window.closeVideo=function(){VID=null;draw()};
V.consult=function(){
 loadP();
 var o='<h2>'+t('consult')+'</h2><div class="card"><div class="row"><div style="font-size:30px">🪔</div><div style="flex:1"><b>'+(hi()?'AI ज्योतिष (मुफ़्त)':'AI Jyotish (free)')+'</b><div class="mu">'+(hi()?'आपकी कुंडली के आधार पर चैट':'Chat based on your chart')+'</div></div></div><button class="pri" style="margin-top:8px" onclick="go(\'ai\')">'+(hi()?'चैट करें':'Chat')+'</button></div>';
 if(VID&&PD&&PD[VID.i]){var p=PD[VID.i],ph=digits(p.phone);
  o+='<div class="card"><h3>🎥 '+esc(p.name)+'</h3><p class="mu">'+(hi()?'वीडियो रूम तैयार है। पहले पंडित जी को लिंक भेजिए, फिर रूम खोलिए। फ़ोन में Jitsi Meet ऐप इंस्टॉल करनी पड़ सकती है।':'Your video room is ready. Send the link to the pandit first, then open the room. You may need the Jitsi Meet app on your phone.')+'</p>'+
  (ph.length>=10?'<a class="pri" style="display:block;text-align:center;text-decoration:none;margin-bottom:8px" target="_blank" rel="noopener" href="https://wa.me/'+ph+'?text='+encodeURIComponent(msg(p)+'\n'+(hi()?'वीडियो लिंक: ':'Video link: ')+VID.url)+'">'+(hi()?'1. पंडित जी को WhatsApp पर लिंक भेजें':'1. Send link to pandit on WhatsApp')+'</a>':'<p class="mu">⚠ '+(hi()?'पंडित का नंबर जुड़ा नहीं है।':'Pandit number is not added.')+'</p>')+
  '<a class="pri" style="display:block;text-align:center;text-decoration:none;margin-bottom:8px" target="_blank" rel="noopener" href="'+VID.url+'">'+(hi()?'2. वीडियो रूम खोलें':'2. Open video room')+'</a><button class="btn" onclick="closeVideo()">✕</button></div>'}
 o+='<div class="mu">✔ '+(hi()?'केवल सत्यापित पंडित':'Verified pandits only')+'</div>';
 if(PD===null)o+='<div class="card">⏳ …</div>';
 else if(!PD.length)o+='<div class="card">'+(hi()?'अभी कोई सत्यापित पंडित उपलब्ध नहीं है।':'No verified pandit is available right now.')+'</div>';
 else PD.forEach(function(p,i){var ph=digits(p.phone),ok=ph.length>=10;
  o+='<div class="card"><div class="row"><div style="font-size:30px">🧘</div><div style="flex:1"><b>'+esc(p.name)+'</b> ✔<div class="mu">'+esc(p.exp)+' '+(hi()?'वर्ष':'yrs')+' · '+esc(p.lang)+' · '+esc(p.spec)+'</div><div class="mu">₹'+esc(p.price)+'/'+(hi()?'मिनट':'min')+' · '+(p.online?'🟢 Online':'⚪ Offline')+'</div></div></div>'+
  (ok?'<div class="row" style="margin-top:8px"><a class="btn" style="text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/'+ph+'?text='+encodeURIComponent(msg(p))+'">💬 WhatsApp</a><a class="btn" style="text-decoration:none" href="tel:+'+ph+'">📞 '+(hi()?'कॉल':'Call')+'</a><button class="btn" onclick="startVideo('+i+')">🎥 '+(hi()?'वीडियो':'Video')+'</button></div>':'<p class="mu">⚠ '+(hi()?'इस पंडित का नंबर अभी जुड़ा नहीं है।':'This pandit\'s number has not been added yet.')+'</p>')+'</div>'});
 o+='<div class="mu">'+(hi()?'चैट खोलने पर आपका नाम और जन्म-विवरण संदेश में अपने आप लिखा आएगा; भेजना आपके हाथ में है। शुल्क पंडित जी से सीधे तय करें (ऐप में भुगतान बाद में जुड़ेगा)।':'Opening chat pre-fills your name and birth details in the message; sending is up to you. Agree the fee directly with the pandit (in-app payment will come later).')+'</div>';
 return o};

var TA=[
['The Fool','द फूल','🎒','new beginnings, trust, a leap of faith','नई शुरुआत, भरोसा, साहसिक कदम','hesitation, recklessness, poor planning','हिचकिचाहट, जल्दबाज़ी, योजना की कमी'],
['The Magician','द मैजिशियन','🪄','resourcefulness, focus, using your skills','साधन-संपन्नता, एकाग्रता, कौशल का उपयोग','scattered energy, unused talent','बिखरी ऊर्जा, अनुपयोगी प्रतिभा'],
['The High Priestess','हाई प्रीस्टेस','🌙','intuition, quiet knowing, inner voice','अंतर्ज्ञान, मौन समझ, भीतर की आवाज़','ignoring intuition, hidden matters','अंतर्ज्ञान की अनदेखी, छिपी बातें'],
['The Empress','द एम्प्रेस','🌸','nurturing, abundance, creativity','पालन-पोषण, समृद्धि, रचनात्मकता','overgiving, creative block','अति-देना, रचनात्मक ठहराव'],
['The Emperor','द एम्परर','👑','structure, authority, stability','व्यवस्था, अधिकार, स्थिरता','rigidity, control issues','कठोरता, नियंत्रण की प्रवृत्ति'],
['The Hierophant','द हायरोफैंट','📿','tradition, guidance, shared values','परंपरा, मार्गदर्शन, साझा मूल्य','questioning rules, breaking convention','नियमों पर प्रश्न, लीक से हटना'],
['The Lovers','द लवर्स','💞','harmony, choices from the heart, partnership','सामंजस्य, दिल से चुनाव, साझेदारी','misalignment, hard choices','असंतुलन, कठिन चुनाव'],
['The Chariot','द चैरियट','🐎','determination, momentum, willpower','दृढ़ निश्चय, गति, इच्छाशक्ति','lack of direction, scattered effort','दिशा की कमी, बिखरे प्रयास'],
['Strength','स्ट्रेंथ','🦁','courage, patience, gentle strength','साहस, धैर्य, कोमल शक्ति','self-doubt, low energy','आत्म-संदेह, कम ऊर्जा'],
['The Hermit','द हर्मिट','🏮','reflection, solitude, seeking wisdom','चिंतन, एकांत, ज्ञान की खोज','isolation, avoiding reflection','अकेलापन, चिंतन से बचना'],
['Wheel of Fortune','व्हील ऑफ फॉर्च्यून','🎡','cycles, change, turning points','चक्र, बदलाव, मोड़','resistance to change, setbacks','बदलाव का विरोध, अड़चनें'],
['Justice','जस्टिस','⚖️','fairness, honesty, cause and effect','न्याय, ईमानदारी, कर्म-फल','bias, avoiding accountability','पक्षपात, जवाबदेही से बचना'],
['The Hanged Man','द हैंग्ड मैन','🙃','pause, new perspective, surrender','ठहराव, नया दृष्टिकोण, समर्पण','stalling, needless sacrifice','टालमटोल, व्यर्थ त्याग'],
['Death','डेथ','🌅','an ending that clears space, transformation (not literal death)','समाप्ति जो जगह बनाती है, परिवर्तन (शाब्दिक मृत्यु नहीं)','clinging to the past','अतीत से चिपके रहना'],
['Temperance','टेम्परेंस','🌊','balance, moderation, patience','संतुलन, संयम, धैर्य','excess, impatience','अति, अधीरता'],
['The Devil','द डेविल','⛓️','attachments, binding habits, temptation','आसक्ति, बाँधने वाली आदतें, प्रलोभन','breaking free, reclaiming power','मुक्ति, अपनी शक्ति वापस पाना'],
['The Tower','द टावर','⚡','sudden change, truth revealed, rebuilding','अचानक बदलाव, सच का सामने आना, नव-निर्माण','avoiding change, delayed upheaval','बदलाव से बचना, टला हुआ उथल-पुथल'],
['The Star','द स्टार','⭐','hope, healing, renewal','आशा, उपचार, नवीनीकरण','discouragement, lost faith','निराशा, भरोसे की कमी'],
['The Moon','द मून','🌕','uncertainty, dreams, intuition needing care','अनिश्चितता, सपने, सावधानी माँगता अंतर्ज्ञान','clarity returning, confusion lifting','स्पष्टता लौटना, उलझन छँटना'],
['The Sun','द सन','☀️','joy, vitality, success','आनंद, जीवंतता, सफलता','temporary clouds, dimmed optimism','अस्थायी बादल, कम होता उत्साह'],
['Judgement','जजमेंट','📯','reflection, awakening, answering a calling','आत्म-मूल्यांकन, जागृति, पुकार का उत्तर','self-doubt, ignoring the call','आत्म-संदेह, पुकार की अनदेखी'],
['The World','द वर्ल्ड','🌍','completion, wholeness, achievement','पूर्णता, समग्रता, उपलब्धि','unfinished business, almost there','अधूरा काम, मंज़िल के क़रीब']];
var TS=null;
function rnd(n){var a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n}
window.drawTarot=function(n){
 var used={},c=[];
 while(c.length<n){var i=rnd(22);if(!used[i]){used[i]=1;c.push({i:i,rev:rnd(2)==1})}}
 TS={n:n,c:c};draw()};
V.tarot=function(){
 var pos=hi()?['अतीत','वर्तमान','भविष्य']:['Past','Present','Future'];
 var o='<h2>🃏 '+(hi()?'टैरो कार्ड':'Tarot')+'</h2><div class="card"><p class="mu">'+(hi()?'मन में अपना सवाल सोचिए, फिर कार्ड चुनिए।':'Think of your question, then draw.')+'</p><div class="row"><button class="pri" onclick="drawTarot(1)">'+(hi()?'आज का कार्ड':'Card of the day')+'</button><button class="pri" onclick="drawTarot(3)">'+(hi()?'3 कार्ड':'3 cards')+'</button></div></div>';
 if(TS)TS.c.forEach(function(x,k){var d=TA[x.i];
  o+='<div class="card" style="text-align:center">'+(TS.n==3?'<div class="tag">'+pos[k]+'</div>':'')+'<div style="font-size:64px;line-height:1.2;'+(x.rev?'transform:rotate(180deg);display:inline-block':'')+'">'+d[2]+'</div><h3 style="margin-top:6px">'+d[hi()?1:0]+'</h3><div class="tag">'+(x.rev?(hi()?'उल्टा':'Reversed'):(hi()?'सीधा':'Upright'))+'</div><p>'+(hi()?'परंपरा में इसे ':'Traditionally linked with ')+d[x.rev?(hi()?6:5):(hi()?4:3)]+(hi()?' से जोड़ा जाता है।':'.')+'</p></div>'});
 if(TS)o+='<div class="mu">'+(hi()?'टैरो चिंतन का एक साधन है, भविष्य की निश्चित भविष्यवाणी नहीं। कार्ड के अर्थ पर ख़ुद सोचिए और अपने फ़ैसले सोच-समझकर लीजिए।':'Tarot is a tool for reflection, not a certain prediction. Think about what the cards mean to you and make your own decisions carefully.')+'</div>';
 return o};
var _h4=V.home;
V.home=function(){return _h4()+'<div class="card row" onclick="go(\'tarot\')" style="cursor:pointer"><div style="font-size:32px">🃏</div><div style="flex:1"><b>'+(hi()?'टैरो कार्ड':'Tarot')+'</b><div class="mu">'+(hi()?'आज का कार्ड निकालें':'Draw your card')+'</div></div></div>'};
})();
(function(){
function hi(){return L=='hi'}
function pad(n){return (n<10?'0':'')+n}
function opts(a,b,sel,f){var o='<option value="">--</option>';for(var i=a;i<=b;i++)o+='<option value="'+i+'"'+(sel===i?' selected':'')+'>'+(f?f(i):i)+'</option>';return o}
function ea(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
var PS=[],ptm=null;
V.birth=function(){
 var h24=null,mi=null;
 if(HAS&&U.tob){var q=U.tob.split(':');h24=+q[0];mi=+q[1]}
 var ap=h24==null?'':(h24>=12?'PM':'AM'),h12=h24==null?null:(h24%12||12);
 var g=HAS?U.gender:'';
 return '<h2>'+(hi()?'अपना जन्म-विवरण दें':'Your birth details')+'</h2><div class="card">'+
 '<label class="mu">'+(hi()?'नाम':'Name')+'</label><input id="bn" value="'+ea(HAS?U.name:'')+'">'+
 '<label class="mu">'+(hi()?'जन्म तिथि':'Date of birth')+'</label><input id="bd" type="date" value="'+ea(HAS?U.dob:'')+'">'+
 '<label class="mu">'+(hi()?'जन्म का सही समय':'Exact time of birth')+'</label><div class="row"><select id="bh">'+opts(1,12,h12)+'</select><select id="bm2">'+opts(0,59,mi,pad)+'</select><select id="bap"><option value="">--</option><option value="AM"'+(ap=='AM'?' selected':'')+'>AM</option><option value="PM"'+(ap=='PM'?' selected':'')+'>PM</option></select></div>'+
 '<label class="mu">'+(hi()?'जन्म स्थान (शहर)':'Birthplace (city)')+'</label><input id="bp" autocomplete="off" autocapitalize="words" placeholder="Jalgaon, Maharashtra" oninput="placeSug()" value="'+ea(HAS?U.place:'')+'"><div id="psug"></div><div class="mu">'+(hi()?'अंग्रेज़ी में शहर का नाम लिखें, नीचे आए सुझाव पर टैप करें। गाँव न मिले तो पास का बड़ा शहर चुनें।':'Type the city in English and tap a suggestion below. If your village is not found, pick the nearest big city.')+'</div>'+
 '<label class="mu">'+(hi()?'लिंग (वैकल्पिक)':'Gender (optional)')+'</label><select id="bg"><option value="">-</option><option value="F"'+(g=='F'?' selected':'')+'>'+(hi()?'महिला':'Female')+'</option><option value="M"'+(g=='M'?' selected':'')+'>'+(hi()?'पुरुष':'Male')+'</option><option value="O"'+(g=='O'?' selected':'')+'>'+(hi()?'अन्य':'Other')+'</option></select>'+
 '<button class="pri" id="bsave" style="margin-top:8px" onclick="saveBirth()">'+(hi()?'सेव करें':'Save')+'</button><p class="mu" id="bmsg" style="color:#d9534f"></p></div>'};
function bmsg(s){var e=document.getElementById('bmsg');if(e)e.textContent=s||''}
window.placeSug=function(){
 clearTimeout(ptm);
 ptm=setTimeout(function(){
  var v=document.getElementById('bp').value.split(',')[0].trim(),box=document.getElementById('psug');
  if(v.length<2){box.innerHTML='';return}
  fetch('https://geocoding-api.open-meteo.com/v1/search?count=8&language=en&format=json&name='+encodeURIComponent(v))
  .then(function(r){return r.json()}).then(function(j){
   var l=(j.results||[]).slice().sort(function(a,b){return (b.country_code=='IN')-(a.country_code=='IN')}).slice(0,6);
   PS=l.map(function(x){return (x.country_code=='IN'?[x.name,x.admin1]:[x.name,x.country]).filter(Boolean).join(', ')});
   var b2=document.getElementById('psug');if(!b2)return;
   b2.innerHTML=PS.map(function(s,i){return '<button class="btn" style="display:block;width:100%;text-align:left;margin:3px 0" onclick="pickPlace('+i+')">📍 '+ea(s)+'</button>'}).join('');
  }).catch(function(){})
 },400)};
window.pickPlace=function(i){document.getElementById('bp').value=PS[i];document.getElementById('psug').innerHTML=''};
window.saveBirth=function(){
 var n=document.getElementById('bn').value.trim(),d=document.getElementById('bd').value,
 h=document.getElementById('bh').value,m=document.getElementById('bm2').value,ap=document.getElementById('bap').value,
 pl=document.getElementById('bp').value.trim(),g=document.getElementById('bg').value;
 if(!n)return bmsg(hi()?'नाम लिखिए':'Enter your name');
 if(!d)return bmsg(hi()?'जन्म तिथि चुनिए':'Choose date of birth');
 if(!h||m===''||!ap)return bmsg(hi()?'जन्म का समय चुनिए (घंटा, मिनट और AM/PM)':'Choose time of birth (hour, minute and AM/PM)');
 if(!pl)return bmsg(hi()?'जन्म स्थान लिखिए':'Enter birthplace');
 var h24=(+h%12)+(ap=='PM'?12:0),tm=pad(h24)+':'+pad(+m);
 var btn=document.getElementById('bsave');btn.disabled=true;bmsg(hi()?'जन्म स्थान जाँच रहे हैं…':'Checking birthplace…');
 function done(){
  U={name:n,dob:d,tob:tm,place:pl,gender:g};HAS=true;
  try{localStorage.setItem('gs_profile',JSON.stringify(U))}catch(e){}
  if(TOK){fetch('/v1/profiles',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+TOK},body:JSON.stringify({name:n,dob:d,tob:tm,place:pl,gender:g})}).catch(function(){})}
  go('home')}
 fetch('https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json&name='+encodeURIComponent(pl.split(',')[0].trim()))
 .then(function(r){return r.json()}).then(function(j){
  if(j&&j.results&&j.results.length)done();
  else{btn.disabled=false;bmsg(hi()?'यह शहर नहीं मिला। अंग्रेज़ी में लिखें या पास का बड़ा शहर चुनें।':'City not found. Write it in English or choose the nearest big city.')}
 }).catch(function(){done()})};
draw();
})();
(function(){
function hi(){return L=='hi'}
function i18(a){return a[hi()?1:0]}
function red9(n){while(n>9)n=String(n).split('').reduce(function(a,b){return a+ +b},0);return n}
function redM(n){while(n>9&&n!=11&&n!=22&&n!=33)n=String(n).split('').reduce(function(a,b){return a+ +b},0);return n}
function lt(s){return s.toUpperCase().replace(/[^A-Z]/g,'').split('').reduce(function(a,c){return a+((c.charCodeAt(0)-65)%9)+1},0)}
var KW=[null,['start','शुरुआत'],['patience','धैर्य'],['expression','अभिव्यक्ति'],['work','परिश्रम'],['change','बदलाव'],['care','देखभाल'],['reflection','चिंतन'],['results','परिणाम'],['closure','समापन']];
var PY=[null,
[['starting new things and taking initiative','नई शुरुआत और पहल'],['avoid rushing or acting alone without planning','बिना योजना जल्दबाज़ी या अकेले फ़ैसले से बचें'],['make a clear plan and begin one important task','एक स्पष्ट योजना बनाकर एक अहम काम शुरू करें']],
[['patience, partnerships and cooperation','धैर्य, साझेदारी और सहयोग'],['avoid over-sensitivity and indecision','अति-संवेदनशीलता और अनिर्णय से बचें'],['listen more and nurture one key relationship','ज़्यादा सुनें और एक अहम रिश्ते को समय दें']],
[['creativity, communication and social life','रचनात्मकता, संवाद और मेल-जोल'],['avoid scattering energy or careless words','ऊर्जा बिखेरने और लापरवाह बोल से बचें'],['share your ideas through writing or speaking','लिखकर या बोलकर अपने विचार साझा करें']],
[['building foundations, discipline and health routines','नींव बनाना, अनुशासन और स्वास्थ्य की दिनचर्या'],['avoid rigidity and overwork','कठोरता और अति-काम से बचें'],['set a steady daily routine and finish pending work','नियमित दिनचर्या बनाएँ और अधूरे काम पूरे करें']],
[['change, movement and new experiences','बदलाव, गतिशीलता और नए अनुभव'],['avoid impulsive decisions and restlessness','आवेग और बेचैनी में फ़ैसले से बचें'],['stay flexible, but check facts before big changes','लचीले रहें, पर बड़े बदलाव से पहले तथ्य जाँचें']],
[['family, home and responsibilities','परिवार, घर और ज़िम्मेदारियाँ'],['avoid over-giving and worrying for others','दूसरों के लिए अति-चिंता और अति-देने से बचें'],['balance care for others with care for yourself','दूसरों और अपनी देखभाल में संतुलन रखें']],
[['reflection, learning and inner growth','चिंतन, सीखना और आंतरिक विकास'],['avoid isolation and overthinking','अकेलेपन और अति-सोच से बचें'],['set aside quiet time and learn something new','शांत समय निकालें और कुछ नया सीखें']],
[['career, finances and positions of authority','करियर, धन-संबंधी विषय और अधिकार'],['avoid pressure, ego and risky money moves','दबाव, अहंकार और जोखिम भरे धन-फ़ैसलों से बचें'],['plan finances carefully and take professional advice','वित्त की योजना सोच-समझकर बनाएँ और विशेषज्ञ की सलाह लें']],
[['completion, letting go and service','समापन, छोड़ना और सेवा'],['avoid clinging to the past or launching big new ventures','अतीत से चिपकने या बड़ी नई शुरुआत से बचें'],['finish old tasks, forgive, and help someone in need','पुराने काम पूरे करें, क्षमा करें और ज़रूरतमंद की मदद करें']]];
var NP=[null,
[['Sun','सूर्य'],['Sunday','रविवार'],['gold, orange','सुनहरा, नारंगी'],'ॐ सूर्याय नमः',['confidence and self-expression','आत्मविश्वास और स्वयं को व्यक्त करना'],['speak up in small situations and lead one small task','छोटे अवसरों पर अपनी बात रखें और एक छोटा काम नेतृत्व से करें']],
[['Moon','चंद्र'],['Monday','सोमवार'],['white, cream','सफ़ेद, क्रीम'],'ॐ सोमाय नमः',['emotional balance and sensitivity','भावनात्मक संतुलन और संवेदनशीलता'],['keep a calm evening routine and talk about feelings','शांत शाम की दिनचर्या रखें और भावनाओं पर बात करें']],
[['Jupiter','गुरु'],['Thursday','गुरुवार'],['yellow','पीला'],'ॐ बृहस्पतये नमः',['creativity and expression','रचनात्मकता और अभिव्यक्ति'],['write or draw a little every day and respect your teachers','रोज़ थोड़ा लिखें या चित्र बनाएँ और गुरुजनों का सम्मान करें']],
[['Rahu','राहु'],['Saturday','शनिवार'],['blue, grey','नीला, स्लेटी'],'ॐ रां राहवे नमः',['practical discipline and order','व्यावहारिक अनुशासन और व्यवस्था'],['keep a simple daily schedule and a tidy space','सरल दिनचर्या और व्यवस्थित जगह रखें']],
[['Mercury','बुध'],['Wednesday','बुधवार'],['green','हरा'],'ॐ बुं बुधाय नमः',['adaptability and communication','अनुकूलन और संवाद'],['read daily and practise clear, calm communication','रोज़ पढ़ें और स्पष्ट, शांत संवाद का अभ्यास करें']],
[['Venus','शुक्र'],['Friday','शुक्रवार'],['white, light pink','सफ़ेद, हल्का गुलाबी'],'ॐ शुं शुक्राय नमः',['harmony in relationships and home','रिश्तों और घर में सामंजस्य'],['spend quality time with family and keep surroundings clean','परिवार के साथ समय बिताएँ और आस-पास स्वच्छता रखें']],
[['Ketu','केतु'],['Tuesday','मंगलवार'],['light grey, sea green','हल्का स्लेटी, समुद्री हरा'],'ॐ कें केतवे नमः',['reflection and inner calm','चिंतन और आंतरिक शांति'],['practise 10 minutes of silent meditation daily','रोज़ 10 मिनट मौन ध्यान करें']],
[['Saturn','शनि'],['Saturday','शनिवार'],['dark blue, black','गहरा नीला, काला'],'ॐ शं शनैश्चराय नमः',['patience and responsibility','धैर्य और ज़िम्मेदारी'],['keep promises, be punctual and respect people who work for you','वादे निभाएँ, समय के पाबंद रहें और काम करने वालों का सम्मान करें']],
[['Mars','मंगल'],['Tuesday','मंगलवार'],['red, maroon','लाल, मरून'],'ॐ भौमाय नमः',['energy, courage and compassion','ऊर्जा, साहस और करुणा'],['do regular light exercise and help someone in need','नियमित हल्का व्यायाम करें और ज़रूरतमंद की मदद करें']]];
var NI={1:['leadership, independence and initiative','नेतृत्व, स्वतंत्रता और पहल'],2:['cooperation, sensitivity and diplomacy','सहयोग, संवेदनशीलता और कूटनीति'],3:['creativity, expression and optimism','रचनात्मकता, अभिव्यक्ति और आशावाद'],4:['discipline, practicality and steadiness','अनुशासन, व्यावहारिकता और स्थिरता'],5:['freedom, curiosity and adaptability','स्वतंत्रता, जिज्ञासा और अनुकूलन'],6:['care, responsibility and harmony','देखभाल, ज़िम्मेदारी और सामंजस्य'],7:['reflection, study and inner search','चिंतन, अध्ययन और आत्म-खोज'],8:['ambition, management and material achievement','महत्वाकांक्षा, प्रबंधन और भौतिक उपलब्धि'],9:['compassion, idealism and completion','करुणा, आदर्श और पूर्णता'],11:['intuition and inspiration (master number)','अंतर्ज्ञान और प्रेरणा (मास्टर नंबर)'],22:['building on a large scale (master number)','बड़े स्तर पर निर्माण (मास्टर नंबर)'],33:['devoted service and teaching (master number)','समर्पित सेवा और शिक्षण (मास्टर नंबर)']};
function dp(){var d=(U.dob||'').split('-').map(Number);return {y:d[0],m:d[1],d:d[2]}}
function pyear(y){var p=dp();return red9(red9(p.d)+red9(p.m)+red9(y))}
function core(){
 var p=dp(),digs=(U.dob||'').replace(/-/g,'').split('').map(Number);
 var mulank=red9(p.d),bhagyank=red9(digs.reduce(function(a,b){return a+b},0));
 var cnt={};for(var i=1;i<=9;i++)cnt[i]=0;
 digs.forEach(function(x){if(x>0)cnt[x]++});cnt[mulank]++;cnt[bhagyank]++;
 return {mulank:mulank,bhagyank:bhagyank,cnt:cnt,life:redM(redM(p.d)+redM(p.m)+redM(red9(p.y)==p.y?p.y:redM(p.y))),dest:redM(lt(U.name||'')),first:redM(lt((U.name||'').trim().split(/\s+/)[0]||''))}}
function luckyHtml(c){
 var a=NP[c.mulank],b=NP[c.bhagyank];
 return '<div class="card"><h3>'+(hi()?'आपके शुभ संकेत (परंपरागत)':'Your lucky indicators (traditional)')+'</h3><table>'+[
  [hi()?'मूलांक / भाग्यांक':'Mulank / Bhagyank',c.mulank+' / '+c.bhagyank],
  [hi()?'ग्रह':'Planets',i18(a[0])+' / '+i18(b[0])],
  [hi()?'शुभ दिन':'Lucky days',i18(a[1])+', '+i18(b[1])],
  [hi()?'शुभ रंग':'Lucky colours',i18(a[2])+'; '+i18(b[2])],
  [hi()?'मंत्र':'Mantras',a[3]+' · '+b[3]]
 ].map(function(r){return '<tr><td>'+r[0]+'</td><td><b>'+r[1]+'</b></td></tr>'}).join('')+'</table><p class="mu">'+(hi()?'परंपराओं में थोड़ा अंतर होता है। मंत्र शांत मन से, अपनी श्रद्धा अनुसार करें।':'Traditions differ slightly. Chant mantras calmly and according to your own faith.')+'</p></div>'}
function loshuHtml(c){
 var order=[4,9,2,3,5,7,8,1,6],o='<div class="card"><h3>'+(hi()?'लो शू ग्रिड':'Lo Shu grid')+'</h3><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-width:260px;margin:auto">';
 order.forEach(function(n){var k=c.cnt[n];o+='<div style="border:1px solid var(--bd);border-radius:10px;height:62px;display:flex;align-items:center;justify-content:center;font-size:'+(k>2?'17':'22')+'px;font-weight:700;color:'+(k?'var(--ac)':'var(--mu)')+'">'+(k?new Array(k+1).join(n):'·')+'</div>'});
 o+='</div><p class="mu">'+(hi()?'ग्रिड जन्म तिथि के अंकों, मूलांक और भाग्यांक से बना है। खाली घर वे अंक हैं जो नहीं आए।':'The grid uses your birth-date digits, Mulank and Bhagyank. Empty cells are numbers that do not appear.')+'</p></div>';
 var miss=[],rep=[];for(var n=1;n<=9;n++){if(!c.cnt[n])miss.push(n);else if(c.cnt[n]>=3)rep.push(n)}
 o+='<div class="card"><h3>'+(hi()?'ग्रिड का सार और उपाय':'Grid summary and remedies')+'</h3>';
 if(miss.length)miss.forEach(function(n){o+='<p>• <b>'+n+'</b> '+(hi()?'अनुपस्थित: परंपरा में '+i18(NP[n][4])+' पर ध्यान देने की सलाह दी जाती है। सरल अभ्यास: ':'missing: traditionally suggests paying attention to '+i18(NP[n][4])+'. Simple practice: ')+i18(NP[n][5])+'.</p>'});
 else o+='<p>• '+(hi()?'कोई अंक अनुपस्थित नहीं है।':'No number is missing.')+'</p>';
 rep.forEach(function(n){o+='<p>• <b>'+n+'</b> '+(hi()?c.cnt[n]+' बार: इसके गुण प्रबल हो सकते हैं; संतुलन बनाए रखें।':'appears '+c.cnt[n]+' times: its qualities may be strong; keep a balance.')+'</p>'});
 return o+'<p class="mu">'+(hi()?'उपाय केवल सुरक्षित आदतें हैं (मंत्र, ध्यान, दान, अच्छी आदतें)। महँगे रत्न या डराने वाले उपाय की आवश्यकता नहीं।':'Remedies are only safe habits (mantra, meditation, charity, good habits). No expensive stones or fear-based remedies are needed.')+'</p></div>'}
function yearHtml(full){
 var y0=new Date().getFullYear(),o='<div class="card"><h3>'+(hi()?'वर्ष-वार मार्गदर्शन (व्यक्तिगत वर्ष)':'Year-wise guidance (Personal Year)')+'</h3><div class="scroll"><table><tr><th>'+(hi()?'वर्ष':'Year')+'</th><th>'+(hi()?'अंक':'No.')+'</th><th>'+(hi()?'विषय':'Theme')+'</th></tr>';
 for(var i=0;i<10;i++){var y=y0+i,n=pyear(y);o+='<tr><td>'+y+'</td><td><b>'+n+'</b></td><td>'+i18(KW[n])+'</td></tr>'}
 o+='</table></div></div>';
 var cnt=full?3:2;
 for(var j=0;j<cnt;j++){var yy=y0+j,nn=pyear(yy),d=PY[nn];
  o+='<div class="card"><h3>'+yy+' — '+(hi()?'व्यक्तिगत वर्ष ':'Personal Year ')+nn+'</h3><p>'+(hi()?'ध्यान: ':'Focus: ')+i18(d[0])+'.</p><p>'+(hi()?'सावधानी: ':'Be careful: ')+i18(d[1])+'.</p><p>'+(hi()?'सुझाव: ':'Suggestion: ')+i18(d[2])+'.</p></div>'}
 var py=pyear(y0),mo=hi()?['जन','फ़र','मार्च','अप्रै','मई','जून','जुला','अग','सित','अक्टू','नव','दिस']:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 o+='<div class="card"><h3>'+y0+' — '+(hi()?'मासिक संकेत':'Monthly indications')+'</h3><div class="grid" style="grid-template-columns:repeat(4,1fr)">'+mo.map(function(m,k){var n=red9(py+k+1);return '<div class="tile"><b>'+n+'</b>'+m+'<div class="mu">'+i18(KW[n])+'</div></div>'}).join('')+'</div></div>';
 return o+'<div class="mu">'+(hi()?'व्यक्तिगत वर्ष = जन्म का दिन + जन्म का महीना + वर्ष, जोड़कर एक अंक। ये सामान्य संकेत हैं, निश्चित भविष्यवाणी नहीं।':'Personal Year = birth day + birth month + year, reduced to one digit. These are general indications, not certain predictions.')+'</div>'}
function remedyHtml(c){
 var a=NP[c.mulank],b=NP[c.bhagyank];
 var list=hi()?['अपने शुभ दिन पर ज़रूरतमंद को भोजन या वस्त्र दान करें','अपने मंत्र का शांत मन से जप करें (11 बार पर्याप्त है)','रोज़ 10 मिनट मौन ध्यान या प्राणायाम करें','सुबह जल्दी उठने और समय पर काम पूरे करने की आदत बनाएँ','हर सप्ताह किसी को धन्यवाद या मदद दें']:['Donate food or clothes to someone in need on your lucky day','Chant your mantra calmly (11 times is enough)','Do 10 minutes of silent meditation or breathing daily','Build the habit of waking early and finishing tasks on time','Thank or help someone every week'];
 return '<div class="card"><h3>'+(hi()?'सरल, सुरक्षित उपाय':'Simple, safe remedies')+'</h3><p class="mu">'+(hi()?'शुभ दिन: ':'Lucky days: ')+i18(a[1])+', '+i18(b[1])+'</p>'+list.map(function(x){return '<p>• '+x+'</p>'}).join('')+'</div>'}
var _n=V.num;
V.num=function(){
 var c=core();
 return _n()+luckyHtml(c)+loshuHtml(c)+yearHtml(false)+remedyHtml(c)+'<button class="pri noprint" onclick="go(\'numreport\')">📜 '+(hi()?'पूरी अंकज्योतिष रिपोर्ट (PDF)':'Full numerology report (PDF)')+'</button>'};
V.numreport=function(){
 var c=core(),rows=[[hi()?'जीवन पथ':'Life Path',c.life],[hi()?'भाग्य/अभिव्यक्ति':'Destiny / Expression',c.dest],[hi()?'मूलांक (जन्म संख्या)':'Birth number (Mulank)',c.mulank],[hi()?'भाग्यांक':'Bhagyank',c.bhagyank],[hi()?'नाम संख्या':'Name number',c.first]];
 return '<h2>'+(hi()?'अंकज्योतिष रिपोर्ट':'Numerology Report')+'</h2><div class="card"><b>'+U.name+'</b><div class="mu">'+U.dob+'</div></div>'+
 '<div class="card"><h3>'+(hi()?'मुख्य अंक':'Core numbers')+'</h3>'+rows.map(function(r){return '<p><b>'+r[0]+': '+r[1]+'</b><br><span class="mu">'+(hi()?'परंपरा में इसे ':'Traditionally linked with ')+i18(NI[r[1]])+(hi()?' से जोड़ा जाता है।':'.')+'</span></p>'}).join('')+'</div>'+
 luckyHtml(c)+loshuHtml(c)+yearHtml(true)+remedyHtml(c)+'<div class="card mu">'+t('disc')+'</div><button class="pri noprint" onclick="window.print()">🖨️ '+(hi()?'PDF सेव / प्रिंट':'Save as PDF / Print')+'</button>'};
draw();
})();
