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
  assert.match(get('src/concept-dialog.js'), /showModal\(\)/);
  assert.match(get('src/concept-dialog.js'), /lastDialogTrigger\.focus\(\)/);
});
test('keyboard and reduced motion support remains present', () => {
  assert.match(html, /class="skip-link" href="#catalog"/);
  for (const id of ['search','category','primary-filter','secondary-filter'])
    assert.match(html, new RegExp('for="' + id + '"'));
  assert.match(get('src/components.css'), /prefers-reduced-motion/);
  assert.match(get('src/base.css'), /focus-visible/);
});

test('animation study has a static fallback, explicit control and a 45-second timing plan', () => {
  assert.match(html, /id="demo-token"/);
  assert.match(html, /id="demo-toggle"/);
  assert.match(html, /aria-pressed="false"/);
  assert.equal(existsSync(new URL('../assets/demos/human-fighter-still.svg', import.meta.url)), true);
  const animated = get('assets/demos/human-fighter-loop.svg');
  assert.match(animated, /animation:body-cycle 45s/);
  assert.match(animated, /77\.77%/);
  assert.match(animated, /84\.45%/);
  assert.match(animated, /prefers-reduced-motion:reduce/);
  const controller = get('src/animation-demo.js');
  assert.match(controller, /visibilitychange/);
  assert.match(controller, /aria-pressed/);
});

test('preview application uses bounded modules', () => {
  const app = get('src/app.js');
  assert.ok(app.split('\n').length <= 150, 'app.js should remain under 150 lines');
  assert.match(app, /initializeDemo\(\)/);
  assert.match(app, /initializeConceptDialog\(\)/);
});

test('category shortcuts are four normal links to stable catalog URLs', () => {
  const matches = [...html.matchAll(/data-category-link="([^"]+)"/g)].map(match=>match[1]);
  assert.deepEqual(matches,['Characters','NPCs','Monsters','Animals']);
  assert.match(html, /href="\?category=Monsters#catalog"/);
  assert.match(get('src/app.js'), /connectCatalogNavigation/);
});

test('buyer FAQ does not make unverified compatibility or legal claims', () => {
  assert.match(html, /id="faq" aria-labelledby="faq-title"/);
  assert.equal((html.match(/<details>/g) || []).length, 5);
  assert.equal((html.match(/<summary>/g) || []).length, 5);
  assert.match(html, /Compatibility has not been verified/);
  assert.match(html, /license has not yet been published/);
  assert.match(html, /Checkout and paid downloads are disabled/);
});
