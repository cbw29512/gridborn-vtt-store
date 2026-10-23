/** Immutable catalog is the source of truth; a concept is never a finished token. */
import {catalog} from './catalog.js';
import {animatedPreviews} from './animated-previews.js';
import {FAMILY_BUILD_ORDER} from './species-foundations.mjs';
const PREFIX=Object.freeze(['Half-Orc','Orc','Goblin','Skeleton','Ogre','Lizardfolk','Dwarf','Elf','Human']);
const CAT=Object.freeze(['Characters','NPCs','Monsters']);
export function ancestryOf(entry,assignments={}){
 if(Object.hasOwn(assignments,entry.id)){
  const value=assignments[entry.id];
  if(!FAMILY_BUILD_ORDER.includes(value))throw Error('Unknown family assignment: '+entry.id);
  return value;
 }
 if(['Characters','NPCs'].includes(entry.category))
  return FAMILY_BUILD_ORDER.includes(entry.race)?entry.race:null;
 if(entry.category!=='Monsters')return null;
 const name=entry.name??'';
 for(const family of PREFIX)
  if(name.toLowerCase()===family.toLowerCase()||name.toLowerCase().startsWith(family.toLowerCase()+' '))
   return family;
 const match=/^Humanoid \((Human|Orc|Half-Orc|Elf|Dwarf|Goblin|Gnome|Halfling)\)$/.exec(entry.creatureType??'');
 return match?.[1]??null;
}
function verifiedStatus(item,previews){
 if(Object.hasOwn(previews,item.id)){
  if(item.animationStatus!=='art-study'||item.purchasable!==false)
   throw Error('Unverified animation record: '+item.id);
  return 'animated-study';
 }
 if(item.animationStatus==='art-study')throw Error('Missing preview source: '+item.id);
 return item.previewArt?'still-only':'unproduced';
}
export function ancestryProductionQueue(entries=catalog,previews=animatedPreviews,assignments={}){
 if(!Array.isArray(entries)||!previews||typeof previews!=='object')throw TypeError('Invalid inventory');
 const seen=new Set(),matched=[],unassigned=[],genericEnemies=[];
 for(const item of entries){
  if(!item||typeof item.id!=='string'||seen.has(item.id))
   throw Error('Duplicate or invalid catalog ID: '+item?.id);
  seen.add(item.id);
  const ancestry=ancestryOf(item,assignments);
  const row=Object.freeze({id:item.id,name:item.name,category:item.category,
   status:verifiedStatus(item,previews)});
  if(ancestry)matched.push({...row,ancestry});
  else{
   unassigned.push(row);
   if(item.category==='Monsters'&&/^Humanoid(?: \(|$)/.test(item.creatureType??''))
    genericEnemies.push(row);
  }
 }
 const families=FAMILY_BUILD_ORDER.map(ancestry=>{
  const group=matched.filter(x=>x.ancestry===ancestry).sort((a,b)=>
   CAT.indexOf(a.category)-CAT.indexOf(b.category)||a.name.localeCompare(b.name));
  const categories=Object.freeze(Object.fromEntries(CAT.map(cat=>
   [cat,group.filter(x=>x.category===cat).length])));
  return Object.freeze({ancestry,total:group.length,
   animated:group.filter(x=>x.status==='animated-study').length,
   stillOnly:group.filter(x=>x.status==='still-only').length,
   unproduced:group.filter(x=>x.status==='unproduced').length,
   categories,entries:Object.freeze(group)});
 });
 return Object.freeze({totalCatalog:entries.length,matched:matched.length,
  families:Object.freeze(families),unassigned:Object.freeze(unassigned),
  flexibleHumanoidEnemies:Object.freeze(genericEnemies)});
}
