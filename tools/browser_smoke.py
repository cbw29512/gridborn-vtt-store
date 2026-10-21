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
        expect(page.locator("#result-summary")).to_have_text("34 results found")
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
        expect(page.locator("#demo-status")).to_have_text("Idle · loops automatically")
        expect(page.locator("#demo-toggle")).to_have_attribute("aria-pressed", "true")
        assert page.locator("#demo-token").get_attribute("src").endswith("human-fighter-idle.svg")
        assert page.locator(".vtt-figure-static").get_attribute("src").endswith("human-fighter-still.svg")
        # Prove the token image itself animates, not just a badge or surrounding CSS.
        expect(page.locator("#demo-token")).to_be_visible()
        assert page.locator("#demo-token").evaluate("(img) => img.complete && img.naturalWidth > 0"), \
            "Automatically looping token did not load"
        idle_frame_one = page.locator("#demo-token").screenshot()
        page.wait_for_timeout(980)
        idle_frame_two = page.locator("#demo-token").screenshot()
        assert idle_frame_one != idle_frame_two, "Idle token must visibly animate without a click"
        frozen_frame_one = page.locator(".vtt-figure-static").screenshot()
        page.wait_for_timeout(250)
        frozen_frame_two = page.locator(".vtt-figure-static").screenshot()
        assert frozen_frame_one == frozen_frame_two, "Before token must remain static"
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
        page.locator("#show-more").click()
        assert page.locator(".product-card").count() == 16, "Show more should reveal eight more concepts"
        page.locator("#search").fill("shark")
        expect(page.locator("#result-summary")).to_have_text("2 results found")
        assert page.locator(".product-card").count() == 2, "Search must work across all categories"
        page.locator("#search").fill("nothingmatches_abc")
        expect(page.locator("#empty-state")).to_be_visible()
        page.locator("#empty-reset").click()
        expect(page.locator("#result-summary")).to_have_text("34 results found")
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
        expect(page.locator("#result-summary")).to_have_text("8 results found")
        assert page.locator(".product-art").count() >= 3, "Expected three illustrated characters"
        page.locator("#demo-rest-toggle").click()
        expect(page.locator("#demo-rest-toggle")).to_have_attribute("aria-pressed", "true")
        expect(page.locator("#demo-status")).to_have_text("Rest · loops continuously")
        assert page.locator("#demo-token").get_attribute("src").endswith("human-fighter-rest.svg")
        page.locator("#demo-pause").click()
        expect(page.locator("#demo-pause")).to_have_attribute("aria-pressed", "true")
        expect(page.locator("#demo-status")).to_contain_text("Paused")
        assert page.locator("#demo-token").get_attribute("src").endswith("human-fighter-still.svg")
        page.locator("#demo-pause").click()
        expect(page.locator("#demo-pause")).to_have_attribute("aria-pressed", "false")
        assert page.locator("#demo-token").get_attribute("src").endswith("human-fighter-rest.svg")
        page.locator("#demo-toggle").click()
        expect(page.locator("#demo-status")).to_have_text("Idle · loops automatically")
        assert page.locator("#demo-token").get_attribute("src").endswith("human-fighter-idle.svg")
        image_is_loaded = page.locator("#demo-token").evaluate(
            "(img) => img.complete && img.naturalWidth > 0")
        assert image_is_loaded, "Static fighter preview artwork failed to load"
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
