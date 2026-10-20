/**
 * End-to-end Chromium gate for layout, filters, browser navigation, animation
 * controls, product details and automatable WCAG A/AA violations.
 */
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseUrl = 'http://127.0.0.1:8765/';
const dimensions = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow', width: 320, height: 640 },
];

async function main() {
  let browser = null;
  try {
    browser = await chromium.launch({ headless: true });
    mkdirSync('browser-artifacts', { recursive: true });
    for (const size of dimensions) {
      const page = await browser.newPage({
        viewport: { width: size.width, height: size.height },
        reducedMotion: 'reduce', // Keep screenshots deterministic and confirm motion fallback.
      });
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));

      try {
        const response = await page.goto(baseUrl, { waitUntil: 'networkidle' });
        assert.equal(response?.status(), 200, size.name + ': site should respond');
        await page.locator('.product-card').first().waitFor();
        assert.equal(await page.locator('#result-summary').textContent(), '8 results found');
        const overflow = await page.evaluate(() =>
          document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert.ok(overflow <= 1, size.name + ': no horizontal overflow, measured ' + overflow);

        // Native link + URL routing -> changed category, dependent dropdowns and real results.
        await page.locator('[data-category-link="Animals"]').click();
        assert.equal(await page.locator('#category').inputValue(), 'Animals');
        assert.equal(await page.locator('#result-summary').textContent(), '10 results found');
        await page.locator('#primary-filter').selectOption('Ocean');
        await page.locator('#secondary-filter').selectOption('Sharks');
        assert.equal(await page.locator('#result-summary').textContent(), '2 results found');
        assert.deepEqual(await page.locator('.product-name').allTextContents(),
          ['Great White Shark', 'Reef Shark']);
        assert.match(page.url(), /secondary=Sharks/);

        await page.goBack({ waitUntil: 'domcontentloaded' });
        assert.equal(await page.locator('#secondary-filter').inputValue(), '');
        await page.reload({ waitUntil: 'networkidle' });
        assert.equal(await page.locator('#primary-filter').inputValue(), 'Ocean');

        // Concept modal: click, label, Escape, and focus returning to the invoking button.
        await page.locator('[data-category-link="Characters"]').click();
        await page.locator('#primary-filter').selectOption('Human');
        await page.locator('#secondary-filter').selectOption('Fighter');
        const trigger = page.getByRole('button', { name: 'View concept details for Human Fighter' });
        await trigger.click();
        assert.equal(await page.locator('#preview-dialog').evaluate(el=>el.open), true);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#preview-dialog').evaluate(el=>el.open), false);
        assert.equal(await trigger.evaluate(el => document.activeElement === el), true);

        // Animation never autoplays; user can start and stop it.
        assert.equal(await page.locator('#demo-toggle').getAttribute('aria-pressed'), 'false');
        await page.locator('#demo-toggle').click();
        assert.equal(await page.locator('#demo-toggle').getAttribute('aria-pressed'), 'true');
        assert.match(await page.locator('#demo-token').getAttribute('src'), /loop\.svg/);
        await page.locator('#demo-toggle').click();
        assert.equal(await page.locator('#demo-toggle').getAttribute('aria-pressed'), 'false');

        // Automated accessibility checks do not replace manual screen-reader testing.
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
        if (result.violations.length) {
          for (const issue of result.violations) {
            console.error(size.name + ': ' + issue.id + ' (' + issue.impact + ')',
              issue.nodes.map(node=>node.target.join(' ')).join(', '));
          }
        }
        assert.equal(result.violations.length, 0, size.name + ': automated WCAG findings');
        assert.deepEqual(pageErrors, [], size.name + ': no uncaught browser errors');
        await page.screenshot({path:'browser-artifacts/gridborn-' + size.name + '.png',fullPage:true});
        console.log('PASS ' + size.name + ': responsive layout, filters, modal, animation, accessibility');
      } finally {
        await page.close();
      }
    }
  } catch (error) {
    console.error('Gridborn Chromium smoke verification failed:', error);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
}
await main();
