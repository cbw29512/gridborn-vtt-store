"""Confirm token motion is visible on product cards without opening detail windows."""
import logging
import re
from pathlib import Path
from playwright.sync_api import expect
LOG=logging.getLogger('gridborn.catalog-motion')

def check_catalog_motion(browser,origin,width,screenshots:Path):
    page=browser.new_page(viewport={'width':width,'height':850})
    errors=[]
    try:
        page.on('pageerror',lambda exc:errors.append(str(exc)))
        page.goto(origin,wait_until='load')
        expect(page.locator('#catalog-motion-toggle')).to_be_visible() if width==1440 else None
        assert page.locator('.product-card[data-motion-id]').count()==8, (
            'The first eight catalog cards should all show actual motion')
        expect(page.locator('.product-card').first).to_have_attribute(
            'data-motion-id',re.compile(r'chr-ftr-human|chr-wiz-elf|pregen-barbarian-male-3|mon-dng-armor|mon-cave-goblin|ani-forest-wolf|mon-cave-spider|mon-dng-skeleton'))
        page.locator('#show-more').click()
        assert page.locator('.product-card[data-motion-id]').count()==16, (
            'Show more must reveal all sixteen full-motion studies')
        # Third page contains the new Ranger: 17 source-backed motion cards.
        page.locator('#show-more').click()
        assert page.locator('.product-card[data-motion-id]').count() == 24, (
            'All 24 noncommercial motion studies must be shown')
        # Re-render one original creature into view to start its first Idle phase.
        page.locator('#search').fill('Gray Wolf')
        card=page.locator('.product-card[data-motion-id="ani-forest-wolf"]')
        expect(card).to_have_count(1)
        card.scroll_into_view_if_needed()
        img=card.locator('img.product-art')
        stage=card.locator('.product-motion-stage')
        expect(stage).to_contain_text('IDLE',timeout=4500)
        expect(img).to_have_attribute('src',re.compile(r'.*gray-wolf-idle\.svg'))
        page.wait_for_function('(img)=>img.complete && img.naturalWidth>0',
            arg=img.element_handle(),timeout=6500)
        expect(stage).to_contain_text('MOVE',timeout=4500)
        expect(img).to_have_attribute('src',re.compile(r'.*gray-wolf-move\.svg'))
        if width==1440:
            frame_one=img.screenshot()
            page.wait_for_timeout(420)
            frame_two=img.screenshot()
            assert frame_one!=frame_two,'Visible catalog Wolf must show actual motion'
            expect(stage).to_contain_text('ATTACK',timeout=4200)
            expect(img).to_have_attribute('src',re.compile(r'.*gray-wolf-attack\.svg'))
            expect(stage).to_contain_text('REST',timeout=3500)
            expect(img).to_have_attribute('src',re.compile(r'.*gray-wolf-rest\.svg'))
            page.screenshot(path=str(screenshots/'gridborn-catalog-wolf-autoplay.png'))
        pause=page.locator('#catalog-motion-toggle')
        pause.click()
        expect(pause).to_have_attribute('aria-pressed','true')
        expect(stage).to_contain_text('PAUSED')
        expect(img).to_have_attribute('src',re.compile(r'.*gray-wolf\.svg'))
        # No animation may resume while paused, even after a filtered re-render.
        page.locator('#search').fill('Cave Goblin')
        goblin=page.locator('.product-card[data-motion-id="mon-cave-goblin"]')
        goblin.scroll_into_view_if_needed()
        expect(goblin.locator('.product-motion-stage')).to_contain_text('PAUSED')
        expect(goblin.locator('img.product-art')).to_have_attribute(
            'src',re.compile(r'.*assets/studies/cave-goblin\.svg'))
        pause.click()
        goblin.scroll_into_view_if_needed()
        expect(goblin.locator('.product-motion-stage')).to_contain_text('IDLE',timeout=4500)
        expect(goblin.locator('img.product-art')).to_have_attribute(
            'src',re.compile(r'.*assets/demos/cave-goblin-idle\.svg'))
        # A newly produced Skeleton must autoplay all four real studies.
        page.locator('#search').fill('Skeleton Warrior')
        skeleton=page.locator('.product-card[data-motion-id="mon-dng-skeleton"]')
        expect(skeleton).to_have_count(1)
        skeleton.scroll_into_view_if_needed()
        sk_image=skeleton.locator('img.product-art')
        sk_stage=skeleton.locator('.product-motion-stage')
        expect(sk_stage).to_contain_text('IDLE',timeout=5000)
        expect(sk_image).to_have_attribute(
            'src',re.compile(r'.*skeleton-warrior-idle\.svg'))
        if width==1440:
            expect(sk_stage).to_contain_text('MOVE',timeout=5000)
            expect(sk_image).to_have_attribute(
                'src',re.compile(r'.*skeleton-warrior-move\.svg'))
            expect(sk_stage).to_contain_text('ATTACK',timeout=5000)
            expect(sk_stage).to_contain_text('REST',timeout=4000)
            expect(sk_image).to_have_attribute(
                'src',re.compile(r'.*skeleton-warrior-rest\.svg'))
            page.screenshot(path=str(screenshots/'gridborn-skeleton-rest-catalog.png'))
        page.get_by_role('button',name='View concept details for Skeleton Warrior').click()
        for state in ('idle','move','action','rest'):
            expect(page.locator('#concept-preview-'+state)).to_be_visible()
        page.locator('#concept-preview-rest').click()
        expect(page.locator('#concept-preview-image')).to_have_attribute(
            'src',re.compile(r'.*skeleton-warrior-rest\.svg'))
        page.keyboard.press('Escape')
        expect(page.locator('#preview-dialog')).to_be_hidden()
        # New Shark is a real motion study, with all states, not static art.
        page.locator('#search').fill('Great White Shark')
        shark=page.locator('.product-card[data-motion-id="ani-ocean-greatwhite"]')
        expect(shark).to_have_count(1)
        shark.scroll_into_view_if_needed()
        expect(shark.locator('.product-motion-stage')).to_contain_text('IDLE',timeout=4500)
        expect(shark.locator('img.product-art')).to_have_attribute(
            'src',re.compile(r'.*assets/demos/great-white-shark-idle\.svg'))
        # Original Orc Barbarian remains static until it has its own full set.
        page.locator('#search').fill('Orc Barbarian')
        plain=page.locator('.product-card').filter(
            has=page.get_by_text('Orc Barbarian',exact=True))
        expect(plain).to_have_count(1)
        expect(plain.locator('.product-motion-stage')).to_have_count(0)
        expect(plain.locator('img.product-art')).to_have_attribute(
            'src',re.compile(r'.*assets/studies/orc-barbarian\.svg'))
        assert not errors,'; '.join(errors)
        LOG.info('PASS token card autoplay and controls at %spx',width)
    finally:
        page.close()

def check_reduced_motion(browser,origin):
    context=browser.new_context(viewport={'width':390,'height':800},reduced_motion='reduce')
    page=context.new_page()
    try:
        page.goto(origin,wait_until='load')
        page.locator('#search').fill('Gray Wolf')
        card=page.locator('.product-card[data-motion-id="ani-forest-wolf"]')
        card.scroll_into_view_if_needed()
        expect(card.locator('.product-motion-stage')).to_contain_text('STILL · reduced motion')
        expect(card.locator('img.product-art')).to_have_attribute(
            'src',re.compile(r'.*assets/studies/gray-wolf\.svg'))
        expect(page.locator('#catalog-motion-toggle')).to_be_disabled()
        page.wait_for_timeout(2900)
        expect(card.locator('img.product-art')).to_have_attribute(
            'src',re.compile(r'.*assets/studies/gray-wolf\.svg'))
        LOG.info('PASS reduced-motion static fallback')
    finally:
        context.close()
