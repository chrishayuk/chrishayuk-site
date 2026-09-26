"use client";

import type { MouseEvent } from "react";
import { canReturnToIndex, type PublicationEntry } from "@/lib/page-transitions";

/** A real link for direct arrivals; history traversal preserves the entry's scroll. */
export function FilmReturn() {
  function returnToHouse(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const entry = (window as Window & { __publicationEntry?: PublicationEntry }).__publicationEntry;
    if (canReturnToIndex({entry, referrer: document.referrer, origin: location.origin, index: "/", path: location.pathname, length: history.length})) {
      event.preventDefault();
      history.back();
    }
  }
  return <a href="/#film" className="film-return" onClick={returnToHouse}>← Back to the house</a>;
}
