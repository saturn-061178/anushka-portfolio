// "Request a call back": a button in every header that opens a short form.
// Each request is sent to a Google Sheet through a small Google Apps Script web app
// (the script and setup steps are in google-sheet-setup/ at the top of the repo).

// Paste the web app URL here once the script is deployed (it ends in /exec).
// While this is empty, the form opens the visitor's email app with the details filled in instead.
const CALLBACK_SHEET_URL='https://script.google.com/macros/s/AKfycbwxhdafWG5SrLIEq8TFd6wtdLeGTU_3wxiCBhi_Vwbi8B6XM55lxXaMXxSZERE-reoz/exec';
const CALLBACK_EMAIL='anushkadesign2003@gmail.com';

const cbDlg=document.createElement('dialog');cbDlg.id='cb';cbDlg.setAttribute('aria-labelledby','cb-h');
cbDlg.innerHTML='<form class="cb-card" id="cb-f" novalidate>'
 +'<button type="button" class="cb-x" aria-label="Close">✕</button>'
 +'<p class="mo cb-k">LET’S TALK</p><h2 id="cb-h">request a <em class="se">call back</em></h2>'
 +'<p class="cb-l">Leave your number and a good time. I’ll call you back.</p>'
 +'<div class="cb-g">'
 +'<label class="cb-fd"><span>Name</span><input name="name" autocomplete="name" required maxlength="80"></label>'
 +'<label class="cb-fd"><span>Phone</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20" placeholder="+91"></label>'
 +'<label class="cb-fd"><span>Email <i>(optional)</i></span><input name="email" type="email" autocomplete="email" maxlength="120"></label>'
 +'<label class="cb-fd"><span>Best time to call</span><select name="time"><option>Any time</option><option>Morning (9–12)</option><option>Afternoon (12–4)</option><option>Evening (4–8)</option></select></label>'
 +'<label class="cb-fd cb-w"><span>What’s it about? <i>(optional)</i></span><textarea name="message" rows="3" maxlength="600"></textarea></label>'
 +'<label class="cb-hp" aria-hidden="true">Leave this empty<input name="website" tabindex="-1" autocomplete="off"></label>'
 +'</div>'
 +'<p class="cb-err mo" role="alert" hidden></p>'
 +'<div class="cb-ft"><button class="cb-go" type="submit"><span>REQUEST CALL BACK</span><i>→</i></button><small>Your details go only to Anushka.</small></div>'
 +'<div class="cb-ok" hidden><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34"/><path d="M25 41l10 10l20-22"/></svg><h3></h3><p></p><button type="button" class="cb-done mo">CLOSE</button></div>'
 +'</form>';
document.body.appendChild(cbDlg);

const cbForm=cbDlg.querySelector('#cb-f'),cbErr=cbDlg.querySelector('.cb-err'),cbOk=cbDlg.querySelector('.cb-ok');
function cbOpen(){cbForm.classList.remove('sent','busy');cbOk.hidden=true;cbErr.hidden=true;if(!cbDlg.open)cbDlg.showModal();setTimeout(()=>cbForm.elements.name.focus(),60)}
function cbClose(){if(cbDlg.open)cbDlg.close()}
function cbDone(title,text){cbForm.classList.remove('busy');cbForm.classList.add('sent');cbOk.querySelector('h3').textContent=title;cbOk.querySelector('p').textContent=text;cbOk.hidden=false;cbOk.querySelector('.cb-done').focus()}
function cbFail(msg){cbForm.classList.remove('busy');cbErr.textContent=msg;cbErr.hidden=false}

cbDlg.addEventListener('click',e=>{if(e.target===cbDlg||e.target.closest('.cb-x,.cb-done'))cbClose()});
// Escape closes the form only, not the project page underneath it
addEventListener('keydown',e=>{if(cbDlg.open&&e.key=='Escape')e.stopImmediatePropagation()},true);
cbForm.addEventListener('submit',e=>{e.preventDefault();if(cbForm.classList.contains('busy'))return;
 const d=Object.fromEntries(new FormData(cbForm));d.name=d.name.trim();d.phone=d.phone.trim();cbErr.hidden=true;
 if(!d.name){cbFail('PLEASE ADD YOUR NAME');cbForm.elements.name.focus();return}
 if(d.phone.replace(/\D/g,'').length<8){cbFail('PLEASE ADD A PHONE NUMBER I CAN CALL');cbForm.elements.phone.focus();return}
 if(d.email&&!cbForm.elements.email.checkValidity()){cbFail('THAT EMAIL DOESN’T LOOK RIGHT');cbForm.elements.email.focus();return}
 d.page=location.hash||'home';
 if(!CALLBACK_SHEET_URL){ // not connected to the sheet yet: hand the details to the visitor's email app
  location.href='mailto:'+CALLBACK_EMAIL+'?subject='+encodeURIComponent('Call back request from '+d.name)+'&body='+encodeURIComponent('Name: '+d.name+'\nPhone: '+d.phone+(d.email?'\nEmail: '+d.email:'')+'\nBest time: '+d.time+(d.message?'\n\n'+d.message:''));
  cbDone('almost there.','Your email app has opened with the details filled in. Press send and I’ll call you back.');return}
 cbForm.classList.add('busy');
 // Apps Script does not send CORS headers, so the reply is opaque; a completed request is treated as received
 fetch(CALLBACK_SHEET_URL,{method:'POST',mode:'no-cors',body:new URLSearchParams(d)})
  .then(()=>{cbForm.reset();cbDone('got it, '+d.name.split(' ')[0].toLowerCase()+'.','Thanks. I’ll call you back'+(d.time=='Any time'?' soon.':' in the '+d.time.split(' ')[0].toLowerCase()+'.'))})
  .catch(()=>cbFail('COULDN’T SEND. CHECK YOUR CONNECTION AND TRY AGAIN.'))});

// ---- the button: once in the main menu, and in the header of every full-screen page ----
const CB_BTN='<button type="button" class="cbk" data-cb aria-haspopup="dialog" aria-label="Request a call back"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.600 3h3l1.500 4.500l-2.200 1.400a12 12 0 0 0 6.200 6.200l1.400-2.200l4.500 1.500v3a2 2 0 0 1-2.200 2A17 17 0 0 1 4.600 5.200A2 2 0 0 1 6.600 3Z"/></svg><span>Call back</span></button>';
$('nav').insertAdjacentHTML('beforeend',CB_BTN);
addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-cb]')){e.preventDefault();cbOpen()}});
function cbHeader(){const h=pageEl.querySelector('.pgh');if(!h||h.querySelector('[data-cb]'))return;
 const last=h.lastElementChild,wrap=document.createElement('span');wrap.className='pgr';h.appendChild(wrap);wrap.insertAdjacentHTML('beforeend',CB_BTN);wrap.appendChild(last)}
const applyRouteBase=applyRoute;
applyRoute=function(h){applyRouteBase(h);cbHeader()};
