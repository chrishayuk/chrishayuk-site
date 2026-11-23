"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A language server's hover, asked for and shown in the open, so a reader
 * sees what the editor would say without having to find the hover. Shared
 * by the working notes whose programs carry a language server (the Rhind
 * papyrus, the Nine Chapters). The owner passes `ask`, the same function
 * its editor uses to put requests to the server running in the page, and
 * the places to hover; the card shows the server's own answer, and the
 * server's diagnostics on the lines shown, as they come back.
 */

type Position = { line: number; character: number };
type Range = { start: Position; end: Position };
export type HoverAnswer = { diagnostics: { range: Range; severity: number; message: string }[]; results: unknown[] };
export type HoverAsk = (text: string, requests: { method: string; params?: object }[]) => Promise<HoverAnswer | null>;
/** A place to hover: zero-based line and character, and how many characters to mark. */
export type HoverTarget = { label: string; line: number; character: number; length: number };

/** Inline Markdown: **bold**, *italic* and `code`. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*(?:`[^`]+`|[^*`])+\*\*|`[^`]+`|\*[^*\s][^*]*\*)/).map((piece, i) => {
    if (piece.startsWith("**") && piece.length > 4) return <strong key={i}>{inline(piece.slice(2, -2))}</strong>;
    if (piece.startsWith("`") && piece.length > 2) return <code key={i}>{piece.slice(1, -1)}</code>;
    if (piece.startsWith("*") && piece.length > 2) return <em key={i}>{piece.slice(1, -1)}</em>;
    return piece;
  });
}

/** The servers' small Markdown: paragraphs, lists, quotes and code blocks. */
export function HoverMarkdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  const lines = text.split("\n");
  let paragraph: string[] = [];
  let list: string[] = [];
  const flush = () => {
    if (paragraph.length) blocks.push(<p key={blocks.length}>{inline(paragraph.join(" "))}</p>);
    if (list.length) blocks.push(<ul key={blocks.length}>{list.map((item, i) => <li key={i}>{inline(item)}</li>)}</ul>);
    paragraph = []; list = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("```")) {
      flush();
      const code: string[] = [];
      while (++i < lines.length && !lines[i].startsWith("```")) code.push(lines[i]);
      blocks.push(<pre key={blocks.length}>{code.join("\n")}</pre>);
    } else if (/^\s*[-*] /.test(line)) {
      if (paragraph.length) { const kept = list; list = []; flush(); list = kept; }
      list.push(line.replace(/^\s*[-*] /, ""));
    } else if (line.startsWith("> ")) {
      flush();
      blocks.push(<blockquote key={blocks.length}>{inline(line.slice(2))}</blockquote>);
    } else if (!line.trim()) {
      flush();
    } else {
      if (list.length) flush();
      paragraph.push(line);
    }
  }
  flush();
  return <>{blocks}</>;
}

const SEVERITY = ["", "error", "warning", "information", "hint"];

export function NoteHover({ label, page, lines, targets, ask, server, note }: {
  label: string;
  /** The whole page, as the server is given it. */
  page: string;
  /** The zero-based lines of the page to show, first and last. */
  lines: [number, number];
  targets: HoverTarget[];
  ask: HoverAsk;
  /** The server's name, e.g. "rhind lsp". */
  server: string;
  note?: string;
}) {
  const box = useRef<HTMLElement | null>(null);
  const [answer, setAnswer] = useState<HoverAnswer | null>(null);
  const [failed, setFailed] = useState(false);
  const [chosen, setChosen] = useState(0);

  // Ask once the card is near the screen, so the server is loaded only for a reader who gets here.
  useEffect(() => {
    const element = box.current;
    if (!element) return;
    let cancelled = false;
    const go = () => ask(page, targets.map(target => ({ method: "textDocument/hover", params: { position: { line: target.line, character: target.character } } })))
      .then(found => { if (cancelled) return; if (found) setAnswer(found); else setFailed(true); }, () => { if (!cancelled) setFailed(true); });
    if (typeof IntersectionObserver === "undefined") { go(); return () => { cancelled = true; }; }
    const watch = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { watch.disconnect(); go(); }
    }, { rootMargin: "400px 0px" });
    watch.observe(element);
    return () => { cancelled = true; watch.disconnect(); };
  }, [ask, page, targets]);

  const text = page.split("\n");
  const target = targets[chosen];
  const result = answer?.results[chosen] as { contents: string | { value: string } } | null | undefined;
  const hover = result ? (typeof result.contents === "string" ? result.contents : result.contents.value) : "";
  const problems = (answer?.diagnostics || []).filter(d => d.range.start.line === target.line);

  return <figure ref={box} className="nh-card">
    <figcaption className="record-voice">{label}</figcaption>
    <div className="nh-targets" role="group" aria-label="Where to hover">
      {targets.map((t, i) => <button key={i} type="button" aria-pressed={i === chosen} onClick={() => setChosen(i)}>HOVER {t.label}</button>)}
    </div>
    <div className="nh-source" aria-label="The page, around the place hovered">
      {text.slice(lines[0], lines[1] + 1).map((row, k) => {
        const n = lines[0] + k;
        const marked = answer?.diagnostics.find(d => d.range.start.line === n);
        let body: ReactNode = row || " ";
        if (n === target.line) {
          const from = target.character, to = target.character + target.length;
          body = <>{row.slice(0, from)}<mark className="nh-here">{row.slice(from, to)}</mark>{row.slice(to)}</>;
        }
        return <Fragment key={n}><div className={["nh-row", n === target.line ? "nh-row-here" : "", marked ? `nh-row-${SEVERITY[marked.severity] || "hint"}` : ""].filter(Boolean).join(" ")}>
          <span className="nh-no">{n + 1}</span><span className="nh-text">{body}</span>
        </div></Fragment>;
      })}
    </div>
    <div className="nh-answer" aria-live="polite">
      <p className="nh-answer-label record-voice">{server.toUpperCase()} / textDocument/hover AT LINE {target.line + 1}, CHARACTER {target.character + 1}</p>
      {failed ? <p className="nh-wait">The language server could not be loaded here. Open the playground to try it.</p>
        : !answer ? <p className="nh-wait">Asking the language server, running in this page…</p>
        : hover ? <div className="nh-hover"><HoverMarkdown text={hover.trim()}/></div>
        : <p className="nh-wait">The server has nothing to say here.</p>}
      {problems.map((d, i) => <p key={i} className={`nh-problem nh-problem-${SEVERITY[d.severity] || "hint"}`}>
        <span className="record-voice">{(SEVERITY[d.severity] || "hint").toUpperCase()} ON THIS LINE, AS THE EDITOR UNDERLINES IT</span>{d.message}
      </p>)}
    </div>
    {note && <p className="nh-note">{note}</p>}
  </figure>;
}
