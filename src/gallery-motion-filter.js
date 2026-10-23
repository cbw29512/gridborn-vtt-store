import {hasCatalogMotion} from './catalog-motion.js';
/** Use the existing canonical gallery only; no separate artwork collection. */
export function filterGalleryByMotion(items,onlyAnimated,hasMotion=hasCatalogMotion){
 if(!Array.isArray(items))throw new TypeError('Catalog items must be an array');
 if(!onlyAnimated)return items;
 return items.filter(item=>hasMotion(item.id));
}
