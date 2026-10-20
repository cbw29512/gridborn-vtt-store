import { catalog, categoryConfig } from './catalog.js';
import { initialState, availableOptions, filterCatalog, validateCatalog } from './filters.js';
import { initializeDemo } from './animation-demo.js';
import { openConcept, initializeConceptDialog } from './concept-dialog.js';
import { readCatalogRoute, writeCatalogRoute, markActiveCollection, connectCatalogNavigation } from './routing.js';

// One battle-tested state object drives search and both dependent dropdowns.
const state = { ...initialState };
const nodes = {};
const byId = id => document.getElementById(id);
function populateSelect(node, values, allText, selected = '') {
  try {
    node.replaceChildren();
    node.add(new Option(allText, ''));
    for (const value of values) node.add(new Option(value, value));
    node.value = values.includes(selected) ? selected : '';
    node.disabled = values.length === 0;
  } catch (error) { console.error('Unable to build select options', error); }
}

function updateFilters() {
  try {
    const config = categoryConfig[state.category];
    nodes.firstLabel.textContent = config.first;
    nodes.secondLabel.textContent = config.second;
    nodes.search.placeholder = config.placeholder;
    const values = availableOptions(catalog, state.category, state.primary);
    populateSelect(nodes.primary, values.first, 'All ' + config.first.toLowerCase(), state.primary);
    populateSelect(nodes.secondary, values.second, 'All ' + config.second.toLowerCase() + 's', state.secondary);
  } catch (error) { console.error('Unable to update dependent filters', error); }
}

function makeCard(item) {
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
    price.textContent = '$' + (item.priceCents / 100).toFixed(2);
    price.setAttribute('aria-label', 'Proposed price ' + price.textContent);
    const button = document.createElement('button');
    button.className = 'product-button'; button.disabled = true; button.textContent = 'Coming soon';
    const details = document.createElement('button');
    details.type = 'button'; details.className = 'details-button';
    details.textContent = 'View concept details';
    details.setAttribute('aria-label', 'View concept details for ' + item.name);
    details.addEventListener('click', () => openConcept(item, details));
    foot.append(price, button); body.append(type, name, meta, details, foot); card.append(visual, body);
    return card;
  } catch (error) { console.error('Unable to render token preview', item.id, error); return null; }
}

function renderResults() {
  try {
    const filtered = filterCatalog(catalog, state);
    nodes.results.replaceChildren(...filtered.map(makeCard).filter(Boolean));
    nodes.empty.hidden = filtered.length > 0;
    nodes.results.hidden = filtered.length === 0;
    nodes.summary.textContent = filtered.length + (filtered.length === 1 ? ' result found' : ' results found');
    nodes.caption.textContent = [state.category, state.primary, state.secondary].filter(Boolean).join(' / ');
    nodes.clear.hidden = !state.query && !state.primary && !state.secondary;
    markActiveCollection(state.category);
  } catch (error) { console.error('Unable to render catalog results', error); }
}

function resetFilters() {
  try {
    Object.assign(state, initialState);
    nodes.search.value = ''; nodes.category.value = state.category;
    updateFilters(); renderResults(); writeCatalogRoute(state);
  } catch (error) { console.error('Unable to reset catalog filters', error); }
}

function initialize() {
  try {
    if (!validateCatalog(catalog)) throw new Error('Preview catalog validation failed');
    Object.assign(state, readCatalogRoute(window.location.search, catalog));
    Object.assign(nodes, {
      search: byId('search'), category: byId('category'), primary: byId('primary-filter'),
      secondary: byId('secondary-filter'), firstLabel: byId('primary-label'),
      secondLabel: byId('secondary-label'), results: byId('results'),
      summary: byId('result-summary'), caption: byId('category-caption'),
      empty: byId('empty-state'), clear: byId('clear-filters'),
    });
    initializeConceptDialog();
    populateSelect(nodes.category, Object.keys(categoryConfig), 'Choose category', state.category);
    nodes.category.value = state.category;
    nodes.category.addEventListener('change', () => {
      try { state.category = nodes.category.value; state.primary = ''; state.secondary = ''; updateFilters(); renderResults(); writeCatalogRoute(state); }
      catch (error) { console.error('Category change failed', error); }
    });
    nodes.primary.addEventListener('change', () => {
      try { state.primary = nodes.primary.value; state.secondary = ''; updateFilters(); renderResults(); writeCatalogRoute(state); }
      catch (error) { console.error('Primary filter change failed', error); }
    });
    nodes.secondary.addEventListener('change', () => {
      try { state.secondary = nodes.secondary.value; renderResults(); writeCatalogRoute(state); }
      catch (error) { console.error('Secondary filter change failed', error); }
    });
    nodes.search.addEventListener('input', () => {
      try { state.query = nodes.search.value; renderResults(); writeCatalogRoute(state); }
      catch (error) { console.error('Search update failed', error); }
    });
    connectCatalogNavigation(state, catalog, () => {
      try {
        nodes.search.value = state.query; nodes.category.value = state.category;
        updateFilters(); renderResults();
      } catch (error) { console.error('Unable to refresh routed catalog', error); }
    });
    nodes.clear.addEventListener('click', resetFilters);
    byId('empty-reset').addEventListener('click', resetFilters);
    nodes.search.value = state.query;
    updateFilters(); renderResults(); initializeDemo();
  } catch (error) {
    console.error('Storefront failed to initialize', error);
    const summary = byId('result-summary');
    if (summary) summary.textContent = 'Catalog temporarily unavailable';
  }
}
initialize();
