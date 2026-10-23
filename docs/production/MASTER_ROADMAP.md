# Gridborn — master token production roadmap

**Production direction locked: 2026-10-21.** This is the living priority board for Gridborn artwork, animations, and storefront readiness. Update this document **in the same PR** that completes or reprioritizes a batch. The catalog code and actual export/test results, not this checklist, determine technical status.

**Current focus:** finish distinctive monsters and playable-looking character visuals at scale. Do not confuse catalog concepts, animated studies, or technically exported prototypes with visually approved products ready for sale.

**Mandatory clean selling storefront:** follow [Single Gallery & Merchandising Contract](STOREFRONT_SINGLE_GALLERY.md). There is one canonical product grid for all four categories; tabs, search, sorting and category shortcuts filter/navigate it instead of creating duplicate galleries or duplicating the same product card. CI and browser QA enforce uniqueness.

**Mandatory shared Lego-style anatomy:** follow [Shared Foundation and Layer Contract](SHARED_FOUNDATION_CONTRACT.md). Reuse each species/body-plan base rig, attachment anchors and locomotion states, then add independently authored identity/gear/role layers. Do not claim existing one-off source SVGs automatically inherit changes until they are migrated and tested.

**Mandatory equipment/animation QC:** follow [Weapon and Attack QC](WEAPON_ATTACK_QC.md). Melee must visibly swing or thrust, bows shoot arrows, crossbows shoot bolts, casters visibly cast; head clearance, credible grips, frame safety and 64px readability are blocking gates. Audit existing assets before increasing the roster.

**Mandatory before any new artwork:** follow [Research-to-Art Gate](RESEARCH_ART_GATE.md), recording individual source-backed anatomy, equipment, motion and licensing briefs before rendering. No study can be counted as a production asset without its research brief.

## Current production priority — species/body family first (October 23, 2026)

**Updated user direction:** build **one correct creature body foundation** and carry it through its actual adventurer, NPC and humanoid monster identities, with clothes, armor, profession props and equipment-specific attacks layered on top. Repeat with the next ancestry. This supersedes the older "finish all characters first" sequencing; it **does not** reduce the final 108 character / 48 NPC / 100+ monster targets.

1. **Human foundation** — existing Human adventurer variants, Human occupation roster, and any explicitly authored Human enemy designs. First animated Innkeeper merged in PR #77.
2. **Orc, Half-Orc, Elf, Dwarf, Goblin, Gnome, Halfling** — keep species morphology while sharing compatible role kits (e.g. Barbarian leather/axe, Knight plate/shield). Half-Orc currently lacks approved catalog identities and is a planned foundation only.
3. **Monster and animal body families** — Ogre, Skeleton, Wolf/Canine, Spider, Shark, Reptile, Construct, Dragon etc. Each body inherits only biomechanically appropriate motion and retains distinct species overlays and actions.
4. **Dragon batch example** — Red/Green/Gold and future color/metals share a four-legged, two-winged dragon rig; scale colors, horns/crests and distinct breath effects are overlays. Dragon Turtle, Wyvern, Pseudodragon, Half-Dragon and Kobold require other families.
5. **Every real ID gets source-linked Still, Idle, Move, one-shot Attack and Rest**, with research and test gates before merging. Each item remains unpurchasable until separate human art/VTT/IP/fulfillment approval.

See [Ancestry-First Production Queue](ANCESTRY_FIRST_QUEUE.md), [Cross-Category Batch Board](CROSS_CATEGORY_BATCH_BOARD.md) and [Shared Foundation Contract](SHARED_FOUNDATION_CONTRACT.md). Earlier Wave A/B/C sections below are historical project labels, **not the current execution order**. Do not inflate artwork counts from rig recipes, color metadata or index cards.

## Production method — complete first, improve in passes

**User direction:** Produce an individually recognizable, working first version of **every planned token** before spending multiple batches polishing isolated favorites. Preserve category **coverage targets** of **108 characters, 100+ monsters, 48 NPCs and animals**, but execute **body-family-first batches across categories**. After broad coverage, conduct systematic refinement rounds.

**Pass 1 — Coverage:** Audit identities/IDs; create original recognizable still art and distinct Idle, Move, one-shot Attack, and Rest sources for each planned token. Complete source-linked storefront preview and technical export checks. Do **not** count a generic rig recipe, palette-only swap, SRD index entry, or unfinished concept as a produced token. Work in small tested PR batches rather than a monolithic change.

**Pass 2 — Visual improvement:** Compare entire class/species/job family at 128/64/32px on light/dark maps; fix silhouette duplication, anatomy, clothing, props, and animation timing. Keep card height/width aligned.

**Pass 3 — Release certification:** Validate transparency, frame fidelity, loops, PNG fallback, real Foundry/Roll20 import, human review, original-art rights, accessibility, and fulfillment. No token is **sellable** merely because Pass 1 or Pass 2 is done. Keep checkout disabled until this gate clears.

The first passes aim for **complete coverage without mistaking rough prototypes for commercial-ready art**. A failed test, duplicated silhouette, or missing state blocks counting even in Pass 1. Update verified totals and blockers in each PR.

## Snapshot — October 21, 2026

| Scope | Currently evidenced | Target / explanation |
| --- | --- | --- |
| Catalog concepts | **518** | Searchable concepts, **not** 518 finished tokens |
| Original illustrated concepts | **41 proposed after both dragon batches (31 before PR #79)** | Some still-only; source art not yet commercially approved |
| Public four-state animated art studies | **40 proposed after both dragon batches (30 before PR #79)** | **21 Characters**, **16 Monsters** after ten dragons, **2 Animals**, **1 NPC** if both PRs pass |
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

All 12 classes now have at least one four-state *technical art study*: **Fighter, Barbarian, Wizard, Cleric, Paladin, Rogue, Ranger, Bard, Druid, Monk, Sorcerer, Warlock**. This is preliminary technical class coverage; human character-art QC, true VTT integration and 108-variant coverage are incomplete. The six class families below remain the top missing *class coverage* targets, independent of the expansion in Wave B.

- [x] **Ranger** — original longbow/quiver source and one-shot nock, draw and released-arrow SVG study; human art and media certification still required.
- [x] **Bard** — source-backed Halfling lute with a real string-plucking hand and directional resonant-chord spell; human art/media certification pending.
- [x] **Druid** — original female Human Wildspeaker with an oak-leaf mantle, living quarterstaff and directed thorn-vine spell. Media and human art review pending.
- [x] **Monk** — original Human Wayfarer with unarmored hand wraps, braced palm strike followed by attached front-kick pose; media and human visual QC pending.
- [x] **Sorcerer** — original Elf Sparkweaver focus in the open hand, separate branching charged bolt and grounded gesture distinct from Wizard or Druid; human art/media QC pending.
- [x] **Warlock** — original Dwarf Hexwarden open grimoire, floating occult seal and independent green-violet eldritch bolt. Media and human visual approval pending.
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

- [ ] Village Innkeeper starter ID `npc-inn-human`: source-linked four-state animation proposed in current PR (not one of 48 roster concepts; final CI pending).
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

## Original Elf Sparkweaver Sorcerer study — October 22, 2026

- Existing nonbinary-authored Elf Sparkweaver `pregen-sorcerer-nonbinary-1`: copper-haired three-quarter sprite, crystal focus hovering over anatomically attached casting hand, low-carried staff, embroidered innate-energy seams. Four original source-derived states, one-shot two-stage gathering/releasing electric bolt, research, generator, manifest and tests.
- Technical studies **20→21**, original illustrated concepts **22→23**, class coverage **10→11 of 12**; authored animated hero identities **5→6**. Catalog concepts still 518, sale-approved 0. This does not establish human art signoff or live VTT compatibility.
- Release blockers: 32/64/128px face/hand/clearance QC, alpha WebM and seam validation, actual Foundry/Roll20 import, character uniqueness, original rights/fulfillment. Keep GitHub-first.

## Hexwarden Warlock class-family coverage — October 22, 2026

- New original nonbinary Dwarf Hexwarden `pregen-warlock-nonbinary-1`: compact dwarf anatomy, asymmetric hood, held staff and open occult-lore book, autonomous invocation seal above the book and one-shot independent eldritch bolt. Source generator, Idle/Move/Attack/Rest studies, research, noncommercial manifest and Node/Python/media QA.
- Technical original-illustrated concepts **23→24**, four-state technical studies **21→22**; class-first *engineering* coverage **11→12 of 12**; authored-gender hero prototypes **6→7 of 108** (101 remain). Total 518 searchable concepts unchanged, retail cleared **0**.
- **Critical:** 12/12 at least one technical study is not 12/12 finished class product lines. Small-size human reviews, engine/browser/VTT media, license and sales delivery must still pass before selling; continue gender/style variants and NPC/monster/animal production.

## Orc Stonefist Monk variant — October 22, 2026

- Existing authored female Orc Stonefist `pregen-monk-female-3` now has a distinctly broad original sprite, stone-engraved waist wrap and gauntlets, side-shaved hair and braid, complete animated shoulder-to-fist downward hammer strike, dust recoil and source-derived Idle/Move/Attack/Rest.
- This is a **separate anatomy and action** from Human male Wayfarer (palm/front kick), not a palette variation. Research brief, deterministic renderer, prototype media contract and regression tests included.
- Planned stack counts: original illustrated **24→25**, four-state public studies **22→23**, character studies **14→15**, authored hero-variant animation studies **7→8 /108** (100 still need moving first studies). Total catalog concepts 518 unchanged, retail-certified assets 0. Class coverage remains at least one prototype per 12 classes.
- No commercial signoff: check full CI, manual 32/64/128px pose bounds/grips, actual VTT imports, rights, storefront checkout/fulfillment separately.

## Goblin Stonefist — third Monk gender study, October 22, 2026

- Original `pregen-monk-nonbinary-3`: short nonbinary-authored Goblin Stonefist, green compact limbs, tall ears, orange zigzag trim, guarded short-arm feint plus a **fully attached low heel-sweep limb** at separate hip pivot. New source-backed still/Idle/Move/Attack/Rest, generator, research, source parity, prototype media export and tests.
- Monk now has **one moving study for each authored gender** (male Human Wayfarer, female Orc Stonefist, nonbinary Goblin Stonefist). Distinct body silhouettes and separate attacks are mandatory; do not count these as nine completed monk variants.
- Planned stack counts: source-illustrated **25→26**, four-state studies **23→24**, character studies **15→16**, authored hero variant studies **8→9 /108** (99 still lack these studies). 518 concepts unchanged, zero commercially approved tokens. Individual human 32/64/128px, real VTT, encoded alpha, rights, fulfillment remain blocking.

## Orc Pathfinder Ranger: second authored Ranger study — October 22, 2026

- `pregen-ranger-female-1`: original female Orc Pathfinder anatomy, tusks/braid/fur-trimmed leather field armor, separate visible back quiver, recurve longbow with stable bow-hand grip; an independent draw-hand anchored at chin and resting/taut bowstring states drive a single separately released fletched arrow. No recolor of the Elven Ranger.
- Independently researched 2024 Ranger equipment and World Archery recurve stance/anchor/release. Each Idle/Move/one-shot Attack/Rest export is rendered deterministically from original SVG and tested for source parity and one-shot mechanics.
- Provisional source counts after this PR: illustrated studies **26→27**, four-state moving **24→25**, character studies **16→17**, gender-authored hero studies **9→10 of 108** (98 remain), total catalog 518, retail approved 0. This is development-only until full technical media + human 32/64/128px, VTT interoperability, original art rights and fulfillment checks pass.
- Ranger gender coverage: generic Elven Ranger and a female-authored Orc Pathfinder; nonbinary-authored Ranger variants remain unproduced.

## Nonbinary Goblin Pathfinder Ranger — October 22, 2026

- Existing immutable `pregen-ranger-nonbinary-1`: small-body original Goblin Pathfinder with pronounced paired ears, green/ochre stitched scout clothes, narrow back quiver and a compact hand-gripped recurve shortbow, not a size/skin recolor of female Orc or Elven Ranger. Source-backed Idle, Move, Attack and Rest; separate anchored string/drawing hand and one-shot independently released fletched shortbow arrow. Research grounded in 2024 Ranger equipment and real recurve archery.
- After proposed merge: illustrated studies **27→28**, full-motion **25→26**, character studies **17→18**, source-backed gender-authored hero variants **10→11 of 108** (97 still lacking). Catalog concepts 518, commercial approvals 0. Ranger has an authored female Orc and nonbinary Goblin study, but no *male-authored roster variant* yet.
- Production prerequisites remain genuine moving hand/string/arrow, actual full-frame 32/64/128px human QA, encoded alpha and zero seams, Foundry/Roll20 import, licensed art and VTT delivery. Existing prototype class coverage does not mean finished class product lines.

## Male Dwarf Pathfinder Ranger — third Ranger gender study, October 22, 2026

- New source-backed study for immutable `pregen-ranger-male-1`: original barrel-chested Dwarf Ranger with weathered face, two-fork braided gray beard, hood, rust leather field gear, sturdy low boots, individually fletched back-quiver arrows and physically braced field-yew recurve. Complete anchored drawing arm and dual-state three-point string fire an independent arrow; the right-hand anchor sits below beard and the gripped bow stays away from face.
- Idle, Move, one-shot Attack and Rest SVG studies derived deterministically from original source rig; Node/Python source-parity, original identity, equipment and one-shot tests; private media matrix and browser full-pagination checks.
- Male Dwarf, female Orc and nonbinary Goblin now have three **different anatomy-first** Ranger studies rather than three recolors. This does not imply 9/9 of Ranger variants or live VTT readiness.
- If stack merges: illustrated concepts **28→29**, four-state studies **26→27** (character moving **18→19**), authored hero variant studies **11→12 /108** (96 missing). Catalog still 518, retail approved 0. Human small-size QC, real Foundry/Roll20 import, alpha seam, rights and fulfillment remain blocked.

## Original female Orc Songweaver Bard — October 22, 2026

- Existing immutable `pregen-bard-female-1`: source-backed female Orc Songweaver with broad original species anatomy, braid/tusks/circlet, stage-performance coat, sword fully sheathed (not an impossible held weapon), realistically pear-bodied 11-course lute with frets, tuning pegs, bridge and rosette. Plucking and fretting hands are separately attached to the instrument.
- Source-linked Idle/Move/one-shot Attack/Rest, 1.4s Attack produces visible pluck and vibrating strings, then releases separate original harmonic gold/violet spell wave from the instrument (not sword). Research grounded in 2024 Bard instrument focus and Met Museum's lute construction.
- Provisional stacked counts: **30** originals, **28** four-state animated studies (**20 Characters**, **6 Monsters**, **2 Animals**), **13/108** authored-gender hero variants with source-backed animations; 95 lack a first study, class coverage 12/12; catalog concepts 518, retail-certified 0. Human 256/128/64/32px, source/RGBA/loop checks, actual VTT import, IP rights and fulfillment remain release gates.

## Elf Court Performer nonbinary Bard — October 22, 2026

- New source-backed `pregen-bard-nonbinary-3`, authored nonbinary Elf Court Performer: distinct silver-hair/pointed-ear silhouette, blue-teal court performance coat, circlet, safely sheathed sword and genuine extended-neck archlute (independent double pegbox, fret lines, rosette, bridge, string group). Complete connected fretting/plucking arms.
- Four deterministic original Idle/Move/Attack/Rest states, with 1.4s one-shot physical arpeggio and independent projected musical notation. Sources: D&D 2024 Bard instrument-focus and Met Museum archlute instrument construction; no copied external art.
- Preliminary stacked metrics: illustrated **30→31**, four-state animated **28→29** (**21 Character**, **6 Monster**, **2 Animal**), authored-gender hero identities **13→14 /108**, 94 remaining; total catalog 518, retail approved 0. Bard now has Halfling class study, female Orc and nonbinary Elf authored prototypes. Male Bard remains a priority for the 36-character gender milestone.
- CI still requires source/media/Chromium/Foundry; human 256/128/64/32px, actual VTT import, legal/IP and purchase-delivery gates remain open. Media matrix concurrency bounded at four installs with no checks skipped.

## Batch update log

| Date | Source | Result | Still open |
| --- | --- | --- | --- |
| 2026-10-21 | [PR #41](https://github.com/cbw29512/gridborn-vtt-store/pull/41) | 16 source-backed four-state technical art studies; Paladin, Gnome Rogue, Lizardfolk and Shark added; role-specific family design guidance | Art quality review, real VTT imports and commercial release |
| 2026-10-21 | [PR #40](https://github.com/cbw29512/gridborn-vtt-store/pull/40) | Uniform storefront card geometry; four additional animated studies | Approval of human-scale visual distinctiveness |
| 2026-10-21 | **This roadmap** | Next waves and product definition documented | Wave A Ogre roles, then Wave B character variation, missing classes and families |

**Update discipline:** Each production PR should reference this plan, report **before → after** verified animated counts, list new actual IDs and files, record passed checks and remaining blockers, and mark only verified work complete. Keep historical build notes in [BUILD_ORDER.md](BUILD_ORDER.md), but use **this document** as the current priority board.

## Shared western dragon family — Red, Green and Gold first batch · 2026-10-23

- **New original source rig:** `src/creature-rigs/dragon.mjs` defines one quadrupedal winged body with four legs, wings, head, neck, tail and joint anchors. Red, Green and Gold variations share exact geometry, while scales, horns/crests and fire/poison breath overlays are distinct; sources and four-state files are generated deterministically by `tools/generate-dragon-states.mjs`.
- **Source catalog coverage:** `src/dragon-family.js` inventories the exact **40 standard SRD dragon records** (10 colors/metals × wyrmling/young/adult/ancient), excludes Dragon Turtle, Wyvern, Pseudodragon, Half-Dragon and Kobold Warrior as incompatible body plans.
- **Three first art-and-motion studies proposed:** `mon-srd-52-young-red-dragon`, `mon-srd-52-young-green-dragon`, `mon-srd-52-young-gold-dragon`. Reuses existing immutable catalog IDs, adds original still and all four generated states, individual source references, manifests, and tests. No new index records or made-up product concepts.
- **Counts after merge, only if all CI passes:** illustrated **31→34**, public source-linked studies **30→33**, including **9 Monsters**. The other 37 standard dragon records are unillustrated, not completed.
- **Release blocked:** human 32/64/128px art checks, source rights/license, actual Foundry/Roll20 import, transparent WebM test, and checkout integration. Keep all products non-purchasable.

## Full ten-color dragon young-form completion proposed · 2026-10-23

- **Second color family PR:** adds Black, Blue, White, Brass, Bronze, Copper and Silver Young Dragons using the same `western-four-legged-winged-dragon` source body and four-state animation generator. Completes **10/10 standard color/metal Young Dragons** (10 of the 40 standard color×age combinations). The Wyrmling, Adult and Ancient 30 source records still require proper age/scale detail and actual renders.
- All ten now have individually defined scales, belly/wing materials, and crest/horn signatures. Acid, lightning, poison, cold, and fire use element-specific grouped effects, not identical flames. Source: official SRD v5.2.1; original silhouette/horn shapes are Gridborn's authored designs, not copied illustrations.
- If this stacked PR passes and merges after PR #79, source-linked original illustrations **34→41**, four-state previews **33→40**, moving monsters **9→16**, with **0** retail-ready. All seven new IDs are preexisting monster index cards.
- QC gate remains: source deterministic generator, full media/private CI, Chromium UI, human 32/64/128px silhouette/action verification, legal attribution and platform playback/import.
