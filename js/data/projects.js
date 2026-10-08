// Every project on the site, in display order: the first one is the big card on the home reel.
// To add a project: copy an entry, give it a new slug, and put its images in assets/<slug>/.
//   skill    the line shown in the About section's "Design projects" list
//   group    'p' = Product & UX, 'b' = Brand & Visual, 'e' = Engineering (filters on the Work page)
//   accent   the project's own colour: progress bar, numbers, illustration
//   status   optional chip, e.g. 'IN PROGRESS'
//   sections full-screen project page. kind: 'slides' (full-width frames; stack:true pins each one while the next
//            slides over it), 'grid', 'wall' (offset posters), 'strip' (auto-scrolling rows), 'film', 'quote',
//            'art' (the cover with its illustration, for projects without images yet), 'note' (a short status message)
//   intro    where the title and text sit on a full-screen page: 'after-hero' or 'end'
const cv0='<svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">';
const img=(src,alt)=>'<img src="'+src+'" alt="'+alt+'">';
const frames=(dir,nums,alt,ratio)=>nums.map(n=>({src:'assets/'+dir+n+'.webp',alt:alt+' '+n,ratio:typeof ratio=='function'?ratio(n):ratio}));
const seq=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);

const PROJECTS=[
 {slug:'bhm',skill:'UI/UX &amp; app design',title:'BHM Projects',tags:'UI/UX · App design',rail:'BHM',group:'p',accent:'#E06E0B',icon:'compass',
  cover:img('assets/bhm/1.webp','BHM projects, Board of Hostel Management: title frame'),
  lead:'The UI/UX journey of the mess management app for the Board of Hostel Management, IIT Delhi.',
  meta:[['FRAMES','18']],intro:'end',
  sections:[{kind:'slides',stack:true,images:frames('bhm/',seq(1,18),'BHM mess management app, frame','16/9')}]},

 {slug:'tedx',skill:'Events &amp; graphic design',title:'TEDxIIT Delhi',tags:'Events · Graphic design',rail:'TEDx',group:'b',accent:'#EB0028',icon:'bulb',
  cover:'<img src="assets/tedx/banner.webp" alt="TEDxIIT Delhi event banner" style="object-position:50% 50%">',
  lead:'TEDx IIT Delhi is a platform where technology, society and innovation converge to empower minds and inspire change.',
  more:['We bring together visionaries, industry leaders and changemakers to share ideas that drive meaningful impact, and to spark conversations that bridge technological advancement and societal progress.'],
  meta:[['SECTIONS','Film · Campaign · Speakers · Merchandise · Team']],intro:'after-hero',dark:'#000',
  sections:[{kind:'film',src:'assets/tedx/tedx.mp4',sideways:true},
   {kind:'quote',text:'Ideas that empower minds, technology that shapes the future.'},
   {title:'Campaign',count:'3 FRAMES',kind:'grid',cols:3,images:frames('tedx/carousel-',seq(1,3),'TEDxIIT Delhi campaign post')},
   {kind:'slides',images:[{src:'assets/tedx/banner.webp',alt:'TEDxIIT Delhi event banner',ratio:'11259/4666'}]},
   {title:'Speakers',count:'12 FRAMES',kind:'strip',images:frames('tedx/speaker-',seq(1,12),'TEDxIIT Delhi speaker announcement')},
   {title:'Merchandise',count:'3 ITEMS',kind:'grid',cols:3,ratio:'1/1',images:[{src:'assets/tedx/merch-tote.webp',alt:'TEDxIIT Delhi tote bag'},{src:'assets/tedx/merch-book.webp',alt:'TEDxIIT Delhi notebook'},{src:'assets/tedx/merch-tshirt.webp',alt:'TEDxIIT Delhi T-shirt'}]},
   {title:'Team',count:'5 FRAMES',kind:'wall',ratio:'4/5',images:frames('tedx/team-',seq(1,5),'TEDxIIT Delhi team post')}]},

 {slug:'cookstove',skill:'Product design &amp; retrofits',title:'Cookstove Retrofit Insert',tags:'Product design · Clean cooking',rail:'COOKSTOVE',group:'p e',accent:'#F07A3C',icon:'gear',
  cover:img('assets/site/img-05.webp','Cookstove retrofit insert, 3D model with airflow zones'),
  lead:'A drop-in metal insert that upgrades the clay stove a family already owns, so fuel burns more completely with no fan, no new fuel and no new stove.'},

 {slug:'bhilwa',skill:'Machinery &amp; industrial design',title:'Bhilwa Blade Cartridge',tags:'Product design · Agricultural machinery',rail:'BHILWA',group:'p e',accent:'#8BA3FF',icon:'compass',
  cover:img('assets/site/img-06.webp','Bhilwa blade cartridge, CAD render'),
  lead:'One cartridge instead of twenty screws: a blade change redesigned for rural operators, from a 20–40 minute repair to a slide-and-lock swap.'},

 {slug:'amulai',skill:'UI/UX &amp; AI products',title:'AmulAI · Sarlaben',tags:'AI · Rural impact · UI/UX',rail:'AMULAI',group:'p',accent:'#E0A93B',icon:'pencil',
  cover:cv0+'<rect width="300" height="200" fill="#F3EAD9"/><g fill="none" stroke="#34201C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M34 74c0-10 8-16 18-16h22c10 0 18 6 18 16v14c0 8-8 14-18 14H52c-10 0-18-6-18-14Z" fill="#fff"/><path d="M40 58l-6-10M86 58l6-10"/><path class="flow" d="M100 84C122 84 128 96 150 96"/><rect x="150" y="76" width="56" height="40" rx="8" fill="#A9C8F5"/><path d="M178 116v14M82 130H262M82 130v18M178 130v18M262 130v18"/></g><circle cx="48" cy="76" r="3" fill="#34201C"/><circle cx="72" cy="76" r="3" fill="#34201C"/><text x="104" y="76" font-family="Caveat,cursive" font-size="17" fill="#6B553D">milk data</text><text x="164" y="102" font-family="Fraunces,serif" font-weight="500" font-size="18" fill="#34201C">AI</text><g font-family="IBM Plex Mono,monospace" font-size="10" fill="#34201C" text-anchor="middle"><text x="82" y="166">FEED</text><text x="178" y="166">HEALTH</text><text x="262" y="166">BREEDING</text></g></svg>',
  lead:'A 24×7 assistant for 30K+ dairy farmers. Designing AI that is plain-spoken and voice-first, so it works for the people it serves.',
  intro:'after-hero',dark:'#1d1210',
  sections:[{kind:'art'},{kind:'note',title:'Full write-up coming soon',text:'The complete case study for this project is being written and will be added here.'}]},

 {slug:'indocables',skill:'Branding &amp; packaging',title:'Indocables Packaging',tags:'Branding · Visual design',rail:'INDOCABLES',group:'b',accent:'#A9C8F5',status:'IN PROGRESS',icon:'compass',
  cover:cv0+'<rect width="300" height="200" fill="#34201C"/><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 150H40V118h26v32h22V96h30v54h18V126h22v24h28V88h26v62h20V132h18v18H300" stroke="#A9C8F5" stroke-width="2" opacity=".55"/><path class="flow" d="M0 172C60 172 70 152 110 152S170 178 210 168 270 152 300 160" stroke="#FF2D55" stroke-width="5"/><path d="M228 88V56h10" stroke="#F8F5F0" stroke-width="2"/></g><circle cx="242" cy="56" r="5" fill="#FFE9D2"/><text x="14" y="26" font-family="Fraunces,serif" font-weight="500" font-size="16" fill="#F8F5F0">INDOCABLES</text><text x="14" y="190" font-family="IBM Plex Mono,monospace" font-size="9" fill="#A9C8F5">HOME → STREET → METRO → INDUSTRY</text></svg>',
  lead:'Translating a technical product into a visual identity people can understand: packaging that protects the cable and shows the craft.',
  intro:'after-hero',dark:'#1d1210',
  sections:[{kind:'art'},{kind:'note',title:'Project in progress',text:'This project is still under way. The full case study will be added here once it is finished.'}]},

 {slug:'edc',skill:'Brand &amp; presentation design',title:'EDC IIT Delhi',tags:'Branding · Visual design',rail:'EDC',group:'b',accent:'#F8F5F0',icon:'bulb',
  cover:img('assets/edc/2.webp','eDC IIT Delhi 2024–25 title slide with three logo variants'),
  lead:'Branding and design work for the Entrepreneurship Development Cell, IIT Delhi, 2024–25.',
  more:['EDC is a student-led body that promotes entrepreneurship, innovation and startup culture on campus, bridging the gap between ideas and execution through speaker sessions, startup showcases, design initiatives and founder-focused content.'],
  meta:[['FRAMES','9']],intro:'after-hero',dark:'#000',
  sections:[{kind:'slides',images:frames('edc/',[2],'EDC IIT Delhi 2024–25, frame','16/9')},
   {title:'The work',count:'8 FRAMES',kind:'slides',stack:true,images:frames('edc/',seq(3,10),'EDC IIT Delhi 2024–25, frame',n=>n==7?'1920/692':n==8?'1920/781':n==10?'1920/356':'16/9')}]},

 {slug:'becon24',skill:'Event campaigns &amp; social posts',title:'BECon’24',tags:'Events · Visual design',rail:'BECON’24',group:'b',accent:'#37C6E6',icon:'bulb',
  cover:img('assets/becon24/post-4.webp','Panel discussion on stage at BECon 2024'),
  lead:'Visual design for BECon’24, the flagship Business and Entrepreneurship Conclave of IIT Delhi.',
  more:['The conclave brings together visionaries, innovators and industry leaders to celebrate the spirit of entrepreneurship, and gives aspiring founders a place to connect, learn and turn ideas into reality.'],
  meta:[['SECTIONS','Film · On stage · Posts']],intro:'after-hero',dark:'#02263c',
  sections:[{kind:'film',src:'assets/becon24/becon24.mp4'},
   {kind:'quote',text:'A place to connect, learn and turn ideas into reality.'},
   {title:'On stage',kind:'slides',images:[{src:'assets/becon24/post-4.webp',alt:'Panel discussion on stage at BECon 2024',ratio:'3/2'}]},
   {title:'Posts',count:'5 FRAMES',kind:'wall',ratio:'1/1',images:frames('becon24/post-',[1,2,3,5,6],'BECon’24 post')}]}
];

// shapes the rest of the code reads
const P=PROJECTS.map(p=>[p.title,p.tags,p.cover,p.icon,p.lead]);
const CASES=PROJECTS.map(p=>p.slug);
