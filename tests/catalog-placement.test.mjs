import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('browseable catalog is directly below the hero, ahead of editorial and bundle sections',()=>{
  try{
    const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
    const markers=['<section class="hero shell"','<section class="catalog-section"',
      '<section class="path-section shell"','<section class="bundle-section shell"'];
    const offsets=markers.map(s=>html.indexOf(s));
    assert.ok(offsets.every(x=>x>=0),'Expected home-page sections');
    assert.deepEqual(offsets,[...offsets].sort((a,b)=>a-b));
    assert.match(html,/<a class="primary-action" href="#catalog">Browse token designs/);
    assert.match(html,/id="results" class="product-grid"/);
    assert.match(html,/All purchases remain disabled/);
  }catch(error){console.error('Catalog placement regression:',error);throw error}
});
