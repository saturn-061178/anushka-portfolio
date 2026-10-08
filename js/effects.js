// ================= v28: fluid layer =================
class Fluid{
 constructor(cv,nx,ny,pal,gain){this.cv=cv;this.nx=nx;this.ny=ny;this.W=nx+2;const S=(nx+2)*(ny+2);this.S=S;this.pal=pal;this.gain=gain||.6;
  this.u=new Float32Array(S);this.v=new Float32Array(S);this.u0=new Float32Array(S);this.v0=new Float32Array(S);this.p=new Float32Array(S);this.dv=new Float32Array(S);
  this.d=[0,1,2].map(()=>new Float32Array(S));this.d0=[0,1,2].map(()=>new Float32Array(S));
  cv.width=nx*4;cv.height=ny*4;this.off=document.createElement('canvas');this.off.width=nx;this.off.height=ny;this.octx=this.off.getContext('2d');this.img=this.octx.createImageData(nx,ny);this.ctx=cv.getContext('2d')}
 bnd(b,x){const nx=this.nx,ny=this.ny,W=this.W;for(let i=1;i<=nx;i++){x[i]=b==2?-x[i+W]:x[i+W];x[i+W*(ny+1)]=b==2?-x[i+W*ny]:x[i+W*ny]}for(let j=1;j<=ny;j++){x[W*j]=b==1?-x[1+W*j]:x[1+W*j];x[nx+1+W*j]=b==1?-x[nx+W*j]:x[nx+W*j]}x[0]=.5*(x[1]+x[W]);x[nx+1]=.5*(x[nx]+x[nx+1+W]);x[W*(ny+1)]=.5*(x[1+W*(ny+1)]+x[W*ny]);x[nx+1+W*(ny+1)]=.5*(x[nx+W*(ny+1)]+x[nx+1+W*ny])}
 lin(b,x,x0,a,c,it){const nx=this.nx,ny=this.ny,W=this.W;for(let k=0;k<it;k++){for(let j=1;j<=ny;j++){let n=1+W*j;for(let i=1;i<=nx;i++,n++)x[n]=(x0[n]+a*(x[n-1]+x[n+1]+x[n-W]+x[n+W]))/c}this.bnd(b,x)}}
 adv(b,d,d0,u,v,dt){const nx=this.nx,ny=this.ny,W=this.W,dx=dt*nx,dy=dt*ny;for(let j=1;j<=ny;j++){for(let i=1;i<=nx;i++){const n=i+W*j;let x=i-dx*u[n],y=j-dy*v[n];if(x<.5)x=.5;if(x>nx+.5)x=nx+.5;if(y<.5)y=.5;if(y>ny+.5)y=ny+.5;const i0=x|0,j0=y|0,s1=x-i0,s0=1-s1,t1=y-j0,t0=1-t1,m=i0+W*j0;d[n]=s0*(t0*d0[m]+t1*d0[m+W])+s1*(t0*d0[m+1]+t1*d0[m+1+W])}}this.bnd(b,d)}
 proj(u,v,p,div){const nx=this.nx,ny=this.ny,W=this.W;for(let j=1;j<=ny;j++){for(let i=1;i<=nx;i++){const n=i+W*j;div[n]=-.5*((u[n+1]-u[n-1])/nx+(v[n+W]-v[n-W])/ny);p[n]=0}}this.bnd(0,div);this.bnd(0,p);this.lin(0,p,div,1,4,8);for(let j=1;j<=ny;j++){for(let i=1;i<=nx;i++){const n=i+W*j;u[n]-=.5*nx*(p[n+1]-p[n-1]);v[n]-=.5*ny*(p[n+W]-p[n-W])}}this.bnd(1,u);this.bnd(2,v)}
 step(dt){const u=this.u,v=this.v,u0=this.u0,v0=this.v0;u0.set(u);v0.set(v);this.adv(1,u,u0,u0,v0,dt);this.adv(2,v,v0,u0,v0,dt);this.proj(u,v,this.p,this.dv);
  if(!this.noDye)for(let c=0;c<3;c++){this.d0[c].set(this.d[c]);this.adv(0,this.d[c],this.d0[c],u,v,dt)}
  for(let n=0;n<this.S;n++){u[n]*=.986;v[n]*=.986;if(!this.noDye){this.d[0][n]*=.976;this.d[1][n]*=.976;this.d[2][n]*=.976}}}
 splat(x,y,dx,dy,ci,r){const nx=this.nx,ny=this.ny,W=this.W,cx=x*nx+1,cy=y*ny+1,rr=Math.max(1.5,r*nx),i0=Math.max(1,Math.floor(cx-rr*2.5)),i1=Math.min(nx,Math.ceil(cx+rr*2.5)),j0=Math.max(1,Math.floor(cy-rr*2.5)),j1=Math.min(ny,Math.ceil(cy+rr*2.5));
  for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const w=Math.exp(-((i-cx)*(i-cx)+(j-cy)*(j-cy))/(rr*rr)*1.3),n=i+W*j;this.u[n]+=dx*w;this.v[n]+=dy*w;if(!this.noDye)this.d[ci][n]+=w*.9}}
 render(){const nx=this.nx,ny=this.ny,W=this.W,data=this.img.data,P=this.pal,a0=this.d[0],a1=this.d[1],a2=this.d[2],G=this.gain*255;let k=0;
  for(let j=1;j<=ny;j++){for(let i=1;i<=nx;i++){const n=i+W*j,a=a0[n],b=a1[n],c=a2[n],t=a+b+c;if(t<.004){data[k+3]=0}else{const inv=1/t;data[k]=(P[0][0]*a+P[1][0]*b+P[2][0]*c)*inv;data[k+1]=(P[0][1]*a+P[1][1]*b+P[2][1]*c)*inv;data[k+2]=(P[0][2]*a+P[1][2]*b+P[2][2]*c)*inv;data[k+3]=Math.min(255,t*G)}k+=4}}
  this.octx.putImageData(this.img,0,0);const c=this.ctx;c.clearRect(0,0,this.cv.width,this.cv.height);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';c.drawImage(this.off,0,0,this.cv.width,this.cv.height)}}
function spark(g,x,y,r,c,a,star){g.globalAlpha=a;g.fillStyle=c;if(!star){g.beginPath();g.arc(x,y,r*.6,0,7);g.fill();return}
 const k=r*1.7;g.beginPath();g.moveTo(x,y-k);g.quadraticCurveTo(x,y,x+k,y);g.quadraticCurveTo(x,y,x,y+k);g.quadraticCurveTo(x,y,x-k,y);g.quadraticCurveTo(x,y,x,y-k);g.fill();
 if(r>2.6){g.globalAlpha=a*.16;g.beginPath();g.arc(x,y,r*2.2,0,7);g.fill()}}
// glitter: tiny stars that drift, twinkle, and swirl with the flow when you move the mouse
(function(){
 const small=matchMedia('(max-width:700px)').matches,NX=small?36:56,NY=small?26:32,DPR=Math.min(2,devicePixelRatio||1),cl=(v,m)=>Math.max(-m,Math.min(m,v));
 function newP(o){const big=Math.random()<.12;return{x:Math.random(),y:Math.random(),r:big?3.4+Math.random()*3:1.3+Math.random()*1.7,ph:Math.random()*6.28,sp:.7+Math.random()*2,c:o.cols[(Math.random()*o.cols.length)|0],vx:(Math.random()-.5)*.0004,vy:-.00015-Math.random()*.0005,star:big||Math.random()<.55}}
 function mk(id,cols,add,count){const cv=$(id);if(!cv)return null;const o={cv,g:cv.getContext('2d'),fl:new Fluid(cv,NX,NY,[[0,0,0],[0,0,0],[0,0,0]],0),vis:false,cols,add,P:[],tr:[],W:0,H:0};o.fl.noDye=true;
  const size=()=>{const w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;o.W=w;o.H=h;cv.width=Math.round(w*DPR);cv.height=Math.round(h*DPR)};new ResizeObserver(size).observe(cv);size();
  new IntersectionObserver(es=>es.forEach(e=>o.vis=e.isIntersecting)).observe(cv);for(let i=0;i<count;i++)o.P.push(newP(o));return o}
 const H=mk('#flh',['#C58A1E','#D9A441','#D98B86','#B8913F'],false,small?14:34),C=mk('#flc',['#FFF3D6','#FFD9A0','#FFCBD6','#FFFFFF'],true,small?14:38);
 let lx=-1,ly=-1,lsx=-1,lsy=-1;
 function onMove(o,e){const r=o.cv.getBoundingClientRect();if(e.clientY<r.top||e.clientY>r.bottom||e.clientX<r.left||e.clientX>r.right)return;const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  if(lx>=0)o.fl.splat(x,y,(e.clientX-lx)/r.width*50,(e.clientY-ly)/r.height*50,0,.06);
  if(Math.hypot(e.clientX-lsx,e.clientY-lsy)>60){lsx=e.clientX;lsy=e.clientY;for(let k=0;k<1;k++){if(o.tr.length<12)o.tr.push({x:x+(Math.random()-.5)*.02,y:y+(Math.random()-.5)*.03,vx:(Math.random()-.5)*.002,vy:-.0006-Math.random()*.0012,r:1.2+Math.random()*2.2,life:.9,max:.9,c:o.cols[(Math.random()*o.cols.length)|0],ph:Math.random()*6.28})}}}
 addEventListener('pointermove',e=>{if(H&&H.vis)onMove(H,e);if(C&&C.vis)onMove(C,e);lx=e.clientX;ly=e.clientY});
 let last=performance.now(),acc=0,tick=0;
 (function loop(now){requestAnimationFrame(loop);if(document.hidden)return;const dt=Math.min(.05,(now-last)/1000);last=now;acc+=dt;if(acc<.015)return;const d=acc;acc=0;tick++;const t=now/1000;
  [H,C].forEach(o=>{if(!o||!o.vis||!o.W)return;const fl=o.fl,g=o.g,W=o.W,Hh=o.H;
   if(tick%140==0)fl.splat(Math.random(),Math.random(),(Math.random()-.5)*14,(Math.random()-.5)*10,0,.1);
   fl.step(1/60);
   g.setTransform(DPR,0,0,DPR,0,0);g.clearRect(0,0,W,Hh);g.globalCompositeOperation=o.add?'lighter':'source-over';
   for(const p of o.P){const i=Math.min(NX,Math.max(1,Math.round(p.x*NX+1))),j=Math.min(NY,Math.max(1,Math.round(p.y*NY+1))),n=i+(NX+2)*j;
    p.x+=p.vx*d*60+cl(fl.u[n]*d,.02);p.y+=p.vy*d*60+cl(fl.v[n]*d,.02);if(p.x<-.02)p.x=1.02;else if(p.x>1.02)p.x=-.02;if(p.y<-.03)p.y=1.03;else if(p.y>1.03)p.y=-.03;
    const a=Math.pow(Math.max(0,Math.sin(t*p.sp+p.ph)),3)*.5+.06;spark(g,p.x*W,p.y*Hh,p.r,p.c,a,p.star)}
   for(let k=o.tr.length-1;k>=0;k--){const q=o.tr[k];q.life-=d;if(q.life<=0){o.tr.splice(k,1);continue}q.x+=q.vx;q.y+=q.vy;const m=q.life/q.max;spark(g,q.x*W,q.y*Hh,q.r*(.5+m),q.c,Math.min(1,m*1.5)*(.55+.45*Math.sin(t*22+q.ph)),true)}
   g.globalAlpha=1;g.globalCompositeOperation='source-over'})})(last)})();

// liquid nav indicator
var NAVEL=$('nav'),nb=null;
(function(){nb=document.createElement('span');nb.className='nb';NAVEL.prepend(nb);
 $$('nav a').forEach(a=>{a.addEventListener('pointerenter',()=>{a.classList.add('hv');NAVEL.classList.add('hovering');moveNb(a)});a.addEventListener('pointerleave',()=>{a.classList.remove('hv');NAVEL.classList.remove('hovering');moveNb()})});
 addEventListener('resize',()=>moveNb());setTimeout(moveNb,700);setTimeout(moveNb,2500)})();
function moveNb(a){if(!nb)return;a=a||NAVEL.querySelector('a.on');if(!a){nb.style.width='0px';return}const r=a.getBoundingClientRect(),n=NAVEL.getBoundingClientRect();nb.style.width=r.width+'px';nb.style.transform='translateX('+(r.left-n.left+NAVEL.scrollLeft)+'px)'}

// liquid page transitions
var wiping=false,shown=null;
function keyOf(h){return(h==='#/work'||/^#\/case\/\w+/.test(h))?h:'none'}
function applyRoute(h){let m;pageEl.classList.add('noanim');
 if(h==='#/work'){renderWork();openPg('Work — Anushka Chowdhary')}
 else if((m=h.match(/^#\/case\/(\w+)/))&&CASES.indexOf(m[1])>-1){const i=CASES.indexOf(m[1]);renderCase(i);openPg(P[i][0]+' — Anushka Chowdhary')}
 else closePg(h);
 requestAnimationFrame(()=>requestAnimationFrame(()=>pageEl.classList.remove('noanim')))}
function route(){if(wiping)return;const h=location.hash,k=keyOf(h);
 if(shown==null){shown=k;applyRoute(h);return}
 if(k==='none'&&shown==='none'){applyRoute(h);return}
 if(k===shown)return;shown=k;wipe(()=>applyRoute(h))}

// shimmer transition
function wipe(mid){if(wiping)return;wiping=true;const cv=$('#wipe'),g=cv.getContext('2d');cv.width=innerWidth>>1;cv.height=innerHeight>>1;cv.style.display='block';const W=cv.width,H=cv.height;let t0=performance.now(),phase=0;
 const cols=['#D9A441','#FFFFFF','#EFC98B','#E3A59C'],S=Array.from({length:28},()=>({x:Math.random()*W,y:Math.random()*H,r:.8+Math.random()*(Math.random()<.2?3.2:1.4),ph:Math.random()*6.28,sp:5+Math.random()*9,c:cols[(Math.random()*4)|0]}));
 (function draw(now){let p=Math.min(1,(now-t0)/480),a;
  if(phase==0){a=p*p*(3-2*p);if(p>=1){phase=1;t0=now;try{mid()}catch(e){console.error(e)}}}
  else{a=1-p*p*(3-2*p);if(p>=1){cv.style.display='none';wiping=false;route();return}}
  g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,W,H);g.globalAlpha=a;g.fillStyle='#F8F5F0';g.fillRect(0,0,W,H);
  for(const q of S){const tw=Math.pow(Math.max(0,Math.sin(now/1000*q.sp+q.ph)),3);spark(g,q.x,q.y,q.r,q.c,Math.min(1,a*1.3)*tw,q.r>1.4)}g.globalAlpha=1;requestAnimationFrame(draw)})(performance.now())}
