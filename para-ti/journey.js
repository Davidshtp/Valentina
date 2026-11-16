(() => {
  'use strict';
  const $=id=>document.getElementById(id), reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const texts=window.JOURNEY_TEXTS;
  document.querySelector('.journey-copy>.kicker').textContent=texts.sectionLabel;
  const accent=document.createElement('em');accent.textContent=texts.headingAccent;
  $('journey-title').replaceChildren(document.createTextNode(texts.heading),document.createElement('br'),accent);
  document.querySelector('.journey-copy>p:not(.hand-note)').textContent=texts.introduction;
  document.querySelector('.journey-copy>.hand-note').textContent=texts.handwritten;
  document.querySelector('.map-dedication').textContent=texts.mapDedication;
  document.querySelector('.chapter-divider span').textContent=texts.chapterTransition;
  function showOrigin(){$('travel-kicker').textContent=texts.originLabel;$('travel-title').textContent=texts.originTitle;$('travel-text').textContent=texts.originText;}
  showOrigin();
  const ns='http://www.w3.org/2000/svg';
  const silhouette=document.createElementNS(ns,'path');silhouette.setAttribute('d',window.COLOMBIA_OUTLINE);$('country-inset').append(silhouette);
  const countryLabel=document.createElementNS(ns,'text');countryLabel.setAttribute('x','43');countryLabel.setAttribute('y','112');countryLabel.textContent='COLOMBIA';$('country-inset').append(countryLabel);
  const cities={mocoa:[-76.652,1.153],popayan:[-76.614,2.444],medellin:[-75.564,6.252]};
  Object.values(cities).forEach(([lon,lat])=>{const pin=document.createElementNS(ns,'circle');pin.setAttribute('cx',String((lon+79)*6.2));pin.setAttribute('cy',String((13-lat)*6.2));pin.setAttribute('r','2');$('country-inset').append(pin);});
  const journeys={
    popayan:{name:'Popayán',title:texts.popayanTitle,text:texts.popayanText,duration:2300},
    medellin:{name:'Medellín',title:texts.medellinTitle,text:texts.medellinText,duration:3800}
  };
  let frame=null,selected=null,traveling=false;
  function stop(){if(frame!==null)cancelAnimationFrame(frame);frame=null;traveling=false;}
  function setTraveler(path,fraction){const point=path.getPointAtLength(path.getTotalLength()*fraction);$('traveler').setAttribute('transform',`translate(${point.x} ${point.y})`);}
  function arrive(destination){const item=journeys[destination];traveling=false;$('travel-kicker').textContent=texts.arrivalLabel;$('travel-title').textContent=item.title;$('travel-text').textContent=item.text;$('town-'+destination).classList.add('arrived');}
  function go(destination){
    stop();selected=destination;traveling=true;const item=journeys[destination];
    const map=document.querySelector('.journey-map'),rect=map.getBoundingClientRect();
    if(innerWidth<=700&&(rect.top<65||rect.bottom>innerHeight))map.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
    document.querySelectorAll('[data-destination]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.destination===destination)));
    document.querySelectorAll('.map-town').forEach(town=>town.classList.remove('arrived'));
    for(const key of Object.keys(journeys)){$('active-'+key).style.strokeDasharray='1';$('active-'+key).style.strokeDashoffset='1';$('active-'+key).setAttribute('pathLength','1');}
    const path=$('route-'+destination),active=$('active-'+destination);
    $('travel-kicker').textContent='DE MOCOA A '+item.name.toLocaleUpperCase('es');$('travel-title').textContent=texts.travelTitle;$('travel-text').textContent=texts.travelText;
    if(reduced.matches){active.style.strokeDashoffset='0';setTraveler(path,1);arrive(destination);return;}
    let start=null;
    function step(time){if(start===null)start=time;const progress=Math.min(1,(time-start)/item.duration);const eased=progress*progress*(3-2*progress);active.style.strokeDashoffset=String(1-eased);setTraveler(path,eased);if(progress<1)frame=requestAnimationFrame(step);else{frame=null;arrive(destination);}}
    setTraveler(path,0);frame=requestAnimationFrame(step);
  }
  for(const destination of Object.keys(journeys)){const town=$('town-'+destination);town.addEventListener('click',()=>go(destination));town.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();go(destination);}});}
  document.querySelectorAll('[data-destination]').forEach(button=>button.addEventListener('click',()=>go(button.dataset.destination)));
  $('reset-trip').onclick=()=>{stop();selected=null;$('traveler').setAttribute('transform','translate(255 640)');document.querySelectorAll('[data-destination]').forEach(button=>button.setAttribute('aria-pressed','false'));document.querySelectorAll('.map-town').forEach(town=>town.classList.remove('arrived'));Object.keys(journeys).forEach(key=>$('active-'+key).style.strokeDashoffset='1');showOrigin();};
  for(const key of Object.keys(journeys)){$('active-'+key).setAttribute('pathLength','1');$('active-'+key).style.strokeDasharray='1';$('active-'+key).style.strokeDashoffset='1';}
  reduced.addEventListener('change',()=>{if(reduced.matches&&traveling&&selected){const destination=selected;stop();$('active-'+destination).style.strokeDashoffset='0';setTraveler($('route-'+destination),1);arrive(destination);}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&traveling&&selected){const destination=selected;stop();$('active-'+destination).style.strokeDashoffset='0';setTraveler($('route-'+destination),1);arrive(destination);}});
})();
