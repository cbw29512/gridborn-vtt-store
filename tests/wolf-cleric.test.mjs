import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {WOLF_MODES,renderWolf} from '../src/creature-rigs/wolf.mjs';
import {catalog} from '../src/catalog.js';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {PRESETS,presetToRecipe} from '../src/builder-data.js';
import {renderRig} from '../src/builder-rig.js';
const read=(name)=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const files={
 still:'assets/studies/gray-wolf.svg',
 idle:'assets/demos/gray-wolf-idle.svg',
 move:'assets/demos/gray-wolf-move.svg',
 attack:'assets/demos/gray-wolf-attack.svg',
 rest:'assets/demos/gray-wolf-rest.svg'
};
test('wolf studies regenerate deterministically from one anatomy-first rig',()=>{
 assert.deepEqual(WOLF_MODES,['still','idle','move','attack','rest']);
 for(const [mode,file] of Object.entries(files)){
  const generated=renderWolf(mode);
  assert.equal(read(file),generated,file+' is outdated');
  assert.match(generated,/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  assert.match(generated,/four individually drawn paws/);
  for(const limb of ['hind-far','hind-near','front-far','front-near'])
    assert.match(generated,new RegExp('class="wolf-leg wolf-leg-'+limb+'"'));
  assert.match(generated,/wolf-tail/);
  assert.match(generated,/wolf-head/);
  assert.match(generated,/muzzle|long muzzle/i);
  assert.doesNotMatch(generated,/<script\b|<foreignObject\b|(?:href|url)\s*=\s*["']https?:/i);
  assert.match(generated,/Preview only; not a certified VTT animation/);
 }
 assert.throws(()=>renderWolf('invalid'),/Unknown wolf animation/);
});
test('four wolf animation states are anatomically appropriate and distinct',()=>{
 const idle=read(files.idle),move=read(files.move),
 attack=read(files.attack),rest=read(files.rest);
 assert.match(idle,/wolf-idle-breath/);
 assert.match(idle,/wolf-ear-twitch/);
 assert.match(move,/wolf-leg-hind-far,.wolf-leg-front-near/);
 assert.match(move,/wolf-leg-front-far,.wolf-leg-hind-near/);
 assert.match(move,/wolf-leg-a 1s ease-in-out infinite/);
 assert.match(move,/wolf-leg-b 1s ease-in-out infinite/);
 assert.match(attack,/wolf-lunge 1.3s cubic-bezier\([^)]*\) 1 both/);
 assert.match(attack,/wolf-bite 1.3s ease-in-out 1 both/);
 assert.match(rest,/wolf-sleep-breath 4.8s ease-in-out infinite/);
 assert.match(rest,/Curled resting pose/);
 assert.doesNotMatch(rest,/wolf-leg-a 1s/);
 assert.match(rest,/prefers-reduced-motion:reduce/);
 assert.ok(idle!==move&&move!==attack&&attack!==rest);
});
test('wolf prototype appears only for the Gray Wolf, not the distinct Dire Wolf',()=>{
 const gray=catalog.find(x=>x.id==='ani-forest-wolf');
 const dire=catalog.find(x=>x.id==='mon-forest-wolf');
 assert.equal(gray.animationStatus,'art-study');
 assert.equal(gray.purchasable,false);
 assert.equal(gray.previewArt,'./assets/studies/gray-wolf.svg');
 assert.equal(dire.animationStatus,'not-produced');
 assert.equal(animatedPreviews[dire.id],undefined);
 assert.equal(animatedPreviews[gray.id].actionDurationMs,1300);
 for(const state of ['still','idle','move','action','rest'])
  assert.equal(typeof animatedPreviews[gray.id][state],'string',state);
});
test('Dwarf Cleric has original mace-and-shield source plus builder recipe',()=>{
 const art=read('assets/studies/dwarven-cleric.svg');
 for(const label of ['dwarf-legs','dwarf-head','dwarf-mace','dwarf-shield',
   'dwarf-holy-medallion','dwarf-armor'])
  assert.match(art,new RegExp('class="'+label+'"'));
 assert.match(art,/Static concept only/);
 assert.match(art,/original radial sun motif|Original radial sun motif/);
 assert.equal(artStudies['chr-clr-dwarf'],'./assets/studies/dwarven-cleric.svg');
 assert.ok(PRESETS['chr-clr-dwarf']);
 const dwarf=presetToRecipe('chr-clr-dwarf');
 assert.equal(dwarf.ancestry,'Dwarf');
 assert.equal(dwarf.weapon,'Mace');
 assert.equal(dwarf.offhand,'Shield');
 assert.match(renderRig(dwarf),/rig-weapon/);
 assert.equal(catalog.find(x=>x.id==='chr-clr-dwarf').animationStatus,'art-study');
 assert.equal(catalog.find(x=>x.id==='chr-clr-dwarf').purchasable,false);
});
