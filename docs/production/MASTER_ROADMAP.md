# Gridborn — master token production roadmap

**Production direction locked: 2026-10-21.** This is the living priority board for Gridborn artwork, animations, and storefront readiness. Update this document **in the same PR** that completes or reprioritizes a batch. The catalog code and actual export/test results, not this checklist, determine technical status.

**Current focus:** finish distinctive monsters and playable-looking character visuals at scale. Do not confuse catalog concepts, animated studies, or technically exported prototypes with visually approved products ready for sale.

**Mandatory equipment/animation QC:** follow [Weapon and Attack QC](WEAPON_ATTACK_QC.md). Melee must visibly swing or thrust, bows shoot arrows, crossbows shoot bolts, casters visibly cast; head clearance, credible grips, frame safety and 64px readability are blocking gates. Audit existing assets before increasing the roster.

**Mandatory before any new artwork:** follow [Research-to-Art Gate](RESEARCH_ART_GATE.md), recording individual source-backed anatomy, equipment, motion and licensing briefs before rendering. No study can be counted as a production asset without its research brief.

## Priority override — characters first (October 21, 2026)

**Current production focus: finish the full character roster before expanding monster families.** [Character production issue #44](https://github.com/cbw29512/gridborn-vtt-store/issues/44) supersedes the former Wave A Ogre-first ordering. Ogre production [issue #43](https://github.com/cbw29512/gridborn-vtt-store/issues/43) is deferred, not canceled. Existing completed studies and art direction remain valid.

1. Audit the 108 planned character identities and existing art/studies; do not count a concept as finished.
2. Establish at least one moving study for **all 12 classes** by filling Ranger, Bard, Druid, Monk, Sorcerer and Warlock gaps.
3. Complete distinct **male, female and nonbinary** character designs across each class (**36** unique studies).
4. Expand to **three male, three female and three nonbinary per class** (**108** distinct authored character variants) with Still, Idle, Move, one-shot Attack and Rest and the complete technical/media gate.
5. After the character milestone, return to Ogre Mage/Knight/King, remaining monster families, NPCs and animals.

This priority order changes sequencing only; **current verified counts do not increase**. The Wave A/B/C headings below are historical batch labels, not execution order. Each production PR must record truthful status and check outcomes.

## Production method — complete first, improve in passes

**User direction:** Produce an individually recognizable, working first version of **every planned token** before spending multiple batches polishing isolated favorites. Preserve category order: **108 characters → 100+ monsters → 48 NPCs → animals**. After broad coverage, conduct systematic refinement rounds.

**Pass 1 — Coverage:** Audit identities/IDs; create original recognizable still art and distinct Idle, Move, one-shot Attack, and Rest sources for each planned token. Complete source-linked storefront preview and technical export checks. Do **not** count a generic rig recipe, palette-only swap, SRD index entry, or unfinished concept as a produced token. Work in small tested PR batches rather than a monolithic change.

**Pass 2 — Visual improvement:** Compare entire class/species/job family at 128/64/32px on light/dark maps; fix silhouette duplication, anatomy, clothing, props, and animation timing. Keep card height/width aligned.

**Pass 3 — Release certification:** Validate transparency, frame fidelity, loops, PNG fallback, real Foundry/Roll20 import, human review, original-art rights, accessibility, and fulfillment. No token is **sellable** merely because Pass 1 or Pass 2 is done. Keep checkout disabled until this gate clears.

The first passes aim for **complete coverage without mistaking rough prototypes for commercial-ready art**. A failed test, duplicated silhouette, or missing state blocks counting even in Pass 1. Update verified totals and blockers in each PR.

## Snapshot — October 21, 2026

| Scope | Currently evidenced | Target / explanation |
| --- | --- | --- |
| Catalog concepts | **518** | Searchable concepts, **not** 518 finished tokens |
| Original illustrated concepts | **22** | Some still-only; source art not yet commercially approved |
| Public four-state animated art studies | **20** | **12 Characters**, **6 Monsters**, **2 Animals**, **0 NPCs** |
| Private animation packages | **16 previously technically certified; new Ranger export pending** | Private export pipeline; **not** real VTT import or artistic approval |
| Class archetypes | **12 classes** planned | First reach one approved male, female, and nonbinary character per class (**36**), then 3 per gender/class (**108**) |
| Hero variant concept roster | **108** | Concepts, **not** completed playable D&D pregens or animations |
| NPC concept roster | **48** | Concepts, not finished animated tokens |
| Monster index | **330 SRD 5.2.1 reference entries** | An index is **not** 330 produced monsters; production goal is **100+ distinct finished monster tokens** |
| Purchase readiness | **0** | Preview only; no approved art licenses, real-VTT acceptance, or fulfillment |

Progress snapshots must change when code and checks establish new facts. Never inflate these counts from new text entries, color swaps, or planned forms. **16 technically certified** means generated files met automatic requirements, not that buyers can download them.

## Non-negotiable art direction

1. **Recognizable species first.** Family members retain the same head, bone structure, proportions, stance, anatomy and scale. An Ogre mage must look like an Ogre.
2. **Role is obvious from equipment and details.** Outfit silhouette, weapon, armor quality, insignia, accessories, posture and *attack action* distinguish mage, knight, chief/king, hunter, guard and commoner. **A palette swap is not a new token.**
3. **Correct angle.** Nonhumanoid monsters/animals use a readable side or three-quarter-side profile. Humanoid characters and humanoid monsters generally use three-quarter views. All eight spider legs, quadruped joints, reptile tails and shark anatomy must read correctly.
4. **Small-square readability.** Inspect source art and actual motion at **128, 64 and 32 CSS pixels** on both light and dark map backgrounds. 64px is the primary one-square screen-size check; physical inches vary with display and zoom. Do not assume a moving frame automatically proves visual quality.
5. **No duplicate designs.** Before drawing, compare existing species-family source artwork, silhouettes and equipment. Do not give a basic Ogre polished royal equipment, or turn every Orc into the same Barbarian.
6. **Every promoted animated study has five sources:** Still + independently working **Idle, Move, one-shot Attack and Rest**. The storefront card must auto-demonstrate the four states, the detail viewer must permit inspection and hold-state playback, and reduced-motion users must get a still. Source files remain traceable and immutable.
7. **Calm gameplay, faster marketing.** Storefront shows all four actions in about **9–11 seconds** using authentic source motion speeds. Private gameplay controller holds Idle/Move/Rest indefinitely until a selection changes; Attack plays once and returns to Idle. No frantic automatic showcase cycle during a game. Configuration reads the token's own package timings.
8. **Visual consistency across cards.** Uniform image frames, equal product-card heights/columns, aligned title/content rows, aligned Details and Add-to-Bundle buttons and bottom-anchored prices on desktop and mobile. Test at 1440/390/320px.
9. **Original art and honest status.** Artwork must be original, not copied from proprietary game art. All studies remain **non-purchasable** until source rights, actual VTT importing, loop/alpha/scale quality, accessibility, licensing and secured delivery are approved.

## Production priority queue

**Status legend:** ✅ merged source-backed four-state art study with technical media checks (still requires human/VTT approval); ☐ not yet produced or not proven complete. *Role examples are original Gridborn proposals, not necessarily official stat-block variants.*

### Wave A — Ogre family (DEFERRED until character roster milestone)

Use the existing **Cave Ogre** anatomy as one consistent body-plan reference: hulking shoulders, massive forearms, tusks, broad face and heavy gait. The common Ogre sets the baseline; role variants must change apparel, weapons and motions visibly while keeping the Ogre recognizable.

- [x] **Common / Cave Ogre** — plain hides, crude stone club, rough heavy movement. Existing moving study; needs visual/VTT acceptance.
- [ ] **Ogre Mage** — fitted ritual robes, runes/charms, magical staff, spell-casting one-shot action, deliberate Idle.
- [ ] **Ogre Knight** — polished plate armor, better forged sword + reinforced shield, armored footfalls and guarded strike.
- [ ] **Ogre King** — crown, fur-trimmed royal mantle, ornate gold scepter, commanding gestures and ceremonial Rest.
- [ ] **Ogre family comparison sheet:** same anatomical landmarks and scale, four easily distinguishable 64px silhouettes, equipment readable, four distinct Attack actions.

**Delivery rule:** a checked-off role must have its own drawn accessories and source-specific four-state media, not merely the family profile metadata in [creature-family-standards.mjs](../../src/creature-family-standards.mjs). Check catalog legality/licensing and whether the variant is a new original Gridborn product before adding IDs.

### Wave B — Character coverage: Fighter, Rogue, Wizard, Cleric (CURRENT PRIORITY)

Preserve each class's recognizable gear. Expand male / female / nonbinary *authored identities* with different faces, hair, clothing construction, stance, weapons and signature moves—not cloned bodies with recolored outfits. Gender is defined by the character record, not inferred from appearance.

- [x] Existing base motion studies: **Human Fighter, Gnome Rogue, Elven Wizard, Dwarven Cleric** (technical prototypes).
- [x] Related individual pregen *visual studies*: **female Human Mercywarden Cleric** and **nonbinary Human Shadowstep Rogue**. Neither is a completed playable character sheet.
- [ ] Fighter: audit gender/ancestry coverage; create missing clearly differentiated variants until one male, one female and one nonbinary pass the full-motion gate.
- [ ] Rogue: same three-identity baseline; maintain visible difference between crossbow scout, dual-dagger sneak and other loadouts.
- [ ] Wizard: same three-identity baseline; distinct staffs, robes and casting effects.
- [ ] Cleric: same three-identity baseline; maintain difference between armored melee cleric and healer/mace/support roles.
- [ ] Review all twelve new combinations at 64px side by side and verify each class is recognizable from its gear and action.
- [ ] Then extend toward the **108-variant target** (three male, three female, three nonbinary per class, twelve classes), **without pretending generated recipes are finished artwork**.

Do not mark a demographic slot complete merely because a base class art study exists; verify the variant's intended gender, distinct art ID, four states and tests.

### Wave C — Complete missing class coverage (CURRENT PRIORITY; FIRST CHARACTER BATCH)

Classes represented by moving studies after Ranger, Bard, Druid and Wayfarer: **Fighter, Barbarian, Wizard, Cleric, Paladin, Rogue, Ranger, Bard, Druid, Monk**. The six class families below remain the top missing *class coverage* targets, independent of the expansion in Wave B.

- [x] **Ranger** — original longbow/quiver source and one-shot nock, draw and released-arrow SVG study; human art and media certification still required.
- [x] **Bard** — source-backed Halfling lute with a real string-plucking hand and directional resonant-chord spell; human art/media certification pending.
- [x] **Druid** — original female Human Wildspeaker with an oak-leaf mantle, living quarterstaff and directed thorn-vine spell. Media and human art review pending.
- [x] **Monk** — original Human Wayfarer with unarmored hand wraps, braced palm strike followed by attached front-kick pose; media and human visual QC pending.
- [ ] **Sorcerer** — innate magical aura/gesture distinct from Wizard.
- [ ] **Warlock** — pact focus and eldritch cast distinct from Wizard/Sorcerer.
- [ ] Each of the 12 core classes has at least one technically certified visual study.
- [ ] Each class reaches the 1 male / 1 female / 1 nonbinary approved-animation baseline (36 studies).
- [ ] Work toward the full 108 distinct authored hero variants.

### Wave D — Monster families, in production order

Produce the recognizable **common/base species first**, then build roles on that common anatomy. Reuse structure only where natural; each final role receives original apparel, equipment, silhouette and motion.

- [ ] **Goblin:** [x] Cave Goblin base; [ ] Boss (command/armor), [ ] Shaman (staff/talismans), [ ] Archer (bow/quiver).
- [ ] **Skeleton:** [x] Warrior base; [ ] Knight (plate/shield), [ ] Archer (bow), [ ] Mage (tattered robes/arcane casting). No breathing in any skeleton's Rest.
- [ ] **Orc:** [ ] Plain warrior/raider base, [ ] Shaman, [ ] Chief. Existing Orc Barbarian still-art is *not* full-motion; male Axe Vanguard is a separate animated character/pregen visual, not proof that the monster family is done.
- [ ] **Canines:** [x] Gray Wolf base; [ ] Dire Wolf (genuine scale), [ ] Worg (own anatomy/expressiveness), [ ] original Shadow Wolf variant (distinct effect, not just tint).
- [ ] **Spiders:** [x] Giant Cave Spider base; [ ] Phase Spider, [ ] Brood Spider, [ ] other cave spider roles only when unique. Keep eight articulated legs and 64px gait readability.
- [ ] **Reptiles:** [x] Swamp Lizardfolk base; [ ] Lizardfolk Shaman, [ ] Crocodile, [ ] Giant Lizard. Respect species-specific legs/tails rather than swapping humanoid props.
- [ ] Add other **100+ finished** monster targets by distinct silhouette/type/environment and production capacity: dragons, undead, elementals, oozes, beasts, fiends, constructs, etc. The SRD reference index is a planning aid, not completed media.

### Wave E — NPCs, animals and browsing quality

- [ ] Begin animating the **48 existing NPC role/ancestry concepts**, prioritizing Innkeeper, Guard, Blacksmith, Healer and Merchant; verify unmistakable occupational props.
- [x] Gray Wolf and Great White Shark have technical four-state studies. [ ] Continue land, air and ocean animal families with authentic movement anatomy.
- [ ] Regularly compare new product cards against adjacent old cards for equal visual/vertical alignment and readability.
- [ ] Revisit rest/sleep loop quality; no human breathing animation on undead, inorganic constructs or fish.

## Per-token acceptance checklist (copy into each PR)

**Identity:** proposed catalog ID / name / category / family / role / authored gender when applicable / source-reference URL or file.

- [ ] Verify there is no already-produced duplicate or essentially identical silhouette.
- [ ] Create/approve an original still at 256px with correct angle, species anatomy, clear clothing and role-specific gear.
- [ ] Inspect black silhouette and details at 128, 64, 32px on light and dark grids; correct clipping and bad poses.
- [ ] Create independent **Idle, Move, Attack, Rest** source states; loops are continuous, feet/legs correctly articulated, and **Attack is a one-shot**.
- [ ] Match Rest to creature biology and role. Keep combat/game loops calm; storefront demonstration should cycle quickly without accelerating source motion.
- [ ] Connect the exact same files to the storefront card, detail viewer and true-size preview. Keep product-card rows aligned.
- [ ] Create private media/export manifest; verify distinct decoded frames, durations, no loop snap, alpha, PNG fallback and source provenance.
- [ ] Pass Node, Python, responsive Chromium and private complete-roster media CI on the **final branch head**, fixing regressions without bypassing checks.
- [ ] Merge source study; update **snapshot, queue checkboxes and PR link in this roadmap in the same PR**.
- [ ] **Separate release gate:** visually approve, test actual Foundry/Roll20 import, inspect 1-square gameplay footage, verify original-art rights, accessibility and licensed downloadable packaging. Until then keep purchase disabled.

## Crossbow QC follow-up — October 22, 2026

- **Gnome Rogue (`chr-rge-gnome`)**: existing animated character study retained; original source artwork now contains a distinct, nocked crossbow bolt and its Attack generator separates and launches it toward the target. The bolt remains hidden in Idle/Move/Rest. New one-shot source/output regression coverage guards against a decorative flash being mistaken for a projectile.
- Reference rationale: National Museum of Finland crossbows and quarrels (https://www.kansallismuseo.fi/en/digitaalinen-kokoelma/tutkijan-valinta/jalkajousia-ja-vasamia); mechanical firing sequence (https://ms.copernicus.org/articles/17/359/2026/). The drawing remains original; references are for functional construction, not copied imagery.
- **Counts unchanged:** 16 public four-state art studies, zero approved retail tokens. Still awaiting human visual signoff at 32/64/128px, in-game VTT review, art-rights review and commercial certification.
- Follow-up audit: Fighter, Paladin, Cleric, Goblin, Ogre and Skeleton melee arcs, and remaining caster spell launch effects.

## Wizard spell-cast QC — October 22, 2026

- **Elven Wizard (`chr-wiz-elf`)**: Attack now releases an independently animated, visible arcane bolt from the focus; the projectile no longer inherits staff rotation and returns to an absent state outside Attack. The existing staff charge remains a separate effect.
- Source: the existing original Elven Wizard illustration and the source-specific `wave-two` animation generator; added a deterministic export-and-projectile regression test. No new catalog entry or commercial approval is claimed.
- **Counts unchanged:** 16 public four-state animated art studies; zero retail-ready tokens. Human 32/64/128px visual checks, real VTT playback, original-art rights review and fulfillment signoff remain mandatory.

## Ranger class coverage — October 22, 2026

- Original authored Elven Ranger (`chr-rng-elf`) still and independent four-state SVG studies, bowstring tension and released arrow, generator, manifest, individual art research and regression tests. Existing catalog identity retained.
- Public illustration count **18 → 19**; source-backed animated studies **16 → 17**; class coverage **6 → 7 of 12**. Total 518 searchable concepts unchanged and **0** commercial tokens. Prior 16 validated private packages do not automatically establish the new Ranger export.
- Pending source/human QC: visual 128/64/32px on light/dark maps, true frame boundaries, Foundry/Roll20 import, rights and fulfillment signoff. No production deployment.

## New Halfling Bard motion coverage — October 22, 2026

- Original `chr-brd-halfling`: distinct wine-red performer outfit, halfling proportions and pear-shaped lute with bent pegbox, multiple strings, frets and pierced rosette; two attached playing hands, independent Idle/Move/Attack/Rest states, one-shot plucked-chord spell, research brief, private manifest, generator and tests.
- Source-backed moving character prototypes 9→10; public four-state studies **17→18**; illustrated concepts **19→20**; class coverage **7→8 of 12**. Catalog concepts remain 518, retail-approved 0. Do not mistake this for an approved or sold token.
- Ranger and Bard each require their own source-generated media checks, 32/64/128px visual review, real VTT imports and original-art/licensing acceptance. No deployment to Netlify or purchase enablement.

## Human Wildspeaker Druid coverage — October 22, 2026

- New source-backed `pregen-druid-female-1`: original female Human Wildspeaker with braided hair, asymmetric oak-leaf mantle, bark/acorn charms, gripped living quarterstaff and a separate right-hand thornvine Attack. Five original source-linked art files (Still and Idle/Move/Attack/Rest), source generator, design research, testing and prototype media manifest.
- Illustrated concepts **20→21**, public moving studies **18→19**, class coverage **8→9 of 12**; verified authored gender-specific animated variants **4** (prior 3). 518 searchable concepts and **0** purchasable tokens unchanged. Human quality, export certification, VTT import, rights and fulfillment remain separate blocking gates.
- Drawing references use the official Druid starting-equipment description and USDA Forest Service oak morphology; no official or photographic imagery copied.

## Original Human Wayfarer Monk motion — October 22, 2026

- Human male authored variant `pregen-monk-male-1` receives original sprite still and four distinct source-derived Idle, Move, Attack, Rest studies, separate attached unarmed palm and full front-kick anatomical poses, practical hand wraps, no weapon; data-driven preview, research brief, private media manifest and tests.
- Technical study counts **19→20**, original illustrated concepts **21→22**, class coverage **9→10 of 12**; gendered completed *engineering prototypes* **4→5** across 108 hero-variant concepts. 518 total concepts and **zero** retail-cleared items unchanged.
- Prior class studies must still pass final CI and human 128/64/32px, live VTT import, IP and licensing and full checkout fulfillment review. No unapproved sale or Netlify deploy.

## Batch update log

| Date | Source | Result | Still open |
| --- | --- | --- | --- |
| 2026-10-21 | [PR #41](https://github.com/cbw29512/gridborn-vtt-store/pull/41) | 16 source-backed four-state technical art studies; Paladin, Gnome Rogue, Lizardfolk and Shark added; role-specific family design guidance | Art quality review, real VTT imports and commercial release |
| 2026-10-21 | [PR #40](https://github.com/cbw29512/gridborn-vtt-store/pull/40) | Uniform storefront card geometry; four additional animated studies | Approval of human-scale visual distinctiveness |
| 2026-10-21 | **This roadmap** | Next waves and product definition documented | Wave A Ogre roles, then Wave B character variation, missing classes and families |

**Update discipline:** Each production PR should reference this plan, report **before → after** verified animated counts, list new actual IDs and files, record passed checks and remaining blockers, and mark only verified work complete. Keep historical build notes in [BUILD_ORDER.md](BUILD_ORDER.md), but use **this document** as the current priority board.
