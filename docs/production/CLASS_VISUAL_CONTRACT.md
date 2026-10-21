# Gridborn class prebuilt visual contract — third pass

**Goal:** make Bard, Druid, Monk, Sorcerer and Warlock recognizable by
equipment and silhouette, not merely by a palette swap.

## Existing data schema (unchanged)

`normalizeRecipe()` validates `{schemaVersion:1,name,ancestry,outfit,
headgear,hair,weapon,offhand,cape,palette}`. All appearance layers consume
that normalized recipe; no class-specific runtime mechanics or unvalidated
HTML are introduced. `HERO_VARIANTS` remains the identity/catalog source;
commercial status is **not-produced**.

## Rig and preview state

The existing `renderRig(recipe,{mode,animated})` maintains the same four
visual states: Idle, Move, Attack, Rest. Decorative layers attach inside
`.rig-proportions` and `.rig-upper` so they follow character scale and
shared body motion. Instrument art stays in the offhand transform.

| Class | Distinct outfit | Key recognizable cues |
| --- | --- | --- |
| Bard | Bard performance coat | sweeping coat tails, clasp and hand-carried lute |
| Monk | Monk wraps | sleeveless wrap harness, long martial sash, bound forearms |
| Druid | Druid leaf mantle | asymmetric layered leaf shoulders, living branch staff |
| Sorcerer | Sorcerer regalia | flared arcane collar, faceted star clasp and mantle |
| Warlock | Warlock pact coat | angular high collar, dark split coat, pact sigil |

**Visual acceptance:** inspect at 256, 128, 64, 32 pixels on dark and
light grids; verify equipment does not detach during motion, gestures read,
no clipping or horizontal overflow. Tests and CI alone do not certify art.

**Release rule:** class recipes and moving SVG prototypes are not
individual completed sprites, transparent WebM exports, approved IP rights,
or VTT-certified products. Do not change `artStatus`, `commercialRelease`,
or the site's preview-only disclosures.
