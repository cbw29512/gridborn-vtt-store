# Gridborn — shared foundation and layered token production contract

**ACTIVE · 2026-10-23.** The "basic Lego" rule: draw and animate one accurate foundation for a **body plan/species**, then compose role and identity layers over it. This rule applies to Characters, NPCs, Monsters, and Animals. It is a code/art production contract, **not** a claim that the current 29 previously merged animations already implement reusable inheritance.

## Architecture — compose, do not duplicate

```text
Immutable catalog ID / name
        │
  Family foundation
  (anatomy + skeleton/joint anchors + proportions + base idle/walk/rest)
        │
   ┌────┴───────────────────────────┐
   │   Ordered visual overlays      │
   │ species identity / skin / face │
   │ clothing + profession/rank     │
   │ physically anchored gear/props │
   └────┬───────────────────────────┘
        │
 Motion specialization
 (body-plan motion + weapon/role choreography + separate released effects)
        │
 Deterministic source-linked still and Idle / Move / Attack / Rest
        │
 Preview/test manifests → final QC → separate commercial certification
```

### 1. Data schema first

Each **family foundation** defines:

| Field | Required behavior |
| --- | --- |
| `foundationId` | Stable internal body-plan/species key, **not** a catalog product ID |
| `sourceFoundation` | Actual shared original anatomical drawing or reusable rig module (do not create a fake link) |
| `bodyPlan` | Humanoid, quadruped, arachnid, serpentine, shark, bird, etc. |
| `joints` | Named head, shoulders/hips, elbows/knees or anatomically appropriate equivalents; no invented limbs |
| `attachmentSlots` | Hand grips, spine, back, belt, head, shoulder, wing/tail sockets and other physically valid anchors |
| `motionInterfaces` | Baseline Idle, Move, Attack and Rest plus appropriate one-shot/loop timing; source-specific behavior supplies parameters |
| `projection/groundBaseline` | Consistent species camera, fixed foot/contact plane and viewBox |
| `sourceRights` | Original-art provenance and third-party reference/license notes |

Every **variant** then records its **existing immutable catalog ID**, foundation ID, authored presentation identity, unique face/hair/body details, chosen clothing, equipment/role overlays, actual equipment grip slots, attack type/trajectory, and exactly which base motions it can reuse versus those needing a specialized variant. A new catalog ID requires reconciliation with `src/catalog.js` first. Names alone never select behavior.

### 2. Layer order and ownership

1. **Foundation:** species anatomy and rig skeleton. This is the only owner of joint placement and physical body proportions.
2. **Individual identity:** distinct facial construction, hair, anatomy details, posture and personality; gender is catalog-authored and not deduced from appearance.
3. **Role:** occupation/class/rank apparel, armor, tools, packs, insignia and material details. Base Ogre → Mage/Knight/King keeps ogre anatomy; no "palette swap".
4. **Equipment:** attach handles to the correct palm/grip, bowstring to drawing hand, shield to arm, instruments to physically connected hands; anchored gear follows the joint's motion.
5. **Effects:** arrows, bolts, spells, thrown objects and contact particles **separate from** the owning hand/weapon when launched.
6. **Animation overrides:** reuse base stride, breathing where biologically appropriate, and safe rest where compatible; replace Attack with the action demanded by the actual equipment. Never fake a sword swing using a color change.

Layer order is explicit and deterministic. No overlay is allowed to silently redefine foundation anatomy, disconnect a limb, change species, or force geometry through head/face. One source rig is reused for related family members; a role with genuinely different body biomechanics gets a new foundation.

### 3. Reuse boundaries for each category

- **Humanoids:** Start with existing `src/builder-rig.js`, `src/rig-proportions.js` and the caster/performer/specialty part renderers where suitable. Human, Elf, Dwarf, Orc and Goblin may share **joint semantics** while retaining distinctive species ratios, head anatomy and gait. Source-specific finished art can look unique and must not be recolors.
- **NPCs:** Innkeeper/merchant/blacksmith/guard share compatible humanoid skeletal foundations but each adds proper profession props and a meaningful distinct work/rest/defense motion. An innkeeper's mug and a blacksmith's hammer move with the grasping hand; tool shapes must exist rather than be mislabeled as a mace.
- **Monsters:** Cave Ogre foundation retains tusks, massive forearms and lumbering stance across Common/Mage/Knight/King. Skeleton foundation retains rigid bone mechanics and never breathes. Spider foundation maintains eight moving legs. Use `src/creature-family-standards.mjs` for existing family rules; extend only after verifying the underlying anatomy and source art.
- **Animals:** Canine foundations can share quadruped gait concepts but Gray Wolf/Fox/Dire Wolf still require scale, head and gait differences. Sharks require side silhouette and **lateral caudal beats**; dolphins require **vertical fluke strokes**. Do not inherit species-inaccurate biology merely because both swim.
- **Flight/other:** Bird/flying locomotion needs an actual wing-beat joint rig; it cannot inherit a sliding walk transform. Undead/inorganic/underwater Rest must respect biology.

### 4. Animation contract

Each original token has **Still + source-linked Idle, Move, one-shot Attack and Rest**. Base movement is inherited where compatible, with overrides supplied by the source-specific equipment/limb motion and parameterized intervals. Attack has anticipation, contact or release, recovery and resets. UI showcases ~9–11 seconds across all four independent states; gameplay keeps Idle/Move/Rest cycling and plays Attack once. Reduced-motion uses still source. Source art, generated states and manifest must match byte-for-byte generation where applicable.

### 5. Inheritance regression gate

Before accepting a batch:

1. Verify the proposed variant's `foundationId` exists and its base joints and reference material are real (not promises).
2. Verify consistent joint/attachment IDs for all compatible body-plan variants. Clothing must layer over, not replace, the anatomical foundation.
3. Compare at least two family variants side-by-side: same species bone plan, distinct silhouette, face, outfit, equipment and action at 32/64/128px on light/dark maps.
4. Inspect each state keyframe for grip attachment, grounded feet, overlap, clipping and projectile detachment.
5. Rebuild/check all source-derived states for the changed foundation and every inheriting variant. A shared-base edit is a **batch-wide** regression, not a localized palette edit.
6. Run Storefront/Chromium/Foundry/private media gates and retain human/real-VTT/IP checks as **separate** later commercial release conditions.
7. Record which legacy one-off sprites **actually use** the shared rig. Do not market or claim universal shared-base migration from this document alone.

### 6. Current adoption and next transition

The existing builder already assembles humanoid proportion/face/equipment layers; the creature-family metadata already specifies what Ogre role layers must preserve. The current Village Innkeeper PR is a **first articulated NPC study** with separately anchored legs, body, serving arm/cup and effect. It **does not yet inherit from a generic reusable Human foundation**; that conversion should follow after verifying that the existing builder and token-art cameras, proportions and animation rigs are compatible.

Next actual implementation batch: extract a reusable **Human NPC foundation** shared by Village Innkeeper and one new unique Human occupation variant, without destroying the authored faces/clothes/props. Only count that extraction when source code and tests demonstrate both assets consuming the same foundation. Later extend to Dwarf/Elf/Orc humanoids and separately to monsters and animals.

**Definition of Done for complete Gridborn:** all planned catalog entries have genuinely distinct original artwork and all four animated states published in preview; then every asset passes human art/motion QC, real Foundry/Roll20 import, rights and fulfillment before the production-ready count increases. No checkout or Netlify promotion in this phase.
