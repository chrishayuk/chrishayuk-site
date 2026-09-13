import type { ReactNode } from "react";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";

/** The exhibition leads; its reading map is available after the experiment. */
export function NotebookNavigation({ children }: { children: ReactNode }) {
  return <FieldNotes className="notebook-reading-map" label="Explore this notebook" detail="CONTENTS +">{children}</FieldNotes>;
}
