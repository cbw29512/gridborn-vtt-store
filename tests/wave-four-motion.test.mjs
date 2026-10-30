import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {catalog} from '../src/catalog.js';
import {verifyMotionCatalog} from '../src/production-motion-gate.mjs';
import {renderWaveFour,WAVE_FOUR_STATES} from '../src/creature-rigs/wave-four.mjs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const studies=[
 {id:'chr-pal-human',kind:'paladin',stem:'human-paladin',category:'Characters',features:['paladin-helmet','paladin-shield','paladin-sword']},
 {id:'chr-rge-gnome',kind:'gnome',stem:'gnome-rogue',category:'Characters',features:['brass goggles','hand-crossbow','rig-offhand']},
 {id:'mon-swamp-lizard',kind:'lizardfolk',stem:'swamp-lizardfolk',category:'Monsters',features:['crocodilian snout','rig-tail','rig-weapon']},
 {id:'ani-ocean-greatwhite',kind:'shark',stem:'great-white-shark',category:'Animals',features:['shark-tail','shark-dorsal-fin','shark-head-features']}
];
test('Full-motion store has sixteen distinct non-purchasable animated studies',()=>{
 assert.equal(verifyMotionCatalog(catalog),true);
 assert.equal(Object.keys(animatedPreviews).length,52);
 assert.equal(catalog.length,518);
 assert.equal(catalog.filter(x=>x.previewArt).length,53);
 assert.deepEqual(WAVE_FOUR_STATES,['idle','move','attack','rest']);
 const distinct=new Set();
 for(const {id,stem,category,kind,features} of studies){
  const card=catalog.find(x=>x.id===id);
  assert.ok(card,id);assert.equal(card.category,category);
  assert.equal(card.animationStatus,'art-study');assert.equal(card.purchasable,false);
  const artwork=read('assets/studies/'+stem+'.svg');
  const fingerprint=createHash('sha256').update(artwork).digest('hex');
  assert.ok(!distinct.has(fingerprint),'No reused illustration '+id);
  distinct.add(fingerprint);
  for(const feature of features)assert.ok(artwork.includes(feature),id+' missing '+feature);
  const p=animatedPreviews[id];
  assert.equal(p.still,artStudies[id]);
  assert.equal(p.actionDurationMs,1400);
  assert.equal(p.idleDurationMs,3200);
  assert.equal(p.moveDurationMs,2400);
  assert.equal(p.restDurationMs,4000);
  for(const state of WAVE_FOUR_STATES){
   const name='assets/demos/'+stem+'-'+state+'.svg';
   assert.equal(p[state==='attack'?'action':state],'./'+name);
   const result=renderWaveFour(kind,state,artwork);
   assert.equal(read(name),result,'Generated source drift in '+name);
   assert.match(result,new RegExp('data-gridborn-mode="'+state+'"'));
   assert.match(result,/prefers-reduced-motion:reduce/);
  }
  const manifest=JSON.parse(read('assets/demos/'+stem+'-manifest.json'));
  assert.equal(manifest.id,id);assert.equal(manifest.stateOnly,true);
  assert.equal(manifest.purchasable,false);
  assert.equal(manifest.vttCompatibility,'untested');
  assert.equal(manifest.artLicenseStatus,'not-verified');
  assert.deepEqual(Object.values(manifest.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
  assert.equal(manifest.restDurationSec,4);
 }
});

test('Specialized attack and locomotion preserve different anatomy',()=>{
 const shark=read('assets/demos/great-white-shark-move.svg');
 const lizard=read('assets/demos/swamp-lizardfolk-move.svg');
 const gnome=read('assets/demos/gnome-rogue-attack.svg');
 const paladin=read('assets/demos/human-paladin-attack.svg');
 assert.match(shark,/shark-caudal-kick 1\.2s/);
 assert.match(shark,/rig-fin/);
 assert.match(shark,/rig-tail/);
 assert.match(lizard,/lizard-tail-balance 1\.2s/);
 assert.match(lizard,/lizard-right 1\.2s/);
 assert.match(gnome,/gnome-crossbow-shot 1\.4s/);
 assert.match(gnome,/gnome-bolt-launch 1\.4s/);
 assert.match(paladin,/paladin-sunstrike 1\.4s/);
 assert.match(paladin,/paladin-shield-block 1\.4s/);
 const oldRogue=read('assets/studies/human-shadowstep-nonbinary.svg');
 const smallRogue=read('assets/studies/gnome-rogue.svg');
 assert.notEqual(smallRogue,oldRogue);
 assert.match(smallRogue,/Small Gnome Rogue/);
 assert.match(oldRogue,/twin|two distinct/i);
 assert.match(read('assets/studies/great-white-shark.svg'),/right-facing profile/);
 for(const {stem} of studies){
  const attack=read('assets/demos/'+stem+'-attack.svg');
  assert.match(attack,/1\.4s[^\n]*1 both/);
  assert.doesNotMatch(attack,/1\.4s[^\n]*infinite/);
 }
});

test('Gnome crossbow holds and fires a separate visible bolt with one-shot flight',()=>{
 const source=read('assets/studies/gnome-rogue.svg');
 const shot=read('assets/demos/gnome-rogue-attack.svg');
 assert.match(source,/data-weapon-projectile="crossbow-bolt"/);
 assert.match(source,/M198 124L215 117/,'Visible bolt shaft must come from original artwork');
 assert.match(shot,/\.rig-bolt\{animation:gnome-bolt-flight 1\.4s linear 1 both\}/);
 assert.match(shot,/@keyframes gnome-bolt-flight\{[\s\S]*?56%\{opacity:1;transform:translate\(19px,-8px\)\}/);
 assert.match(shot,/63%,100%\{opacity:0;transform:translate\(22px,-9px\)\}/);
 assert.match(shot,/prefers-reduced-motion:reduce[^\n]*\.rig-bolt/);
 for(const state of ['idle','move','rest']){
  const svg=read('assets/demos/gnome-rogue-'+state+'.svg');
  assert.doesNotMatch(svg,/gnome-bolt-flight/,'No fired projectile in '+state);
  assert.match(svg,/data-weapon-projectile="crossbow-bolt" opacity="0"/,'Projectile remains hidden in '+state);
 }
 assert.match(read('assets/demos/gnome-rogue-manifest.json'),/"purchasable"\s*:\s*false/);
});

test('Lizardfolk spear is gripped, jaw-clear and one-shot frame-safe',()=>{
 const still=read('assets/studies/swamp-lizardfolk.svg');
 const shot=read('assets/demos/swamp-lizardfolk-attack.svg');
 assert.ok(still.includes('data-weapon-grip="right-hand"'));
 assert.ok(still.includes('M140 189L220 156'));
 assert.ok(still.includes('M218 157L235 143L232 164L221 165Z'));
 assert.ok(shot.includes('24%{transform:translate(-8px,3px)}'));
 assert.ok(shot.includes('54%{transform:translate(12px,-3px)}'));
 for(const [dx,dy] of [[0,0],[-8,3],[12,-3],[3,-1]]){
  assert.ok(235+dx>215&&235+dx<256,'Spear tip within horizontal frame');
  assert.ok(143+dy>=135&&143+dy<165,'Spear tip below snout');
 }
 for(const mode of WAVE_FOUR_STATES){
  assert.equal(read('assets/demos/swamp-lizardfolk-'+mode+'.svg'),renderWaveFour('lizardfolk',mode,still));
 }
 assert.ok(read('assets/demos/swamp-lizardfolk-manifest.json').includes('"purchasable": false'));
});

test('Paladin sword is body-attached and sweeps a frame-safe arc clear of the helmet',()=>{
 const original=read('assets/studies/human-paladin.svg');
 const seen=new Set();
 for(const state of WAVE_FOUR_STATES){
  const svg=read('assets/demos/human-paladin-'+state+'.svg');
  assert.equal(svg,renderWaveFour('paladin',state,original),'Paladin generator parity: '+state);
  const groups=[];
  for(const [tag] of svg.matchAll(/<\/?g\b[^>]*>/g)){
   if(tag.startsWith('</')){
    assert.ok(groups.length,'Unmatched group closing in '+state);
    groups.pop();
   }else{
    const cls=tag.match(/class="([^"]+)"/)?.[1]||'';
    if(cls.includes('rig-weapon')||cls.includes('rig-offhand')){
     assert.ok(groups.includes('rig-core'),cls+' must follow the lunging body');
     seen.add(cls.includes('rig-weapon')?'weapon':'shield');
    }
    groups.push(cls);
   }
  }
  assert.equal(groups.length,0,'All SVG rig groups must balance in '+state);
 }
 assert.deepEqual([...seen].sort(),['shield','weapon']);
 const attack=read('assets/demos/human-paladin-attack.svg');
 assert.match(attack,/paladin-sunstrike 1\.4s ease-in-out 1 both/,'Sword must swing smoothly, not teleport between keyframes');
 assert.match(attack,/24%\{transform:rotate\(-14deg\)\}53%\{transform:rotate\(28deg\)\}/);
 const pivot={x:193,y:148},tip={x:191,y:37};
 for(const angle of [0,-14,28,12]){
  const radians=angle*Math.PI/180;
  const x=pivot.x+(tip.x-pivot.x)*Math.cos(radians)-(tip.y-pivot.y)*Math.sin(radians);
  const y=pivot.y+(tip.x-pivot.x)*Math.sin(radians)+(tip.y-pivot.y)*Math.cos(radians);
  assert.ok(x>162&&x<250&&y>30&&y<90,'Sword tip clears helmet and 256px canvas at '+angle+'deg');
 }
 assert.ok(28-(-14)>=40,'Paladin needs a visible weapon sweep, not a small wobble');
});
