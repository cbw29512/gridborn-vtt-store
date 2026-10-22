/** Character production inventory: read-only, based on source-backed preview mappings.
 * A rig recipe or a gender concept is never treated as an animated asset.
 * This report deliberately does not make visual-quality or VTT import claims.
 */
import {CLASS_ARCHETYPES,HERO_VARIANTS} from './hero-variants.js';
import {animatedPreviews} from './animated-previews.js';
import {catalog} from './catalog.js';

export function characterProductionAudit(entries=catalog,previews=animatedPreviews,variants=HERO_VARIANTS) {
  if(!Array.isArray(entries)||!Array.isArray(variants)||!previews||typeof previews!=='object')
    throw new TypeError('Character production audit requires catalog, previews, and variants');
  const byId=new Map();
  for(const entry of entries){
    if(byId.has(entry.id))throw new Error('Duplicate catalog ID: '+entry.id);
    byId.set(entry.id,entry);
  }
  const identities=new Set();
  const classes=CLASS_ARCHETYPES.map(def=>{
    const concepts=variants.filter(item=>item.characterClass===def.class);
    const genderSlots=Object.fromEntries(['male','female','nonbinary'].map(g=>[g,0]));
    for(const concept of concepts){
      if(identities.has(concept.id))throw new Error('Duplicate variant ID: '+concept.id);
      identities.add(concept.id);
      if(!Object.hasOwn(genderSlots,concept.gender))throw new Error('Invalid gender identity: '+concept.id);
      genderSlots[concept.gender]++;
      if(!byId.has(concept.id))throw new Error('Variant missing from catalog: '+concept.id);
    }
    const moving=entries.filter(item=>item.category==='Characters'&&item.characterClass===def.class
      &&Object.hasOwn(previews,item.id)&&item.animationStatus==='art-study');
    const animatedVariants=concepts.filter(c=>moving.some(m=>m.id===c.id));
    return Object.freeze({name:def.class,concepts:concepts.length,genderConcepts:Object.freeze(genderSlots),
      technicalStudies:moving.length,animatedVariants:animatedVariants.length,
      needsBaseStudy:moving.length===0,remainingVariantStudies:concepts.length-animatedVariants.length});
  });
  return Object.freeze({classCount:classes.length,variantConcepts:variants.length,
    animatedCharacterStudies:classes.reduce((n,c)=>n+c.technicalStudies,0),
    animatedHeroVariants:classes.reduce((n,c)=>n+c.animatedVariants,0),
    classesMissingStudy:classes.filter(c=>c.needsBaseStudy).map(c=>c.name),
    classes:Object.freeze(classes)});
}
