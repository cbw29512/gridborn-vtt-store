"""Browser regression for intentional catalog history and URL restoration.

Runs against the existing preview-only Chromium QA server; no deployment.
"""
import logging

LOG = logging.getLogger("gridborn.catalog_history")


def check_catalog_history(browser, origin: str, width: int) -> None:
    """Validate actual Back/Forward behavior at desktop and mobile widths."""
    page = browser.new_page(viewport={"width": width, "height": 850})
    try:
        from playwright.sync_api import expect

        page.goto(origin, wait_until="load")
        expect(page.locator("#category")).to_have_value("All")
        page.locator("#category").select_option("Animals")
        expect(page.locator("#category")).to_have_value("Animals")
        assert "category=Animals" in page.url

        page.locator("#primary-filter").select_option("Ocean")
        expect(page.locator("#primary-filter")).to_have_value("Ocean")
        page.locator("#secondary-filter").select_option("Sharks")
        expect(page.locator("#secondary-filter")).to_have_value("Sharks")

        page.go_back(wait_until="domcontentloaded")
        expect(page.locator("#primary-filter")).to_have_value("Ocean")
        expect(page.locator("#secondary-filter")).to_have_value("")
        page.go_back(wait_until="domcontentloaded")
        expect(page.locator("#primary-filter")).to_have_value("")
        page.go_forward(wait_until="domcontentloaded")
        expect(page.locator("#primary-filter")).to_have_value("Ocean")

        # Search keystrokes replace the current URL rather than adding a
        # separate history entry for each character typed.
        page.locator("#search").fill("shark")
        assert "q=shark" in page.url
        page.go_back(wait_until="domcontentloaded")
        expect(page.locator("#category")).to_have_value("Animals")
        expect(page.locator("#primary-filter")).to_have_value("")
        expect(page.locator("#search")).to_have_value("")
        LOG.info("PASS catalog history at %spx", width)
    except Exception:
        LOG.exception("Catalog history QA failed at %spx", width)
        raise
    finally:
        page.close()
