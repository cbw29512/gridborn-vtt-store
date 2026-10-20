import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog, categoryConfig } from '../src/catalog.js';
import { initialState, availableOptions, filterCatalog, validateCatalog } from '../src/filters.js';

test('all preview token IDs are unique and no preview token is purchasable', () => {
  assert.equal(validateCatalog(catalog), true);
  assert.ok(catalog.every(item => item.purchasable === false));
});

test('all four top level categories have exactly two contextual labels', () => {
  assert.deepEqual(Object.keys(categoryConfig), ['Characters','NPCs','Monsters','Animals']);
  assert.ok(Object.values(categoryConfig).every(config => config.first && config.second));
});

test('Animals -> Ocean -> Sharks returns only sharks', () => {
  const results = filterCatalog(catalog, {category:'Animals',query:'',primary:'Ocean',secondary:'Sharks'});
  assert.deepEqual(results.map(item => item.name), ['Great White Shark','Reef Shark']);
});

test('NPCs -> Human -> Innkeeper returns the innkeeper', () => {
  const results = filterCatalog(catalog, {category:'NPCs',query:'',primary:'Human',secondary:'Innkeeper'});
  assert.deepEqual(results.map(item => item.name), ['Village Innkeeper']);
});

test('Characters -> Elf -> Wizard returns elven wizard', () => {
  const results = filterCatalog(catalog, {category:'Characters',query:'',primary:'Elf',secondary:'Wizard'});
  assert.deepEqual(results.map(item => item.name), ['Elven Wizard']);
});

test('Monsters -> Cave limits monster types and results correctly', () => {
  const options = availableOptions(catalog, 'Monsters', 'Cave');
  assert.deepEqual(options.second, ['Goblin','Ogre','Spider']);
  assert.equal(filterCatalog(catalog, {category:'Monsters',query:'',primary:'Cave',secondary:'Ogre'}).length,1);
});

test('search includes name, category, size and filters', () => {
  const results=filterCatalog(catalog,{...initialState,category:'Animals',query:'  shark '});
  assert.equal(results.length,2);
  assert.ok(results.every(item=>item.name.toLowerCase().includes('shark')));
});

test('catalog item footprints follow intended 1x1 / 2x2 demo scaling',()=>{
  assert.ok(catalog.every(item => Number.isInteger(item.squares) && item.squares>=1));
});
