import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog} from '../src/catalog.js';
const path=n=>new URL('../docs/production/'+n,import.meta.url);
const heroes=JSON.parse(readFileSync(path('hero-roster.json'),'utf8'));
const monsters=JSON.parse(readFileSync(path('monster-roster.json'),'utf8'));
const all=[...heroes.assets,...monsters.assets];
const expectedClasses=['Fighter','Wizard','Cleric','Rogue','Barbarian','Paladin',
 'Ranger','Bard','Warlock','Sorcerer','Monk','Druid'];
test('first production batch has exactly 12 hero classes and 12 distinct monsters',()=>{
 assert.equal(heroes.schemaVersion,1);
 assert.equal(monsters.schemaVersion,1);
 assert.equal(heroes.total,12);assert.equal(monsters.total,12);
 assert.equal(heroes.assets.length,12);assert.equal(monsters.assets.length,12);
 assert.deepEqual(heroes.assets.map(x=>x.class),expectedClasses);
 assert.equal(new Set(all.map(x=>x.id)).size,24);
});
test('all twenty-four have independent animation and visual accuracy specifications',()=>{
 for(const item of all) {
  for(const key of ['id','displayName','size','rigFamily','colors','silhouette','equipment','acceptance','artStatus'])
   assert.equal(typeof item[key],'string',item.id+'/'+key);
  for(const mode of ['idle','move','attack','rest']) {
   assert.equal(typeof item.animation[mode],'string',item.id+'/'+mode);
   assert.ok(item.animation[mode].length>15,item.id+'/'+mode);
  }
  assert.ok(item.silhouette.length>40,item.id);
  assert.ok(item.equipment.length>20,item.id);
  assert.ok(item.acceptance.length>35,item.id);
  assert.equal(item.commercialRelease,false,item.id);
  assert.deepEqual(Object.keys(item.review),[
   'silhouette','anatomy','equipment','motion','loop','atTokenSize','vttImport','rights']);
  assert.ok(Object.values(item.review).every(value=>value===false));
 }
});
test('referenced catalog concepts exist and moving studies are not sale-ready',()=>{
 const byId=new Set(catalog.map(x=>x.id));
 for(const item of all)if(item.catalogId)assert.ok(byId.has(item.catalogId),item.catalogId);
 const moving=all.filter(x=>x.artStatus==='animated-study');
 assert.deepEqual(moving.map(x=>x.id),['chr-ftr-human','mon-cave-goblin','mon-cave-spider','mon-forest-wolf-common']);
 assert.ok(moving.every(x=>x.animationStatus==='prototype'&&!x.commercialRelease));
 assert.ok(all.filter(x=>x.rigFamily.includes('quadruped')||x.rigFamily.includes('arachnid')||
  x.rigFamily.includes('ooze')).every(x=>x.family));
});
test('production board is read-only preview and never a checkout',()=>{
 const html=readFileSync(new URL('../production.html',import.meta.url),'utf8');
 const js=readFileSync(new URL('../src/production.js',import.meta.url),'utf8');
 assert.match(html,/noindex,nofollow/);
 assert.match(html,/id="production-grid"/);
 assert.match(html,/id="production-search"/);
 assert.match(js,/hero-roster\.json/);
 assert.match(js,/monster-roster\.json/);
 assert.match(js,/textContent/);
 assert.match(js,/Not for sale/);
 assert.doesNotMatch(html+js,/stripe|checkout|buy now/i);
});
