// Routing for the full-screen pages: #/work and #/case/<slug>. The pages themselves are drawn by
// js/work-page.js, js/project-pages.js and js/case-studies.js.
$$('.eqn').forEach(e=>io.observe(e));
$$('.fr').forEach((a,i)=>a.setAttribute('href','#/case/'+CASES[i]));
const pageEl=$('#page');
addEventListener('hashchange',()=>route());
addEventListener('keydown',e=>{if(e.key=='Escape'&&pageEl.classList.contains('on')&&!$('#lb').classList.contains('on'))pgEsc()});
let heldT=0;
function openPg(t){clearTimeout(heldT);heldT=setTimeout(()=>document.body.classList.add('pgheld'),900);document.body.classList.add('pgopen');pageEl.classList.add('on');pageEl.setAttribute('aria-hidden','false');document.title=t}
function closePg(h){if(typeof wkBack!='undefined')wkBack=null;clearTimeout(heldT);document.body.classList.remove('pgheld');const was=pageEl.classList.contains('on');pageEl.classList.remove('on');pageEl.setAttribute('aria-hidden','true');document.body.classList.remove('pgopen');document.title='Anushka Chowdhary — Product Designer';
 if(was&&h&&/^#[\w-]+$/.test(h)){const el=document.getElementById(h.slice(1));if(el){target=cur=Math.min(maxS(),el.offsetTop);scrollTo(0,target)}}}
function pgEsc(){location.hash=location.hash.startsWith('#/case/')?'#/work':'#top'}
