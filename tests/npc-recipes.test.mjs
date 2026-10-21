import test from 'node:test';
import assert from 'node:assert/strict';
import {NPC_CONCEPTS} from '../src/npc-roster.js';
import {npcToRecipe,hasNPCRecipe} from '../src/npc-recipes.js';
import {normalizeRecipe} from '../src/builder-data.js';
import {renderRig} from '../src/builder-rig.js';

test('all 48 NPC prebuilts have deterministic valid builder appearances',()=>{
  assert.equal(NPC_CONCEPTS.length,48);
  for(const npc of NPC_CONCEPTS){
    const recipe=npcToRecipe(npc.id);
    assert.equal(hasNPCRecipe(npc.id),true);
    assert.equal(recipe.name,npc.name);
    assert.equal(recipe.ancestry,npc.ancestry);
    assert.deepEqual(normalizeRecipe(recipe),recipe);
    assert.deepEqual(npcToRecipe(npc.id),recipe);
    assert.match(renderRig(recipe),/rig-figure/);
    assert.equal(npc.artStatus,'not-produced');
    assert.equal(npc.animationStatus,'not-produced');
    assert.equal(npc.commercialRelease,false);
  }
});

test('occupation recipes use appropriate supported builder props',()=>{
  const find=(job)=>NPC_CONCEPTS.find(x=>x.occupation===job).id;
  assert.equal(npcToRecipe(find('Guard')).offhand,'Shield');
  assert.equal(npcToRecipe(find('Innkeeper')).offhand,'Lantern');
  assert.equal(npcToRecipe(find('Miner')).offhand,'Lantern');
  assert.equal(npcToRecipe(find('Sage')).offhand,'Spellbook');
  assert.equal(npcToRecipe(find('Blacksmith')).weapon,'Mace');
  assert.equal(npcToRecipe(find('Farmer')).weapon,'None');
  assert.equal(hasNPCRecipe('missing-npc'),false);
  assert.throws(()=>npcToRecipe('missing-npc'),/Unknown NPC prebuilt/);
});
