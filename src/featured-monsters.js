/** Featured original art: only real SRD Young Dragons with verified four-state preview links. */
import {catalog} from './catalog.js';
import {animatedPreviews} from './animated-previews.js';
import {MOTION_STAGES,showcaseDurationMs} from './catalog-motion.js';
export const FEATURED_DRAGON_COLORS=Object.freeze(["Black","Blue","Brass","Bronze","Copper","Gold","Green","Red","Silver","White"]);
export function featuredDragonEntries(items=catalog,previews=animatedPreviews){
 const byId=new Map(items.map(x=>[x.id,x]));
 const dragons=FEATURED_DRAGON_COLORS.map(color=>{
  const id='mon-srd-52-young-'+color.toLowerCase()+'-dragon';
  const item=byId.get(id),preview=previews[id];
  if(!item||item.category!=='Monsters'||item.name!=='Young '+color+' Dragon'||
      item.purchasable!==false||item.animationStatus!=='art-study'||!item.previewArt||
      !preview?.idle||!preview?.move||!preview?.action||!preview?.rest)
    throw new Error('Missing source-backed featured dragon: '+id);
  return Object.freeze({id,name:item.name,still:item.previewArt,preview,
   href:'?category=Monsters&q='+encodeURIComponent(item.name)+'#catalog'});
 });
 return Object.freeze(dragons);
}
export function renderFeaturedDragonGallery(grid,dragons=featuredDragonEntries()){
 if(!grid)throw new Error('Featured dragon grid is missing');
 const cards=dragons.map(entry=>{
  const a=document.createElement('a');a.className='featured-dragon-card';a.href=entry.href;
  a.dataset.dragonId=entry.id;
  a.setAttribute('aria-label','Explore '+entry.name+' animations');
  const image=document.createElement('img');
  image.className='featured-dragon-art';image.src=entry.still;
  image.alt='';
  image.width=160;image.height=142;image.loading='eager';image.decoding='async';
  image.addEventListener('error',()=>{
   if(image.getAttribute('src')!==entry.still){
    a.dataset.motionFailed='true';
    image.src=entry.still;
   }
  });
  const name=document.createElement('strong');name.textContent=entry.name;
  const arrow=document.createElement('span');
  arrow.className='featured-dragon-arrow';arrow.textContent='↗';
  arrow.setAttribute('aria-hidden','true');
  a.append(image,name,arrow);
  return a;
 });
 grid.replaceChildren(...cards);
 return cards.length;
}
export function shouldShowFeaturedDragons(state){
 return state?.category==='Monsters'&&!state.query?.trim()&&!state.primary&&!state.secondary;
}

/**
 * Real art is the sales demonstration: all ten dragons share one four-state
 * showcase clock instead of ten timers or a decorative idle-only thumbnail.
 * No simulated attacks, no static substitutes while motion is allowed.
 */
export function initializeFeaturedDragonMotion(section,entries=featuredDragonEntries()){
 if(!section)throw new Error('Missing featured dragon section');
 const cards=[...section.querySelectorAll('.featured-dragon-card')];
 if(cards.length!==entries.length)throw new Error('Featured dragon gallery is incomplete');
 const images=cards.map(card=>card.querySelector('img.featured-dragon-art'));
 if(images.some(image=>!image))throw new Error('Missing dragon image');
 let timer=null,index=0,inView=false;
 const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
 let reduced=Boolean(media?.matches);
 const observer=('IntersectionObserver' in window)
  ?new IntersectionObserver((changes)=>{
    for(const change of changes)if(change.target===section){
      inView=change.isIntersecting;sync();
    }
   },{rootMargin:'120px 0px',threshold:0.05}):null;
 if(!observer)inView=true;
 function canAnimate(){
  return !section.hidden&&section.isConnected&&inView&&!document.hidden&&!reduced;
 }
 function stop(){if(timer!==null){clearTimeout(timer);timer=null;}}
 function showStill(){
  section.dataset.featuredPhase='still';
  images.forEach((image,i)=>{
   if(image.getAttribute('src')!==entries[i].still)image.src=entries[i].still;
   cards[i].dataset.motionPhase='still';
  });
 }
 function nextPhase(i){
  if(!canAnimate()){stop();showStill();return;}
  index=i;
  const mode=MOTION_STAGES[i].key;
  section.dataset.featuredPhase=mode;
  images.forEach((image,n)=>{
   const card=cards[n];
   if(card.dataset.motionFailed==='true')return;
   card.dataset.motionPhase=mode;
   const asset=entries[n].preview[mode];
   if(image.getAttribute('src')!==asset)image.src=asset;
  });
  // All ten assets inherit the same body and source timing; one clock keeps
  // their moves and elemental attacks visually comparable in a single glance.
  const duration=showcaseDurationMs(entries[0].preview,mode);
  timer=setTimeout(()=>{timer=null;nextPhase((i+1)%MOTION_STAGES.length);},duration);
 }
 function sync(){
  if(!canAnimate()){stop();showStill();}
  else if(timer===null)nextPhase(0);
 }
 const visibility=()=>sync();
 const changed=event=>{reduced=event.matches;sync();};
 document.addEventListener('visibilitychange',visibility);
 document.addEventListener('gridborn:catalog-rendered',visibility);
 media?.addEventListener?.('change',changed);
 observer?.observe(section);
 sync();
 return Object.freeze({sync,destroy(){
  stop();observer?.disconnect();
  document.removeEventListener('visibilitychange',visibility);
  document.removeEventListener('gridborn:catalog-rendered',visibility);
  media?.removeEventListener?.('change',changed);
  showStill();
 }});
}
