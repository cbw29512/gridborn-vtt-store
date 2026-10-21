import { animatedPreviews } from './animated-previews.js';

const byId = name => document.getElementById(name);
let current = null;
let mode = 'still';

function updatePreview(next) {
  try {
    if (!current) return;
    if (!Object.prototype.hasOwnProperty.call(current, next)) return;
    mode = next;
    const image = byId('concept-preview-image');
    image.src = current[next];
    byId('concept-preview-action').setAttribute('aria-pressed', String(next === 'action'));
    byId('concept-preview-rest').setAttribute('aria-pressed', String(next === 'rest'));
    byId('concept-preview-action').textContent = next === 'action' ? 'Stop action' : 'Play action';
    byId('concept-preview-rest').textContent = next === 'rest' ? 'Stop rest' : 'Play rest';
    byId('concept-preview-status').textContent = next === 'still' ? 'Static image study' :
      next === 'action' ? 'Action study playing · 45-second loop' :
        'Rest study playing · 6-second loop';
  } catch (error) { console.error('Unable to update concept preview', error); }
}

export function setConceptPreview(item) {
  try {
    const stage = byId('concept-preview-panel');
    const controls = byId('concept-preview-controls');
    current = item && (animatedPreviews[item.id] ||
      (item.previewArt ? { still: item.previewArt } : null));
    stage.hidden = !current;
    controls.hidden = !current?.action;
    if (!current) return;
    byId('concept-preview-image').alt = 'Static or animated original art study for ' + item.name;
    updatePreview('still');
  } catch (error) { console.error('Unable to prepare concept preview', error); }
}

export function stopConceptPreview() {
  try { if (current && mode !== 'still') updatePreview('still'); }
  catch (error) { console.error('Unable to stop concept animation', error); }
}

export function initializeConceptPreview() {
  try {
    const action = byId('concept-preview-action');
    const rest = byId('concept-preview-rest');
    action.addEventListener('click', () => updatePreview(mode === 'action' ? 'still' : 'action'));
    rest.addEventListener('click', () => updatePreview(mode === 'rest' ? 'still' : 'rest'));
    document.addEventListener('visibilitychange', () => {
      try { if (document.hidden) stopConceptPreview(); }
      catch (error) { console.error('Could not pause hidden concept animation', error); }
    });
    byId('concept-preview-image').addEventListener('error', () => {
      try {
        if (!current) return;
        if (mode !== 'still') updatePreview('still');
        else byId('concept-preview-status').textContent = 'Artwork could not be loaded';
      } catch (error) { console.error('Concept image load failure', error); }
    });
  } catch (error) { console.error('Unable to initialize concept previews', error); }
}
