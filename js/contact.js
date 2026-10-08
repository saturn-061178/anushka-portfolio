// ================= CONTACT: painted portrait + phone =================
const PHONE={intl:'+91XXXXXXXXXX',show:'+91 XXXXX XXXXX'}; // EDIT: put your number here, e.g. intl:'+919876543210', show:'+91 98765 43210'
(function(){
 $('#cnum').textContent=PHONE.show;const ok=/^\+\d{8,15}$/.test(PHONE.intl);
 $$('.cb[data-k]').forEach(a=>{const k=a.dataset.k;if(ok){a.href=k=='wa'?'https://wa.me/'+PHONE.intl.replace('+','')+'?text='+encodeURIComponent('Hi Anushka, I saw your portfolio.'):(k=='sms'?'sms:':'tel:')+PHONE.intl}else a.style.display='none'});if(!ok)$('#cnum').style.display='none';
 const port=$('#cport'),pl=$('#cpline'),pc=$('#cpcol'),eL=$('#ceyeL'),eR=$('#ceyeR'),cpt=$('.cpt'),ring=$('#ctg'),sc2=$('#cscan');let t0=null,mx0=0,my0=0;
 addEventListener('pointermove',e=>{mx0=e.clientX;my0=e.clientY});
 new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(t0===null)t0=performance.now()}else t0=null}),{threshold:.3}).observe(port);
 const cl=(v)=>Math.max(-1,Math.min(1,v));
 (function lp(){requestAnimationFrame(lp);const r=port.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
  const ip=t0===null?0:Math.min(1,(performance.now()-t0)/3400);
  const pr=ez(seg(ip,0,.5));pl.style.setProperty('--w',(pr*125-12)+'%');const sc=ez(seg(ip,.35,1));pc.style.clipPath=`inset(0 0 ${(1-sc)*100}% 0)`;pl.style.opacity=1-.55*sc;
  eL.style.opacity=eR.style.opacity=sc>.34?1:0;sc2.style.top=sc*100+'%';sc2.style.opacity=(sc>0&&sc<1)?1:0;sc2.firstChild.textContent='SCAN '+Math.round(sc*100)+'%';
  const ex=cl((mx0-(r.left+r.width*.55))/400),ey=cl((my0-(r.top+r.height*.33))/300);
  eL.style.setProperty('--ex',(ex*3.6).toFixed(2)+'px');eL.style.setProperty('--ey',(ey*2.6).toFixed(2)+'px');eR.style.setProperty('--ex',(ex*4.2).toFixed(2)+'px');eR.style.setProperty('--ey',(ey*3).toFixed(2)+'px');
  cpt.style.transform=`perspective(1000px) rotateY(${ex*5}deg) rotateX(${-ey*3}deg)`;ring.style.transform=`rotate(${scrollY*.05+ip*60}deg)`})();
})();
