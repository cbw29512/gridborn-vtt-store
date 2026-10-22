import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderDwarfRanger,DWARF_RANGER_STATES} from '../src/creature-rigs/dwarf-ranger.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Dwarf Ranger has distinct beard anatomy and physically anchored separate fletched arrow',()=>{
 const id='pregen-ranger-male-1',source=read('assets/studies/dwarf-pathfinder-male.svg');
 const hero=HERO_VARIANTS.find(x=>x.id===id),card=catalog.find(x=>x.id===id),p=animatedPreviews[id];
 assert.deepEqual([hero.ancestry,hero.gender,hero.specialty],['Dwarf','male','Pathfinder']);
 assert.equal(card.animationStatus,'art-study');
 assert.equal(card.purchasable,false);
 assert.equal(p.still,artStudies[id]);
 assert.deepEqual(DWARF_RANGER_STATES,['idle','move','attack','rest']);
 for(const feature of ['class="dwarf-ranger-beard"','class="dwarf-ranger-quiver"','class="dwarf-ranger-bow-arm"','class="dwarf-ranger-relaxed-arm"','data-pose="beard-anchor"','class="dwarf-ranger-rest-string"','class="dwarf-ranger-drawn-string"','data-weapon="dwarf-yew-recurve-bow"','data-projectile="dwarf-fletched-arrow"'])
  assert.ok(source.includes(feature),'Missing original Dwarf anatomical/archery feature '+feature);
 assert.notEqual(source,read('assets/studies/orc-pathfinder-female.svg'));
 assert.notEqual(source,read('assets/studies/goblin-pathfinder-nonbinary.svg'));
 assert.notEqual(source,read('assets/studies/elven-ranger.svg'));
 for(const mode of DWARF_RANGER_STATES){
  const file=read('assets/demos/dwarf-pathfinder-male-'+mode+'.svg');
  assert.equal(file,renderDwarfRanger(mode,source),'Canonical Dwarf ranger source drift '+mode);
  assert.match(file,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(file,/prefers-reduced-motion:reduce/);
  assert.equal(p[mode==='attack'?'action':mode],'./assets/demos/dwarf-pathfinder-male-'+mode+'.svg');
 }
 const attack=read('assets/demos/dwarf-pathfinder-male-attack.svg');
 assert.match(attack,/dwarf-ranger-chin-anchor 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/dwarf-ranger-tension 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/dwarf-ranger-arrow-flight 1\.4s linear 1 both/);
 assert.match(attack,/62%\{opacity:1;transform:translate\(5px,0\)\}/);
 assert.match(attack,/65%\{opacity:1;transform:translate\(11px,0\)\}/);
 assert.doesNotMatch(attack,/dwarf-ranger-arrow-flight[^\n]*infinite/);
 for(const mode of ['idle','move','rest']){
  const result=read('assets/demos/dwarf-pathfinder-male-'+mode+'.svg');
  assert.doesNotMatch(result,/@keyframes dwarf-ranger-arrow-flight/);
  assert.match(result,mode==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const m=JSON.parse(read('assets/demos/dwarf-pathfinder-male-manifest.json'));
 assert.equal(m.id,id);assert.equal(m.stateOnly,true);assert.equal(m.purchasable,false);
 assert.equal(m.artLicenseStatus,'not-verified');assert.equal(m.vttCompatibility,'untested');
 assert.deepEqual(Object.values(m.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderDwarfRanger('fly',source),/Unsupported Dwarf Pathfinder state/);
 assert.throws(()=>renderDwarfRanger('idle','wrong source'),/Dwarf Pathfinder source art or anchored bow rig changed/);
});
