"""Real Chromium smoke checks for the public Gridborn development preview.
No Netlify deployment. Screenshots remain in the ephemeral GitHub runner.
A passing smoke test does not replace manual WCAG/ADA accessibility review.
"""
import functools
import logging
import os
import shutil
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
LOG = logging.getLogger("gridborn.browser")
ROOT = Path(__file__).resolve().parents[1]
from builder_browser_qa import check_builder
from production_browser_qa import check_production
from wolf_browser_qa import check_wolf
from spider_browser_qa import check_spider
from goblin_browser_qa import check_goblin
from fighter_browser_qa import check_fighter
from wave_two_browser_qa import check_wave_two
from card_alignment_browser_qa import check_consistent_cards
from wave_four_browser_qa import check_wave_four
from catalog_motion_browser_qa import check_catalog_motion, check_reduced_motion
from catalog_expansion_browser_qa import check_full_catalog
from monster_catalog_browser_qa import check_monster_catalog_no_duplicates
from shopping_gallery_browser_qa import check_shopping_gallery
from catalog_history_browser_qa import check_catalog_history
SIZES = (1440, 390, 320)
class PreviewHandler(SimpleHTTPRequestHandler):
    def log_message(self, format_string, *args):
        try:
            LOG.debug("HTTP: " + format_string, *args)
        except Exception:
            LOG.exception("HTTP preview logging failed")
def check_viewport(browser, origin: str, width: int, screenshots: Path) -> None:
    """Exercise navigation, keyboard, details and action/rest controls."""
    page = browser.new_page(viewport={"width": width, "height": 850})
    errors = []
    try:
        from playwright.sync_api import expect
        page.on("pageerror", lambda err: errors.append(str(err)))
        page.goto(origin, wait_until="load")
        expect(page.locator("#result-summary")).to_have_text("518 results found")
        expect(page.locator("#search-label")).to_have_text("Search all tokens")
        assert page.locator(".product-card").count() == 8, "Show a curated first page of eight"
        assert page.locator("#primary-field").is_hidden(), "All categories should not show context filters"
        assert page.locator("#secondary-field").is_hidden(), "All categories should not show context filters"
        assert page.locator(".product-art").count() == 8, "Show illustrated concepts first"
        assert page.locator("h1").count() == 1, "One semantic page h1 is required"
        headline = page.locator("#hero-title").inner_text()
        assert "Your VTT maps are static" in headline, "VTT problem must appear immediately"
        assert "Your battles shouldn't be" in headline, "Animated solution must appear immediately"
        assert page.locator(".vtt-panel").count() == 2, "Before/after map comparison missing"
        expect(page.locator("#demo-sleep-status")).to_have_text("Sleep · repeats automatically")
        expect(page.locator("#demo-status")).to_have_text("Idle → Move → Attack → Recover · repeats")
        assert page.locator("#demo-sleep-token").get_attribute("src").endswith("human-fighter-sleep.svg")
        assert page.locator("#demo-token").get_attribute("src").endswith("human-fighter-showcase.svg")
        assert page.locator("#demo-toggle").count() == 0, "No Play button should be needed"
        assert page.locator("#demo-rest-toggle").count() == 0, "No Play button should be needed"
        for selector in ["#demo-sleep-token", "#demo-token"]:
            image=page.locator(selector)
            expect(image).to_be_visible()
            assert image.evaluate("(img) => img.complete && img.naturalWidth > 0"), \
                selector + " did not load"
        sleep_frame_one = page.locator("#demo-sleep-token").screenshot()
        motion_frame_one = page.locator("#demo-token").screenshot()
        page.wait_for_timeout(2100)
        sleep_frame_two = page.locator("#demo-sleep-token").screenshot()
        motion_frame_two = page.locator("#demo-token").screenshot()
        assert sleep_frame_one != sleep_frame_two, "Sleeping preview should change frames automatically"
        assert motion_frame_one != motion_frame_two, "Full motion preview should change frames automatically"
        if width == 1440:
            page.keyboard.press("Tab")
            assert page.evaluate("document.activeElement?.className") == "skip-link", \
                "Skip link must be the first keyboard focus target"
        overflow = page.evaluate(
            "() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
        if overflow > 1:
            raise AssertionError(f"Horizontal overflow at {width}px: {overflow}px")
        art = page.locator('[data-category-link] .shortcut-portrait img')
        assert art.count() == 4, "Category navigation requires four different illustrated studies"
        for index in range(4):
            picture = art.nth(index)
            picture.scroll_into_view_if_needed()
            page.wait_for_function("(img) => img.complete && img.naturalWidth > 0",
                                   arg=picture.element_handle())
        # Build a real draft bundle; no payment or download entitlement is created.
        expect(page.locator('a[href="#bundles"]')).to_be_visible()
        assert page.locator("#bundle-templates .bundle-template").count()==4
        page.locator('[data-bundle-template="starter-party"]').click()
        expect(page.locator("#bundle-count")).to_have_text("5 / 25 selected")
        expect(page.locator("#bundle-total")).to_have_text("$3.99")
        expect(page.locator("#bundle-savings")).to_contain_text("$0.96")
        expect(page.locator("#bundle-items .bundle-item")).to_have_count(5)
        page.reload(wait_until="load")
        expect(page.locator("#bundle-count")).to_have_text("5 / 25 selected")
        with page.expect_download() as saved_bundle:
            page.locator("#bundle-export").click()
        import json
        bundle=json.loads(Path(saved_bundle.value.path()).read_text(encoding="utf-8"))
        assert bundle["previewOnly"] is True
        assert bundle["canPurchase"] is False
        assert len(bundle["ids"])==5
        assert bundle["pricing"]["totalCents"]==399
        page.locator("#search").fill("great white shark")
        shark_add=page.locator('button[data-bundle-id="ani-ocean-greatwhite"]')
        shark_add.click()
        expect(page.locator("#bundle-count")).to_have_text("6 / 25 selected")
        expect(page.locator("#bundle-total")).to_have_text("$4.98")
        expect(shark_add).to_be_disabled()
        page.locator("#bundle-clear").click()
        expect(page.locator("#bundle-count")).to_have_text("0 / 25 selected")
        expect(page.locator("#bundle-total")).to_have_text("$0.00")
        page.locator("#search").fill("")
        page.locator("#show-more").click()
        assert page.locator(".product-card").count() == 16, "Show more should reveal eight more concepts"
        page.locator("#search").fill("shark")
        expect(page.locator("#result-summary")).to_have_text("5 results found")
        assert page.locator(".product-card").count() == 5, "Search must work across all categories"
        page.locator("#search").fill("nothingmatches_abc")
        expect(page.locator("#empty-state")).to_be_visible()
        page.locator("#empty-reset").click()
        expect(page.locator("#result-summary")).to_have_text("518 results found")
        page.locator('[data-category-link="Animals"]').click()
        expect(page.locator("#result-summary")).to_have_text("10 results found")
        expect(page.locator("#search-label")).to_have_text("Search animals")
        assert page.locator("#primary-field").is_visible(), "Category unlocks contextual first filter"
        assert page.locator("#secondary-filter").is_disabled(), "Secondary filter waits for a first choice"
        assert page.locator(".product-art").count() >= 2, "Expected illustrated animal studies"
        page.locator("#primary-filter").select_option("Ocean")
        assert page.locator("#secondary-filter").is_enabled(), "Selecting habitat unlocks type"
        page.locator("#secondary-filter").select_option("Sharks")
        expect(page.locator("#result-summary")).to_have_text("2 results found")
        details = page.get_by_role("button", name="View concept details for Great White Shark")
        details.click()
        expect(page.locator("#preview-dialog")).to_be_visible()
        expect(page.locator("#preview-title")).to_have_text("Great White Shark")
        assert "Not tested in Foundry" in page.locator("#preview-facts").inner_text()
        page.keyboard.press("Escape")
        expect(page.locator("#preview-dialog")).to_be_hidden()
        expect(details).to_be_focused()
        page.locator("#clear-filters").click()
        expect(page.locator("#result-summary")).to_have_text("10 results found")
        assert page.locator("#category").input_value() == "Animals", "Clearing filters must preserve category"
        page.locator('[data-category-link="Characters"]').click()
        expect(page.locator("#result-summary")).to_have_text("116 results found")
        assert page.locator(".product-art").count() >= 3, "Expected three illustrated characters"
        page.locator("#demo-pause").click()
        expect(page.locator("#demo-pause")).to_have_attribute("aria-pressed", "true")
        expect(page.locator("#demo-status")).to_contain_text("paused")
        expect(page.locator("#demo-sleep-status")).to_contain_text("paused")
        assert page.locator("#demo-token").get_attribute("src").endswith("human-fighter-still.svg")
        assert page.locator("#demo-sleep-token").get_attribute("src").endswith("human-fighter-sleep-still.svg")
        # Await both newly assigned static SVGs before comparing stable screenshots.
        # A src attribute change is synchronous; image decoding/loading is not.
        for selector in ("#demo-token", "#demo-sleep-token"):
            page.wait_for_function(
                "(img) => img.complete && img.naturalWidth > 0",
                arg=page.locator(selector).element_handle(),
                timeout=6000)
        # Verify what the user actually receives when paused: both loaded SVGs
        # must be static sources with no SVG/SMIL/CSS animation or animated IMG.
        # Screenshot byte identity is not a reliable static-motion assertion;
        # Chromium may rerasterize an unchanged image with different pixels.
        paused_sources = page.evaluate("""async () => {
            const nodes = ['#demo-token', '#demo-sleep-token'].map(
                selector => document.querySelector(selector));
            return await Promise.all(nodes.map(async img => {
                const response = await fetch(img.src);
                if (!response.ok) throw new Error('Static preview failed: '+response.status);
                const svg = await response.text();
                return {
                    loaded: img.complete && img.naturalWidth > 0,
                    animation: getComputedStyle(img).animationName,
                    svgAnimated: /@keyframes|<animate(?:motion|transform)?\\b|animation\\s*:/i.test(svg),
                    src: img.getAttribute('src')
                };
            }));
        }""")
        assert all(item["loaded"] and item["animation"] == "none"
                   and not item["svgAnimated"] for item in paused_sources), \
            "Pause must swap both previews to static, fully loaded SVGs"
        page.wait_for_timeout(250)
        assert page.locator("#demo-pause").get_attribute("aria-pressed") == "true"
        assert page.locator("#demo-token").get_attribute("src") == paused_sources[0]["src"]
        assert page.locator("#demo-sleep-token").get_attribute("src") == paused_sources[1]["src"]
        page.locator("#demo-pause").click()
        expect(page.locator("#demo-pause")).to_have_attribute("aria-pressed", "false")
        assert page.locator("#demo-token").get_attribute("src").endswith("human-fighter-showcase.svg")
        assert page.locator("#demo-sleep-token").get_attribute("src").endswith("human-fighter-sleep.svg")
        # An image-src change starts a network fetch. Completion may lag behind the
        # click, especially at 320px on a busy CI runner; await the actual load.
        page.wait_for_function(
            "(img) => img.complete && img.naturalWidth > 0",
            arg=page.locator("#demo-token").element_handle(),
            timeout=6000)
        image_is_loaded = page.locator("#demo-token").evaluate(
            "(img) => img.complete && img.naturalWidth > 0")
        assert image_is_loaded, "Full-motion Fighter artwork failed to load"
        final_overflow = page.evaluate(
            "() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
        assert final_overflow <= 1, f"Page overflows after navigation at {width}px"
        page.screenshot(path=str(screenshots / f"gridborn-{width}px.png"), full_page=True)
        if errors:
            raise AssertionError("Browser JavaScript error(s): " + "; ".join(errors))
        LOG.info("PASS Chromium at %spx: responsive/filter/dialog/animation", width)
    except Exception:
        LOG.exception("Gridborn Chromium smoke failed at %spx", width)
        raise
    finally:
        page.close()


def main() -> int:
    """Serve the current checkout locally, run smoke checks and shut down."""
    server = None
    try:
        from playwright.sync_api import sync_playwright
        logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
        screenshots = Path(os.environ.get("RUNNER_TEMP", "/tmp")) / "gridborn-browser-qa"
        screenshots.mkdir(parents=True, exist_ok=True)
        handler = functools.partial(PreviewHandler, directory=str(ROOT))
        server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        url = f"http://127.0.0.1:{server.server_port}/"
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(
                headless=True, executable_path=shutil.which("chromium") or
                shutil.which("google-chrome"), args=["--disable-dev-shm-usage"])
            try:
                for width in SIZES:
                    check_viewport(browser, url, width, screenshots)
                    check_builder(browser, url, width, screenshots)
                    check_production(browser, url, width, screenshots)
                    check_wolf(browser, url, width, screenshots)
                    check_spider(browser, url, width, screenshots)
                    check_goblin(browser, url, width, screenshots)
                    check_fighter(browser, url, width, screenshots)
                    check_wave_two(browser, url, width, screenshots)
                    check_consistent_cards(browser, url, width, screenshots)
                    check_wave_four(browser, url, width, screenshots)
                    check_catalog_motion(browser, url, width, screenshots)
                    if width==1440: check_reduced_motion(browser, url)
                    check_full_catalog(browser, url, width, screenshots)
                    check_monster_catalog_no_duplicates(browser, url, width, screenshots)
                    check_shopping_gallery(browser, url, width, screenshots)
                    check_catalog_history(browser, url, width)
            finally:
                browser.close()
        LOG.info("All viewport tests passed. Screenshots remain temporary.")
        return 0
    except Exception:
        LOG.exception("Gridborn browser QA failed")
        return 1
    finally:
        if server is not None:
            server.shutdown()
            server.server_close()


if __name__ == "__main__":
    raise SystemExit(main())
