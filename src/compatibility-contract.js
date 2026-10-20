/** Explicit evidence gate; never infer VTT compatibility from codec support. */
export const vttStatuses = Object.freeze(['not-tested', 'failed', 'passed']);

export function validateCompatibilityRecord(record) {
  try {
    if (!record || record.schemaVersion !== 1 || typeof record.assetId !== 'string' ||
        !record.assetId.trim()) throw new Error('Invalid compatibility record schema');
    const qa = record.technicalMediaQA;
    if (!qa || !['passed', 'failed', 'not-tested'].includes(qa.status))
      throw new Error('Missing technical media QA status');
    if (qa.status === 'passed') {
      if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/actions\/runs\/\d+$/.test(qa.evidenceUrl || ''))
        throw new Error('Technical QA must cite a verified GitHub run');
      if (qa.actionFrames !== 450 || qa.restFrames !== 60)
        throw new Error('Technical QA frame counts do not match the prototype manifest');
    }
    if (!Array.isArray(record.platforms) || record.platforms.length !== 2)
      throw new Error('Both primary VTTs require explicit status');
    const platforms = new Set();
    for (const entry of record.platforms) {
      if (!['foundry-vtt', 'roll20'].includes(entry.id) || platforms.has(entry.id) ||
          !vttStatuses.includes(entry.status)) throw new Error('Unknown/duplicate VTT status');
      platforms.add(entry.id);
      const fields = [entry.testedVersion, entry.testedBrowser,
                      entry.testedAt, entry.evidenceUrl];
      if (entry.status === 'not-tested' && fields.some(value => value !== null))
        throw new Error('Untested platform cannot claim test evidence');
      if (entry.status === 'passed' && (
        !entry.testedVersion || !entry.testedBrowser ||
        !/^\d{4}-\d{2}-\d{2}$/.test(entry.testedAt || '') ||
        !/^https:\/\//.test(entry.evidenceUrl || '')))
        throw new Error('VTT pass requires a version, browser, date, and evidence');
    }
    if (typeof record.artRightsVerified !== 'boolean' ||
        typeof record.releaseApproved !== 'boolean' ||
        typeof record.purchaseEnabled !== 'boolean')
      throw new Error('Release gate flags must be booleans');
    const ready = qa.status === 'passed' && record.artRightsVerified &&
      record.platforms.some(item => item.status === 'passed');
    if ((record.releaseApproved || record.purchaseEnabled) && !ready)
      throw new Error('Release or purchase is blocked by incomplete evidence');
    if (record.purchaseEnabled && !record.releaseApproved)
      throw new Error('Checkout requires explicit release approval');
    return true;
  } catch (error) {
    console.error('Gridborn VTT compatibility record rejected', error);
    return false;
  }
}
