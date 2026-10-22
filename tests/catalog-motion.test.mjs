import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {catalog} from '../src/catalog.js';
import {animatedPreviews} from '../src/animated-previews.js';
import {MOTION_STAGES,hasCatalogMotion} from '../src/catalog-motion.js';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('All existing four-state animation prototypes visibly participate in autoplay',()=>{
  const ids=Object.keys(animatedPreviews);
  assert.deepEqual(ids.sort(),[
    'ani-forest-wolf','ani-ocean-greatwhite','chr-brd-halfling','chr-clr-dwarf','chr-ftr-human','chr-pal-human','chr-rge-gnome','chr-rng-elf','chr-wiz-elf','mon-cave-goblin','mon-cave-ogre','mon-cave-spider','mon-dng-armor','mon-dng-skeleton','mon-swamp-lizard','pregen-barbarian-male-3','pregen-cleric-female-2','pregen-druid-female-1','pregen-rogue-nonbinary-1']);
  assert.deepEqual(MOTION_STAGES.map(s=>s.key),['idle','move','action','rest']);
  assert.equal(MOTION_STAGES.length,4);
  for(const entry of MOTION_STAGES)assert.ok(entry.durationMs>=0);
  for(const id of ids){
    assert.equal(hasCatalogMotion(id),true,id);
    const item=catalog.find(t=>t.id===id);
    assert.ok(item && item.animationStatus==='art-study');
    assert.equal(item.purchasable,false);
    for(const stage of MOTION_STAGES){
      const name=animatedPreviews[id][stage.key].slice(2);
      assert.ok(existsSync(new URL('../'+name,import.meta.url)),id+' '+stage.key);
    }
    assert.ok(Number.isInteger(animatedPreviews[id].actionDurationMs));
  }
  assert.equal(hasCatalogMotion('ani-ocean-greatwhite'),true,'The Great White Shark has four real motions');
  assert.equal(hasCatalogMotion('mon-dng-skeleton'),true,'Skeleton now has all four modes');
  assert.equal(hasCatalogMotion('nonexistent'),false);
});

test('Motion begins on catalog cards without Play buttons and stays preview-only',()=>{
  const card=read('src/product-card.js');
  const controller=read('src/catalog-motion.js');
  const app=read('src/app.js');
  const html=read('index.html');
  assert.match(card,/MOVING ART STUDY/);
  assert.match(card,/dataset\.motionId/);
  assert.match(card,/product-motion-stage/);
  assert.match(card,/illustration\.replaceWith\(symbol\)/);
  assert.match(controller,/new IntersectionObserver/);
  assert.match(controller,/document\.hidden/);
  assert.match(controller,/prefers-reduced-motion: reduce/);
  assert.match(controller,/gridborn:catalog-rendered/);
  assert.match(controller,/setTimeout/);
  assert.match(controller,/clearTimeout/);
  assert.match(app,/initializeCatalogMotion\(\)/);
  assert.match(app,/!state\.query \? Number\(hasCatalogMotion\(b\.id\)\)/, 'Unfiltered store must prioritize real moving studies');
  assert.match(html,/id="catalog-motion-toggle"/);
  assert.match(html,/Idle → Move → Attack → Rest/);
  assert.match(html,/src\/catalog-motion\.css/);
  assert.match(html,/All purchases remain disabled/);
  assert.doesNotMatch(controller,/stripe|checkout\.sessions|buyNow/i);
  assert.ok(catalog.every(t=>!t.purchasable));
});
