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
