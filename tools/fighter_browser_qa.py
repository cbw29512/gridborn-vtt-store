"""Chromium verification that the real Fighter product dialog shows source-exact states."""
import logging
from pathlib import Path
from playwright.sync_api import expect

LOG=logging.getLogger("gridborn.fighter-browser")

def check_fighter(browser,origin,width,screenshots:Path):
    page=browser.new_page(viewport={"width":width,"height":850})
    errors=[]
    try:
        page.on("pageerror",lambda error:errors.append(str(error)))
        page.goto(origin,wait_until="load")
        page.locator("#search").fill("Human Fighter")
        details=page.get_by_role("button",name="View concept details for Human Fighter")
        details.click()
        expect(page.locator("#preview-title")).to_have_text("Human Fighter")
        img=page.locator("#concept-preview-image")
        assert img.get_attribute("src").endswith("human-fighter-still.svg")
        for state in ("idle","move","action","rest"):
            expect(page.locator("#concept-preview-"+state)).to_be_visible()
        page.locator("#concept-preview-idle").click()
        expect(page.locator("#concept-preview-status")).to_contain_text("shield and cape breathing")
        assert img.get_attribute("src").endswith("human-fighter-idle.svg")
        page.wait_for_function("(node) => node.complete && node.naturalWidth > 0",
            arg=img.element_handle(),timeout=6000)
        page.locator("#concept-preview-move").click()
        expect(page.locator("#concept-preview-status")).to_contain_text("alternating armored footsteps")
        assert img.get_attribute("src").endswith("human-fighter-move.svg")
        page.wait_for_function("(node) => node.complete && node.naturalWidth > 0",
            arg=img.element_handle(),timeout=6000)
        before=img.screenshot()
        page.wait_for_timeout(425)
        after=img.screenshot()
        assert before!=after,"Fighter Move should articulate its feet and equipment"
        page.locator("#concept-preview-action").click()
        expect(page.locator("#concept-preview-status")).to_contain_text("single guarded sword strike")
        assert img.get_attribute("src").endswith("human-fighter-attack.svg")
        expect(page.locator("#concept-preview-status")).to_contain_text(
            "shield and cape breathing",timeout=4200)
        assert img.get_attribute("src").endswith("human-fighter-idle.svg")
        page.locator("#concept-preview-rest").click()
        assert img.get_attribute("src").endswith("human-fighter-rest.svg")
        page.wait_for_function("(node) => node.complete && node.naturalWidth > 0",
            arg=img.element_handle(),timeout=6000)
        page.screenshot(path=str(screenshots/f"gridborn-fighter-rest-{width}px.png"))
        page.keyboard.press("Escape")
        expect(page.locator("#preview-dialog")).to_be_hidden()
        expect(details).to_be_focused()
        assert not errors,";".join(errors)
        LOG.info("PASS Fighter four-state preview at %spx",width)
    except Exception:
        LOG.exception("Fighter browser QA failed at %spx",width)
        raise
    finally:
        page.close()
