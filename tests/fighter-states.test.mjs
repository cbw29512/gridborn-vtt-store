import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {FIGHTER_GENERATED_STATES,renderFighterState} from '../src/creature-rigs/fighter-states.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {catalog} from '../src/catalog.js';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('Fighter move and strike deterministically reuse existing character artwork',()=>{
 const idle=read('assets/demos/human-fighter-idle.svg');
 assert.deepEqual(FIGHTER_GENERATED_STATES,['move','attack']);
 for(const mode of FIGHTER_GENERATED_STATES){
  const source=renderFighterState(idle,mode);
  assert.equal(source,read('assets/demos/human-fighter-'+mode+'.svg'));
  assert.match(source,new RegExp('data-gridborn-mode="'+mode+'"'));
  for(const part of ['fighter-boot-left','fighter-boot-right','shield','sword'])
   assert.match(source,new RegExp('class="'+part+'"'));
  assert.match(source,/prefers-reduced-motion:reduce/);
  assert.doesNotMatch(source,/body-cycle 45s|blade-cycle 45s/);
 }
 assert.throws(()=>renderFighterState(idle,'idle'),/Unsupported/);
 assert.throws(()=>renderFighterState('bad','attack'),/canonical Fighter Idle art changed/i);
});

test('Fighter walks with alternating articulated legs and attached arms',()=>{
 const svg=read('assets/demos/human-fighter-move.svg');
 for(const animation of ['fighter-move-bob','fighter-move-left','fighter-move-right',
 'fighter-move-shield','fighter-move-sword'])
  assert.match(svg,new RegExp(animation));
 assert.match(svg,/rotate\(-14deg\)/);
 assert.match(svg,/rotate\(14deg\)/);
 assert.match(svg,/\.8s ease-in-out infinite/);
});

test('Fighter sword attacks only once, returns to idle in existing modal controller',()=>{
 const svg=read('assets/demos/human-fighter-attack.svg');
 assert.match(svg,/fighter-attack-swing 1\.4s/);
 assert.match(svg,/fighter-attack-guard 1\.4s/);
 assert.match(svg,/1 both/);
 assert.doesNotMatch(svg,/infinite/);
 const preview=animatedPreviews['chr-ftr-human'];
 assert.equal(preview.actionDurationMs,1400);
 assert.equal(preview.action,'./assets/demos/human-fighter-attack.svg');
 assert.equal(preview.idle,'./assets/demos/human-fighter-idle.svg');
 assert.equal(preview.move,'./assets/demos/human-fighter-move.svg');
 assert.equal(preview.rest,'./assets/demos/human-fighter-rest.svg');
 assert.match(read('src/concept-preview.js'),/updatePreview\('idle'\)/);
});

test('Fighter has four public prototype modes, but still no commercial license or checkout',()=>{
 const fighter=catalog.find(item=>item.id==='chr-ftr-human');
 assert.ok(fighter);
 assert.equal(fighter.purchasable,false);
 for(const mode of ['idle','move','action','rest']){
  const name=animatedPreviews[fighter.id][mode].replace('./','');
  assert.ok(existsSync(new URL('../'+name,import.meta.url)),name);
 }
 const manifest=JSON.parse(read('assets/demos/manifest.json'));
 assert.equal(manifest.purchasable,false);
 assert.equal(manifest.vttCompatibility,'untested');
 assert.equal(manifest.stateClips.idle.durationSec,3.2);
 assert.equal(manifest.stateClips.move.durationSec,3.2);
 assert.equal(manifest.stateClips.attack.durationSec,1.4);
});

// The visible hand must overlap the hilt (x=171..182, y=100..143).
test('Fighter sword grip overlaps the hilt in all source and preview states',()=>{
 for(const mode of ['still','idle','move','attack','rest','loop','sleep']){
  const svg=read('assets/demos/human-fighter-'+mode+'.svg');
  assert.match(svg,/<rect x="162" y="140" width="11" height="12" fill="#f0be8c"\/>/);
  assert.match(svg,/<path d="M171 100h11v43h-11z"/);
 }
});

test('Fighter one-shot slash keeps sword tip off helmet and inside canvas',()=>{
 const svg=read('assets/demos/human-fighter-attack.svg');
 for(const [percent,angle] of [[22,8],[53,43],[74,15]])
  assert.ok(svg.includes(percent+'%{transform:rotate('+angle+'deg)}'));
 assert.doesNotMatch(svg,/rotate\(-49deg\)|rotate\(54deg\)/);
 const tip=(degrees,lungeX=0)=>{
  const rad=degrees*Math.PI/180;
  return {x:168+8*Math.cos(rad)+105*Math.sin(rad)+lungeX,
          y:142+8*Math.sin(rad)-105*Math.cos(rad)};
 };
 for(const [angle,lungeX] of [[0,0],[8,3],[43,-8],[15,-3]]){
  const {x,y}=tip(angle,lungeX);
  assert.ok(x>155&&x<251&&y>10&&y<230,'sword tip: '+angle+'deg at '+x+','+y);
 }
});
