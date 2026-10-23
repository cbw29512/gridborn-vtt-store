# Dire Wolf — shared-canid VTT animated study

- **Identity:** original immutable monster ID `mon-forest-wolf` (Dire Wolf), distinct from `ani-forest-wolf` (ordinary Gray Wolf). One card each in existing Monster/Animal filters.
- **Reference/anatomy:** derived directly from Gridborn's original Gray Wolf 4-legged quadruped sources `src/creature-rigs/wolf.mjs`. Keep the exact four individually animated paws, head/ear/muzzle, tail and shoulders; body proportion scale 1.06 via a wrapper, not a separate skeleton. Broad chest/mane, heavier dark brindle coat, scar and pronounced fangs communicate species threat and distinguish the Dire Wolf from a color swap.
- **Movement:** source Gray Wolf gait still drives the same four leg groups, adjusted for body scale; tail and ear movement, lunging bite and curled rest remain anatomically correct. No human limb animations.
- **Validation:** `node tools/generate-dire-wolf-states.mjs --check` detects source drift against original Gray Wolf art. All 4 source-backed modes, reduced-motion media preference and provenance verified in tests.
- **Release blockers:** human art/128/64/32px silhouette QC, source ownership and rights, real transparent WebM export and Foundry/Roll20 playback, media certification, commercial fulfillment. Noncommercial beta art only.
