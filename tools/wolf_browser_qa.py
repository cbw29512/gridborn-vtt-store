"""Check live Wolf animation modes, one-shot bite and Dwarven Cleric art."""
import logging
from pathlib import Path
from playwright.sync_api import expect
LOG=logging.getLogger("gridborn.wolf-browser")

def check_wolf(browser,origin,width,screenshots:Path):
    page=browser.new_page(viewport={'width':width,'height':850})
    errors=[]
    try:
        page.on('pageerror',lambda err:errors.append(str(err)))
        page.goto(origin,wait_until='load')
        page.locator('[data-category-link="Animals"]').click()
        page.locator('#primary-filter').select_option('Forest')
        page.locator('#secondary-filter').select_option('Canines')
        wolf=page.get_by_role('button',name='View concept details for Gray Wolf')
        wolf.click()
        expect(page.locator('#preview-title')).to_have_text('Gray Wolf')
        for mode in ['idle','move','action','rest']:
            expect(page.locator('#concept-preview-'+mode)).to_be_visible()
        page.locator('#concept-preview-move').click()
        expect(page.locator('#concept-preview-status')).to_contain_text('four-legged trot')
        assert page.locator('#concept-preview-image').get_attribute('src').endswith('gray-wolf-move.svg')
        picture=page.locator('#concept-preview-image')
        page.wait_for_function('(node) => node.complete && node.naturalWidth > 0',
                               arg=picture.element_handle(), timeout=6000)
        first=picture.screenshot()
        page.wait_for_timeout(380)
        second=picture.screenshot()
        assert first!=second,'Wolf must have real articulated movement'
        page.locator('#concept-preview-action').click()
        expect(page.locator('#concept-preview-status')).to_contain_text('one bite')
        expect(page.locator('#concept-preview-status')).to_contain_text('breathing loop',timeout=4000)
        assert picture.get_attribute('src').endswith('gray-wolf-idle.svg')
        page.locator('#concept-preview-rest').click()
        expect(page.locator('#concept-preview-status')).to_contain_text('curled breathing')
        assert picture.get_attribute('src').endswith('gray-wolf-rest.svg')
        page.screenshot(path=str(screenshots/f'gridborn-wolf-rest-{width}px.png'))
        page.keyboard.press('Escape')
        expect(page.locator('#preview-dialog')).to_be_hidden()
        page.locator('[data-category-link="Characters"]').click()
        cleric=page.get_by_role('button',name='View concept details for Dwarven Cleric')
        cleric.click()
        expect(page.locator('#preview-title')).to_have_text('Dwarven Cleric')
        assert page.locator('#concept-preview-image').get_attribute('src').endswith('dwarven-cleric.svg')
        page.wait_for_function('(node) => node.complete && node.naturalWidth > 0',
                               arg=page.locator('#concept-preview-image').element_handle(), timeout=6000)
        expect(page.locator('#concept-preview-controls')).to_be_visible()
        for mode in ('idle','move','action','rest'):
            expect(page.locator('#concept-preview-'+mode)).to_be_visible()
        page.locator('#concept-preview-move').click()
        assert page.locator('#concept-preview-image').get_attribute('src').endswith('dwarven-cleric-move.svg')
        page.locator('#concept-preview-rest').click()
        assert page.locator('#concept-preview-image').get_attribute('src').endswith('dwarven-cleric-rest.svg')
        page.screenshot(path=str(screenshots/f'gridborn-dwarf-cleric-{width}px.png'))
        page.keyboard.press('Escape')
        paladin=page.get_by_role('button',name='View concept details for Human Paladin')
        paladin.click()
        expect(page.locator('#preview-title')).to_have_text('Human Paladin')
        assert page.locator('#concept-preview-image').get_attribute('src').endswith('human-paladin.svg')
        page.wait_for_function('(node) => node.complete && node.naturalWidth > 0',
                               arg=page.locator('#concept-preview-image').element_handle(), timeout=6000)
        page.screenshot(path=str(screenshots/f'gridborn-paladin-{width}px.png'))
        page.keyboard.press('Escape')
        width_over=page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
        assert width_over<=1,f'New previews cause horizontal overflow: {width_over}'
        assert not errors,'; '.join(errors)
        LOG.info('PASS Wolf and Cleric Chromium %spx',width)
    except Exception:
        LOG.exception('Wolf/Cleric browser QA failure at %spx',width)
        raise
    finally:
        page.close()
