# Gridborn — animated VTT token shop (working title)

A **GitHub Pages-first**, dependency-free static preview of an original 16-bit-inspired fantasy token storefront.

**Preview only. No product is available for purchase. No Stripe keys or paid assets are published.**

## Definition of Done

- [x] Search names, species, creature types, environments, occupations, and sizes.
- [x] One category dropdown with at most two cascading, contextual dropdowns.
- [x] Characters -> Race -> Class.
- [x] NPCs -> Race -> Occupation (Innkeeper, Farmer, Soldier, etc.).
- [x] Monsters -> Location -> Monster Type.
- [x] Animals -> Habitat -> Animal Type (Ocean -> Sharks).
- [x] Live result updates; no Submit or Apply button.
- [x] Responsive desktop and mobile design.
- [x] All concept items explicitly non-purchasable.
- [x] Automated catalog tests (run `npm test`).
- [ ] Final licensed original pixel artwork and VTT-tested animated previews.
- [ ] Separate Stripe account for the new storefront, not the Buymeacoffee account.
- [ ] Verified server-side checkout webhooks and entitlement-based protected downloads.
- [ ] Finished shop branding and domain review.

## Data schema and state

`src/catalog.js` declares the preview Token model (id, category, name, race or habitat/location,
class or occupation/type, size, footprint, planned price, artwork state, and non-purchasable status).

`src/filters.js` defines the state as:
```js
{ category: 'Characters', query: '', primary: '', secondary: '' }
```
On category change, both secondary filters reset. On primary-filter change, the secondary
filter resets and available choices are recalculated. The application never infers creature
properties from the display name. All product cards use safe DOM textContent rendering.

When the store becomes commercial, model Animation, Product, Purchase and DownloadEntitlement
separately from the preview Token metadata. Verify webhooks with signatures and idempotency.
Never grant download access based solely on a checkout success URL.

## Local development

Install Node 20+ and Python 3:

```bash
npm test
python3 -m http.server 8000
```

Open http://localhost:8000. This is dependency-free; no install or compilation step.

## Publish this preview using GitHub Pages (no Netlify)

1. Open repository Settings -> Pages.
2. Source: **Deploy from a branch**.
3. Branch: **main**; folder: **/(root)**; Save.
4. After GitHub finishes publishing, open:
   https://cbw29512.github.io/gridborn-vtt-store/

GitHub Pages is for **public marketing previews only**. Do NOT commit paid WebM/PNG
downloads, private customer data, payment credentials, or Stripe webhook secrets.
Netlify will eventually host production APIs and private storage will provide expiring
download links after a verified Stripe webhook grants entitlements.

## Art and scale contract

- 36 classic heroes (12 fantasy classes x male/female/nonbinary) and >=100 simple monsters.
- Original 16-bit-inspired sprites; 3/4 overhead projection; not a copy of proprietary D&D artwork.
- 1 grid square = 5 ft x 5 ft (physical tabletop scale 1 inch at standard print size).
- Small/Medium use 1x1 footprint; Large 2x2, Huge 3x3, Gargantuan 4x4+.
- Main 45-second idle -> walk -> fight -> recover: 27/8/3/7 seconds.
- Bonus sleep/rest/inactive loop + static PNG fallback.
- Proposed price $2.99 per single token, not charged by this preview.

**Do not mark assets for sale until art ownership, compatibility, delivery and quality are verified.**

## SEO, accessibility and launch controls

- The preview has SEO titles, canonical and social metadata, an SVG share graphic, favicon, and WebSite structured data; no unverified Product offers or reviews are claimed.
- The preview **deliberately uses `noindex`**. At production launch, remove that directive and replace all GitHub Pages URLs (canonical, structured data, social metadata, sitemap and robots) with the verified domain.
- GitHub Pages project-scoped `robots.txt` does not control the host root; publish the final robots policy at the production domain root.
- Key accessibility foundations: semantic labels, skip link, visible focus states, preserved mobile browsing link, reduced-motion rules, 44-pixel details control, native modal with Escape and focus return.
- Automated tests are not proof of ADA or WCAG 2.2 AA compliance. Before launch, do human keyboard, screen-reader, contrast, zoom/reflow, animation, and touch/mobile testing on actual devices.
- No fake ratings, fake scarcity, Stripe secrets, checkout links, or paid asset files should be committed.

## First original animated art study

- `assets/demos/human-fighter-still.svg` is the static fallback.
- `assets/demos/human-fighter-loop.svg` animates a hand-authored sprite with a 45-second cycle (idle 27s, move 8s, attack 3s, recover 7s). Playback is user-initiated with a Pause control. It respects reduced-motion preferences and pauses when the tab is hidden.
- This is a **draft vector pixel-art study**, not the final sprite, not an accepted VTT asset, not a completed WebM / PNG / sleep-loop delivery set, and not available for purchase.
- Do not add it to a for-sale product or claim VTT compatibility before testing transparency, orientation, compositing, export frame cadence, file size, browser playback, and major VTT import workflows.
