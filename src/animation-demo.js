/**
 * A user-initiated proof-of-concept preview. The still SVG loads by default.
 * The animated SVG follows the documented 27/8/3/7-second timeline.
 * This is NOT a shippable game asset or a checkout capability.
 */
export function initializeDemo() {
  try {
    const toggle = document.getElementById('demo-toggle');
    const image = document.getElementById('demo-token');
    if (!toggle || !image) throw new Error('Animation preview controls are missing');

    const still = './assets/demos/human-fighter-still.svg';
    const loop = './assets/demos/human-fighter-loop.svg';
    let playing = false;

    function setPlaying(next) {
      try {
        playing = Boolean(next);
        image.src = playing ? loop : still;
        toggle.textContent = playing ? 'Pause concept animation' : 'Play concept animation';
        toggle.setAttribute('aria-pressed', String(playing));
      } catch (error) { console.error('Unable to change preview animation', error); }
    }

    toggle.addEventListener('click', () => {
      try { setPlaying(!playing); }
      catch (error) { console.error('Animation control failed', error); }
    });
    document.addEventListener('visibilitychange', () => {
      try { if (document.hidden && playing) setPlaying(false); }
      catch (error) { console.error('Unable to pause hidden animation', error); }
    });
  } catch (error) { console.error('Animation preview failed to initialize', error); }
}
