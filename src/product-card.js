import { openConcept } from './concept-dialog.js';
import { PRESETS } from './builder-data.js';

export function makeCard(item) {
  try {
    const card = document.createElement('article'); card.className = 'product-card';
    const visual = document.createElement('div'); visual.className = 'product-visual';
    visual.dataset.category = item.category;
    const symbol = document.createElement('span'); symbol.className = 'product-placeholder'; symbol.textContent = item.symbol;
    if (item.previewArt) {
      const illustration = document.createElement('img');
      illustration.className = 'product-art';
      illustration.src = item.previewArt;
      illustration.alt = 'Original pixel-art study for ' + item.name + '; not a finished token';
      illustration.loading = 'lazy';
      illustration.decoding = 'async';
      illustration.addEventListener('error', () => {
        try { illustration.replaceWith(symbol); badge.textContent = 'CONCEPT ONLY'; }
        catch (error) { console.error('Cannot recover preview artwork', item.id, error); }
      });
      visual.append(illustration);
    } else {
      visual.append(symbol);
    }
    const badge = document.createElement('span'); badge.className = 'preview-label'; badge.textContent = item.animationStatus === 'art-study' ? 'ANIMATION STUDY' :
      item.previewArt ? 'ART STUDY' : 'CONCEPT ONLY';
    const footprint = document.createElement('span'); footprint.className = 'product-footprint';
    footprint.textContent = item.squares + '×' + item.squares + ' GRID';
    visual.append(badge, footprint);
    const body = document.createElement('div'); body.className = 'product-body';
    const type = document.createElement('div'); type.className = 'product-type';
    type.textContent = item.primary + ' · ' + item.secondary;
    const name = document.createElement('h4'); name.className = 'product-name'; name.textContent = item.name;
    const meta = document.createElement('div'); meta.className = 'product-meta';
    meta.textContent = item.size + (item.animationStatus === 'art-study'
      ? ' · Action + rest studies' : ' · Animation planned');
    const foot = document.createElement('div'); foot.className = 'product-foot';
    const price = document.createElement('strong'); price.className = 'product-price';
    price.textContent = 'Target $' + (item.priceCents / 100).toFixed(2);
    price.setAttribute('aria-label', 'Proposed price ' + price.textContent);
    const availability = document.createElement('span');
    availability.className = 'product-unavailable'; availability.textContent = 'Preview only';
    const details = document.createElement('button');
    details.type = 'button'; details.className = 'details-button';
    details.textContent = 'View concept details';
    details.setAttribute('aria-label', 'View concept details for ' + item.name);
    details.addEventListener('click', () => openConcept(item, details));
    if (Object.hasOwn(PRESETS,item.id)) {
      const personalize = document.createElement('a');
      personalize.href = './builder.html?preset=' + encodeURIComponent(item.id);
      personalize.className = 'customize-link';
      personalize.textContent = 'Customize this look ✦';
      personalize.setAttribute('aria-label','Customize ' + item.name + ' in the builder');
      body.append(personalize);
    }
    foot.append(price, availability); body.append(type, name, meta, details, foot); card.append(visual, body);
    return card;
  } catch (error) { console.error('Unable to render token preview', item.id, error); return null; }
}
