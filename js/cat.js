// ================= CAT v3: black cat, four moods =================
(function(){
 const cat=$('#cat'),bub=$('#cbub'),mlab=$('#cmood'),eyeEls=[$('#ceyes'),$('#ceyesD'),$('#ceyesS')];if(!cat)return;
 const W=()=>innerWidth,H=()=>innerHeight,SZ=()=>cat.offsetWidth||150,CH=()=>cat.offsetHeight||150,ph=matchMedia('(max-width:600px)');
 const floor=()=>H()-CH()-(ph.matches?10:26);
 const MOODS={coffee:{label:'COFFEE BREAK',line:'coffee first, design later ☕',greet:['hi! want a coffee? ☕','nice to see you ♡','still sipping. hello!']},
  deadline:{label:'DEADLINE MODE',line:'meow… deadlines. work. work. work.',greet:['not now, deadlines.','do you have tuna? asking for a deadline','typing… typing… hi.']},
  shark:{label:'SHARK MODE',line:'rawr? (i am a shark. do not question it)',greet:['rawr. hi.','i am a shark. hello.','do not be scared. probably.']},
  diva:{label:'DIVA MODE',line:'darling, that kerning… ✦',greet:['darling, you paused. how chic.','i approve of this portfolio ✦','hello, darling.']}};
 const ORDER=['coffee','deadline','shark','diva'],SM={top:'coffee',works:'deadline',leader:'deadline',lab:'deadline',quiet:'diva',apr:'diva',about:'diva',corner:'shark',contact:'coffee'};
 let px2=0,nextAct=performance.now()+6600,actEnd=0,hy=0,hv=0,hopping=false,zw=[],lookUntil=0,mood='coffee',manualUntil=0,lastSec='',hx=W()-SZ()-14,x=W()+120,y=floor(),tx=x,ty=y,st='away',pose='sit',last=performance.now(),lastAct=last,cool=last+3600,visits=0,lastY=scrollY,px=W()*.6,py=H()*.6,pm=false,gs=null,sleeping=false,seen=false,vy=0,held=null,nextPatrol=last+11000+Math.random()*6000,tip={};
 const clampf=(v,a,b)=>Math.max(a,Math.min(b,v));
 function hop(power){if(hopping)return;hopping=true;hv=-(power||560);hy=-1}
 const setAct=(a,ms)=>{cat.dataset.a=a;clearTimeout(setAct.t);setAct.t=setTimeout(()=>{cat.dataset.a=''},ms)};
 const setPose=p=>{if(p!==pose){pose=p;cat.dataset.p=p}};
 const say=(t,ms)=>{bub.textContent=t;const cx=x+SZ()/2;bub.style.setProperty('--bo',(cx<110?110-cx:cx>W()-110?W()-110-cx:0)+'px');bub.classList.add('on');clearTimeout(say.t);say.t=setTimeout(()=>bub.classList.remove('on'),ms||3400)};
 function setMood(m,announce){if(m===mood&&!announce)return;const changed=m!==mood;mood=m;cat.dataset.m=m;if(announce&&changed){mlab.textContent=MOODS[m].label;mlab.classList.add('on');clearTimeout(setMood.t);setMood.t=setTimeout(()=>mlab.classList.remove('on'),2400)}}
 function wake(){if(sleeping){sleeping=false;if(st=='home')setPose('sit')}}
 function go(a,b,s2){tx=a;ty=b;st=s2;setPose('walk');cat.classList.toggle('fl',a<x)}
 function visit(){wake();visits++;go(clampf(pm?px+90:W()*.5,12,W()-SZ()-12),clampf(pm?py+36:floor(),90,floor()),'walk')}
 function startAct(now){const idle=now-lastAct,pool=[['tilt',1],['groom',1],['stretch',1],['hop',1.3],['wiggle',.7],['look',1]];
  if(idle>800)pool.push(['wander',1.5]);if(idle>1400)pool.push(['zoom',.7]);if(pm&&idle<1400&&Math.abs(px-(x+SZ()/2))>240)pool.push(['chase',1.6]);
  let t=pool.reduce((a,b)=>a+b[1],0)*Math.random(),pick='tilt';for(const p of pool){t-=p[1];if(t<=0){pick=p[0];break}}
  nextAct=now+2400+Math.random()*3000;
  if(pick=='tilt')setAct('tilt',1700);else if(pick=='groom')setAct('groom',2300);else if(pick=='stretch')setAct('stretch',2100);else if(pick=='wiggle'){setAct('wiggle',900);setTimeout(()=>hop(500),900)}
  else if(pick=='hop'){hop(600);if(mood=='shark')say('rawr!',1200)}else if(pick=='look')lookUntil=now+2200;
  else if(pick=='wander'){go(clampf(60+Math.random()*(W()-SZ()-120),12,W()-SZ()-12),floor(),'patrol')}
  else if(pick=='zoom'){const a=clampf(40+Math.random()*(W()*.3),12,W()-SZ()-12),b=clampf(W()*.6+Math.random()*(W()*.3),12,W()-SZ()-12);zw=[b,a,clampf(hx,12,W()-SZ()-12)];go(a,floor(),'zoom');say('zoomies!!',1400)}
  else if(pick=='chase'){go(clampf(px-SZ()/2,12,W()-SZ()-12),floor(),'chase');say('got you!',1200)}}
 function retreat(){bub.classList.remove('on');go(hx,floor(),'back');cool=performance.now()+15000}
 function arrive(){if(st=='zoom'){if(zw.length){tx=zw.shift();cat.classList.toggle('fl',tx<x);return}st='home';hx=x;setPose('sit');hop(420);return}if(st=='chase'){st='home';hx=x;setPose('sit');hop(760);setAct('wiggle',900);return}if(st=='walk'){st='greet';setPose('sit');gs={x:px,y:py};const g=MOODS[mood].greet;say(g[Math.floor(Math.random()*g.length)],3800);setTimeout(()=>{if(st=='greet')retreat()},4300)}else{st='home';hx=x;setPose(sleeping?'sleep':'sit')}}
 const act=()=>{lastAct=performance.now();wake();if(st=='walk'||st=='greet')retreat()};
 addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;pm=true;lastAct=performance.now();wake();if(held){if(!held.m&&Math.hypot(e.clientX-held.sx,e.clientY-held.sy)>6){held.m=true;st='held';setPose('sit');cat.classList.add('held');bub.classList.remove('on')}return}
  if(st=='greet'&&gs&&Math.hypot(px-gs.x,py-gs.y)>70)retreat();else if(st=='walk'){tx=clampf(px+90,12,W()-SZ()-12);ty=clampf(py+36,90,floor())}});
 ['wheel','keydown','touchstart'].forEach(ev=>addEventListener(ev,act,{passive:true}));
 addEventListener('resize',()=>{if(st=='home'||st=='away'){hx=clampf(hx,8,W()-SZ()-8);x=tx=hx;y=ty=floor()}});
 cat.addEventListener('pointerdown',e=>{held={sx:e.clientX,sy:e.clientY,m:false};try{cat.setPointerCapture(e.pointerId)}catch(_){}wake();lastAct=performance.now()});
 const release=()=>{if(!held)return;const m=held.m;held=null;cat.classList.remove('held');if(m){st='fall';vy=0;return}
   const nm=ORDER[(ORDER.indexOf(mood)+1)%ORDER.length];manualUntil=performance.now()+25000;setMood(nm,true);say(MOODS[nm].line,2800);
   for(let i=0;i<4;i++){const h=document.createElement('span');h.className='heart';h.textContent='♡';h.style.left=(x+SZ()/2+(Math.random()*44-22))+'px';h.style.top=(y+8)+'px';h.style.animationDelay=i*.09+'s';document.body.appendChild(h);setTimeout(()=>h.remove(),1500)}};
 cat.addEventListener('pointerup',release);cat.addEventListener('pointercancel',release);
 document.addEventListener('pointerover',e=>{if(st!=='home'||sleeping)return;const t=e.target;if(!t.closest)return;if(t.closest('.cb.wa')&&!tip.wa){tip.wa=1;say('psst… WhatsApp is fastest ♡',3000)}else if(t.closest('.labcv')&&!tip.lab){tip.lab=1;say('drag it around! ↻',2800)}else if(t.closest('#board')&&!tip.brd){tip.brd=1;say('drag those photos around!',3000)}});
 setTimeout(()=>{x=W()+80;y=floor();seen=true;go(hx,floor(),'back');nextAct=performance.now()+3800},3300);
 function tick(now){const dt=Math.min(.05,(now-last)/1000);last=now;
  if(pose=='sit'){if(now<lookUntil){px2=(Math.sin(now/260)*.9)}const cx=x+SZ()/2,cy=y+CH()*.4,dx=px-cx,dy=py-cy,dd=Math.hypot(dx,dy)||1,k=Math.min(1,dd/300),sc=mood=='shark'?5:3.2,tr=now<lookUntil?`translate(${(px2*sc).toFixed(2)}px,${(Math.sin(now/410)*sc*.3).toFixed(2)}px)`:`translate(${(dx/dd*sc*k).toFixed(2)}px,${(dy/dd*sc*.8*k).toFixed(2)}px)`;eyeEls.forEach(e=>{if(e)e.style.transform=tr})}
  if(now>manualUntil&&typeof secs!=='undefined'){let c=0;tops.forEach((t,i)=>{if(scrollY+innerHeight*.5>=t)c=i});const id=secs[c][0];if(id!==lastSec){lastSec=id;if(SM[id])setMood(SM[id],st=='home'&&seen)}}
  if(Math.abs(scrollY-lastY)>1){lastY=scrollY;lastAct=now;wake();if(st=='walk'||st=='greet')retreat()}
  if(st=='home'&&!sleeping&&pose=='sit'&&now>nextAct&&!hopping&&!cat.dataset.a)startAct(now);
  if(st=='home'){
   if(now-lastAct>2700&&now>cool&&visits<9&&document.hasFocus())visit();
   else if(now-lastAct>32000&&!sleeping){sleeping=true;setPose('sleep')}
   }
  if(st=='held'&&held){x=px-SZ()/2;y=py-CH()*.35}
  if(st=='fall'){vy+=1900*dt;y+=vy*dt;const fl=floor();if(y>=fl){y=fl;vy=-vy*.34;if(Math.abs(vy)<140){vy=0;st='home';hx=x=clampf(x,8,W()-SZ()-8);setPose('sit')}}}
  if(hopping){hv+=1900*dt;hy+=hv*dt;if(hy>=0){hy=0;hv=0;hopping=false;cat.classList.add('squash');setTimeout(()=>cat.classList.remove('squash'),260)}}
  if(st=='walk'||st=='back'||st=='patrol'||st=='zoom'||st=='chase'){const ddx=tx-x,ddy=ty-y,d=Math.hypot(ddx,ddy),sp=(st=='zoom'?760:st=='chase'?560:300)*dt;cat.classList.toggle('fl',ddx<-1);if(d<=sp){x=tx;y=ty;arrive()}else{x+=ddx/d*sp;y+=ddy/d*sp}}
  if(seen)cat.style.transform=`translate3d(${x.toFixed(1)}px,${(y+hy).toFixed(1)}px,0)`;
  requestAnimationFrame(tick)}
 requestAnimationFrame(tick);
})();
