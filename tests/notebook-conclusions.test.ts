import test from 'node:test';
import assert from 'node:assert/strict';
import { notebookNotes } from '../lib/publication-index.ts';
import { conclusionFor, notebookConclusions } from '../lib/notebook-conclusions.ts';
import { notebookObjectSelections, notebookObjects } from '../lib/notebook-objects.ts';
import { notebookFormat } from '../lib/notebook-formats.ts';

test('reviewed conclusions resolve to current notebooks and retain a separate scope statement', () => {
 for (const [id, conclusion] of Object.entries(notebookConclusions)) {
  assert.ok(notebookNotes.some(note => note.id === id), id);
  assert.ok(conclusion.takeaway.trim());
  assert.ok(conclusion.scope.trim());
 }
 for (const note of notebookNotes) {
  const conclusion = conclusionFor(note);
  assert.ok(conclusion.takeaway && conclusion.scope, note.id);
 }
});

test('a future notebook has a conclusion from its own record without needing a bespoke renderer', () => {
 const draft = { ...notebookNotes[0], id: 'N-FUTURE', publication: 'draft' as const, abstract: 'An unanswered question about retention.' };
 assert.equal(conclusionFor(draft).takeaway, draft.abstract);
 assert.match(conclusionFor(draft).scope, /working note/);
 assert.doesNotMatch(conclusionFor({...draft, publication: 'published'}).scope, /working note/);
});

test('every current notebook has reviewed, verbatim object selections or the recorded recovery specimens', () => {
 for (const note of notebookNotes) {
  if (note.id === 'N-ECOLOGY-RECOVERY') continue;
  assert.ok(notebookObjectSelections[note.id], note.id);
  const objects = notebookObjects(note);
  assert.ok(objects.length > 0, note.id);
  assert.equal(new Set(objects.map(o => o.number)).size, objects.length, note.id);
  for (const {act, number} of objects) {
   assert.strictEqual(act, note.body[number - 1], `${note.id} passage ${number}`);
   assert.ok(!['film','photograph'].includes(act.kind), 'Moving images retain their own player on the authored spread');
  }
 }
 for (const id of Object.keys(notebookObjectSelections)) assert.ok(notebookNotes.some(n => n.id === id), id);
});

test('object selections retain the unresolved Cell80 evidence and do not turn propositions into results', () => {
 for (const id of ['N-CELL80-03','N-CELL80-HISTORY']) {
  const text = JSON.stringify(notebookObjects(notebookNotes.find(n => n.id === id)!));
  assert.match(text, /discrepancy/i);
 }
 for (const id of ['N-CONTEXT','N-OPERATOR']) {
  const objects = notebookObjects(notebookNotes.find(n => n.id === id)!);
  assert.equal(notebookFormat(id), 'experimental');
  assert.ok(objects.some(({act}) => act.kind === 'question' && act.status === 'OPEN'));
  assert.ok(objects.every(({act}) => act.kind !== 'evidence'));
 }
 const future = { ...notebookNotes.find(n => n.id === 'N-OPERATOR')!, id: 'N-FUTURE' };
 assert.deepEqual(notebookObjects(future).map(o => o.act), future.body);
});
