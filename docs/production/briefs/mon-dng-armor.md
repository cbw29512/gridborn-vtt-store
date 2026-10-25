# Animated Armor art and weapon-action brief — October 25, 2026

Catalog ID: `mon-dng-armor`; Monsters / Animated Armor; one grid square; no authored gender. Existing original still: `assets/studies/animated-armor.svg`; generator: `src/creature-rigs/wave-two.mjs`. No duplicate identity.

References checked October 25, 2026: official D&D SRD 5.2.1 (https://www.dndbeyond.com/srd), construct/Animated Armor reference; original Gridborn artwork and internal WEAPON_ATTACK_QC.md. SRD rules are a research input, not a license to reproduce third-party artwork. No external illustrations copied. Commercial source-art rights remain unverified.

Silhouette: empty dark visor, articulated steel plate torso/arms/feet, separate shield and one-handed steel sword. No breathing. Shield stays on offhand, sword grip at (194,155) on right gauntlet; revised blade tip (216,80) stays right of visor. Keep helmet/face clearance and role recognizable at 128/64/32px on light and dark grids.

Movement: Idle 3.2s rigid guard; Move 1.2s articulated march; Attack 1.4s one-shot with -30-degree wind-up at 25%, +26-degree strike at 53%, return by 100%, weapon and body translated together; Rest 4s inert slump. Sword has an actual grip-anchored arc, not an ambient bob.

Readiness: source-backed original still and four moving studies; generated exports and regression assertions. Human visual QC, true VTT import, rights/licensing and fulfillment are NOT approved. Keep `purchasable:false`.
