"""Actual 320/390/1440 Chromium check of the user-supplied Monsters landing route."""
from playwright.sync_api import expect

def check_featured_dragons(browser,origin,width,screenshots):
    page=browser.new_page(viewport={'width':width,'height':850})
    errors=[]
    try:
        page.on('pageerror',lambda error: errors.append(str(error)))
        page.goto(origin+'?category=Monsters#catalog',wait_until='load')
        expect(page.locator('#featured-dragons')).to_be_visible()
        expect(page.locator('#featured-dragons-grid .featured-dragon-card')).to_have_count(10)
        expect(page.locator('#result-summary')).to_have_text('337 results found')
        assert page.locator('#featured-dragons').bounding_box()['y'] < page.locator('#results').bounding_box()['y']
        images=page.locator('#featured-dragons-grid .featured-dragon-art')
        for i in range(10):
            image=images.nth(i)
            page.wait_for_function('(img)=>img.complete && img.naturalWidth > 0',
                arg=image.element_handle(),timeout=10000)
        assert all(path.endswith('-idle.svg') for path in images.evaluate_all(
            'images=>images.map(img=>new URL(img.src).pathname)'))
        assert page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')<=1
        page.get_by_role('link',name='Young Gold Dragon Animated art study · view all 4 states').click()
        expect(page.locator('#featured-dragons')).to_be_hidden()
        expect(page.locator('#result-summary')).to_have_text('1 result found')
        expect(page.locator('.product-card[data-motion-id="mon-srd-52-young-gold-dragon"]')).to_have_count(1)
        assert not errors,errors
    finally:
        page.close()
