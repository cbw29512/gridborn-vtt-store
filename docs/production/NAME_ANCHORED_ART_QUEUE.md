# Gridborn — name-anchored animation production queue

**Status:** implementation briefs; **not** new illustrations or animated exports. Use the exact existing catalog identity, anatomy and job/type to guide art. Never invent a new species, class, equipment loadout or new stable ID from a nickname. Confirm each immutable ID before generating source artwork.

## Next concrete catalogue entries (existing IDs verified in `src/catalog.js`)

| Immutable ID | Catalog name | Visual silhouette | Motion signature / use of name |
|---|---|---|---|
| `npc-inn-human` | Village Innkeeper | Service vest, keyring, sturdy shoes, tray | Brisk careful walk; wipes counter/rest; if attacked, plausible improvised defense only |
| `npc-inn-dwarf` | Dwarven Tavern Keeper | Compact dwarf torso, long beard safely clear of hands, heavy apron | Tray carry and measured mug setting, distinctly different from Human Innkeeper |
| `npc-far-halfling` | Halfling Farmer | Short stature, field hat, produce basket | Gardening/crop tending in Idle and Rest; tools remain correctly gripped |
| `npc-far-human` | Human Farmer | Long work clothes, work boots, pitchfork | Weight-bearing field gait; controlled pitchfork thrust |
| `npc-sol-orc` | Orc Soldier | Orc anatomy, believable practical armor, military blade | Trained purposeful march, one sword strike and guard recovery |
| `npc-guard-human` | City Guard | Watch uniform, shield, spear, readable badge | Patrol pace, grounded spear thrust, alert stance |
| `npc-mer-elf` | Elven Merchant | Fine woven clothes, trade pack and balance scales | Pack strap sway, present/inspect merchandise instead of generic sword animation |
| `npc-smith-dwarf` | Dwarven Blacksmith | Squat broad-shouldered worker, soot apron, tongs | Hammer impact at anvil, proper shoulder/elbow motion, cool/recover |
| `mon-cave-goblin` | Cave Goblin | Small low silhouette, large ears, rugged cave kit | Quick scuttle, source-appropriate equipped attack |
| `mon-cave-ogre` | Cave Ogre | Huge hunched frame, heavy forearms, tusks | Weighted two-handed club swing, not fast lightweight motion |
| `mon-cave-spider` | Giant Cave Spider | Eight articulating legs, distinct thorax/abdomen | Coordinated legs; bite must emerge from head, not decorative glow |
| `mon-dng-skeleton` | Skeleton Warrior | Visible bone joints, armor and weapon not fused to skull | Rigid bony steps, sword follow-through; no breathing |
| `mon-dng-armor` | Animated Armor | Hollow plate joins; no flesh | Mechanical steps and weapon swing with metal inertia, no human breathing |
| `mon-swamp-lizard` | Swamp Lizardfolk | Reptilian head and tail, upright functional weapon grip | Tail counterbalance and grounded combat attack |
| `mon-forest-wolf` | Dire Wolf | Large quadruped profile, lupine muzzle and shoulders | Four-legged trot, bite with planted forelegs |
| `mon-mtn-troll` | Mountain Troll | Distinct towering troll frame and limbs | Heavy gait with physically plausible strike and recovery |
| `ani-ocean-greatwhite` | Great White Shark | Torpedo-shaped shark profile, prominent dorsal fin, asymmetrical tail | Tail-driven swimming and realistic bite; no stationary slide |
| `ani-ocean-reef` | Reef Shark | Slender reef-shark proportions, distinct from Great White | Faster lateral tail beats, prey lunge |
| `ani-ocean-dolphin` | Dolphin | Smooth cetacean profile and horizontal flukes | **Vertical** tail-fluke strokes, surfacing, natural rest cruise |
| `ani-ocean-turtle` | Sea Turtle | Shell, flippers and beak | Alternating flipper strokes; small neck/feeding action |
| `ani-forest-wolf` | Gray Wolf | Leaner body than Dire Wolf, natural pelt | Synchronized quadruped trot, short grounded snap |
| `ani-forest-fox` | Red Fox | Bushy tail, slim muzzle, light feet | Playful trot and pounce, curled rest |
| `ani-forest-bear` | Black Bear | Plantigrade paws, broad shoulders, short snout | Heavy walk, swipe with body turn |
| `ani-swamp-croc` | Crocodile | Long flat snout, lateral armored body and tapering tail | Side-to-side swimming, realistic jaw opening and lunge |
| `ani-desert-scorpion` | Scorpion | Eight legs, two pincers and segmented sting tail | Pincer movement and controlled tail jab |
| `ani-arctic-polar` | Polar Bear | Longer neck and different head/coat silhouette from Black Bear | Heavy gait and swipe, distinct rest posture |

## Artwork interpretation rules

1. **Catalog name is authoritative:** exact name, species, job/class and stable ID win over speculative creative nicknames. Use `src/hero-variants.js`, `src/npc-roster.js`, `src/monster-srd.js` and the source data for missing role/ability details.
2. **Behavior from form and equipment, not the display name alone:** if the existing source says spellcaster, animate the actual casting apparatus and its release; if natural bite, animate jaws and weight transfer. Research the source before generating.
3. **Species distinction:** a Dire Wolf should not be a resized Gray Wolf; a Great White is not a recolored Reef Shark; a Dolphin is not shark-shaped. Keep functional anatomy accurate.
4. **No fictitious completion:** rows here do not claim assets exist. For each row find existing source still / Idle / Move / Attack / Rest; implement any missing state with original authored source and add export manifest, tests and noncommercial preview before marking animation created.
5. **Production sequence remains locked:** finish all 108 authored character identities first, then 100+ monster assets, 48 NPCs and animal catalog. The briefs above prepare later waves; they do not supersede the character PR queue. Separate final human and VTT acceptance from technical source studies.
