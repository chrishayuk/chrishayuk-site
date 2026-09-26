import { mkdirSync, writeFileSync } from 'node:fs';
import { allRecords, publicationSnapshots } from '../lib/records.ts';
import { notebookFormat } from '../lib/notebook-formats.ts';
import { notebookObjects } from '../lib/notebook-objects.ts';

const notes = allRecords.filter(record => record.kind === 'notebook').map(record => ({ ...record, format: notebookFormat(record.id), objectCount: record.id === 'N-ECOLOGY-RECOVERY' ? 12 : notebookObjects(record).length }));
const frozen = publicationSnapshots.filter((snapshot, index, snapshots) =>
 snapshot.record.kind === 'notebook' && snapshots.findIndex(other => other.record.id === snapshot.record.id) === index
).map(({ record }) => ({ id: record.id, version: record.version, title: record.title }));
mkdirSync('work/notebook-review', { recursive: true });
writeFileSync('work/notebook-review/inventory.json', JSON.stringify({ notes, frozen }, null, 2) + '\n');
console.log(`${notes.length} notebooks; ${frozen.length} preserved editions`);
