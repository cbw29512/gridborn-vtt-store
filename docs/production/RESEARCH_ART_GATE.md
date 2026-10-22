# Gridborn — mandatory research-to-art production contract

This contract applies **before** drawing, animating, promoting, or selling any Character, Monster, NPC or Animal. The highest priority stays Characters (108), then Monsters (100+), NPCs (48), Animals. Work in complete-first batches and improve in family-wide passes; research cannot be skipped in the first pass.

## Data schema: one source-backed art brief per catalog ID

Create an individual brief that records:
- Immutable catalog ID, collection, name, ancestry/species, class or occupation, authored gender (when relevant), and intended grid footprint.
- **Research sources:** URLs and research date, the exact factual features supported by each source, licensing/attribution notes, what remains uncertain, and references to already-existing Gridborn art. The source is reference material, **not** permission to copy illustrations.
- **Body anatomy and silhouette:** head, limbs/joints, proportions, gait, posture and distinctive readable attributes at 128/64/32px.
- **Equipment and surfaces:** clothing purpose, tool/weapon function, material, construction, wear, rank/faction-neutral ornament. Distinct facial details and accessories; no recolor-only variants.
- **Movement storyboard:** Idle, Move, one-shot Attack, Rest; separate stage intent and biology/occupation-specific motions. Include source durations and preserve the showcase versus gameplay timing difference.
- **Readiness:** concept, art-reviewed still, source-backed moving study, exported-and-tested, actual-VTT-tested, human-art-approved, licensing-approved, commercially ready. These states are distinct, not synonyms.

## Character research gate

Cross-check playable class identity and recognizable gear/function against SRD and existing class concept specifications. A Fighter should not be indistinguishable from a Paladin; Wizard, Sorcerer and Warlock require different casting gestures, source artifacts and silhouettes. For each of the nine male/female/nonbinary authored identities per class, compare faces, ancestry anatomy, outfits, hair/headwear, weapons and movement. Gender is identity in the catalog, not inferred from facial/body traits. Do not count builder rigs or text concepts as drawn animation.

## Monster research gate

Use documented SRD species traits where available, independently verify anatomical structure and environmental movement for beasts, reptiles, arachnids and other real-anatomy analogues, and follow family body plans for fantasy roles. First compare base species, then add class/rank clothing, weaponry and movements. All eight spider legs must be present; sharks need correct side-profile fins/tail; undead/armor cannot show human breathing. Do not assume a named monster excluded from SRD is automatically licensed for commerce.

## NPC research gate

Study each occupation's functional equipment, load-bearing posture and characteristic routine before drawing: Innkeeper tray/keys; Farmer pitchfork/work boots; Guard shield/spear; Soldier badge/sword; Merchant scales/pack; Blacksmith hammer/tongs/heat-protective apron; Healer kit/bandages; Sage scrolls; Miner pick/lantern; Sailor rope; Priest stole/staff; Stablekeeper brush/reins. These examples guide research, not proof of historical universality. Review distinct Human/Elf/Dwarf/Orc anatomy and individual character variation. Do **not** render an absent specialized tool as an unrelated generic weapon.

## Fail-closed quality and release gates

1. Research brief signed off, references and licensing recorded, existing original art checked for duplication.
2. Original 256px still and independent Idle/Move/Attack/Rest artworks inspected side by side at 128/64/32px, with both light and dark grid backgrounds.
3. Physical motion plausibility and actions checked; storefront cycles ~9–11 seconds, gameplay loops hold state, Attack one-shot returns to Idle.
4. Traceable source files and export media manifest; decoded-frame differences, alpha, size, looping, and fallback pass. Storefront cards align at 1440/390/320px; reduced motion is respected.
5. Separate actual Foundry/Roll20 import, legal clearance, human visual signoff, accessibility and fulfillment check. **No checkout before all release gates pass.**

## Grounding sources (checked October 22, 2026)

- Official D&D SRD v5.2.1 — https://www.dndbeyond.com/srd (CC BY 4.0 content and brand exclusions explained; record exact relevant source section per design)
- Official Foundry media optimization — https://foundryvtt.com/article/media/ (WebM transparent token media, WebP static imagery, video frame rate and asset organization)
- Internal, versioned references: `src/hero-variants.js`, `src/creature-family-standards.mjs`, `src/npc-roster.js`, `src/npc-recipes.js`, `docs/production/MASTER_ROADMAP.md`.

Source links are research inputs. This document does not assert that 108 hero variants, 100 monsters, or 48 NPCs are drawn, visually accepted, or sellable.
