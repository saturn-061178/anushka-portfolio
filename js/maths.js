// ---- maths: a family of curves drawn from equations, morphing into each other ----
(function(){const cv=$('#mq'),eq=$('#meq');if(!cv)return;const g=cv.getContext('2d');const PI=Math.PI,N=900;
 const SH=[
  {n:'Lissajous figure',e:p=>'x(t) = sin(3t + '+p+'π)<br>y(t) = sin(2t)',f:(t,p)=>[Math.sin(3*t+p),Math.sin(2*t)],T:PI*2,dyn:1},
  {n:'Rose curve',e:()=>'r(θ) = cos(5θ)<br>x = r·cos θ · y = r·sin θ',f:t=>{const r=Math.cos(5*t);return[r*Math.cos(t),r*Math.sin(t)]},T:PI},
  {n:'Spirograph',e:()=>'x = (R−r)cos t + d·cos((R−r)t/r)<br>y = (R−r)sin t − d·sin((R−r)t/r)<br>R = 5 · r = 3 · d = 5',f:t=>{const R=5,r=3,d=5;return[(R-r)*Math.cos(t)+d*Math.cos((R-r)/r*t),(R-r)*Math.sin(t)-d*Math.sin((R-r)/r*t)]},T:PI*6},
  {n:'Lemniscate',e:()=>'x = cos t / (1 + sin²t)<br>y = sin t·cos t / (1 + sin²t)',f:t=>{const d=1+Math.sin(t)**2;return[Math.cos(t)/d,Math.sin(t)*Math.cos(t)/d]},T:PI*2},
  {n:'Cardioid',e:()=>'r(θ) = 1 − cos θ',f:t=>{const r=1-Math.cos(t);return[-r*Math.cos(t),-r*Math.sin(t)]},T:PI*2},
  {n:'Butterfly curve',e:()=>'r = e^sin θ − 2cos 4θ + sin⁵((2θ − π)/24)',f:t=>{const r=Math.exp(Math.sin(t))-2*Math.cos(4*t)+Math.pow(Math.sin((2*t-PI)/24),5);return[r*Math.sin(t),r*Math.cos(t)]},T:PI*24},
  {n:'Hypotrochoid',e:()=>'x = 3cos t + 2cos(3t/2)<br>y = 3sin t − 2sin(3t/2)',f:t=>[3*Math.cos(t)+2*Math.cos(1.5*t),3*Math.sin(t)-2*Math.sin(1.5*t)],T:PI*4}];
 function sample(sh,p){const a=new Float32Array(N*2);let m=0;for(let i=0;i<N;i++){const t=i/N*sh.T,q=sh.f(t,p||0);a[i*2]=q[0];a[i*2+1]=q[1];m=Math.max(m,Math.abs(q[0]),Math.abs(q[1]))}for(let i=0;i<N*2;i++)a[i]/=m;return a}
 SH.forEach(sh=>{if(!sh.dyn)sh.pts=sample(sh)});
 const cur=new Float32Array(N*2);cur.set(sample(SH[0],0));let si=0,tg=null,W=0,dpr=1,vis=false,mx=0,my=0,t0=performance.now(),lastEq=0,lastAuto=t0;
 new IntersectionObserver(es=>es.forEach(e=>vis=e.isIntersecting),{threshold:.05}).observe(cv);
 function size(){dpr=Math.min(2,devicePixelRatio||1);const w=cv.clientWidth;if(!w)return;W=w;cv.width=Math.round(w*dpr);cv.height=Math.round(w*dpr)}
 new ResizeObserver(size).observe(cv);size();
 cv.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5});cv.addEventListener('pointerleave',()=>{mx=my=0});
 function setShape(i){si=(i+SH.length)%SH.length;lastAuto=performance.now();lastEq=0}
 cv.addEventListener('click',()=>setShape(si+1));
 const PINK='#FF2D55';
 function frame(now){requestAnimationFrame(frame);if(!vis||!W)return;
  if(now-lastAuto>7000)setShape(si+1);
  const t=(now-t0)/1000,sh=SH[si],ph=((t*.22)%2),dd=sh.dyn?sample(sh,ph*PI):sh.pts;
  for(let i=0;i<N*2;i++)cur[i]+=(dd[i]-cur[i])*.085;
  const S=W;g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,S,S);
  const cx=S/2,cy=S/2,R=S*.345,rot=0;
  // dial ring with ticks
  g.save();g.translate(cx,cy);g.strokeStyle='#34201C';g.lineWidth=1;g.globalAlpha=.28;g.beginPath();g.arc(0,0,S*.465,0,7);g.stroke();
  for(let a=0;a<360;a+=5){const r0=S*.465,r1=r0-(a%30==0?S*.024:S*.012),ang=a*PI/180;g.beginPath();g.moveTo(Math.cos(ang)*r0,Math.sin(ang)*r0);g.lineTo(Math.cos(ang)*r1,Math.sin(ang)*r1);g.globalAlpha=a%30==0?.45:.2;g.stroke()}
  g.globalAlpha=.7;g.fillStyle='#6B553D';g.font='500 '+Math.round(S*.022)+'px "IBM Plex Mono",monospace';g.textAlign='center';g.fillText('0°',S*.5-S*.015+S*.02,-S*.005+S*0);g.restore();
  // axes + faint rings
  g.strokeStyle='#34201C';g.lineWidth=1;g.globalAlpha=.16;g.setLineDash([3,5]);g.beginPath();g.moveTo(cx,S*.06);g.lineTo(cx,S*.94);g.moveTo(S*.06,cy);g.lineTo(S*.94,cy);g.stroke();g.setLineDash([]);for(let k=1;k<=3;k++){g.beginPath();g.arc(cx,cy,R*k/3*1.02,0,7);g.globalAlpha=.09;g.stroke()}g.globalAlpha=1;
  // the curve (rotated, gradient stroke, soft glow)
  g.save();g.translate(cx,cy);
  let grad;try{grad=g.createConicGradient(0,0,0);grad.addColorStop(0,'#E8909A');grad.addColorStop(.34,'#F2B26B');grad.addColorStop(.68,'#8FB3B5');grad.addColorStop(1,'#E8909A')}catch(_){grad=PINK}
  const path=()=>{g.beginPath();for(let i=0;i<=N;i++){const j=(i%N)*2;i?g.lineTo(cur[j]*R,cur[j+1]*R):g.moveTo(cur[j]*R,cur[j+1]*R)}};
  g.lineJoin='round';g.lineCap='round';path();g.strokeStyle=grad;g.globalAlpha=.09;g.lineWidth=S*.03;g.stroke();g.globalAlpha=.2;g.lineWidth=S*.012;g.stroke();g.globalAlpha=1;g.lineWidth=Math.max(1.3,S*.0032);g.stroke();
  // tracing point, comet trail, radius + projections
  const head=((t*95)%N),hi=Math.floor(head),TR=150;
  for(let k=0;k<TR;k+=2){const a=((hi-k)%N+N)%N*2,b=((hi-k-2)%N+N)%N*2;g.beginPath();g.moveTo(cur[a]*R,cur[a+1]*R);g.lineTo(cur[b]*R,cur[b+1]*R);g.strokeStyle=PINK;g.globalAlpha=(1-k/TR)*.95;g.lineWidth=1+(1-k/TR)*S*.008;g.stroke()}
  g.globalAlpha=1;const hx=cur[hi*2]*R,hy=cur[hi*2+1]*R;
  g.setLineDash([3,4]);g.strokeStyle='#34201C';g.globalAlpha=.4;g.lineWidth=1;g.beginPath();g.moveTo(0,0);g.lineTo(hx,hy);g.stroke();
  g.strokeStyle=PINK;g.globalAlpha=.55;g.beginPath();g.moveTo(hx,-S*.42);g.lineTo(hx,hy);g.moveTo(-S*.42,hy);g.lineTo(hx,hy);g.stroke();g.setLineDash([]);g.globalAlpha=1;
  g.fillStyle='#34201C';g.beginPath();g.arc(0,0,3,0,7);g.fill();
  g.fillStyle=PINK;g.beginPath();g.arc(hx,hy,S*.011,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke();
  g.beginPath();g.arc(hx,hy,S*.026+Math.sin(t*4)*S*.004,0,7);g.strokeStyle=PINK;g.globalAlpha=.4;g.lineWidth=1;g.stroke();
  g.restore();
  if(now-lastEq>140){lastEq=now;eq.innerHTML='<b>'+sh.n+'</b><br>'+sh.e((ph%2).toFixed(2))+'<br><span style="opacity:.7">'+String(si+1).padStart(2,'0')+' / '+String(SH.length).padStart(2,'0')+' · click to change shape</span>'}}
 requestAnimationFrame(frame);
})();
