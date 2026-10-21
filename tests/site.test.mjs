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
  assert.match(html, /id="demo-sleep-token"/);
  assert.match(html, /id="demo-pause"/);
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

test('sleep and full motion automatically repeat while Pause remains optional', () => {
  assert.match(html, /id="demo-sleep-token"/);
  assert.doesNotMatch(html, /id="demo-toggle"|id="demo-rest-toggle"/);
  assert.match(html, /aria-controls="demo-token demo-sleep-token"/);
  assert.match(get('assets/demos/human-fighter-rest.svg'), /rest-breathe 6s/);
  assert.match(get('assets/demos/human-fighter-rest.svg'), /prefers-reduced-motion:reduce/);
  const demo = get('src/animation-demo.js');
  assert.match(demo, /ASSETS\.sleep/);
  assert.match(demo, /ASSETS\.motion/);
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
  assert.match(hero, /Watch living tokens/);
  assert.match(hero, /SLEEPING/);
  assert.match(hero, /FULL MOTION/);
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

test('concept previews keep static defaults and expose supported animation states', () => {
  for (const asset of ['cave-goblin-loop.svg','cave-goblin-rest.svg']) {
    assert.ok(existsSync(new URL('../assets/demos/' + asset, import.meta.url)));
  }
  const dialog = get('src/concept-dialog.js');
  const preview = get('src/concept-preview.js');
  assert.match(dialog, /setConceptPreview\(item\)/);
  assert.match(dialog, /stopConceptPreview\(\)/);
  assert.match(preview, /visibilitychange/);
  assert.match(preview, /next==='action'/);
  assert.match(preview, /key==='rest'/);
  assert.match(html, /id="concept-preview-panel"/);
  assert.match(html, /id="concept-preview-action"/);
  assert.match(html, /id="concept-preview-rest"/);
  assert.match(get('src/catalog.js'), /animatedPreviews\[id\]/);
});


test('homepage displays sleeping and full combat showcases which autoplay with no Play buttons', () => {
  assert.match(html, /id="demo-sleep-token"[^>]+human-fighter-sleep\.svg/);
  assert.match(html, /id="demo-token"[^>]+human-fighter-showcase\.svg/);
  assert.match(html, /Sleep · repeats automatically/);
  assert.match(html, /Idle → Move → Attack → Recover · repeats/);
  assert.doesNotMatch(html, /id="demo-toggle"|id="demo-rest-toggle"/);
  const sleep=get('assets/demos/human-fighter-sleep.svg');
  const showcase=get('assets/demos/human-fighter-showcase.svg');
  assert.match(sleep, /class="sleep-pose"/);
  assert.match(sleep, /sleep-letters/);
  assert.match(sleep, /gridborn-sleep-breathe 4\.8s/);
  assert.match(showcase, /gridborn-full-body 9s/);
  assert.match(showcase, /gridborn-full-weapon 9s/);
  assert.match(sleep, /infinite/);
  assert.match(showcase, /infinite/);
  assert.match(sleep, /prefers-reduced-motion:reduce/);
  assert.match(showcase, /prefers-reduced-motion:reduce/);
  assert.match(get('src/animation-demo.js'), /visibilitychange/);
  assert.match(get('src/animation-demo.js'), /userPaused/);
  assert.match(get('src/animation-demo.js'), /matchMedia/);
  assert.equal(existsSync(new URL('../assets/demos/human-fighter-sleep-still.svg',import.meta.url)),true);
});
