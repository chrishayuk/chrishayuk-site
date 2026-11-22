"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A JOSS console as it looked in 1964: paper on a platen, the user in green
 * and JOSS in black, ten characters a second, a red light while JOSS has the
 * typewriter and a gong when it hands it back.
 *
 * The typewriter is public/demos/joss/typewriter.js, copied from the joss
 * repository's web/ folder with session.js, worker.js, wasi.js and joss.wasm
 * beside it. It has no framework; this component loads it and gives it an
 * element. Rebuild it there and copy it across, rather than editing it here.
 */

type Console = { play: (lines: string[], options?: { initials?: string }) => Promise<void>; fresh: () => Promise<void>; setYear: (year: string) => Promise<void>; destroy: () => void };
type Module = { mountTypewriter: (host: HTMLElement, options: object) => Console };

const MODULE = "/demos/joss/typewriter.js";

export function JossTypewriter({ year = "1965", lines, signOn = true, compact = false, label, autoplay = false, onReady, speed }: {
  year?: "1964" | "1965";
  /** Lines to type in, one by one, when asked (or at once, with autoplay). */
  lines?: string[];
  signOn?: boolean;
  compact?: boolean;
  label?: string;
  autoplay?: boolean;
  onReady?: (console: Console) => void;
  /** "1964" (ten characters a second), "fast" or "instant". Default: `?speed=` in the address, or "1964". */
  speed?: string;
}) {
  const host = useRef<HTMLDivElement | null>(null);
  const latest = useRef({ lines, onReady });
  useEffect(() => { latest.current = { lines, onReady }; }, [lines, onReady]);

  useEffect(() => {
    let console: Console | null = null;
    let gone = false;
    // A full address, worked out in the browser, so that no bundler takes it
    // for one of its own modules: the file is served as it is.
    const address = new URL(MODULE, window.location.origin).href;
    import(/* webpackIgnore: true */ /* @vite-ignore */ address).then((module: Module) => {
      if (gone || !host.current) return;
      const pace = speed ?? new URLSearchParams(window.location.search).get("speed") ?? "1964";
      console = module.mountTypewriter(host.current, { year, signOn, compact, label, initials: "YOU", speed: pace });
      latest.current.onReady?.(console);
      if (autoplay && latest.current.lines) void console.play(latest.current.lines);
    }).catch(() => {
      if (host.current) host.current.textContent = "The typewriter could not be loaded.";
    });
    return () => { gone = true; console?.destroy(); };
  }, [year, signOn, compact, label, autoplay, speed]);

  return <div ref={host} className="joss-typewriter" data-joss-typewriter/>;
}

/**
 * A typewriter to sit at, with a few lines beside it to try: typed in for the
 * reader at the press of a button, or typed by the reader. For the opening of
 * the note, so that a first visit sees JOSS do something.
 */
export function JossTry({ lines, label, note }: { lines: string[]; label: string; note?: React.ReactNode }) {
  const [desk, setDesk] = useState<Console | null>(null);
  const [busy, setBusy] = useState(false);
  const type = async () => {
    if (!desk || busy) return;
    setBusy(true);
    try { await desk.play(lines); } finally { setBusy(false); }
  };
  return <figure className="joss-runner joss-try">
    <figcaption className="record-voice">{label}</figcaption>
    <JossTypewriter compact onReady={setDesk} label="A JOSS console"/>
    <div className="joss-try-lines">
      <pre aria-label="Lines to try">{lines.join("\n")}</pre>
      <div className="joss-runner-bar">
        <button type="button" onClick={type} disabled={!desk || busy}>{busy ? "TYPING…" : "TYPE THESE IN FOR ME"}</button>
        <span className="joss-runner-idle">Or click the paper and type them yourself.</span>
      </div>
    </div>
    {note && <p className="joss-runner-note">{note}</p>}
  </figure>;
}
