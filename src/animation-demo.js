/**
 * Human Fighter art-study state:
 * still (default) | action (45s) | rest (6s).
 * Both animations are user initiated and all variants remain concept-only.
 */
const SOURCES = Object.freeze({
  still: './assets/demos/human-fighter-still.svg',
  action: './assets/demos/human-fighter-loop.svg',
  rest: './assets/demos/human-fighter-rest.svg',
});

export function initializeDemo() {
  try {
    const action = document.getElementById('demo-toggle');
    const rest = document.getElementById('demo-rest-toggle');
    const image = document.getElementById('demo-token');
    if (!action || !rest || !image) throw new Error('Missing fighter preview controls');

    let mode = 'still';

    function selectMode(next) {
      try {
        if (!Object.prototype.hasOwnProperty.call(SOURCES, next)) {
          throw new Error('Invalid preview mode');
        }
        mode = next;
        image.src = SOURCES[mode];
        action.setAttribute('aria-pressed', String(mode === 'action'));
        rest.setAttribute('aria-pressed', String(mode === 'rest'));
        action.textContent = mode === 'action' ? 'Stop action loop' : 'Play action loop';
        rest.textContent = mode === 'rest' ? 'Stop rest loop' : 'Play rest loop';
      } catch (error) { console.error('Unable to set Fighter animation mode', error); }
    }

    action.addEventListener('click', () => {
      try { selectMode(mode === 'action' ? 'still' : 'action'); }
      catch (error) { console.error('Fighter action preview failed', error); }
    });
    rest.addEventListener('click', () => {
      try { selectMode(mode === 'rest' ? 'still' : 'rest'); }
      catch (error) { console.error('Fighter rest preview failed', error); }
    });
    document.addEventListener('visibilitychange', () => {
      try { if (document.hidden && mode !== 'still') selectMode('still'); }
      catch (error) { console.error('Unable to stop hidden preview', error); }
    });
    image.addEventListener('error', () => {
      try { if (mode !== 'still') selectMode('still'); }
      catch (error) { console.error('Unable to recover image preview', error); }
    });
  } catch (error) { console.error('Animation preview failed to initialize', error); }
}
