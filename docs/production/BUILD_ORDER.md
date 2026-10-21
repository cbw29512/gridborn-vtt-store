# Gridborn V1 — production queue and morning review

The two JSON rosters contain the authoritative **12 hero + 12 monster**
specifications. This board defines sequence and expected dependency, not a
claim that art has been completed.

| Wave | Hero artwork targets | Monster artwork targets | What must be reviewed |
|---|---|---|---|
| 1 | Human Fighter, Elven Wizard, Dwarven Cleric, Gnome Rogue | Cave Goblin, Orc Raider, Skeleton Warrior, Zombie | Humanoid shape accuracy; nonhuman ear/rib/face shapes; distinct class gear |
| 2 | Orc Barbarian, Human Paladin, Elven Ranger, Halfling Bard | Kobold Scout, Gray Wolf, Giant Cave Spider, Bugbear Marauder | Short/broad/tailed rigs; believable quadruped and arachnid motion |
| 3 | Tiefling Warlock, Human Sorcerer, Human Monk, Human Druid | Hobgoblin Soldier, Cave Ogre, Mountain Troll, Gelatinous Cube | Unique caster and monk identities; monster mass; truly cubic ooze |

## First actual production pass

1. **Fighter:** revise Idle/Move/Attack/Rest as independent clean loops,
   verify grounded footsteps, attached shield/sword and believable seated Rest.
2. **Goblin:** redraw as smaller, hunched and long-eared; animate skittering
   gait with independent limbs; differentiate from Orc.
3. **Skeleton:** exposed bone anatomy, hollow eyes, ragged movement;
   ensure resting does *not* breathe like a living person.
4. **Dwarven Cleric:** broad dwarf rig, prominent beard, mace and shield;
   original holy symbol; fix proportions before multiplying dwarf roles.
5. **Wolf/Spider:** prioritize genuine quadruped / eight-leg joint engines,
   not recolored humanoids.

## Review rubric

For each asset: show (a) 256px colored still, (b) flat-black silhouette at
64px, (c) 32px gameplay-sized sample on light and dark map, (d) grounded
Move loop, (e) unique Attack and Rest, (f) final private WebM alpha/loop
QA receipt, and (g) actual platform import. Reject on any missing leg,
wrong species shape, unsuitable weapons, fake walking, dangling equipment,
illegible silhouette, loop snap, or unproven platform claims.

## Current implementation reality

- The browser builder has six concept presets and seven editable humanoid
  slots. **It is not yet the twelve finished hero token packages.**
- Catalog includes concepts for some additional classes and monsters. A
  catalog label is not proof of completed artwork or animations.
- Human Fighter and Cave Goblin are the only source-linked moving prototypes.
  Even those remain unreviewed against the final visual and VTT gates.
- Do not conflate this roster with the hundreds of stat-based Iron Pit
  pregenerated characters; these are twelve *visual class archetypes*.

## Priorities for the next session

1. Evaluate Fighter vs Goblin art quality at 64px.
2. Approve proportion/shading changes for Goblin, Skeleton and Cleric.
3. Build the first non-humanoid gait (Wolf), then arachnid gait.
4. Continue adding independent Idle/Move/Attack/Rest source files per approved
   rig family, with CI receipts and preview-only status until release.

### Skeleton art pass (pending visual acceptance)

Skeleton Warrior has a new original static concept with an open rib cage,
visible pelvis, separately rendered upper/lower bone limbs, hollow sockets,
chipped jaw and deliberately partial armor. This is a first anatomical art
pass, not an approved animation, market-ready token, or certified gameplay
import. Check the new silhouette at 32/64/128/256px before adding its jerky
Move and fully inert Rest animations.

### Gray Wolf quadruped source rig — prototype pass

The first original four-legged rig now uses distinct near/far forelegs and
hindlegs (four separately articulated groups), a long muzzle, erect ears,
and tail. Independent generated SVG **Idle, Move, Attack, Rest** studies live
in `assets/demos/gray-wolf-*.svg`; the still is
`assets/studies/gray-wolf.svg`. Source and deterministic build/check are in
`src/creature-rigs/wolf.mjs` and `tools/generate-wolf-studies.mjs`.
The catalog's existing **Gray Wolf animal** entry previews these states.
One-shot Bite returns to Idle in the study UI; Rest is a **curled wolf**, not
a seated humanoid. No WebM exports, human art approval or VTT import test
have been passed. Do not use this artwork for the separate larger Dire Wolf
listing without accurate scale and anatomy review.

### Giant Cave Spider eight-leg creature rig — prototype pass

Added an original front-facing arachnid (not a humanoid recolor) with eight
separately grouped/hinged legs, two distinguishable anatomical body regions,
eight tiny eyes, pedipalps, and paired fangs. Generated source-controlled
Idle, Move, one-shot Bite/Strike, and geometry-folded Rest prototypes now
exist under `assets/demos/giant-cave-spider-*.svg`; its static source is
`assets/studies/giant-cave-spider.svg`. Regenerate with
`node tools/generate-spider-studies.mjs` and check drift with `--check`.
The **Move** state moves alternating sets of four legs and bobs the body;
**Attack** plays once and returns to Idle in the existing catalog preview;
**Rest** is an eight-leg folded pose. These need human silhouette reviews,
loop-seam inspection at 32/64 pixels, licensed asset clearance and proper
transparent WebM exports before any commercial or VTT compatibility claim.

### Human Paladin — distinct class art and tabard outfit prototype

Human Paladin now has a separate original artwork study with a long ivory
ceremonial tabard, blue mantle, crest helm, original radial sun insignia,
ornate shield and sword. The editable humanoid builder adds a distinct
`Paladin tabard` outfit slot, the `radiant` palette and its own class
starting recipe. Its tabard keeps the same leg/arm/equipment attachment
system but changes the character silhouette independently of the Fighter.
Static artwork is not a certified VTT or animation product. Animated
Idle/Move/Attack/Rest exports remain future work and all review checks open.

## Full catalog expansion and 108 class variant requirements

- Index complete: **330 SRD monster names** (CC BY attribution on site),
  plus distinct Gridborn flavor-variant monster concepts.
- **12 class queues × (3 male + 3 female + 3 nonbinary) = 108 individual
  planned hero character designs.** Nine per class require their own
  completed original appearance and animation artwork; choosing an editable
  starter recipe is **not** completing that requirement.
- **48 NPC concepts**: twelve occupations across four ancestries. Add
  equipment silhouettes and individually authored appearances.
- **Profile camera**: nonhumanoids (including sharks, wolf, dragon, spider,
  ooze) side/three-quarter side. Humanoid monster front/three-quarter.
- Completed new shark first static **profile** study; existing frontal
  nonhumanoid spider and other drawings remain **visual prototypes**.
- Next production priorities: approve shark profile at 64px; revise giant
  spider to side profile; build Rogue and Ranger class visuals; then wolf and
  dragon size variants. Distinct animations and manual VTT tests still required.

### Cave Goblin four-state public study (October 21, 2026)

The existing Cave Goblin design now has independently reviewable **Idle**,
**Move**, one-shot **Attack**, and **Rest** SVG studies, without adding
another catalog entry or claiming a ready-for-sale product.

- Generated source `src/creature-rigs/goblin-states.mjs` keeps the same
  original body/ears/blade/buckler art from the 45-second master SVG.
- `assets/demos/cave-goblin-idle.svg` breathes/blinks without attacking.
- `assets/demos/cave-goblin-move.svg` shows opposing independently animated
  legs, body bob, buckler and blade movement.
- `assets/demos/cave-goblin-attack.svg` performs one wind-up, swing and
  reset over 1.4 seconds; its catalog controller returns to Idle.
- `assets/demos/cave-goblin-rest.svg` retains the earlier six-second loop.
- Rebuild deterministically: `node tools/generate-goblin-states.mjs`.
  Detect drift: `node tools/generate-goblin-states.mjs --check`.
- Chromium regression opens the real catalog dialog in three viewport sizes
  and tests movement, action reset, rest, and keyboard focus.

**Still not complete:** the 45-second master is what the *private* VP9-alpha
media exporter currently samples. These public SVG studies are not
independently WebM-exported or tested in a commercial VTT. Human review of
appearance/stride and loop seams at 256/128/64/32px on light/dark grids,
licensed art approval, full decoded-alpha technical QA, and direct target-VTT
import are still release blockers. `purchasable` stays `false`.
