"""Character, pregen and monster full-motion public QA on all supported viewports."""
import logging
import re
from pathlib import Path
from playwright.sync_api import expect
LOG=logging.getLogger('gridborn.wave-two-browser')
TARGETS=[
 ('Elven Wizard','chr-wiz-elf','elven-wizard'),
 ('Orc Axe Vanguard Barbarian · Male','pregen-barbarian-male-3','orc-axe-vanguard-pregen'),
 ('Animated Armor','mon-dng-armor','animated-armor')
]

def check_wave_two(browser,origin,width,screenshots:Path):
 page=browser.new_page(viewport={'width':width,'height':850})
 errors=[]
 try:
  page.on('pageerror',lambda error:errors.append(str(error)))
  page.goto(origin,wait_until='load')
  for name,identity,stem in TARGETS:
   page.locator('#search').fill(name)
   card=page.locator('.product-card[data-motion-id="'+identity+'"]')
   expect(card).to_have_count(1)
   card.scroll_into_view_if_needed()
   assert card.locator('.product-motion-stage').count()==1
   expect(card.locator('.preview-label')).to_contain_text('MOVING ART STUDY')
   page.get_by_role('button',name='View concept details for '+name).click()
   expect(page.locator('#preview-title')).to_have_text(name)
   image=page.locator('#concept-preview-image')
   scale=page.locator('#concept-scale-panel')
   expect(scale).to_be_visible()
   for state in ('idle','move','action','rest'):
    expect(page.locator('#concept-preview-'+state)).to_be_visible()
   page.locator('#concept-preview-move').click()
   expect(image).to_have_attribute('src',re.compile(re.escape(stem)+'-move\\.svg$'))
   page.wait_for_function('(img)=>img.complete && img.naturalWidth > 0',
                          arg=image.element_handle(),timeout=6500)
   for pixels in (128,64,32):
    tile=page.locator('#concept-scale-'+str(pixels))
    expect(tile).to_have_attribute('src',re.compile(re.escape(stem)+'-move\\.svg$'))
    assert tile.bounding_box()['width']==pixels
   if width==1440:
    frame=image.screenshot()
    page.wait_for_timeout(430)
    assert image.screenshot()!=frame,name+' Move must visibly animate'
   page.locator('#concept-preview-action').click()
   expect(image).to_have_attribute('src',re.compile(re.escape(stem)+'-attack\\.svg$'))
   expect(image).to_have_attribute('src',re.compile(re.escape(stem)+'-idle\\.svg$'),timeout=3500)
   page.locator('#concept-preview-rest').click()
   expect(image).to_have_attribute('src',re.compile(re.escape(stem)+'-rest\\.svg$'))
   if width==1440:
    page.screenshot(path=str(screenshots/('gridborn-wave-two-'+identity+'.png')))
   page.keyboard.press('Escape')
   expect(page.locator('#preview-dialog')).to_be_hidden()
  assert page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')<=1
  assert not errors,'; '.join(errors)
  LOG.info('PASS three complete new token motions at %spx',width)
 finally:
  page.close()
