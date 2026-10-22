import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {renderWave,WAVE_STATES} from '../src/creature-rigs/wave-two.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {catalog} from '../src/catalog.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {verifyMotionCatalog} from '../src/production-motion-gate.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const batch=[
 {id:'chr-wiz-elf',kind:'wizard',stem:'elven-wizard',category:'Characters'},
 {id:'pregen-barbarian-male-3',kind:'vanguard',stem:'orc-axe-vanguard-pregen',category:'Characters'},
 {id:'mon-dng-armor',kind:'armor',stem:'animated-armor',category:'Monsters'}
];

test('Three distinct character, pregen and monster studies are fully represented in catalog',()=>{
 assert.equal(verifyMotionCatalog(catalog),true);
 assert.deepEqual(WAVE_STATES,['idle','move','attack','rest']);
 assert.equal(Object.keys(animatedPreviews).length,20);
 for(const item of batch){
  const card=catalog.find(x=>x.id===item.id);
  assert.ok(card,item.id+' must exist');
  assert.equal(card.category,item.category);
  assert.equal(card.animationStatus,'art-study');
  assert.equal(card.purchasable,false);
  const preview=animatedPreviews[item.id];
  assert.equal(preview.still,artStudies[item.id]);
  assert.equal(preview.actionDurationMs,1400);
  assert.equal(preview.idleDurationMs,3200);
  assert.equal(preview.moveDurationMs,2400);
  assert.equal(preview.restDurationMs,4000);
  for(const mode of WAVE_STATES)assert.equal(
   preview[mode==='attack'?'action':mode],
   './assets/demos/'+item.stem+'-'+mode+'.svg');
 }
 const pregen=HERO_VARIANTS.find(x=>x.id==='pregen-barbarian-male-3');
 assert.equal(pregen?.ancestry,'Orc');
 assert.equal(pregen?.gender,'male');
 assert.equal(pregen?.characterClass,'Barbarian');
 assert.equal(pregen?.specialty,'Axe Vanguard');
 assert.equal(pregen?.artStatus,'not-produced','Pregen character sheet remains a concept');
});

test('All 12 generated SVG animation studies deterministically match their authored source',()=>{
 for(const item of batch){
  const art=read('assets/studies/'+item.stem+'.svg');
  for(const mode of WAVE_STATES){
    const source=renderWave(item.kind,mode,art);
    assert.equal(source,read('assets/demos/'+item.stem+'-'+mode+'.svg'),item.id+' '+mode);
    assert.match(source,new RegExp('data-gridborn-mode="'+mode+'"'));
    assert.match(source,/prefers-reduced-motion:reduce/);
    assert.match(source,/rig-core/);
    assert.match(source,/rig-weapon/);
    assert.ok(existsSync(new URL('../assets/demos/'+item.stem+'-'+mode+'.svg',import.meta.url)));
  }
  assert.throws(()=>renderWave(item.kind,'fly',art),/Unsupported/);
  assert.throws(()=>renderWave(item.kind,'idle','broken'),/Source SVG changed/);
  const manifest=JSON.parse(read('assets/demos/'+item.stem+'-manifest.json'));
  assert.equal(manifest.id,item.id);
  assert.equal(manifest.stateOnly,true);
  assert.equal(manifest.purchasable,false);
  assert.equal(manifest.vttCompatibility,'untested');
  assert.equal(manifest.artLicenseStatus,'not-verified');
  assert.equal(manifest.stateClips.attack.durationSec,1.4);
 }
});

test('Wizard caster, Orc pregen and Armor have characteristic, distinguishable motions',()=>{
 const wiz=read('assets/demos/elven-wizard-attack.svg');
 const orc=read('assets/demos/orc-axe-vanguard-pregen-attack.svg');
 const armor=read('assets/demos/animated-armor-attack.svg');
 assert.match(wiz,/wiz-staff-cast/);
 assert.match(wiz,/rig-glow/);
 assert.match(wiz,/wiz-burst/);
 assert.match(orc,/orc-chop/);
 assert.match(orc,/Axe Vanguard/);
 assert.match(orc,/fill="#d2a04f"/);
 assert.match(armor,/armor-cleave/);
 assert.match(armor,/rig-visorglow/);
 assert.match(read('assets/demos/orc-axe-vanguard-pregen-move.svg'),/rig-boot-l/);
 assert.match(read('assets/demos/animated-armor-move.svg'),/armor-foot-right/);
 assert.doesNotMatch(read('assets/demos/animated-armor-rest.svg'),/animation:[^\n]*breath/i);
 for(const path of ['elven-wizard-attack.svg','orc-axe-vanguard-pregen-attack.svg','animated-armor-attack.svg']){
  const svg=read('assets/demos/'+path);
  assert.match(svg,/1\.4s[^\n]*1 both/);
  assert.doesNotMatch(svg,/1\.4s[^\n]*infinite/);
 }
});

test('wizard casts a separate, one-shot arcane projectile instead of only moving the staff glow',()=>{
 const art=read('assets/studies/elven-wizard.svg');
 const shot=read('assets/demos/elven-wizard-attack.svg');
 assert.equal(shot,renderWave('wizard','attack',art),'Projectile must regenerate from canonical rig');
 assert.match(shot,/<\/g>\n<g class="rig-projectile" data-weapon-projectile="arcane-bolt" opacity="0"/);
 assert.match(shot,/<path d="M63 53L42 48L53 45L47 51L53 59Z"/,'Drawn spell glyph is visible at 64px');
 assert.match(shot,/\.rig-projectile\{animation:wiz-projectile-flight 1\.4s linear 1 both\}/);
 assert.match(shot,/@keyframes wiz-projectile-flight\{0%,33%\{opacity:0;transform:translate\(0,0\)\}/);
 assert.match(shot,/56%\{opacity:1;transform:translate\(-24px,-6px\)\}/);
 assert.match(shot,/\.rig-glow,\.rig-projectile\{animation:none!important\}/);
 for(const mode of ['idle','move','rest']){
  const svg=read('assets/demos/elven-wizard-'+mode+'.svg');
  assert.equal(svg,renderWave('wizard',mode,art));
  assert.doesNotMatch(svg,/data-weapon-projectile="arcane-bolt"/);
 }
});
