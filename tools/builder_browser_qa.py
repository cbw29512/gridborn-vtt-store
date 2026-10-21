"""Real Chrome check for Gridborn modular token builder on three viewports."""
import logging
from pathlib import Path
from playwright.sync_api import expect

LOG=logging.getLogger("gridborn.builder-browser")
def check_builder(browser,origin,width,screenshots:Path):
    page=browser.new_page(viewport={"width":width,"height":850},accept_downloads=True)
    errors=[]
    try:
        page.on("pageerror",lambda error: errors.append(str(error)))
        page.goto(origin+"builder.html",wait_until="load")
        expect(page.locator("#builder-title")).to_contain_text("Build someone")
        assert page.locator("#builder-presets button").count()==6
        assert page.locator("#builder-parts select").count()==7
        assert page.locator("#builder-palettes button").count()==6
        assert page.locator("#builder-avatar svg").count()==1
        expect(page.locator("#builder-summary")).to_contain_text("Human")
        page.locator('[data-preset="mon-cave-goblin"]').click()
        expect(page.locator("#builder-summary")).to_contain_text("Goblin")
        page.locator("#part-weapon").select_option("Bow")
        assert page.locator("#part-weapon").input_value()=="Bow"
        assert page.locator("#builder-avatar svg").count()==1
        page.locator('[data-palette="shadow"]').click()
        expect(page.locator('[data-palette="shadow"]')).to_have_attribute("aria-pressed","true")
        page.locator('#builder-modes button[data-mode="move"]').click()
        expect(page.locator("#builder-avatar svg")).to_have_class("rig-image mode-move rig-animated")
        motion = page.evaluate("""() => {
          const style = selector => getComputedStyle(document.querySelector('#builder-avatar '+selector)).animationName;
          return [style('.rig-leg-left'),style('.rig-leg-right'),
            style('.rig-arm-left'),style('.rig-arm-right'),style('.rig-cape')];
        }""")
        assert motion == ["gb-left-stride","gb-right-stride","gb-right-stride",
                          "gb-left-stride","gb-walk-cape"], f"Rig motion not articulated: {motion}"
        expect(page.locator("#builder-stage")).to_have_attribute("data-mode", "move")
        page.locator('#builder-modes button[data-mode="rest"]').click()
        expect(page.locator(".rig-rest-seat")).to_have_count(1)
        expect(page.locator(".rig-legs-rest")).to_have_count(1)
        expect(page.locator("#builder-status")).to_contain_text("seated posture")
        expect(page.locator("#builder-stage")).to_have_attribute("data-mode", "rest")
        assert page.locator(".stage-campfire").evaluate(
            "(node) => getComputedStyle(node).display") != "none"
        page.screenshot(path=str(screenshots/f"gridborn-rest-{width}px.png"))
        page.locator('#builder-modes button[data-mode="attack"]').click()
        expect(page.locator('#builder-modes button[data-mode="attack"]')).to_have_attribute("aria-pressed","true")
        expect(page.locator("#builder-status")).to_contain_text("plays once")
        expect(page.locator('#builder-modes button[data-mode="idle"]')).to_have_attribute("aria-pressed","true",timeout=4000)
        expect(page.locator("#builder-status")).to_contain_text("returned to Idle")
        page.locator('[data-bg="light"]').click()
        assert page.locator("#builder-stage").get_attribute("data-background")=="light"
        page.locator("#build-name").fill("My Goblin Captain")
        page.locator("#build-name").press("Tab")
        with page.expect_download() as record:
            page.locator("#download-recipe").click()
        import json
        saved=json.loads(Path(record.value.path()).read_text(encoding="utf-8"))
        assert saved["name"]=="My Goblin Captain"
        assert saved["weapon"]=="Bow"
        assert saved["palette"]["primary"]=="#594d7c"
        page.locator("#builder-reset").click()
        expect(page.locator("#builder-summary")).to_contain_text("Human")
        page.locator("#import-recipe").set_input_files({
            "name":"hero.json","mimeType":"application/json",
            "buffer":json.dumps(saved).encode("utf-8")})
        expect(page.locator("#build-name")).to_have_value("My Goblin Captain")
        expect(page.locator("#part-weapon")).to_have_value("Bow")
        page.reload(wait_until="load")
        expect(page.locator("#build-name")).to_have_value("My Goblin Captain")
        with page.expect_download() as preview:
            page.locator("#download-png").click()
        asset=Path(preview.value.path()).read_bytes()
        assert asset[:8]==b"\x89PNG\r\n\x1a\n","PNG preview must encode correctly"
        assert len(asset)>2500,"Rendered preview image is suspiciously small"
        page.emulate_media(reduced_motion="reduce")
        page.locator('#builder-modes button[data-mode="rest"]').click()
        expect(page.locator(".rig-rest-seat")).to_have_count(1)
        reduced_animation = page.locator(".rig-upper").evaluate(
            "(node) => getComputedStyle(node).animationName")
        assert reduced_animation == "none", "Reduced motion should show still seated pose"
        page.emulate_media(reduced_motion="no-preference")
        overflow=page.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
        assert overflow<=1,f"Builder horizontal overflow at {width}px: {overflow}"
        page.screenshot(path=str(screenshots/f"gridborn-builder-{width}px.png"),full_page=True)
        assert not errors,"Builder JS failures: "+";".join(errors)
        LOG.info("PASS builder Chromium at %spx: presets/parts/modes/save/load/png",width)
    except Exception:
        LOG.exception("Gridborn builder QA failed at %spx",width)
        raise
    finally:
        page.close()
