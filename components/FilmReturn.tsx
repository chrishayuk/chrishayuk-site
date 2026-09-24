"use client";

import type { MouseEvent } from "react";

/** A real link for direct arrivals; history traversal preserves the entry's scroll. */
export function FilmReturn() {
  function returnToHouse(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    try {
      const from = new URL(document.referrer);
      if (from.origin === location.origin && from.pathname === "/" && history.length > 1) {
        event.preventDefault();
        history.back();
      }
    } catch { /* Direct arrivals use the anchor. */ }
  }
  return <a href="/#film" className="film-return" onClick={returnToHouse}>← Back to the house</a>;
}
