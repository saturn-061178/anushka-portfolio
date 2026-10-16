// ================= CAT v4: black cat, four moods, real cat habits =================
// Habits: purrs when stroked (and swats if it goes on too long), slow-blinks when you stay still nearby,
// stalks and pounces, chatters at fast movement near the top ("birds"), swats at a pointer that comes close,
// kneads and turns a circle before a nap, grooms after a fall, sometimes ignores you, and sulks if clicked too much.
// Also: yawns (and yawns + stretches on waking), knocks its coffee mug over, climbs into a cardboard box,
// jumps at a sudden big scroll, brings you a toy when you come back to the tab, and is sleepier late at night.
(function(){
 const cat=$('#cat'),bub=$('#cbub'),mlab=$('#cmood'),eyeEls=[$('#ceyes'),$('#ceyesD'),$('#ceyesS')];if(!cat)return;
 const W=()=>innerWidth,H=()=>innerHeight,SZ=()=>cat.offsetWidth||150,CH=()=>cat.offsetHeight||150,ph=matchMedia('(max-width:600px)');
 const floor=()=>H()-CH()-(ph.matches?10:26);
 const MOODS={coffee:{label:'COFFEE BREAK',line:'coffee first. your opinions later. ☕',greet:['oh. it’s you. hi. ☕','i’m on my break. make it quick.','sip. stare. sip. hello.']},
  deadline:{label:'DEADLINE MODE',line:'deadlines. unlike you, some of us work.',greet:['busy. scroll somewhere else.','is that tuna? no? then why are you here.','typing… ignoring you… typing…']},
  shark:{label:'SHARK MODE',line:'rawr. i’m a shark now. keep up.',greet:['rawr. you’re welcome.','i have teeth. emotionally.','scared? correct.']},
  diva:{label:'DIVA MODE',line:'darling, that kerning is a crime. ✦',greet:['you stopped here? good taste. finally.','i approve. you may continue. ✦','hello, peasant. i mean, darling.']}};
 const ORDER=['coffee','deadline','shark','diva'],SM={top:'coffee',works:'deadline',leader:'deadline',lab:'deadline',quiet:'diva',apr:'diva',about:'diva',corner:'shark',contact:'coffee'};
 let px2=0,nextAct=performance.now()+6600,actEnd=0,hy=0,hv=0,hopping=false,zw=[],lookUntil=0,mood='coffee',manualUntil=0,lastSec='',hx=W()-SZ()-14,x=W()+120,y=floor(),tx=x,ty=y,st='away',pose='sit',last=performance.now(),lastAct=last,cool=last+3600,visits=0,lastY=scrollY,px=W()*.6,py=H()*.6,pm=false,gs=null,sleeping=false,seen=false,vy=0,held=null,nextPatrol=last+11000+Math.random()*6000,tip={};
 let pet={d:0,start:0,last:0},purrUntil=0,clicks=[],sulkUntil=0,lastSwat=0,lastChat=0,stillSince=last,lastBlink=0,blinkTold=false,kneading=false;
 const rnd=a=>a[Math.random()*a.length|0];
 let sassIdle=false,lastFast=0,scrollMark=scrollY,scrollT=last,sink=0,mugGone=false,boxEl=null,lastBox=last,lastStartle=0,hidAt=0;
 // late at night (11pm to 6am, the visitor's own time) the cat dozes off much sooner
 const sleepAfter=()=>{const h=new Date().getHours();return h<6||h>=23?14000:32000};
 // a mouth for yawning, tucked under the nose; hidden until a yawn
 const chd=cat.querySelector('.sit .chd');if(chd)chd.insertAdjacentHTML('beforeend','<ellipse class="cyawn" cx="100" cy="99" rx="6.5" ry="7.5" fill="#7a2f35"/><path class="cyawn" d="M96 101Q100 106 104 101" fill="#E4666F"/>');
 const clampf=(v,a,b)=>Math.max(a,Math.min(b,v));
 function hop(power){if(hopping)return;hopping=true;hv=-(power||560);hy=-1}
 const setAct=(a,ms)=>{cat.dataset.a=a;clearTimeout(setAct.t);setAct.t=setTimeout(()=>{cat.dataset.a=''},ms)};
 const setTail=(t,ms)=>{cat.dataset.t=t;clearTimeout(setTail.t);setTail.t=setTimeout(()=>{cat.dataset.t=''},ms)};
 const setPose=p=>{if(p!==pose){pose=p;cat.dataset.p=p}};
 const say=(t,ms)=>{bub.textContent=t;const cx=x+SZ()/2;bub.style.setProperty('--bo',(cx<110?110-cx:cx>W()-110?W()-110-cx:0)+'px');bub.classList.add('on');clearTimeout(say.t);say.t=setTimeout(()=>bub.classList.remove('on'),ms||3400)};
 function setMood(m,announce){if(m===mood&&!announce)return;const changed=m!==mood;mood=m;cat.dataset.m=m;if(announce&&changed){mlab.textContent=MOODS[m].label;mlab.classList.add('on');clearTimeout(setMood.t);setMood.t=setTimeout(()=>mlab.classList.remove('on'),2400)}}
 function wake(){if(sleeping){sleeping=false;if(st=='home'){setPose('sit');setTimeout(()=>{if(st=='home'&&!cat.dataset.a){setAct('yawn',1400);setTimeout(()=>{if(st=='home'&&!cat.dataset.a)setAct('stretch',2100)},1450)}},60)}}}
 function go(a,b,s2){tx=a;ty=b;st=s2;setPose('walk');cat.classList.toggle('fl',a<x)}
 function visit(){wake();visits++;const gx=clampf(pm?px+90:W()*.5,12,W()-SZ()-12);
  if(Math.random()<.25){go(clampf((x+gx)/2,12,W()-SZ()-12),floor(),'snub');return}
  go(gx,clampf(pm?py+36:floor(),90,floor()),'walk')}
 function startAct(now){const idle=now-lastAct,pool=[['tilt',1],['groom',1],['stretch',1],['hop',1.3],['wiggle',.7],['look',1]];
  if(idle>800)pool.push(['wander',1.5]);if(idle>1400)pool.push(['zoom',.7]);if(pm&&idle<1400&&Math.abs(px-(x+SZ()/2))>240)pool.push(['chase',1.6]);
  pool.push(['yawn',.5],['eyeroll',.7],['noseup',.5]);if(mood=='coffee'&&!mugGone)pool.push(['knock',.6]);if(idle>3000&&!boxEl&&now-lastBox>60000)pool.push(['box',.6]);
  let t=pool.reduce((a,b)=>a+b[1],0)*Math.random(),pick='tilt';for(const p of pool){t-=p[1];if(t<=0){pick=p[0];break}}
  nextAct=now+2400+Math.random()*3000;
  if(pick=='yawn'){setAct('yawn',1400);return}
  if(pick=='eyeroll'){setAct('eyeroll',1100);if(Math.random()<.5)say(rnd(['ugh.','*eye roll*','sure. whatever.']),1400);return}
  if(pick=='noseup'){setAct('noseup',2200);say(rnd(['i’m above this.','*ignores you elegantly*','hmph.']),1800);return}
  if(pick=='knock'){knockMug();return}
  if(pick=='box'){lastBox=now;placeBox();return}
  if(pick=='tilt')setAct('tilt',1700);else if(pick=='groom')setAct('groom',2300);else if(pick=='stretch')setAct('stretch',2100);else if(pick=='wiggle'){setAct('wiggle',900);setTimeout(()=>hop(500),900)}
  else if(pick=='hop'){hop(600);if(mood=='shark')say('rawr!',1200)}else if(pick=='look')lookUntil=now+2200;
  else if(pick=='wander'){go(clampf(60+Math.random()*(W()-SZ()-120),12,W()-SZ()-12),floor(),'patrol')}
  else if(pick=='zoom'){const a=clampf(40+Math.random()*(W()*.3),12,W()-SZ()-12),b=clampf(W()*.6+Math.random()*(W()*.3),12,W()-SZ()-12);zw=[b,a,clampf(hx,12,W()-SZ()-12)];go(a,floor(),'zoom');say(rnd(['zoomies!! don’t judge.','*leaves at the speed of sass*']),1400)}
  else if(pick=='chase'){const tgt=clampf(px-SZ()/2,12,W()-SZ()-12);st='stalk';setAct('crouch',950);setTimeout(()=>{if(st!=='stalk')return;go(tgt,floor(),'pounce');hop(640)},950)}}
 function retreat(){bub.classList.remove('on');go(hx,floor(),'back');cool=performance.now()+15000}
 function arrive(){if(st=='tobox'){st='inbox';setPose('sit');hop(380);setTimeout(()=>{if(st!=='inbox')return;sink=CH()*.42;say(rnd(['if it fits, i sits. obviously.','my box now. no refunds.','don’t even think about it.']),2200);setTimeout(boxOut,8000)},260);return}
 if(st=='pounce'){st='home';hx=x;setPose('sit');say(rnd(['got it. as expected.','…i let it go. on purpose.','mine. obviously.']),1300);return}
 if(st=='snub'){st='home';hx=x;setPose('sit');setAct('groom',2300);say(rnd(['…later. maybe.','*pretends you don’t exist*','i have places to be.']),1800);cool=performance.now()+12000;return}
 if(st=='zoom'){if(zw.length){tx=zw.shift();cat.classList.toggle('fl',tx<x);return}st='home';hx=x;setPose('sit');hop(420);return}if(st=='chase'){st='home';hx=x;setPose('sit');hop(760);setAct('wiggle',900);return}if(st=='walk'){st='greet';setPose('sit');gs={x:px,y:py};const g=MOODS[mood].greet;setTail('happy',4000);say(g[Math.floor(Math.random()*g.length)],3800);setTimeout(()=>{if(st=='greet')retreat()},4300)}else{st='home';hx=x;setPose(sleeping?'sleep':'sit')}}
 const act=()=>{lastAct=performance.now();wake();if(st=='walk'||st=='greet')retreat()};
 addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;pm=true;lastAct=performance.now();wake();if(held){if(!held.m&&Math.hypot(e.clientX-held.sx,e.clientY-held.sy)>6){held.m=true;st='held';setPose('sit');cat.classList.add('held');bub.classList.remove('on')}return}
  if(st=='greet'&&gs&&Math.hypot(px-gs.x,py-gs.y)>70)retreat();else if(st=='walk'){tx=clampf(px+90,12,W()-SZ()-12);ty=clampf(py+36,90,floor())}});
 addEventListener('pointermove',e=>{const now=performance.now(),dist=Math.hypot(e.clientX-(pet.px??e.clientX),e.clientY-(pet.py??e.clientY)),dtm=now-(pet.mt||now);pet.px=e.clientX;pet.py=e.clientY;pet.mt=now;if(dist>3)stillSince=now;
  if(held||st!=='home'||sleeping||e.pointerType=='touch')return;
  if(e.target.closest&&e.target.closest('#cat')){ // stroking the cat
   if(now-pet.last>600){pet.d=0;pet.start=now}pet.last=now;pet.d+=dist;
   if(now-pet.start>7000){pet.d=0;pet.start=now+4000;setAct('swat',600);setTail('flick',1500);say(rnd(['ok, that’s enough. i bite.','did i say you could keep going?','hiss. (with love)']),1800);sulkUntil=now+8000;cool=now+12000;
    setTimeout(()=>{if(st=='home')go(clampf(x+(x>W()/2?-260:260),12,W()-SZ()-12),floor(),'patrol')},700);return}
   if(pet.d>220&&now>purrUntil-800){purrUntil=now+2200;setAct('purr',2200);setTail('happy',2200);setTimeout(()=>{if(performance.now()>purrUntil&&st=='home'&&!cat.dataset.a&&Math.random()<.4)setAct('groom',2300)},2600);
    const t=document.createElement('span');t.className='heart prr';t.textContent=rnd(['prrr','prrrr…','♡']);t.style.left=(x+SZ()*.5+(Math.random()*40-20))+'px';t.style.top=(y+10)+'px';document.body.appendChild(t);setTimeout(()=>t.remove(),1300)}
   return}
  if(pose!=='sit'||cat.dataset.a)return;
  if(e.clientY<H()*.22&&dist/Math.max(8,dtm)>1.6&&now-lastChat>20000){lastChat=now;setAct('chatter',1200);say(rnd(['ek-ek-ek… that bird is so done.','*plotting against the bird*']),1500);return}
  const cx=x+SZ()/2,cy=y+CH()*.8;if(Math.hypot(e.clientX-cx,e.clientY-cy)<SZ()*.75&&now-lastSwat>5000&&Math.random()<.5){lastSwat=now;setAct(e.clientX<cx?'swatL':'swat',600)}});
 // knock the coffee mug over, then look at you
 function knockMug(){const mg=cat.querySelector('.sit .mugg');if(!mg)return;mugGone=true;setAct('swatL',600);
  setTimeout(()=>{const r=cat.getBoundingClientRect(),k=r.width/200,el=document.createElement('div');el.className='cmugfall';el.setAttribute('aria-hidden','true');
   el.style.cssText='left:'+r.left+'px;top:'+(r.bottom-70*k)+'px;width:'+(56*k)+'px';el.innerHTML='<svg viewBox="0 120 56 50">'+mg.outerHTML+'</svg>';document.body.appendChild(el);cat.classList.add('nomug');
   setTimeout(()=>el.remove(),1600);say(rnd(['oops. not sorry.','*holds eye contact* …oops.','gravity check: still works.']),1800);setTimeout(()=>{cat.classList.remove('nomug');mugGone=false},9000)},230)}
 // a cardboard box appears; the cat climbs in
 function placeBox(){const bx=clampf(60+Math.random()*(W()-SZ()-120),12,W()-SZ()-12);boxEl=document.createElement('div');boxEl.className='cbox';boxEl.setAttribute('aria-hidden','true');
  boxEl.style.cssText='left:'+(bx+SZ()*.06)+'px;width:'+(SZ()*.88)+'px;bottom:'+(ph.matches?2:16)+'px';
  boxEl.innerHTML='<svg viewBox="0 0 120 70"><path d="M10 22L-6 6L26 10L34 22Z" fill="#b07a45"/><path d="M110 22L126 4L94 10L86 22Z" fill="#b07a45"/><rect x="8" y="22" width="104" height="48" rx="3" fill="#C9925A"/><rect x="8" y="22" width="104" height="7" fill="#a8723f"/><path d="M52 40H68" stroke="#8a5a2e" stroke-width="3" stroke-linecap="round"/><text x="60" y="60" text-anchor="middle" font-size="8" font-family="IBM Plex Mono,monospace" fill="#7a4d26">THIS SIDE UP</text></svg>';
  document.body.appendChild(boxEl);setTimeout(()=>{if(st=='home'&&!sleeping)go(bx,floor(),'tobox');else boxOut()},900)}
 function boxOut(){if(st=='inbox'){sink=0;st='home';hx=x;hop(620)}const b=boxEl;boxEl=null;if(b){setTimeout(()=>b.classList.add('gone'),500);setTimeout(()=>b.remove(),1100)}}
 cat.addEventListener('pointerdown',()=>{if(st=='inbox')boxOut()});
 // scrolling very fast gets commentary
 addEventListener('scroll',()=>{const now=performance.now();if(now-scrollT<1000)return;const v=Math.abs(scrollY-scrollMark)/(now-scrollT);scrollMark=scrollY;scrollT=now;
  if(v>3&&st=='home'&&seen&&!sleeping&&now-lastFast>25000&&now-lastStartle>1500){lastFast=now;say(rnd(['slow down, speedrunner.','you call that reading?','it took her weeks. scroll slower.']),2400)}},{passive:true});
 // a sudden big scroll makes it jump
 addEventListener('wheel',e=>{const now=performance.now();if(Math.abs(e.deltaY)>180&&st=='home'&&now-lastStartle>15000&&seen){lastStartle=now;hop(720);setAct('startle',700);say(rnd(['!','excuse me?!','rude.']),900)}},{passive:true});
 // come back to the tab after a while: it has brought you something
 document.addEventListener('visibilitychange',()=>{const now=performance.now();if(document.hidden){hidAt=now;return}
  if(!hidAt||now-hidAt<20000||st!=='home'||!seen)return;hidAt=0;wake();setTimeout(()=>{const g=document.createElement('div');g.className='cgift';g.setAttribute('aria-hidden','true');
   g.style.cssText='left:'+(x+SZ()*.72)+'px;bottom:'+(ph.matches?8:22)+'px';g.innerHTML='<svg viewBox="0 0 60 34"><path d="M4 28C-6 18 6 8 14 18" fill="none" stroke="#9a8f88" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="32" cy="22" rx="20" ry="11" fill="#b9b0aa"/><circle cx="46" cy="12" r="6" fill="#b9b0aa"/><circle cx="46" cy="12" r="3" fill="#E9A0A8"/><circle cx="51" cy="21" r="1.6" fill="#1a1311"/><circle cx="56" cy="24" r="1.8" fill="#E4666F"/></svg>';
   document.body.appendChild(g);hop(420);say(rnd(['brought you this. say thank you.','a gift. i expect gratitude.','for you. it fought bravely. i won.']),2800);setTimeout(()=>g.classList.add('gone'),7000);setTimeout(()=>g.remove(),7800)},700)});
 ['wheel','keydown','touchstart'].forEach(ev=>addEventListener(ev,act,{passive:true}));
 addEventListener('resize',()=>{if(st=='home'||st=='away'){hx=clampf(hx,8,W()-SZ()-8);x=tx=hx;y=ty=floor()}});
 cat.addEventListener('pointerdown',e=>{held={sx:e.clientX,sy:e.clientY,m:false};try{cat.setPointerCapture(e.pointerId)}catch(_){}wake();lastAct=performance.now()});
 const release=ev=>{if(!held)return;const m=held.m;held=null;cat.classList.remove('held');if(m){st='fall';vy=0;return}
   // a quick tap on the cat while it sits over a link or button goes to that link or button instead
   if(ev&&ev.type=='pointerup'){const under=document.elementsFromPoint(ev.clientX,ev.clientY).find(el=>!el.closest('#cat')),hit=under&&under.closest('a[href],button,input,select,textarea,label,[role=button]');
    if(hit){if(/^(INPUT|SELECT|TEXTAREA)$/.test(hit.tagName))hit.focus();else hit.click();return}}
   const tn=performance.now();if(tn<sulkUntil){say('…',900);return}
   clicks=clicks.filter(t=>tn-t<6000);clicks.push(tn);if(clicks.length>=4){clicks=[];sulkUntil=tn+10000;cool=tn+15000;setTail('flick',1600);say(rnd(['hmph. touch me again, i dare you.','enough clicking. i’m not a button.','i need space. and tuna.']),1800);
    setTimeout(()=>go(x>W()/2?40:W()-SZ()-40,floor(),'patrol'),700);return}
   const nm=ORDER[(ORDER.indexOf(mood)+1)%ORDER.length];manualUntil=performance.now()+25000;setMood(nm,true);say(MOODS[nm].line,2800);
   for(let i=0;i<4;i++){const h=document.createElement('span');h.className='heart';h.textContent='♡';h.style.left=(x+SZ()/2+(Math.random()*44-22))+'px';h.style.top=(y+8)+'px';h.style.animationDelay=i*.09+'s';document.body.appendChild(h);setTimeout(()=>h.remove(),1500)}};
 cat.addEventListener('pointerup',release);cat.addEventListener('pointercancel',release);
 document.addEventListener('pointerover',e=>{if(st!=='home'||sleeping)return;const t=e.target;if(!t.closest)return;if(t.closest('.cb.wa')&&!tip.wa){tip.wa=1;say('psst… WhatsApp is fastest ♡',3000)}else if(t.closest('[data-cb]')&&!tip.cb){tip.cb=1;say('go on. click it. i dare you.',2600)}else if(t.closest('a[href^="mailto:"]')&&!tip.ml){tip.ml=1;say('email her. she replies faster than i do.',2800)}else if(t.closest('.labcv')&&!tip.lab){tip.lab=1;say('drag it. go on. i’ll judge. ↻',2800)}else if(t.closest('#board')&&!tip.brd){tip.brd=1;say('drag the photos. i rated them all 10/10.',3000)}});
 setTimeout(()=>{x=W()+80;y=floor();seen=true;go(hx,floor(),'back');nextAct=performance.now()+3800},3300);
 function tick(now){if(pageHeld()){last=now;requestAnimationFrame(tick);return}const dt=Math.min(.05,(now-last)/1000);last=now;
  if(pose=='sit'){if(now<lookUntil){px2=(Math.sin(now/260)*.9)}const cx=x+SZ()/2,cy=y+CH()*.4,dx=px-cx,dy=py-cy,dd=Math.hypot(dx,dy)||1,k=Math.min(1,dd/300),sc=mood=='shark'?5:3.2,tr=now<lookUntil?`translate(${(px2*sc).toFixed(2)}px,${(Math.sin(now/410)*sc*.3).toFixed(2)}px)`:`translate(${(dx/dd*sc*k).toFixed(2)}px,${(dy/dd*sc*.8*k).toFixed(2)}px)`;eyeEls.forEach(e=>{if(e)e.style.transform=tr})}
  if(now>manualUntil&&typeof secs!=='undefined'){let c=0;tops.forEach((t,i)=>{if(scrollY+innerHeight*.5>=t)c=i});const id=secs[c][0];if(id!==lastSec){lastSec=id;if(SM[id])setMood(SM[id],st=='home'&&seen)}}
  if(Math.abs(scrollY-lastY)>1){lastY=scrollY;lastAct=now;wake();if(st=='walk'||st=='greet')retreat()}
  if(st=='home'&&!sleeping&&pose=='sit'&&!cat.dataset.a&&pm&&now-stillSince>1800&&now-lastBlink>9000&&Math.hypot(px-(x+SZ()/2),py-(y+CH()/2))<260){
   lastBlink=now;setAct('slowblink',1500);if(!blinkTold){blinkTold=true;setTimeout(()=>say('that was a slow blink. it means i tolerate you. ♡',3200),1500)}}
  if(st=='home'&&!sleeping&&pose=='sit'&&now>nextAct&&!hopping&&!cat.dataset.a)startAct(now);
  if(st=='home'){
   if(!sassIdle&&!sleeping&&!kneading&&seen&&now-lastAct>Math.min(18000,sleepAfter()-4000)){sassIdle=true;say(rnd(['still there? just email her already.','so… are you going to hire her or not?','the call back button is right there. just saying.']),3600)}
   if(now-lastAct>2700&&now>cool&&now>sulkUntil&&visits<9&&document.hasFocus())visit();
   else if(now-lastAct>sleepAfter()&&!sleeping&&!kneading){kneading=true;setAct('knead',2200);
    setTimeout(()=>{if(st!=='home'||performance.now()-lastAct<sleepAfter()-2000){kneading=false;return}cat.classList.add('circle');
     setTimeout(()=>{cat.classList.remove('circle');kneading=false;if(st=='home'&&performance.now()-lastAct>sleepAfter()-2000){sleeping=true;setPose('sleep')}},700)},2200)}
   }
  if(st=='held'&&held){x=px-SZ()/2;y=py-CH()*.35}
  if(st=='fall'){vy+=1900*dt;y+=vy*dt;const fl=floor();if(y>=fl){y=fl;vy=-vy*.34;if(Math.abs(vy)<140){vy=0;st='home';hx=x=clampf(x,8,W()-SZ()-8);setPose('sit');setTimeout(()=>{if(st=='home'){setAct('groom',2300);say(rnd(['i meant to do that.','…nobody saw that. right?','graceful. as always. don’t.']),2200)}},350)}}}
  if(hopping){hv+=1900*dt;hy+=hv*dt;if(hy>=0){hy=0;hv=0;hopping=false;cat.classList.add('squash');setTimeout(()=>cat.classList.remove('squash'),260)}}
  if(st=='walk'||st=='back'||st=='patrol'||st=='zoom'||st=='chase'||st=='pounce'||st=='snub'||st=='tobox'){const ddx=tx-x,ddy=ty-y,d=Math.hypot(ddx,ddy),sp=(st=='pounce'?900:st=='zoom'?760:st=='chase'?560:300)*dt;cat.classList.toggle('fl',ddx<-1);if(d<=sp){x=tx;y=ty;arrive()}else{x+=ddx/d*sp;y+=ddy/d*sp}}
  if(seen)cat.style.transform=`translate3d(${x.toFixed(1)}px,${(y+hy+sink).toFixed(1)}px,0)`;
  requestAnimationFrame(tick)}
 requestAnimationFrame(tick);
})();
