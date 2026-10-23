# Gridborn V1 — production queue and morning review

> **Current ancestry-first build queue:** [Ancestry-First Production Order](ANCESTRY_FIRST_QUEUE.md). This is the current executable family-by-family order. **Historical notes below are retained for reference**, not current status.

**Current priorities and verified progress:** see [Gridborn Master Roadmap](MASTER_ROADMAP.md). This build-order file preserves earlier chronological production notes, some of which refer to completed historical prototypes and are **not** the latest status. Update the Master Roadmap with each future batch/PR.


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

### Cave Goblin — state-exact private media packaging

The independent Idle / Move / Attack source SVGs now flow directly through
the private media renderer when `--controller-package` is used, with a
manifest-validated source, duration and decoded VP9-alpha QA for each clip.
Goblin action no longer lasts ten seconds merely because the old master
showcase's Attack and Recovery sections were combined; the one-shot is
**1.4 seconds**. Rest remains a distinct six-second clip. The technical
receipt distinguishes `independent-svg-states` from the older
`master-reel-split` Fighter package. Human visual reviews at 32/64px,
real Foundry/Roll20 imports, original-art rights and secure delivery are
still required before approving either asset for sale.


### Fighter four-state source production (October 21, 2026)

The existing Human Fighter Idle source remains canonical. Its Move SVG now
uses independently rotating legs, body bob and attached sword/shield motion;
its Attack SVG is a single 1.4-second wind-up, hit and return to guard.
Both are generated deterministically from the existing Fighter Idle art
(`node tools/generate-fighter-states.mjs --check`), and are available in the
catalog's Idle/Move/Attack/Rest study viewer. The separate automatically
looping homepage Fighter marketing showcase is unchanged.

The **private** media manifest maps all three actual state SVGs, with
3.2-second Idle/Move and 1.4-second Attack durations. Private certification
produces 32/32/14/60-frame Idle/Move/Attack/Rest WebMs with decoded alpha and
source provenance. This removes the prior 10-second Attack clip that included
seven seconds of unnecessary recovery. Visual approval, genuine VTT imports,
rights, license and secure downloads remain outstanding. Commercial status
remains **preview only**.

### Gray Wolf — source-exact private media exporter (October 21, 2026)

The Gray Wolf now has a `stateOnly: true` manifest, so its four
**independent** original SVG studies export directly to private VP9 alpha
clips, rather than being split out of a fictional 45-second humanlike reel.

- Idle: **3.2s (32 frames)**. Tail, ear and breathing phases now share
  the same cycle length to prevent export seams.
- Move: **2.0s (20 frames)**, with two diagonal-pair trot cycles.
- Attack: **1.3s (13 frames)**, single forward lunge/bite.
- Rest: **4.8s (48 frames)**, a curled quadruped pose.

`tools/export_states.py` reuses existing frame rendering, full-decoded
VP9-alpha QA and Foundry packaging. The state manifest validates paths,
timings, format, and preview-only status; receipts include the exact source.
`tools/generate-wolf-studies.mjs --check` confirms authored source consistency.

This is **technical export work, not release approval**. Review the actual
silhouette/leg motion at 256/128/64/32px; import it into the intended VTT
and verify looping, facing, transparency and FPS; establish source rights and
license. It remains unavailable for purchase.

### Automatic storefront animation previews (October 21, 2026)

The actual catalog cards—not just the detail modal or homepage banner—now
cycle through **Idle → Move → one-shot Attack → Rest** automatically for
art-studies that have all four existing SVG states: Human Fighter, Cave
Goblin, Gray Wolf and Giant Cave Spider. Each card identifies the current
animation; no Play button is required. The source files are identical to
the ones used in the corresponding individual state preview.

The shared `src/catalog-motion.js` controller starts motion only when a
card is near the viewport, stops/cleans timers when filtered away, pauses
when the page is hidden, provides a visible Pause/Resume control, and
respects the operating system's reduced-motion preference. Cards without
real motion sources stay static. Media failures revert to the original
static concept art. The unit and Chromium browser suites verify all four
states, actual frame changes, 320/390/1440px layouts, pause/restart,
search rerenders, and reduced-motion stills.

**Important:** These are existing public SVG *art studies*, not the actual
private WebM deliverables, commercially approved purchases, or verified
VTT imports. Catalog labeling remains preview-only and checkout disabled.

### Hard rule: every moving catalog study must show all motion (October 21, 2026)

`src/production-motion-gate.mjs` runs at storefront initialization and in
unit tests. A token marked `animationStatus: art-study` must have canonical
**Still, Idle, Move, one-shot Attack, and Rest** SVGs and a positive
`actionDurationMs`, labels for each animation, and matching original art.
Incomplete or incorrectly linked animation entries fail the gate instead of
being deceptively promoted as moving catalog products. Static concepts
remain explicitly labelled as static concepts and cannot claim sale readiness.
The catalog automatically places verified moving studies first and cycles
their actual source files on the cards.

### Skeleton Warrior prototype: fifth full-motion showcase

Skeleton Warrior now derives four public states from its existing original
anatomy-first static study (`node tools/generate-skeleton-states.mjs --check`).
Idle is an unnatural three-second skeletal fidget, not breathing. Move
alternates separate skeletal legs on a 1.2s cadence over a **2.4s** repeating
clip. Attack is a **1.4s** single sword strike with a bracing shield. Rest
shows a **collapsed, inert corpse** with only a faint spectral eye glimmer,
not a living character's breathing or sleep animation; **4.0s**.

All four states are available in the catalog's automatic card showcase and
individual detail-preview controls. The state-only private manifest declares
3.0s Idle / 2.4s Move / 1.4s Attack / 4.0s Rest at 10 FPS,
creating 30/24/14/40-frame VP9-alpha study clips when technically certified
in the private full-media CI job. The visual silhouette, bone placement,
lighting, 32/64/128/256px usability, original-art rights, real target-VTT
imports, protected downloads and buyer license still require review.
**No purchase is enabled**, and no Netlify production deployment is made.

### Buyer showcase versus calm game playback (October 21, 2026)

These are **different controls**. The storefront automatically showcases
all four states at the artwork's real animation rate: one full authored
Idle loop, one full Move loop, one complete one-shot Attack, then **2.4s of
Rest**. This is roughly **8.9–11 seconds per catalog cycle** across the five
current art studies. Nothing is artificially sped up. Rest's full private
video still loops for its authored 4–6 seconds and is never truncated in
the delivered asset; only the storefront's on-card preview of Rest is short.

The existing optional *unverified* Foundry developer HUD is deliberately
**manual**, not coupled to marketing playback. A chosen Idle, Move or Rest
loops **indefinitely** until an authorized user clicks another mode.
Attack plays once and returns to Idle after that token's duration. The
HUD lets a user configure the asset folder and exact Attack duration in
seconds, without editing or rebuilding files. Its default is now **1.4s**
instead of the obsolete ten-second reel; Gray Wolf currently uses **1.3s**.
A private source receipt also declares the precise `attackMs` per token.

### Giant Cave Spider true 1-square motion QA and source media

The original eight separately articulated legs and diagonal tetrapod gait
are preserved; do not flatten them into a pulsing blob. Idle breathing,
palps and settling legs now all align to the **3.6s** idle cycle; Move
repeats its gait every **1.2s**, twice in the **2.4s** export. Attack
plays one **1.4s** fang lunge; folded Rest remains a **5s** animation.

The source-only private manifest uses 36/24/14/50 frames at 10 FPS,
producing four verified VP9-alpha WebM clips and a PNG only in temporary
private CI storage. Browsers check actual animation movement at 128px,
64px and 32px map-square sizes within the detail modal, on each viewport.
This measures real pixel change, **not human visual discernibility**
or a guaranteed physical 1-inch size; VTT zoom and display density vary.
Final artwork leg readability at 32px, genuine Foundry/Roll20 imports,
source rights, purchase license, protected downloads and human QA still
block commercial release.

### One-step private Foundry package timing setup

The optional Foundry developer HUD now auto-loads the validated
`gridborn-preview.json` receipt from the same locally selected Data
folder as the four WebM clips. All five existing private export packages
contain their **own actual `attackMs`**. Setup verifies the four local WebMs
and the receipt, automatically selects the correct one-shot Attack duration,
and starts Idle. No monster-name switch, manually transcribed timing,
asset editing, or programming is required. A checkbox allows experienced
users to disable auto-detection and enter a duration for externally supplied
clips. Missing or malformed receipts fail closed while auto-detection is on.

Mode choices are one-click Idle / Move / Attack / Rest in the optional HUD.
Idle, Move and Rest remain indefinitely until the owner/GM switches mode;
Attack returns to Idle. The selected mode has an accessible pressed-state
visual indicator. Source-code tests verify source path validation, metadata,
limits, missing receipts, and independent timings. These **do not certify
Foundry v13/v14 real-world playback, multiplayer or disconnect recovery**.
No licensing, commercial release, or Netlify changes.


### Full-motion catalog expansion — Wizard / Orc pregen / Animated Armor

Added **three more source-authored public animation studies** without increasing
the 518 concept-card count or falsely describing source concepts as finished
products: Elven Wizard (`chr-wiz-elf`), original Orc Axe Vanguard Barbarian
pregen (`pregen-barbarian-male-3`, male/Orc/Barbarian/Axe Vanguard),
and Animated Armor (`mon-dng-armor`).

Each study now has an independent **Idle (3.2s), Move (2.4s), one-shot
Attack (1.4s), and Rest (4s)** animation plus a static original study.
Original art is preserved in `assets/studies`; the pregen has distinct
ochre warpaint/brass axe, the caster moves a staff and arcane glow, and
the construct shuffles articulated metal feet rather than breathing.
`node tools/generate-wave-two.mjs --check` proves the 12 SVG state files
match their source rig. All 3 are automatically showcased on catalog
cards, viewable in detailed state and 128/64/32px previews.

Three **private** state-only manifests feed the same VP9-alpha validation
pipeline (32/24/14/40 frames, decoded transparency, loop-seam and
motion QA) as the five existing tokens. The 8-token CI matrix, new Node
and Python regression suites, and responsive Chromium QA are required
before acceptance. No pregen character-sheet rules/stat block has
been produced as part of this art pass: these are *animated visual
identities*, not complete playable pregenerated D&D characters.

Commercial release remains blocked by visual quality at actual tabletop
size, rights/license review, real VTT import/playback verification, and
secure fulfillment. None of the tokens is purchasable.


### Motion Wave Three and uniform storefront card grid

The storefront now uses **one uniform card geometry** for every filtered result:
equally sized visual stages, identical title/metadata line slots, an always
reserved customization row, vertically aligned Details / Add-to-Bundle
controls and matching bottom prices. Responsive grid columns are four on
desktop, three on medium screens, two on mobile. Chromium QA measures
actual card boundaries, row and button alignment, 180/144px artwork
stages and overflow at 1440/390/320px. The goal is symmetrical product
comparison despite varying title lengths and optional builder actions.

The next four **individually authored original** token studies use existing
catalog IDs, not new look-alike records: Dwarven Cleric
(`chr-clr-dwarf`) has a low-set armored build, braids/beard, sun mace
and shield; Human Mercywarden Cleric female pregen
(`pregen-cleric-female-2`) has a tall lighter surcoat, blue shield,
auburn braid and healing halo; Human Shadowstep Rogue nonbinary pregen
(`pregen-rogue-nonbinary-1`) has a hooded narrow silhouette, twin
copper daggers and stealth trail; Cave Ogre (`mon-cave-ogre`) is a
hulking **Large**, heavy-limbed brute with a stone club.

Each original source feeds separate Idle, Move, one-shot Attack and Rest
SVGs via `src/creature-rigs/wave-three.mjs`;
`node tools/generate-wave-three.mjs --check` enforces deterministic output.
The **12** total full-motion catalog studies loop automatically for
buyers; the four new studies have private manifests for 3.2s / 2.4s /
1.4s / 4.0s state clips at 10 FPS. Tests check nonduplicated still
drawings, distinct weapon/effect rigs, real video transparency, loop
quality, VTT scale previews and runtime motion requirements.

The two new **pregen identities remain visual studies, not playable
D&D character sheets**. All artwork is unlicensed/unreviewed for sale,
real VTT import untested, purchase unavailable, and Netlify is unchanged.


### Creature families — shared anatomy; role identity in the details

Treat a **species/body family** as the source of recognizable proportions and
anatomical landmarks. **Roles are layered design variants**, not copy/paste
products with a different color. A basic Ogre should look clearly like the
same species as an Ogre spellcaster, armored champion or monarch. Vary role-
specific clothing silhouette, fit, headgear, weapon, distinctive accessories,
and the correct Idle/Move/Attack/Rest motions. For example:

- Common Ogre: worn hide and rough club; unrefined, lumbering attack
- Ogre mage: oversized fitted ritual robes, arcane staff, runes, casting attack
- Ogre knight: polished plate, high-quality sword and shield, guarded strike
- Ogre king: crown, luxurious fur-trimmed regalia, gold scepter, commanding pose

Those are **art-direction examples, not completed additional products**.
`src/creature-family-standards.mjs` defines a reusable anatomical reference
and distinct equipment/detail/motion requirements. The shared-family gate
rejects identical gear and clothing loadouts masquerading as unique roles.
Retain species-defining tusks, head/body ratios and stature across the family.
The same rule extends to goblins, dragons, skeletons, wolves, and other
families. Static concept indexes must not be confused with completed product
art; create role variants only when original artwork and all four
animations actually exist.

### Four-state production wave — Paladin, Gnome, Lizardfolk and Shark

Four more **existing** catalog concepts receive unique full-motion studies:
the crested armored Paladin with sword/shield, small goggled Gnome crossbow
Rogue, long-snouted/tail-balanced swamp Lizardfolk with reed shield and spear,
and a streamlined, countershaded side-profile Great White Shark with dorsal
fin and crescent tail. Each source is an original distinct drawing, with
three independent repeating modes and a single 1.4s action (Idle 3.2s,
Move 2.4s, Rest 4s). Export manifests declare 32/24/14/40 frames at 10 FPS
for private decoded-alpha validation. Source synchronization is checked
with `node tools/generate-wave-four.mjs --check`.
Public catalog autoplay and exact 128px/64px/32px inspection use these
same studies. Keep uniform card dimensions and prices. All four remain
**unreviewed, preview-only**, pending art approval and real VTT imports.
