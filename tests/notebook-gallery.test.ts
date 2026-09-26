import test from 'node:test';
import assert from 'node:assert/strict';
import { notebookGallery, notebookCollectionHref } from '../lib/notebook-gallery.ts';
import { notebookCollections, notebookNotes } from '../lib/publication-index.ts';
import { notebookAppearance } from '../lib/notebook-appearance.ts';

test('the default exhibition includes every notebook exactly once', () => {
 const gallery = notebookGallery();
 const ids = gallery.collections.flatMap(item => item.notes.map(note => note.id));
 assert.equal(ids.length, new Set(ids).size);
 assert.deepEqual([...ids].sort(), notebookNotes.map(note => note.id).sort());
 assert.equal(gallery.count, ids.length);
});

test('collection and edition filters intersect without reordering or mutating the catalogue', () => {
 const before = JSON.stringify(notebookCollections);
 for (const collection of notebookCollections) {
  for (const publication of ['published', 'draft']) {
   const expected = collection.notes.filter(note => note.publication === publication);
   const result = notebookGallery({ collection: collection.id, publication });
   assert.deepEqual(result.collections.flatMap(item => item.notes), expected);
   assert.equal(result.count, expected.length);
   assert.ok(result.collections.every(item => item.id === collection.id && item.notes.length > 0));
  }
 }
 assert.equal(JSON.stringify(notebookCollections), before);
});

test('invalid filters fall back independently and clearing restores the full selection', () => {
 assert.deepEqual(notebookGallery({ collection: 'unknown', publication: 'nonsense' }), notebookGallery());
 assert.deepEqual(notebookGallery({ collection: 'unknown', publication: 'published' }), notebookGallery({ publication: 'published' }));
 const drafts = notebookGallery({ publication: 'draft' });
 const published = notebookGallery({ publication: 'published' });
 assert.equal(drafts.count + published.count, notebookGallery().count);
});

test('title and description search intersects the filters and handles empty matches', () => {
 const result = notebookGallery({ q: '  SUBJECT experiment  ', collection: 'machines', publication: 'draft' });
 assert.deepEqual(result.collections.flatMap(item => item.notes.map(note => note.id)), ['N-MACHINE-SELF-READ']);
 assert.equal(result.q, 'SUBJECT experiment');
 assert.equal(notebookGallery({ q: 'SUBJECT experiment', publication: 'published' }).count, 0);
 assert.equal(notebookGallery({ q: 'no-matching-notebook-98765' }).count, 0);
 assert.deepEqual(notebookGallery({ q: '   ' }), notebookGallery());
 assert.equal(notebookGallery({ q: 'a'.repeat(200) }).q.length, 160);
});

test('every notebook retains its collection paper when a filter moves it to the lead position', () => {
 for (const collection of notebookCollections) {
  for (const note of collection.notes) {
   const appearance = notebookAppearance(note.id);
   assert.equal(appearance['data-notebook-palette'], collection.id);
   const filtered = notebookGallery({ collection: collection.id, q: note.title });
   const sameNote = filtered.collections.flatMap(item => item.notes).find(item => item.id === note.id)!;
   assert.ok(sameNote);
   assert.deepEqual(notebookAppearance(sameNote.id), appearance);
  }
 }
 assert.deepEqual(notebookAppearance('N-MACHINE-SELF-READ'), { 'data-notebook-format': 'lab', 'data-notebook-palette': 'machines', 'data-notebook-tone': 'full' });
 assert.deepEqual(notebookAppearance('N-ECOLOGY-RECOVERY'), { 'data-notebook-format': 'lab', 'data-notebook-palette': 'agent-ecology', 'data-notebook-tone': 'light' });
 assert.deepEqual(notebookAppearance('N-FUTURE'), { 'data-notebook-format': 'thematic', 'data-notebook-palette': 'working-notes', 'data-notebook-tone': 'light' });
});

test('opening a collection preserves matching filters in an encoded shareable URL', () => {
 const href = notebookCollectionHref('machines', { publication: 'draft', q: 'subject & experiment' });
 const url = new URL(href, 'https://chrishayuk.com');
 assert.equal(url.pathname, '/notebook');
 assert.equal(url.searchParams.get('collection'), 'machines');
 assert.equal(url.searchParams.get('publication'), 'draft');
 assert.equal(url.searchParams.get('q'), 'subject & experiment');
 assert.equal(notebookCollectionHref('machines', { publication: 'all', q: '  ' }), '/notebook?collection=machines');
 assert.equal(notebookCollectionHref('machines', { publication: 'invalid' }), '/notebook?collection=machines');
});
