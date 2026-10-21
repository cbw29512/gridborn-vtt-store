# Gridborn launch pricing — proposed, not live

**Decision, October 21, 2026:** USD **$0.99 per finished individual token**.
Applies across hero, NPC, monster, and animal assets as they individually
pass the commercial release gates. No game mechanics, preview recipes, or
incomplete catalog listings are being sold.

## Catalog source of truth

- `src/catalog.js` owns `priceCents: 99`, measured in integer cents.
- Each item keeps `purchasable: false` until source rights, final animations,
  exports, actual VTT imports, accessibility and delivery are verified.
- Cards with art studies say **Target $0.99 · Preview only**.
- Cards with no artwork continue to say **Artwork pending**, not Buy.
- A starter recipe/pose is not a separately purchasable finished asset.
- No checkout, payment link, Stripe secret, entitlement, or download delivery
  is activated by changing the proposed price.

## Checkout economics and future implementation requirement

At Stripe's published standard US domestic card processing rate of **2.9% +
$0.30**, one $0.99 transaction leaves approximately **$0.66**, before
other operating expenses, taxes, and refunds. Four $0.99 tokens in a single
$3.96 cart leave approximately **$3.55** after the same processing rate.
These figures are illustrations only, not a quote for every payment method
or merchant account. Validate current connected-account terms before launch.

Recommended eventual checkout: optional multi-item cart, **one payment for
the order**, preserving the $0.99 unit price. Do not force buyers to purchase
bundles or increase minimum item prices without explicit approval.

Verify sales tax handling, any merchant-of-record fees, support/refund policies,
downloads/entitlements, signed asset licenses and the actual rendering on
target VTTs prior to enabling sales.

The proposed price and work quality are separate decisions: unfinished token
concepts remain unavailable regardless of attractive pricing.
