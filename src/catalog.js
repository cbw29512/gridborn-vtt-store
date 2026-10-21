/**
 * Preview-only token schema. No real products are published.
 * Token: id, category, name, primary, secondary, size, squares,
 * representation, pricing and explicit non-purchasable status.
 */
import { artStudies } from './art-studies.js';
import { animatedPreviews } from './animated-previews.js';
import { monsterSRD } from './monster-srd.js';
import { HERO_VARIANTS } from './hero-variants.js';
import { NPC_CONCEPTS } from './npc-roster.js';
import { viewForMonster } from './creature-view.js';

const make = (id, category, name, primary, secondary, size, squares, symbol) => ({
  id, category, name, primary, secondary, size, squares, symbol,
  race: ['Characters', 'NPCs'].includes(category) ? primary : null,
  characterClass: category === 'Characters' ? secondary : null,
  occupation: category === 'NPCs' ? secondary : null,
  location: category === 'Monsters' ? primary : null,
  habitat: category === 'Animals' ? primary : null,
  creatureType: category === 'Monsters' ? secondary : null,
  animalType: category === 'Animals' ? secondary : null,
  presentation: null,
  previewArt: artStudies[id] || null,
  priceCents: 299, purchasable: false, animationStatus: animatedPreviews[id] ? 'art-study' : artStudies[id] ? 'static-art-study' : 'not-produced',
  artLicenseStatus: 'not-verified',
  source: 'Gridborn original concept',
  challengeRating: null,
  artDirection: category === 'Monsters' || category === 'Animals'
    ? 'Three-quarter side/profile view targeted' : 'Three-quarter tabletop view targeted',
});
const starterCatalog = [
  make('chr-wiz-elf','Characters','Elven Wizard','Elf','Wizard','Medium',1,'✧'),
  make('chr-bar-orc','Characters','Orc Barbarian','Orc','Barbarian','Medium',1,'⚔'),
  make('chr-ftr-human','Characters','Human Fighter','Human','Fighter','Medium',1,'⚒'),
  make('chr-rge-gnome','Characters','Gnome Rogue','Gnome','Rogue','Small',1,'◆'),
  make('chr-clr-dwarf','Characters','Dwarven Cleric','Dwarf','Cleric','Medium',1,'✝'),
  make('chr-rng-elf','Characters','Elven Ranger','Elf','Ranger','Medium',1,'➶'),
  make('chr-pal-human','Characters','Human Paladin','Human','Paladin','Medium',1,'✦'),
  make('chr-brd-halfling','Characters','Halfling Bard','Halfling','Bard','Small',1,'♫'),
  make('npc-inn-human','NPCs','Village Innkeeper','Human','Innkeeper','Medium',1,'⌂'),
  make('npc-inn-dwarf','NPCs','Dwarven Tavern Keeper','Dwarf','Innkeeper','Medium',1,'♜'),
  make('npc-far-halfling','NPCs','Halfling Farmer','Halfling','Farmer','Small',1,'❀'),
  make('npc-far-human','NPCs','Human Farmer','Human','Farmer','Medium',1,'♣'),
  make('npc-sol-orc','NPCs','Orc Soldier','Orc','Soldier','Medium',1,'⚔'),
  make('npc-guard-human','NPCs','City Guard','Human','Soldier','Medium',1,'⛨'),
  make('npc-mer-elf','NPCs','Elven Merchant','Elf','Merchant','Medium',1,'✥'),
  make('npc-smith-dwarf','NPCs','Dwarven Blacksmith','Dwarf','Blacksmith','Medium',1,'⚒'),
  make('mon-cave-goblin','Monsters','Cave Goblin','Cave','Goblin','Small',1,'♠'),
  make('mon-cave-ogre','Monsters','Cave Ogre','Cave','Ogre','Large',2,'♜'),
  make('mon-cave-spider','Monsters','Giant Cave Spider','Cave','Spider','Large',2,'✣'),
  make('mon-dng-skeleton','Monsters','Skeleton Warrior','Dungeon','Undead','Medium',1,'☠'),
  make('mon-dng-armor','Monsters','Animated Armor','Dungeon','Construct','Medium',1,'⛨'),
  make('mon-swamp-lizard','Monsters','Swamp Lizardfolk','Swamp','Lizardfolk','Medium',1,'♠'),
  make('mon-forest-wolf','Monsters','Dire Wolf','Forest','Beast','Large',2,'♣'),
  make('mon-mtn-troll','Monsters','Mountain Troll','Mountains','Troll','Large',2,'♜'),
  make('ani-ocean-greatwhite','Animals','Great White Shark','Ocean','Sharks','Large',2,'≋'),
  make('ani-ocean-reef','Animals','Reef Shark','Ocean','Sharks','Medium',1,'≋'),
  make('ani-ocean-dolphin','Animals','Dolphin','Ocean','Marine mammals','Medium',1,'◈'),
  make('ani-ocean-turtle','Animals','Sea Turtle','Ocean','Reptiles','Medium',1,'◉'),
  make('ani-forest-wolf','Animals','Gray Wolf','Forest','Canines','Medium',1,'♣'),
  make('ani-forest-fox','Animals','Red Fox','Forest','Canines','Small',1,'♣'),
  make('ani-forest-bear','Animals','Black Bear','Forest','Bears','Medium',1,'♜'),
  make('ani-swamp-croc','Animals','Crocodile','Swamp','Reptiles','Large',2,'◈'),
  make('ani-desert-scorpion','Animals','Scorpion','Desert','Arthropods','Tiny',1,'✣'),
  make('ani-arctic-polar','Animals','Polar Bear','Arctic','Bears','Large',2,'♜'),
];

/** One SRD name = one discoverable card. Existing exact-name Gridborn studies
 * retain their stable IDs; flavor variants remain separate original concepts.
 * Listing an SRD name does not imply artwork exists.
 */
const FAMILIES=Object.freeze({
  Aberration:'✧',Beast:'♣',Celestial:'☼',Construct:'⛨',Dragon:'♜',
  Elemental:'◈',Fey:'❀',Fiend:'♠',Giant:'♜',Humanoid:'⚔',
  Monstrosity:'✣',Ooze:'◉',Plant:'♣',
  'Swarm of Tiny Beasts':'≋','Swarm of Tiny Undead':'≋',Undead:'☠'
});
export function monsterFamily(type) {
  return String(type).split(' (')[0];
}
export function challengeBand(cr) {
  const text=String(cr).trim();
  const number=text.includes('/')?Number(text.split('/')[0])/Number(text.split('/')[1]):Number(text);
  if (!Number.isFinite(number)||number<0) throw new Error('Invalid source CR: '+cr);
  if(number<=0.5)return 'CR 0–½';
  if(number<=4)return 'CR 1–4';
  if(number<=10)return 'CR 5–10';
  if(number<=16)return 'CR 11–16';
  return 'CR 17+';
}
const originalMonsters=starterCatalog.filter(item=>item.category==='Monsters');
const originalsByName=new Map(originalMonsters.map(item=>[item.name.toLocaleLowerCase(),item]));
const matchedOriginals=new Set();
const indexedMonsters=monsterSRD.map(source=>{
  const original=originalsByName.get(source.name.toLocaleLowerCase());
  const family=monsterFamily(source.type),band=challengeBand(source.cr);
  if (!Object.hasOwn(FAMILIES,family)) throw new Error('Unsupported monster family: '+family);
  if(original) matchedOriginals.add(original.id);
  const item=original??make('mon-'+source.id,'Monsters',source.name,family,band,
    source.size,source.size==='Gargantuan'?4:source.size==='Huge'?3:source.size==='Large'?2:1,FAMILIES[family]);
  return {
    ...item, primary:family,secondary:band,creatureType:source.type,
    challengeRating:source.cr,source:'SRD 5.2.1',sourcePage:source.page,
    sourceRecordId:source.id,
    // Unchanged source portrait is never assumed to be the SRD's own image.
    artDirection:viewForMonster(source.type,source.name)
  };
});
const ORIGINAL_MONSTER_FAMILIES=Object.freeze({
 'mon-cave-goblin':'Fey','mon-cave-ogre':'Giant','mon-cave-spider':'Beast',
 'mon-dng-skeleton':'Undead','mon-dng-armor':'Construct',
 'mon-swamp-lizard':'Humanoid','mon-forest-wolf':'Beast','mon-mtn-troll':'Giant'
});
const originalVariants=originalMonsters.filter(item=>!matchedOriginals.has(item.id)).map(item=>({
 ...item,primary:ORIGINAL_MONSTER_FAMILIES[item.id]||'Monstrosity',
 secondary:'Unrated concept',creatureType:ORIGINAL_MONSTER_FAMILIES[item.id]||'Monstrosity',
 location:item.primary,challengeRating:null,source:'Gridborn original variant',
 artDirection:viewForMonster(ORIGINAL_MONSTER_FAMILIES[item.id]||'Monstrosity',item.name)
}));
const heroVariants=HERO_VARIANTS.map(hero=>({
 ...make(hero.id,'Characters',hero.name,hero.ancestry,hero.characterClass,
   ['Goblin'].includes(hero.ancestry)?'Small':'Medium',1,'⚔'),
 gender:hero.gender,presentation:hero.gender,specialty:hero.specialty,
 builderVariantId:hero.id,source:'Gridborn hero design concept',
 gear:hero.gear,artDirection:'Three-quarter front; gender identity does not impose body shape'
}));
const npcVariants=NPC_CONCEPTS.map(npc=>({
 ...make(npc.id,'NPCs',npc.name,npc.ancestry,npc.occupation,
   'Dwarf'===npc.ancestry?'Medium':'Medium',1,'⌂'),
 gender:npc.gender,presentation:npc.gender,
 distinguishingGear:npc.distinguishingGear,source:'Gridborn NPC design concept',
 artDirection:'Three-quarter front'
}));
export const catalog = Object.freeze([
 ...starterCatalog.filter(item=>item.category!=='Monsters'),
 ...heroVariants,...npcVariants,
 ...indexedMonsters,...originalVariants
]);
export const monsterCatalogStats = Object.freeze({
 srd:monsterSRD.length,
 originalVariants:originalVariants.length,
 monsterCards:indexedMonsters.length+originalVariants.length,
 heroVariantConcepts:heroVariants.length,
 npcVariantConcepts:npcVariants.length,
 allCategories:catalog.length
});

export const categoryConfig = Object.freeze({
  Characters: { first: 'Race', second: 'Class', placeholder: 'Search heroes...' },
  NPCs: { first: 'Race', second: 'Occupation', placeholder: 'Search innkeeper, farmer...' },
  Monsters: { first: 'Creature family', second: 'Challenge range', placeholder: 'Search dragon, skeleton, wolf, cave...' },
  Animals: { first: 'Habitat', second: 'Animal type', placeholder: 'Search shark, wolf, whale...' },
});