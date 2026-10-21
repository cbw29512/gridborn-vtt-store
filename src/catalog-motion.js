/**
 * The storefront demonstrates the actual four SVG state studies automatically.
 * One shared lifecycle controls every visible card: no hidden timers, no playback
 * for unproduced concepts, and no pretense that an art study is a paid product.
 */
import {animatedPreviews} from './animated-previews.js';

export const MOTION_STAGES=Object.freeze([
  Object.freeze({key:'idle',label:'IDLE',durationMs:0}),
  Object.freeze({key:'move',label:'MOVE',durationMs:0}),
  Object.freeze({key:'action',label:'ATTACK',durationMs:0}),
  Object.freeze({key:'rest',label:'REST',durationMs:2400})
]);

/** Quick buyer cycle uses real source motion at original speed.
 * A partial Rest view is enough to show the quiet pose, without delaying the card.
 */
export function showcaseDurationMs(preview,key){
 if(!preview||!['idle','move','action','rest'].includes(key))
   throw new Error('Missing showcase animation');
 const ms=key==='action'?preview.actionDurationMs:
   key==='rest'?2400:preview[key+'DurationMs'];
 if(!Number.isInteger(ms)||ms<500)throw Error('Missing accurate '+key+' duration');
 return ms;
}

export function fullShowcaseMs(preview){
 return ['idle','move','action','rest'].reduce((total,key)=>
   total+showcaseDurationMs(preview,key),0);
}

export function hasCatalogMotion(itemId){
 const preview=animatedPreviews[itemId];
 return Boolean(preview?.idle&&preview?.move&&preview?.action&&preview?.rest
   &&Number.isInteger(preview.actionDurationMs)&&preview.actionDurationMs>0);
}

export function initializeCatalogMotion(){
 const results=document.getElementById('results');
 const toggle=document.getElementById('catalog-motion-toggle');
 const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
 if(!results||!toggle)throw new Error('Catalog motion controls not found');
 let paused=false;
 let reduced=Boolean(media?.matches);
 const sessions=new Map();
 const observer=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{
   for(const entry of entries){
     const session=sessions.get(entry.target);
     if(!session)continue;
     session.inView=entry.isIntersecting;
     sync(session);
   }
 },{rootMargin:'60px 0px',threshold:0.12}):null;

 function allowed(session){
   return !paused&&!reduced&&!document.hidden&&session.inView
     &&session.card.isConnected&&session.image.isConnected
     &&session.card.dataset.motionFailed!=='true';
 }
 function stopTimer(session){
   if(session.timer!==null){clearTimeout(session.timer);session.timer=null;}
 }
 function showStill(session){
   if(session.image.getAttribute('src')!==session.still)
     session.image.setAttribute('src',session.still);
   if(session.card.dataset.motionFailed!=='true')
     session.stage.textContent=reduced?'STILL · reduced motion':
       paused?'PAUSED · still preview':'STILL · preview paused';
 }
 function startPhase(session,index){
   if(!allowed(session)){stopTimer(session);showStill(session);return;}
   session.phase=index;
   const frame=MOTION_STAGES[index];
   const asset=session.preview[frame.key];
   session.image.setAttribute('src',asset);
   session.stage.textContent=frame.label+' · animated study';
   // Match actual Idle/Move source cycles without accelerating their animation.
   // Rest is previewed briefly to complete all four states within ~9–11 seconds.
   const duration=showcaseDurationMs(session.preview,frame.key);
   session.timer=setTimeout(()=>{
     session.timer=null;
     startPhase(session,(index+1)%MOTION_STAGES.length);
   },duration);
 }
 function sync(session){
   if(!allowed(session)){
     stopTimer(session);
     showStill(session);
   }else if(session.timer===null){
     startPhase(session,0);
   }
 }
 function updateToggle(){
   toggle.setAttribute('aria-pressed',String(paused));
   toggle.textContent=paused?'Resume catalog motion':'Pause catalog motion';
   toggle.disabled=reduced;
   toggle.title=reduced?'Animations disabled by reduced-motion preference':'';
   for(const session of sessions.values())sync(session);
 }
 function reconcile(){
   for(const session of sessions.values()){
     stopTimer(session);
     observer?.unobserve(session.card);
   }
   sessions.clear();
   for(const card of results.querySelectorAll('.product-card[data-motion-id]')){
     const id=card.dataset.motionId;
     if(!hasCatalogMotion(id))continue;
     const image=card.querySelector('.product-art');
     const stage=card.querySelector('.product-motion-stage');
     if(!image||!stage)continue;
     const session={card,image,stage,preview:animatedPreviews[id],
       still:image.getAttribute('src'),timer:null,phase:0,inView:false};
     sessions.set(card,session);
     if(observer)observer.observe(card);
     else{session.inView=true;sync(session);}
   }
 }
 toggle.addEventListener('click',()=>{paused=!paused;updateToggle();});
 document.addEventListener('visibilitychange',()=>{
   for(const session of sessions.values())sync(session);
 });
 media?.addEventListener?.('change',event=>{
   reduced=event.matches;updateToggle();
 });
 document.addEventListener('gridborn:catalog-rendered',reconcile);
 reconcile();
 updateToggle();
 return {reconcile};
}
