# Gridborn — ancestry-first production order

**Active 2026-10-23.** One species foundation first; add clothing, profession/class gear, rank details, hand attachments, and matching actions to that same anatomy. Character, NPC and monster categories are processed together within each body family.

To view exact real catalog IDs and verified states, run:

```bash
node tools/report-ancestry-batches.mjs
node tools/report-ancestry-batches.mjs --missing-human
```

These derive from the 518 actual catalog cards. An indexed card or editable recipe is NOT an original animated token. This change does not add any artwork or mark anything sellable.

| Batch | Body family | Adventure roles | NPC roles | Monster/enemy roles | Next production action |
| --- | --- | --- | --- | --- | --- |
| H01 | **Human** | All actual Human class cards (Fighter, Paladin, and identified Human variants) | Innkeeper, Farmer, Guard, and the 12 Human occupation concepts | Bandit, Commoner, Guard, Cultist, Knight, Mage etc. only after a *specific* Human treatment is authored | Finish Village Innkeeper PR #77; next Human role must inherit identical skeleton/joint anchors with role-specific tools and motion |
| O01 | **Orc** | Orc Barbarian and confirmed Orc class variants | Orc Soldier plus 12 existing Orc occupations | Orc species-specific roles only when existing/approved IDs are confirmed | Reuse Orc anatomy, tusks and physique; add leather/axe, plate/shield or farmer clothing |
| HO01 | **Half-Orc** | None currently in 108 concepts | None in current 48 concepts | None confirmed | Foundation specification only; add new authored IDs after approval, do not count products |
| E01 | **Elf** | Elven Wizard/Ranger and confirmed Elf variants | Elven Merchant plus 12 Elf occupation concepts | Exact existing/approved species records only | Keep pointed ears and Elf proportions; swap class/occupation kits |
| D01 | **Dwarf** | Dwarven Cleric/Ranger and confirmed Dwarf variants | Dwarven Tavern Keeper, Blacksmith, 12 Dwarf occupations | Confirm source first | Keep compact broad Dwarf, use same role kit as Orc/Human when applicable |
| G01 | **Goblin** | Existing authored Goblin hero identities | No Goblin in existing 48 | Cave Goblin, Goblin Boss, Warrior and Minion | Reuse small long-eared body; add shaman, archer, boss gear, unique attacks |
| GN01 | Gnome | Gnome Rogue, other confirmed IDs | None in 48 | Source verification | Small Gnome body, not Goblin resize |
| HA01 | Halfling | Halfling Bard and confirmed IDs | Halfling Farmer | Source verification | Halfling anatomy, not human resize |
| S01 | Skeleton | Separate bone body | — | Skeleton Warrior and verified skeleton variants | Real ribs/joints; never animate breathing |
| OG01 | Ogre | Separate hulking body | — | Cave Ogre; planned Mage, Knight, King | Preserve same anatomy, vary clothing, arms, attack kit; role IDs require approval |
| L01 | Lizardfolk | Reptilian foundation | — | Swamp Lizardfolk and approved variants | Distinct snout/tail/gait; spear not through face |

## How each batch is built

1. **Inventory:** identify current immutable cards, source art, and animation state in the generated report. Never create duplicates.
2. **Foundation:** one biologically correct species body, proportions, joints/hand grips and baseline. Shared data now lives in `src/species-foundations.mjs` and feeds `src/rig-proportions.js` for existing editable humanoid roles.
3. **Role kit:** accessories/armor/clothing/tools differ visibly. The Orc Knight gets plate, sword and shield; Orc Farmer overalls and tools; Orc Barbarian leather/fur and a two-handed axe. Dwarf Barbarian uses the *barbarian kit*, but retains Dwarf body.
4. **Motion:** inherit compatible Idle/Move/Rest from the base, then add anatomically accurate role Attack. Tools and weapons remain attached to hands; launched spells/arrows detach.
5. **Publish studies:** each exact source-linked ID needs a distinct Still and four generated animated states, noncommercial manifest, source brief and tests.
6. **QC:** Node/Python, Chromium, Foundry and full private media CI before merge. Human 128/64/32px inspection, licensed art source, true Foundry/Roll20 import and secure checkout remain later release gates.

## Enemy ancestry must be explicit

The SRD monster catalog includes generic Humanoid entries such as Bandit, Cultist, Guard, Commoner and Mage. Their listed types do not certify them as Human; the tool exposes these as `flexibleHumanoidEnemies`. Decide ancestry/identity and keep existing source-index records immutable before drawing ancestry-specific interpretations. Half-Orc is planned only: no false completed concepts.

## Other biomechanical foundations after humanoids

Canines → bears → sharks (lateral tail movement) → dolphins (vertical fluke strokes) → spiders (eight moving legs) → crocodilians and lizards → constructs → oozes and elementals → dragons. Do not share an anatomically impossible gait just because creatures look broadly similar.

**Branch baseline:** 31 original illustrations, 29 public four-state animated studies, 0 NPC moving studies, 0 retail-approved. The first Village Innkeeper moving NPC is pending in PR #77; this ancestry-planner PR changes actual **shared rig data and production reporting**, but adds no illustrated assets.
