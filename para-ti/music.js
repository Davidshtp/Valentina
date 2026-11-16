(() => {
  'use strict';
  const config=window.GIFT_MUSIC;
  if(!config?.tracks?.length)return;
  const tracks=config.tracks.filter(track=>typeof track.src==='string'&&track.src);
  if(!tracks.length)return;
  const audio=document.createElement('audio');audio.preload='none';audio.volume=Math.max(0,Math.min(1,config.volume??.28));
  let index=0,wantsMusic=false,request=0,automaticStart=true;
  const player=document.createElement('aside');player.className='music-player';player.setAttribute('aria-label','Música del regalo');
  player.innerHTML='<button type="button" class="music-toggle" aria-label="Activar música" aria-pressed="false">♫</button><div class="music-info"><strong></strong><span role="status">Toca para escuchar</span></div><button type="button" class="music-next" aria-label="Siguiente canción">›</button><label><span>Volumen</span><input aria-label="Volumen de la música" type="range" min="0" max="1" step="0.01"></label>';
  document.body.append(audio,player);document.body.classList.add('has-music');
  const toggle=player.querySelector('.music-toggle'),next=player.querySelector('.music-next'),label=player.querySelector('strong'),status=player.querySelector('[role=status]'),volume=player.querySelector('input');
  next.hidden=tracks.length<2;volume.value=audio.volume;
  const videoPlaying=()=>[...document.querySelectorAll('video')].some(video=>!video.paused&&!video.ended);
  function select(){audio.src=tracks[index].src;label.textContent=tracks[index].title||'Nuestra música';}
  function update(){const playing=!audio.paused;toggle.textContent=playing?'Ⅱ':'♫';toggle.setAttribute('aria-label',wantsMusic?'Pausar música':'Activar música');toggle.setAttribute('aria-pressed',String(wantsMusic));}
  async function play(){const attempt=++request;if(videoPlaying()){status.textContent='Pausada mientras ves el video';update();return;}try{await audio.play();if(attempt!==request)return;automaticStart=false;status.textContent=tracks[index].artist||'Acompañando tus recuerdos';update();}catch(error){if(attempt!==request||error.name==='AbortError')return;wantsMusic=false;status.textContent=automaticStart&&error.name==='NotAllowedError'?'Toca la página para escuchar':'Toca para volver a intentar';update();}}
  toggle.onclick=()=>{automaticStart=false;wantsMusic=!wantsMusic;if(wantsMusic)play();else{request++;audio.pause();status.textContent='Música en pausa';update();}};
  volume.oninput=()=>{audio.volume=Number(volume.value);};
  next.onclick=()=>{request++;audio.pause();index=(index+1)%tracks.length;select();if(wantsMusic)play();else{status.textContent='Toca para escuchar';update();}};
  audio.addEventListener('ended',()=>{if(!wantsMusic)return;index=(index+1)%tracks.length;select();play();});
  audio.addEventListener('play',update);audio.addEventListener('pause',update);
  audio.addEventListener('error',()=>{request++;automaticStart=false;wantsMusic=false;status.textContent='No se pudo cargar la canción';update();});
  document.addEventListener('play',event=>{if(event.target.tagName==='VIDEO'&&wantsMusic){request++;audio.pause();status.textContent='Pausada mientras ves el video';update();}},true);
  function resume(event){if(event.target.tagName==='VIDEO'&&wantsMusic&&!videoPlaying())play();}
  document.addEventListener('pause',resume,true);document.addEventListener('ended',resume,true);
  const viewer=document.getElementById('viewer');viewer?.addEventListener('close',()=>{if(wantsMusic&&audio.paused&&!videoPlaying())play();});
  // Try normal autoplay; otherwise use the first genuine interaction. Never
  // restart on unrelated clicks after the visitor deliberately pauses music.
  function startFromInteraction(event){
    if(!automaticStart||!event.isTrusted||player.contains(event.target)||event.target.closest('video,input,textarea,select,[contenteditable]'))return;
    if(event.type==='keydown'&&!['Enter',' '].includes(event.key))return;
    if(videoPlaying())return;
    wantsMusic=true;play();
  }
  document.addEventListener('click',startFromInteraction,true);
  document.addEventListener('keydown',startFromInteraction,true);
  select();update();wantsMusic=true;play();
})();
