// A small looping line illustration for every project, keyed by slug.
// Drawn in the page's text colour; the accent strokes use --ac (the project's accent colour).
// ILL_CSS is injected once into the page and again into the case-study shadow roots.
const ILL_CSS=`
.ill{display:block;width:100%;height:auto;overflow:visible;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.ill *{transform-box:fill-box;transform-origin:center}
.ill .ac{stroke:var(--ac,#FF2D55)}.ill .af{fill:var(--ac,#FF2D55);stroke:none}.ill .sf{fill:currentColor;stroke:none}.ill .th{stroke-width:1.3;opacity:.55}
@media(prefers-reduced-motion:no-preference){
.il-spin{animation:ilSpin 9s linear infinite}.il-spin.r{animation-direction:reverse}.il-spin.f{animation-duration:4s}
.il-bob{animation:ilBob 3.2s ease-in-out infinite}.il-bob.b{animation-delay:-1.1s}.il-bob.c{animation-delay:-2.1s}
.il-flow{stroke-dasharray:5 8;animation:ilFlow 1.3s linear infinite}
.il-pulse{animation:ilPulse 2.2s ease-in-out infinite}.il-pulse.b{animation-delay:-.7s}.il-pulse.c{animation-delay:-1.4s}
.il-ring{animation:ilRing 2.6s ease-out infinite}.il-ring.b{animation-delay:-.9s}.il-ring.c{animation-delay:-1.8s}
.il-slide{animation:ilSlide 3.4s cubic-bezier(.6,0,.3,1) infinite}
.il-bar{transform-origin:50% 100%;animation:ilBar 1.5s ease-in-out infinite}.il-bar.b{animation-delay:-.3s}.il-bar.c{animation-delay:-.6s}.il-bar.d{animation-delay:-.9s}.il-bar.e{animation-delay:-1.2s}
.il-draw{stroke-dasharray:1;animation:ilDraw 4s cubic-bezier(.5,0,.3,1) infinite}
.il-flame{transform-origin:50% 100%;animation:ilFlame .9s ease-in-out infinite alternate}.il-flame.b{animation-duration:.7s;animation-delay:-.3s}
.il-row{animation:ilRow 3.6s ease-in-out infinite}.il-row.b{animation-delay:-.25s}.il-row.c{animation-delay:-.5s}
.il-sweep{transform-origin:50% 0;animation:ilSweep 4s ease-in-out infinite}.il-sweep.b{animation-delay:-2s}
.il-lift{animation:ilLift 3s cubic-bezier(.5,0,.3,1) infinite}
.il-lever{transform-origin:0 100%;animation:ilLever 3.4s cubic-bezier(.6,0,.3,1) infinite}
.il-blink{animation:ilBlink 1.4s steps(2,jump-none) infinite}
@keyframes ilSpin{to{transform:rotate(360deg)}}
@keyframes ilBob{50%{transform:translateY(-6px)}}
@keyframes ilFlow{to{stroke-dashoffset:-26}}
@keyframes ilPulse{50%{transform:scale(1.14);opacity:.65}}
@keyframes ilRing{from{transform:scale(.5);opacity:.9}to{transform:scale(1.5);opacity:0}}
@keyframes ilSlide{0%,12%{transform:translateX(34px)}48%,82%{transform:translateX(0)}100%{transform:translateX(34px)}}
@keyframes ilBar{50%{transform:scaleY(.35)}}
@keyframes ilDraw{0%{stroke-dashoffset:1}55%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
@keyframes ilFlame{from{transform:scale(.9,.82) skewX(-5deg)}to{transform:scale(1.06,1.12) skewX(5deg)}}
@keyframes ilRow{0%,8%{transform:translateY(12px);opacity:0}22%,80%{transform:none;opacity:1}100%{transform:translateY(-8px);opacity:0}}
@keyframes ilSweep{0%,100%{transform:rotate(-13deg)}50%{transform:rotate(13deg)}}
@keyframes ilLift{0%{transform:translateY(10px)}60%{transform:translateY(-16px)}100%{transform:translateY(-16px);opacity:0}}
@keyframes ilLever{0%,45%{transform:rotate(-42deg)}60%,88%{transform:rotate(0deg)}100%{transform:rotate(-42deg)}}
@keyframes ilBlink{50%{opacity:.2}}
}`;
const ill=(label,body)=>'<svg class="ill" viewBox="0 0 200 160" role="img" aria-label="'+label+'">'+body+'</svg>';
const ILLUS={
 // phone with the mess menu filling in, a queue walking up to it
 bhm:ill('A phone showing a mess menu, with a short queue beside it',
  '<rect x="78" y="10" width="64" height="140" rx="11"/><path d="M100 20h20"/>'
  +'<g class="il-row"><rect x="88" y="36" width="44" height="18" rx="4"/><path class="ac" d="M94 45h14"/></g>'
  +'<g class="il-row b"><rect x="88" y="62" width="44" height="18" rx="4"/><path d="M94 71h22"/></g>'
  +'<g class="il-row c"><rect x="88" y="88" width="44" height="18" rx="4"/><path d="M94 97h18"/></g>'
  +'<g class="il-pulse"><circle class="af" cx="110" cy="128" r="11"/><path d="M104.500 128l4 4l7-8" stroke="#fff"/></g>'
  +'<g class="il-bob"><circle cx="28" cy="96" r="7"/><path d="M28 104v20M20 112h16"/></g><g class="il-bob b"><circle cx="50" cy="90" r="7"/><path d="M50 98v22M42 106h16"/></g>'
  +'<path class="ac il-flow" d="M22 142H70"/>'
  +'<g class="il-spin"><circle cx="168" cy="52" r="15"/><path class="th" d="M168 44v16M160 52h16"/></g><path class="th" d="M158 84v34M178 84v34M174 84v12"/>'),
 // the red X on a stage, ideas rippling out
 tedx:ill('A large X on a stage with sound rippling outward',
  '<circle class="il-ring th" cx="100" cy="70" r="46"/><circle class="il-ring b th" cx="100" cy="70" r="46"/><circle class="il-ring c th" cx="100" cy="70" r="46"/>'
  +'<g class="il-pulse"><path class="ac" stroke-width="11" d="M74 44L126 96M126 44L74 96"/></g>'
  +'<path d="M30 132H170M44 132v14M156 132v14"/>'
  +'<g class="il-bob"><circle cx="58" cy="118" r="5"/></g><g class="il-bob b"><circle cx="82" cy="120" r="5"/></g><g class="il-bob c"><circle cx="118" cy="120" r="5"/></g><g class="il-bob"><circle cx="142" cy="118" r="5"/></g>'
  +'<path class="il-flow th" d="M16 30C30 24 30 44 44 38M156 30C170 24 170 44 184 38"/>'),
 // stove, flame, air drawn in through the insert
 cookstove:ill('A cookstove with a flame, air flowing in and steam rising',
  '<path d="M52 150L62 78H138L148 150Z"/><rect x="84" y="112" width="32" height="26" rx="3"/><path d="M58 64H142v14H58Z"/><path d="M74 64C74 44 126 44 126 64"/>'
  +'<path class="ac il-flame" d="M100 104C88 94 96 84 100 74C104 84 112 94 100 104Z"/><path class="ac il-flame b th" d="M100 100C95 95 98 90 100 85C102 90 105 95 100 100Z"/>'
  +'<path class="ac il-flow" d="M10 96H56M10 116H54M190 96H144M190 116H146"/>'
  +'<path class="il-lift th" d="M88 40C82 32 94 28 88 18"/><path class="il-lift th" style="animation-delay:-1s" d="M100 40C94 32 106 28 100 18"/><path class="il-lift th" style="animation-delay:-2s" d="M112 40C106 32 118 28 112 18"/>'),
 // the cartridge slides in, the lever locks, the machine turns
 bhilwa:ill('A blade cartridge sliding into a machine and locking',
  '<g class="il-spin"><path d="M52 34l6 2 5-5 6 4-2 7 5 5 7-2 4 6-5 5 2 6-6 4-5-5-7 2-4-6 5-5-2-7-6 2-4-6 5-5-2-7 6-4 5 5Z" transform="translate(-14 60)"/></g><circle cx="46" cy="104" r="7"/>'
  +'<path d="M86 60H176V124H86"/><path class="th" d="M86 76H176M86 108H176"/>'
  +'<g class="il-slide"><rect x="98" y="80" width="62" height="24" rx="3"/><path class="ac" d="M106 92l10-7v14ZM124 92l10-7v14Z"/><path d="M160 92h12"/></g>'
  +'<g class="il-lever"><path class="ac" stroke-width="4" d="M150 60L174 38"/></g><circle class="sf" cx="150" cy="60" r="3.500"/>'
  +'<path class="il-flow th" d="M186 92H198"/><path class="th" d="M30 146H180"/>'),
 // a voice assistant: the bubble speaks, the bars answer
 amulai:ill('A speech bubble with a moving voice waveform and a sparkle',
  '<path d="M34 30H140a12 12 0 0 1 12 12V92a12 12 0 0 1-12 12H84L60 126V104H34A12 12 0 0 1 22 92V42A12 12 0 0 1 34 30Z"/>'
  +'<g class="ac" stroke-width="5"><path class="il-bar" d="M52 86V48"/><path class="il-bar b" d="M70 86V56"/><path class="il-bar c" d="M88 86V44"/><path class="il-bar d" d="M106 86V58"/><path class="il-bar e" d="M124 86V50"/></g>'
  +'<g class="il-spin f"><path class="ac" d="M172 28v22M161 39h22M164 31l16 16M180 31l-16 16"/></g>'
  +'<g class="il-bob"><circle cx="160" cy="124" r="14"/><path d="M154 122h.5M166 122h.5M154 129q6 5 12 0"/></g><path class="il-flow th" d="M100 140H138"/>'),
 // a cable draws itself from the plug to the box; still being packed
 indocables:ill('A cable drawing itself from a plug into a package',
  '<path d="M112 70L150 54L188 70V124L150 140L112 124Z"/><path d="M112 70L150 86L188 70M150 86V140"/><path class="th" d="M131 62L169 78"/>'
  +'<path class="ac il-draw" pathLength="1" stroke-width="4" d="M30 44C30 90 70 60 70 104S110 116 126 104"/>'
  +'<rect x="18" y="20" width="24" height="24" rx="4"/><path d="M25 20v-9M35 20v-9"/>'
  +'<path class="il-flow" d="M14 148H98"/><circle class="af il-blink" cx="150" cy="104" r="4.500"/>'),
 // an idea lights up and something launches
 edc:ill('A light bulb glowing while a small rocket lifts off',
  '<g class="il-pulse"><path class="ac th" d="M62 22v-12M30 36l-9-9M94 36l9-9M18 70H6M118 70H106"/></g>'
  +'<path d="M62 30C40 30 28 46 28 64C28 80 40 88 44 100H80C84 88 96 80 96 64C96 46 84 30 62 30Z"/><path d="M48 110H76M52 120H72"/><path class="ac il-blink" d="M52 68L62 78L72 68M62 78V100"/>'
  +'<g class="il-lift"><path d="M150 40C162 54 164 78 158 96H142C136 78 138 54 150 40Z"/><circle cx="150" cy="68" r="5"/><path d="M142 90L132 104M158 90L168 104"/><path class="ac il-flame" d="M150 122C144 114 148 108 150 100C152 108 156 114 150 122Z"/></g>'
  +'<path class="il-flow th" d="M120 146H184"/>'),
 // a conclave stage: spotlights sweep, the numbers climb
 becon24:ill('A stage with sweeping spotlights and rising bars',
  '<path d="M14 16H186"/><g class="il-sweep"><path class="ac th" d="M58 16L34 104H82Z"/></g><g class="il-sweep b"><path class="ac th" d="M142 16L118 104H166Z"/></g>'
  +'<path d="M22 122H178V142H22Z"/><path d="M90 122V96H110V122M84 96H116"/><g class="il-bob"><circle cx="100" cy="80" r="8"/></g>'
  +'<g stroke-width="7"><path class="il-bar" d="M36 118V98"/><path class="il-bar b" d="M52 118V84"/><path class="il-bar c" d="M148 118V88"/><path class="il-bar d" d="M164 118V100"/></g>'
  +'<path class="il-flow th" d="M22 152H178"/>')};
document.head.insertAdjacentHTML('beforeend','<style id="ill-css">'+ILL_CSS+'</style>');
