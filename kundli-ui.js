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
