"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { textBoard, type Board } from "./nineChaptersJob";
import type { Board3d } from "./nineChaptersBoard3d";

/**
 * The counting board on its stage: drawn in three dimensions by
 * nineChaptersBoard3d (three.js, with Rapier for the rods taken off), or,
 * where WebGL or the libraries are missing, as text, as the repository's
 * web/index.html does. `children` are laid over the stage: the caption and
 * the tally.
 */
export function NineChaptersBoard({ board, widths, actor = null, target = null, instant = false, sweep = 0, label, children }: {
  board: Board | null; widths: number[]; actor?: number | null; target?: number | null; instant?: boolean; sweep?: number; label: string; children?: ReactNode;
}) {
  const host = useRef<HTMLDivElement | null>(null);
  const drawn = useRef<Board3d | null>(null);
  // undefined while the libraries load; null where the board is drawn as text
  const [three, setThree] = useState<Board3d | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    let made: Board3d | null = null;
    import("./nineChaptersBoard3d")
      .then(({ mount }) => host.current ? mount(host.current, { onError: error => console.warn("3D board unavailable:", error) }) : null)
      .catch(() => null)
      .then(board3d => {
        made = board3d;
        if (cancelled) { board3d?.dispose(); return; }
        drawn.current = board3d;
        setThree(board3d);
      });
    return () => { cancelled = true; made?.dispose(); drawn.current = null; };
  }, []);

  useEffect(() => {
    if (three && board) three.show(board, { widths, actor, target, instant });
  }, [three, board, widths, actor, target, instant]);

  useEffect(() => { if (sweep) drawn.current?.clearFloor(); }, [sweep]);

  return <div ref={host} className="nc-stage" role="img" aria-label={label} data-board={three ? "3d" : three === null ? "text" : "loading"}>
    {three === null && board && <pre className="nc-fallback">{textBoard(board)}</pre>}
    {three === undefined && <p className="nc-loading record-voice">SETTING OUT THE BOARD</p>}
    <div className="nc-legend" aria-hidden="true"><i className="nc-key-pos"/>正 positive <i className="nc-key-neg"/>負 negative <i className="nc-key-actor"/>taken <i className="nc-key-target"/>taken from</div>
    {children}
  </div>;
}
