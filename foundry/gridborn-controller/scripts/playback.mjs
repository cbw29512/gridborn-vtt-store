import { MODULE_ID, MODES, assetPaths, canControl,
  nextState, shouldResetPlayback, validateConfig } from './contract.mjs';

const pending = new Map();
const clock = { schedule: (fn, ms) => setTimeout(fn, ms), cancel: id => clearTimeout(id) };

export function stopTimer(token) {
  const key = token?.document?.uuid;
  if (!key) return;
  const old = pending.get(key);
  if (old) { old.clock.cancel(old.id); pending.delete(key); }
}

export async function playMode(token, mode, options = {}) {
  if (!MODES.includes(mode)) throw new Error('Unknown Gridborn animation mode');
  if (!canControl(token, options.user ?? game.user)) throw new Error('Token ownership required');
  const doc = token.document;
  const config = validateConfig(doc.getFlag(MODULE_ID, 'config'));
  const paths = assetPaths(config);
  const nonce = options.nonce ?? String(Date.now()) + '-' + Math.random().toString(36).slice(2);
  const state = nextState(mode, nonce);
  stopTimer(token);
  await doc.update({ 'texture.src': paths[mode], ['flags.' + MODULE_ID + '.playback']: state });
  if (typeof options.onPlayback === 'function') options.onPlayback(mode);
  if (mode !== 'attack') return state;
  const time = options.clock ?? clock;
  const id = time.schedule(async () => {
    pending.delete(doc.uuid);
    try {
      const saved = doc.getFlag(MODULE_ID, 'playback');
      if (!shouldResetPlayback(saved, nonce, doc.texture?.src, paths.attack)) return;
      if (!canControl(token, options.user ?? game.user)) return;
      await playMode(token, 'idle', options);
    } catch (error) {
      console.error('Gridborn could not return Attack to Idle', error);
      globalThis.ui?.notifications?.warn('Gridborn: Choose Idle to restore this token.');
    }
  }, config.attackMs);
  pending.set(doc.uuid, { id, clock: time });
  return state;
}

export async function configureToken(token, input, options = {}) {
  if (!canControl(token, options.user ?? game.user)) throw new Error('Token ownership required');
  const doc = token.document;
  const { folder, attackMs } = validateConfig(input);
  const originalTexture = doc.getFlag(MODULE_ID, 'config')?.originalTexture ??
    doc.texture?.src ?? '';
  await doc.setFlag(MODULE_ID, 'config', { folder, attackMs, originalTexture });
  return playMode(token, 'idle', options);
}

export async function restoreToken(token, options = {}) {
  if (!canControl(token, options.user ?? game.user)) throw new Error('Token ownership required');
  stopTimer(token);
  const doc = token.document;
  const original = doc.getFlag(MODULE_ID, 'config')?.originalTexture;
  if (typeof original === 'string' && original)
    await doc.update({ 'texture.src': original });
  await doc.unsetFlag(MODULE_ID, 'config');
  await doc.unsetFlag(MODULE_ID, 'playback');
}
