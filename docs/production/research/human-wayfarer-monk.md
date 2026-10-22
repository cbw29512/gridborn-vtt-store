# Gridborn Wayfarer Monk art/research brief — October 22, 2026

## Immutable character identity
- Catalog identity: pregen-monk-male-1, **Human Wayfarer Monk · Male**, from existing HERO_VARIANTS. Gender sourced from authored identity rather than inferred from appearance.
- Medium adventurer, one five-foot square. Unarmored hand-to-hand fighting, original blue-indigo working clothes, ocher belt sash and natural hand/foot wraps. No weapons, heavy armor or shield.
- All artwork is originally authored vector geometry, not copied from official or third-party character images. Rights clearance remains outstanding.

## Function and movement sources
- 2024 D&D Monk Basic Rules: https://www.dndbeyond.com/sources/dnd/br-2024/character-classes (Martial Arts, Unarmored Defense and agile unarmed combat).
- Yale karate technical instructor manual: https://karate.sites.yale.edu/sites/default/files/files/tech_manual_instructor.pdf (supporting leg, chamber, extend, recoil of a front kick).
- Kinematic analysis of mae-geri: https://pmc.ncbi.nlm.nih.gov/articles/PMC6747486/ (hip/knee coordination and kick balance). None of these sources supplies copied artwork.

## Independent original motion rig
- Three-quarter rightward posture, clear face and low cropped hair at about (130,90), plain work clothes, wrapped wrists and ground-contact feet.
- Guarding arm joins right shoulder (155,128) to wrapped fist near (188,130). During palm strike a complete alternate arm from shoulder to open palm (216,112) appears; idle guard disappears only while strike occurs.
- At 52–73% of Attack, original right leg withdraws and a complete right-hip-to-toe front-kick pose appears. The supporting leg stays planted. Retract and recover follow.
- Idle 3.2 sec (breathing, guard), Move 2.4 sec (alternating support feet), Attack 1.4 sec one-shot (palm then front kick), Rest 4 sec (lowered stance).
- Loop states reset before final frame at 10fps and attack never loops. 256×240 SVG source and 256px export target.

## Release gates
Mandatory human QA at 256/128/64/32px on light/dark map, face/hand/leg anatomy and frame clipping, transparent WebM export seam and alpha checks, actual Foundry/Roll20 playback, rights/license and order fulfillment. Commercially unavailable (purchasable=false, VTT=untested).
