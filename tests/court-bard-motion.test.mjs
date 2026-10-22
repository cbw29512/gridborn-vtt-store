import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderCourtBard,COURT_BARD_STATES} from '../src/creature-rigs/court-bard.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Elf court archlute has proper fret and pluck hands and an independent notation cast',()=>{
 const id='pregen-bard-nonbinary-3',art=read('assets/studies/elf-court-nonbinary.svg');
 const v=HERO_VARIANTS.find(x=>x.id===id),card=catalog.find(x=>x.id===id),p=animatedPreviews[id];
 assert.deepEqual([v.ancestry,v.gender,v.specialty],['Elf','nonbinary','Court Performer']);
 assert.equal(v.gear.offhand,'Lute');
 assert.equal(v.gear.headgear,'Circlet');
 assert.equal(v.gear.weapon,'Sword');
 assert.equal(card.animationStatus,'art-study');
 assert.equal(card.purchasable,false);
 assert.equal(p.still,artStudies[id]);
 assert.deepEqual(COURT_BARD_STATES,['idle','move','attack','rest']);
 for(const f of ['data-instrument="court-long-neck-archlute"','data-instrument-action="court-string-pluck"','data-instrument-part="archlute-strings"','data-spell-effect="court-silver-notes"','class="court-fretting-arm"','class="court-sword" data-weapon="sheathed-sword"'])
  assert.ok(art.includes(f),'Missing physical instrument or source part: '+f);
 assert.notEqual(art,read('assets/studies/halfling-bard.svg'));
 assert.notEqual(art,read('assets/studies/orc-songweaver-female.svg'));
 for(const mode of COURT_BARD_STATES){
  const exported=read('assets/demos/elf-court-nonbinary-'+mode+'.svg');
  assert.equal(exported,renderCourtBard(mode,art),'Court Bard source drift '+mode);
  assert.match(exported,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(exported,/prefers-reduced-motion:reduce/);
  assert.equal(p[mode==='attack'?'action':mode],'./assets/demos/elf-court-nonbinary-'+mode+'.svg');
 }
 const attack=read('assets/demos/elf-court-nonbinary-attack.svg');
 assert.match(attack,/court-arpeggio-strike 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/court-notes-resonate 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/court-melodic-cast 1\.4s linear 1 both/);
 assert.match(attack,/67%\{opacity:1;transform:translate\(4px,-3px\)\}/);
 assert.doesNotMatch(attack,/court-melodic-cast[^\n]*infinite/);
 for(const mode of ['idle','move','rest']){
  const result=read('assets/demos/elf-court-nonbinary-'+mode+'.svg');
  assert.doesNotMatch(result,/@keyframes court-melodic-cast/);
  assert.match(result,mode==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const m=JSON.parse(read('assets/demos/elf-court-nonbinary-manifest.json'));
 assert.equal(m.id,id);assert.equal(m.stateOnly,true);assert.equal(m.purchasable,false);
 assert.equal(m.artLicenseStatus,'not-verified');assert.equal(m.vttCompatibility,'untested');
 assert.deepEqual(Object.values(m.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderCourtBard('fly',art),/Unsupported Court Bard state/);
 assert.throws(()=>renderCourtBard('idle','wrong'),/Court Bard canonical instrument\/grip geometry changed/);
});
