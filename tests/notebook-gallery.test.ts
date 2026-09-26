import test from 'node:test';
import assert from 'node:assert/strict';
import { notebookGallery } from '../lib/notebook-gallery.ts';
import { notebookCollections, notebookNotes } from '../lib/publication-index.ts';

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
