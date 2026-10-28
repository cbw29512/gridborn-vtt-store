import { categoryConfig } from './catalog.js';
import { initialState, availableOptions } from './filters.js';

/** Stable, allowlisted filter parameters; untrusted URLs never modify the catalog schema. */
export function readCatalogRoute(search, items) {
  try {
    const params = new URLSearchParams(search);
    const requestedCategory = params.get('category');
    const category = requestedCategory === 'All' ||
      Object.prototype.hasOwnProperty.call(categoryConfig, requestedCategory)
      ? requestedCategory : initialState.category;
    const options = availableOptions(items, category);
    const requestedPrimary = params.get('primary');
    const primary = options.first.includes(requestedPrimary) ? requestedPrimary : '';
    const secondaryValues = availableOptions(items, category, primary).second;
    const requestedSecondary = params.get('secondary');
    const secondary = primary && secondaryValues.includes(requestedSecondary) ? requestedSecondary : '';
    const query = String(params.get('q') || '').trim().slice(0, 120);
    return { category, query, primary, secondary };
  } catch (error) {
    console.error('Unable to parse catalog route', error);
    return { ...initialState };
  }
}

export function serializeCatalogRoute(state) {
  try {
    const params = new URLSearchParams();
    if (state.category !== initialState.category) params.set('category', state.category);
    if (state.query.trim()) params.set('q', state.query.trim().slice(0, 120));
    if (state.primary) params.set('primary', state.primary);
    if (state.secondary) params.set('secondary', state.secondary);
    return params.toString();
  } catch (error) {
    console.error('Unable to serialize catalog route', error);
    return '';
  }
}

export function writeCatalogRoute(state, mode = 'replace', hash = null) {
  try {
    const url = new URL(window.location.href);
    for (const key of ['category', 'q', 'primary', 'secondary']) url.searchParams.delete(key);
    const selected = new URLSearchParams(serializeCatalogRoute(state));
    selected.forEach((value, key) => url.searchParams.set(key, value));
    if (hash !== null) url.hash = hash;
    const next = url.pathname + url.search + url.hash;
    const current = window.location.pathname + window.location.search + window.location.hash;
    if (next !== current) {
      const action = mode === 'push' ? 'pushState' : 'replaceState';
      window.history[action](window.history.state, '', next);
    }
  } catch (error) { console.error('Unable to save catalog URL', error); }
}

export function markActiveCollection(category) {
  try {
    for (const link of document.querySelectorAll('[data-category-link]')) {
      if (link.dataset.categoryLink === category) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  } catch (error) { console.error('Unable to highlight current collection', error); }
}

/** Native category anchors remain real links for copy/open-in-new-tab behavior. */
export function connectCatalogNavigation(state, items, onChange) {
  try {
    for (const link of document.querySelectorAll('[data-category-link]')) {
      link.addEventListener('click', event => {
        try {
          if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const category = link.dataset.categoryLink;
          if (!Object.prototype.hasOwnProperty.call(categoryConfig, category)) return;
          event.preventDefault();
          Object.assign(state, { category, query: '', primary: '', secondary: '' });
          onChange();
          writeCatalogRoute(state, 'push', 'catalog');
          document.getElementById('catalog')?.scrollIntoView({ block: 'start' });
        } catch (error) { console.error('Collection shortcut failed', error); }
      });
    }
    window.addEventListener('popstate', () => {
      try {
        Object.assign(state, readCatalogRoute(window.location.search, items));
        onChange();
      } catch (error) { console.error('Unable to restore browser catalog state', error); }
    });
  } catch (error) { console.error('Unable to bind collection navigation', error); }
}
