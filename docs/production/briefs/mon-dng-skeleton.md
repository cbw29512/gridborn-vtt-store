# Skeleton Warrior sword and shield QC — `mon-dng-skeleton`

**Research date:** 2026-10-29  
**Collection:** Monsters; **species:** animated skeletal undead; **role:** sword-and-shield melee warrior; **authored gender:** not applicable; **footprint:** single-square 256×240 SVG study.  
**Equipment/action:** tarnished one-handed sword in right bony hand, damaged left-hand shield, melee slash toward frame right. Immutable catalog ID; this corrects existing original art rather than inventing a new variant.

## Research, original art, and rights

- [Official D&D SRD v5.2.1](https://www.dndbeyond.com/srd): undead skeleton combatant and weapon use provide role reference. CC BY 4.0 covers eligible SRD text, **not** unrelated illustrations or protected branding. Exact commercial attribution and rights remain to be reviewed.
- [Original Gridborn skeleton study](../../../assets/studies/skeleton-warrior.svg): sole source of drawn bone proportions, skull, exposed ribs, shield, and weapon. No external artwork was copied.
- [Gridborn Weapon/Attack QC](../WEAPON_ATTACK_QC.md): grip, head clearance, one-shot sword arc, and frame-safe export requirements.

## Anatomy, equipment and visual storyboard

- **Silhouette:** exposed skull sockets, segmented shoulder/elbow/wrist, open ribcage, pelvis, bone legs, torn cape; do not animate respiration. Maintain a distinct sword mass and damaged shield at 128/64/32px on light and dark backgrounds.
- **Grip:** shift the existing sword 5px toward the right bony hand, shorten the tip to avoid the skull during wind-up; the hilt/pommel overlaps the hand geometry. Sword and right arm share shoulder pivot `157,110` and remain attached during the body lunge.
- **Idle:** small rigid skull/guard/sword adjustments, no breathing. **Move:** opposing articulated shuffle with equipment motion. **Attack:** anticipate at -18°, strike at +25°, recover through +9° to guard over 1.4 seconds; a single attack, not an infinite loop. **Rest:** inert collapsed corpse with faint socket glimmer only.
- **Inherited variant:** the existing `mon-srd-52-skeleton` source-derived Still and four states are regenerated with the same weapon correction, including repositioned rust detail; no duplicate token identity.
- **Frame evidence:** test the tip's shoulder-pivot positions at the four authored angles and deterministic parity of Still + four generated states. These checks are structural, not a substitute for reviewing rasterized motion at gameplay size.

## Readiness and blocking review

**Status:** original still + source-backed four-state animated study; automated CI pending on this correction. **Not** actual-VTT-tested, human-art-approved, licensing-approved, fulfillment-approved, or commercially ready. Keep `purchasable:false`. Human review must assess grip, sword/face clearance, silhouette, all keyframes and exports at 128/64/32px on light/dark maps, then verify real Foundry/Roll20 imports and original-art rights before release.
