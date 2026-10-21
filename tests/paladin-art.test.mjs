import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {PARTS,PALETTES,PRESETS,presetToRecipe,normalizeRecipe} from '../src/builder-data.js';
import {renderRig} from '../src/builder-rig.js';
import {catalog} from '../src/catalog.js';
import {artStudies} from '../src/art-studies.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Paladin original illustration has distinctive class gear and original emblem',()=>{
 const source=read('assets/studies/human-paladin.svg');
 for(const layer of ['paladin-mantle','paladin-tabard','paladin-emblem',
  'paladin-helmet','paladin-shield','paladin-sword','paladin-breastplate','paladin-legs'])
  assert.match(source,new RegExp('class="'+layer+'"'));
 assert.match(source,/Ceremonial tabard/);
 assert.match(source,/Original static concept only|Original static concept|static concept only/i);
 assert.doesNotMatch(source,/<script\b|<foreignObject\b|(?:href|url)\s*=\s*["']https?:/i);
 assert.match(source,/viewBox="0 0 256 240"/);
});
test('Paladin is a full editable class starting model with distinct tabard silhouette',()=>{
 assert.ok(PARTS.outfit.includes('Paladin tabard'));
 assert.ok(PALETTES.radiant);
 assert.ok(PRESETS['chr-pal-human']);
 const recipe=presetToRecipe('chr-pal-human');
 assert.equal(recipe.ancestry,'Human');
 assert.equal(recipe.outfit,'Paladin tabard');
 assert.equal(recipe.weapon,'Sword');
 assert.equal(recipe.offhand,'Shield');
 const paladin=renderRig(recipe);
 const fighter=renderRig(presetToRecipe('chr-ftr-human'));
 assert.notEqual(paladin,fighter);
 assert.match(paladin,/class="rig-paladin-tabard"/);
 assert.match(paladin,/class="rig-oath-symbol"/);
 assert.doesNotMatch(fighter,/class="rig-paladin-tabard"/);
 assert.deepEqual(normalizeRecipe(recipe),recipe);
 for(const state of ['idle','move','attack','rest']){
  const rig=renderRig(recipe,{mode:state,animated:true});
  assert.match(rig,new RegExp('mode-'+state));
  assert.match(rig,/class="rig-paladin-tabard"/);
  assert.match(rig,/class="rig-weapon"/);
 }
});
test('Paladin catalog and production tracker do not claim completion',()=>{
 const paladin=catalog.find(x=>x.id==='chr-pal-human');
 assert.equal(paladin.previewArt,artStudies[paladin.id]);
 assert.equal(paladin.previewArt,'./assets/studies/human-paladin.svg');
 assert.equal(paladin.animationStatus,'static-art-study');
 assert.equal(paladin.purchasable,false);
 const heroes=JSON.parse(read('docs/production/hero-roster.json')).assets;
 const record=heroes.find(x=>x.id==='chr-pal-human');
 assert.equal(record.artStatus,'static-study');
 assert.equal(record.animationStatus,'not-produced');
 assert.equal(record.commercialRelease,false);
 assert.ok(Object.values(record.review).every(v=>v===false));
});
