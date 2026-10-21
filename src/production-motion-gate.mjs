/** Fail closed when an art study is promoted to a moving catalog product.
 * Static index/concept entries may remain, but never claim to be full motion.
 * This gate verifies metadata while tests verify the actual public asset paths.
 */
import {animatedPreviews} from './animated-previews.js';
import {artStudies} from './art-studies.js';
export const REQUIRED_STATES=Object.freeze(['still','idle','move','action','rest']);

export function verifyMotionCatalog(entries,previews=animatedPreviews,art=artStudies){
  if(!Array.isArray(entries))throw new TypeError('Catalog must be an array');
  const byId=new Map(entries.map(item=>[item.id,item]));
  for(const [id,preview] of Object.entries(previews)){
    const item=byId.get(id);
    if(!item)throw Error('Animation has no catalog entry: '+id);
    if(item.animationStatus!=='art-study')throw Error('Motion study not correctly labeled: '+id);
    if(item.purchasable!==false)throw Error('Unreviewed animation marked purchasable: '+id);
    for(const state of REQUIRED_STATES){
      const path=preview[state];
      if(typeof path!=='string'||!/^\.\/assets\/(?:demos|studies)\/[a-z0-9-]+\.svg$/.test(path))
        throw Error(id+' missing approved '+state+' state SVG');
    }
    if(preview.still!==art[id]||preview.still!==item.previewArt)
      throw Error('Still study does not match source art: '+id);
    if(!Number.isInteger(preview.actionDurationMs)||preview.actionDurationMs<200)
      throw Error('Missing one-shot attack duration: '+id);
    if(!preview.labels||REQUIRED_STATES.slice(1).some(s=>
        typeof preview.labels[s]!=='string'||preview.labels[s].length<12))
      throw Error(id+' must label all four motions');
  }
  for(const item of entries){
    if(item.animationStatus==='art-study'&&!Object.hasOwn(previews,item.id))
      throw Error('Moving art-study entry without complete motion: '+item.id);
  }
  return true;
}
