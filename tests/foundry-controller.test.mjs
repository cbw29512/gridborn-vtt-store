import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { MODULE_ID, MODES, normalizeFolder, validateConfig, assetPaths,
  canControl, nextState, shouldResetPlayback } from
  '../foundry/gridborn-controller/scripts/contract.mjs';
import { playMode, configureToken, restoreToken, stopTimer } from
  '../foundry/gridborn-controller/scripts/playback.mjs';

const owner = { isGM: false };
function tokenFixture() {
  const flags = { config: null, playback: null };
  const record = { uuid: 'Scene.example.Token.mock', isOwner: true,
    texture: { src: 'icons/svg/mystery-man.svg' },
    getFlag(_ns, key) { return flags[key]; },
    async setFlag(_ns, key, value) { flags[key] = value; },
    async unsetFlag(_ns, key) { flags[key] = null; },
    async update(delta) {
      if ('texture.src' in delta) this.texture.src = delta['texture.src'];
      if ('flags.' + MODULE_ID + '.playback' in delta)
        flags.playback = delta['flags.' + MODULE_ID + '.playback'];
    }
  };
  return { document: record, flags };
}

test('module manifest is valid and does not claim Foundry certification', () => {
  const path = '../foundry/gridborn-controller/';
  const manifest = JSON.parse(readFileSync(new URL(path + 'module.json', import.meta.url)));
  assert.equal(manifest.id, 'gridborn-controller');
  assert.equal(manifest.compatibility.minimum, '13');
  assert.equal(manifest.compatibility.verified, undefined);
  for (const file of [...manifest.esmodules, ...manifest.styles])
    assert.ok(existsSync(new URL(path + file, import.meta.url)), file);
});

test('one asset folder maps to four stable filenames', () => {
  assert.deepEqual(MODES, ['idle', 'move', 'attack', 'rest']);
  assert.deepEqual(assetPaths({ folder:'worlds/my-campaign/gridborn/goblin', attackMs:10000 }), {
    idle:'worlds/my-campaign/gridborn/goblin/idle.webm',
    move:'worlds/my-campaign/gridborn/goblin/move.webm',
    attack:'worlds/my-campaign/gridborn/goblin/attack.webm',
    rest:'worlds/my-campaign/gridborn/goblin/rest.webm'
  });
});

test('reject dangerous or ambiguous data paths and invalid durations', () => {
  for (const name of ['', '../other', '/private', 'https://example.com/folder',
    'worlds/../private', 'worlds//folder', 'worlds\\folder', 'worlds/folder?token=abc']) {
    assert.throws(() => normalizeFolder(name), name);
  }
  assert.equal(normalizeFolder(' worlds/adventure/gridborn/fighter/ '),
    'worlds/adventure/gridborn/fighter');
  for (const ms of [0, -1, 499, 60001, Infinity, 1234.5]) {
    assert.throws(() => validateConfig({ folder:'worlds/a', attackMs:ms }));
  }
});

test('only a GM or owner can change a token', () => {
  const token = tokenFixture();
  token.document.isOwner = false;
  assert.equal(canControl(token, { isGM:false }), false);
  assert.equal(canControl(token, { isGM:true }), true);
  assert.equal(canControl({ document:{ isOwner:true } }, null), false);
});

test('configuring a token starts Idle and preserves original texture for restoration', async () => {
  const token = tokenFixture();
  await configureToken(token, { folder:'worlds/adventure/gridborn/fighter', attackMs:10000 },
    { user:owner, nonce:'configured' });
  assert.match(token.document.texture.src, /idle\.webm$/);
  assert.equal(token.flags.config.originalTexture, 'icons/svg/mystery-man.svg');
  await playMode(token, 'move', { user:owner, nonce:'walking1' });
  assert.match(token.document.texture.src, /move\.webm$/);
  await playMode(token, 'rest', { user:owner, nonce:'resting1' });
  assert.match(token.document.texture.src, /rest\.webm$/);
  await restoreToken(token, { user:owner });
  assert.equal(token.document.texture.src, 'icons/svg/mystery-man.svg');
  assert.equal(token.flags.config, null);
});

test('attack is one-shot and automatically returns to Idle', async () => {
  const token = tokenFixture();
  await configureToken(token, { folder:'worlds/a', attackMs:10000 },
    { user:owner, nonce:'initial00' });
  const scheduled = [];
  const fakeClock = {
    schedule: (fn, ms) => { scheduled.push({ fn, ms, canceled:false }); return scheduled.length - 1; },
    cancel: i => { scheduled[i].canceled = true; }
  };
  await playMode(token, 'attack', { user:owner, nonce:'attack01', clock:fakeClock });
  assert.equal(scheduled[0].ms, 10000);
  assert.match(token.document.texture.src, /attack\.webm$/);
  await scheduled[0].fn();
  assert.match(token.document.texture.src, /idle\.webm$/);
  stopTimer(token);
});

test('manual Rest prevents stale Attack timers from overwriting the token', async () => {
  const token = tokenFixture();
  await configureToken(token, { folder:'worlds/a', attackMs:10000 },
    { user:owner, nonce:'initial00' });
  let callback;
  const fakeClock = { schedule: fn => { callback = fn; return 1; }, cancel() {} };
  await playMode(token, 'attack', { user:owner, nonce:'attack02', clock:fakeClock });
  await playMode(token, 'rest', { user:owner, nonce:'resting2' });
  await callback();
  assert.match(token.document.texture.src, /rest\.webm$/);
});

test('quiet Idle, Move and Rest hold indefinitely without timers', async () => {
  const token=tokenFixture();
  const clock={schedule:()=>{throw new Error('Non-attack modes must never advance on a timer');},cancel:()=>{}};
  await configureToken(token,{folder:'worlds/a',attackMs:1400},{user:owner,nonce:'started-idle',clock});
  for(const mode of ['idle','move','rest']){
    await playMode(token,mode,{user:owner,nonce:'select-'+mode,clock});
    assert.equal(token.document.texture.src.endsWith(mode+'.webm'),true);
    assert.equal(token.flags.playback.mode,mode);
  }
});

test('stale playback nonce cannot override a newer attack', () => {
  assert.equal(shouldResetPlayback({ mode:'attack', nonce:'oldNonce' },
    'newNonce', 'worlds/a/attack.webm', 'worlds/a/attack.webm'), false);
  assert.equal(shouldResetPlayback({ mode:'attack', nonce:'newNonce' },
    'newNonce', 'worlds/a/attack.webm', 'worlds/a/attack.webm'), true);
  assert.throws(() => nextState('dance', 'abcxyz'));
});
