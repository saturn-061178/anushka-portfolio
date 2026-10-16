// Full-screen project pages: every entry in PROJECTS (js/data/projects.js) except the two long case studies.
// Styles and motion live in css/projects.css.

// ---- markup ----
// where the Projects page was when a case was opened, so going back returns to the same spot
let wkBack=null;
// projects this visitor has opened (shown as VIEWED on the Projects page)
function pjViewed(){try{return JSON.parse(localStorage.getItem('seenCases')||'[]')}catch(e){return []}}
function pjViewedAdd(s){try{const a=pjViewed();if(!a.includes(s)){a.push(s);localStorage.setItem('seenCases',JSON.stringify(a))}}catch(e){}}
// once per browser, on a device with a keyboard: mention the arrow keys
function pjTip(){if(!matchMedia('(hover:hover)').matches)return;try{if(localStorage.getItem('kbTip'))return;localStorage.setItem('kbTip','1')}catch(e){return}setTimeout(()=>toast('Tip: use ← → to move between projects',3600),1600)}
// Cookstove and Bhilwa are long case studies kept in js/data/case-studies-data.js, which is fetched only when needed
const CS_SLUGS=['cookstove','bhilwa'];
function csLoad(done){if(csLoad.s){csLoad.s.addEventListener('load',done);return}const s=csLoad.s=document.createElement('script');s.src='js/data/case-studies-data.js?v='+(BUILD_V||'');s.onload=done;document.head.appendChild(s)}
function slowNet(){const c=navigator.connection;return !!c&&(c.saveData||/2g|3g/.test(c.effectiveType||''))}
// "jump to" chips for the titled sections of a long page (only when there are two or more)
function pjJump(p){const t=pjSecs(p).filter(s=>s.title&&s.kind!='note');if(t.length<2)return '';
 return '<div class="pjjump mo pjr" style="--r:1" role="navigation" aria-label="Sections"><span>JUMP TO</span>'+t.map((s,k)=>'<button type="button" data-jump="pjs-'+(k+1)+'">'+s.title+'</button>').join('')+'</div>'}
// a project with no `sections` yet still gets a page: its cover, its illustration and a short note
const PJ_DEFAULT=[{kind:'art'},{kind:'note',title:'Full write-up coming soon',text:'The complete case study for this project is being written and will be added here.'}];
function pjSecs(p){return p.sections||PJ_DEFAULT}
function pjTitle(t){let n=0;return t.split(' ').map(w=>'<span class="w">'+[...w].map(c=>'<span class="ch" style="--i:'+(n++)+'">'+c+'</span>').join('')+'</span>').join(' ')}
function pjIntro(p,i){const parts=p.tags.split(' · '),no=String(i+1).padStart(2,'0'),of=String(P.length).padStart(2,'0');
 return '<header class="pji"><div class="pji-a"><p class="mo pgk pjr">SELECTED WORK · '+p.tags.toUpperCase()+'</p>'
  +'<h1 class="pgt pjt" aria-label="'+p.title+'"><span aria-hidden="true">'+pjTitle(p.title)+'</span></h1>'
  +'<div class="pgtags mo pjr" style="--r:1">'+parts.map(x=>'<span>'+x+'</span>').join('')+'</div>'+pjJump(p)+'</div>'
  +(ILLUS[p.slug]?'<div class="pji-ill pjr" style="--r:2">'+ILLUS[p.slug]+'</div>':'')
  +'<div class="pgg"><div class="pjr" style="--r:2"><p class="pglead">'+p.lead+'</p>'+(p.more||[]).map(t=>'<p class="pgp">'+t+'</p>').join('')+'</div>'
  +'<dl class="pgmeta mo pjr" style="--r:3"><dt>TYPE</dt><dd>'+parts[0]+'</dd><dt>FIELD</dt><dd>'+(parts[1]||parts[0])+'</dd><dt>CASE</dt><dd>'+no+' of '+of+'</dd>'+(p.meta||[]).map(r=>'<dt>'+r[0]+'</dt><dd>'+r[1]+'</dd>').join('')+'</dl></div></header>'}
function pjSections(p){let n=0,h=0;
 const tile=(m,extra,clone)=>'<button class="gi'+(clone?' cl" tabindex="-1" aria-hidden="true':'')+'" type="button" data-i="'+(clone?m.i:(m.i=n++))+'" data-cur="ZOOM"'+(extra?' style="'+extra+'"':'')+'><img loading="lazy" decoding="async" src="'+m.src+'" alt="'+(clone?'':m.alt)+'"></button>';
 return pjSecs(p).map(s=>{
  const head=s.title&&s.kind!='note'?'<div class="gh"><span class="mo">'+String(++h).padStart(2,'0')+'</span><h2>'+s.title+'</h2>'+(s.count?'<small class="mo">'+s.count+'</small>':'')+'</div>':'';
  let body;
  if(s.kind=='film')body='<div class="gv'+(s.sideways?' rot':'')+'"><video muted loop playsinline preload="none"'+(s.poster?' poster="'+s.poster+'"':'')+' src="'+s.src+'"></video><button class="gvb mo" type="button" aria-pressed="false">SOUND OFF</button></div>';
  else if(s.kind=='art')body='<div class="ga"><div class="ga-cov">'+p.cover+'</div>'+(ILLUS[p.slug]?'<div class="ga-ill">'+ILLUS[p.slug]+'</div>':'')+'</div>';
  else if(s.kind=='note')body='<div class="gn"><span class="mo gn-k">'+(p.status||'COMING SOON')+'</span><h2>'+s.title+'</h2><p>'+s.text+'</p><a class="mo gn-a" href="#contact">ASK ME ABOUT IT →</a></div>';
  else if(s.kind=='quote')body='<blockquote class="gq"><p>'+s.text.split(' ').map((w,k)=>'<span class="w"><span style="--i:'+k+'">'+w+'</span></span>').join(' ')+'</p></blockquote>';
  else if(s.kind=='strip'){ // two rows drifting in opposite directions; each row is doubled so the loop is seamless
   const half=Math.ceil(s.images.length/2),rows=[s.images.slice(0,half),s.images.slice(half)];
   body='<div class="gst">'+rows.map((r,k)=>{const a=r.map(m=>tile(m)).join(''),b=r.map(m=>tile(m,'',true)).join('');return '<div class="gst-r'+(k?' rv2':'')+'">'+a+b+'</div>'}).join('')+'</div>'}
  else if(s.kind=='wall')body='<div class="gw c'+s.images.length+'" style="--ar:'+(s.ratio||'1/1')+'">'+s.images.map((m,k)=>tile(m,'--d:'+k)).join('')+'</div>';
  else if(s.kind=='grid'){const cols=s.cols||3;body='<div class="gg c'+cols+'" style="--ar:'+(s.ratio||'4/5')+'">'+s.images.map((m,k)=>tile(m,'--d:'+(k%cols))).join('')+'</div>'}
  else body='<div class="gsl'+(s.stack?' stk':'')+'">'+s.images.map((m,k)=>tile(m,'aspect-ratio:'+m.ratio+(s.stack?';view-transition-name:fr-'+k:''))).join('')+'</div>';
  return '<section class="pjs"'+(head?' id="pjs-'+h+'"':'')+'>'+head+body+'</section>'})}
// number of stacked full-width frames (drives the frame counter)
function pjFrames(p){return pjSecs(p).filter(s=>s.kind=='slides'&&s.stack).reduce((n,s)=>n+s.images.length,0)}
// the control bar: Story / Grid / Play for pinned frames, and the Motion switch on every page
function pjControls(p){const deck=p&&pjFrames(p)>3;
 return '<div class="pjctl mo" role="toolbar" aria-label="Page controls">'
  +(deck?'<span class="pjctl-g" data-on="story"><b class="pjctl-t"></b><button type="button" data-view="story" aria-pressed="true">STORY</button><button type="button" data-view="grid" aria-pressed="false">GRID</button></span><button type="button" class="pjctl-b" data-play aria-pressed="false">▶ PLAY</button>':'')
  +(p?'<button type="button" class="pjctl-b" data-share aria-label="Share this project">SHARE ↗</button>':'')+'<button type="button" class="pjctl-b pjctl-m" data-motion aria-pressed="'+!still()+'"><i></i>MOTION '+(still()?'OFF':'ON')+'</button></div>'}
// share: the phone's share sheet where there is one, otherwise copy the link
function pjShare(btn){const url=location.href,title=document.title,note=t=>{const el=$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(note.t);note.t=setTimeout(()=>el.classList.remove('on'),2200)};
 if(navigator.share&&matchMedia('(pointer:coarse)').matches){navigator.share({title,url}).catch(()=>{});return}
 (navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(()=>{note('Link copied');btn.textContent='COPIED ✓';setTimeout(()=>{btn.textContent='SHARE ↗'},1800)}).catch(()=>note(url))}
// three more projects to jump to, after the one the "next case" band already offers
function pjMore(i){const n=P.length;return '<section class="pjx"><div class="gh"><span class="mo">+</span><h2>keep exploring</h2><small class="mo"><a href="#/work">ALL PROJECTS →</a></small></div><div class="pjx-r">'
  +[2,3,4].map(k=>(i+k)%n).filter((j,k,a)=>j!=i&&a.indexOf(j)==k).map(j=>'<a class="pjx-c" href="#/case/'+CASES[j]+'" data-cur="OPEN CASE" style="--ac:'+(PROJECTS[j].accent||'#FF2D55')+'"><div class="pjx-v">'+P[j][2]+'</div><span class="mo">'+String(j+1).padStart(2,'0')+'</span><h3>'+P[j][0]+'</h3><p class="mo">'+P[j][1]+'</p></a>').join('')+'</div></section>'}
function pjHTML(p,i){const nx=(i+1)%P.length,pv=(i+P.length-1)%P.length,secs=pjSections(p),intro=pjIntro(p,i);
 if(pjSecs(p)[0].kind!='art')secs[0]=secs[0].replace('</section>','<span class="pjcue mo" aria-hidden="true">SCROLL <i>↓</i></span></section>');
 const body=p.intro=='end'?secs.join('')+intro:secs[0]+intro+secs.slice(1).join('');
 return '<div class="pjbar"><i></i></div><div class="pgh"><button class="pgb" type="button" id="pgb">← ALL WORK</button><span class="mo pgn">CASE '+String(i+1).padStart(2,'0')+' / '+String(P.length).padStart(2,'0')+'</span><div class="pgnav"><a href="#/case/'+CASES[pv]+'" aria-label="Previous case">←</a><a href="#/case/'+CASES[nx]+'" aria-label="Next case">→</a></div></div>'
  +'<main class="pj">'+body+pjMore(i)+'<a class="pgnext" href="#/case/'+CASES[nx]+'"><small class="mo">NEXT CASE →</small><b>'+P[nx][0]+'</b><span class="pgnx" aria-hidden="true">'+P[nx][2]+'</span></a></main>'
  +(pjFrames(p)>3?'<div class="pjhud mo" aria-hidden="true"><b>01</b> / '+String(pjFrames(p)).padStart(2,'0')+'</div>':'')+pjControls(p)}

// ---- image viewer (click any frame) ----
const glb=document.createElement('div');glb.id='glb';glb.innerHTML='<button class="lbn prev" type="button" aria-label="Previous image">←</button><img alt=""><button class="lbn next" type="button" aria-label="Next image">→</button><button class="lbx" type="button" aria-label="Close">✕</button><span class="lbc mo"></span>';document.body.appendChild(glb);
let gList=[],gCur=0;
// keyboard: focus moves into the viewer, Tab stays inside it, and focus returns to the frame when it closes
glb.setAttribute('role','dialog');glb.setAttribute('aria-modal','true');glb.setAttribute('aria-label','Image viewer');glb.querySelector('.lbc').setAttribute('aria-live','polite');
let gFrom=null;new MutationObserver(()=>{const on=glb.classList.contains('on');if(on&&!gFrom){gFrom=document.activeElement;glb.querySelector('.lbx').focus()}else if(!on&&gFrom){const f=gFrom;gFrom=null;glb.classList.remove('zm');if(f&&f.isConnected)f.focus()}}).observe(glb,{attributes:true,attributeFilter:['class']});
glb.addEventListener('keydown',e=>{if(e.key!='Tab')return;const b=[...glb.querySelectorAll('button')],i=b.indexOf(document.activeElement);e.preventDefault();b[(i+(e.shiftKey?b.length-1:1))%b.length].focus()});
function gShow(){if(!gList.length)return;gZoom(false);gCur=(gCur+gList.length)%gList.length;const im=glb.querySelector('img');im.style.animation='none';im.src=gList[gCur].src;im.alt=gList[gCur].alt;im.offsetWidth;im.style.animation='';glb.querySelector('.lbc').textContent=String(gCur+1).padStart(2,'0')+' / '+String(gList.length).padStart(2,'0')+'  ·  CLICK IMAGE TO ZOOM';glb.classList.add('on')}
// zoom: click the image to look closer; move the pointer (or drag a finger) to look around
function gAim(x,y){const im=glb.querySelector('img'),r=im.getBoundingClientRect();im.style.transformOrigin=Math.max(0,Math.min(100,(x-r.left)/r.width*100))+'% '+Math.max(0,Math.min(100,(y-r.top)/r.height*100))+'%'}
function gZoom(on,x,y){glb.classList.toggle('zm',on);if(on)gAim(x,y)}
glb.addEventListener('click',e=>{if(e.target.closest('.prev')){gCur--;gShow()}else if(e.target.closest('.next')){gCur++;gShow()}else if(e.target.tagName=='IMG')gZoom(!glb.classList.contains('zm'),e.clientX,e.clientY);else glb.classList.remove('on')});
glb.addEventListener('pointermove',e=>{if(glb.classList.contains('zm')&&e.pointerType!='touch')gAim(e.clientX,e.clientY)});
glb.addEventListener('touchmove',e=>{if(glb.classList.contains('zm')){const t=e.touches[0];gAim(t.clientX,t.clientY)}},{passive:true});
addEventListener('keydown',e=>{if(!glb.classList.contains('on'))return;if(e.key=='Escape'){glb.classList.remove('on');e.stopImmediatePropagation()}else if(e.key=='ArrowRight'){gCur++;gShow()}else if(e.key=='ArrowLeft'){gCur--;gShow()}},true);
let gx0=null;glb.addEventListener('touchstart',e=>{gx0=e.touches[0].clientX},{passive:true});glb.addEventListener('touchend',e=>{if(gx0===null||glb.classList.contains('zm')){gx0=null;return}const dx=e.changedTouches[0].clientX-gx0;gx0=null;if(Math.abs(dx)>50){gCur+=dx<0?1:-1;gShow()}},{passive:true});

// ---- interaction + motion ----
let playT=0;
function pjDeck(){return pageEl.querySelector('.gsl.stk')}
function pjStop(){clearInterval(playT);playT=0;const b=pageEl.querySelector('[data-play]');if(b){b.setAttribute('aria-pressed','false');b.textContent='▶ PLAY'}}
// where to scroll so that frame k of the pinned stack is the one on show
function pjFrameTop(k){const d=pjDeck(),fr=[...d.querySelectorAll('.gi')];let y=d.getBoundingClientRect().top+pageEl.scrollTop-(parseFloat(getComputedStyle(fr[0]).top)||0);for(let i=0;i<k;i++)y+=fr[i].offsetHeight;return y}
function pjCurrent(){const fr=[...pageEl.querySelectorAll('.gsl.stk .gi')],mid=innerHeight/2;let k=0;fr.forEach((f,i)=>{const r=f.getBoundingClientRect();if(r.top<=mid&&r.bottom>=mid)k=i});return k}
function pjView(v){const d=pjDeck(),g=pageEl.querySelector('.pjctl-g');if(!d||g.dataset.on==v)return;pjStop();
 const flip=()=>{d.classList.toggle('grid',v=='grid');pageEl.classList.toggle('gridv',v=='grid');g.dataset.on=v;g.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view==v)));pageEl.scrollTop=Math.max(0,d.getBoundingClientRect().top+pageEl.scrollTop-(v=='grid'?90:0))};
 // the browser morphs the frames between the two layouts where it can; if it gives up, the layout has still changed
 if(document.startViewTransition&&!still()){const t=document.startViewTransition(flip);[t.ready,t.finished].forEach(p=>p.catch(()=>{}))}else flip()}
function pjPlay(){if(playT){pjStop();return}const d=pjDeck();if(!d)return;if(d.classList.contains('grid'))pjView('story');
 const b=pageEl.querySelector('[data-play]'),n=d.querySelectorAll('.gi').length;b.setAttribute('aria-pressed','true');b.textContent='❚❚ PAUSE';
 const step=()=>{const k=pjCurrent();if(k>=n-1){pjStop();return}pageEl.scrollTo({top:pjFrameTop(k+1),behavior:still()?'auto':'smooth'})};step();playT=setInterval(step,2800)}
['wheel','touchstart','keydown'].forEach(t=>addEventListener(t,()=>{if(playT)pjStop()},{passive:true}));
pageEl.addEventListener('click',e=>{
 const jb=e.target.closest('[data-jump]');if(jb){const t=document.getElementById(jb.dataset.jump);if(t)pageEl.scrollTo({top:t.offsetTop-70,behavior:still()?'auto':'smooth'});return}
 const c=e.target.closest('.pjctl button');if(c){if(c.dataset.view)pjView(c.dataset.view);else if('play' in c.dataset)pjPlay();else if('motion' in c.dataset)setMotion(still());else if('share' in c.dataset)pjShare(c);return}
 const snd=e.target.closest('.gvb');if(snd){const v=snd.parentNode.querySelector('video');snd.parentNode.classList.remove('hold');snd.parentNode.dataset.go=1;v.muted=!v.muted;if(v.paused)v.play();snd.textContent=v.muted?'SOUND OFF':'SOUND ON';snd.setAttribute('aria-pressed',String(!v.muted));return}
 const film=e.target.closest('.gv');if(film){const v=film.querySelector('video');film.classList.remove('hold');film.dataset.go=1;v.paused?v.play():v.pause();return}
 const b=e.target.closest('.gi');if(b){gList=[...pageEl.querySelectorAll('.gi:not(.cl) img')];gCur=+b.dataset.i;gShow()}});
pageEl.addEventListener('pointermove',e=>{const g=e.target.closest('.gg .gi,.gw .gi');if(!g)return;const r=g.getBoundingClientRect();g.style.setProperty('--tx',((e.clientX-r.left)/r.width-.5).toFixed(2));g.style.setProperty('--ty',((e.clientY-r.top)/r.height-.5).toFixed(2))});
pageEl.addEventListener('scroll',()=>{const b=pageEl.querySelector('.pjbar');if(!b)return;b.style.setProperty('--p',(pageEl.scrollTop/Math.max(1,pageEl.scrollHeight-pageEl.clientHeight)).toFixed(4));
 // frame counter: the newest pinned frame that has reached the middle of the screen.
 // Each pinned frame also learns how far the next one has slid over it (--k, 0 to 1) so it can sink back.
 const hud=pageEl.querySelector('.pjhud');if(!hud)return;const fr=[...pageEl.querySelectorAll('.gsl.stk .gi')],mid=innerHeight/2;let k=-1;
 const rc=fr.map(f=>f.getBoundingClientRect());
 fr.forEach((f,i)=>{const r=rc[i];if(r.top<=mid&&r.bottom>=mid)k=i;const n=rc[i+1];const kv=n?Math.max(0,Math.min(1,(r.bottom-n.top)/r.height)).toFixed(2):'0';if(f._k!==kv){f._k=kv;f.style.setProperty('--k',kv)}});
 hud.classList.toggle('on',k>-1);if(k>-1)hud.firstChild.textContent=String(k+1).padStart(2,'0')},{passive:true});
// ← / → step through the cases
addEventListener('keydown',e=>{if(e.key!='ArrowLeft'&&e.key!='ArrowRight')return;if(glb.classList.contains('on')||$('#lb').classList.contains('on')||e.altKey||e.ctrlKey||e.metaKey)return;
 const m=location.hash.match(/^#\/case\/(\w+)/),i=m?CASES.indexOf(m[1]):-1;if(i<0||!pageEl.classList.contains('on'))return;
 location.hash='#/case/'+CASES[(i+(e.key=='ArrowRight'?1:P.length-1))%P.length]});
let pjSeen=null,pjFilms=null,pjTimer=0;
function pjWatch(){
 if(pjSeen)pjSeen.disconnect();if(pjFilms)pjFilms.disconnect();clearTimeout(pjTimer);
 // films only play while they are on screen
 pjFilms=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target.querySelector('video');if(!e.isIntersecting){v.pause();return}
  // on a slow or data-saving connection the film waits for a tap instead of downloading by itself
  if(slowNet()&&!e.target.dataset.go){e.target.classList.add('hold');return}v.play().catch(()=>{})}),{root:pageEl,threshold:.25});
 pageEl.querySelectorAll('.gv').forEach(e=>pjFilms.observe(e));
 if(still())return;
 pageEl.classList.add('mo-on');
 let heard=false;const els=[...pageEl.querySelectorAll('.gi:not(.cl),.gv,.gh,.pji,.gq,.gst,.ga,.gn,.pjx-c')];
 pjSeen=new IntersectionObserver(es=>{heard=true;es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');pjSeen.unobserve(e.target)}})},{root:pageEl,threshold:.12,rootMargin:'0px 0px -6% 0px'});
 // wait for the title slate to lift, so the first frame's entrance is actually seen
 pjTimer=setTimeout(()=>{els.forEach(e=>pjSeen.observe(e));
  // if the browser never reports visibility (e.g. a background tab), show everything rather than leave frames hidden
  setTimeout(()=>{if(!heard&&els[0]&&els[0].isConnected)els.forEach(e=>e.classList.add('in'))},1500)},slateMs())}

// ---- hook into the page router (js/pages.js, js/case-studies.js) ----
function pjReset(){pjStop();glb.classList.remove('on');pageEl.classList.remove('full','dk','mo-on','wk','gridv');pageEl.classList.toggle('no-mo',still());pageEl.style.removeProperty('--pjbg');pageEl.style.removeProperty('--ac');pageEl.querySelectorAll('video').forEach(v=>v.pause())}
const renderCaseStudy=renderCase,renderWorkBase=renderWork,closePgBase=closePg;
renderWork=function(){pjReset();renderWorkBase()};
closePg=function(h){pageEl.querySelectorAll('video').forEach(v=>v.pause());closePgBase(h)};
renderCase=function(i){const p=PROJECTS[i];if(pageEl.classList.contains('wk'))wkBack={y:pageEl.scrollTop};if(wkBack)wkBack.slug=p.slug;pjViewedAdd(p.slug);pjTip();pjReset();
 if(p.accent)pageEl.style.setProperty('--ac',p.accent);
 if(CS_SLUGS.includes(p.slug)){if(typeof CS_DATA=='undefined'){pageEl.classList.remove('cs');pageEl.innerHTML='<div class="pjload mo" role="status">LOADING '+p.title.toUpperCase()+'…</div>';csLoad(()=>{if(location.hash=='#/case/'+p.slug){renderCase(i);if(typeof cbHeader=='function')cbHeader()}});return}renderCaseStudy(i);pageMotion(i);return}
 pageEl.classList.remove('cs');pageEl.classList.add('full');
 if(p.dark){pageEl.classList.add('dk');pageEl.style.setProperty('--pjbg',p.dark)}
 pageEl.innerHTML=pjHTML(p,i);$('#pgb').onclick=()=>{location.hash='#/work'};pageEl.scrollTop=0;pjWatch();pageMotion(i)};
