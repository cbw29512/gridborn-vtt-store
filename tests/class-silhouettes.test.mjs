import test from 'node:test';
import assert from 'node:assert/strict';
import {PARTS,PRESETS,presetToRecipe,variantToRecipe,normalizeRecipe} from '../src/builder-data.js';
import {CLASS_ARCHETYPES,HERO_VARIANTS} from '../src/hero-variants.js';
import {renderRig} from '../src/builder-rig.js';
import {rigProportions} from '../src/rig-proportions.js';

test('starter Gnome Rogue and Elven Ranger open valid distinctive builder rigs',()=>{
  assert.ok(Object.hasOwn(PRESETS,'chr-rge-gnome'));
  assert.ok(Object.hasOwn(PRESETS,'chr-rng-elf'));
  const rogue=presetToRecipe('chr-rge-gnome');
  const ranger=presetToRecipe('chr-rng-elf');
  assert.equal(rogue.ancestry,'Gnome');
  assert.equal(rogue.outfit,'Rogue leathers');
  assert.equal(rogue.weapon,'Twin daggers');
  assert.equal(ranger.outfit,'Ranger field gear');
  assert.equal(ranger.weapon,'Bow');
  assert.deepEqual(normalizeRecipe(rogue),rogue);
  assert.deepEqual(normalizeRecipe(ranger),ranger);
  const rogueArt=renderRig(rogue);
  const rangerArt=renderRig(ranger);
  assert.match(rogueArt,/class="rig-rogue-leathers"/);
  assert.match(rogueArt,/class="rig-weapon"/);
  assert.match(rogueArt,/class="rig-offhand"/);
  assert.match(rogueArt,/class="rig-proportions"/);
  assert.doesNotMatch(rogueArt,/rig-ranger-quiver/);
  assert.match(rangerArt,/class="rig-ranger-quiver"/);
  assert.match(rangerArt,/class="rig-ranger-field-gear"/);
  assert.doesNotMatch(rangerArt,/rig-rogue-leathers/);
  assert.notEqual(rogueArt,rangerArt);
  assert.ok(PARTS.outfit.includes('Rogue leathers')&&PARTS.outfit.includes('Ranger field gear'));
  assert.ok(PARTS.weapon.includes('Twin daggers'));
});

test('all 18 Rogue/Ranger gender-balanced prebuilts render four prototype states',()=>{
  const classes=CLASS_ARCHETYPES.filter(c=>['Rogue','Ranger'].includes(c.class));
  assert.equal(classes.length,2);
  for(const klass of classes){
    const variants=HERO_VARIANTS.filter(v=>v.characterClass===klass.class);
    assert.equal(variants.length,9);
    for(const gender of ['male','female','nonbinary'])
      assert.equal(variants.filter(v=>v.gender===gender).length,3);
    for(const variant of variants){
      const recipe=variantToRecipe(variant.id);
      const expected=klass.class==='Rogue'?'Rogue leathers':'Ranger field gear';
      const silhouette=klass.class==='Rogue'?'rig-rogue-leathers':'rig-ranger-quiver';
      assert.equal(recipe.outfit,expected);
      for(const mode of ['idle','move','attack','rest']){
        const svg=renderRig(recipe,{mode,animated:true});
        assert.match(svg,new RegExp('class="'+silhouette+'"'),variant.id);
        assert.match(svg,new RegExp('mode-'+mode),variant.id);
        assert.match(svg,/rig-proportions/);
      }
      assert.equal(variant.artStatus,'not-produced');
      assert.equal(variant.commercialRelease,false);
    }
  }
});

test('short ancestry prototypes preserve ground line by scaling complete rig',()=>{
  const gnome=rigProportions('Gnome'),halfling=rigProportions('Halfling');
  const dwarf=rigProportions('Dwarf'),human=rigProportions('Human');
  assert.match(gnome,/scale\(0\.8 0\.8\)/);
  assert.match(halfling,/scale\(0\.84 0\.84\)/);
  assert.match(dwarf,/scale\(1\.05 0\.88\)/);
  assert.match(human,/scale\(1 1\)/);
  const base=presetToRecipe('chr-rge-gnome');
  assert.match(renderRig(base),/class="rig-proportions" transform="translate\(/);
});
