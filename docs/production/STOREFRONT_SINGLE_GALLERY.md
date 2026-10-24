# Gridborn — one gallery, one product listing

**Permanent storefront rule · October 23, 2026**

Gridborn is a **selling website**, not an internal asset inventory dashboard. The site must show actual creature artwork and motion, keep navigation simple, and never duplicate product collections to announce additions.

## Non-negotiable presentation rules

1. **One canonical product gallery:** `#results.product-grid` is the only storefront collection. The All/Characters/NPCs/Monsters/Animals views use the *same* grid, controlled by the existing category selector, navigation shortcuts and search/filters. Do not introduce secondary Featured Dragons, Latest Arrivals, Recently Produced, All Monsters or other grids with the same products.
2. **One catalog ID, one card:** product identity is the existing immutable `item.id`. Each rendered `.product-card` must have `data-product-id`, live inside `#results`, and appear at most once. Do not duplicate a creature with a renamed catalog ID, a second SKU, or an alternate display card for decoration.
3. **Navigation does not relist inventory:** category shortcut tiles are links to filtered results, not parallel product cards. New art appears in its appropriate category and benefits from the existing animated-first sort order. Use ordinary in-page links to existing filters if navigation is needed; don't add another picture grid.
4. **Show, don't tell:** the existing card displays the actual Idle → Move → Attack → Rest preview and source-accurate equipment/actions. Avoid technical production badges, repeated disclaimers or oversized promotional explanations in the sales layout.
5. **Clean design:** even horizontal/vertical spacing, consistent card heights and typography, real hierarchy, accessible semantic navigation, working mobile layout and no horizontal scrolling at 320/390/1440px. Photos and animation should earn screen space.
6. **Accurate claims:** current studies are not commercially ready. Keep `purchasable=false`, disabled checkout and essential release/legal status in appropriate details/footers. No claim of live delivery, real VTT compatibility or full certification before verified.
7. **Every new category or species:** add/extend existing catalog records and shared body/role asset sources, not a second gallery; use the same listing and motion plumbing. A new species family is a batch in the data pipeline, not a second shopping section.

## Regression gates

- `src/storefront-gallery.js` fails closed on extra `.product-grid` containers, cards outside `#results`, missing/duplicate `data-product-id`, and duplicate IDs.
- Unit tests confirm one `#results`, four collection shortcuts, exactly one instance of each filtered catalog ID across all categories and rejection of simulated duplicate/second galleries.
- Chromium browser QA verifies that the general Monsters page contains its ten unique Young Dragon cards inside the single product grid, with no parallel showcase; also checks mobile overflow and unique rendered IDs.
- Storefront and Foundry checks remain mandatory. Browser testing and human visual review must validate any substantial layout changes before retail release.

## Current corrective action

Remove the redundant *Latest Arrivals* strip (which repeated dragon and innkeeper thumbnails) and its CSS/JavaScript. Keep the four existing category shortcuts and the animated-first normal gallery. Preserve all existing 40 source-linked animated studies, 41 illustrations, catalog records, search/filter behavior and noncommercial safety controls. No storefront count increases in this housekeeping change.

## Existing gallery polish · October 23, 2026

- **Artwork-first:** enlarge original asset imagery inside the *same* certified card stage and let clicking or keyboard-activating the artwork open its native details/animation dialog. No duplicated image panel or product card.
- **Focus control:** one `Animated only` toggle filters the existing gallery across the four categories, preserving the normal list and one-ID-one-card guarantees. Default remains full searchable catalog; users can see the actual 40 moving studies instead of sorting through concepts. Changing filters still uses the same results grid.
- **Cleaner cards:** preserve grid equality and button accessibility but remove the redundant `IN MOTION` overlay for animated cards, whose visible stage already shows Idle/Move/Attack/Rest. Keep non-purchasable and rights controls unchanged.
- **Required testing:** Node checks verify actual 40 animated assets, 16 Monsters (including 10 dragons), accessibility/one grid, and Chromium 1440/390/320 verifies mode switching, artwork clickthrough, no duplicates/overflow. No new product or release count from this UI pass.
