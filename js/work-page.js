// The Projects page (#/work): one large panel per project, each with its cover and its moving illustration.
// Styles are in css/work.css. Projects come from js/data/projects.js.
const WK_FILTERS=[['all','ALL'],['p','PRODUCT & UX'],['b','BRAND & VISUAL'],['e','ENGINEERING']];
let wkSeen=null;
function wkPanel(p,i){const no=String(i+1).padStart(2,'0');
 return '<a class="wkp" id="wk-'+p.slug+'" href="#/case/'+p.slug+'" data-g="'+p.group+'" data-cur="OPEN CASE" style="--ac:'+(p.accent||'#FF2D55')+'">'
  +'<span class="wkp-no" aria-hidden="true">'+no+'</span>'
  +'<div class="wkp-tx"><span class="mo wkp-k"><b>'+no+'</b> · '+p.tags.toUpperCase()+'</span><h2>'+p.title+'</h2><p>'+p.lead+'</p>'
  +'<span class="wkp-ft">'+(p.status?'<span class="mo wkp-st">'+p.status+'</span>':'')+(p.meta?'<span class="mo wkp-fact">'+p.meta[0][1]+' '+p.meta[0][0].toLowerCase()+'</span>':'')+'<span class="mo wkp-go">OPEN CASE <i>→</i></span></span></div>'
  +'<div class="wkp-vis"><div class="wkp-cov">'+p.cover+'</div><div class="wkp-ill">'+(ILLUS[p.slug]||'')+'</div></div></a>'}
function renderWork(){
 const count=f=>f=='all'?PROJECTS.length:PROJECTS.filter(p=>p.group.split(' ').includes(f)).length;
 const names=PROJECTS.map(p=>p.title).join(' <i>✦</i> ')+' <i>✦</i> ';
 pageEl.classList.remove('cs');pageEl.classList.add('wk');
 pageEl.innerHTML='<div class="pjbar"><i></i></div><div class="pgh"><button class="pgb" type="button" id="pgb">← HOME</button><span class="mo pgn">PROJECTS · '+PROJECTS.length+'</span><div class="pgtabs mo"><a href="#top">HOME</a><a href="#/work" class="on">WORK</a><a href="#contact">CONTACT</a><a href="#quiet">APPROACH</a><a href="#corner">CORNER</a></div></div>'
  +'<main class="wkm"><header class="wkh"><p class="mo pgk">SELECTED WORK · 2026</p>'
  +'<h1 class="wkt"><span class="l"><span>selected</span></span><span class="l"><span><em class="se">work · 2026</em></span></span></h1>'
  +'<p class="wkl">Systems, products and visual experiences. Scroll through, or pick a case to open it.</p>'
  +'<div class="pgfil mo" id="pgfil">'+WK_FILTERS.map((x,i)=>'<button type="button" data-f="'+x[0]+'" class="'+(i?'':'on')+'">'+x[1]+'<i>'+count(x[0])+'</i></button>').join('')+'</div>'
  +'<div class="wkc" aria-label="Jump to a project">'+PROJECTS.map((p,i)=>'<button type="button" class="wkc-i" data-to="wk-'+p.slug+'" data-cur="'+p.rail+'" aria-label="'+p.title+'" style="--ac:'+(p.accent||'#FF2D55')+';--i:'+i+'">'+ILLUS[p.slug]+'<span class="mo">'+String(i+1).padStart(2,'0')+'</span></button>').join('')+'</div></header>'
  +'<div class="wkmq" aria-hidden="true"><div>'+names+names+'</div></div>'
  +'<div class="wklist" id="wgrid">'+PROJECTS.map(wkPanel).join('')+'</div>'
  +'<div class="wkx mo" role="navigation" aria-label="Projects">'+PROJECTS.map((p,i)=>'<button type="button" data-to="wk-'+p.slug+'" style="--ac:'+(p.accent||'#FF2D55')+'"><i>'+String(i+1).padStart(2,'0')+'</i><b>'+p.rail+'</b></button>').join('')+'</div>'
  +pjControls(null)+'<a class="wkend" href="#contact"><small class="mo">HAVE A PROBLEM THAT DOESN’T FIT ONE DISCIPLINE?</small><b>say hello →</b></a></main>';
 $('#pgb').onclick=()=>{location.hash='#top'};
 $$('#pgfil button').forEach(b=>b.addEventListener('click',()=>{$$('#pgfil button').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;
  $$('#wgrid .wkp').forEach(c=>c.classList.toggle('off',f!='all'&&!c.dataset.g.split(' ').includes(f)))}));
 pageEl.scrollTop=0;
 // the illustration wall and the side index both jump to a project's panel
 $$('.wkc-i,.wkx button').forEach(b=>b.addEventListener('click',()=>{const t=document.getElementById(b.dataset.to);if(!t)return;if(t.classList.contains('off'))$('#pgfil button').click();pageEl.scrollTo({top:t.offsetTop-40,behavior:still()?'auto':'smooth'})}));
 // panels come in as they are scrolled to
 if(wkSeen)wkSeen.disconnect();const els=$$('#wgrid .wkp,.wkh,.wkend');let heard=false;
 if(still()){els.forEach(e=>e.classList.add('in'));return}
 wkSeen=new IntersectionObserver(es=>{heard=true;es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');wkSeen.unobserve(e.target)}})},{root:pageEl,threshold:.18});
 els.forEach(e=>wkSeen.observe(e));
 setTimeout(()=>{if(!heard&&els[0]&&els[0].isConnected)els.forEach(e=>e.classList.add('in'))},1500)}
// side index: mark the panel that is on screen
pageEl.addEventListener('scroll',()=>{const nav=pageEl.querySelector('.wkx');if(!nav)return;const mid=innerHeight*.5;let on=-1;
 pageEl.querySelectorAll('.wkp').forEach((p,i)=>{const r=p.getBoundingClientRect();if(r.top<=mid&&r.bottom>=mid)on=i});
 nav.classList.toggle('on',on>-1);[...nav.children].forEach((b,i)=>b.classList.toggle('on',i==on))},{passive:true});
