"use client";

import { useEffect, useRef, useState } from "react";
import { autocompletion, type Completion, type CompletionContext, type CompletionResult } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { linter, type Diagnostic } from "@codemirror/lint";
import { EditorState, StateEffect, StateField, type Text } from "@codemirror/state";
import { Decoration, EditorView, hoverTooltip, keymap, type DecorationSet } from "@codemirror/view";
import { FILES } from "./georgeJob";

/**
 * An editor for G-programs that understands GEORGE.
 *
 * Colours, problems, hover help and completion all come from the GEORGE
 * language server, the one the repository's VS Code extension uses. It is
 * compiled for WASI and runs in a worker in the page:
 * public/demos/george/lsp-worker.js and george-lsp.wasm, copied from the
 * repository's web/ folder. The server also lists where each symbol is
 * written, which is how a step of a trace finds its symbol in the program.
 *
 * Until the editor has loaded, and without JavaScript, the program is shown
 * as plain text.
 */

// The order of the server's semantic token legend.
const TOKEN_TYPES = ["comment", "number", "variable", "operator", "keyword", "function", "label", "macro"];

export type Position = { line: number; character: number };
export type Range = { start: Position; end: Position };
export type WrittenSymbol = { range: Range; text: string; printed: string; code: string };
type LspDiagnostic = { range: Range; severity: number; message: string };
type Answer = { diagnostics: LspDiagnostic[]; results: unknown[] };
type Reply = { id: number; error?: string } & Partial<Answer>;

let worker: Worker | null = null;
let nextId = 0;
const waiting = new Map<number, (answer: Answer | null) => void>();

/** Opens `text` in the language server and asks it the given requests. */
export function ask(text: string, requests: { method: string; params?: object }[]): Promise<Answer | null> {
  if (!worker) {
    worker = new Worker(`${FILES}/lsp-worker.js`, { type: "module" });
    worker.onmessage = (event: MessageEvent<Reply>) => {
      const { id, error, diagnostics, results } = event.data;
      waiting.get(id)?.(error ? null : { diagnostics: diagnostics || [], results: results || [] });
      waiting.delete(id);
    };
    worker.onerror = () => { for (const resolve of waiting.values()) resolve(null); waiting.clear(); };
  }
  const id = ++nextId;
  return new Promise(resolve => {
    waiting.set(id, resolve);
    worker!.postMessage({ id, wasmUrl: new URL(`${FILES}/george-lsp.wasm`, window.location.href).href, text, requests });
  });
}

/** Every symbol of the program, in order, with where it is written and its code in the coding table. */
export async function symbolsOf(text: string): Promise<WrittenSymbol[]> {
  const answer = await ask(text, [{ method: "george/symbols" }]);
  return (answer?.results[0] as { symbols?: WrittenSymbol[] } | null)?.symbols ?? [];
}

/** What the server says about the symbol at `position`, as its small Markdown. */
export async function hoverAt(text: string, position: Position): Promise<string> {
  const answer = await ask(text, [{ method: "textDocument/hover", params: { position } }]);
  return (answer?.results[0] as { contents?: { value: string } } | null)?.contents?.value ?? "";
}

const offsetOf = (doc: Text, position: Position) => {
  const line = doc.line(Math.min(position.line + 1, doc.lines));
  return Math.min(line.from + position.character, line.to);
};
const positionOf = (doc: Text, offset: number): Position => {
  const line = doc.lineAt(offset);
  return { line: line.number - 1, character: offset - line.from };
};

const setTokens = StateEffect.define<DecorationSet>();
const tokens = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(value, transaction) {
    for (const effect of transaction.effects) if (effect.is(setTokens)) return effect.value;
    return value.map(transaction.changes);
  },
  provide: field => EditorView.decorations.from(field),
});
const marks = TOKEN_TYPES.map(type => Decoration.mark({ class: `george-token-${type}` }));
// Modifier 1 of the legend marks names, (a), which get a class of their own.
const named = TOKEN_TYPES.map(type => Decoration.mark({ class: `george-token-${type} george-token-name` }));

/** The server's five-numbers-per-token list, as editor decorations. */
function decorate(doc: Text, data: number[]): DecorationSet {
  const ranges = [];
  let line = 0, character = 0;
  for (let i = 0; i + 4 < data.length; i += 5) {
    line += data[i];
    character = data[i] ? data[i + 1] : character + data[i + 1];
    if (line >= doc.lines) break;
    const from = offsetOf(doc, { line, character });
    const to = Math.min(from + data[i + 2], doc.line(line + 1).to);
    const mark = (data[i + 4] & 1 ? named : marks)[data[i + 3]];
    if (to > from && mark) ranges.push(mark.range(from, to));
  }
  return Decoration.set(ranges, true);
}

const severities = ["error", "error", "warning", "info", "hint"] as const;

/** Problems, and the colours that arrive with them. */
const problems = linter(async view => {
  const doc = view.state.doc;
  const answer = await ask(doc.toString(), [{ method: "textDocument/semanticTokens/full" }]);
  if (!answer || view.state.doc !== doc) return [];
  const data = (answer.results[0] as { data?: number[] } | null)?.data || [];
  view.dispatch({ effects: setTokens.of(decorate(doc, data)) });
  return answer.diagnostics.map((problem): Diagnostic => {
    const from = offsetOf(doc, problem.range.start);
    return { from, to: Math.max(offsetOf(doc, problem.range.end), from), severity: severities[problem.severity] || "info", message: problem.message, source: "george" };
  });
}, { delay: 120 });

/** The server's small Markdown: paragraphs, bold, code, code blocks, and the manual quoted after ">". */
export function renderHover(markdown: string) {
  const element = (tag: string, text?: string) => { const made = document.createElement(tag); if (text !== undefined) made.textContent = text; return made; };
  const fill = (parent: HTMLElement, text: string) => {
    // Code may hold stars (`**`, `*n`), so it is looked for inside bold too.
    for (const piece of text.split(/(\*\*(?:`[^`]+`|[^*`])+\*\*|`[^`]+`)/)) {
      if (piece.startsWith("**") && piece.length > 4) fill(parent.appendChild(element("strong")), piece.slice(2, -2));
      else if (piece.startsWith("`") && piece.length > 2) parent.appendChild(element("code", piece.slice(1, -1)));
      else if (piece) parent.appendChild(document.createTextNode(piece));
    }
  };
  const box = element("div");
  box.className = "george-hover";
  for (const block of markdown.split(/\n{2,}/)) {
    const fence = /^```\w*\n([\s\S]*?)\n?```$/.exec(block.trim());
    if (fence) box.appendChild(element("pre", fence[1]));
    else if (block.startsWith(">")) {
      const quote = box.appendChild(element("blockquote"));
      for (const para of block.split("\n").map(line => line.replace(/^>\s?/, "")).join("\n").split(/\n\s*\n/)) fill(quote.appendChild(element("p")), para.trim());
    } else fill(box.appendChild(element("p")), block);
  }
  return box;
}

const hover = hoverTooltip(async (view, offset) => {
  const doc = view.state.doc;
  const answer = await ask(doc.toString(), [{ method: "textDocument/hover", params: { position: positionOf(doc, offset) } }]);
  const found = answer?.results[0] as { contents: { value: string }; range: Range } | null | undefined;
  if (!found || view.state.doc !== doc) return null;
  return { pos: offsetOf(doc, found.range.start), end: offsetOf(doc, found.range.end), above: true, create: () => ({ dom: renderHover(found.contents.value) }) };
}, { hoverTime: 200 });

type LspCompletion = { label: string; kind?: number; detail?: string };
const kinds: Record<number, string> = { 6: "variable", 14: "keyword" };

/** The words of the text form and the Greek letters' ASCII names: offered when
 * asked for, or once three letters are typed, since a letter or two is usually
 * a variable. */
async function complete(context: CompletionContext): Promise<CompletionResult | null> {
  const word = context.matchBefore(/[a-z]+/);
  if (!context.explicit && !(word && word.text.length >= 3)) return null;
  const doc = context.state.doc;
  const answer = await ask(doc.toString(), [{ method: "textDocument/completion", params: { position: positionOf(doc, context.pos) } }]);
  const items = (answer?.results[0] as LspCompletion[] | null | undefined) || [];
  if (!items.length) return null;
  return {
    from: word ? word.from : context.pos,
    validFor: /^[a-z]*$/,
    options: items.map((item): Completion => ({ label: item.label, detail: item.detail, type: kinds[item.kind ?? 0] || "text" })),
  };
}

// The symbol a step of the trace obeyed.
const setCurrent = StateEffect.define<DecorationSet>();
const current = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(value, transaction) {
    for (const effect of transaction.effects) if (effect.is(setCurrent)) return effect.value;
    return transaction.docChanged ? Decoration.none : value;
  },
  provide: field => EditorView.decorations.from(field),
});
const currentMark = Decoration.mark({ class: "george-current" });

export function GeorgeEditor({ value, onChange, onRun, label, highlight = null, className = "" }: {
  value: string; onChange: (value: string) => void; onRun: () => void; label: string; highlight?: Range | null; className?: string;
}) {
  const host = useRef<HTMLDivElement | null>(null);
  const view = useRef<EditorView | null>(null);
  const latest = useRef({ onChange, onRun });
  useEffect(() => { latest.current = { onChange, onRun }; });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!host.current) return;
    const editor = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: value,
        extensions: [
          history(),
          keymap.of([{ key: "Mod-Enter", run: () => { latest.current.onRun(); return true; } }, ...defaultKeymap, ...historyKeymap]),
          tokens, current, problems, hover,
          autocompletion({ override: [complete] }),
          EditorState.tabSize.of(4),
          EditorView.contentAttributes.of({ "aria-label": label, spellcheck: "false", autocapitalize: "off", autocorrect: "off" }),
          EditorView.updateListener.of(update => { if (update.docChanged) latest.current.onChange(update.state.doc.toString()); }),
        ],
      }),
    });
    view.current = editor;
    setReady(true);
    return () => { editor.destroy(); view.current = null; };
    // The editor is created once; later values are synchronised below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A new program from outside (an example chosen, or RESET) replaces the text.
  useEffect(() => {
    const editor = view.current;
    if (editor && editor.state.doc.toString() !== value) editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: value } });
  }, [value]);

  // The symbol the trace is on, marked and scrolled into view.
  useEffect(() => {
    const editor = view.current;
    if (!editor) return;
    if (!highlight) { editor.dispatch({ effects: setCurrent.of(Decoration.none) }); return; }
    const doc = editor.state.doc;
    const from = offsetOf(doc, highlight.start);
    const to = Math.min(Math.max(offsetOf(doc, highlight.end), from + 1), doc.length);
    if (to <= from) return;
    editor.dispatch({ effects: [setCurrent.of(Decoration.set([currentMark.range(from, to)])), EditorView.scrollIntoView(from, { y: "nearest" })] });
  }, [highlight, ready]);

  return <div ref={host} className={`george-editor ${className}`} data-george-editor>{!ready && <pre aria-label={label}>{value}</pre>}</div>;
}
