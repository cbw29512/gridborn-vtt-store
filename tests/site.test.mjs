import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const get = path => {
  try { return readFileSync(new URL('../' + path, import.meta.url), 'utf8'); }
  catch (error) { console.error('Cannot inspect storefront file', path, error); throw error; }
};
const html = get('index.html');
test('preview SEO includes crawl safety, canonical, description and social metadata', () => {
  assert.match(html, /name="robots" content="noindex,follow/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /name="description"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /application\/ld\+json/);
});
test('marketing assets exist and no live checkout is embedded', () => {
  for (const path of ['assets/favicon.svg','assets/social-card.svg','robots.txt','sitemap.xml'])
    assert.equal(existsSync(new URL('../' + path, import.meta.url)), true, path);
  assert.doesNotMatch(html, /stripe\.com\/checkout|buy-now|purchase-now/i);
});
test('native concept dialog has a name, dismiss control and focus restore', () => {
  assert.match(html, /<dialog[^>]+aria-labelledby="preview-title"[^>]+aria-describedby="preview-description"/);
  assert.match(html, /method="dialog"/);
  assert.match(html, /aria-label="Close concept details"/);
  assert.match(get('src/app.js'), /showModal\(\)/);
  assert.match(get('src/app.js'), /lastDialogTrigger\.focus\(\)/);
});
test('keyboard and reduced motion support remains present', () => {
  assert.match(html, /class="skip-link" href="#catalog"/);
  for (const id of ['search','category','primary-filter','secondary-filter'])
    assert.match(html, new RegExp('for="' + id + '"'));
  assert.match(get('src/components.css'), /prefers-reduced-motion/);
  assert.match(get('src/base.css'), /focus-visible/);
});
