/** 108 original concept profiles: 3 male, 3 female, 3 nonbinary per
 * core class, with 3 distinct appearance/loadout themes per identity.
 * Gender is explicitly authored character identity, not inferred from looks.
 * A catalog concept is NOT finished artwork or a downloadable pregen.
 */
export const CLASS_ARCHETYPES=Object.freeze([
 {
  "class": "Fighter",
  "specialties": [
   "Steelguard",
   "Duelist",
   "Vanguard"
  ],
  "equipment": {
   "weapon": "Sword",
   "outfit": "Plate armor",
   "offhand": "Shield",
   "headgear": "Helmet"
  },
  "palette": "royal"
 },
 {
  "class": "Barbarian",
  "specialties": [
   "Furyborn",
   "Wildheart",
   "Axe Vanguard"
  ],
  "equipment": {
   "weapon": "Axe",
   "outfit": "Leather armor",
   "offhand": "None",
   "headgear": "None"
  },
  "palette": "forest"
 },
 {
  "class": "Bard",
  "specialties": [
   "Songweaver",
   "Skald",
   "Court Performer"
  ],
  "equipment": {
   "weapon": "Sword",
   "outfit": "Village clothes",
   "offhand": "None",
   "headgear": "Circlet"
  },
  "palette": "ember"
 },
 {
  "class": "Cleric",
  "specialties": [
   "Dawnkeeper",
   "Mercywarden",
   "Temple Sentinel"
  ],
  "equipment": {
   "weapon": "Mace",
   "outfit": "Plate armor",
   "offhand": "Shield",
   "headgear": "Helmet"
  },
  "palette": "shadow"
 },
 {
  "class": "Druid",
  "specialties": [
   "Wildspeaker",
   "Grovekeeper",
   "Stormcaller"
  ],
  "equipment": {
   "weapon": "Staff",
   "outfit": "Wizard robes",
   "offhand": "None",
   "headgear": "None"
  },
  "palette": "village"
 },
 {
  "class": "Monk",
  "specialties": [
   "Wayfarer",
   "Windstrider",
   "Stonefist"
  ],
  "equipment": {
   "weapon": "None",
   "outfit": "Village clothes",
   "offhand": "None",
   "headgear": "None"
  },
  "palette": "radiant"
 },
 {
  "class": "Paladin",
  "specialties": [
   "Oathkeeper",
   "Bannerknight",
   "Radiant Guardian"
  ],
  "equipment": {
   "weapon": "Sword",
   "outfit": "Paladin tabard",
   "offhand": "Shield",
   "headgear": "Helmet"
  },
  "palette": "bone"
 },
 {
  "class": "Ranger",
  "specialties": [
   "Pathfinder",
   "Hawkeye",
   "Warden"
  ],
  "equipment": {
   "weapon": "Bow",
   "outfit": "Ranger field gear",
   "offhand": "None",
   "headgear": "Hood"
  },
  "palette": "royal"
 },
 {
  "class": "Rogue",
  "specialties": [
   "Shadowstep",
   "Cutpurse",
   "Nightblade"
  ],
  "equipment": {
   "weapon": "Twin daggers",
   "outfit": "Rogue leathers",
   "offhand": "None",
   "headgear": "Hood"
  },
  "palette": "forest"
 },
 {
  "class": "Sorcerer",
  "specialties": [
   "Sparkweaver",
   "Stormblood",
   "Starcaller"
  ],
  "equipment": {
   "weapon": "Staff",
   "outfit": "Wizard robes",
   "offhand": "None",
   "headgear": "None"
  },
  "palette": "ember"
 },
 {
  "class": "Warlock",
  "specialties": [
   "Hexwarden",
   "Pact Seeker",
   "Voidbinder"
  ],
  "equipment": {
   "weapon": "Staff",
   "outfit": "Wizard robes",
   "offhand": "Spellbook",
   "headgear": "Hood"
  },
  "palette": "shadow"
 },
 {
  "class": "Wizard",
  "specialties": [
   "Spellwright",
   "Arcanist",
   "Runekeeper"
  ],
  "equipment": {
   "weapon": "Staff",
   "outfit": "Wizard robes",
   "offhand": "Spellbook",
   "headgear": "Hood"
  },
  "palette": "village"
 }
]);
export const GENDERS=Object.freeze([["male","Male"],["female","Female"],["nonbinary","Nonbinary"]]);
export const HERO_VARIANTS=Object.freeze(CLASS_ARCHETYPES.flatMap((klass,ci)=>
  GENDERS.flatMap(([identity,label],gi)=>
    klass.specialties.map((specialty,si)=>{
      const ancestry=["Human","Elf","Dwarf","Orc","Goblin"][(ci+gi+si)%5];
      const roles=['Scout','Sentinel','Veteran'];
      return Object.freeze({
        id:'pregen-'+klass.class.toLowerCase()+'-'+identity+'-'+(si+1),
        name:ancestry+' '+specialty+' '+klass.class+' · '+label,
        characterClass:klass.class,gender:identity,
        ancestry,specialty,look:roles[si],variation:si+1,
        gear:Object.freeze({...klass.equipment}),
        palette:klass.palette,
        genderSource:'Original fictional character identity',
        artStatus:'not-produced',commercialRelease:false,
      });
    })
  )
));
