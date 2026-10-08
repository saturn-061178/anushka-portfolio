// Motion graphics layered on top of the pages. Styles are in css/motion.css.
// Everything here is decorative: with "reduce motion" switched on, none of it runs.
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// the MOTION switch on project pages; remembered between visits
let motionOff=false;try{motionOff=localStorage.getItem('motion')=='off'}catch(e){}
function still(){return calm||motionOff}
function setMotion(on){motionOff=!on;try{localStorage.setItem('motion',on?'on':'off')}catch(e){}applyRoute(location.hash)}
function slateMs(){return still()?0:1000} // how long the title slate covers a project page

// ---- 1. title slate: a film-style card that plays when a project opens ----
function slate(i){const p=PROJECTS[i],no=String(i+1).padStart(2,'0'),roll=[...new Set(['00',String(Math.max(0,i-1)).padStart(2,'0'),String(i).padStart(2,'0'),no])];
 const s=document.createElement('div');s.className='pjslate';s.setAttribute('aria-hidden','true');
 s.innerHTML='<div class="sl-in"><span class="mo sl-k">CASE</span><span class="sl-n"><b style="--n:'+(roll.length-1)+'">'+roll.map(x=>'<span>'+x+'</span>').join('')+'</b></span><i class="sl-l"></i><span class="sl-t"><b>'+p.title+'</b></span><span class="mo sl-m">'+p.tags.toUpperCase()+'</span></div>';
 pageEl.appendChild(s);const done=()=>s.remove();
 s.addEventListener('animationend',e=>{if(e.animationName=='slOut')done()});setTimeout(done,2600)}

// ---- 2. kinetic title band: outlined type that slides as you scroll ----
function titleBand(p){const t=(p.title+' — '+p.tags.replace(/ · /g,' — ')+' — ').repeat(5);
 return '<div class="pjmq" aria-hidden="true"><div class="pjmq-a">'+t+'</div><div class="pjmq-b">'+t+'</div></div>'}

// ---- 3. spinning badge on the "next case" band ----
const BADGE='<span class="nxb" aria-hidden="true"><svg viewBox="0 0 120 120"><defs><path id="nxp" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0"/></defs><text><textPath href="#nxp">NEXT PROJECT · NEXT PROJECT · </textPath></text><path class="nxa" d="M44 60H76M64 48L76 60L64 72"/></svg></span>';

// called by js/project-pages.js after a project page is drawn
function pageMotion(i){
 pageEl.querySelectorAll('.pgnext').forEach(a=>{if(!a.querySelector('.nxb'))a.insertAdjacentHTML('beforeend',BADGE)});
 if(still())return;
 const pj=pageEl.querySelector('.pj'),nx=pj&&pj.querySelector('.pgnext');
 if(nx)nx.insertAdjacentHTML('beforebegin',titleBand(PROJECTS[i]));
 slate(i)}

// ---- 4. scroll physics inside a project page: the band slides, the frames lean with scroll speed ----
if(!calm){let last=0,vel=0,run=false;
 const tick=()=>{vel*=.86;pageEl.style.setProperty('--vsk',(vel*.022).toFixed(3)+'deg');if(Math.abs(vel)>.4)requestAnimationFrame(tick);else{run=false;pageEl.style.setProperty('--vsk','0deg')}};
 pageEl.addEventListener('scroll',()=>{const y=pageEl.scrollTop,d=y-last;last=y;
  if(Math.abs(d)<400)vel=Math.max(-60,Math.min(60,vel+d*.5));if(!run){run=true;requestAnimationFrame(tick)}
  const mq=pageEl.querySelector('.pjmq');if(mq){const r=mq.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)mq.style.setProperty('--mx',((innerHeight-r.top)*.35).toFixed(1)+'px')}},{passive:true});

 // ---- 5. Projects page covers tilt toward the pointer, with a soft light that follows it ----
 pageEl.addEventListener('pointermove',e=>{const c=e.target.closest('.wkp');if(!c)return;const r=c.querySelector('.wkp-vis').getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  c.style.setProperty('--ry',((Math.max(0,Math.min(1,x))-.5)*9).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-Math.max(0,Math.min(1,y)))*7).toFixed(2)+'deg');c.style.setProperty('--sx',(x*100).toFixed(1)+'%');c.style.setProperty('--sy',(y*100).toFixed(1)+'%')});
 pageEl.addEventListener('pointerout',e=>{const c=e.target.closest('.wkp');if(c&&!c.contains(e.relatedTarget)){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}});

 // ---- 6. magnetic buttons: they lean toward the pointer and spring back ----
 const MAG='.cta2,.mail,.cb,.vall,.shuf,.pgb,.pgnav a,.gvb';let held=null;
 if(matchMedia('(hover:hover)').matches)addEventListener('pointermove',e=>{const b=e.target.closest&&e.target.closest(MAG);
  if(held&&held!==b){held.style.translate='';held=null}
  if(!b)return;const r=b.getBoundingClientRect();held=b;b.style.translate=((e.clientX-r.left-r.width/2)*.28).toFixed(1)+'px '+((e.clientY-r.top-r.height/2)*.36).toFixed(1)+'px'})}
