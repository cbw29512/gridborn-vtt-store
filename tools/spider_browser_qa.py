"""Live eight-leg Spider animation and map-size checks for Gridborn preview."""
import logging
from pathlib import Path
from playwright.sync_api import expect
LOG=logging.getLogger('gridborn.spider-browser')

def check_spider(browser,origin,width,screenshots:Path):
    page=browser.new_page(viewport={'width':width,'height':850})
    errors=[]
    try:
        page.on('pageerror',lambda error:errors.append(str(error)))
        page.goto(origin,wait_until='load')
        page.locator('[data-category-link="Monsters"]').click()
        page.locator('#search').fill('Giant Cave Spider')
        expect(page.locator('.product-card')).to_have_count(1)
        page.get_by_role('button',name='View concept details for Giant Cave Spider').click()
        expect(page.locator('#preview-title')).to_have_text('Giant Cave Spider')
        expect(page.locator('#concept-preview-status')).to_contain_text('Static original')
        for key in ['idle','move','action','rest']:
            expect(page.locator('#concept-preview-'+key)).to_be_visible()
        art=page.locator('#concept-preview-image')
        page.locator('#concept-preview-move').click()
        expect(page.locator('#concept-preview-status')).to_contain_text('eight legs')
        assert art.get_attribute('src').endswith('giant-cave-spider-move.svg')
        page.wait_for_function('(node) => node.complete && node.naturalWidth > 0',
                               arg=art.element_handle(),timeout=6000)
        before=art.screenshot()
        page.wait_for_timeout(450)
        after=art.screenshot()
        assert before!=after,'Spider body and legs must animate visually'
        page.screenshot(path=str(screenshots/f'gridborn-spider-move-{width}px.png'))
        page.locator('#concept-preview-action').click()
        expect(page.locator('#concept-preview-status')).to_contain_text('single fang jab')
        expect(page.locator('#concept-preview-status')).to_contain_text('abdomen breathing',timeout=4200)
        assert art.get_attribute('src').endswith('giant-cave-spider-idle.svg')
        page.locator('#concept-preview-rest').click()
        expect(page.locator('#concept-preview-status')).to_contain_text('eight legs folded')
        assert art.get_attribute('src').endswith('giant-cave-spider-rest.svg')
        page.wait_for_function('(node) => node.complete && node.naturalWidth > 0',
                               arg=art.element_handle(),timeout=6000)
        page.screenshot(path=str(screenshots/f'gridborn-spider-rest-{width}px.png'))
        page.keyboard.press('Escape')
        expect(page.locator('#preview-dialog')).to_be_hidden()
        assert page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')<=1
        assert not errors,';'.join(errors)
        LOG.info('PASS Giant Cave Spider browser at %spx',width)
    except Exception:
        LOG.exception('Giant Cave Spider browser QA failed at %spx',width)
        raise
    finally:
        page.close()
