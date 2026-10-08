// ================= v26: the two full case studies live inside the site =================
const CS_FONTS=["https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap", "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112,500;112,700;125,800&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap"];
const CS_RUN={cookstove:function(SR){
(function(){
  // Exploded isometric view of the insert, drawn from 3D coordinates.
  var svg=SR.getElementById('ex'); if(!svg) return;
  var NS='http://www.w3.org/2000/svg', W=100, D=100, H=120, TOP=H+52, GR=-52;
  var c=Math.cos(Math.PI/6);
  function P(x,y,z){return [(x-y)*c,(x+y)*0.5-z];}
  function pts(a){return a.map(function(p){var q=P(p[0],p[1],p[2]);return q[0].toFixed(1)+','+q[1].toFixed(1);}).join(' ');}
  function el(tag,attrs,parent){var e=document.createElementNS(NS,tag);for(var k in attrs)e.setAttribute(k,attrs[k]);(parent||svg).appendChild(e);return e;}
  function poly(a,cls){return el('polygon',{points:pts(a),'class':cls});}
  function circ(fn,n){var a=[];for(var i=0;i<n;i++){var t=i/n*2*Math.PI;a.push(fn(Math.cos(t),Math.sin(t)));}return a;}
  var all=[];
  function track(x,y,z){all.push(P(x,y,z));}
  [[0,0,TOP],[W,D,GR],[W,0,TOP],[0,D,TOP],[W,0,GR],[0,D,GR]].forEach(function(p){track(p[0],p[1],p[2]);});

  // guides
  [[W,0],[0,D],[W,D]].forEach(function(p){
    el('polyline',{points:pts([[p[0],p[1],GR],[p[0],p[1],0]]),'class':'ex-guide'});
    el('polyline',{points:pts([[p[0],p[1],H],[p[0],p[1],TOP]]),'class':'ex-guide'});
  });
  // grate frame + bars
  poly([[0,0,GR],[W,0,GR],[W,D,GR],[0,D,GR]],'ex-f3 ex-edge');
  for(var gx=12;gx<=88;gx+=12.6){el('polyline',{points:pts([[gx,6,GR],[gx,D-6,GR]]),'class':'ex-bar'});}
  // back walls (interior)
  poly([[0,0,0],[W,0,0],[W,0,H],[0,0,H]],'ex-f3 ex-edge');
  poly([[0,0,0],[0,D,0],[0,D,H],[0,0,H]],'ex-f3 ex-edge');
  // front walls
  poly([[W,0,0],[W,D,0],[W,D,H],[W,0,H]],'ex-f2 ex-edge');
  poly([[0,D,0],[W,D,0],[W,D,H],[0,D,H]],'ex-f1 ex-edge');
  // holes on both front faces
  [H-26,H-48].forEach(function(z){
    [20,40,60,80].forEach(function(v){
      poly(circ(function(a,b){return [W,v+a*5,z+b*5];},16),'ex-hole');
      poly(circ(function(a,b){return [v+a*5,D,z+b*5];},16),'ex-hole');
    });
  });
  // fuel door
  poly([[24,D,10],[76,D,10],[76,D,40],[24,D,40]],'ex-door');
  // top plate with round outlet
  var sq=[[0,0,TOP],[W,0,TOP],[W,D,TOP],[0,D,TOP]], hole=circ(function(a,b){return [50+a*30,50+b*30,TOP];},40);
  el('path',{d:'M'+pts(sq).split(' ').join(' L')+' Z M'+pts(hole).split(' ').join(' L')+' Z','fill-rule':'evenodd','class':'ex-f1 ex-edge'});
  // badges
  function badge(n,x,y,z,dx,dy){var q=P(x,y,z);var g=el('g',{'class':'ex-badge'});
    el('line',{x1:q[0],y1:q[1],x2:q[0]+dx,y2:q[1]+dy,style:'stroke:var(--ember);stroke-width:1.5'},g);
    el('circle',{cx:q[0]+dx,cy:q[1]+dy,r:11},g);var t=el('text',{x:q[0]+dx,y:q[1]+dy},g);t.textContent=n;}
  badge('1',50,D,25,-46,34); badge('2',50,D-10,GR,-40,34); badge('3',W,60,H-37,46,-10); badge('4',70,70,TOP,40,-26);
  // viewBox
  var xs=all.map(function(p){return p[0];}), ys=all.map(function(p){return p[1];});
  var pad=46, x0=Math.min.apply(0,xs)-pad, y0=Math.min.apply(0,ys)-pad;
  svg.setAttribute('viewBox',[x0.toFixed(0),y0.toFixed(0),(Math.max.apply(0,xs)-x0+pad).toFixed(0),(Math.max.apply(0,ys)-y0+pad).toFixed(0)].join(' '));
})();
(function(){
  // highlight current section in the top bar
  var links=[].slice.call(SR.querySelectorAll('#nav a'));
  if(!('IntersectionObserver' in window)) return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id);});}});},{rootMargin:'-45% 0px -50% 0px'});
  links.forEach(function(a){var s=SR.querySelector(a.getAttribute('href'));if(s)io.observe(s);});
})();
},bhilwa:function(SR){
(function(){
  var a=SR.getElementById('v-assembled'), e=SR.getElementById('v-exploded');
  var ba=SR.getElementById('b-assembled'), be=SR.getElementById('b-exploded');
  function show(exploded){
    if(exploded){a.setAttribute('data-off','');e.removeAttribute('data-off');}
    else{e.setAttribute('data-off','');a.removeAttribute('data-off');}
    ba.setAttribute('aria-pressed',String(!exploded)); be.setAttribute('aria-pressed',String(exploded));
  }
  ba.addEventListener('click',function(){show(false)});
  be.addEventListener('click',function(){show(true)});

  var lb=SR.getElementById('lb'), li=SR.getElementById('lb-img');
  SR.querySelectorAll('button.zoom').forEach(function(b){
    b.addEventListener('click',function(){var im=b.querySelector('img');li.src=im.src;li.alt=im.alt;lb.hidden=false;});
  });
  lb.addEventListener('click',function(){lb.hidden=true});
  document.addEventListener('keydown',function(ev){if(ev.key==='Escape')lb.hidden=true});
})();
}};
let fontsIn=false;
function mountCS(slug){const host=$('#cshost'),c=CS_DATA[slug];if(!fontsIn){fontsIn=true;CS_FONTS.forEach(h=>{const l=document.createElement('link');l.rel='stylesheet';l.href=h;document.head.appendChild(l)})}
 host.setAttribute('data-theme','light');const sr=host.attachShadow({mode:'open'});sr.innerHTML='<style>'+c.css+'</style>'+c.html;
 sr.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();const id=a.getAttribute('href').slice(1),t=id?sr.getElementById(id):null;if(t)t.scrollIntoView({behavior:'smooth',block:'start'});else pageEl.scrollTo({top:0,behavior:'smooth'})});
 try{CS_RUN[slug](sr)}catch(err){console.error(err)}}
function renderCase(i){const slug=CASES[i];
 if(CS_DATA[slug]){const nx=(i+1)%P.length,pv=(i+P.length-1)%P.length;
  pageEl.classList.add('cs');
  pageEl.innerHTML='<div class="pgh"><button class="pgb" type="button" id="pgb">← ALL WORK</button><span class="mo pgn">CASE '+String(i+1).padStart(2,'0')+' / '+String(P.length).padStart(2,'0')+' · '+P[i][0].toUpperCase()+'</span><div class="pgnav"><a href="#/case/'+CASES[pv]+'" aria-label="Previous case">←</a><a href="#/case/'+CASES[nx]+'" aria-label="Next case">→</a></div></div><div class="cshost" id="cshost"></div>';
  $('#pgb').onclick=()=>{location.hash='#/work'};mountCS(slug);pageEl.scrollTop=0;return}}
