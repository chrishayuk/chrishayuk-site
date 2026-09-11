import { getRecord, isListed } from "./records.ts";
import { visualNotebooks } from "./visual-notebooks.ts";
import type { PublicationRecord } from "./types.ts";

/** One editorial selection for Home and Notebook; resolve canonical records so
 * publication snapshots and preview visibility remain authoritative. */
const selection = ["N-MACHINE-VISIT", "N-CELL80-01", "N-CELL80-02", "N-CELL80-03", "N-CELL80-BARRIER", "N-CELL80-HISTORY", "N-EXHIBITION", "N-ATTRIBUTION", "N-ADDRESS-BUILD", ...visualNotebooks.map(record => record.id)];
export const notebookSelection = selection.map(getRecord).filter((record): record is PublicationRecord => Boolean(record && isListed(record)));
/** Home keeps its compact Cell80 entrance; notebook order can change independently. */
export const featuredNotebook = notebookSelection.find(record => record.id === "N-CELL80-01")!;
