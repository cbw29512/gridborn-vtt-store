import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderDruid,DRUID_STATES} from '../src/creature-rigs/druid.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Human female Wildspeaker has original live staff and independent thorn-whip Attack',()=>{
 const id='pregen-druid-female-1',src=read('assets/studies/human-wildspeaker-druid.svg');
 const variant=HERO_VARIANTS.find(x=>x.id===id),card=catalog.find(x=>x.id===id);
 const p=animatedPreviews[id];
 assert.deepEqual([variant.ancestry,variant.gender,variant.specialty],['Human','female','Wildspeaker']);
 assert.equal(variant.artStatus,'not-produced');
 assert.equal(card.animationStatus,'art-study');
 assert.equal(card.purchasable,false);
 assert.equal(p.still,artStudies[id]);
 assert.deepEqual(DRUID_STATES,['idle','move','attack','rest']);
 assert.match(src,/data-weapon="living-quarterstaff"/);
 assert.match(src,/data-spell-effect="thorn-whip"/);
 assert.match(src,/class="druid-braid"/);
 assert.match(src,/class="druid-mantle"/);
 assert.match(src,/class="druid-casting-arm"/);
 for(const mode of DRUID_STATES){
  const result=read('assets/demos/human-wildspeaker-druid-'+mode+'.svg');
  assert.equal(result,renderDruid(mode,src),'State/source mismatch '+mode);
  assert.match(result,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(result,/prefers-reduced-motion:reduce/);
  assert.equal(p[mode==='attack'?'action':mode],'./assets/demos/human-wildspeaker-druid-'+mode+'.svg');
 }
 const attack=read('assets/demos/human-wildspeaker-druid-attack.svg');
 assert.match(attack,/druid-vine-hand 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/druid-thorn-whip 1\.4s linear 1 both/);
 assert.match(attack,/59%\{opacity:1;transform:translate\(9px,-3px\)\}/);
 assert.doesNotMatch(attack,/druid-thorn-whip[^\n]*infinite/);
 for(const mode of ['idle','move','rest']){
  const output=read('assets/demos/human-wildspeaker-druid-'+mode+'.svg');
  assert.doesNotMatch(output,/druid-thorn-whip/);
  assert.match(output,mode==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const m=JSON.parse(read('assets/demos/human-wildspeaker-druid-manifest.json'));
 assert.equal(m.id,id);assert.equal(m.stateOnly,true);
 assert.equal(m.purchasable,false);assert.equal(m.vttCompatibility,'untested');
 assert.deepEqual(Object.values(m.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderDruid('fly',src),/Unsupported Wildspeaker mode/);
 assert.throws(()=>renderDruid('idle','invalid'),/Wildspeaker source rig\/art anchors changed/);
});
