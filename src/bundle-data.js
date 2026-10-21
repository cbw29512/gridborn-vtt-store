/** Proposed per-token and multi-token pack prices in integer US cents.
 * This preview makes no sales and grants no access to paid files.
 */
export const UNIT_PRICE_CENTS=99;
export const MAX_BUNDLE_TOKENS=25;
export const BUNDLE_TIERS=Object.freeze([
  Object.freeze({size:1,cents:99,label:'Single'}),
  Object.freeze({size:5,cents:399,label:'5-token pack'}),
  Object.freeze({size:10,cents:749,label:'10-token pack'}),
  Object.freeze({size:25,cents:1799,label:'25-token pack'})
]);
export const BUNDLE_TEMPLATES=Object.freeze([
  Object.freeze({
    id:'starter-party',title:'Adventuring Party',description:'Five heroes for a first encounter',
    ids:Object.freeze(['chr-ftr-human','chr-clr-dwarf','chr-wiz-elf','chr-rng-elf','chr-pal-human'])
  }),
  Object.freeze({
    id:'dungeon-threats',title:'Dungeon Threats',description:'Five creatures for a classic delve',
    ids:Object.freeze(['mon-cave-goblin','mon-cave-ogre','mon-dng-skeleton','mon-dng-armor','mon-cave-spider'])
  }),
  Object.freeze({
    id:'tavern-cast',title:'Tavern Cast',description:'Five people to bring a settlement to life',
    ids:Object.freeze(['npc-inn-human','npc-inn-dwarf','npc-far-human','npc-sol-orc','npc-mer-elf'])
  }),
  Object.freeze({
    id:'wilderness',title:'Wild Encounters',description:'Five animals for outdoor exploration',
    ids:Object.freeze(['ani-forest-wolf','ani-forest-fox','ani-forest-bear','ani-swamp-croc','ani-ocean-greatwhite'])
  })
]);

export function bundlePricing(count) {
  if(!Number.isInteger(count)||count<0||count>MAX_BUNDLE_TOKENS)
    throw new Error('Bundle count must be an integer from 0 to '+MAX_BUNDLE_TOKENS);
  const best=[{cents:0,counts:[0,0,0,0]}];
  for(let n=1;n<=count;n++){
    const offers=BUNDLE_TIERS.map((tier,index)=>{
      if(tier.size>n)return null;
      const prior=best[n-tier.size];
      const counts=prior.counts.slice();
      counts[index]++;
      return {cents:prior.cents+tier.cents,counts};
    }).filter(Boolean);
    best.push(offers.reduce((a,b)=>a.cents<=b.cents?a:b));
  }
  const regularCents=count*UNIT_PRICE_CENTS;
  return Object.freeze({
    count,regularCents,totalCents:best[count].cents,
    savingsCents:regularCents-best[count].cents,
    packs:BUNDLE_TIERS.flatMap((tier,i)=>
      best[count].counts[i]?[Object.freeze({...tier,quantity:best[count].counts[i]})]:[])
  });
}

export function cleanBundleIds(ids,catalog) {
  if(!Array.isArray(ids))return [];
  const allowed=new Set(catalog.map(item=>item.id));
  const unique=new Set();
  for(const id of ids){
    if(typeof id==='string'&&allowed.has(id))unique.add(id);
    if(unique.size>=MAX_BUNDLE_TOKENS)break;
  }
  return [...unique];
}

export function validateBundleTemplates(catalog) {
  const valid=new Set(catalog.map(item=>item.id));
  const unique=new Set();
  for(const pack of BUNDLE_TEMPLATES){
    if(unique.has(pack.id)||pack.ids.length!==5||new Set(pack.ids).size!==5||
       !pack.ids.every(id=>valid.has(id)))
      throw new Error('Invalid predefined bundle: '+pack.id);
    unique.add(pack.id);
  }
  return true;
}
