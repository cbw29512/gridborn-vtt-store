/**
 * Both Human Fighter art studies play automatically and repeat indefinitely:
 * sleeping and a complete Idle > Move > Attack > Recover showcase.
 * An optional accessible pause stops both; no Play buttons are needed.
 */
const ASSETS=Object.freeze({
  sleep:'./assets/demos/human-fighter-sleep.svg',
  sleepStill:'./assets/demos/human-fighter-sleep-still.svg',
  motion:'./assets/demos/human-fighter-showcase.svg',
  motionStill:'./assets/demos/human-fighter-still.svg',
});
export function initializeDemo() {
  try {
    const sleep=document.getElementById('demo-sleep-token');
    const motion=document.getElementById('demo-token');
    const pause=document.getElementById('demo-pause');
    const status=document.getElementById('demo-status');
    const sleepStatus=document.getElementById('demo-sleep-status');
    const panels=[
      document.querySelector('.vtt-panel-rest'),
      document.querySelector('.vtt-panel-live'),
    ];
    if(!sleep||!motion||!pause||!status||!sleepStatus||panels.some(p=>!p))
      throw new Error('Missing automatic looping previews');
    const preference=window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let userPaused=Boolean(preference?.matches);
    let hiddenPaused=document.hidden;
    const unavailable=new Set();
    const update=()=>{
      try{
        const paused=userPaused||hiddenPaused;
        const sources=[
          paused||unavailable.has('sleep')?ASSETS.sleepStill:ASSETS.sleep,
          paused||unavailable.has('motion')?ASSETS.motionStill:ASSETS.motion
        ];
        for(const [i,img] of [sleep,motion].entries()){
          if(img.getAttribute('src')!==sources[i])img.setAttribute('src',sources[i]);
          panels[i].dataset.paused=String(paused);
        }
        pause.setAttribute('aria-pressed',String(userPaused));
        pause.textContent=userPaused?'Resume motion':'Pause motion';
        sleepStatus.textContent=unavailable.has('sleep')?'Sleep preview unavailable':
          paused?'Sleep · paused':'Sleep · repeats automatically';
        status.textContent=unavailable.has('motion')?'Motion preview unavailable':
          paused?'Full motion · paused':'Idle → Move → Attack → Recover · repeats';
      }catch(error){console.error('Unable to update looping Fighter previews',error);}
    };
    pause.addEventListener('click',()=>{userPaused=!userPaused;update();});
    document.addEventListener('visibilitychange',()=>{hiddenPaused=document.hidden;update();});
    preference?.addEventListener?.('change',event=>{userPaused=event.matches;update();});
    for(const [key,img] of [['sleep',sleep],['motion',motion]]){
      img.addEventListener('error',()=>{
        unavailable.add(key);
        update();
        console.warn('Gridborn animation asset failed to load:',key);
      });
    }
    update();
  }catch(error){console.error('Could not start Gridborn automatic animation previews',error);}
}
