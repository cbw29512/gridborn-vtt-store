import test from 'node:test';
import assert from 'node:assert/strict';
import {PARTS,PRESETS,variantToRecipe,presetToRecipe,normalizeRecipe} from '../src/builder-data.js';
import {CLASS_ARCHETYPES,HERO_VARIANTS} from '../src/hero-variants.js';
import {renderRig} from '../src/builder-rig.js';

const STUDIES=Object.freeze([
  {class:'Bard',key:'chr-brd-halfling',outfit:'Bard performance coat',
    gear:'Lute',visuals:['rig-bard-performance-coat','rig-bard-lute','rig-bard-coat-tails']},
  {class:'Monk',key:'studio-monk-human',outfit:'Monk wraps',
    gear:'None',visuals:['rig-monk-wraps']},
  {class:'Druid',key:'studio-druid-elf',outfit:'Druid leaf mantle',
    gear:'None',visuals:['rig-druid-leaf-mantle','rig-druid-leaf-back','rig-druid-living-staff']},
  {class:'Sorcerer',key:'studio-sorcerer-human',outfit:'Sorcerer regalia',
    gear:'None',visuals:['rig-sorcerer-regalia','rig-sorcerer-mantle-back']},
  {class:'Warlock',key:'studio-warlock-orc',outfit:'Warlock pact coat',
    gear:'Spellbook',visuals:['rig-warlock-pact-coat','rig-warlock-pact-back']}
]);

test('five featured class prebuilts retain validated editable schema',()=>{
  assert.equal(STUDIES.length,5);
  assert.equal(Object.keys(PRESETS).length,15);
  for(const entry of STUDIES){
    assert.ok(Object.hasOwn(PRESETS,entry.key));
    const recipe=presetToRecipe(entry.key);
    assert.equal(recipe.outfit,entry.outfit);
    assert.equal(recipe.offhand,entry.gear);
    assert.deepEqual(normalizeRecipe(recipe),recipe);
    for(const part of entry.visuals)
      assert.match(renderRig(recipe),new RegExp('class="'+part+'"'),part);
    assert.match(renderRig(recipe),/class="rig-proportions"/);
  }
  assert.ok(PARTS.offhand.includes('Lute'));
});

test('all 45 new class hero concepts receive their own recognizable outfit study',()=>{
  for(const entry of STUDIES){
    assert.ok(CLASS_ARCHETYPES.some(c=>c.class===entry.class));
    const variants=HERO_VARIANTS.filter(v=>v.characterClass===entry.class);
    assert.equal(variants.length,9);
    for(const gender of ['male','female','nonbinary'])
      assert.equal(variants.filter(v=>v.gender===gender).length,3);
    for(const v of variants){
      const recipe=variantToRecipe(v.id);
      assert.equal(recipe.outfit,entry.outfit,v.id);
      assert.equal(recipe.offhand,entry.gear,v.id);
      for(const mode of ['idle','move','attack','rest']){
        const image=renderRig(recipe,{mode,animated:true});
        for(const part of entry.visuals)
          assert.match(image,new RegExp('class="'+part+'"'),v.id+' '+mode);
        assert.match(image,new RegExp('mode-'+mode));
      }
      assert.equal(v.artStatus,'not-produced');
      assert.equal(v.commercialRelease,false);
    }
  }
});

test('class visuals are not accidental recolors of the original Wizard',()=>{
  const wizard=renderRig(presetToRecipe('chr-wiz-elf'));
  for(const entry of STUDIES){
    const classArt=renderRig(presetToRecipe(entry.key));
    assert.notEqual(classArt,wizard);
    for(const part of entry.visuals)
      assert.doesNotMatch(wizard,new RegExp(part));
  }
});
