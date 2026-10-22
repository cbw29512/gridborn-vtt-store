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
  assert.deepEqual(results.map(item => item.name).sort(), ['Human Innkeeper · Male','Village Innkeeper'].sort());
});

test('Characters -> Elf -> Wizard returns elven wizard', () => {
  const results = filterCatalog(catalog, {category:'Characters',query:'',primary:'Elf',secondary:'Wizard'});
  assert.ok(results.some(item=>item.name==='Elven Wizard'));
  assert.ok(results.length>1,'Elf Wizard variants should be available');
});

test('Monsters -> family -> CR supports the 330-creature source index', () => {
  const options = availableOptions(catalog, 'Monsters', 'Dragon');
  assert.ok(options.second.includes('CR 17+'));
  const ancient = filterCatalog(catalog,{category:'Monsters',query:'Ancient Red Dragon',primary:'Dragon',secondary:''});
  assert.equal(ancient.length,1);
  assert.equal(ancient[0].challengeRating,'24');
});

test('search includes name, category, size and filters', () => {
  const results=filterCatalog(catalog,{...initialState,category:'Animals',query:'  shark '});
  assert.equal(results.length,2);
  assert.ok(results.every(item=>item.name.toLowerCase().includes('shark')));
});

test('catalog item footprints follow intended 1x1 / 2x2 demo scaling',()=>{
  assert.ok(catalog.every(item => Number.isInteger(item.squares) && item.squares>=1));
});

test('the draft visual has explicit preview-only status and no sale status', () => {
  const candidate = catalog.find(item => item.id === 'chr-ftr-human');
  assert.equal(candidate.previewArt, './assets/demos/human-fighter-still.svg');
  assert.equal(candidate.animationStatus, 'art-study');
  assert.equal(candidate.purchasable, false);
  assert.ok(catalog.filter(item => item.previewArt).every(item => item.purchasable === false));
});

test('illustrated concepts span every category without claiming completed animations', () => {
  const illustrated = catalog.filter(item => item.previewArt);
  assert.equal(illustrated.length, 22);
  for (const category of ['Characters','NPCs','Monsters','Animals'])
    assert.ok(illustrated.some(item => item.category === category), category);
  assert.equal(illustrated.filter(item => item.animationStatus === 'art-study').length, 20);
  assert.ok(illustrated.filter(item => !['pregen-monk-male-1','pregen-druid-female-1','chr-brd-halfling','chr-rng-elf','chr-ftr-human','chr-clr-dwarf','chr-wiz-elf','pregen-barbarian-male-3','pregen-cleric-female-2','pregen-rogue-nonbinary-1','mon-dng-armor','mon-cave-ogre','mon-cave-goblin','ani-forest-wolf','mon-cave-spider','mon-dng-skeleton','chr-pal-human','chr-rge-gnome','mon-swamp-lizard','ani-ocean-greatwhite'].includes(item.id))
    .every(item => item.animationStatus === 'static-art-study'));
  assert.ok(illustrated.every(item => item.purchasable === false));
});

test('a shopper can search all collections without selecting a category', () => {
  assert.equal(filterCatalog(catalog, initialState).length, 518);
  const sharks = filterCatalog(catalog, { ...initialState, query: 'shark' });
  assert.deepEqual(sharks.map(item=>item.name).sort(),
    ['Great White Shark','Reef Shark','Giant Shark','Hunter Shark','Reef Shark'].sort());
  const inn = filterCatalog(catalog, { ...initialState, query: 'innkeeper' });
  assert.equal(inn.length,6);
  assert.ok(inn.some(item=>item.name==='Village Innkeeper'));
  assert.deepEqual(availableOptions(catalog, 'All'), { first:[], second:[] });
});
test('dependent filter choices only appear after the first selection', () => {
  assert.deepEqual(availableOptions(catalog,'Animals').second, []);
  assert.ok(availableOptions(catalog,'Animals','Ocean').second.includes('Sharks'));
});

test('Cave Goblin is a second opt-in action/rest animation study', () => {
  const goblin = catalog.find(item => item.id === 'mon-cave-goblin');
  assert.equal(goblin?.animationStatus, 'art-study');
  assert.equal(goblin?.purchasable, false);
  assert.equal(goblin?.previewArt, './assets/studies/cave-goblin.svg');
});
