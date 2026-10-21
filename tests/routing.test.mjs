import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog } from '../src/catalog.js';
import { readCatalogRoute, serializeCatalogRoute } from '../src/routing.js';

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
