/**
 * Pure filtering. Keeping these functions independent of DOM enables unit tests.
 * Filter state has exactly four fields, with no hidden or inferred selections.
 */
export const initialState = Object.freeze({
  category: 'Characters',
  query: '',
  primary: '',
  secondary: '',
});

export function availableOptions(items, category, primary = '') {
  try {
    const pool = items.filter(item => item.category === category);
    const first = [...new Set(pool.map(item => item.primary))].sort();
    const second = [...new Set(pool.filter(item => !primary || item.primary === primary).map(item => item.secondary))].sort();
    return { first, second };
  } catch (error) {
    console.error('Unable to build catalog filter options', error);
    return { first: [], second: [] };
  }
}

export function filterCatalog(items, state) {
  try {
    const query = String(state.query || '').trim().toLocaleLowerCase();
    return items.filter(item => {
      if (item.category !== state.category) return false;
      if (state.primary && item.primary !== state.primary) return false;
      if (state.secondary && item.secondary !== state.secondary) return false;
      if (!query) return true;
      const haystack = [item.name, item.primary, item.secondary, item.category, item.size]
        .join(' ').toLocaleLowerCase();
      return haystack.includes(query);
    });
  } catch (error) {
    console.error('Unable to filter token catalog', error);
    return [];
  }
}

export function validateCatalog(items) {
  try {
    const ids = new Set();
    for (const item of items) {
      if (!item.id || ids.has(item.id)) throw new Error(`Invalid or duplicate token ID: ${item.id}`);
      ids.add(item.id);
      if (!['Characters','NPCs','Monsters','Animals'].includes(item.category)) throw new Error(`Bad category: ${item.id}`);
      if (!item.primary || !item.secondary || !item.name) throw new Error(`Incomplete filter data: ${item.id}`);
      if (item.squares < 1 || !Number.isInteger(item.squares)) throw new Error(`Invalid footprint: ${item.id}`);
      if (item.purchasable) throw new Error(`Unverified item marked purchasable: ${item.id}`);
    }
    return true;
  } catch (error) {
    console.error('Catalog validation failed', error);
    return false;
  }
}