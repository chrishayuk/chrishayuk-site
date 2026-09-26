import { mkdirSync, writeFileSync } from 'node:fs';
import { allRecords, publicationSnapshots } from '../lib/records.ts';

const notes = allRecords.filter(record => record.kind === 'notebook');
const frozen = publicationSnapshots.filter((snapshot, index, snapshots) =>
 snapshot.record.kind === 'notebook' && snapshots.findIndex(other => other.record.id === snapshot.record.id) === index
).map(({ record }) => ({ id: record.id, version: record.version, title: record.title }));
mkdirSync('work/notebook-review', { recursive: true });
writeFileSync('work/notebook-review/inventory.json', JSON.stringify({ notes, frozen }, null, 2) + '\n');
console.log(`${notes.length} notebooks; ${frozen.length} preserved editions`);
