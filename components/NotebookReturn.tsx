"use client";

import type { MouseEvent } from "react";
import { canReturnToIndex, type PublicationEntry } from "@/lib/page-transitions";

export function NotebookReturn() {
  function returnToContents(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const entry = (window as Window & { __publicationEntry?: PublicationEntry }).__publicationEntry;
    if (canReturnToIndex({entry, referrer: document.referrer, origin: location.origin, index: "/notebook", path: location.pathname, length: history.length})) {
      event.preventDefault();
      history.back();
    }
  }
  return <a href="/notebook" onClick={returnToContents}>← Notebook contents</a>;
}
