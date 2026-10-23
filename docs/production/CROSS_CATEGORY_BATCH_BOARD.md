# Gridborn — active cross-category batch queue · 2026-10-23

**Build for on-site animated preview first; polish and retail certification later.** No new card names or IDs may be assumed: reconcile against `src/catalog.js`, `src/hero-variants.js`, `src/npc-roster.js` and source monster data.

| Batch | Anchored catalog targets | Work | Status at creation |
| --- | --- | --- | --- |
| N1 — NPC service | `npc-inn-human`, `npc-mer-elf`, `npc-smith-dwarf` | Original occupation props; separate four-state motion and noncommercial previews | Innkeeper animated study in this PR; others queued |
| N2 — NPC guard/labor | `npc-guard-human`, `npc-far-human`, `npc-sol-orc` | Spear/pitchfork/sword with correct hand grips; original looks | Queued |
| N3 — Full roster | 48 `npc-roster-*` IDs | Individually authored across twelve occupations/four ancestries | 0/48 complete |
| M1 — Goblin/Skeleton | `mon-cave-goblin`, `mon-dng-skeleton` | Existing animated bases; new roles need confirmed identities and fresh equipment rigs | Bases produced, variants queued |
| M2 — Ogre | `mon-cave-ogre` | Existing base; Mage/Knight/King require unique source art and catalog identity verification | Base produced |
| M3 — Beast/construct | `mon-cave-spider`, `mon-dng-armor` | Use correct eight-leg and hollow-plate biomechanics | Bases produced |
| A1 — Ocean | `ani-ocean-greatwhite`, `ani-ocean-reef`, `ani-ocean-dolphin`, `ani-ocean-turtle` | Species-specific tail/flipper swimming | Great White produced, others queued |
| A2 — Land | `ani-forest-wolf`, `ani-forest-fox`, `ani-forest-bear` | True separate natural gaits, no resized copies | Gray Wolf produced, others queued |
| C — Characters | Existing `pregen-*` records | Continue missing authored variants to 108 | 14/108 variant studies at board creation |

Batch acceptance: individually distinguishable still, independently rendered Idle/Move/Attack/Rest, accurate props/anatomy, source research, safe catalog mapping, regression tests, full media CI. **Never call these production-ready** without separate 32/64/128px human QC, real VTT import, IP, and commerce approval.
