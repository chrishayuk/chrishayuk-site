import test from 'node:test';
import assert from 'node:assert/strict';
import { notebookNotes } from '../lib/publication-index.ts';
import { conclusionFor, notebookConclusions } from '../lib/notebook-conclusions.ts';

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
