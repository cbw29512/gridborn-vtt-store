import { catalog, categoryConfig } from './catalog.js';
import { initialState, availableOptions, filterCatalog, validateCatalog } from './filters.js';
import { initializeDemo } from './animation-demo.js';
import {initializeBundles} from './bundle-ui.js';
import { initializeConceptDialog } from './concept-dialog.js';
import { makeCard } from './product-card.js';
import { initializeCatalogMotion, hasCatalogMotion } from './catalog-motion.js';
import {verifyMotionCatalog} from './production-motion-gate.mjs';
import {renderFeaturedDragonGallery,shouldShowFeaturedDragons} from './featured-monsters.js';
import { readCatalogRoute, writeCatalogRoute, markActiveCollection, connectCatalogNavigation } from './routing.js';

// One battle-tested state object drives search and both dependent dropdowns.
const state = { ...initialState };
const nodes = {};
const byId = id => document.getElementById(id);
let visibleCount = 8;
const pageSize=()=>['Monsters','Characters','NPCs'].includes(state.category)?24:8;
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
    nodes.primaryField.hidden = !config;
    nodes.secondaryField.hidden = !config;
    nodes.search.placeholder = config ? config.placeholder : 'Try shark, wizard, innkeeper...';
    nodes.searchLabel.textContent = config ? 'Search ' + state.category.toLowerCase() : 'Search all tokens';
    if (!config) return;
    nodes.firstLabel.textContent = config.first;
    nodes.secondLabel.textContent = config.second;
    const values = availableOptions(catalog, state.category, state.primary);
    populateSelect(nodes.primary, values.first, 'All ' + config.first.toLowerCase(), state.primary);
    populateSelect(nodes.secondary, values.second,
      state.primary ? 'All ' + config.second.toLowerCase() + 's'
        : 'Choose ' + config.first.toLowerCase() + ' first', state.secondary);
  } catch (error) { console.error('Unable to update dependent filters', error); }
}

function renderResults() {
  try {
    const filtered = filterCatalog(catalog, state);
    if(nodes.featuredDragons){
      nodes.featuredDragons.hidden=!shouldShowFeaturedDragons(state)
        ||!nodes.featuredDragonGrid?.children.length;
    }
    const ordered = [...filtered].sort((a,b)=>
      (!state.query ? Number(hasCatalogMotion(b.id))-Number(hasCatalogMotion(a.id)) : 0) ||
      Number(Boolean(b.previewArt))-Number(Boolean(a.previewArt)) ||
      (state.category==='Monsters' ? a.name.localeCompare(b.name) : 0));
    nodes.results.replaceChildren(...ordered.slice(0, visibleCount).map(makeCard).filter(Boolean));
    document.dispatchEvent(new Event('gridborn:catalog-rendered'));
    nodes.empty.hidden = filtered.length > 0;
    nodes.results.hidden = filtered.length === 0;
    nodes.more.hidden = filtered.length <= visibleCount;
    nodes.more.textContent = 'Show more designs (' + (filtered.length - visibleCount) + ' remaining)';
    nodes.summary.textContent = filtered.length + (filtered.length === 1 ? ' result found' : ' results found');
    nodes.caption.textContent = [state.category === 'All' ? 'All categories' : state.category,
      state.primary, state.secondary].filter(Boolean).join(' / ');
    nodes.emptyMessage.textContent = 'No matches in ' +
      (state.category === 'All' ? 'the catalog' : state.category) +
      '. Try another search or clear the filters.';
    nodes.clear.hidden = !state.query && !state.primary && !state.secondary;
    markActiveCollection(state.category);
  } catch (error) { console.error('Unable to render catalog results', error); }
}

function resetFilters() {
  try {
    const currentCategory = state.category;
    Object.assign(state, { ...initialState, category: currentCategory });
    nodes.search.value = ''; nodes.category.value = state.category;
    visibleCount = pageSize(); updateFilters(); renderResults(); writeCatalogRoute(state);
  } catch (error) { console.error('Unable to reset catalog filters', error); }
}

function initialize() {
  try {
    if (!validateCatalog(catalog)) throw new Error('Preview catalog validation failed');
    verifyMotionCatalog(catalog);
    Object.assign(state, readCatalogRoute(window.location.search, catalog));
    Object.assign(nodes, {
      search: byId('search'), searchLabel: byId('search-label'),
      category: byId('category'), primary: byId('primary-filter'),
      secondary: byId('secondary-filter'), firstLabel: byId('primary-label'),
      secondLabel: byId('secondary-label'), primaryField: byId('primary-field'),
      secondaryField: byId('secondary-field'), results: byId('results'),
      summary: byId('result-summary'), caption: byId('category-caption'),
      empty: byId('empty-state'), emptyMessage: byId('empty-message'),
      clear: byId('clear-filters'), more: byId('show-more'),
      featuredDragons:byId('featured-dragons'),featuredDragonGrid:byId('featured-dragons-grid'),
    });
    initializeConceptDialog();
    try{renderFeaturedDragonGallery(nodes.featuredDragonGrid);}
    catch(error){console.error('Featured monsters unavailable',error);nodes.featuredDragons.hidden=true;}
    nodes.category.replaceChildren(new Option('All categories', 'All'));
    for (const label of Object.keys(categoryConfig)) nodes.category.add(new Option(label, label));
    nodes.category.value = state.category;
    nodes.category.addEventListener('change', () => {
      try { state.category = nodes.category.value; state.primary = ''; state.secondary = ''; visibleCount = pageSize(); updateFilters(); renderResults(); writeCatalogRoute(state); }
      catch (error) { console.error('Category change failed', error); }
    });
    nodes.primary.addEventListener('change', () => {
      try { state.primary = nodes.primary.value; state.secondary = ''; visibleCount = pageSize(); updateFilters(); renderResults(); writeCatalogRoute(state); }
      catch (error) { console.error('Primary filter change failed', error); }
    });
    nodes.secondary.addEventListener('change', () => {
      try { state.secondary = nodes.secondary.value; visibleCount = pageSize(); renderResults(); writeCatalogRoute(state); }
      catch (error) { console.error('Secondary filter change failed', error); }
    });
    nodes.search.addEventListener('input', () => {
      try { state.query = nodes.search.value; visibleCount = pageSize(); renderResults(); writeCatalogRoute(state); }
      catch (error) { console.error('Search update failed', error); }
    });
    connectCatalogNavigation(state, catalog, () => {
      try {
        nodes.search.value = state.query; nodes.category.value = state.category;
        visibleCount = pageSize(); updateFilters(); renderResults();
      } catch (error) { console.error('Unable to refresh routed catalog', error); }
    });
    nodes.more.addEventListener('click', () => {
      try { visibleCount += pageSize(); renderResults(); }
      catch (error) { console.error('Could not show more token concepts', error); }
    });
    nodes.clear.addEventListener('click', resetFilters);
    byId('empty-reset').addEventListener('click', resetFilters);
    nodes.search.value = state.query;
    visibleCount=pageSize();
    updateFilters(); renderResults(); initializeCatalogMotion(); initializeBundles(catalog); initializeDemo();
  } catch (error) {
    console.error('Storefront failed to initialize', error);
    const summary = byId('result-summary');
    if (summary) summary.textContent = 'Catalog temporarily unavailable';
  }
}
initialize();
