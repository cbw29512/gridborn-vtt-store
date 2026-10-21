import { MODES, normalizeFolder } from './contract.mjs';

/** Check one directory in Foundry's Data source before changing token art. */
export async function verifyAssetFolder(rawFolder, browse) {
  const folder = normalizeFolder(rawFolder);
  if (typeof browse !== 'function') throw new Error('Foundry file browser is unavailable');
  const result = await browse('data', folder, { extensions: ['.webm'] });
  if (!Array.isArray(result?.files)) throw new Error('Foundry did not return the folder files');
  const names = new Set(result.files.map(file => {
    const path = typeof file === 'string' ? file : file?.name || file?.path || '';
    return path.split('/').pop()?.split('?')[0];
  }));
  const missing = MODES.filter(mode => !names.has(mode + '.webm'));
  if (missing.length)
    throw new Error('Missing token animations: ' + missing.map(x => x + '.webm').join(', '));
  return folder;
}
