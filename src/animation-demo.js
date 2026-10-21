/**
 * Gridborn homepage: an animated Idle loop appears immediately beside
 * the static BEFORE. Visitors can switch Idle/Rest or pause moving content.
 * Both assets are development prototypes, not downloadable paid videos.
 */
const SOURCES=Object.freeze({
  still:'./assets/demos/human-fighter-still.svg',
  idle:'./assets/demos/human-fighter-idle.svg',
  rest:'./assets/demos/human-fighter-rest.svg',
});

export function initializeDemo() {
  try {
    const idle=document.getElementById('demo-toggle');
    const rest=document.getElementById('demo-rest-toggle');
    const pause=document.getElementById('demo-pause');
    const image=document.getElementById('demo-token');
    const status=document.getElementById('demo-status');
    const panel=document.querySelector('.vtt-panel-live');
    if (!idle||!rest||!pause||!image||!status||!panel)
      throw new Error('Missing Fighter comparison controls');

    let mode='idle';
    let userPaused=false;
    let hiddenPaused=false;
    // Honor system reduced-motion preferences without blocking other users.
    const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
    if (reduced) userPaused=true;

    function update() {
      try {
        const paused=userPaused||hiddenPaused;
        const next=paused?SOURCES.still:SOURCES[mode];
        if(image.getAttribute('src')!==next) image.setAttribute('src',next);
        idle.setAttribute('aria-pressed',String(mode==='idle'));
        rest.setAttribute('aria-pressed',String(mode==='rest'));
        pause.setAttribute('aria-pressed',String(userPaused));
        pause.textContent=userPaused?'Resume':'Pause';
        panel.dataset.paused=String(paused);
        status.textContent=paused?(hiddenPaused?'Paused while tab is hidden':
          reduced?'Paused · reduced-motion preference':'Paused · choose Resume') :
          mode==='idle'?'Idle · loops automatically':'Rest · loops continuously';
      }catch(error){console.error('Unable to update Gridborn animated preview',error);}
    }
    function choose(next){
      if(next!=='idle'&&next!=='rest')return;
      mode=next;
      userPaused=false;
      update();
    }
    idle.addEventListener('click',()=>choose('idle'));
    rest.addEventListener('click',()=>choose('rest'));
    pause.addEventListener('click',()=>{userPaused=!userPaused;update();});
    document.addEventListener('visibilitychange',()=>{
      hiddenPaused=document.hidden;
      update();
    });
    image.addEventListener('error',()=>{
      if(image.getAttribute('src')===SOURCES.still){
        status.textContent='Fighter preview could not load';
        return;
      }
      userPaused=true;
      update();
      status.textContent='Animation unavailable · showing still image';
    });
    update();
  }catch(error){console.error('Animation preview failed to initialize',error);}
}
