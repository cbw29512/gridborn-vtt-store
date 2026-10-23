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
        expect(page.locator('#result-summary')).to_have_text('336 results found')
        assert page.locator('#featured-dragons').bounding_box()['y'] < page.locator('#results').bounding_box()['y']
        images=page.locator('#featured-dragons-grid .featured-dragon-art')
        for i in range(10):
            image=images.nth(i)
            page.wait_for_function('(img)=>img.complete && img.naturalWidth > 0',
                arg=image.element_handle(),timeout=10000)
        # These are the real SVG state animations, not static idle thumbnails.
        expect(page.locator('#featured-dragons')).to_have_attribute(
            'data-featured-phase', __import__('re').compile('idle|move|action|rest'))
        assert all(path.endswith(('-idle.svg','-move.svg','-attack.svg','-rest.svg'))
                   for path in images.evaluate_all(
            'images=>images.map(img=>new URL(img.src).pathname)'))
        if width == 1440:
            page.wait_for_function(
                "() => document.querySelector('#featured-dragons').dataset.featuredPhase === 'action'",
                timeout=12000)
            assert page.locator('[data-dragon-id="mon-srd-52-young-gold-dragon"] img').get_attribute(
                'src').endswith('-attack.svg'), 'Must actually demonstrate breath attacks'
        assert page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')<=1
        page.locator('[data-dragon-id="mon-srd-52-young-gold-dragon"]').click()
        expect(page.locator('#featured-dragons')).to_be_hidden()
        expect(page.locator('#result-summary')).to_have_text('1 result found')
        expect(page.locator('.product-card[data-motion-id="mon-srd-52-young-gold-dragon"]')).to_have_count(1)
        if width==1440:
            calm=browser.new_page(viewport={'width':1440,'height':850},
                                  reduced_motion='reduce')
            try:
                calm.goto(origin+'?category=Monsters#catalog',wait_until='load')
                expect(calm.locator('#featured-dragons')).to_have_attribute('data-featured-phase','still')
                assert all('/assets/studies/dragon-young-' in path and path.endswith('.svg')
                           for path in calm.locator(
                    '.featured-dragon-art').evaluate_all(
                        'imgs=>imgs.map(img=>new URL(img.src).pathname)'))
            finally:
                calm.close()
        assert not errors,errors
    finally:
        page.close()
