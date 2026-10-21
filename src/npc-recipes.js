/**
 * Editable NPC prebuilt recipes. These are appearance prototypes, NOT finished
 * illustrated or animated products. Source identity/occupation stays in NPC_CONCEPTS.
 */
import {NPC_CONCEPTS} from './npc-roster.js';
import {DEFAULT_RECIPE, PALETTES, normalizeRecipe} from './builder-data.js';

const JOB_KITS=Object.freeze({
  Innkeeper:['Village clothes','None','None','Lantern','None'],
  Farmer:['Village clothes','None','None','None','None'],
  Guard:['Plate armor','Helmet','Sword','Shield','Short cape'],
  Soldier:['Plate armor','Helmet','Sword','Shield','Short cape'],
  Merchant:['Village clothes','None','None','None','Long cape'],
  Blacksmith:['Leather armor','None','Mace','None','None'],
  Healer:['Village clothes','None','Staff','None','Short cape'],
  Sage:['Wizard robes','Hood','Staff','Spellbook','Long cape'],
  Miner:['Leather armor','Helmet','Axe','Lantern','None'],
  Sailor:['Village clothes','None','Sword','None','Short cape'],
  Priest:['Wizard robes','None','Staff','None','Long cape'],
  Stablekeeper:['Village clothes','None','None','None','None']
});

const ANCESTRY_PALETTES=Object.freeze({
  Human:'village', Elf:'forest', Dwarf:'ember', Orc:'shadow'
});
const HAIR=['Short','Long','Braided','Short'];

/**
 * Returns a validated editable rig recipe, not an NPC's completed sprite.
 * Unsupported props (pitchfork, keys, tongs, etc.) remain in the NPC catalog's
 * distinguishingGear text rather than being inaccurately rendered as another item.
 */
export function npcToRecipe(id) {
  try {
    const npc=NPC_CONCEPTS.find(item=>item.id===id);
    if (!npc) throw new Error('Unknown NPC prebuilt');
    const kit=JOB_KITS[npc.occupation];
    const paletteName=ANCESTRY_PALETTES[npc.ancestry];
    if (!kit || !paletteName) throw new Error('NPC mapping is incomplete: '+id);
    const [outfit,headgear,weapon,offhand,cape]=kit;
    const ancestryIndex=['Human','Elf','Dwarf','Orc'].indexOf(npc.ancestry);
    return normalizeRecipe({
      ...DEFAULT_RECIPE,
      name:npc.name,
      ancestry:npc.ancestry,
      outfit,headgear,weapon,offhand,cape,
      hair:HAIR[ancestryIndex],
      palette:PALETTES[paletteName]
    });
  } catch (error) {
    console.error('Failed to build NPC appearance recipe', {id,error});
    throw error;
  }
}

export function hasNPCRecipe(id) {
  try {
    return NPC_CONCEPTS.some(item=>item.id===id);
  } catch (error) {
    console.error('Failed to resolve NPC prebuilt', {id,error});
    return false;
  }
}
