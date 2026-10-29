import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog } from '../src/catalog.js';
import { readCatalogRoute, serializeCatalogRoute, writeCatalogRoute } from '../src/routing.js';

test('blank routes use the default category and empty filters', () => {
  assert.deepEqual(readCatalogRoute('', catalog), {category:'All',query:'',primary:'',secondary:''});
});
test('valid NPC deep links hydrate both dependent dropdowns', () => {
  assert.deepEqual(readCatalogRoute('?category=NPCs&primary=Human&secondary=Innkeeper', catalog),
    {category:'NPCs',query:'',primary:'Human',secondary:'Innkeeper'});
});
test('invalid categories fall back safely', () => {
  const state = readCatalogRoute('?category=Unknown&primary=Human', catalog);
  assert.equal(state.category,'All');
  assert.equal(state.primary,'');
});
test('unknown primary filters cannot create broken catalog state', () => {
  const state=readCatalogRoute('?category=Animals&primary=Space&secondary=Sharks', catalog);
  assert.equal(state.primary,'');
  assert.equal(state.secondary,'');
});
test('secondary options are validated against the selected primary filter', () => {
  const state=readCatalogRoute('?category=Animals&primary=Forest&secondary=Sharks', catalog);
  assert.equal(state.secondary,'');
});
test('search text is normalized and length-limited', () => {
  const state=readCatalogRoute('?q=%20%20shark%20%20', catalog);
  assert.equal(state.query,'shark');
  assert.equal(readCatalogRoute('?q='+'z'.repeat(200),catalog).query.length,120);
});
test('routing round-trip preserves meaningful categories and Unicode search', () => {
  const input={category:'Monsters',query:'drágon',primary:'Dragon',secondary:'CR 17+'};
  assert.deepEqual(readCatalogRoute('?'+serializeCatalogRoute(input),catalog),input);
});
test('default route omits redundant query parameters', () => {
  assert.equal(serializeCatalogRoute({category:'All',query:'',primary:'',secondary:''}),'');
});

test('global searches have shareable URLs without a forced category', () => {
  const state = readCatalogRoute('?q=shark', catalog);
  assert.equal(state.category, 'All');
  assert.equal(state.query, 'shark');
  assert.equal(serializeCatalogRoute(state), 'q=shark');
});
test('second-level filters require a valid first-level selection', () => {
  const state = readCatalogRoute('?category=Animals&secondary=Sharks', catalog);
  assert.equal(state.primary, '');
  assert.equal(state.secondary, '');
});


test('filter choices push browser history, search replaces, and unchanged routes do nothing', () => {
  const originalWindow = globalThis.window;
  let current = new URL('https://example.test/');
  const actions = [];
  globalThis.window = {
    get location() { return current; },
    history: {
      state: null,
      pushState(_state, _title, next) { actions.push('push'); current = new URL(next, current); },
      replaceState(_state, _title, next) { actions.push('replace'); current = new URL(next, current); },
    },
  };
  try {
    const state = {category:'Animals',query:'',primary:'',secondary:''};
    writeCatalogRoute(state, 'push', 'catalog');
    assert.equal(current.search, '?category=Animals');
    assert.equal(current.hash, '#catalog');
    state.primary = 'Ocean';
    writeCatalogRoute(state, 'push');
    assert.deepEqual(actions, ['push', 'push']);
    writeCatalogRoute(state, 'push');
    assert.equal(actions.length, 2, 'Same route must not add history');
    state.query = 'shark';
    writeCatalogRoute(state);
    assert.deepEqual(actions, ['push', 'push', 'replace']);
    assert.deepEqual(readCatalogRoute(current.search, catalog), state);
  } finally {
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
