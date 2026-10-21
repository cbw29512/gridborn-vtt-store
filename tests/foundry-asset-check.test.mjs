import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyAssetFolder } from '../foundry/gridborn-controller/scripts/asset-check.mjs';

test('one folder check accepts four exact WebM files from Foundry FilePicker', async () => {
  const calls = [];
  const browse = async (source, folder, options) => {
    calls.push({ source, folder, options });
    return { files:['worlds/w/gridborn/f/idle.webm','worlds/w/gridborn/f/move.webm',
      'worlds/w/gridborn/f/attack.webm','worlds/w/gridborn/f/rest.webm'] };
  };
  assert.equal(await verifyAssetFolder('worlds/w/gridborn/f/', browse),
    'worlds/w/gridborn/f');
  assert.equal(calls[0].source, 'data');
  assert.deepEqual(calls[0].options.extensions, ['.webm']);
});

test('missing animations fail setup before a token texture is changed', async () => {
  await assert.rejects(
    verifyAssetFolder('worlds/w/gridborn/f', async () => ({ files:['idle.webm'] })),
    /move\.webm, attack\.webm, rest\.webm/
  );
});

test('a missing Foundry file browser fails safely', async () => {
  await assert.rejects(verifyAssetFolder('worlds/w/gridborn/f', undefined),
    /file browser is unavailable/);
});
