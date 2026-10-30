# Human Paladin sword animation QC — chr-pal-human

**Research date:** 2026-10-27  
**Collection:** Characters; **ancestry:** Human; **role:** Paladin / armored oathguard; **authored gender:** not established by this art record; **footprint:** single-square 256px source study.  
**Equipment and attack type:** right-hand sword (melee slash), left-hand heraldic shield, plate armor, ceremonial tabard. This is an existing original study, not a new catalog identity.

## Source and licensing record
- [D&D SRD 5.2.1](https://www.dndbeyond.com/srd) — Paladin martial weapon and armor role; reference for class/equipment plausibility, **not** a source for copied artwork or brand insignia. Check precise commercial attribution obligations separately.
- [Existing original Gridborn still](../../../assets/studies/human-paladin.svg) — hand-drawn helmet, sword, shield, right gauntlet, and proportions. This is the sole visual source reused in this correction. Artwork ownership and commercial license approval **not verified**.
- [Original animation rig](../../../src/creature-rigs/wave-four.mjs) — current source-linked motion choreography and 1.4-second Attack. No third-party imagery imported.

## Anatomy, equipment, and small-square silhouette
Three-quarter-view Human in blue mantle and ivory tabard. Helmet spans roughly x96–164, y38–102. Right gauntlet grips sword at roughly x190, y155; blade tip is approximately (191,37) in the 256x240 viewBox. Left shield remains a distinct shape centered near x76, y151. Retain existing face, tabard, crest, shield, and original source geometry; do not create a palette-only duplicate. **128/64/32px light/dark map human inspection is pending**, including actual intermediate frames.

## Motion storyboard and QC correction
- **Idle (3.2s):** guarded stance; sword and shield move with body.
- **Move (1.2s source, 2.4s showcase):** armored march; both held items inherit the same body translation.
- **Attack (1.4s one-shot):** brace and draw sword back to -14° at 24%, swing through +28° at 53%, follow through at +12° at 76%, return to guard at 100%. The sword uses continuous easing rather than discrete teleporting; body, sword, and shield share a parent transform so the hilt stays aligned with the gauntlet during the lunge. These angles avoid the prior -43° helmet overlap and +59° off-frame sword tip.
- **Rest (4s):** lowered sword, relaxed shield and prayer posture, not an Attack loop.

Automated gate: generator parity for all four states, nested rig group balance, sword tip checks at key poses and explicit smooth 42° attack sweep. **Automated geometry is not human art approval.**

## Readiness
Existing source-backed moving art study only. Public SVG source/export parity is testable. Transparent video alpha, real Foundry/Roll20 imports, 128/64/32px human review, accessibility, licensing, and fulfillment remain outstanding. Manifest remains `purchasable:false`, `vttCompatibility:untested`, `artLicenseStatus:not-verified`. No checkout or deployment.
