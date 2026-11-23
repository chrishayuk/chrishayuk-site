"use client";

import { NoteHover, type HoverTarget } from "./NoteHover";
import { ask } from "./NineChaptersEditor";

/** jiuzhang's language server, asked about a page in the note, with its answer shown in a card. */
export function NineChaptersHover({ label, page, lines, targets, note }: { label: string; page: string; lines: [number, number]; targets: HoverTarget[]; note?: string }) {
  return <NoteHover label={label} page={page} lines={lines} targets={targets} ask={ask} server="jiuzhang lsp" note={note}/>;
}
