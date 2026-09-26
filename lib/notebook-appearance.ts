import { notebookFormat } from './notebook-formats.ts';
import { notebookCollections } from './publication-index.ts';

/** The paper belongs to the record, independent of a filtered gallery's layout. */
export function notebookAppearance(id: string) {
 const collection = notebookCollections.find(item => item.notes.some(note => note.id === id));
 const index = collection?.notes.findIndex(note => note.id === id) ?? 0;
 const position = index % 5;
 return {
  'data-notebook-format': notebookFormat(id),
  'data-notebook-palette': collection?.id || 'working-notes',
  'data-notebook-tone': position === 0 ? 'light' : position === 1 || position === 4 ? 'full' : 'medium',
 };
}
