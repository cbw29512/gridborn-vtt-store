import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {renderWaveThree,WAVE_THREE_STATES} from '../src/creature-rigs/wave-three.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
import {verifyMotionCatalog} from '../src/production-motion-gate.mjs';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const variants=[
 {id:'chr-clr-dwarf',kind:'dwarf',stem:'dwarven-cleric',className:'Cleric'},
 {id:'pregen-cleric-female-2',kind:'mercy',stem:'human-mercywarden-female',className:'Cleric'},
 {id:'pregen-rogue-nonbinary-1',kind:'shadow',stem:'human-shadowstep-nonbinary',className:'Rogue'},
 {id:'mon-cave-ogre',kind:'ogre',stem:'cave-ogre',className:'Monsters'}
];

test('Full-motion listing gate accepts 12 source-distinct catalog entries',()=>{
 assert.equal(verifyMotionCatalog(catalog),true);
 assert.equal(Object.keys(animatedPreviews).length,30);
 const originalHashes=new Set();
 for(const item of variants){
  const entry=catalog.find(x=>x.id===item.id);
  assert.ok(entry,item.id);
  assert.equal(entry.animationStatus,'art-study');
  assert.equal(entry.purchasable,false);
  const still=read('assets/studies/'+item.stem+'.svg');
  const hash=createHash('sha256').update(still).digest('hex');
  assert.ok(!originalHashes.has(hash),'Duplicate token artwork: '+item.id);
  originalHashes.add(hash);
  const preview=animatedPreviews[item.id];
  assert.equal(preview.still,artStudies[item.id]);
  assert.equal(preview.idleDurationMs,3200);
  assert.equal(preview.moveDurationMs,2400);
  assert.equal(preview.actionDurationMs,1400);
  assert.equal(preview.restDurationMs,4000);
  for(const state of WAVE_THREE_STATES){
   const path='assets/demos/'+item.stem+'-'+state+'.svg';
   assert.equal(preview[state==='attack'?'action':state],'./'+path);
   const output=renderWaveThree(item.kind,state,still);
   assert.equal(read(path),output,item.id+' '+state+' must remain source synchronized');
   assert.match(output,new RegExp('data-gridborn-mode="'+state+'"'));
   assert.match(output,/prefers-reduced-motion:reduce/);
  }
  const m=JSON.parse(read('assets/demos/'+item.stem+'-manifest.json'));
  assert.equal(m.id,item.id);
  assert.equal(m.purchasable,false);
  assert.equal(m.stateOnly,true);
  assert.deepEqual(Object.values(m.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
  assert.equal(m.restDurationSec,4);
 }
 const female=HERO_VARIANTS.find(x=>x.id==='pregen-cleric-female-2');
 const nonbinary=HERO_VARIANTS.find(x=>x.id==='pregen-rogue-nonbinary-1');
 assert.deepEqual([female.ancestry,female.gender,female.specialty],['Human','female','Mercywarden']);
 assert.deepEqual([nonbinary.ancestry,nonbinary.gender,nonbinary.specialty],['Human','nonbinary','Shadowstep']);
 assert.equal(female.artStatus,'not-produced','Artwork does not create a playable character sheet');
 assert.equal(nonbinary.artStatus,'not-produced');
});

test('Different roles retain distinct silhouette signatures, weapons and motions',()=>{
 const dwarf=read('assets/studies/dwarven-cleric.svg');
 const healer=read('assets/studies/human-mercywarden-female.svg');
 const rogue=read('assets/studies/human-shadowstep-nonbinary.svg');
 const ogre=read('assets/studies/cave-ogre.svg');
 assert.match(dwarf,/dwarf-holy-medallion/);
 assert.match(dwarf,/dwarf-shield/);
 assert.match(dwarf,/dwarf-mace/);
 assert.match(healer,/braided auburn hair/);
 assert.match(healer,/rig-effect/);
 assert.match(rogue,/two distinct copper-edged daggers/);
 assert.match(rogue,/rig-offhand/);
 assert.match(ogre,/massive forearms/);
 assert.match(ogre,/rig-weapon/);
 assert.match(read('assets/demos/human-mercywarden-female-attack.svg'),/mercy-heal-flash/);
 assert.match(read('assets/demos/human-shadowstep-nonbinary-attack.svg'),/shadow-second-knife/);
 assert.match(read('assets/demos/cave-ogre-attack.svg'),/ogre-club-slam/);
 assert.match(read('assets/demos/dwarven-cleric-attack.svg'),/dwarf-smite-mace/);
});

test('Cards use fixed visual stages, uniform rows, builder slots and anchored footers',()=>{
 const css=read('src/components.css');
 const html=read('src/product-card.js');
 assert.match(css,/grid-auto-rows:1fr/);
 assert.match(css,/display:flex;flex-direction:column;align-self:stretch;height:100%/);
 assert.match(css,/flex:0 0 180px;height:180px/);
 assert.match(css,/product-customize-slot/);
 assert.match(css,/margin-top:auto;min-height:44px/);
 assert.match(css,/grid-template-columns/);
 assert.match(html,/customizeSlot/);
 assert.match(html,/body\.append\(type, name, meta, customizeSlot, details, bundleAdd, foot\)/);
 assert.equal(catalog.length,518,'Animate existing IDs instead of adding lookalike duplicate cards');
});
