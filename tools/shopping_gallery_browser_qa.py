"""Validate one polished selling gallery, illustrated-only filtering and accessible artwork."""
from playwright.sync_api import expect

def check_shopping_gallery(browser,origin,width,screenshots):
    page=browser.new_page(viewport={'width':width,'height':850})
    errors=[]
    try:
        page.on('pageerror',lambda exc:errors.append(str(exc)))
        page.goto(origin,wait_until='load')
        expect(page.locator('#result-summary')).to_have_text('518 results found')
        expect(page.locator('#animated-only-toggle')).to_have_attribute('aria-pressed','false')
        assert page.locator('.product-grid').count()==1
        expect(page.locator('.product-card')).to_have_count(8)
        first=page.locator('.product-card').first
        art=first.locator('button.product-visual')
        expect(art).to_be_visible()
        assert art.get_attribute('aria-label').startswith('Explore ')
        art.click()
        expect(page.locator('#preview-dialog')).to_be_visible()
        page.keyboard.press('Escape')
        expect(page.locator('#preview-dialog')).to_be_hidden()
        page.locator('#animated-only-toggle').click()
        expect(page.locator('#animated-only-toggle')).to_have_attribute('aria-pressed','true')
        expect(page.locator('#result-summary')).to_have_text('46 results found')
        assert page.locator('#results .product-card:not([data-motion-id])').count()==0
        page.locator('[data-category-link="Monsters"]').click()
        expect(page.locator('#result-summary')).to_have_text('19 results found')
        expect(page.locator('#results .product-card')).to_have_count(16)
        expect(page.locator('#results .product-card[data-motion-id^="mon-srd-52-young-"]')).to_have_count(10)
        page.locator('#animated-only-toggle').click()
        expect(page.locator('#result-summary')).to_have_text('336 results found')
        expect(page.locator('#animated-only-toggle')).to_have_attribute('aria-pressed','false')
        assert page.locator('.product-grid').count()==1
        ids=page.locator('#results .product-card').evaluate_all('cards=>cards.map(c=>c.dataset.productId)')
        assert len(ids)==len(set(ids)) and all(ids)
        assert page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')<=1
        if width==1440:
            page.screenshot(path=str(screenshots/'gridborn-polished-gallery-desktop.png'),full_page=False)
        if width==320:
            page.screenshot(path=str(screenshots/'gridborn-polished-gallery-mobile.png'),full_page=False)
        assert not errors,errors
    finally:
        page.close()
