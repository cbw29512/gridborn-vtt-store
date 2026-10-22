# Gridborn — Catalog-First Production Contract

Status: ACTIVE production direction (2026-10-22). This document guides subsequent asset PRs; it does not approve existing assets for retail.

## Definition of Done and counted states

The product is **not complete** when concept records or technical animation studies exist. Final completion means every planned character, monster, animal, and NPC is represented by independently reviewed, production-ready art and animated exports, with real VTT compatibility, rights, and purchase/fulfillment clearance.

Track separate counts: **planned**, **concept**, **original illustrated**, **four-state animation created**, **automated QC passed**, **human visual QC passed**, **real-VTT verified**, **rights/commerce cleared**, **production-ready**. Never promote a count from one column to another without proof. The current 518-concept inventory is a planning count, not 518 completed animations. Do not use tests passing as a substitute for human review. No checkout or production deployment based only on Phase 1.

## Production sequence

### Phase 1 — Build the complete animated catalog
1. Characters/pregens: 12 classes × 3 identity presentations × 3 distinct original variants = **108** authored variants; reuse existing immutable catalog IDs; verify actual manifest/source coverage before adding entries.
2. Monsters: populate **every planned monster catalog entry** with source-specific recognizable anatomy, weapons and abilities. Side-profile nonhumanoid monsters unless accuracy requires otherwise; humanoids may be front/three-quarter. Distinct ranks (basic/mage/knight/king) need appropriately different equipment, clothing, silhouettes.
3. Animals: populate land, air, and water groups with anatomically credible locomotion and behaviors. Do not fake aquatic or flying movement by translating a static drawing.
4. NPCs: populate all planned occupations and presentation variants with role-specific silhouettes and equipment. Include merchants, innkeepers, guards, farmers, priests, nobles, and other catalog roles.

A Phase 1 asset is **created**, not **production-ready**. Minimum per entry: distinct original still/source + source-linked Idle, Move, Attack, Rest animations, manifest/catalog mapping, deterministic generation where applicable, safe preview, baseline automated testing. Rest must be appropriate to asset type. Attack must match equipment or natural weapons, not generic glowing or a face-obstructing weapon. Keep work in small PRs and update progress counters from actual files/tests. Prioritize throughput and breadth before extensive second-pass polish, but reject major broken anatomy/media regressions immediately. Do not copy protected art.

### Phase 2 — Complete artistic and animation improvement pass
Review **every asset** at source size and 32/64/128 px. Audit identity distinctness (not palette swaps); anatomy, silhouettes, layering, weapons/hand grip, face occlusion, natural movement, follow-through, recovery, and seamless looping. Verify one-shot attacks actually fire/release/swing/cast and reset cleanly. Review transparency, cropping, visual weight, cardinal orientation, consistency, and full storefront grid spacing on desktop/mobile. Record and fix each issue by asset ID. No skipping entries because an automated test passed.

### Phase 3 — Commercial approval and release
Validate the rendered export in actual Foundry and Roll20 workflows, playback performance/format, scale, alpha, animation behavior, rights/licensing and original IP, commerce fulfillment, accessibility, search/filter, and mobile layout. Only assets that pass **all** gates are marked `production-ready` and eligible to sell. Keep Netlify production and checkout disabled until explicitly authorized and all release gates pass.

## Required tracker fields
For each immutable catalog ID record `category`, `subtype_or_class`, `identity_or_variant`, `source_art_path`, `animation_manifest`, `idle`, `move`, `attack`, `rest`, `technical_ci`, `human_qc`, `vtt_foundry`, `vtt_roll20`, `ip_review`, `commerce_review`, `production_ready`, `issues`. Use evidence URLs/commit SHAs, not assumed flags. Status transitions require checked artifacts.

## Active queue
Finish and validate the existing stacked character PR sequence #69 (nonbinary Goblin Ranger), #70 (male Dwarf Ranger), #71 (female Orc Bard), #72 (nonbinary Elf Bard), then the remaining character variants. Move into monsters, animals, and NPCs after completing the breadth-first character pass. Do not silently stop after characters. Keep automated gates for each PR; cancellations are not successes. Preserve the earlier production-quality standards while doing the initial comprehensive buildout.
