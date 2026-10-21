/** NPC occupation concepts: the real art/motion status stays NOT PRODUCED. */
const NPC_RACES=Object.freeze(["Human","Elf","Dwarf","Orc"]);
const NPC_JOBS=Object.freeze(["Innkeeper","Farmer","Guard","Soldier","Merchant","Blacksmith","Healer","Sage","Miner","Sailor","Priest","Stablekeeper"]);
const NPC_GENDERS=Object.freeze(['male','female','nonbinary']);
export const NPC_CONCEPTS=Object.freeze(NPC_JOBS.flatMap((occupation,ji)=>
 NPC_RACES.map((ancestry,ri)=>{
  const g=NPC_GENDERS[(ji+ri)%NPC_GENDERS.length];
  return Object.freeze({
   id:'npc-roster-'+occupation.toLowerCase()+'-'+ancestry.toLowerCase(),
   name:ancestry+' '+occupation+' · '+(g==='nonbinary'?'Nonbinary':g==='male'?'Male':'Female'),
   ancestry,occupation,gender:g,
   distinguishingGear:({
    Innkeeper:'apron, keys and serving tray',Farmer:'work boots and pitchfork',
    Guard:'shield, helm and short spear',Soldier:'uniform, badge and sword',
    Merchant:'satchel, trade scales and cloak',Blacksmith:'hammer, leather apron and tongs',
    Healer:'satchel, bandages and herbal kit',Sage:'scroll cases and reading spectacles',
    Miner:'pickaxe, lantern and dust-covered gear',Sailor:'rope, cap and boots',
    Priest:'plain ceremonial stole and staff',Stablekeeper:'brush, bucket and reins'
   })[occupation],
   artStatus:'not-produced',animationStatus:'not-produced',commercialRelease:false
  });
 })
));
