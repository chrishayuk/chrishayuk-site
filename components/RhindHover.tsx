"use client";

import { NoteHover, type HoverTarget } from "./NoteHover";
import { ask } from "./RhindEditor";

/** rhind's language server, asked about a page in the note, with its answer shown in a card. */
export function RhindHover({ label, page, lines, targets, note }: { label: string; page: string; lines: [number, number]; targets: HoverTarget[]; note?: string }) {
  return <NoteHover label={label} page={page} lines={lines} targets={targets} ask={ask} server="rhind lsp" note={note}/>;
}
