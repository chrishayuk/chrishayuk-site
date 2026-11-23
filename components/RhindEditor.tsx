"use client";

import { useEffect, useRef, useState } from "react";
import { autocompletion, snippet, type Completion, type CompletionContext, type CompletionResult } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { linter, type Diagnostic } from "@codemirror/lint";
import { EditorState, StateEffect, StateField, type Text } from "@codemirror/state";
import { Decoration, EditorView, hoverTooltip, keymap, type DecorationSet } from "@codemirror/view";
import { FILES } from "./rhindJob";

/**
 * An editor for a page of the Rhind papyrus in rhind's notation.
 *
 * Colours, problems, hover help and completion all come from rhind's
 * language server (`rhind lsp`), the same one the VS Code extension uses. It
 * is the same rhind.wasm as the checker, run in a worker in the page by
 * public/demos/rhind-papyrus/lsp-worker.js, copied from that repository's
 * web/ folder.
 *
 * Until the editor has loaded, and without JavaScript, the page is shown as
 * plain text.
 */

// The order of the server's semantic token legend: comment, the scribe's
// quoted words, statements, figures, the tick, a heading, red ink, and
// restored or lost text.
const TOKEN_TYPES = ["comment", "string", "keyword", "number", "operator", "namespace", "macro", "parameter"];

type Position = { line: number; character: number };
type Range = { start: Position; end: Position };
type LspDiagnostic = { range: Range; severity: number; message: string };
type Answer = { diagnostics: LspDiagnostic[]; results: unknown[] };
type Reply = { id: number; error?: string } & Partial<Answer>;

let worker: Worker | null = null;
let nextId = 0;
const waiting = new Map<number, (answer: Answer | null) => void>();

/** Opens `text` in the language server and asks it the given requests. The
 * hover card in the note (RhindHover) asks through it too. */
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
    worker!.postMessage({ id, wasmUrl: new URL(`${FILES}/rhind.wasm`, window.location.href).href, text, requests });
  });
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
const marks = TOKEN_TYPES.map(type => Decoration.mark({ class: `rh-token-${type}` }));
// Modifier 1 of the legend (declaration) marks where a thing is defined.
const defining = TOKEN_TYPES.map(type => Decoration.mark({ class: `rh-token-${type} rh-token-definition` }));

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
    const mark = (data[i + 4] & 1 ? defining : marks)[data[i + 3]];
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
    return { from, to: Math.max(offsetOf(doc, problem.range.end), from), severity: severities[problem.severity] || "info", message: problem.message, source: "rhind" };
  });
}, { delay: 150 });

/** The server's small Markdown: paragraphs, bold, code and code blocks. */
function render(markdown: string) {
  const element = (tag: string, text?: string) => { const made = document.createElement(tag); if (text !== undefined) made.textContent = text; return made; };
  const box = element("div");
  box.className = "rh-hover";
  for (const block of markdown.split(/\n{2,}/)) {
    const fence = /^```\w*\n([\s\S]*?)\n?```$/.exec(block.trim());
    if (fence) { box.appendChild(element("pre", fence[1])); continue; }
    const paragraph = element("p");
    const fill = (parent: HTMLElement, text: string) => {
      for (const piece of text.split(/(\*\*(?:`[^`]+`|[^*`])+\*\*|`[^`]+`)/)) {
        if (piece.startsWith("**") && piece.length > 4) fill(parent.appendChild(element("strong")), piece.slice(2, -2));
        else if (piece.startsWith("`") && piece.length > 2) parent.appendChild(element("code", piece.slice(1, -1)));
        else if (piece) parent.appendChild(document.createTextNode(piece));
      }
    };
    fill(paragraph, block);
    box.appendChild(paragraph);
  }
  return box;
}

const hover = hoverTooltip(async (view, offset) => {
  const doc = view.state.doc;
  const answer = await ask(doc.toString(), [{ method: "textDocument/hover", params: { position: positionOf(doc, offset) } }]);
  const found = answer?.results[0] as { contents: string | { value: string }; range?: Range } | null | undefined;
  if (!found || view.state.doc !== doc) return null;
  const text = typeof found.contents === "string" ? found.contents : found.contents.value;
  const pos = found.range ? offsetOf(doc, found.range.start) : offset;
  return { pos, end: found.range ? offsetOf(doc, found.range.end) : offset, above: true, create: () => ({ dom: render(text) }) };
}, { hoverTime: 200 });

type LspCompletion = { label: string; kind?: number; detail?: string; documentation?: string | { value: string }; insertText?: string; insertTextFormat?: number; textEdit?: { newText: string; range?: Range; replace?: Range } };

const kinds: Record<number, string> = { 3: "function", 6: "variable", 14: "keyword", 15: "text", 18: "constant", 24: "keyword" };

/** Statements (Multiply, Reckon with, Total ...): offered when asked for, or
 * once a capital is typed. The server is asked at the start of the word. */
async function complete(context: CompletionContext): Promise<CompletionResult | null> {
  const word = context.matchBefore(/[A-Za-z^]+/);
  if (!context.explicit && !(word && /[A-Z]/.test(word.text))) return null;
  const doc = context.state.doc;
  const at = word ? word.from : context.pos;
  const answer = await ask(doc.toString(), [{ method: "textDocument/completion", params: { position: positionOf(doc, at) } }]);
  const reply = answer?.results[0] as LspCompletion[] | { items: LspCompletion[] } | null | undefined;
  const items = (Array.isArray(reply) ? reply : reply?.items) || [];
  if (!items.length) return null;
  const edit = items[0].textEdit;
  const range = edit ? edit.range ?? edit.replace : undefined;
  return {
    from: range ? offsetOf(doc, range.start) : at,
    filter: !edit,
    options: items.map((item, n): Completion => ({
      label: item.label,
      detail: item.detail,
      info: (typeof item.documentation === "string" ? item.documentation : item.documentation?.value) || undefined,
      type: kinds[item.kind ?? 0] || "text",
      // The server lists the likeliest first; keep its order among equal matches.
      boost: -n / items.length,
      // The server writes snippets the way editors expect; CodeMirror's form differs slightly.
      apply: item.insertTextFormat === 2 && item.insertText
        ? snippet(item.insertText.replace(/\$0/g, "${}").replace(/\\\$/g, "$"))
        : item.textEdit?.newText || item.insertText || item.label,
    })),
  };
}

export function RhindEditor({ value, onChange, onRun, label, className = "" }: {
  value: string; onChange: (value: string) => void; onRun: () => void; label: string; className?: string;
}) {
  const host = useRef<HTMLDivElement | null>(null);
  const view = useRef<EditorView | null>(null);
  const latest = useRef({ onChange, onRun });
  useEffect(() => { latest.current = { onChange, onRun }; }, [onChange, onRun]);
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
          tokens, problems, hover,
          autocompletion({ override: [complete] }),
          EditorState.tabSize.of(4),
          EditorView.contentAttributes.of({ "aria-label": label, spellcheck: "false", autocapitalize: "off", autocorrect: "off" }),
          EditorView.updateListener.of(update => { if (update.docChanged) latest.current.onChange(update.state.doc.toString()); }),
        ],
      }),
    });
    setReady(true);
    view.current = editor;
    return () => { editor.destroy(); view.current = null; };
    // The editor is created once; later values are synchronised below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A new page from outside (a page chosen, or RESET) replaces the text.
  useEffect(() => {
    const editor = view.current;
    if (editor && editor.state.doc.toString() !== value) {
      editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: value } });
    }
  }, [value]);

  return <div ref={host} className={`rh-editor ${className}`} data-rhind-editor>{!ready && <pre aria-label={label}>{value}</pre>}</div>;
}
