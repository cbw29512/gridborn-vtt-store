"""Check the private-facing asset production board across screen widths."""
import logging
from pathlib import Path
from playwright.sync_api import expect

LOG=logging.getLogger('gridborn.production-browser')

def check_production(browser,origin,width,screenshots:Path):
    page=browser.new_page(viewport={'width':width,'height':850})
    errors=[]
    try:
        page.on('pageerror',lambda error: errors.append(str(error)))
        page.goto(origin+'production.html',wait_until='load')
        expect(page.locator('#production-count')).to_have_text('24 designs shown · No finished products')
        expect(page.locator('#planned-count')).to_have_text('24')
        expect(page.locator('#complete-count')).to_have_text('0')
        expect(page.locator('.production-card')).to_have_count(24)
        expect(page.get_by_role('heading',name='Human Fighter')).to_be_visible()
        page.locator('#production-category').select_option('monsters')
        expect(page.locator('.production-card')).to_have_count(12)
        page.locator('#production-search').fill('eight countable')
        expect(page.locator('.production-card')).to_have_count(1)
        expect(page.locator('.production-card h3')).to_have_text('Giant Cave Spider')
        page.locator('#production-search').fill('')
        page.locator('#production-status').select_option('animated-study')
        expect(page.locator('.production-card')).to_have_count(1)
        expect(page.locator('.production-card h3')).to_have_text('Cave Goblin')
        page.locator('#production-category').select_option('heroes')
        expect(page.locator('.production-card h3')).to_have_text('Human Fighter')
        page.locator('#production-status').select_option('all')
        expect(page.locator('.production-card')).to_have_count(12)
        overflow=page.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
        assert overflow<=1,f'Production board overflow at {width}px: {overflow}'
        page.screenshot(path=str(screenshots/f'gridborn-production-{width}px.png'))
        assert not errors,f'Production board JS errors: {errors}'
        LOG.info('PASS production board Chromium %spx',width)
    except Exception:
        LOG.exception('Production board failed at %spx',width)
        raise
    finally:
        page.close()
