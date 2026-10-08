const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const seg=(p,a,b)=>Math.min(1,Math.max(0,(p-a)/(b-a))),ez=t=>t*t*(3-2*t);
// sketch library
function gear(){let d='';for(let i=0;i<24;i++){const a=i/24*Math.PI*2,r=i%2?30:40;d+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(1)+' '+(55+r*Math.sin(a)).toFixed(1)}return d+'ZM62 55a12 12 0 1 0-24 0a12 12 0 1 0 24 0'}
const D={bulb:'M50 10C25 10 10 30 10 50C10 68 24 76 30 88L70 88C76 76 90 68 90 50C90 30 75 10 50 10ZM32 96H68M38 104H62M50 88V60M40 56L50 66L60 56',
pencil:'M15 90L20 68L72 16L88 32L36 84ZM66 22L82 38M15 90L32 84L20 74Z',
turbine:'M50 105V45M50 45L50 5M50 45L86 66M50 45L14 66M36 105H64',
ev:'M30 10H70V92H30ZM40 24H60V46H40ZM70 42C92 42 92 72 86 92M44 62L56 62L48 78L60 78',
compass:'M50 10V26M50 26L20 100M50 26L80 100M32 70H68M45 10a5 5 0 1 0 10 0a5 5 0 1 0-10 0',gear:gear()};
$$('[data-d]').forEach(s=>s.innerHTML=`<g filter="url(#rough)"><path pathLength="1" d="${D[s.dataset.d]}"/></g>`);
