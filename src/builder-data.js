/** Gridborn shared editable rig contract — entirely local, no checkout. */
import { HERO_VARIANTS } from './hero-variants.js';
export const PARTS = Object.freeze({
  ancestry: ['Human','Elf','Dwarf','Orc','Goblin','Gnome','Halfling','Skeleton'],
  outfit: ['Plate armor','Paladin tabard','Leather armor','Rogue leathers','Ranger field gear','Wizard robes','Village clothes'],
  headgear: ['None','Helmet','Hood','Circlet'],
  hair: ['None','Short','Long','Braided'],
  weapon: ['None','Sword','Axe','Mace','Staff','Bow','Twin daggers'],
  offhand: ['None','Shield','Spellbook','Lantern'],
  cape: ['None','Short cape','Long cape']
});
export const PALETTES = Object.freeze({
  royal: { label:'Royal knight', skin:'#e8b68b',primary:'#456a94',accent:'#e6b86c',hair:'#5a3c2a',metal:'#bacbd4' },
  forest: { label:'Forest scout', skin:'#e5b98d',primary:'#40755b',accent:'#d6ab65',hair:'#69442c',metal:'#abb9ad' },
  ember: { label:'Ember warrior', skin:'#87a66c',primary:'#944b40',accent:'#e6aa61',hair:'#322a31',metal:'#bfc7c8' },
  shadow: { label:'Shadow wanderer', skin:'#c9957d',primary:'#594d7c',accent:'#bba4e1',hair:'#221e31',metal:'#9eacc1' },
  village: { label:'Village traveler', skin:'#d9a27a',primary:'#93744c',accent:'#ead29c',hair:'#614331',metal:'#a1aeb4' },
  radiant: { label:'Ivory oathkeeper', skin:'#dbab85',primary:'#ded5bb',accent:'#e5b96d',hair:'#68483b',metal:'#c7d2d9' },
  bone: { label:'Undead legion', skin:'#e1dcc3',primary:'#635b72',accent:'#c8a36b',hair:'#25232b',metal:'#9ea7aa' }
});
export const DEFAULT_RECIPE = Object.freeze({
  schemaVersion:1, name:'Your Adventurer', ancestry:'Human',
  outfit:'Plate armor',headgear:'None',hair:'Short',weapon:'Sword',
  offhand:'Shield',cape:'Short cape',palette:{...PALETTES.royal, label:undefined}
});
export const PRESETS = Object.freeze({
  'chr-ftr-human': Object.freeze({name:'Human Fighter',ancestry:'Human',outfit:'Plate armor',headgear:'Helmet',hair:'Short',weapon:'Sword',offhand:'Shield',cape:'Short cape',palette:'royal'}),
  'chr-pal-human': Object.freeze({name:'Human Paladin',ancestry:'Human',outfit:'Paladin tabard',headgear:'Helmet',hair:'Short',weapon:'Sword',offhand:'Shield',cape:'Long cape',palette:'radiant'}),
  'chr-rge-gnome': Object.freeze({name:'Gnome Rogue',ancestry:'Gnome',outfit:'Rogue leathers',headgear:'Hood',hair:'Short',weapon:'Twin daggers',offhand:'None',cape:'Short cape',palette:'shadow'}),
  'chr-rng-elf': Object.freeze({name:'Elven Ranger',ancestry:'Elf',outfit:'Ranger field gear',headgear:'Hood',hair:'Long',weapon:'Bow',offhand:'None',cape:'Short cape',palette:'forest'}),
  'chr-clr-dwarf': Object.freeze({name:'Dwarven Cleric',ancestry:'Dwarf',outfit:'Plate armor',headgear:'Helmet',hair:'Braided',weapon:'Mace',offhand:'Shield',cape:'Short cape',palette:'village'}),
  'chr-wiz-elf': Object.freeze({name:'Elven Wizard',ancestry:'Elf',outfit:'Wizard robes',headgear:'Hood',hair:'Long',weapon:'Staff',offhand:'Spellbook',cape:'Long cape',palette:'shadow'}),
  'chr-bar-orc': Object.freeze({name:'Orc Barbarian',ancestry:'Orc',outfit:'Leather armor',headgear:'None',hair:'Braided',weapon:'Axe',offhand:'None',cape:'Short cape',palette:'ember'}),
  'npc-inn-human': Object.freeze({name:'Village Innkeeper',ancestry:'Human',outfit:'Village clothes',headgear:'None',hair:'Short',weapon:'None',offhand:'Lantern',cape:'None',palette:'village'}),
  'mon-cave-goblin': Object.freeze({name:'Cave Goblin',ancestry:'Goblin',outfit:'Leather armor',headgear:'Hood',hair:'None',weapon:'Sword',offhand:'Shield',cape:'Short cape',palette:'forest'}),
  'mon-dng-skeleton': Object.freeze({name:'Skeleton Guard',ancestry:'Skeleton',outfit:'Plate armor',headgear:'Helmet',hair:'None',weapon:'Sword',offhand:'Shield',cape:'Long cape',palette:'bone'})
});
export function presetToRecipe(key) {
  const p=PRESETS[key] || PRESETS['chr-ftr-human'];
  const {palette,...parts}=p;
  return normalizeRecipe({...DEFAULT_RECIPE,...parts,palette:PALETTES[palette]});
}
export function normalizeRecipe(input) {
  if (!input || typeof input!=='object' || Array.isArray(input))
    throw new Error('Invalid character recipe');
  if (input.schemaVersion !== 1) throw new Error('Unsupported character recipe version');
  const name=String(input.name??'').trim();
  if (!name || name.length>48 || /[\u0000-\u001f<>]/.test(name)) throw new Error('Name must be 1–48 safe characters');
  const result={schemaVersion:1,name};
  for (const [key,values] of Object.entries(PARTS)) {
    if (!values.includes(input[key])) throw new Error('Unsupported '+key+' part');
    result[key]=input[key];
  }
  if (!input.palette || typeof input.palette!=='object' || Array.isArray(input.palette))
    throw new Error('Invalid palette');
  const palette={};
  for (const key of ['skin','primary','accent','hair','metal']) {
    const color=input.palette[key];
    if (typeof color!=='string' || !/^#[0-9a-fA-F]{6}$/.test(color))
      throw new Error('Invalid '+key+' color');
    palette[key]=color.toLowerCase();
  }
  result.palette=palette;
  return result;
}
/** Deterministic, editable *prototype* appearance for an authored class
 * concept; not a finished individual art/animation package.
 */
const GENERATED_RECIPES=new Map(HERO_VARIANTS.map(variant=>[variant.id,variant]));
export function variantToRecipe(id) {
  const variant=GENERATED_RECIPES.get(id);
  if(!variant) throw new Error('Unknown class concept');
  const hair=['Short','Long','Braided'][(variant.variation-1)%3];
  const cape=['None','Short cape','Long cape'][(variant.variation-1)%3];
  const paletteKeys=['royal','forest','ember','shadow','village','radiant','bone'];
  const index=paletteKeys.indexOf(variant.palette);
  const paletteKey=paletteKeys[(index+variant.variation-1)%paletteKeys.length];
  const gear=variant.gear;
  return normalizeRecipe({
    ...DEFAULT_RECIPE,name:variant.name,
    ancestry:variant.ancestry,outfit:gear.outfit,
    headgear:gear.headgear,hair,weapon:gear.weapon,
    offhand:gear.offhand,cape,palette:PALETTES[paletteKey]
  });
}
export function hasVariantRecipe(id) { return GENERATED_RECIPES.has(id); }

export function toPortableRecipe(recipe) {
  const validated=normalizeRecipe(recipe);
  return JSON.stringify({format:'gridborn-character-recipe',...validated},null,2)+'\n';
}
export function fromPortableRecipe(text) {
  if (typeof text!=='string' || text.length>10000) throw new Error('Recipe file is too large');
  let parsed;
  try {parsed=JSON.parse(text);} catch {throw new Error('Recipe is not valid JSON');}
  if (parsed.format!=='gridborn-character-recipe') throw new Error('Not a Gridborn recipe');
  return normalizeRecipe(parsed);
}
