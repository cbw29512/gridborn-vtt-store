import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog,monsterCatalogStats,challengeBand,monsterFamily} from '../src/catalog.js';
import {monsterSRD} from '../src/monster-srd.js';
import {HERO_VARIANTS,CLASS_ARCHETYPES,GENDERS} from '../src/hero-variants.js';
import {NPC_CONCEPTS} from '../src/npc-roster.js';
import {viewForMonster} from '../src/creature-view.js';
import {filterCatalog,validateCatalog,initialState} from '../src/filters.js';
import {variantToRecipe,hasVariantRecipe,normalizeRecipe} from '../src/builder-data.js';
import {renderRig} from '../src/builder-rig.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('330 unique SRD creature names have accurate source-index fields',()=>{
 assert.equal(monsterSRD.length,330);
 assert.equal(new Set(monsterSRD.map(x=>x.id)).size,330);
 assert.equal(new Set(monsterSRD.map(x=>x.name.toLowerCase())).size,330);
 assert.ok(monsterSRD.every(x=>x.cr&&x.name&&x.type&&x.size&&Number.isInteger(x.page)));
 assert.deepEqual(monsterCatalogStats,{srd:330,originalVariants:6,
  monsterCards:336,heroVariantConcepts:108,npcVariantConcepts:48,allCategories:518});
 assert.equal(catalog.length,518);
 assert.equal(validateCatalog(catalog),true);
 assert.equal(catalog.filter(x=>x.category==='Monsters').length,336);
 assert.equal(catalog.filter(x=>x.category==='Characters').length,116);
 assert.equal(catalog.filter(x=>x.category==='NPCs').length,56);
 assert.equal(catalog.filter(x=>x.category==='Animals').length,10);
 assert.ok(catalog.every(x=>x.purchasable===false));
 for(const record of monsterSRD){
   const index=catalog.find(x=>x.sourceRecordId===record.id);
   assert.ok(index,'Missing SRD monster: '+record.name);
   assert.equal(index.challengeRating,record.cr);
   assert.equal(index.creatureType,record.type);
   assert.equal(index.primary,monsterFamily(record.type));
   assert.equal(index.secondary,challengeBand(record.cr));
   assert.equal(index.source,'SRD 5.2.1');
   assert.equal(index.sourcePage,record.page);
 }
});
test('monster CR filters preserve source fractions, high CR and named search',()=>{
 assert.equal(challengeBand('0'),'CR 0–½');
 assert.equal(challengeBand('1/8'),'CR 0–½');
 assert.equal(challengeBand('1/2'),'CR 0–½');
 assert.equal(challengeBand('4'),'CR 1–4');
 assert.equal(challengeBand('10'),'CR 5–10');
 assert.equal(challengeBand('11'),'CR 11–16');
 assert.equal(challengeBand('24'),'CR 17+');
 assert.throws(()=>challengeBand('invalid'),/Invalid source CR/);
 const reds=filterCatalog(catalog,{...initialState,category:'Monsters',query:'Ancient Red Dragon',primary:'Dragon'});
 assert.equal(reds.length,1);
 assert.equal(reds[0].challengeRating,'24');
 const goblin=filterCatalog(catalog,{...initialState,category:'Monsters',query:'Goblin Warrior'});
 assert.equal(goblin.length,1);
 assert.equal(goblin[0].size,'Small');
});
test('all 12 classes have 3 male, 3 female, and 3 nonbinary original pregen concepts',()=>{
 assert.equal(CLASS_ARCHETYPES.length,12);
 assert.deepEqual(GENDERS.map(x=>x[0]),['male','female','nonbinary']);
 assert.equal(HERO_VARIANTS.length,108);
 assert.equal(new Set(HERO_VARIANTS.map(x=>x.id)).size,108);
 for(const cls of CLASS_ARCHETYPES){
  const options=HERO_VARIANTS.filter(x=>x.characterClass===cls.class);
  assert.equal(options.length,9,cls.class);
  for(const gender of ['male','female','nonbinary']){
   const identities=options.filter(x=>x.gender===gender);
   assert.equal(identities.length,3,cls.class+' '+gender);
   assert.equal(new Set(identities.map(x=>x.specialty)).size,3);
   for(const identity of identities){
    assert.equal(identity.artStatus,'not-produced');
    assert.equal(identity.commercialRelease,false);
    assert.equal(hasVariantRecipe(identity.id),true);
    const recipe=variantToRecipe(identity.id);
    assert.equal(normalizeRecipe(recipe).name,recipe.name);
    assert.match(renderRig(recipe),/rig-figure/);
   }
  }
 }
 assert.throws(()=>variantToRecipe('unknown'),/Unknown class concept/);
});
test('48 NPC occupation/ancestry concepts are explicitly unfinished',()=>{
 assert.equal(NPC_CONCEPTS.length,48);
 assert.equal(new Set(NPC_CONCEPTS.map(x=>x.id)).size,48);
 assert.equal(new Set(NPC_CONCEPTS.map(x=>x.occupation)).size,12);
 assert.equal(new Set(NPC_CONCEPTS.map(x=>x.ancestry)).size,4);
 assert.ok(NPC_CONCEPTS.every(x=>x.distinguishingGear&&
  x.artStatus==='not-produced'&&!x.commercialRelease));
 assert.ok(NPC_CONCEPTS.some(x=>x.gender==='nonbinary'));
});
test('nonhumanoids request side/profile camera, upright humanoids stay three-quarter front',()=>{
 for(const [type,name] of [
  ['Beast','Giant Shark'],['Dragon (Chromatic)','Adult Red Dragon'],
  ['Beast','Giant Spider'],['Ooze','Gelatinous Cube'],
  ['Monstrosity','Basilisk'],['Aberration','Aboleth']
 ]) assert.match(viewForMonster(type,name),/side\/profile/i,name);
 for(const [type,name] of [
  ['Humanoid (Orc)','Orc'],['Humanoid (Goblinoid)','Goblin Warrior'],
  ['Undead','Skeleton'],['Giant','Ogre'],['Construct','Animated Armor']
 ]) assert.match(viewForMonster(type,name),/front/i,name);
 for(const item of catalog.filter(x=>x.category==='Monsters'))
  assert.ok(/side\/profile|front/.test(item.artDirection),item.id);
});
test('great white artwork is unmistakable side-view anatomy, not overhead/front',()=>{
 const svg=read('assets/studies/great-white-shark.svg');
 assert.match(svg,/right-facing profile/i);
 for(const part of ['shark-tail','shark-dorsal-fin','shark-pectoral-fin',
  'shark-body','shark-head-features','shark-rear-fins'])
  assert.match(svg,new RegExp('class="'+part+'"'));
 for(const feature of ['five gill slits','crescent tail','pointed snout','contrasting white belly'])
  assert.match(svg,new RegExp(feature,'i'));
 const gills=svg.slice(svg.indexOf('<g fill="none" stroke="#263c49"'),
  svg.indexOf('</g>',svg.indexOf('<g fill="none" stroke="#263c49"')));
 assert.equal((gills.match(/<path d=/g)||[]).length,5);
 assert.doesNotMatch(svg,/stylized overhead silhouette/i);
 assert.match(svg,/viewBox="0 0 256 240"/);
 assert.doesNotMatch(svg,/<script\b|<foreignObject\b|(?:href|url)\s*=\s*["']https?:/i);
 const shark=catalog.find(x=>x.id==='ani-ocean-greatwhite');
 assert.equal(shark.previewArt,'./assets/studies/great-white-shark.svg');
 assert.equal(shark.purchasable,false);
});
test('attribution and release limits remain explicit for indexed concepts',()=>{
 const html=read('index.html');
 const credit=read('docs/SRD_5_2_1_ATTRIBUTION.md');
 assert.match(html,/creativecommons\.org\/licenses\/by\/4\.0\/legalcode/);
 assert.match(html,/330-creature SRD index/);
 assert.match(credit,/Wizards of the Coast LLC/);
 assert.match(html,/not 330 finished tokens/i);
 assert.ok(catalog.filter(x=>x.sourceRecordId).every(x=>x.purchasable===false));
 assert.equal(new Set(catalog.map(x=>x.id)).size,catalog.length);
});
