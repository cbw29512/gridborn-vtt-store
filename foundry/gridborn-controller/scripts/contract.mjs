/** Pure, version-neutral rules for optional Foundry token animations. */
export const MODULE_ID = 'gridborn-controller';
export const MODES = Object.freeze(['idle', 'move', 'attack', 'rest']);
export const DEFAULT_ATTACK_MS = 10000;

export function normalizeFolder(raw) {
  if (typeof raw !== 'string') throw new TypeError('Asset folder must be text');
  const folder = raw.trim().replace(/\/+$/, '');
  if (!folder || folder.length > 512 || /^[./\\]/.test(folder) ||
      /[?#\\<>"']/.test(folder) || /(^|\/)\.\.?($|\/)/.test(folder) ||
      /^[a-z][a-z0-9+.-]*:/i.test(folder) || folder.includes('//'))
    throw new Error('Enter a relative Data folder, such as worlds/my-world/gridborn/fighter');
  return folder;
}

export function validateConfig(input) {
  if (!input || typeof input !== 'object') throw new Error('Animation setup is missing');
  const folder = normalizeFolder(input.folder);
  const attackMs = Number(input.attackMs ?? DEFAULT_ATTACK_MS);
  if (!Number.isInteger(attackMs) || attackMs < 500 || attackMs > 60000)
    throw new Error('Attack duration must be between 0.5 and 60 seconds');
  return { folder, attackMs };
}

export function assetPaths(config) {
  const { folder } = validateConfig(config);
  return Object.fromEntries(MODES.map(mode => [mode, folder + '/' + mode + '.webm']));
}

export function canControl(token, user) {
  return Boolean(token?.document && user && (user.isGM || token.document.isOwner));
}

export function nextState(mode, nonce) {
  if (!MODES.includes(mode)) throw new Error('Unknown animation mode');
  if (typeof nonce !== 'string' || nonce.length < 5) throw new Error('Invalid playback nonce');
  return { mode, nonce };
}

export function shouldResetPlayback(current, expectedNonce, currentSrc, attackPath) {
  return current?.mode === 'attack' && current.nonce === expectedNonce &&
    currentSrc === attackPath;
}
