// Start: open whatever the address bar points at (home, #/work or #/case/<slug>).
route();

// A tab left open keeps running the code it loaded. When it is shown again, check whether index.html now
// points at a newer build (the ?v= number on the script links) and reload if so.
const BUILD=(document.currentScript.src.match(/[?&]v=(\d+)/)||[])[1];
document.addEventListener('visibilitychange',()=>{if(document.hidden||!BUILD)return;
 fetch('index.html',{cache:'no-store'}).then(r=>r.text()).then(t=>{const m=t.match(/js\/main\.js\?v=(\d+)/);if(m&&m[1]!=BUILD)location.reload()}).catch(()=>{})});
