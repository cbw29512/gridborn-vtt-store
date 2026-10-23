import {monsterSRD} from './monster-srd.js';
const COLORS=Object.freeze(['Black','Blue','Green','Red','White','Brass','Bronze','Copper','Gold','Silver']);
const ages=['wyrmling','young','adult','ancient'];
export const DRAGON_FAMILY=Object.freeze({foundationId:'western-four-legged-winged-dragon',
 species:COLORS,ages:Object.freeze(ages),joints:Object.freeze([
 'tail','wing-far','wing-near','hind-far','hind-near','front-far','front-near','neck','head','mouth'
 ]),excludedTypes:Object.freeze(['Dragon Turtle','Wyvern','Pseudodragon','Half-Dragon','Kobold Warrior'])});
export function dragonRecipeForRecord(record){
 if(!record||typeof record!=='object')throw TypeError('Missing dragon source record');
 const m=/^(?:(Young|Adult|Ancient) )?(Black|Blue|Green|Red|White|Brass|Bronze|Copper|Gold|Silver) Dragon(?: (Wyrmling))?$/.exec(record.name);
 if(!m||!/Dragon \((Chromatic|Metallic)\)/.test(record.type))
  throw Error('Not a standard four-legged color/metal dragon: '+record.name);
 const age=m[3]?'wyrmling':m[1].toLowerCase();
 const size={wyrmling:'Medium',young:'Large',adult:'Huge',ancient:'Gargantuan'}[age];
 if(record.size!==size)throw Error('Dragon age/size mismatch: '+record.name);
 return Object.freeze({catalogId:'mon-'+record.id,name:record.name,
  foundationId:DRAGON_FAMILY.foundationId,species:m[2],age,
  sourceRecordId:record.id,size:record.size,
  artStatus:'not-produced',commercialRelease:false});
}
export function catalogDragonRecipes(records=monsterSRD){
 const list=records.filter(r=>/Dragon \((Chromatic|Metallic)\)/.test(r.type))
  .map(dragonRecipeForRecord);
 const ids=new Set(list.map(x=>x.catalogId));
 if(ids.size!==list.length)throw Error('Duplicate dragon catalog ID');
 return Object.freeze(list);
}
