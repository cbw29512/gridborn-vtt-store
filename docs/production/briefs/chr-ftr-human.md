# Human Fighter — weapon grip and slash QC

- Catalog ID: `chr-ftr-human`; Character; Human Fighter; authored identity unchanged; one-square original 256 × 240 SVG study.
- Research date: 2026-10-31. Sources: [D&D SRD 5.2.1](https://www.dndbeyond.com/srd) for Fighter weapon-and-shield role; original Gridborn `assets/demos/human-fighter-idle.svg` and `src/creature-rigs/fighter-states.mjs` for existing anatomy and equipment. No external illustration copied; original art rights and commercial license not independently approved.
- Silhouette/anatomy: preserve helmet, visible face, red cape, breastplate, shield and sword in three-quarter view. Verify readability at 128/64/32px on light and dark grids.
- Grip: original hand ended at x=169, short of sword hilt beginning x=171. Shift gauntlet/hand to x=160..175 and x=162..173 to visibly meet the existing hilt without moving the head or changing sword silhouette.
- Storyboard: Idle 3.2s breathing/equipment loop; Move 3.2s alternating gait; Attack 1.4s one-shot +8° anticipation, +43° outward contact, +15° recovery, then 0° guard, with authored lunge and shield guard; Rest calm posture. Legacy loop/sleep previews inherit hand correction.
- Frame clearance: prior -49° windup crossed the helmet; new outward tip path is inside 256 × 240 and avoids the head at authored keyframes. Geometry checks do not substitute for human frame review.
- Source sync: Still, canonical Idle, Rest, legacy Loop/Sleep, deterministic Move/Attack generator and both generated SVGs updated together.
- Status: corrected source-backed study pending exact-head CI; `purchasable:false`. Human light/dark visual review, actual Foundry/Roll20 import, media/alpha acceptance, rights and fulfillment remain unapproved. No new product or catalog identity.
