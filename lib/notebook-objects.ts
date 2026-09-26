import type { PublicationRecord } from './types';

/** One-based authored passage selections. These are reading plates, never run counts.
 * Instruments and raw datasets retain their existing notebook-specific renderers. */
export const notebookObjectSelections: Record<string, number[]> = {
 'N-MACHINE-RECOGNITION': [3, 8, 10, 13],
 'N-MACHINE-DISCOVERY': [2, 4, 8],
 'N-MACHINE-PEER': [2, 3, 10, 11],
 'N-ECOLOGY-BOARD': [1, 3, 5],
 'N-ECOLOGY-TRANSMISSION': [1, 2, 4, 5],
 'N-ECOLOGY-MEMORY': [1, 3, 4, 6],
 'N-ECOLOGY-INHERITANCE': [2, 3, 6, 10],
 'N-ECOLOGY-WORLD-REMEMBERS': [3, 7, 15, 23, 28],
 'N-MACHINE-CAPABILITY': [2, 6, 8, 12],
 'N-MACHINE-MOTIVATION': [3, 8, 9, 11],
 'N-MACHINE-TASK': [4, 5, 6, 7],
 'N-MACHINE-SELF-READ': [3, 5, 7, 8],
 'N-MACHINE-PERMISSION': [2, 3, 4, 5, 6, 7, 8, 9],
 'N-MACHINE-VISIT': [2, 3, 4, 5],
 'N-CELL80-01': [3, 4, 5, 23, 25],
 'N-CELL80-02': [6, 11, 12, 22, 25],
 'N-CELL80-03': [12, 15, 19, 23, 37, 38],
 'N-CELL80-BARRIER': [2, 3, 4, 7, 8],
 'N-CELL80-HISTORY': [2, 3, 7, 8],
 'N-CELL80-BOUND': [7, 10, 14, 18, 21],
 'N-EXHIBITION': [9, 10, 13, 17],
 'N-ATTRIBUTION': [1, 2, 3, 4],
 'N-ADDRESS-BUILD': [2, 3, 4, 5, 6],
 'N-MAP': [5, 15, 19, 20],
 'N-STATE': [3, 4, 5, 6],
 'N-ADDRESS': [8, 14, 20],
 'N-AUTHORITY': [6, 11, 15, 19, 22, 23],
 'N-CONTEXT': [1, 2, 3],
 'N-OPERATOR': [1, 2],
};

export function notebookObjects(record: PublicationRecord) {
 const selected = notebookObjectSelections[record.id] || record.body
  .map((act, index) => ({ act, number: index + 1 }))
  .filter(({ act }) => ['observation', 'comparison', 'evidence', 'question', 'statement'].includes(act.kind))
  .slice(0, 4).map(({ number }) => number);
 return selected.map(number => {
  const act = record.body[number - 1];
  if (!act) throw new Error(`Missing notebook specimen ${record.id} / passage ${number}`);
  return { number, act };
 });
}
