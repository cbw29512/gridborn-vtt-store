# Gridborn — Creative Asset Batch 01

**Status: art direction proposals only, not finished artwork, animation, or commercial approval.** Follow [catalog-first production plan](../CATALOG_FIRST_PRODUCTION_PLAN.md) and [master roadmap](MASTER_ROADMAP.md). Before making a token: locate and reuse its existing immutable catalog ID, verify source/licensing and relevant natural/weapon anatomy, then implement source-linked still + Idle, Move, Attack and Rest. Do not increment animation counters for this document.

## Creative targets

| Family | Concept direction | Signature silhouette/material | Move | Attack animation | Rest |
| --- | --- | --- | --- | --- | --- |
| Characters | Dwarf Stormward Paladin | Hammer, kite shield, storm-blue cloak, thick low center of gravity | Shield-forward march | Braced shield beat then deliberate hammer arc and recoil, one hit event | Hammer planted, shoulders ease |
| Characters | Tiefling Emberglass Sorcerer | Asymmetric glass staff, curling horns, smoked amber layered robes | Light cautious side-step, cloak drag | Staff drawn back, palm opens and a separate traveling firebolt leaves hand | Staff held upright, embers extinguish |
| Characters | Halfling Briarfoot Rogue | Low soft-leather boots, sling over shoulder, leaf-stained hood | Low lateral sneaking gait | Short dagger thrust from near hip, weapon never crosses face | Crouches and inspects blade |
| Characters | Goliath Glacierguard Fighter | Broad shoulders, chipped stone shield, heavy axe | Heavy footfalls with counterweight | Full grounded axe chop and recovery; no disconnected hand | Wipes edge, resets shield |
| Monsters | Bog Ogre | Hunched large belly, sagging reed wraps, scarred club | Shoulder-led lumber | Two-handed club swing with full weight shift | Slumps and exhales |
| Monsters | Bog Ogre Hexer (variant) | Same species features, bone charm harness, staff, bog pigments | Slower crooked shuffle | Staff ritual gesture, separate projectile/curse wave, no club strike | Counts charms |
| Monsters | Bog Ogre Warlord (variant) | Same species skull/jaw, forged plate, oversized sword, banner | Confident armored stride | Wide two-hand sword slash, heavy recovery | Sword point down, command gesture |
| Monsters | Young Marsh Hydra | Multiple independently recognizable necks; lateral reptilian stance | Coordinated low crawl, heads compensate | A single selected head lunges/bites while others remain alive; avoid neck intersection | Heads settle asynchronously |
| Animals | Red Fox | Narrow muzzle, bushy tail, rust dorsal coat, dark legs | Clear diagonal trot | Quick natural pounce/bite with grounded forepaws | Curls tail around body |
| Animals | Great Horned Owl | Ear tufts, broad barred wings, powerful talons | Actual wing-beat sequence with feather articulation | Dive and talon extension, clear recovery | Perched head swivel |
| Animals | Reef Shark | Side silhouette, correct heterocercal tail and dorsal silhouette | Tail-driven lateral undulation, not sliding static art | Forward jaw opening and short bite lunge | Slow cruising cycle instead of sleep |
| NPCs | Traveling Apothecary | Glazed bottle rack, stained apron, field satchel | Walk with realistic weight of bottles | Defensive staff jab or vial toss according to equipment, separate vial release | Sorts bottles |
| NPCs | Blacksmith | Sooted apron, heavy forearms, tongs and hammer | Workman gait | Proper hammer strike with elbow/shoulder rotation | Works at anvil or cools metal |
| NPCs | Innkeeper | Towel, keys, sturdy vest, ledger | Short brisk service stride | Defensive improvised ladle/club swing only if on source card | Polishes tankard |
| NPCs | Harbor Watch Guard | Weathered coat, lantern, short spear | Patrol pace, lantern sway | Spear thrust with two-handed grip, no spear-through-face | Scans horizon |

## Cross-cutting art gates
- No palette-only variations: change body shape, posture, equipment, props, clothing construction, face and movement personality.
- Nonhumanoid monsters and animals prioritize readable side views. Humanoid designs may prefer front/three-quarter.
- Make weapons physically held; visible limbs connected, not floating or hidden by misplaced weapon.
- Spell effects, arrows, thrown vials and released objects must separate and visibly travel, not remain glued to character.
- Idle/Move/Rest loop naturally. Attack is distinct one-shot with clear anticipation, contact/release and recovery.
- Test 32/64/128 pixel recognition. Never label a concept production-ready on the strength of generated SVG and CI alone.
- No generated source art added by this PR; confirm research, mechanical appropriateness, catalog ID and rights before implementation.

## Build order
Continue the existing 108-character breadth-first animation queue, then systematically cover monster families, animals (land/air/water) and NPC occupations. These ideas can be scheduled when their existing catalog entries are reached; they **do not replace or expand catalog IDs without reconciliation**.
