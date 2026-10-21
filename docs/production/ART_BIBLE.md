# Gridborn V1 — Visual and animation production standard

**Scope:** twelve classic fantasy hero pregens + twelve frequent tabletop monsters.
These are **visual token archetypes**, not the gameplay/stat-sheet pregenerated
characters from the separate Iron Pit project. Source of truth:
[`hero-roster.json`](hero-roster.json) and
[`monster-roster.json`](monster-roster.json).

> **Release rule:** a card, rendered concept, rig, SVG animation, manifest or
> browser preview is **not** a finished product. Only independently reviewed,
> licensed, exported, platform-tested assets may be marked commercial-ready.
> The two existing animation studies (Human Fighter and Cave Goblin) are prototypes.

## Visual DNA

- **Camera:** anatomically grounded **side or three-quarter side** view for all
  nonhumanoid monsters and animals (sharks, wolves, dragons, spiders, oozes).
  Upright humanoids and humanoid-bodied undead/constructs may remain
  three-quarter/front when their face, armor and held equipment read better.
  Follow [MONSTER_CAMERA.md](MONSTER_CAMERA.md) and check true silhouette at
  64/32px; do not call frontal spider or overhead shark study final.
- **Shape:** original modular block-inspired forms—not Minecraft/Roblox art
  copies. Silhouettes must be identifiable with all surface markings removed.
  Organic monsters should **not** be forced into the human rig.
- **Canvas:** centered 256 × 256 RGBA sprite origin for technical prototypes,
  scalable source maintained separately. Keep the character within safe margins;
  no cropped weapon tips, wings, tails, claws or capes.
- **Scale:** preview at 256, 128, 64 and 32 pixels over both dark and light
  battle grids. At **64px**, check the defining species/class silhouette;
  at **32px**, at least overall color, body family and facing must remain clear.
- **Shading:** consistent upper-left key light; two shadow/edge levels and one
  tasteful highlight per major material. Metal, fabric, fur, bone, skin,
  chitin and gelatin should never share exactly the same surface treatment.
- **Palette:** validated five-color slots (skin/material, cloth primary, accent,
  hair/fur, metal). Allow optional species-specific secondary slots only as
  explicit schema extensions. Ensure clear contrast on both map backgrounds.
- **Anatomy:** head, shoulders, torso, arms, hands, legs, feet and independent
  equipment anchor transforms. Animal/monster families instead use anatomically
  correct joints (e.g., four paws or eight spider leg tips).
- **Anchors:** hand grips follow their wrist; off-hand shields follow off-hand;
  quiver, cloak, horns, beard, tails and held gear never detach during walking
  or striking. No two limbs passing unrealistically through rigid armor.
- **Character differentiation:** fighter ≠ paladin, wizard ≠ sorcerer, rogue
  ≠ ranger; cleric, bard, monk, warlock and druid each have distinct key gear.
- **Creature differentiation:** goblin ≠ orc; skeleton has *visible ribs*;
  zombie has an uneven dragging gait; kobold needs a reptilian head **and tail**;
  wolves use four feet; spiders have eight countable legs; gelatinous cubes
  have **no legs** and remain cubic during motion.
- **Originality:** original art only. Use generic fantasy creature and class
  concepts, not traced artwork, proprietary logos, copied distinctive designs
  or unlicensed D&D artwork. Conduct a rights review before commercialization.

## Animation contract

**Deliver independent state clips**, not a single long file that attacks
unprompted on a battle map:

| State | Motion contract | Export behavior |
|---|---|---|
| Idle | Subtle, endless breathing / blinking / twitch / sway, appropriate to creature | Seamlessly repeat, no automatic attacks |
| Move | Actual grounded gait: alternating humanoid feet; paws for beasts; articulated spider legs; slide/pulse for oozes | Repeat; preserve readable contact points |
| Attack | One readable anticipation → impact/action → follow-through → reset | **One-shot**; optional controller can return to Idle |
| Rest | Distinct anatomy: living creatures sit/sleep; undead slump/still; beasts curl; spiders fold; oozes settle | Repeat gentle, plausible state |

The public homepage may display a looping **showcase reel** of every action, but
the downloadable token default must be its *Idle* loop. The showcase reel is
advertising, not the underlying Idle product.

Motion should be visibly distinguishable at 64px and should convey *mass*:
ogres decelerate longer than goblins; skeletons are jerky; clothing trails;
heavy weapons have delayed recovery. All transitions must preserve the
character silhouette and prevent detached components or sliding feet.

## Technical acceptance gates

1. **Art source:** editable layered source and immutable asset ID; proportions,
   outline consistency, material shading and independent limb/gear anchors.
2. **Faithfulness:** explicit anatomy/gear checks in the roster passed by human
   reviewer at 256/128/64/32px and on contrasting maps.
3. **Motion:** Idle/Move/Attack/Rest evaluated at normal and reduced speeds,
   in both dark and light environments. No glaring intersection or foot skating.
4. **Loop tests:** Idle, Move and Rest have clean repeat seams with no visible
   jump. Attack has a clear start/end and does not repeat unless invoked.
5. **Private export:** transparent PNG still fallback; independent transparent
   VP9 WebM states, dimensions/frame counts/decoded alpha confirmed. Optional
   format variants based on real platform support; no guessed compat claims.
6. **Platform checks:** direct imports tested on current Roll20, Foundry,
   Owlbear Rodeo, Alchemy and other target VTTs where supported, noting any
   subscription/format limits and recording screenshots/video.
7. **Rights and commerce:** source rights, original designs, written usage
   license, secure delivery and real payment entitlement all confirmed.
8. **Accessibility & performance:** page previews keyboard navigable, visible
   Pause for prolonged motion, reduced-motion alternative, mobile and touch
   testing, readable metadata, and acceptable file sizes.

### Progress statuses

- `not-produced` — spec exists, artwork and movement not built.
- `catalog-concept` — placeholder listing only, not actual finished artwork.
- `static-study` / `static-related` — one existing concept drawing or
  related different-species reference; does not imply animation.
- `animated-study` — exploratory moving SVG/WebM exists but has not passed
  the full human art, rights or VTT acceptance gates.

A **complete** release requires all eight boolean `review` gates to be true
**plus an explicit separate release decision**. Reviews initially start false
for *all 24 entries*. No display page may infer purchasability from art status.

## Shared rigs to build and reuse

1. **Humanoid** — armored, robed, short/stocky, broad, small, horned:
   source-preserving variations, attachment slots, leg and arm locomotion.
2. **Skeletal/shambling undead** — different bones and gait, not a reskin.
3. **Reptile biped** — snout, tail, digitigrade legs, balanced tail swing.
4. **Canine quadruped** — shoulder/hip/paw gait, neck and tail.
5. **Arachnid eight-leg** — eight true legs, abdomen and fangs.
6. **Heavy brute** — oversized mass, distinct Ogre and Troll anatomy.
7. **Ooze cube** — translucent deforming material, no limbs.

**Dependency:** finish the rig family before multiplying species variants.
A shared humanoid rig is useful as a starting point, but no generic human
silhouette can count as a finished wolf, spider, kobold, or ooze.

## Next review checkpoint

- Approve **one Hero Fighter** silhouette and **one Goblin** silhouette at
  64px before expanding their shared rig.
- Confirm the **Dwarven Cleric and Rogue** variants actually distinguish
  body scale from human.
- Approve the **first Wolf quadruped anatomy pass**, **eight-leg spider rig**,
  and **skeletal ribcage**, rather than painting humanoid recolors.
- Compare full independent animation exports in real target VTTs before
  pricing or commercial launch.
