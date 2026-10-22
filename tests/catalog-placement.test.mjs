import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('product catalog appears immediately after navigation, ahead of hero and bundles',()=>{
  try{
    const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
    const marker=['</header>','<main>','<section class="catalog-section"','<section class="hero shell"','<section class="path-section shell"','<section class="bundle-section shell"'];
    const offsets=marker.map(x=>html.indexOf(x));
    assert.ok(offsets.every(x=>x>=0),'Required page sections present');
    assert.deepEqual(offsets,[...offsets].sort((a,b)=>a-b));
    assert.match(html,/<main>\s*<section class="catalog-section"/);
    assert.match(html,/id="results" class="product-grid"/);
    assert.match(html,/All purchases remain disabled/);
  }catch(error){console.error('Homepage product-first placement regression:',error);throw error;}
});
