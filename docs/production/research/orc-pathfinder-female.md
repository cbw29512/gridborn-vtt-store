# Female Orc Pathfinder Ranger — original art and functional bow research

## Canonical role
Existing authored `pregen-ranger-female-1` (Orc Pathfinder Ranger · Female), one medium grid square. Body type, species and gender derive from the character's existing source record, not inferred from outward presentation.

## Functional research and originality
- Official 2024 D&D Ranger starting equipment: https://www.dndbeyond.com/sources/dnd/br-2024/character-classes — studded leather, longbow, arrows, quiver and field gear, subject to chosen equipment set.
- World Archery A Guide to Recurve Technique: https://documents.worldarchery.org/Media/Information_Sheets/003_Guide_to_Recurve_Technique.pdf — bow arm presses against riser, draw arm comes under the chin to a repeatable anchor, arrow remains on rest/nocked until fingers release, bow arm holds after release.
- Texas Parks & Wildlife bow shooting instructions: https://tpwd.texas.gov/education/hunter-education/online-course/primitive-hunting/how-to-shoot-a-bow — stable stance and controlled anchor point and follow through. These sources supply technique only, not copied art.
- Original SVG design with wider Orc shoulders, ash-gray-green face and visible paired tusks, rust fur shoulder hood, side braid, broad leather field coat, separate long back quiver and fletching; distinct anatomy and original paths from the slender Elven Ranger's bow rig.

## Bow and animation source contract
- Recurve limbs/tips y54..193, riser and gripping left hand around (204,124). String rest follows limb tips through midpoint; alternate anchored string ties tips to draw nock at (144,122), **below the face**, while complete other arm anchored to left shoulder reaches the nock.
- The projectile is a **separate** fletched arrow from (144,122) to tip (228,122), with its shaft level and rightward. No projectile exists in Idle, Move or Rest; its opacity remains zero. During Attack, initial arrow stays nocked until 59%, then flies 7–17px right before fading, tip max x245 within 256px canvas.
- Idle 3.2s: lookout breathing and quiver settle; Move 2.4s: opposite planted steps and body/quiver held together; Attack 1.4s once: brace → draw from 22% to 61% (rest string and rest arm disappear) → single arrow flight at 62–67% → bow/string/arm recover; Rest 4s: bow hand lowers while body crouches.
- Remaining frame review: verify bow string crossing the actual eye/face at full draw (nock/chin chosen below face), hands remain attached, zero missed arrow and no arrow in non-attack loops.

## Commercial gates
256×240 original transparent SVG source, 256px private media expected. Node/Python source and rig QC, frame render/alpha/loop certification, human 32/64/128px dark/light visual signoff, independent in-game Foundry/Roll20 import, artwork rights/licensing and delivery/payment readiness remain mandatory. `purchasable:false` and `vttCompatibility:untested` until approval.
