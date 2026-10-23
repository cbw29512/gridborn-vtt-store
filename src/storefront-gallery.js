/**
 * Gridborn sales-layout invariant: one canonical product grid for the whole site.
 * Category shortcuts, filters and search navigate this grid; none creates a second
 * product collection. Every rendered card has exactly one immutable catalog ID.
 *
 * Tested at runtime and in Chromium; this is not a storefront/retail approval.
 */
export function assertSingleProductGallery(root) {
  if(!root || typeof root.querySelectorAll!=='function')
    throw new TypeError('A queryable storefront root is required');
  const grids=[...root.querySelectorAll('.product-grid')];
  if(grids.length!==1 || grids[0].id!=='results')
    throw new Error('Only the canonical #results product gallery is permitted');
  const cards=[...root.querySelectorAll('.product-card')];
  const owned=[...grids[0].querySelectorAll('.product-card')];
  if(owned.length!==cards.length)
    throw new Error('Product cards must appear only in the canonical #results gallery');
  const ids=new Set();
  for(const card of owned){
    const id=card.dataset?.productId;
    if(typeof id!=='string' || !id.trim() || ids.has(id))
      throw new Error('Missing or duplicated product listing: '+String(id));
    ids.add(id);
  }
  return true;
}
