// Motion and polish for the two long case studies (Cookstove, Bhilwa), added after js/case-studies.js mounts them.
// Their own HTML and CSS (js/data/case-studies-data.js) are left untouched; everything here is layered on top.

// both case studies: content rises in as it is scrolled to, cards lift under the pointer
const PLUS_CSS=`
button.zoom{overflow:hidden}button.zoom img{transition:transform .9s cubic-bezier(.22,1,.36,1)}button.zoom:hover img{transform:scale(1.045)}
@media(prefers-reduced-motion:no-preference){
 .pr{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .9s cubic-bezier(.22,1,.36,1),box-shadow .35s;transition-delay:calc(var(--d,0)*70ms)}
 .pr.in{opacity:1;transform:none}
 .pr.lift.in:hover{transform:translateY(-6px);box-shadow:0 18px 36px #13192524;transition-delay:0s}
 .sec-head h2{background:linear-gradient(var(--dye,currentColor),var(--dye,currentColor)) 0 100%/0 3px no-repeat;padding-bottom:10px;transition:background-size 1.1s cubic-bezier(.22,1,.36,1) .25s}
 .sec-head.in h2{background-size:84px 3px}
 .timebar .bar,.lbar{transform-origin:0 50%;transform:scaleX(0);transition:transform 1.4s cubic-bezier(.22,1,.36,1) .3s}
 .timebar.in .bar,.in .lbar,.lrow.in .lbar{transform:scaleX(1)}
}`;

// Bhilwa only: a dark blueprint hero, a looping pull / slide / lock graphic, counting figures
const BHILWA_CSS=`
#cs{position:relative;isolation:isolate}
#cs::before{content:"";position:absolute;left:0;right:0;top:0;height:var(--hh,900px);z-index:-1;background-color:#0b1020;
 background-image:radial-gradient(60% 50% at 78% 18%,#3a55d04d,transparent 70%),linear-gradient(#8BA3FF16 1px,transparent 1px),linear-gradient(90deg,#8BA3FF16 1px,transparent 1px);
 background-size:auto,44px 44px,44px 44px}
.top,.hero,.tblock,.meta,.plus-band{--paper:#0b1020;--surface:#141b30;--ink:#EAEEF7;--ink-2:#A3ADC2;--rule:#2a3552;--dye:#9DB1FF;--dye-soft:#1c2750;color:var(--ink)}
.top{padding-top:26px}
.viewer .plate{box-shadow:0 30px 80px #000a,0 0 0 1px #2a3552}
h1 em{background:linear-gradient(90deg,#9DB1FF,#d6ddff 50%,#9DB1FF);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent}
.plus-band{display:grid;grid-template-columns:minmax(150px,230px) 1fr;gap:clamp(20px,5vw,70px);align-items:center;padding:44px 0 56px;border-top:1px solid var(--rule);margin-top:28px;--ac:#9DB1FF}
.plus-band .ill{color:var(--ink)}
.plus-words{font:800 clamp(34px,6.4vw,84px)/1 var(--display);font-stretch:112%;letter-spacing:-.02em;display:flex;flex-wrap:wrap;gap:.1em .4em}
.plus-words span{color:#EAEEF733}
.plus-cap{font:500 12px/1.4 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-2);margin-top:16px}
.overview{margin-top:56px}
@media(max-width:700px){.plus-band{grid-template-columns:1fr}.plus-band .ill{max-width:190px}}
@media(prefers-reduced-motion:no-preference){
 #cs::before{animation:bpDrift 24s linear infinite}@keyframes bpDrift{to{background-position:0 0,44px 44px,44px 44px}}
 h1 em{animation:emShine 5s linear infinite}@keyframes emShine{to{background-position:-200% 0}}
 .viewer .plate{animation:plateFloat 7s ease-in-out infinite}@keyframes plateFloat{50%{transform:translateY(-8px)}}
 .plus-words span{animation:wordOn 3.4s infinite}.plus-words span:nth-child(2){animation-delay:1.13s}.plus-words span:nth-child(3){animation-delay:2.26s}
 @keyframes wordOn{0%,30%{color:#9DB1FF}40%,100%{color:#EAEEF733}}
}
@media(prefers-reduced-motion:reduce){.plus-words span{color:#EAEEF7}}`;

const PLUS_REVEAL='.sec-head,.overview>div,.tblock>div,figure,.concept,.step,.card,.persona,.blade,.fact,.principles>*,.process>a,.table-wrap,.timebar,.loads,.lrow,.hmw,.insight,.status,.plus-band';
const PLUS_LIFT='.concept,.card,.persona,.blade,.overview>div,.process>a,.step';

function csPlus(slug,sr){
 const cs=sr.getElementById('cs')||sr.firstElementChild,st=document.createElement('style');
 st.textContent=ILL_CSS+PLUS_CSS+(slug=='bhilwa'?BHILWA_CSS:'');sr.appendChild(st);

 if(slug=='bhilwa'){
  const meta=sr.querySelector('.meta');
  if(meta){meta.insertAdjacentHTML('afterend','<div class="plus-band"><div>'+ILLUS.bhilwa+'</div><div><div class="plus-words"><span>Pull.</span><span>Slide.</span><span>Lock.</span></div><p class="plus-cap">The whole blade change, in three moves</p></div></div>');
   // the dark band runs from the top of the page to the end of that graphic
   const band=sr.querySelector('.plus-band'),fit=()=>cs.style.setProperty('--hh',Math.round(band.getBoundingClientRect().bottom-cs.getBoundingClientRect().top)+'px');
   new ResizeObserver(fit).observe(cs);fit()}
  // the hero viewer flips between assembled and exploded by itself until someone touches it
  const a=sr.getElementById('b-assembled'),e=sr.getElementById('b-exploded'),viewer=sr.querySelector('.viewer');
  if(a&&e&&viewer&&!still()){let auto=true;viewer.addEventListener('pointerdown',()=>{auto=false});
   const t=setInterval(()=>{if(!cs.isConnected||!auto){clearInterval(t);return}(a.getAttribute('aria-pressed')=='true'?e:a).click()},3200)}
  // headline figures count up when they come into view
  if(!still())sr.querySelectorAll('.tblock .v').forEach(v=>{const m=v.textContent.match(/\d+(\.\d+)?/);if(!m||+m[0]==0)return;
   const end=+m[0],dec=(m[1]||'').length?m[1].length-1:0,html=v.innerHTML,put=x=>{v.innerHTML=html.replace(m[0],x.toFixed(dec))};
   v._count=()=>{const t0=performance.now();(function f(now){const k=Math.min(1,(now-t0)/1100),ez=1-Math.pow(1-k,3);put(end*ez);if(k<1)requestAnimationFrame(f);else v.innerHTML=html})(t0)}})}

 // reveal on scroll
 const els=[...sr.querySelectorAll(PLUS_REVEAL)];
 els.forEach(el=>{el.classList.add('pr');el.style.setProperty('--d',Math.min(5,[...el.parentNode.children].indexOf(el)))});
 sr.querySelectorAll(PLUS_LIFT).forEach(el=>el.classList.add('lift'));
 const show=el=>{el.classList.add('in');el.querySelectorAll&&el.querySelectorAll('.v').forEach(v=>{if(v._count){v._count();v._count=null}})};
 if(still()){els.forEach(show);return}
 let heard=false;const io2=new IntersectionObserver(es=>{heard=true;es.forEach(en=>{if(en.isIntersecting){show(en.target);io2.unobserve(en.target)}})},{root:pageEl,threshold:.12});
 setTimeout(()=>{els.forEach(el=>io2.observe(el));setTimeout(()=>{if(!heard&&cs.isConnected)els.forEach(show)},1500)},slateMs())}

const mountCSBase=mountCS;
mountCS=function(slug){mountCSBase(slug);try{csPlus(slug,$('#cshost').shadowRoot)}catch(err){console.error(err)}};
