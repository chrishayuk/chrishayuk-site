import type { ReactNode } from "react";
import { CitationScope } from "@chrishayuk/hause/components/FieldNotes";

/** Open cited field notes before scrolling to their existing semantic anchor. */
export function NotebookFieldNotes({ children }: {
    children: ReactNode;
}) {
    return <CitationScope className="authority-field-notes">{children}</CitationScope>;
}
