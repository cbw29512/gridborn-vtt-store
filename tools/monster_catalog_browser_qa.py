"""Regression: the user-shared Monsters page has one catalog, not a second dragon gallery."""
from playwright.sync_api import expect

def check_monster_catalog_no_duplicates(browser, origin, width, screenshots):
    page = browser.new_page(viewport={'width': width, 'height': 850})
    errors = []
    try:
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(origin + '?category=Monsters#catalog', wait_until='load')
        expect(page.locator('#result-summary')).to_have_text('336 results found')
        expect(page.locator('#featured-dragons')).to_have_count(0)
        expect(page.locator('#featured-dragons-grid')).to_have_count(0)
        expect(page.locator('#latest-previews')).to_be_hidden()
        expect(page.locator('#results .product-card')).to_have_count(24)
        dragons = page.locator('#results .product-card[data-motion-id^="mon-srd-52-young-"][data-motion-id$="-dragon"]')
        expect(dragons).to_have_count(10)
        ids = dragons.evaluate_all('cards=>cards.map(c=>c.dataset.motionId)')
        assert len(set(ids)) == 10, 'The ten Young Dragon catalog records must appear exactly once'
        assert page.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth') <= 1
        # A buyer can still search for the ten items in the one real catalog.
        page.locator('#search').fill('Young')
        expect(page.locator('#result-summary')).to_have_text('10 results found')
        expect(page.locator('#results .product-card')).to_have_count(10)
        expect(page.locator('#featured-dragons')).to_have_count(0)
        expect(page.locator('#results .product-card[data-motion-id^="mon-srd-52-young-"]')).to_have_count(10)
        assert not errors, errors
    finally:
        page.close()
