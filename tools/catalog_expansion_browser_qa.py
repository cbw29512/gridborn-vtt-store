"""Full Gridborn index QA: source catalog, profile shark, heroes and NPCs."""
import logging
from pathlib import Path
from playwright.sync_api import expect
LOG=logging.getLogger('gridborn.full-catalog')

def check_full_catalog(browser,origin,width,screenshots:Path):
    page=browser.new_page(viewport={'width':width,'height':850})
    errors=[]
    try:
        page.on('pageerror',lambda error:errors.append(str(error)))
        page.goto(origin,wait_until='load')
        expect(page.locator('#result-summary')).to_have_text('518 results found')
        page.locator('[data-category-link="Monsters"]').click()
        expect(page.locator('#result-summary')).to_have_text('336 results found')
        expect(page.locator('.product-card')).to_have_count(24)
        expect(page.locator('#primary-label')).to_have_text('Creature family')
        expect(page.locator('#secondary-label')).to_have_text('Challenge range')
        page.locator('#primary-filter').select_option('Dragon')
        page.locator('#secondary-filter').select_option('CR 17+')
        page.locator('#search').fill('Ancient Red Dragon')
        expect(page.locator('#result-summary')).to_have_text('1 result found')
        page.get_by_role('button',name='View concept details for Ancient Red Dragon').click()
        facts=page.locator('#preview-facts').inner_text()
        assert 'Challenge rating (source)' in facts and '24' in facts
        assert 'side/profile' in facts
        assert 'Artwork status' in facts and 'Not produced' in facts
        page.keyboard.press('Escape')
        page.locator('[data-category-link="Animals"]').click()
        page.locator('#primary-filter').select_option('Ocean')
        page.locator('#secondary-filter').select_option('Sharks')
        expect(page.locator('#result-summary')).to_have_text('2 results found')
        shark=page.locator('.product-art[src$="great-white-shark.svg"]')
        expect(shark).to_be_visible()
        page.wait_for_function('(img)=>img.complete && img.naturalWidth>0',
            arg=shark.element_handle(),timeout=7000)
        shark.screenshot(path=str(screenshots/f'gridborn-profile-shark-{width}px.png'))
        page.get_by_role('button',name='View concept details for Great White Shark').click()
        assert page.locator('#concept-preview-image').get_attribute('src').endswith('great-white-shark.svg')
        page.keyboard.press('Escape')
        page.locator('[data-category-link="NPCs"]').click()
        expect(page.locator('#result-summary')).to_have_text('56 results found')
        page.locator('#search').fill('Blacksmith')
        expect(page.locator('#result-summary')).to_have_text('5 results found')
        page.locator('[data-category-link="Characters"]').click()
        expect(page.locator('#result-summary')).to_have_text('116 results found')
        page.locator('#search').fill('Nonbinary')
        expect(page.locator('#result-summary')).to_have_text('36 results found')
        assert page.locator('.customize-link[href*="pregen-"]').count()>=1
        # Verify at least one authored class concept can load the editable studio.
        href=page.locator('.customize-link[href*="pregen-"]').first.get_attribute('href')
        assert href and 'pregen-' in href
        page.goto(origin+href.lstrip('./'),wait_until='load')
        expect(page.locator('#builder-avatar svg')).to_be_visible()
        assert 'Class concept loaded' in page.locator('#builder-status').inner_text()
        overflow=page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
        assert overflow<=1,f'Expanded catalog/builder overflow {width}px: {overflow}'
        assert not errors,'; '.join(errors)
        LOG.info('PASS expanded catalog and profile shark at %spx',width)
    except Exception:
        LOG.exception('Expanded catalog failed at %spx',width)
        raise
    finally:
        page.close()
