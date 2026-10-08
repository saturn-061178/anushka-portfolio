// ================= 3D EXPLODED VIEW (of this website) =================
function init3D(){
 const wrap=$('#labcv'),cv=$('#c3d'),T=window.THREE;
 const fail=()=>{wrap.innerHTML='<p class="mo" style="opacity:.6;padding:40px">The 3D preview needs WebGL, which isn’t available here.</p>'};
 if(!T){fail();return}
 let ren;try{ren=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){fail();return}
 ren.setPixelRatio(Math.min(2,devicePixelRatio||1));ren.outputEncoding=T.sRGBEncoding;
 const scene=new T.Scene(),cam=new T.PerspectiveCamera(30,1,.1,80);cam.position.set(0,.2,10.5);
 const G=new T.Group();scene.add(G);const layers=[],meshes=[];const PW=3.6,PH_=2.25,loader=new T.TextureLoader();
 const INFO={'01 RESEARCH':'Step 1, research. Start from a blank page: who is this for, where does it fail them, and what do they do instead?','02 SKETCH':'Step 2, sketch. Explore wide with rough lines and measurements before anything is polished.','03 CONTENT':'Step 3, content. Give it words and hierarchy. The typography has to carry the idea.','04 INTERFACE':'Step 4, interface. The layer people actually touch: navigation, buttons and states.','05 DELIGHT':'Step 5, delight. The small personality that makes it memorable: motion, and a cat.','06 BUILD':'Step 6, build. Prototype it in code, test it, and ship it.'};
 function canvasTex(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;return t}
 const paper=canvasTex(1200,750,(g,w,h)=>{g.fillStyle='#F8F5F0';g.fillRect(0,0,w,h);g.fillStyle='#6B553D33';for(let x=20;x<w;x+=26)for(let y=20;y<h;y+=26){g.beginPath();g.arc(x,y,1.4,0,7);g.fill()}const v=g.createRadialGradient(w/2,h/2,h*.4,w/2,h/2,h*.95);v.addColorStop(0,'rgba(52,32,28,0)');v.addColorStop(1,'rgba(52,32,28,.16)');g.fillStyle=v;g.fillRect(0,0,w,h)});
 const code=canvasTex(1200,750,(g,w,h)=>{g.fillStyle='#1c100e';g.fillRect(0,0,w,h);g.font='500 24px monospace';const L=[['c','// hero: drawn in ink, then painted'],['k','const '],['x','sc = ez(seg(ip, .35, 1));'],['x','pcol.style.clipPath ='],['s','  `inset(0 0 ${(1-sc)*100}% 0)`;'],['c',''],['c','// scroll drives the story'],['x','fig.style.transform ='],['s','  `translate(${mx}px, ${rise}vh)`;'],['c',''],['c','// her eyes follow your cursor'],['x','irL.setAttribute("transform",'],['s','  `translate(${ex*3} ${ey*2.5})`);'],['c',''],['c','// the cat visits when you pause'],['k','if '],['x','(now - lastAct > 2700) visit();']];let y=70;const col={c:'#7d6a5a',k:'#ff2d55',x:'#f8f5f0',s:'#a9c8f5'};
  g.fillStyle='#F8F5F022';g.fillRect(0,0,w,46);g.fillStyle='#ff2d55';g.beginPath();g.arc(28,23,7,0,7);g.fill();g.fillStyle='#a9c8f5';g.beginPath();g.arc(52,23,7,0,7);g.fill();g.fillStyle='#F8F5F0';g.beginPath();g.arc(76,23,7,0,7);g.fill();
  let i=0;while(i<L.length){let x=70;const row=L[i][1]==='' ? y:y;if(L[i][0]=='k'&&L[i+1]&&L[i+1][0]=='x'&&L[i][1].endsWith(' ')){g.fillStyle=col.k;g.fillText(L[i][1],x,y);x+=g.measureText(L[i][1]).width;g.fillStyle=col.x;g.fillText(L[i+1][1],x,y);i+=2}else{g.fillStyle=col[L[i][0]];g.fillText(L[i][1],x,y);i++}y+=38}});
 const defs=[['06 BUILD',code,-3.5,-.08,false],['01 RESEARCH',paper,-2.3,0,false],['02 SKETCH','l_tech',-1.1,.03,true],['03 CONTENT','l_type',.1,.06,true],['04 INTERFACE','l_ui',1.3,.09,true],['05 DELIGHT','l_cat',2.5,.12,true]];
 defs.forEach(([name,tx,zt,z0,tr],i)=>{const map=typeof tx=='string'?loader.load(PH[tx],t=>{t.encoding=T.sRGBEncoding}):tx;const mat=new T.MeshBasicMaterial({map,transparent:tr||name=='CODE',side:T.DoubleSide,depthWrite:false,opacity:1});
  const g=new T.Group(),m=new T.Mesh(new T.PlaneGeometry(PW,PH_),mat);m.renderOrder=i;g.add(m);
  const pts=[new T.Vector3(-PW/2,-PH_/2,0),new T.Vector3(PW/2,-PH_/2,0),new T.Vector3(PW/2,PH_/2,0),new T.Vector3(-PW/2,PH_/2,0)];const ed=new T.LineLoop(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:0xf8f5f0,transparent:true,opacity:.55}));g.add(ed);
  g.userData={name,z0,zt,mat,m,ed,anchor:new T.Vector3(PW/2,.95-(parseInt(name)-1)*.34,0)};m.userData.g=g;layers.push(g);meshes.push(m);G.add(g)});
 const tagsEl=$('#tags');tagsEl.innerHTML='';const tagEls=layers.map(p=>{const e=document.createElement('span');e.className='tg';e.textContent=p.userData.name;tagsEl.appendChild(e);return e});
 const xs=$('#xs'),xv=$('#xv');let manual=null,manualT=0,dstart=0;xs.addEventListener('input',()=>{manual=xs.value/100;manualT=performance.now()});
 let rx=.14,ry=-.62,vx=0,vy=0,drag=false,lx=0,ly=0,e=0,mode='solid',visible=false,mx=-9,my=-9,t0=performance.now();
 const ray=new T.Raycaster(),v3=new T.Vector3();
 function setMode(m){mode=m;layers.forEach(p=>{const u=p.userData;if(m=='solid'){u.m.visible=true;u.mat.opacity=1;u.ed.material.opacity=.55}else if(m=='wire'){u.m.visible=false;u.ed.material.opacity=1}else{u.m.visible=true;u.mat.opacity=.32;u.ed.material.opacity=.9}})}
 $$('#modes button').forEach(b=>b.addEventListener('click',()=>{$$('#modes button').forEach(x=>x.classList.toggle('on',x===b));setMode(b.dataset.m)}));
 wrap.addEventListener('pointerdown',ev=>{drag=true;lx=ev.clientX;ly=ev.clientY;wrap.classList.add('drag');try{wrap.setPointerCapture(ev.pointerId)}catch(_){}});
 wrap.addEventListener('pointermove',ev=>{const r=wrap.getBoundingClientRect();mx=((ev.clientX-r.left)/r.width)*2-1;my=-((ev.clientY-r.top)/r.height)*2+1;if(drag){vy=(ev.clientX-lx)*.006;vx=(ev.clientY-ly)*.004;ry+=vy;rx=Math.max(-.7,Math.min(.7,rx+vx));lx=ev.clientX;ly=ev.clientY}});
 const end=()=>{drag=false;wrap.classList.remove('drag')};wrap.addEventListener('pointerup',end);wrap.addEventListener('pointercancel',end);wrap.addEventListener('pointerleave',()=>{mx=my=-9});
 function size(){const w=wrap.clientWidth,h=wrap.clientHeight;if(!w||!h)return;ren.setSize(w,h,false);cam.aspect=w/h;cam.position.z=Math.max(9,Math.min(15,10.5*(1.25/Math.max(.6,Math.min(1.6,w/h)))**.55));cam.updateProjectionMatrix()}
 new ResizeObserver(size).observe(wrap);size();
 new IntersectionObserver(es=>es.forEach(en=>{visible=en.isIntersecting;if(visible&&dstart===0)dstart=0})).observe($('#lab'));
 const labEl=$('#lab'),info=$('#pinfo');let lastName='';
 (function loop(now){requestAnimationFrame(loop);if(!visible)return;
  const r=labEl.getBoundingClientRect(),prog=Math.min(1,Math.max(0,-r.top/(labEl.offsetHeight-innerHeight)));
  if(dstart===0)dstart=now;let target=ez(seg(prog,.1,.55));const dt2=(now-dstart)/4200;if(manual!==null&&now-manualT<6000)target=manual;else if(dt2<1)target=Math.max(target,.95*Math.sin(Math.PI*Math.min(1,dt2)));e+=(target-e)*.12;if(!(manual!==null&&now-manualT<6000)){xs.value=Math.round(e*100)}xv.textContent=Math.round(e*100)+'%';
  const auto=(now-t0)/1000;if(!drag){ry+=vy;vy*=.94;ry+=Math.sin(auto*.5)*.0012}
  G.rotation.y=ry;G.rotation.x=rx;
  layers.forEach(p=>{const u=p.userData;p.position.z=u.z0+(u.zt-u.z0)*e});
  G.scale.setScalar(1.18);G.position.x=-.4*e;G.updateMatrixWorld(true);
  ray.setFromCamera({x:mx,y:my},cam);const hit=mx>-5?ray.intersectObjects(meshes.filter(m=>m.visible),false)[0]:null;const hp=hit?hit.object.userData.g:null;
  layers.forEach(p=>{const u=p.userData;u.ed.material.color.setHex(p===hp?0xff2d55:0xf8f5f0);if(mode=='solid')u.ed.material.opacity=p===hp?1:.55});
  const nm=hp?hp.userData.name:'';if(nm!==lastName){lastName=nm;info.innerHTML=nm?'<b class="mo">'+nm+'</b><p>'+INFO[nm]+'</p>':'<b class="mo">THIS WEBSITE · 3D</b><p>Drag to rotate. Scroll to explode it. Hover a layer to inspect it.</p>'}
  const w=wrap.clientWidth,h=wrap.clientHeight;
  layers.forEach((p,i)=>{v3.copy(p.userData.anchor);p.localToWorld(v3);v3.project(cam);const x=(v3.x*.5+.5)*w,y=(-v3.y*.5+.5)*h;tagEls[i].style.transform=`translate(${Math.min(x,w-120)}px,${y-7}px)`;tagEls[i].style.opacity=Math.min(1,Math.max(0,(e-.18)*3))*(p===hp?1:.78)});
  ren.render(scene,cam)})(performance.now());
}
(function(){let done=false;const go=()=>{if(done)return;done=true;io3.disconnect();if(window.THREE)init3D();else{let n=0;const t=setInterval(()=>{if(window.THREE||++n>40){clearInterval(t);init3D()}},250)}};const io3=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)go()}),{rootMargin:'1200px'});io3.observe($('#lab'))})();
