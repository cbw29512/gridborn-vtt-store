# Rogue and Ranger prebuilt silhouette pass

## Data contracts

The catalog names, character identities, and artwork release states remain in
`src/hero-variants.js`. The editable appearance recipe is schema-validated by
`src/builder-data.js`. Visual-only reusable additions live in
`src/rig-specialty.js`; race scale lives in `src/rig-proportions.js`.

## Implemented prototype improvements

- Gnome Rogue starter now has a customizable entry point: distinctive asymmetrical
  leather harness, pouches and two daggers, with smaller Gnome body proportions.
- Elven Ranger starter uses a separate field coat, shoulder armor, bow and arrow
  quiver extending above the shoulder.
- Nine Rogue and nine Ranger class variants use these corresponding outfit
  recipes, preserving three male, three female and three nonbinary identities
  per class.
- Gnome, Halfling, Goblin and Dwarf body scaling keeps the overall model's
  ground line at the same coordinate; existing Human/Elf/Orc rigs are unchanged.
- Existing Idle, Move, Attack and Rest preview modes share the updated
  visual source rig and remain prototype motion only.

## What this is not

These are *builder-rig visual studies*, **not** 18 individually illustrated
characters, four independently exported transparent animation clips, or
licensed/commercial VTT tokens. The original per-character `artStatus`
and `commercialRelease` flags must remain unchanged until separately reviewed.

## Remaining acceptance

- Human review at 256, 128, 64 and 32px against light and dark grids,
  paying particular attention to both daggers and the quiver.
- Add true attachments and posture/weight-specific actions for each class,
  avoiding character arms disconnecting from the weapons.
- Complete distinct original hair/gear/pose identity art for each pregen;
  gender identity must not mandate any particular body form.
- Export transparent standalone motion clips and test direct VTT imports.
- Split remaining oversized legacy `builder-rig.js` into more visual modules
  as the rig evolves, preserving existing preset and animation contracts.
