"""Visible equal-card layout contract and original new token appearance, across widths."""
import logging
import re
from pathlib import Path
from playwright.sync_api import expect
LOG=logging.getLogger('gridborn.card-consistency')

TARGETS=[
 ('Dwarven Cleric','chr-clr-dwarf','dwarven-cleric'),
 ('Human Mercywarden Cleric · Female','pregen-cleric-female-2','human-mercywarden-female'),
 ('Human Shadowstep Rogue · Nonbinary','pregen-rogue-nonbinary-1','human-shadowstep-nonbinary'),
 ('Cave Ogre','mon-cave-ogre','cave-ogre')
]

def verify_aligned_cards(page,width):
    cards=page.locator('.product-card')
    expect(cards).to_have_count(8)
    metrics=cards.evaluate_all("""nodes => nodes.map(card => {
      const box=el=>{const r=el.getBoundingClientRect();
        return {x:r.x,y:r.y,w:r.width,h:r.height,b:r.bottom}};
      const find=s=>box(card.querySelector(s));
      return {card:box(card),visual:find('.product-visual'),
        title:find('.product-name'),custom:find('.product-customize-slot'),
        details:find('.details-button'),bundle:find('.product-bundle-add'),
        foot:find('.product-foot')};
    })""")
    assert len(metrics)==8
    row_groups={}
    for m in metrics:
        key=round(m['card']['y'])
        row_groups.setdefault(key,[]).append(m)
        assert abs(m['visual']['h']-(144 if width<=460 else 180))<=1
        assert m['card']['h']>290
        assert m['details']['h']>=44
        assert m['bundle']['h']>=40
        assert abs(m['foot']['b']-m['card']['b'])<=22,'Footer must anchor card bottom'
    assert len(row_groups)>1,'Expected multiple rows of cards'
    expected_cols=4 if width>=981 else 2
    for row in row_groups.values():
        assert len(row)==expected_cols,(width,len(row))
        baseline=row[0]
        for m in row[1:]:
            for key in ('card','visual','title','custom','details','bundle','foot'):
                assert abs(m[key]['y']-baseline[key]['y'])<=2,(
                    width,key,'Uneven vertical alignment across grid')
                assert abs(m[key]['h']-baseline[key]['h'])<=2,(
                    width,key,'Unequal rows or image frame heights')
            assert abs(m['card']['w']-baseline['card']['w'])<=2
    sorted_rows=sorted(row_groups)
    assert sorted_rows==list(row_groups)
    assert page.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')<=1
    return metrics

def check_consistent_cards(browser,origin,width,screenshots:Path):
    page=browser.new_page(viewport={'width':width,'height':850})
    errors=[]
    try:
        page.on('pageerror',lambda error:errors.append(str(error)))
        page.goto(origin,wait_until='load')
        verify_aligned_cards(page,width)
        if width==1440:
            page.screenshot(path=str(screenshots/'gridborn-uniform-card-grid-desktop.png'),full_page=False)
        if width==320:
            page.screenshot(path=str(screenshots/'gridborn-uniform-card-grid-mobile.png'),full_page=False)
        for name,id,stem in TARGETS:
            page.locator('#search').fill(name)
            card=page.locator('.product-card[data-motion-id="'+id+'"]')
            expect(card).to_have_count(1)
            card.scroll_into_view_if_needed()
            expect(card.locator('.preview-label')).to_contain_text('MOVING ART STUDY')
            page.get_by_role('button',name='View concept details for '+name).click()
            expect(page.locator('#preview-title')).to_have_text(name)
            image=page.locator('#concept-preview-image')
            panel=page.locator('#concept-scale-panel')
            expect(panel).to_be_visible()
            for mode in ('idle','move','action','rest'):
                expect(page.locator('#concept-preview-'+mode)).to_be_visible()
            page.locator('#concept-preview-move').click()
            expect(image).to_have_attribute(
                'src',re.compile(re.escape(stem)+r'-move\.svg$'))
            page.wait_for_function('(img)=>img.complete && img.naturalWidth>0',
                arg=image.element_handle(),timeout=7000)
            for px in (128,64,32):
                tile=page.locator('#concept-scale-'+str(px))
                expect(tile).to_have_attribute(
                    'src',re.compile(re.escape(stem)+r'-move\.svg$'))
                assert abs(tile.bounding_box()['width']-px)<=1
            if width==1440:
                before=image.screenshot()
                page.wait_for_timeout(400)
                assert image.screenshot()!=before,name+' should actually move'
            page.locator('#concept-preview-action').click()
            expect(image).to_have_attribute('src',re.compile(re.escape(stem)+r'-attack\.svg$'))
            expect(image).to_have_attribute(
                'src',re.compile(re.escape(stem)+r'-idle\.svg$'),timeout=3500)
            page.locator('#concept-preview-rest').click()
            expect(image).to_have_attribute('src',re.compile(re.escape(stem)+r'-rest\.svg$'))
            if width==1440:
                page.screenshot(path=str(screenshots/('gridborn-new-'+id+'.png')))
            page.keyboard.press('Escape')
            expect(page.locator('#preview-dialog')).to_be_hidden()
        assert not errors,';'.join(errors)
        LOG.info('PASS balanced %spx product cards and four new motion identities',width)
    finally:
        page.close()
