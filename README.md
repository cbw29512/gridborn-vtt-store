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
- This is a **draft vector pixel-art study**, not the final sprite, not an accepted VTT asset, and not available for purchase. The prototype now includes a separate six-second resting animation SVG; final export and VTT delivery testing remain necessary.
- Do not add it to a for-sale product or claim VTT compatibility before testing transparency, orientation, compositing, export frame cadence, file size, browser playback, and major VTT import workflows.

Storefront browser logic is split into `src/app.js`, `src/concept-dialog.js`, and `src/animation-demo.js`. Keep individual modules below 150 lines.

## Navigable catalog routes

Each of the four top-level categories has an ordinary, copyable link. Search and contextual filters are also reflected in stable URL query parameters: `category`, `primary`, `secondary`, and `q`. The URL parser validates those values against the actual catalog and falls back safely. Browser Back/Forward restores filters, while the initial default state retains a clean URL. The development preview stays `noindex`; commercial SEO product pages must be separately planned and server-rendered when the real catalog is ready.

## Buyer-information gate

The preview FAQ explicitly discloses that all pricing, download formats, licensing, compatibility and fulfillment details are unverified plans. Update these disclosures only after real product testing and approved legal/policy text. Test finished animated exports in each named VTT; do not imply universal compatibility, commercial-use licensing, or instant delivery before verification.

FAQ markup uses native `details` and `summary` without JavaScript, retaining keyboard operability and progressive enhancement. The five questions cover purchase status, compatibility, files, delivery and asset rights.

## Private animated token export pipeline

The local exporter and 45-second state contract are documented in [tools/README.md](tools/README.md). It uses Chromium to sample the SVG study and FFmpeg to build a prototype transparent PNG and WebM, entirely outside this public repository. Test the generated media and platform compatibility before marking any product purchasable.

## Fighter rest prototype

The Fighter now has a distinct original six-second resting animation study (`assets/demos/human-fighter-rest.svg`) with a lowered sword, subtle breathing and blinking, plus explicit Action/Rest preview controls. Both are manually started and stop when hidden. The private exporter can generate separate alpha-WebM action/rest clips and a static PNG, none of which are included in this public repository or certified for VTT sale.

## Full-duration media QA (no storefront exposure)

The first Human Fighter prototype now has optional strict media checks via `python tools/export_demo.py --certify --output-dir ../gridborn-private-qa`. The QA run verifies exact frame count and duration, true transparent PNG/VP9 pixels, meaningful animation changes and loop continuity. Outputs and the media QA JSON stay private and are not committed. Passing automated QA **does not establish artistic quality, universal VTT compatibility or sale readiness**. See [tools/README.md](tools/README.md) for the full contract.

## Platform compatibility release gate

Foundry and Roll20 are **not yet tested** with the Human Fighter exports. Do not advertise any VTT as compatible just because WebM is a documented supported format. The test matrix and evidence requirements are in [docs/VTT_COMPATIBILITY.md](docs/VTT_COMPATIBILITY.md), with a machine-checked, fail-closed record in [docs/compatibility-record.json](docs/compatibility-record.json). Checkout and commercial licensing remain blocked until independently approved.

## Browser-level preview checks (GitHub only)

Run `python tools/browser_smoke.py` after installing Playwright and Chromium. The script hosts the checkout locally and tests Chromium at **1440px, 390px and 320px**: no horizontal overflow, one page heading, the skip link, cascading filters, accessible concept dialog and Escape focus return, and the Action/Rest controls. It captures private screenshots in a temporary local directory; the CI workflow does not upload or publish them. This is a technical browser check, **not proof of WCAG 2.2 AA, ADA compliance or purchase security**. Manual screen reader, zoom/reflow, contrast, touch, and real-product audits remain mandatory before the commercial launch.

## Hero redesign: make the VTT problem and solution obvious

The primary message is **"Your VTT maps are static. Your battles shouldn't be."** The first screen introduces Gridborn as animated fantasy tokens for **existing** virtual tabletop battle maps, not as a replacement VTT application. Two matched battle-grid mockups compare a still token to the existing original Human Fighter study. Visitors can explicitly start or stop the action and rest prototypes, with a polite status update announcing which is active. This is intentionally a preview; the product remains non-purchasable and VTT compatibility is not yet verified.

The dedicated `src/hero.css` file keeps the responsive first-screen design isolated and makes the comparison fit 320px, 390px, and desktop widths. Chromium smoke checks cover the problem/solution message and both controls.

## Original illustrated catalog previews

Seven additional hand-authored **static, pixel-inspired SVG studies** now cover
Elven Wizard, Orc Barbarian, Village Innkeeper, Cave Goblin, Skeleton Warrior,
Great White Shark, and Gray Wolf. Including Human Fighter, eight public concepts
have original artwork spanning Characters, NPCs, Monsters, and Animals.
All four collection shortcuts use illustrated portraits instead of generic symbols.

Paths are keyed by immutable catalog ID in `src/art-studies.js`; the SVGs are
validated in CI before deployment. Images have loading-failure fallbacks and
motion-respecting hover polish. **Only Human Fighter has action/rest animation
studies**, and no concept is purchasable or certified for a specific VTT.

## Customer-first browse flow (production UX foundation)

The catalog now opens in **All categories** with the eight existing original art
studies prioritized as the first results. Search genuinely scans the complete
34-item concept catalog; typing `shark` finds Animals immediately without
navigating from the default Characters tab. The four collection shortcuts and
one dropdown narrow categories, and only then reveal the two contextual fields.
The second contextual dropdown unlocks only after a first selection. **Clear
search & filters** preserves the chosen category, avoiding the previous surprise
jump back to Characters. More results load in groups of eight without reloading.

Concept cards display **Target $2.99 / Preview only**, not simulated disabled
purchase buttons; details and FAQ state that real checkout/delivery do not yet
exist. This improves discoverability and truthful presentation; full platform
imports, artistic acceptance, independent accessibility audits, commercial
licensing and protected payment/download architecture still block production sale.

## Cave Goblin — second animated concept

Cave Goblin now has original action (45 seconds) and rest (6 seconds) SVG
motion studies, with a separate `assets/demos/cave-goblin-manifest.json`.
The existing private exporter can use `--manifest` to render either study to
alpha WebM plus still PNG without changing any species-specific code:

```sh
python tools/export_demo.py --manifest assets/demos/cave-goblin-manifest.json \
  --certify --output-dir ../gridborn-goblin-private-qa
```

The art-study details dialog displays a static illustration by default.
Action/Rest controls are offered only for assets with actual animations.
The current public catalog includes **two animated prototypes** (Human Fighter
and Cave Goblin), not two finished licensed products. No private exports are
committed, and VTT compatibility is unverified.

## Foundry Controller — developer preview

The optional **Gridborn Controller** module is in [foundry/gridborn-controller](foundry/gridborn-controller/README.md). It adds a compact token-HUD panel after right-clicking a token. Configure one folder containing `idle.webm`, `move.webm`, `attack.webm` and `rest.webm`; then select Idle, Move, Attack, or Rest. Attack returns to Idle after the configured duration (10 seconds for current art-study action/recovery). A restore action returns to the original token texture. The standalone Idle WebM requires no module, and the optional module is **not tested in real Foundry yet**.

A GitHub Actions workflow packages a **source-only** downloadable development ZIP without any paid artwork. The private exporter accepts `--certify --controller-package` to create four independently timed alpha-WebM loops and static PNG outside the public repository. Foundry and Roll20 integration claims remain blocked pending actual platform testing.

## Two ways to Gridborn — premade catalog and modular character builder

The homepage now leads customers to **Browse Premade Tokens** or **Make Your Own**.
The builder is at `builder.html`, with shareable preset links such as
`builder.html?preset=mon-cave-goblin`; compatible catalog cards link directly
into the exact same modular rig.

V1 has **one shared block-style humanoid rig**, seven interchangeable visual
slots (species, outfit, headwear, hair/beard, main hand, off hand, cape), six
starting recipes (Human Fighter, Elf Wizard, Orc Barbarian, Innkeeper, Goblin,
Skeleton), five editable colors, six color schemes, and CSS animation previews
for Idle / Move / Attack / Rest. These are **builder concept animations**. They
are not yet the independent, certified WebM product exports.

All editing happens in the browser with no login. The builder saves validated
`gridborn-character-recipe` version 1 JSON for later import, autosaves to the
browser when allowed, and can export a clearly **watermarked static PNG
preview**, not a commercial transparent animation package. Custom filenames
are derived from sanitized recipe names. Data import is size-limited and
strictly validates parts and colors; names are XML-escaped before SVG rendering.
The studio offers both dark and light map-grid backgrounds for legibility.

Run `npm test` for recipe/rig/storefront validation, and the real Chromium
suite to exercise the builder on 1440, 390 and 320px screens including live
controls, downloads, import/autosave, and no horizontal overflow. The new
builder is a V1 development preview: no payment, protected downloads, completed
animal rigs, saved cloud account, specific VTT compatibility certification, or
real-world usability/accessibility sign-off is implied.

### Future production work

- Evolve rigs by body family (humanoid, quadruped, flying, aquatic, giant)
  with shared anchors, articulation, layers, equipment clipping and consistent art.
- Render and certify **Idle, Move, Attack, Rest + static PNG** from each
  user-saved rig with private media workers, not in public GitHub Pages.
- Verify files on leading VTT platforms and simplify imports without forcing
  platform-specific modules; retain PNG fallbacks.
- Add secure delivery, license review, pricing tests, visual QA and human-led
  mobile and assistive-technology acceptance before commercial launch.

## Modular studio motion + art refinement (V2 prototype)

The reusable humanoid rig has independently rendered and animated legs, arms,
cape, head, main-hand and off-hand accessories. Movement is now a coordinated
alternating stride with opposing arm swing and equipment attachment, rather than
whole-body bouncing. Attack winds up, strikes and recovers **once**, returning
to Idle automatically. Idle adds occasional eye blinks. Rest changes actual
geometry into a seated figure with feet out, eyes closed where appropriate,
relaxed equipment and a stool; a decorative campfire appears **only on the
preview stage** and is not included in exported token PNG art. All block parts
share a north-west light/shadow rule and derive highlights from the selected
palette rather than hard-coded premium artwork.

Reduced-motion preferences retain a static seated silhouette with no animated
flame. Chromium checks validate actual computed animations, seated anatomy,
one-shot return, preview asset export, and small phone screen fit. These remain
**browser studies**, not downloadable certified custom animated WebMs.

## Homepage comparison now loops automatically

The BEFORE preview stays an unmoving static Fighter. The AFTER preview now
starts directly on an original, three-second-style continuously repeating
**Idle animation study** (actual cycle: 3.2 seconds, breathing, cloak, sword,
shield and occasional blink), without requiring the visitor to press Play.
The illustration itself animates, not just the badge surrounding it.
Idle and six-second Rest are switchable. A visible Pause/Resume button allows
visitors to stop all motion; the page pauses the image while the tab is hidden
and honors reduced-motion preferences.

The original 45-second Idle→Move→Attack→Recovery reel still exists as a private
technical demo source; it is **not** the product's default loop, because a
character attacking on its own every 45 seconds is unsuitable for VTT use.
Real customer download/export certification remains separate from website
preview animation. No Netlify, Stripe or product-sale status changes.

## Zero-click, repeating hero demo

The homepage hero now demonstrates **two animated token modes side by side**,
each autoplaying with no Play buttons: sleeping Fighter (4.8-second breathing,
closed eyes, bedroll and rising Zs), and full-motion Fighter (9-second repeating
Idle → Move → Attack → Recovery). Both actually change token pixels over time,
not only their container badges. Motion plays whenever the tab is visible,
with one optional **Pause motion** control to satisfy motion accessibility,
and a static fallback for reduced-motion preferences or failed image loads.

This is an original concept demonstration. It is not a customer VTT-ready export,
a third-party product video, or proof of production-grade animation quality.

## V1 art production roster — 12 heroes + 12 monsters

The active reviewed production specifications are in
[`docs/production/ART_BIBLE.md`](docs/production/ART_BIBLE.md),
[`docs/production/BUILD_ORDER.md`](docs/production/BUILD_ORDER.md), and the
machine-readable [hero](docs/production/hero-roster.json) / [monster](docs/production/monster-roster.json)
rosters. A responsive, noindex planning page is available at
[`production.html`](production.html) on GitHub Pages.

The 12 heroes correspond to the twelve classic fantasy classes (Fighter,
Wizard, Cleric, Rogue, Barbarian, Paladin, Ranger, Bard, Warlock, Sorcerer,
Monk, Druid). The 12 monsters are Cave Goblin, Orc Raider, Skeleton Warrior,
Zombie, Kobold, Gray Wolf, Giant Cave Spider, Bugbear, Hobgoblin, Ogre,
Troll and Gelatinous Cube. Each has species-specific silhouettes, gear,
color schemes, anatomy, *separate* Idle/Move/Attack/Rest concepts and
explicit visual-review gates. The data, browser display and counts are
unit-tested, and Chromium reviews the page at desktop and two phone widths.

**No asset on the board has passed commercial release.** Existing Fighter
and Goblin animation studies are still technical prototypes; static art
and concept listings are not completed pregen tokens. This roster is not the
stat-based D20 Iron Pit pregen roster.

## Visual production progress: Dwarf Cleric + quadruped Gray Wolf

- `chr-clr-dwarf` now has an original **static Dwarven Cleric** concept:
  squat armored proportions, a large beard, mace and shield with an original
  radial emblem. Added a Dwarf + Mace starting model to the modular builder,
  now **seven** starter recipes, though the generic preview rig needs further
  dwarf-specific proportional refinements.
- `ani-forest-wolf` now has separate generated SVGs for still, Idle, Move,
  one-shot Bite and curled Rest, derived from one anatomically distinct
  quadruped source. Independent joint groups are used for all **four** paws.
  These are browser SVG studies only, not licensed/commercial alpha-WebM
  packages or verified imports on third-party VTTs.
- Production review still remains open for all visuals; no asset is sale-ready.
