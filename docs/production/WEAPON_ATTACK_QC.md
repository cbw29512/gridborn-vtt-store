# Gridborn — mandatory visual QC and role-based attack animation contract

**Applies to every character, NPC, monster and armed creature.** This is a blocking production contract, not a new count of completed products. Read alongside [RESEARCH_ART_GATE.md](RESEARCH_ART_GATE.md), [SHARED_FOUNDATION_CONTRACT.md](SHARED_FOUNDATION_CONTRACT.md) and [MASTER_ROADMAP.md](MASTER_ROADMAP.md).

## Data contract (before drawing or writing animation code)
For every immutable catalog ID record: species/ancestry; class/job/role; anatomy references; intended weapon(s) and hand(s); attack category (melee, bow, crossbow, spell, natural attack, unarmed, or noncombatant); attack target/direction; grips, reach and safe visual clearances; and source-backed Idle/Move/Attack/Rest assets. An actual visible weapon/action—not the name of an ability—determines the choreography. Do not infer that all members of a class use the same attack: a melee Ranger swings, a bow Fighter fires, a wand-using caster casts.

## Blocking visual QC
- **Readable face/head:** weapons, staves, bows and shield edges must not occlude eyes, face, helmet or distinctive snout. Exceptions require documented intended attack framing and clear readability.
- **Believable hand and equipment attachment:** no floating swords; sword hilt aligns with gripping hand, spear shaft with grasp, bowstring with drawing hand, shield strapped/held on offhand. Keep tools outside body/face, with sensible proportions and weight.
- **Anatomy:** correct limbs/joints, balance, stance, contact and species-specific posture. A blade must not cut through the own torso, an arrow must not emerge from the head. No foot skating, distorted arm joints or shield/weapon intersection.
- **Visual identity:** class, job, species, weapon and rank legible at 64px. Check 128/64/32px, light and dark maps. Distinct role anatomy, silhouette and props; no palette-only variants. Maintain family resemblance across monster roles.
- **Stage and export:** entire weapon, hand, limbs and any projectile remain within frame at every attack keyframe. Correct alpha, no clipping; same baseline/card bounding box in gallery.
- **Motion quality:** independent Still, Idle, Move, one-shot Attack and Rest. Looping states do not pop or jitter; Attack has anticipation → actual action/contact or release → follow-through/recovery and returns to Idle. Rest posture differs from combat Idle. Storefront showcase fast enough to demonstrate all states; gameplay loops use normal calmer durations.

## Attack-animation contract: action MUST match equipment

| Attack type | Mandatory visible animation | Automatic fail |
| --- | --- | --- |
| Melee sword/axe/mace/club | Body braces, arm and **weapon visibly swing through an intelligible arc**, torso/weight follows, then recover to guard. Blade follows grip and faces target. | Weapon merely bobs or character translates without swinging; arm clips head/body |
| Spear/polearm | Thrust or appropriate sweeping attack with both grip and tip path visible; correct reach and braced footwork | Shaft intersects face or passes through own torso |
| Bow | Raise/aim bow, **draw bowstring**, nock/readable arrow, **release an arrow/projectile toward target**, relax/recover; bow stays gripped | Bow waves without draw/release; arrow stuck to bow or flying from face |
| Crossbow | Shoulder/aim crossbow, trigger/recoil, **bolt visibly launches toward target**, recover; reload only where consistent with action | Crossbow is waved as a club or bolt never releases |
| Spellcasting | Class/source-specific casting gesture/focus, visible charge or magical tell, **spell/projectile/effect visibly casts in a deliberate direction**, recover; distinguish wizard/sorcerer/warlock/druid/cleric, etc. | Staff only shakes or glow flashes without discernible cast |
| Unarmed/natural attack | Physically sensible fist/kick/claw/bite/tail motion for actual anatomy and attack method, with recovery | Generic sword-swing resolver or unnatural impossible limb arc |
| NPC/noncombatant | If an Attack state is required, choose an honest character-appropriate defensive action (e.g. club, tool, improvised strike) based on authored gear and documented context; everyday work motion belongs in Idle/Rest and must not masquerade as attack | Farmer silently fires invisible arrows; blacksmith tool teleports into hand |

For ranged effects distinguish anticipation, launch and recovery. The projectile should be separately animatable and follow a target-oriented path. Gameplay Attack plays **once**, then returns to Idle. If attack method is ambiguous, resolve it from the token's actual gear/research brief before animating.

## Specific existing failures to fix first
- `mon-swamp-lizard` — move spear shaft/tip off snout/eyes, physically grip spear, separate shield silhouette; attack shows a credible spear thrust with body bracing.
- `mon-dng-armor` — move sword away from visor/head, preserve distinct shield/weapon masses and plausible articulated arm grip; Attack clearly swings sword.
- Audit all existing armed prototypes, **not just these two**. Check Fighter, Paladin, Rogue, Cleric, skeleton, goblin, ogre and ranged/caster art without assuming they pass.

## Worker implementation sequence and evidence
1. Read existing art, motion generators, exported study files and research gate **before changing sources**. Identify shared state animation conventions, then keep token-specific art/parameters.
2. Fix documented blockers across the existing sixteen studies; use original source art and regenerate state exports rather than editing only a displayed still. Audit existing weapon paths at all keyframes and 32/64/128px.
3. For each source-backed token, record attack category, equipment, attack storyboard, head/weapon separation, grip, projectile path when relevant, and screenshot/frame evidence.
4. Write tests that fail on missing explicit weapon role action and absent source state paths; browser/media checks for actual path/visibility and frame changes. Automated checks **cannot** replace human visual review.
5. Execute existing Node/Python/media, Chromium desktop/mobile, Foundry controller and source provenance checks on final PR head. Record each pass/failure; never bypass a failing check.
6. Update master roadmap in same PR with truthful counts and acceptance blockers. Until human art signoff, actual VTT import, licensing and commercial fulfillment pass, set `purchasable:false`.

## Per-token human QC result
Each gate is **Pass / Revise / Fail**: species/anatomy, class/job clarity, face clearance, grips/equipment, attack action matching gear, 64px silhouette, all four state motions, frame boundaries, animated export, in-game VTT playback, rights/license. A single blocking Fail or Revise keeps commercial release disabled.

**No fake completion:** a mere moving placeholder or waving bow is not a compliant Attack; an entire catalog can be concepted while its production-ready count remains zero.
