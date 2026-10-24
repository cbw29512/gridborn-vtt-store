"""Four new character/monster/ocean studies must actually move in browser previews."""
import re
import logging
from pathlib import Path
from playwright.sync_api import expect
LOG=logging.getLogger('gridborn.fourth-wave')
STUDIES=[
 ('Human Paladin','chr-pal-human','human-paladin'),
 ('Gnome Rogue','chr-rge-gnome','gnome-rogue'),
 ('Swamp Lizardfolk','mon-swamp-lizard','swamp-lizardfolk'),
 ('Great White Shark','ani-ocean-greatwhite','great-white-shark')
]
def check_wave_four(browser,origin,width,screenshots:Path):
 page=browser.new_page(viewport={'width':width,'height':850})
 errors=[]
 try:
  page.on('pageerror',lambda error:errors.append(str(error)))
  page.goto(origin,wait_until='load')
  for name,id,stem in STUDIES:
   page.locator('#search').fill(name)
   card=page.locator('.product-card[data-motion-id="'+id+'"]')
   expect(card).to_have_count(1)
   card.scroll_into_view_if_needed()
   expect(card.locator('.preview-label')).to_contain_text('IN MOTION')
   page.get_by_role('button',name='View concept details for '+name).click()
   expect(page.locator('#preview-title')).to_have_text(name)
   img=page.locator('#concept-preview-image')
   for mode in ('idle','move','action','rest'):
    expect(page.locator('#concept-preview-'+mode)).to_be_visible()
   expect(page.locator('#concept-scale-panel')).to_be_visible()
   page.locator('#concept-preview-move').click()
   expect(img).to_have_attribute('src',re.compile(re.escape(stem)+r'-move\.svg$'))
   page.wait_for_function('(i)=>i.complete && i.naturalWidth>0',
                          arg=img.element_handle(),timeout=6000)
   for px in (128,64,32):
    tile=page.locator('#concept-scale-'+str(px))
    expect(tile).to_have_attribute('src',re.compile(re.escape(stem)+r'-move\.svg$'))
    assert abs(tile.bounding_box()['width']-px)<=1
   if width==1440:
    tile=page.locator('#concept-scale-64')
    first=tile.screenshot()
    page.wait_for_timeout(430)
    second=tile.screenshot()
    assert first!=second,name+' must have moving silhouette at 64px'
    page.screenshot(path=str(screenshots/('gridborn-wave-four-'+id+'.png')))
   page.locator('#concept-preview-action').click()
   expect(img).to_have_attribute('src',re.compile(re.escape(stem)+r'-attack\.svg$'))
   expect(img).to_have_attribute('src',re.compile(re.escape(stem)+r'-idle\.svg$'),timeout=4000)
   page.locator('#concept-preview-rest').click()
   expect(img).to_have_attribute('src',re.compile(re.escape(stem)+r'-rest\.svg$'))
   page.keyboard.press('Escape')
   expect(page.locator('#preview-dialog')).to_be_hidden()
  assert page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')<=1
  assert not errors,'; '.join(errors)
  LOG.info('PASS four new original studies and 64px motion at %spx',width)
 finally:page.close()
