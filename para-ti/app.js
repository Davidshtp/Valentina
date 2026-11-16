(() => {
  'use strict';
  const $=id=>document.getElementById(id), data=window.GIFT;
  const personalLetter=data.longLetter;
  $('personal-letter-title').textContent=personalLetter.title;
  $('personal-letter-body').textContent=personalLetter.body || 'Aquí irá tu carta completa, tal como la escribas.\n\nEste espacio está reservado para tus palabras.';
  $('personal-letter-body').classList.toggle('letter-placeholder',!personalLetter.body);
  $('personal-letter-signature').textContent=personalLetter.signature;
  $('fold-letter').onclick=()=>{const details=$('long-letter-details');details.open=false;details.querySelector('summary').focus({preventScroll:true});details.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const shapes={
    sunset:`<rect width="400" height="500" fill="#edb2a1"/><circle cx="290" cy="160" r="64" fill="#ffe5a3"/><path d="M0 260Q90 200 180 260T400 240V500H0" fill="#8ca8a1"/><path d="M0 330Q100 290 220 340T400 330V500H0" fill="#4f7c78"/><path d="M0 410Q180 350 400 415V500H0" fill="#dfbd92"/><g stroke="#4a4b40" stroke-width="9" fill="none" stroke-linecap="round"><path d="m100 420-8-74h70l-8 74m-54-16h54m-50 16-8 36m58-36 8 36m60-37-8-74h70l-8 74m-54-16h54m-50 16-8 36m58-36 8 36"/></g><path d="m58 85 12-5 13 5m30-20 12-5 13 5" stroke="#795f58" stroke-width="3" fill="none"/>`,
    video:`<rect width="400" height="500" fill="#a7c5ed"/><path d="M0 90 400 40M0 200 400 150M0 310 400 260M0 420 400 370" stroke="#c5d7ed" stroke-width="25"/><g transform="rotate(-9 200 240)"><rect x="55" y="155" width="290" height="190" rx="12" fill="#fff9ee" stroke="#332c29" stroke-width="3"/><path d="M55 195h290" stroke="#332c29" stroke-width="3"/><path d="m70 156 30 38m40-38 30 38m40-38 30 38m40-38 30 38" stroke="#332c29" stroke-width="15"/><circle cx="200" cy="270" r="42" fill="#f7b4cb"/><path d="m190 248 31 22-31 22z" fill="#8c415b"/></g><text x="200" y="407" text-anchor="middle" font-family="Georgia,serif" font-size="25" fill="#405371">para darle replay.</text>`,
    flowers:`<rect width="400" height="500" fill="#f4dfa0"/><path d="M0 35H400M0 85H400M0 135H400M0 185H400M0 235H400M0 285H400M0 335H400M0 385H400M0 435H400" stroke="#b8a469" opacity=".3"/><g stroke="#778a53" stroke-width="7" fill="none"><path d="M195 430Q170 300 120 190m80 230q55-150 80-260m-80 250 1-175"/><path d="M190 370q-75 10-70-48 55-5 70 48m28-38q65 15 62-45-50 0-62 45" fill="#a9be7d"/></g><g fill="#da7898"><circle cx="90" cy="175" r="30"/><circle cx="120" cy="143" r="30"/><circle cx="149" cy="175" r="30"/><circle cx="120" cy="206" r="30"/></g><g fill="#8c9dcd"><circle cx="251" cy="147" r="27"/><circle cx="279" cy="120" r="27"/><circle cx="306" cy="149" r="27"/><circle cx="279" cy="175" r="27"/></g><g fill="#ed996c"><circle cx="180" cy="230" r="23"/><circle cx="201" cy="208" r="23"/><circle cx="224" cy="230" r="23"/><circle cx="202" cy="253" r="23"/></g><g fill="#ffe9b0"><circle cx="120" cy="175" r="18"/><circle cx="279" cy="147" r="16"/><circle cx="201" cy="230" r="15"/></g>`,
    date:`<rect width="400" height="500" fill="#c8db9d"/><g transform="rotate(7 200 250)"><rect x="55" y="95" width="290" height="310" fill="#fff9ee" stroke="#332c29" stroke-width="2"/><path d="M55 95h290v65H55" fill="#f7b4cb"/><path d="M110 76v37m180-37v37" stroke="#332c29" stroke-width="8" stroke-linecap="round"/><text x="200" y="143" text-anchor="middle" fill="#6b3949" font-family="sans-serif" font-size="22" letter-spacing="4">AGOSTO</text><text x="200" y="300" text-anchor="middle" font-family="Georgia,serif" font-size="135" fill="#413c31">13</text><path d="M110 325q100 35 190-10" fill="none" stroke="#d57993" stroke-width="5"/><text x="200" y="377" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="21" fill="#686455">una fecha muy nuestra</text></g>`
  };
  function art(item){
    const wrapper=document.createElement('div');wrapper.className='art '+item.color;
    wrapper.innerHTML='<svg viewBox="0 0 400 500" aria-hidden="true">'+shapes[item.art]+'</svg>';
    return wrapper;
  }
  function makeImage(src,alt){const img=document.createElement('img');img.src=src;img.alt=alt;img.loading='lazy';img.addEventListener('error',()=>{const message=document.createElement('p');message.textContent='No se pudo cargar esta imagen.';img.replaceWith(message);});return img;}
  let visibleMemories=[...data.memories],viewedIndex=0;
  function renderMemories(){
  $('reel').replaceChildren();
  visibleMemories.forEach((item,index)=>{
    const button=document.createElement('button');button.className='memory-card';button.setAttribute('aria-label',(item.type==='video'?'Ver video: ':'Abrir recuerdo: ')+item.title);
    let picture=art(item);
    if(item.src&&item.type==='image'){picture.replaceChildren(makeImage(item.thumbnail||item.src,item.alt||item.title));}
    else if(item.src&&item.poster){picture.replaceChildren(makeImage(item.poster,'Portada de '+item.title));}
    if(item.type==='video'){const play=document.createElement('span');play.className='video-play';play.textContent='▷';play.setAttribute('aria-hidden','true');picture.append(play);}
    if(!item.src){const label=document.createElement('span');label.className='demo-label';label.textContent='ILUSTRACIÓN DE MUESTRA';picture.append(label);}
    const title=document.createElement('h3');title.textContent=item.title;
    const number=document.createElement('span');number.className='number';number.textContent=String(index+1).padStart(2,'0')+' / '+item.tag;
    const heart=document.createElement('span');heart.className='mini-heart';heart.textContent=item.type==='video'?'▷':'♡';heart.setAttribute('aria-hidden','true');
    button.append(picture,title,number,heart);button.onclick=()=>{viewedIndex=index;openMemory(item);};$('reel').append(button);
  });
  $('reel').scrollLeft=0;updatePosition(0);
  }
  function updatePosition(index){$('position').textContent=String(index+1).padStart(2,'0')+' / '+String(visibleMemories.length).padStart(2,'0');}
  function openMemory(item){
    $('viewer-content').querySelector('video')?.pause();
    $('viewer-content').replaceChildren();
    if(!item.src){$('viewer-content').append(art(item));}
    else if(item.type==='video'){
      const video=document.createElement('video');video.src=item.src;video.controls=true;video.playsInline=true;video.preload='metadata';if(item.poster)video.poster=item.poster;
      video.addEventListener('error',()=>{const error=document.createElement('p');error.textContent='No se pudo reproducir este video. Comprueba el archivo y su formato.';video.replaceWith(error);});$('viewer-content').append(video);
    }else $('viewer-content').append(makeImage(item.src,item.alt||item.title));
    $('viewer-title').textContent=item.title;$('viewer-description').textContent=item.description||'';$('viewer-position').textContent=String(viewedIndex+1)+' / '+visibleMemories.length;if(!$('viewer').open)$('viewer').showModal();
  }
  $('viewer-previous').onclick=()=>{viewedIndex=(viewedIndex-1+visibleMemories.length)%visibleMemories.length;openMemory(visibleMemories[viewedIndex]);};
  $('viewer-next').onclick=()=>{viewedIndex=(viewedIndex+1)%visibleMemories.length;openMemory(visibleMemories[viewedIndex]);};
  $('viewer').addEventListener('keydown',event=>{if(event.target.tagName==='VIDEO')return;if(event.key==='ArrowRight'){$('viewer-next').click();event.preventDefault();}if(event.key==='ArrowLeft'){$('viewer-previous').click();event.preventDefault();}});
  $('viewer').addEventListener('close',()=>{$('viewer-content').querySelector('video')?.pause();});
  data.letters.forEach((item,index)=>{
    const button=document.createElement('button');button.className='envelope';button.setAttribute('aria-label','Abrir carta: '+item.label);
    const seal=document.createElement('span');seal.className='seal';seal.textContent='♡';
    const label=document.createElement('span');label.className='label';label.textContent=item.label;
    const caption=document.createElement('small');caption.textContent='TOCA PARA ABRIR';button.append(seal,label,caption);
    const character=['totoro','snoopy','kitty'][index%3];button.append(window.letterDrawing(character));
    button.onclick=()=>{$('letter-title').textContent=item.title;$('letter-body').textContent=item.body;$('opened-letter-art').replaceChildren(window.letterDrawing(character),window.letterDrawing('hearts'));$('letter-viewer').showModal();};$('envelopes').append(button);
  });
  document.querySelectorAll('dialog .close').forEach(button=>button.onclick=()=>button.closest('dialog').close());
  document.querySelectorAll('[data-secret]').forEach(button=>button.onclick=()=>{$('secret-message').textContent=button.dataset.secret;$('secret-viewer').showModal();});
  let secret=0;
  $('secret-note').onclick=()=>{$('secret-text').textContent=data.secrets[secret++%data.secrets.length];$('secret-hint').textContent='hay otro secretito · toca otra vez';};
  let current=0;
  const reel=$('reel');
  renderMemories();
  document.querySelectorAll('[data-media-filter]').forEach(button=>button.onclick=()=>{const type=button.dataset.mediaFilter;visibleMemories=type==='all'?[...data.memories]:data.memories.filter(item=>item.type===type);current=0;document.querySelectorAll('[data-media-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));renderMemories();});
  function select(index){current=Math.max(0,Math.min(visibleMemories.length-1,index));const card=reel.children[current];reel.scrollTo({left:card.offsetLeft-reel.children[0].offsetLeft,behavior:reduced.matches?'instant':'smooth'});}
  $('previous').onclick=()=>select(current-1);$('next').onclick=()=>select(current+1);
  reel.addEventListener('scroll',()=>{let nearest=Infinity;[...reel.children].forEach((card,index)=>{const distance=Math.abs(card.offsetLeft-reel.children[0].offsetLeft-reel.scrollLeft);if(distance<nearest){nearest=distance;current=index;}});updatePosition(current);},{passive:true});
  const tabs=[...document.querySelectorAll('.tabs a')];
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){tabs.forEach(a=>a.classList.toggle('selected',a.hash==='#'+entry.target.id));}},{rootMargin:'-10% 0px -55% 0px'});['recuerdos','viajes','cartas','rincon'].forEach(id=>observer.observe($(id)));}
  function confetti(){
    if(reduced.matches)return;$('confetti').replaceChildren();
    for(let i=0;i<36;i++){const bit=document.createElement('span');bit.className='confetto';bit.textContent=['♡','✳','●','✦'][i%4];bit.style.left=Math.random()*100+'%';bit.style.color=['#d9648b','#81a4d7','#d7af37','#83a25c'][i%4];bit.style.setProperty('--drift',(Math.random()-.5)*180+'px');bit.style.animationDelay=Math.random()*.6+'s';bit.addEventListener('animationend',()=>bit.remove());$('confetti').append(bit);}
  }
  $('surprise').onclick=()=>{confetti();$('secret-message').textContent='Feliz cumpleaños, mi amor. Hoy celebro tu vida y la suerte de tenerte en la mía. ♡';$('secret-viewer').showModal();};
  $('final-love').onclick=()=>{confetti();$('final-love').classList.add('blown');$('final-love').disabled=true;$('final-love').querySelector('span').textContent='Tu deseo queda entre tú y el cielo.';$('wish-instruction').textContent='Que la vida te sorprenda con cosas bonitas.';$('birthday-reveal').hidden=false;$('relight-candle').hidden=false;$('love-message').textContent='Feliz cumpleaños, Valentina. Este pequeño mundo existe para celebrarte. ♡';};
  $('relight-candle').onclick=()=>{$('final-love').classList.remove('blown');$('final-love').disabled=false;$('final-love').querySelector('span').textContent='Toca para apagar la velita ♡';$('wish-instruction').textContent='Guárdalo para ti. Después, toca la vela.';$('birthday-reveal').hidden=true;$('love-message').textContent='';$('relight-candle').hidden=true;$('final-love').focus({preventScroll:true});};
  const canvas=$('drawing'),ctx=canvas.getContext('2d');ctx.strokeStyle='#cf6084';ctx.lineWidth=5;ctx.lineCap='round';ctx.lineJoin='round';
  function initialDrawing(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.beginPath();ctx.moveTo(298,295);ctx.bezierCurveTo(110,170,218,85,299,171);ctx.bezierCurveTo(390,75,489,186,298,295);ctx.stroke();ctx.font='26px Georgia';ctx.fillStyle='#65584e';ctx.fillText('tú + yo',255,350);}
  initialDrawing();let drawing=false;
  function point(event){const rect=canvas.getBoundingClientRect();return {x:(event.clientX-rect.left)*canvas.width/rect.width,y:(event.clientY-rect.top)*canvas.height/rect.height};}
  canvas.addEventListener('pointerdown',event=>{if(!event.isPrimary)return;drawing=true;canvas.setPointerCapture(event.pointerId);const p=point(event);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+.1,p.y+.1);ctx.stroke();});
  canvas.addEventListener('pointermove',event=>{if(!drawing||!event.isPrimary)return;const p=point(event);ctx.lineTo(p.x,p.y);ctx.stroke();});
  ['pointerup','pointercancel','lostpointercapture'].forEach(type=>canvas.addEventListener(type,()=>drawing=false));
  $('clear-drawing').onclick=()=>ctx.clearRect(0,0,canvas.width,canvas.height);
  $('save-drawing').onclick=()=>{const copy=document.createElement('canvas');copy.width=canvas.width;copy.height=canvas.height;const pen=copy.getContext('2d');pen.fillStyle='#fff9ee';pen.fillRect(0,0,copy.width,copy.height);pen.drawImage(canvas,0,0);const link=document.createElement('a');link.download='un-dibujito-para-valentina.png';link.href=copy.toDataURL('image/png');link.click();};
})();
