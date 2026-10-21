/** Read exact playback timing from a locally installed private token bundle.
 * Browser fetch is same-origin and restricted to the validated Foundry Data path.
 * A missing or invalid receipt never silently selects a guessed animation timer.
 */
import { MODES, normalizeFolder, validateConfig } from './contract.mjs';

export function validatePackageReceipt(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw))
    throw new Error('Invalid Gridborn package timing receipt');
  if (raw.status !== 'technical-preview-pass' || raw.purchaseEnabled !== false)
    throw new Error('Unverified Gridborn package receipt');
  if (typeof raw.assetId !== 'string' ||
      !/^[a-z0-9][a-z0-9-]{1,100}$/.test(raw.assetId))
    throw new Error('Invalid Gridborn package identity');
  if (raw.clipSource !== 'independent-svg-states' &&
      raw.clipSource !== 'master-reel-split')
    throw new Error('Unknown Gridborn clip source');
  const required = [...MODES.map(mode => mode + '.webm'), 'still.png'];
  if (!Array.isArray(raw.files) ||
      required.some(name => !raw.files.includes(name)))
    throw new Error('Gridborn package is missing required clip metadata');
  const attackMs = validateConfig({
    folder: 'worlds/gridborn/package',
    attackMs: raw.attackMs
  }).attackMs;
  if (typeof raw.attackMs !== 'number' || !Number.isInteger(raw.attackMs))
    throw new Error('Gridborn package attack timing must be a whole millisecond');
  return Object.freeze({ assetId: raw.assetId, attackMs });
}

export async function readPackageTiming(rawFolder, fetcher = globalThis.fetch) {
  const folder = normalizeFolder(rawFolder);
  if (typeof fetcher !== 'function') throw new Error('No Foundry package reader available');
  const response = await fetcher(folder + '/gridborn-preview.json', {
    credentials: 'same-origin', cache: 'no-store', redirect: 'error'
  });
  if (response?.status === 404) return null;
  if (!response?.ok || typeof response.json !== 'function')
    throw new Error('Could not read Gridborn package timing in that Data folder');
  let data;
  try { data = await response.json(); }
  catch { throw new Error('Gridborn package timing file is not valid JSON'); }
  return validatePackageReceipt(data);
}
