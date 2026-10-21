import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { PARTS,PALETTES,PRESETS,DEFAULT_RECIPE,normalizeRecipe,presetToRecipe,
  toPortableRecipe,fromPortableRecipe } from '../src/builder-data.js';
import {renderRig} from '../src/builder-rig.js';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('ten premade recipes use one validated modular humanoid rig',()=>{
  assert.equal(Object.keys(PRESETS).length,10);
  assert.deepEqual(Object.keys(PARTS),['ancestry','outfit','headgear','hair','weapon','offhand','cape']);
  assert.equal(Object.keys(PALETTES).length,7);
  for(const key of Object.keys(PRESETS)){
    const data=presetToRecipe(key);
    assert.equal(normalizeRecipe(data).schemaVersion,1);
    assert.match(renderRig(data),/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    assert.match(renderRig(data),/class="rig-figure"/);
    assert.match(renderRig(data),/class="rig-arm-right"/);
    assert.match(renderRig(data),/class="rig-legs"/);
  }
});
test('changing any part or palette preserves a valid editable recipe',()=>{
  for(const [slot,items] of Object.entries(PARTS)){
    for(const value of items){
      const data=normalizeRecipe({...DEFAULT_RECIPE,[slot]:value});
      assert.equal(data[slot],value);
      assert.match(renderRig(data),/modular fantasy token/);
    }
  }
  for(const name of Object.keys(PALETTES)){
    const data=normalizeRecipe({...DEFAULT_RECIPE,palette:PALETTES[name]});
    assert.equal(data.palette.primary.toLowerCase(),PALETTES[name].primary);
  }
});
test('all four animation modes share one reusable source rig',()=>{
  for(const mode of ['idle','move','attack','rest']){
    assert.match(renderRig(DEFAULT_RECIPE,{mode,animated:true}),new RegExp('mode-'+mode));
    assert.match(renderRig(DEFAULT_RECIPE,{mode,animated:true}),/rig-animated/);
  }
  assert.throws(()=>renderRig(DEFAULT_RECIPE,{mode:'explode'}),/Invalid rig preview mode/);
});
test('portable JSON recipes round-trip without creating executable content',()=>{
  const custom={...presetToRecipe('chr-bar-orc'),name:'My Hero & Guardian',
    weapon:'Bow',palette:{...PALETTES.forest,primary:'#123456'}};
  const json=toPortableRecipe(custom),restored=fromPortableRecipe(json);
  assert.deepEqual(restored,normalizeRecipe(custom));
  assert.equal(restored.palette.primary,'#123456');
  assert.doesNotMatch(json,/<script/i);
});
test('malicious or invalid saved designs cannot inject SVG or arbitrary parts',()=>{
  for(const name of ['',' '.repeat(5),'x'.repeat(49),'bad<script>','line\nbreak'])
    assert.throws(()=>normalizeRecipe({...DEFAULT_RECIPE,name}),/Name/);
  for(const field of Object.keys(PARTS))
    assert.throws(()=>normalizeRecipe({...DEFAULT_RECIPE,[field]:'../../invalid'}),/Unsupported/);
  for(const color of ['red','url(javascript:alert(1))','#ffff','#fffffff','var(--color)'])
    assert.throws(()=>normalizeRecipe({...DEFAULT_RECIPE,palette:{...DEFAULT_RECIPE.palette,primary:color}}),/color/);
  assert.throws(()=>fromPortableRecipe('{"format":"other"}'),/Not a Gridborn recipe/);
  assert.throws(()=>fromPortableRecipe('not json'),/not valid JSON/);
  assert.throws(()=>fromPortableRecipe('a'.repeat(10001)),/too large/);
});
test('builder page and catalog expose both journeys and keep checkout disabled',()=>{
  const page=read('builder.html'),store=read('index.html');
  for(const id of ['builder-presets','builder-parts','builder-palettes','builder-avatar',
    'builder-modes','download-recipe','download-png','import-recipe','builder-reset'])
    assert.match(page,new RegExp('id="'+id+'"'));
  assert.match(store,/Browse premade tokens/);
  assert.match(store,/Build a living character/);
  assert.match(store,/href="\.\/builder\.html"/);
  assert.match(read('src/product-card.js'),/builder\.html\?preset=/);
  assert.match(page,/noindex,follow/);
  assert.match(page,/not available yet/);
  assert.doesNotMatch(page,/stripe\.com|Buy now|Checkout/i);
  for(const path of ['src/builder-data.js','src/builder-rig.js','src/builder-app.js',
    'src/builder.css','src/chooser.css'])
    assert.ok(existsSync(new URL('../'+path,import.meta.url)),path);
});

test('each limb animates independently with equipped parts following the same motion',()=>{
  const css=read('src/builder.css');
  const move=renderRig(presetToRecipe('chr-ftr-human'),{mode:'move',animated:true});
  for(const group of ['rig-leg-left','rig-leg-right','rig-arm-left','rig-arm-right',
    'rig-weapon','rig-offhand','rig-head','rig-cape']){
    assert.match(move,new RegExp('class="'+group+'"'));
    assert.ok(css.includes('.'+group),'Missing '+group+' motion hook');
  }
  assert.match(css,/gb-left-stride/);
  assert.match(css,/gb-right-stride/);
  assert.match(css,/gb-walk-head/);
  assert.match(css,/gb-walk-cape/);
  assert.doesNotMatch(css,/gb-step \.65s/);
});
test('rest draws a different seated silhouette with distinct legs and stool',()=>{
  const css=read('src/builder.css');
  for(const key of Object.keys(PRESETS)){
    const recipe=presetToRecipe(key);
    const idle=renderRig(recipe,{mode:'idle',animated:true});
    const rest=renderRig(recipe,{mode:'rest',animated:true});
    assert.match(rest,/class="rig-rest-seat"/);
    assert.match(rest,/class="rig-legs rig-legs-rest"/);
    assert.match(rest,/class="rig-upper"/);
    assert.doesNotMatch(idle,/class="rig-rest-seat"/);
    assert.notEqual(idle,rest,key);
    if(recipe.ancestry!=='Skeleton')assert.match(rest,/class="rig-eyelids"/);
  }
  assert.match(css,/gb-seated-breath/);
  assert.match(css,/\.mode-rest \.rig-eyelids\{opacity:1\}/);
  assert.match(css,/prefers-reduced-motion:reduce/);
});
test('attack is one windup, strike, and recovery before returning to Idle',()=>{
  const css=read('src/builder.css');
  const app=read('src/builder-app.js');
  assert.match(css,/gb-attack-lunge \.94s ease-in-out 1 both/);
  assert.match(app,/animationend/);
  assert.match(app,/event\.animationName!=='gb-attack-lunge'/);
  assert.match(app,/mode='idle';render\(\)/);
});
test('shading responds to the selected palette without embedding unsafe values',()=>{
  const base=renderRig(presetToRecipe('chr-ftr-human'));
  const switched=renderRig(presetToRecipe('chr-bar-orc'));
  assert.notEqual(base,switched);
  assert.match(read('src/builder-rig.js'),/const tint=/);
  assert.match(base,/rig-headgear/);
  assert.match(base,/rig-weapon/);
  assert.match(base,/rig-offhand/);
  assert.doesNotMatch(base,/<script/i);
});
test('preview campfire is only a decorative builder stage element',()=>{
  const html=read('builder.html'),css=read('src/builder.css');
  assert.match(html,/class="stage-campfire"/);
  assert.match(html,/class="stage-atmosphere"/);
  assert.match(css,/\[data-mode="rest"\] \.stage-campfire/);
  assert.match(read('src/builder-app.js'),/dataset\.mode=mode/);
  const png=renderRig(DEFAULT_RECIPE,{mode:'idle',animated:false});
  assert.doesNotMatch(png,/campfire|stage-atmosphere/);
});
