import { animatedPreviews } from './animated-previews.js';

const byId=id=>document.getElementById(id);
const MODES=['idle','move','action','rest'];
const LABELS={
  still:'Static original art study',
  idle:'Idle · breathing loop (prototype)',
  move:'Move · four-legged trot (prototype)',
  action:'Attack · one bite and recovery (prototype)',
  rest:'Rest · curled breathing loop (prototype)'
};
let current=null,mode='still',timer=null,sequence=0;
function clearReset(){
  sequence++;
  if(timer!==null){clearTimeout(timer);timer=null;}
}
function updatePreview(next){
  try{
    if(!current||!Object.hasOwn(current,next)||typeof current[next]!=='string')return;
    clearReset();
    mode=next;
    const image=byId('concept-preview-image');
    if(image.getAttribute('src')!==current[next])image.src=current[next];
    if(!byId('concept-scale-panel').hidden){
      for(const pixels of [128,64,32]){
        const mapImage=byId('concept-scale-'+pixels);
        if(mapImage.getAttribute('src')!==current[next])mapImage.src=current[next];
      }
    }
    for(const key of MODES){
      const button=byId('concept-preview-'+key);
      button.setAttribute('aria-pressed',String(next===key));
      if(key==='action'||key==='rest'){

        button.textContent=next===key?'Show still':
          key==='action'?'Play attack once':'Hold rest loop';
      }
    }
    const hasFullStates=typeof current.idle==='string';
    byId('concept-preview-status').textContent=hasFullStates?(current.labels?.[next]||LABELS[next]||LABELS.still):
      next==='still'?'Static original art study':
      next==='action'?'45-second action study · continuous loop':
      '6-second rest study · continuous loop';
    // Attack clips are one-shot states, not continuously cycling auto-attacks.
    if(next==='action'&&Number.isInteger(current.actionDurationMs)&&current.idle){
      const expected=sequence;
      timer=setTimeout(()=>{
        if(expected===sequence&&mode==='action')updatePreview('idle');
      },current.actionDurationMs);
    }
  }catch(error){console.error('Gridborn concept preview could not update',error);}
}
export function setConceptPreview(item){
  try{
    clearReset();
    const stage=byId('concept-preview-panel');
    const controls=byId('concept-preview-controls');
    current=item&&(animatedPreviews[item.id]||
      (item.previewArt?{still:item.previewArt}:null));
    stage.hidden=!current;
    controls.hidden=!current?.action;
    const scale=byId('concept-scale-panel');
    scale.hidden=!(current?.idle&&current?.move&&current?.action&&current?.rest);
    for(const key of MODES){
      const button=byId('concept-preview-'+key);
      button.hidden=!current?.[key];
    }
    if(!current)return;
    byId('concept-preview-image').alt='Original static or animated token study of '+item.name;
    mode='still';
    updatePreview('still');
  }catch(error){console.error('Could not set concept preview',error);}
}
export function stopConceptPreview(){
  clearReset();
  if(current&&mode!=='still')updatePreview('still');
}
export function initializeConceptPreview(){
  try{
    for(const key of MODES){
      const button=byId('concept-preview-'+key);
      button.addEventListener('click',()=>updatePreview(mode===key?'still':key));
    }
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden)stopConceptPreview();
    });
    byId('concept-preview-image').addEventListener('error',()=>{
      if(!current)return;
      const failed=mode;
      if(mode!=='still')updatePreview('still');
      byId('concept-preview-status').textContent='Preview could not load: '+failed;
    });
  }catch(error){console.error('Could not initialize concept preview',error);}
}
