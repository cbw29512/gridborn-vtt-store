/** Shared ancestry-scale foundations for class and NPC builder rigs. */
const rows=[
 ['Human',1,1],['Orc',1,1],['Half-Orc',1,1],
 ['Elf',1,1],['Dwarf',1.05,.88],['Goblin',.85,.85],
 ['Gnome',.8,.8],['Halfling',.84,.84],
 ['Skeleton',1,1],['Ogre',1,1],['Lizardfolk',1,1]
];
export const FAMILY_BUILD_ORDER=Object.freeze(rows.map(([name])=>name));
export const SPECIES_FOUNDATIONS=Object.freeze(Object.fromEntries(rows.map(([ancestry,w,h])=>
 [ancestry,Object.freeze({
  foundationId:ancestry.toLowerCase(),ancestry,scale:Object.freeze([w,h]),groundY:208,
  availableInBuilder:!['Half-Orc','Ogre','Lizardfolk'].includes(ancestry),
  sourceMode:['Half-Orc','Ogre','Lizardfolk'].includes(ancestry)
   ? 'family-source-required':'existing-builder-rig'
 })]
)));
export const foundationFor=ancestry=>SPECIES_FOUNDATIONS[ancestry]??null;
