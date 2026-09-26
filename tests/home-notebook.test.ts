import test from 'node:test';
import assert from 'node:assert/strict';
import { selectHomeNotebook } from '../lib/home-notebook.ts';
import { recordGraph, type GraphNode } from '../lib/graph.ts';
import { getRecord } from '../lib/records.ts';

const note = (id: string, published: string, extra: Partial<GraphNode> = {}): GraphNode => ({
 id, recordId: id, title: id, kind: 'notebook', publication: 'published', basis: 'published-record',
 published, url: `https://chrishayuk.com/notebook/${id.toLowerCase()}`, ...extra,
});

test('publishing a new graph entry updates the homepage without changing editorial selections', () => {
 const old = note('N-OLD', '2026-09-10');
 const draft = note('N-NEW', '2026-09-26', { publication: 'draft', basis: 'draft-record' });
 assert.equal(selectHomeNotebook([old, draft], ['N-OLD']).latest?.id, old.id);
 const published = { ...draft, publication: 'published' as const, basis: 'published-record' };
 const selection = selectHomeNotebook([old, published], ['N-OLD']);
 assert.equal(selection.latest?.id, published.id);
 assert.deepEqual(selection.featured.map(node => node.id), ['N-OLD']);
});

test('revision and retrieval dates, drafts and preserved versions cannot displace the latest publication', () => {
 const current = note('N-CURRENT', '2026-09-20');
 const revised = note('N-OLDER', '2026-08-01', { created: '2026-09-29', retrievedAt: '2026-09-30', version: '3.0' });
 const nodes = [current, revised, note('N-DRAFT', '2026-10-01', { publication: 'draft' }),
  note('N-UNDATED', ''), note('N-OLD@2.0', '2026-10-02', { kind: 'publication-version', recordId: 'N-OLD' }),
  note('FILM-NEW', '2026-10-03', { kind: 'film' })];
 assert.equal(selectHomeNotebook(nodes).latest?.id, current.id);
 assert.deepEqual(selectHomeNotebook(nodes).featured.map(node => node.id), ['N-OLDER']);
});

test('features deduplicate, exclude the latest, and fill from published graph entries', () => {
 const nodes = ['A', 'B', 'C', 'D', 'E'].map((id, index) => note(id, `2026-09-${25-index}`));
 const selected = selectHomeNotebook(nodes, ['A', 'D', 'D', 'MISSING']);
 assert.deepEqual(selected.featured.map(node => node.id), ['D', 'B', 'C']);
 assert.deepEqual(selectHomeNotebook([]), { latest: undefined, featured: [] });
 assert.equal(selectHomeNotebook([note('B', '2026-09-26'), note('A', '2026-09-26')]).latest?.id, 'A');
});

test('real homepage choices resolve to listed current manuscripts and true publication dates', () => {
 const graph = recordGraph();
 const { latest, featured } = selectHomeNotebook(graph.nodes);
 assert.ok(latest);
 for (const node of [latest, ...featured]) {
  const record = getRecord(node.id)!;
  assert.equal(record.publication, 'published');
  assert.notEqual(record.visibility, 'unlisted');
  assert.equal(node.published, record.published);
  assert.equal(node.title, record.title);
 }
 assert.ok(graph.nodes.filter(node => node.kind === 'notebook' && node.publication === 'published').every(node => node.published! <= latest.published!));
});
