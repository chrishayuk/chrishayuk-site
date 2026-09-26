import { notebookFormats, type NotebookFormat } from '../vendor/hause/notebook-formats.ts';
export { notebookFormats };

/** Dominant reading activity, independent of collection and publication status.
 * These are editorial choices, not inferred scientific results. */
const formats: Record<string, NotebookFormat> = {
 'N-EXHIBITION': 'lookbook',
 'N-MACHINE-PEER': 'thematic', 'N-ATTRIBUTION': 'thematic',
 'N-MAP': 'thematic', 'N-STATE': 'thematic', 'N-ADDRESS': 'thematic',
 'N-CONTEXT': 'experimental', 'N-OPERATOR': 'experimental',
 'N-ECOLOGY-RECOVERY': 'lab', 'N-ECOLOGY-WORLD-REMEMBERS': 'lab',
 'N-ECOLOGY-INHERITANCE': 'lab', 'N-ECOLOGY-BOARD': 'lab',
 'N-ECOLOGY-TRANSMISSION': 'lab', 'N-ECOLOGY-MEMORY': 'lab',
 'N-MACHINE-RECOGNITION': 'lab', 'N-MACHINE-DISCOVERY': 'lab',
 'N-MACHINE-CAPABILITY': 'lab', 'N-MACHINE-MOTIVATION': 'lab',
 'N-MACHINE-TASK': 'lab', 'N-MACHINE-SELF-READ': 'lab',
 'N-MACHINE-PERMISSION': 'lab', 'N-MACHINE-VISIT': 'lab',
 'N-CELL80-01': 'lab', 'N-CELL80-02': 'lab', 'N-CELL80-03': 'lab',
 'N-CELL80-BOUND': 'lab', 'N-CELL80-BARRIER': 'lab', 'N-CELL80-HISTORY': 'lab',
 'N-ADDRESS-BUILD': 'lab', 'N-AUTHORITY': 'lab',
};
export function notebookFormat(id: string): NotebookFormat { return formats[id] || 'thematic'; }
