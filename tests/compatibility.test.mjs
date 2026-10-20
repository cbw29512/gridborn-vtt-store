import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateCompatibilityRecord } from '../src/compatibility-contract.js';

const load = () => {
  try {
    return JSON.parse(readFileSync(new URL('../docs/compatibility-record.json', import.meta.url), 'utf8'));
  } catch (error) {
    console.error('Could not load VTT compatibility evidence record', error);
    throw error;
  }
};

test('record is valid but neither VTT has been tested', () => {
  const data = load();
  assert.equal(validateCompatibilityRecord(data), true);
  assert.equal(data.releaseApproved, false);
  assert.equal(data.purchaseEnabled, false);
  assert.ok(data.platforms.every(item => item.status === 'not-tested'));
});
test('a claimed VTT pass without real test evidence fails closed', () => {
  const data = load();
  data.platforms[0].status = 'passed';
  assert.equal(validateCompatibilityRecord(data), false);
});
test('checkout cannot be enabled from a technical export pass alone', () => {
  const data = load();
  data.purchaseEnabled = true;
  data.releaseApproved = true;
  assert.equal(validateCompatibilityRecord(data), false);
});
test('unverified source art rights block release', () => {
  const data = load();
  data.releaseApproved = true;
  assert.equal(validateCompatibilityRecord(data), false);
});
test('false technical run URL fails verification', () => {
  const data = load();
  data.technicalMediaQA.evidenceUrl = 'https://example.com/fake';
  assert.equal(validateCompatibilityRecord(data), false);
});
