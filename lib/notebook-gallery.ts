import { notebookCollections } from './publication-index.ts';

export function notebookGallery(query: { collection?: string; publication?: string } = {}) {
 const collection = notebookCollections.find(item => item.id === query.collection)?.id || 'all';
 const publication = query.publication === 'published' || query.publication === 'draft' ? query.publication : 'all';
 const collections = notebookCollections
  .filter(item => collection === 'all' || item.id === collection)
  .map(item => ({ ...item, notes: item.notes.filter(note => publication === 'all' || note.publication === publication) }))
  .filter(item => item.notes.length);
 return { collection, publication, collections, count: collections.reduce((total, item) => total + item.notes.length, 0) };
}
