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
  assert.match(app, /makeCard/);
  assert.match(get('src/product-card.js'), /Preview only/);
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

test('Idle and Rest are switchable looping studies with explicit pause and accessible status', () => {
  assert.match(html, /id="demo-rest-toggle"/);
  assert.match(html, /aria-controls="demo-token"/);
  assert.match(get('assets/demos/human-fighter-rest.svg'), /rest-breathe 6s/);
  assert.match(get('assets/demos/human-fighter-rest.svg'), /prefers-reduced-motion:reduce/);
  const demo = get('src/animation-demo.js');
  assert.match(demo, /mode==='idle'/);
  assert.match(demo, /mode='idle'/);
  assert.match(demo, /userPaused/);
  assert.match(demo, /visibilitychange/);
  assert.match(demo, /aria-pressed/);
  assert.ok(demo.split('\n').length <= 150);
});

test('concept details explicitly disclose unverified VTT compatibility', () => {
  const details = get('src/concept-dialog.js');
  assert.match(details, /VTT compatibility/);
  assert.match(details, /Not tested in Foundry, Roll20/);
});

test('first screen clearly defines Gridborn as a solution for static VTT maps', () => {
  const hero = html.slice(html.indexOf('<section class="hero shell"'), html.indexOf('<section class="catalog-section"'));
  assert.match(hero, /Your VTT maps are static/);
  assert.match(hero, /Your battles shouldn't be/);
  assert.match(hero, /animated fantasy tokens for/);
  assert.match(hero, /heroes, monsters, NPCs, and animals/);
  assert.match(hero, /See static vs\. animated/);
  assert.match(hero, /BEFORE/);
  assert.match(hero, /GRIDBORN/);
  assert.match(hero, /VTT support not yet verified/);
  assert.match(html, /href="#live-demo"/);
  assert.match(html, /src\/hero\.css/);
  assert.match(get('src/animation-demo.js'), /demo-status/);
});

test('four category shortcuts show four distinct original concept illustrations', () => {
  const paths = ['elven-wizard.svg','village-innkeeper.svg',
    'skeleton-warrior.svg','great-white-shark.svg'];
  for (const name of paths) {
    assert.ok(html.includes('assets/studies/' + name), name);
    assert.ok(existsSync(new URL('../assets/studies/' + name, import.meta.url)));
  }
  assert.match(get('src/product-card.js'), /ANIMATION STUDY/);
  assert.match(get('src/product-card.js'), /illustration\.replaceWith\(symbol\)/);
});

test('catalog supports global search and defers advanced filters until category selection', () => {
  assert.match(html, /Search all tokens/);
  assert.match(html, /id="primary-field" hidden/);
  assert.match(html, /id="secondary-field" hidden/);
  assert.match(html, /id="show-more"/);
  assert.match(html, /id="empty-message"/);
  assert.match(get('src/app.js'), /currentCategory = state.category/);
});
test('concept pricing is clearly marked as a target, without pretend buy buttons', () => {
  const cards = get('src/product-card.js');
  assert.match(cards, /Target \$/);
  assert.match(cards, /Preview only/);
  assert.doesNotMatch(cards, /Coming soon|button\.disabled = true/);
});

test('two animation studies have static defaults and explicit modal playback controls', () => {
  for (const asset of ['cave-goblin-loop.svg','cave-goblin-rest.svg']) {
    assert.ok(existsSync(new URL('../assets/demos/' + asset, import.meta.url)));
  }
  const dialog = get('src/concept-dialog.js');
  const preview = get('src/concept-preview.js');
  assert.match(dialog, /setConceptPreview\(item\)/);
  assert.match(dialog, /stopConceptPreview\(\)/);
  assert.match(preview, /visibilitychange/);
  assert.match(preview, /mode === 'action'/);
  assert.match(preview, /mode === 'rest'/);
  assert.match(html, /id="concept-preview-panel"/);
  assert.match(html, /id="concept-preview-action"/);
  assert.match(html, /id="concept-preview-rest"/);
  assert.match(get('src/catalog.js'), /animatedPreviews\[id\]/);
});

test('hero compares a fixed still token against a continuously looping Idle by default', () => {
  assert.match(html, /class="vtt-figure vtt-figure-static" src="\.\/assets\/demos\/human-fighter-still\.svg"/);
  assert.match(html, /id="demo-token"[^>]+src="\.\/assets\/demos\/human-fighter-idle\.svg"/);
  assert.match(html, /Idle · loops automatically/);
  assert.match(html, /vtt-loop-badge/);
  assert.match(html, /id="demo-pause"/);
  assert.match(html, /id="demo-toggle"[^>]+aria-pressed="true"/);
  const idle = get('assets/demos/human-fighter-idle.svg');
  for (const name of ['fighter-breathe','fighter-cloak','fighter-blade','fighter-shield','fighter-blink'])
    assert.match(idle, new RegExp('animation: '+name+' 3\\.2s|animation: '+name+' 6\\.4s'));
  assert.match(idle, /infinite/);
  assert.match(idle, /prefers-reduced-motion:reduce/);
  assert.match(get('src/animation-demo.js'), /let mode='idle'/);
  assert.match(get('src/animation-demo.js'), /window\.matchMedia/);
  assert.match(get('src/animation-demo.js'), /visibilitychange/);
  assert.match(get('src/animation-demo.js'), /userPaused/);
});
