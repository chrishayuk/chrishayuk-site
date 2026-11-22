"use client";

import { useEffect, useRef, useState } from "react";
import { autocompletion, snippet, type Completion, type CompletionContext, type CompletionResult } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { linter, type Diagnostic } from "@codemirror/lint";
import { EditorState, StateEffect, StateField, type Text } from "@codemirror/state";
import { Decoration, EditorView, hoverTooltip, keymap, type DecorationSet } from "@codemirror/view";

/**
 * An editor for Mouse that understands the language.
 *
 * Colours, problems, hover help and completion all come from the Mouse
 * language server (github.com/chrishayuk/mouse-interpreter, lsp/), the same
 * one the VS Code extension uses. It is compiled for WASI and runs in a
 * worker in the page: public/demos/mouse/lsp-worker.js and mouse-lsp.wasm,
 * copied from that repository's web/ folder.
 *
 * Until the editor has loaded, and without JavaScript, the program is shown
 * as plain text.
 */

const FILES = "/demos/mouse";
// The order of the server's semantic token legend.
const TOKEN_TYPES = ["comment", "string", "number", "variable", "function", "parameter", "operator", "keyword"];

type Position = { line: number; character: number };
type Range = { start: Position; end: Position };
type LspDiagnostic = { range: Range; severity: number; message: string };
type Answer = { diagnostics: LspDiagnostic[]; results: unknown[] };
type Reply = { id: number; error?: string } & Partial<Answer>;

let worker: Worker | null = null;
let nextId = 0;
const waiting = new Map<number, (answer: Answer | null) => void>();

/** Opens `text` in the language server and asks it the given requests. */
function ask(text: string, requests: { method: string; params?: object }[]): Promise<Answer | null> {
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
    worker!.postMessage({ id, wasmUrl: new URL(`${FILES}/mouse-lsp.wasm`, window.location.href).href, text, requests });
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
const marks = TOKEN_TYPES.map(type => Decoration.mark({ class: `mouse-token-${type}` }));

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
    if (to > from && marks[data[i + 3]]) ranges.push(marks[data[i + 3]].range(from, to));
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
    return { from, to: Math.max(offsetOf(doc, problem.range.end), from), severity: severities[problem.severity] || "info", message: problem.message, source: "mouse" };
  });
}, { delay: 120 });

/** The server's small Markdown: paragraphs, bold, code and code blocks. */
function render(markdown: string) {
  const element = (tag: string, text?: string) => { const made = document.createElement(tag); if (text !== undefined) made.textContent = text; return made; };
  const box = element("div");
  box.className = "mouse-hover";
  for (const block of markdown.split(/\n{2,}/)) {
    const fence = /^```\w*\n([\s\S]*?)\n?```$/.exec(block.trim());
    if (fence) { box.appendChild(element("pre", fence[1])); continue; }
    const paragraph = element("p");
    const fill = (parent: HTMLElement, text: string) => {
      for (const piece of text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)) {
        if (piece.startsWith("**")) fill(parent.appendChild(element("strong")), piece.slice(2, -2));
        else if (piece.startsWith("`")) parent.appendChild(element("code", piece.slice(1, -1)));
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
  const found = answer?.results[0] as { contents: { value: string }; range: Range } | null | undefined;
  if (!found || view.state.doc !== doc) return null;
  return { pos: offsetOf(doc, found.range.start), end: offsetOf(doc, found.range.end), above: true, create: () => ({ dom: render(found.contents.value) }) };
}, { hoverTime: 200 });

type LspCompletion = { label: string; kind?: number; detail?: string; documentation?: string; insertText?: string; insertTextFormat?: number };

/** Macros after `#`, parameters after `%`, and templates when asked. */
async function complete(context: CompletionContext): Promise<CompletionResult | null> {
  const before = context.state.sliceDoc(Math.max(0, context.pos - 1), context.pos);
  if (!context.explicit && before !== "#" && before !== "%") return null;
  const doc = context.state.doc;
  const answer = await ask(doc.toString(), [{ method: "textDocument/completion", params: { position: positionOf(doc, context.pos) } }]);
  const items = (answer?.results[0] as LspCompletion[] | null | undefined) || [];
  if (!items.length) return null;
  return {
    from: context.pos,
    options: items.map((item): Completion => ({
      label: item.label,
      detail: item.detail,
      info: item.documentation || undefined,
      type: item.kind === 3 ? "function" : item.kind === 6 ? "variable" : "keyword",
      // The server writes snippets the way editors expect; CodeMirror's form differs slightly.
      apply: item.insertTextFormat === 2 && item.insertText
        ? snippet(item.insertText.replace(/\$0/g, "${}").replace(/\\\$/g, "$"))
        : item.insertText || item.label,
    })),
  };
}

export function MouseEditor({ value, onChange, onRun, label, className = "" }: {
  value: string; onChange: (value: string) => void; onRun: () => void; label: string; className?: string;
}) {
  const host = useRef<HTMLDivElement | null>(null);
  const view = useRef<EditorView | null>(null);
  const latest = useRef({ onChange, onRun });
  latest.current = { onChange, onRun };
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
          EditorState.tabSize.of(2),
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

  // A new program from outside (an example chosen, or RESET) replaces the text.
  useEffect(() => {
    const editor = view.current;
    if (editor && editor.state.doc.toString() !== value) {
      editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: value } });
    }
  }, [value]);

  return <div ref={host} className={`mouse-editor ${className}`} data-mouse-editor>{!ready && <pre aria-label={label}>{value}</pre>}</div>;
}
