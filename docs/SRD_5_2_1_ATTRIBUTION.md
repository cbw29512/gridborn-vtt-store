# Gridborn monster index: SRD v5.2.1 (CC BY 4.0)

The Gridborn browse-only SRD monster index uses **only creature names,
creature types, sizes, challenge ratings and source page references** extracted
from the corrected 330-creature SRD 5.2.1 source index maintained in the
user's `cbw29512/D20-ironpit` repository. It does not copy monster statistics,
descriptions, source artwork, names omitted from the SRD, or settings lore.

**Required attribution (reproduced as specified in SRD 5.2.1):**

> This work includes material from the System Reference Document 5.2.1 (“SRD 5.2.1”) by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

The site displays this attribution beside its monster search. Any changes in
appearance and classification (family / threat bands) are Gridborn's own
interface choices, not claims of endorsement, ownership or official integration.

## Sourcing and integrity

- Dataset: `D20-ironpit/backend/app/content/data/srd_5_2_1_monsters.json`
  (328 parsed records) plus
  `srd_5_2_1_monster_corrections.json` (one replacement, two restored
  omitted records). The combined catalog has **330 unique names and IDs**.
- Fields used: `id`, `name`, `type`, `size`, the first CR token of
  `challenge`, and `sourcePage`. Their display is an INDEX, not a
  republishing of complete stat blocks.
- Gridborn's own clearly named variant concepts (e.g. Cave Goblin and
  Giant Cave Spider) stay separate. SRD names which exactly match existing
  Gridborn entries reuse those cards instead of creating duplicate results.
- The SRD is current-edition source material. This does not establish that
  Gridborn supports D&D rules, that a 2014 monster has the same CR, or that
  an imported creature's complete artwork/animation exists.
- **0 SRD entries are sale-ready solely by being listed.** The website marks
  records with no original art as Concept Only and disables checkout.
- When drawing creatures, follow the Gridborn **three-quarter side/profile
  default**. Eye, limb, muzzle, wing and tail count must match the species.
  Keep the creature identifiable at 64 px and 32 px.
