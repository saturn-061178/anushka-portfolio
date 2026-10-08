// hero letters swell under the pointer, starting from the site heading weight (--hw in css/typography.css)
const HERO_W=+getComputedStyle(document.documentElement).getPropertyValue("--hw")||400;
$('#track').innerHTML=P.map((p,i)=>`<a class="fr f${i}" href="#contact"><div class="art">${i==0?p[2].replace('slice','meet'):p[2]}</div><svg class="ov" viewBox="0 0 100 110"><path pathLength="1" d="${D[p[3]]}"/></svg><div class="c"><span class="mo mt">CASE 0${i+1}</span><h3>${p[0]}</h3><p>${p[1]}</p><p class="dsc">${p[4]}</p><span class="mo vc">VIEW CASE →</span></div></a>`).join('');
$('#rail').innerHTML=PROJECTS.map((p,i)=>'<i'+(i?'':' class="on"')+'><b class="mo">'+p.rail+'</b></i>').join('');$('#rc').textContent='01 / '+String(P.length).padStart(2,'0');
$('#plist').innerHTML=PROJECTS.map((p,i)=>'<a class="prow" href="#/case/'+p.slug+'" data-cur="OPEN CASE"><span class="mo pn">'+String(i+1).padStart(2,'0')+'</span><h3>'+p.skill+'</h3><span class="par" aria-hidden="true">→</span></a>').join('');
$$('.apr h2,.ab h2,.ab p,.ct h2,.mail').forEach(e=>e.classList.add('rv'));
// draw-on-view
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.35});
$$('#tri,.pad,.rv').forEach(e=>io.observe(e));$$('.sk').forEach(e=>io.observe(e));
// scroll engine (eased wheel scroll + scene choreography)
const hero=$('#top'),reel=$('#works'),track=$('#track'),fig=$('#fig'),orb=$('#orb'),secs=[['top','SCENE 01 · THE SKETCH'],['about','SCENE 01 · THE PERSON'],['leader','SCENE 02 · SELECTED WORK'],['works','SCENE 02 · SELECTED WORK'],['contact','SCENE 03 · SAY HELLO'],['quiet','SCENE 04 · THE METHOD'],['apr','SCENE 04 · THE METHOD'],['lab','SCENE 04 · THE METHOD'],['corner','SCENE 05 · THE CORNER']],links=$$('nav a');
const pad=n=>String(n).padStart(2,'0'),maxS=()=>document.documentElement.scrollHeight-innerHeight;
let tops=[],mxn=0,cur=scrollY,target=scrollY,lastSc='';
const measure=()=>{tops=secs.map(s=>$('#'+s[0]).offsetTop)};measure();addEventListener('resize',measure);addEventListener('load',measure);
addEventListener('pointermove',e=>mxn=e.clientX/innerWidth-.5);
if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&!matchMedia('(pointer:coarse)').matches)addEventListener('wheel',e=>{if(e.ctrlKey||document.body.classList.contains('pgopen'))return;e.preventDefault();target=Math.max(0,Math.min(maxS(),target+e.deltaY*(e.deltaMode==1?32:1)))},{passive:false});
addEventListener('scroll',()=>{if(Math.abs(scrollY-cur)>3){target=cur=scrollY}},{passive:true});
const tg=$('#tg'),tech=$('#tech'),it0={v:0},irL=$('#irL'),irR=$('#irR');let mxp=0,myp=0;
addEventListener('pointermove',e=>{mxp=e.clientX;myp=e.clientY});
const obs=$$('.ob'),leads=$$('#lead line'),cap3t=$('#cap3t'),capd=$$('#cap3 i'),tang=$('#tang'),clean=$('#clean'),scrR=$('#scr'),scanE=$('.scan'),bnE=$('#bn'),supE=$('.sup');let capk=-1,wk=-1;const ldn=$('#ldn'),ldc=$('#ldc'),ldt=$('#ldt'),lds=$('#lds');const dmf=$('.dm-f');let T00=performance.now();
(function(){let d='M300 300',a=0;for(let i=0;i<26;i++){a+=2.1+Math.random();const r=70+Math.random()*190;d+=`C${300+Math.cos(a-.6)*r*1.3} ${300+Math.sin(a-.6)*r*1.3} ${300+Math.cos(a)*r*.5} ${300+Math.sin(a)*r*1.5} ${300+Math.cos(a+.5)*r} ${300+Math.sin(a+.5)*r}`}tang.setAttribute('d',d)})();
[tang,clean].forEach(e=>{e.style.strokeDasharray=1;e.style.strokeDashoffset=1});
$$('#fig .ln').forEach(p=>{p.setAttribute('pathLength',1);p.style.strokeDasharray=1;p.style.strokeDashoffset=1});const lns=$$('#fig .ln');
function frame(){
  if(Math.abs(target-cur)>.3){cur+=(target-cur)*.085;scrollTo(0,cur)}
  document.documentElement.style.setProperty('--sk',(Math.max(-1,Math.min(1,(target-cur)/500))*-2.5).toFixed(2)+'deg');
  const vh=innerHeight,y=cur,q=Math.min(1,Math.max(0,y/(hero.offsetHeight-vh)))||0;
  it0.v=Math.min(.8,Math.max(0,(performance.now()-T00-900)/3600*.8));const ip=Math.max(it0.v/.8,Math.min(1,q*14))||0;
  lns.forEach((l,i)=>l.style.strokeDashoffset=1-seg(ip,i*.03,.5+i*.03));
  const sc=ez(seg(ip,.4,1));scrR.setAttribute('height',sc*540);scanE.style.top=sc*100+'%';scanE.style.opacity=(sc>0&&sc<1)?1:0;scanE.firstChild.textContent='SCAN '+Math.round(sc*100)+'%';
  const sh=ez(seg(q,.14,.34))*-.06*innerWidth;
  fig.style.transform=`translate(${mxn*-14+sh}px,${(1-ez(seg(ip,0,.4)))*30}vh)`;
  dmf.style.opacity=1-seg(q,.04,.1);tg.style.transform=`rotate(${(ip+q*2)*100}deg)`;tech.style.opacity=seg(ip,0,.4)*.9;
  bnE.style.clipPath=`inset(0 ${(1-ip)*100}% 0 0)`;
  supE.style.opacity=seg(ip,.5,.9)*(1-seg(q,.08,.18));supE.style.transform=`translateY(${(1-seg(ip,.5,.9))*14-seg(q,.08,.18)*22}px)`;
  tang.style.opacity=.55*seg(q,.12,.2)*(1-seg(q,.5,.58));tang.style.strokeDashoffset=Math.min(1,Math.max(0,1-seg(q,.12,.28)+seg(q,.32,.5)));clean.style.strokeDashoffset=1-seg(q,.34,.6);
  const ep=fig.getBoundingClientRect(),ex=Math.max(-1,Math.min(1,(mxp-(ep.left+ep.width*.55))/400)),ey=Math.max(-1,Math.min(1,(myp-(ep.top+ep.height*.33))/300));irL.setAttribute('transform',`translate(${ex*3} ${ey*2.5})`);irR.setAttribute('transform',`translate(${ex*3} ${ey*2.5})`);
  {const A=[-105,-40,25,150].map(d=>d*Math.PI/180),RT=[-38,52,-26,34],J=[[46,-34],[-54,44],[34,56],[-46,-40]],cx=ep.left+ep.width*.5,cy=ep.top+ep.height*.48,rx=Math.min(ep.width*.8,innerWidth*.3),ry=ep.height*.44,far=Math.max(innerWidth,innerHeight)*.9;
   const oi=ez(seg(q,.12,.24)),oa=ez(seg(q,.3,.56)),lb=seg(q,.58,.7),ex2=1-seg(q,.9,.96),spinA=seg(q,.58,.95)*Math.PI*1.6;
   obs.forEach((o,i)=>{const w=o.offsetWidth/2,ca=Math.cos(A[i]),sa=Math.sin(A[i]);
    const fx=cx+ca*far,fy=cy+sa*far*.7,chx=cx+ca*rx*1.3+J[i][0],chy=cy+sa*ry*1.35+J[i][1],ae=A[i]+spinA*oa,rgx=cx+Math.cos(ae)*rx,rgy=cy+Math.sin(ae)*ry;
    let x=fx+(chx-fx)*oi,y=fy+(chy-fy)*oi;x+=(rgx-x)*oa;y+=(rgy-y)*oa;y+=Math.sin(q*14+i*1.7)*5*oa;
    const rot=RT[i]*(1-oa)+Math.sin(q*9+i)*(1-oa)*8;
    o.style.transform=`translate(${x-w}px,${y-w}px) rotate(${rot}deg) scale(${.86+.28*(Math.sin(ae)+1)/2})`;o.style.zIndex=Math.round((Math.sin(ae)+1)*5);o.style.opacity=seg(q,.12,.2)*ex2;o.lastChild.style.opacity=lb;
    const L=leads[i];L.setAttribute('x1',x);L.setAttribute('y1',y);L.setAttribute('x2',cx);L.setAttribute('y2',cy);L.style.opacity=.5*lb*ex2})}
  const ck=q<.3?0:q<.6?1:2;if(ck!==capk){capk=ck;cap3t.textContent=['01 — COMPLEXITY','02 — STRUCTURE','03 — CLARITY'][ck];capd.forEach((d,i)=>d.classList.toggle('on',i<=ck))}
  $('#bn').style.transform=`translateY(${(1-seg(q,0,.3))*20}vh)`;
  const o1=Math.min(seg(it0.v/.8,.35,.7),1-seg(q,.26,.32)),o2=Math.min(seg(q,.34,.4),1-seg(q,.56,.62)),o3=seg(q,.62,.68);
  [['#t1',o1],['#t2',o2],['#t3',o3]].forEach(([id,o])=>{const e=$(id);e.style.opacity=o;e.style.transform=`translateY(${(1-o)*34}px)`});
  $('#hint').style.opacity=1-seg(q,0,.05);
  {const le=$('#leader'),lr=le.getBoundingClientRect(),lp=Math.min(1,Math.max(0,-lr.top/(le.offsetHeight-vh))),k=Math.min(2,Math.floor(lp*3));le.style.setProperty('--sp',(-(scrollY*.6)%40)+'px');ldn.textContent=3-k;ldc.style.setProperty('--a',(((lp*3)%1)*360)+'deg');ldc.style.filter='brightness('+(1+(Math.random()-.5)*.28*(lp>0&&lp<1?1:0))+')';ldt.style.opacity=seg(lp,.45,.85);lds.style.opacity=seg(lp,.6,.95)*.8}

    const rp=Math.min(1,Math.max(0,(y-reel.offsetTop)/(reel.offsetHeight-vh)));
  track.style.transform=`translateX(${-rp*(track.scrollWidth-innerWidth*.9)}px)`;
  if(Math.abs(y-reel.offsetTop)<reel.offsetHeight+vh){let best=0,bf=-1;$$('.fr').forEach((e,i)=>{const r=e.getBoundingClientRect(),c=r.left+r.width/2,fv=Math.max(0,1-Math.abs(c-innerWidth*.42)/(innerWidth*.45));e.style.setProperty('--f',fv.toFixed(3));if(fv>bf){bf=fv;best=i}});if(best!==wk){wk=best;$('#rc').textContent='0'+(best+1)+' / 0'+P.length;$$('#rail i').forEach((t,i)=>t.classList.toggle('on',i==best))}}

  let c=0;tops.forEach((t,i)=>{if(y+vh*.5>=t)c=i});
  if(secs[c][1]!==lastSc){lastSc=secs[c][1];$('#sc').textContent=lastSc.replace(/SCENE 0(\d)/,'SCENE 0$1 / 05');{const NM={top:'top',about:'top',leader:'/work',works:'/work',contact:'contact',quiet:'quiet',apr:'quiet',lab:'quiet',corner:'corner'},cid=NM[secs[c][0]];links.forEach(l=>{const on=l.getAttribute('href')==='#'+cid;l.classList.toggle('on',on);if(on)l.setAttribute('aria-current','page');else l.removeAttribute('aria-current')});(window.moveNb&&moveNb())}}
  const t=y/40;$('#tc').textContent=`${pad(Math.floor(t/60))}:${pad(Math.floor(t%60))}:${pad(Math.floor(t*24%24))}`;
  $('#rb').style.width=100*y/maxS()+'%';
  const pg2=Math.min(1,Math.max(0,y/maxS()));document.documentElement.style.setProperty('--tod',pg2.toFixed(3));

  requestAnimationFrame(frame)}
frame();
// nav smooth
links.forEach(a=>a.onclick=e=>{if(a.getAttribute('href').startsWith('#/'))return;e.preventDefault();const t=$(a.getAttribute('href'));target=Math.min(maxS(),t.offsetTop);if(matchMedia('(pointer:coarse)').matches)scrollTo({top:target,behavior:'smooth'})});
// pencil trail


$('#sc').onclick=()=>{const t=$('#toast');t.textContent='The portfolio was supposed to be normal. Then I started overthinking it.';t.classList.add('on');setTimeout(()=>t.classList.remove('on'),4200)};
// corner room
const PH={"p1":"assets/site/img-07.webp","p2":"assets/site/img-08.webp","p3":"assets/site/img-09.webp","p4":"assets/site/img-10.webp","p5":"assets/site/img-11.webp","p6":"assets/site/img-12.webp","p7":"assets/site/img-13.webp","p8":"assets/site/img-14.webp","p9":"assets/site/img-15.webp","p10":"assets/site/img-16.webp","p11":"assets/site/img-17.webp","p12":"assets/site/img-18.webp","p13":"assets/site/img-19.webp","p14":"assets/site/img-20.webp","p15":"assets/site/img-21.webp","p16":"assets/site/img-22.webp","l_tech":"assets/site/img-23.webp","l_type":"assets/site/img-24.webp","l_ui":"assets/site/img-25.webp","l_cat":"assets/site/img-26.webp","me":"assets/site/img-27.webp","line":"assets/site/img-28.webp","contact": "assets/site/img-29.jpg", "i1": "assets/site/img-30.jpg", "i2": "assets/site/img-31.jpg", "i3": "assets/site/img-32.jpg", "para": "assets/site/img-33.jpg", "edu": "assets/site/img-34.jpg"};
$$('[data-k]').forEach(i=>i.src=PH[i.dataset.k]);
const board=$('#board'),cnct=$('#cnct'),dragme=$('#dragme');let zz=30;
// ---- corner: filterable scrapbook wall ----
const CORNER=[['p1','SAREE DAY','people'],['contact','SNOW DAY','travel'],['p5','SEA, LATE AFTERNOON','beach travel'],['p11','MUMBAI · AFTER THE RAIN','mumbai'],['p4','THE ORANGE WALL','people'],['p14','SKY & STONE','mumbai'],['i2','HILLS > EVERYTHING','travel'],['p9','GOLDEN, AFTER DARK','nights people'],['p6','COCONUTS, SUNGLASSES ON','beach'],['p2','RED CURTAIN','people'],['i1','COSY CORNERS','people'],['p10','UNDER THE LIGHTS','nights'],['p12','MUMBAI · CROSSROADS','mumbai'],['para','UP, UP, UP','travel'],['p7','SIGNED IN SAND','beach'],['p3','IN THE SUN','people'],['p8','SPARKLE, AFTER DARK','nights people'],['i3','COLOUR, ALWAYS','people'],['p15','LOOKING UP','mumbai'],['p16','DINNER, MID-LAUGH','nights people'],['p13','PAY & PARK','mumbai'],['edu','TEDxIIT DELHI','people']];
const FOCUS={p2:'50% 46%',p7:'50% 50%',p14:'50% 50%',p15:'50% 50%',p5:'50% 56%',p6:'50% 50%',p13:'50% 42%',contact:'50% 62%',i2:'50% 60%',p11:'50% 45%',p12:'50% 45%'};
const TAPE=['#FFB8C8cc','#A9C8F5cc','#F4E9B4cc','#FFF1E2e0'];
const items=CORNER.map((c,i)=>{const el=document.createElement('figure');el.className='dr pl';el.style.setProperty('--d',(i%7)*.5+'s');el.style.setProperty('--tc',TAPE[i%4]);
  el.innerHTML='<div class="ph"><img alt="" decoding="async"></div><figcaption class="mo"></figcaption>';el.querySelector('img').alt=c[1].toLowerCase();el.querySelector('img').style.objectPosition=FOCUS[c[0]]||'50% 32%';el.querySelector('figcaption').textContent=(i<9?'0':'')+(i+1)+' · '+c[1];board.appendChild(el);
  return{k:c[0],cap:c[1],t:c[2].split(' '),el,off:false,r:((i*37%9)-4.5).toFixed(1),j1:Math.random(),j2:Math.random()}});
let order=items.slice(),loaded=false;
const lazyLoad=()=>{if(loaded)return;loaded=true;items.forEach(it=>{it.el.querySelector('img').src=PH[it.k]})};
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)lazyLoad()}),{rootMargin:'900px'}).observe(board);
const devIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('dev');devIO.unobserve(e.target)}}),{threshold:.2});items.forEach(it=>devIO.observe(it.el));
function layout(reshuffle){
 const W=board.clientWidth,pw=Math.round(Math.max(128,Math.min(230,W<520?W*.44:W<900?W*.29:W*.185))),cols=Math.max(2,Math.floor(W/(pw*1.06))),gx=(W-cols*pw)/(cols+1),ph=pw*1.25+40,gy=ph*.14;
 let n=0;order.forEach(it=>{if(it.off)return;const c=n%cols,r=Math.floor(n/cols);if(reshuffle)it.r=(Math.random()*10-5).toFixed(1);
  it.el.style.width=pw+'px';it.el.style.left=(gx+c*(pw+gx)+(it.j1-.5)*gx*.45)+'px';it.el.style.top=(r*(ph+gy)+26+(it.j2-.5)*22+(c%2?16:0))+'px';it.el.style.setProperty('--r',it.r+'deg');n++});
 board.style.height=(Math.ceil(n/cols)*(ph+gy)+ph*.3)+'px';cnct.textContent=n+' FRAMES'}
function relayout(reshuffle){board.classList.add('lay');layout(reshuffle);clearTimeout(relayout.t);relayout.t=setTimeout(()=>board.classList.remove('lay'),950)}
const FIL=[['all','ALL'],['people','PEOPLE'],['travel','TRAVEL'],['mumbai','MUMBAI'],['beach','BEACH'],['nights','NIGHTS']];
$('#chips2').innerHTML=FIL.map((f,i)=>'<button type="button" data-f="'+f[0]+'" class="'+(i?'':'on')+'">'+f[1]+'<i>'+(f[0]=='all'?items.length:items.filter(x=>x.t.includes(f[0])).length)+'</i></button>').join('');
$$('#chips2 button').forEach(b=>b.addEventListener('click',()=>{$$('#chips2 button').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;items.forEach(it=>{it.off=f!='all'&&!it.t.includes(f);it.el.classList.toggle('off',it.off)});relayout(false)}));
$('#shuf2').addEventListener('click',()=>{for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}items.forEach(it=>{it.j1=Math.random();it.j2=Math.random()});relayout(true)});
layout(false);addEventListener('resize',()=>{clearTimeout(layout.t);layout.t=setTimeout(()=>layout(false),150)});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>layout(false));
// ---- lightbox with prev / next ----
const lb=$('#lb');lb.innerHTML='<button class="lbn prev" type="button" aria-label="Previous photo">←</button><figure><img alt=""><figcaption class="mo"></figcaption></figure><button class="lbn next" type="button" aria-label="Next photo">→</button><button class="lbx" type="button" aria-label="Close">✕</button><span class="lbc mo"></span>';
let cur2=0;const vis=()=>order.filter(x=>!x.off);
function openLb(it){const v=vis();cur2=v.indexOf(it);showLb()}
function showLb(){const v=vis();if(!v.length)return;cur2=(cur2+v.length)%v.length;const it=v[cur2];lb.querySelector('img').src=PH[it.k];lb.querySelector('img').alt=it.cap.toLowerCase();lb.querySelector('figcaption').textContent=it.cap;lb.querySelector('.lbc').textContent=String(cur2+1).padStart(2,'0')+' / '+String(v.length).padStart(2,'0');lb.classList.add('on')}
lb.addEventListener('click',e=>{if(e.target.closest('.prev')){cur2--;showLb()}else if(e.target.closest('.next')){cur2++;showLb()}else if(!e.target.closest('figure')||e.target.closest('.lbx'))lb.classList.remove('on')});
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key=='Escape')lb.classList.remove('on');else if(e.key=='ArrowRight'){cur2++;showLb()}else if(e.key=='ArrowLeft'){cur2--;showLb()}});
let lbx0=null;lb.addEventListener('touchstart',e=>{lbx0=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',e=>{if(lbx0===null)return;const dx=e.changedTouches[0].clientX-lbx0;lbx0=null;if(Math.abs(dx)>50){cur2+=dx<0?1:-1;showLb()}},{passive:true});
// ---- drag ----
items.forEach(it=>{const el=it.el;let sx,sy,ox,oy,mv=0;
 el.addEventListener('pointerdown',e=>{el.setPointerCapture(e.pointerId);sx=e.clientX;sy=e.clientY;ox=el.offsetLeft;oy=el.offsetTop;mv=0;el.style.zIndex=++zz;el.classList.add('lift');board.classList.remove('lay')});
 el.addEventListener('pointermove',e=>{if(!el.hasPointerCapture(e.pointerId))return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>5){mv=1;dragme.classList.add('gone')}if(mv){el.style.left=Math.max(-20,Math.min(board.clientWidth-el.offsetWidth+20,ox+dx))+'px';el.style.top=Math.max(-10,Math.min(board.clientHeight-el.offsetHeight+30,oy+dy))+'px'}});
 el.addEventListener('pointerup',()=>{el.classList.remove('lift');if(!mv){dragme.classList.add('gone');openLb(it)}})});
$$('.cn h2,.cn .sub,.cn .cnhint').forEach(e=>{e.classList.add('rv');io.observe(e)});
// ---- route ----
const rp0=$('#rpath'),rdot=$('#rdot'),rlen=rp0.getTotalLength(),rst=[];
['IDEA','SKETCH','PROTOTYPE','SHIP','YOU'].forEach((t,i)=>{const p=rp0.getPointAtLength(rlen*i/4),c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',p.x);c.setAttribute('cy',p.y);c.setAttribute('r',5);c.setAttribute('class','st');const tx=document.createElementNS('http://www.w3.org/2000/svg','text');tx.setAttribute('x',p.x);tx.setAttribute('y',p.y+(i%2?-18:30));tx.setAttribute('text-anchor','middle');tx.setAttribute('class','sl');tx.textContent=t;$('#route').appendChild(c);$('#route').appendChild(tx);rst.push([c,tx])});
(function rt(){const r=$('#contact').getBoundingClientRect(),pr=Math.min(1,Math.max(0,(innerHeight-r.top)/(innerHeight*.95)));const p=rp0.getPointAtLength(rlen*pr);rdot.setAttribute('cx',p.x);rdot.setAttribute('cy',p.y);rst.forEach(([c,t],i)=>{const on=pr>=i/4-.02;c.style.opacity=on?1:.25;t.style.opacity=on?.95:.3});requestAnimationFrame(rt)})();
// ---- loader (runs on load, and again on 'Replay intro') ----
function runLoader(){const t0=performance.now(),p=$('#pct'),l=$('#lb2');(function r(){const k=Math.min(1,(performance.now()-t0)/1400);if(p){p.textContent='LOADING '+String(Math.round(k*100)).padStart(3,'0')+'%';l.style.width=k*100+'%'}if(k<1)requestAnimationFrame(r);else if(p)p.textContent='READY'})()}
function replayIntro(){$$('.bar,#card').forEach(n=>n.replaceWith(n.cloneNode(true)));T00=performance.now();runLoader();setTimeout(()=>scr($('.tag')),1900)}
runLoader();
$('#replay').addEventListener('click',e=>{e.preventDefault();target=0;setTimeout(replayIntro,1300)});
$$('nav a').forEach(a=>{if(a.getAttribute('href')=='#top')a.addEventListener('click',()=>{if(scrollY<80)replayIntro()})});
// ---- extra motion ----
const cd=document.createElement('div');cd.id='cd';document.body.appendChild(cd);let cx0=0,cy0=0,tx0=0,ty0=0;addEventListener('pointermove',e=>{tx0=e.clientX;ty0=e.clientY});(function mv(){cx0+=(tx0-cx0)*.22;cy0+=(ty0-cy0)*.22;cd.style.transform=`translate(${cx0}px,${cy0}px)`;requestAnimationFrame(mv)})();
document.addEventListener('pointerover',e=>{const t=e.target.closest('[data-cur]');cd.dataset.l=t?t.dataset.cur:'';cd.classList.toggle('lab',!!t);cd.classList.toggle('b',!t&&!!e.target.closest('a,button,.dr'))});
$$('.fr').forEach(e=>{e.dataset.cur='VIEW CASE';e.addEventListener('pointermove',ev=>{const r=e.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;e.style.transform=`perspective(900px) rotateY(${x*9}deg) rotateX(${-y*9}deg) translateY(-6px)`});e.addEventListener('pointerleave',()=>e.style.transform='')});
$$('#board .dr').forEach(e=>e.dataset.cur='DRAG · OPEN');$$('.mc').forEach(e=>e.dataset.cur='INSPECT');$$('.cta2').forEach(e=>e.dataset.cur='GO');$$('.mail').forEach(e=>e.dataset.cur='SAY HELLO');
$('#apr').addEventListener('pointermove',e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',e.clientX-r.left+'px');e.currentTarget.style.setProperty('--my',e.clientY-r.top+'px')});
function splitCh(el){[...el.childNodes].forEach(n=>{if(n.nodeType==3){const fr=document.createDocumentFragment();[...n.textContent].forEach(c=>{const sp=document.createElement('span');sp.className='ch';sp.textContent=c==' '?'\u00a0':c;fr.appendChild(sp)});n.replaceWith(fr)}else if(n.nodeType==1&&n.tagName!='BR')splitCh(n)})}
$$('.tx h1').forEach(splitCh);const chs=$$('.tx .ch');let kt=0;
addEventListener('pointermove',e=>{if(kt)return;kt=requestAnimationFrame(()=>{kt=0;if(scrollY>innerHeight*4.6)return;chs.forEach(c=>{const r=c.getBoundingClientRect();if(!r.width)return;const d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2)),k=Math.max(0,1-d/230);c.style.transform=`translateY(${-k*16}px) skewX(${-k*10}deg)`;if(!c.closest('h1.se'))c.style.fontVariationSettings=`"SOFT" 100,"WONK" 1,"wght" ${Math.round(HERO_W+k*160)}`})})});
function scr(el){const t=el.dataset.t||(el.dataset.t=el.textContent);let i=0;const iv=setInterval(()=>{el.textContent=[...t].map((c,k)=>k<i||c==' '?c:'▒░▓/\\<>'[Math.random()*7|0]).join('');i+=t.length/22;if(i>=t.length){el.textContent=t;clearInterval(iv)}},34)}
const so2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){scr(e.target);so2.unobserve(e.target)}}),{threshold:.6});$$('.kick,.wsub,.cn .sub,.cred').forEach(e=>so2.observe(e));setTimeout(()=>scr($('.tag')),2300);
