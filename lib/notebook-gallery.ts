import { notebookCollections } from './publication-index.ts';

export function notebookGallery(query: { collection?: string; publication?: string; q?: string } = {}) {
 const q = (query.q || '').trim().slice(0, 160);
 const terms = q.toLocaleLowerCase('en').split(/\s+/).filter(Boolean);
 const collection = notebookCollections.find(item => item.id === query.collection)?.id || 'all';
 const publication = query.publication === 'published' || query.publication === 'draft' ? query.publication : 'all';
 const collections = notebookCollections
  .filter(item => collection === 'all' || item.id === collection)
  .map(item => ({ ...item, notes: item.notes.filter(note => (publication === 'all' || note.publication === publication) && terms.every(term => `${note.title} ${note.dek}`.toLocaleLowerCase('en').includes(term))) }))
  .filter(item => item.notes.length);
 return { q, collection, publication, collections, count: collections.reduce((total, item) => total + item.notes.length, 0) };
}
