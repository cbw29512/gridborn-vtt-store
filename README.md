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
