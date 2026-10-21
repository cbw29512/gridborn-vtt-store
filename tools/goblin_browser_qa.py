"""Live Chromium QA for Cave Goblin's individual motion studies."""
import logging
from pathlib import Path
from playwright.sync_api import expect

LOG=logging.getLogger('gridborn.goblin-browser')

def check_goblin(browser,origin,width,screenshots:Path):
    page=browser.new_page(viewport={'width':width,'height':850})
    errors=[]
    try:
        page.on('pageerror',lambda error:errors.append(str(error)))
        page.goto(origin,wait_until='load')
        page.locator('#search').fill('Cave Goblin')
        button=page.get_by_role('button',name='View concept details for Cave Goblin')
        button.click()
        expect(page.locator('#preview-title')).to_have_text('Cave Goblin')
        image=page.locator('#concept-preview-image')
        assert image.get_attribute('src').endswith('cave-goblin.svg')
        for mode in ('idle','move','action','rest'):
            expect(page.locator('#concept-preview-'+mode)).to_be_visible()
        page.locator('#concept-preview-idle').click()
        expect(page.locator('#concept-preview-status')).to_contain_text('breathing and blinking')
        assert image.get_attribute('src').endswith('cave-goblin-idle.svg')
        page.wait_for_function('(node) => node.complete && node.naturalWidth > 0',
            arg=image.element_handle(),timeout=6000)
        page.locator('#concept-preview-move').click()
        expect(page.locator('#concept-preview-status')).to_contain_text('alternating goblin leg stride')
        assert image.get_attribute('src').endswith('cave-goblin-move.svg')
        page.wait_for_function('(node) => node.complete && node.naturalWidth > 0',
            arg=image.element_handle(),timeout=6000)
        before=image.screenshot()
        page.wait_for_timeout(400)
        after=image.screenshot()
        assert before != after,'Goblin Move must produce visible articulated motion'
        page.locator('#concept-preview-action').click()
        expect(page.locator('#concept-preview-status')).to_contain_text('one curved blade strike')
        assert image.get_attribute('src').endswith('cave-goblin-attack.svg')
        expect(page.locator('#concept-preview-status')).to_contain_text(
            'breathing and blinking',timeout=4000)
        assert image.get_attribute('src').endswith('cave-goblin-idle.svg')
        page.locator('#concept-preview-rest').click()
        assert image.get_attribute('src').endswith('cave-goblin-rest.svg')
        page.wait_for_function('(node) => node.complete && node.naturalWidth > 0',
            arg=image.element_handle(),timeout=6000)
        page.screenshot(path=str(screenshots/f'gridborn-goblin-rest-{width}px.png'))
        page.keyboard.press('Escape')
        expect(page.locator('#preview-dialog')).to_be_hidden()
        expect(button).to_be_focused()
        assert not errors,';'.join(errors)
        LOG.info('PASS Goblin independent Idle/Move/Attack/Rest at %spx',width)
    except Exception:
        LOG.exception('Goblin Chromium QA failed at %spx',width)
        raise
    finally:
        page.close()
