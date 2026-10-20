import { categoryConfig } from './catalog.js';

let lastDialogTrigger = null;
const nodes = {};

export function openConcept(item, trigger) {
  try {
    if (!nodes.dialog || typeof nodes.dialog.showModal !== 'function') throw new Error('Native concept dialog unavailable');
    const config = categoryConfig[item.category];
    if (!config) throw new Error('Unknown category: ' + item.category);
    nodes.dialogTitle.textContent = item.name;
    nodes.dialogDescription.textContent = 'Planned specifications for this ' + item.category.toLowerCase() + ' token.';
    const specs = [
      ['Category', item.category], [config.first, item.primary], [config.second, item.secondary],
      ['Size', item.size], ['Grid footprint', item.squares + ' × ' + item.squares + ' squares'],
      ['Animation', 'Proposed 45-second idle, walk, attack and recovery loop'],
      ['Extras', 'Rest animation and PNG fallback planned'],
      ['Artwork status', item.previewArt ? 'Original draft illustration; not a VTT-certified asset' : 'Not produced'],
      ['Animation status', item.animationStatus === 'art-study'
        ? 'Action and rest studies exist; not VTT-certified'
        : 'Animated asset not produced; any visible image is a static art study'],
      ['VTT compatibility', 'Not tested in Foundry, Roll20, or other virtual tabletops'],
      ['Target price', 'USD ' + (item.priceCents / 100).toFixed(2) + ' — not yet for sale'],
    ];
    nodes.dialogFacts.replaceChildren();
    for (const [term, value] of specs) {
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = term;
      dd.textContent = value;
      nodes.dialogFacts.append(dt, dd);
    }
    lastDialogTrigger = trigger;
    nodes.dialog.showModal();
  } catch (error) {
    console.error('Unable to display token concept', item.id, error);
  }
}


export function initializeConceptDialog() {
  try {
    const byId = id => document.getElementById(id);
    Object.assign(nodes, {
      dialog: byId('preview-dialog'),
      dialogTitle: byId('preview-title'),
      dialogDescription: byId('preview-description'),
      dialogFacts: byId('preview-facts'),
    });
    if (!nodes.dialog || !nodes.dialogTitle || !nodes.dialogDescription || !nodes.dialogFacts) {
      throw new Error('Incomplete token details dialog');
    }
    nodes.dialog.addEventListener('close', () => {
      try { if (lastDialogTrigger?.isConnected) lastDialogTrigger.focus(); }
      catch (error) { console.error('Unable to restore concept detail focus', error); }
    });
  } catch (error) { console.error('Unable to initialize details dialog', error); }
}
