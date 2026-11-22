"use client";

import { useEffect, useRef, useState } from "react";
import { autocompletion, type Completion, type CompletionContext, type CompletionResult } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { forceLinting, linter, type Diagnostic } from "@codemirror/lint";
import { EditorState, StateEffect, StateField, type Text } from "@codemirror/state";
import { Decoration, EditorView, hoverTooltip, keymap, type DecorationSet } from "@codemirror/view";

/**
 * An editor for BASIC that understands the language.
 *
 * Colours, problems, hover help and completion all come from the chuk-basic
 * language server (github.com/chrishayuk/chuk-basic-rs, src/lsp), the same
 * one the VS Code extension uses. It is the interpreter's own WebAssembly
 * file, started as a language server in a worker in the page:
 * public/demos/basic/lsp-worker.js and chuk-basic.wasm, copied from that
 * repository's web/ folder.
 *
 * Asked for the BASIC of 1964, it also marks what that BASIC did not have.
 * Until the editor has loaded, and without JavaScript, the program is shown
 * as plain text.
 */

export type BasicDialect = "later" | "dartmouth";

const FILES = "/demos/basic";
// The order of the server's semantic token legend.
const TOKEN_TYPES = ["comment", "string", "number", "variable", "function", "keyword", "operator", "label"];

type Position = { line: number; character: number };
type Range = { start: Position; end: Position };
type LspDiagnostic = { range: Range; severity: number; message: string; source?: string };
type Answer = { diagnostics: LspDiagnostic[]; results: unknown[] };
type Reply = { id: number; error?: string } & Partial<Answer>;

let worker: Worker | null = null;
let nextId = 0;
const waiting = new Map<number, (answer: Answer | null) => void>();

/** Opens `text` in the language server and asks it the given requests. */
function ask(text: string, dialect: BasicDialect, requests: { method: string; params?: object }[]): Promise<Answer | null> {
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
    worker!.postMessage({ id, wasmUrl: new URL(`${FILES}/chuk-basic.wasm`, window.location.href).href, text, dialect, requests });
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
/** Ask for the problems again: what counts as one has changed. */
const recheck = StateEffect.define<null>();
const tokens = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(value, transaction) {
    for (const effect of transaction.effects) if (effect.is(setTokens)) return effect.value;
    return value.map(transaction.changes);
  },
  provide: field => EditorView.decorations.from(field),
});
const marks = TOKEN_TYPES.map(type => Decoration.mark({ class: `basic-token-${type}` }));

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

/** The server's small Markdown: paragraphs, emphasis, code and code blocks. */
function render(markdown: string) {
  const element = (tag: string, text?: string) => { const made = document.createElement(tag); if (text !== undefined) made.textContent = text; return made; };
  const box = element("div");
  box.className = "basic-hover";
  // a code block may be followed directly by its explanation
  for (const block of markdown.replace(/```\n(?!\n)/g, "```\n\n").split(/\n{2,}/)) {
    const fence = /^```\w*\n([\s\S]*?)\n?```$/.exec(block.trim());
    if (fence) { box.appendChild(element("pre", fence[1])); continue; }
    const paragraph = element("p");
    const fill = (parent: HTMLElement, text: string) => {
      for (const piece of text.split(/(\*[^*]+\*|`[^`]+`)/)) {
        if (piece.length > 2 && piece.startsWith("*")) fill(parent.appendChild(element("em")), piece.slice(1, -1));
        else if (piece.length > 2 && piece.startsWith("`")) parent.appendChild(element("code", piece.slice(1, -1)));
        else if (piece) parent.appendChild(document.createTextNode(piece));
      }
    };
    fill(paragraph, block);
    box.appendChild(paragraph);
  }
  return box;
}

type LspCompletion = { label: string; kind?: number; detail?: string; documentation?: string };

export function BasicEditor({ value, onChange, onRun, label, dialect = "later", className = "", style }: {
  value: string; onChange: (value: string) => void; onRun: () => void; label: string;
  /** "dartmouth" also marks what the BASIC of 1964 did not have. */
  dialect?: BasicDialect; className?: string; style?: React.CSSProperties;
}) {
  const host = useRef<HTMLDivElement | null>(null);
  const view = useRef<EditorView | null>(null);
  const latest = useRef({ onChange, onRun, dialect });
  // kept current for the editor's callbacks, which are made once
  useEffect(() => { latest.current = { onChange, onRun, dialect }; });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!host.current) return;

    /** Problems, and the colours that arrive with them. */
    const problems = linter(async editor => {
      const doc = editor.state.doc;
      const answer = await ask(doc.toString(), latest.current.dialect, [{ method: "textDocument/semanticTokens/full" }]);
      if (!answer || editor.state.doc !== doc) return [];
      const data = (answer.results[0] as { data?: number[] } | null)?.data || [];
      editor.dispatch({ effects: setTokens.of(decorate(doc, data)) });
      return answer.diagnostics.map((problem): Diagnostic => {
        const from = offsetOf(doc, problem.range.start);
        return { from, to: Math.max(offsetOf(doc, problem.range.end), from), severity: severities[problem.severity] || "info", message: problem.message, source: problem.source === "1964" ? "1964 BASIC" : "BASIC" };
      });
    }, { delay: 120, needsRefresh: update => update.transactions.some(transaction => transaction.effects.some(effect => effect.is(recheck))) });

    const hover = hoverTooltip(async (editor, offset) => {
      const doc = editor.state.doc;
      const answer = await ask(doc.toString(), latest.current.dialect, [{ method: "textDocument/hover", params: { position: positionOf(doc, offset) } }]);
      const found = answer?.results[0] as { contents: { value: string }; range: Range } | null | undefined;
      if (!found || editor.state.doc !== doc) return null;
      return { pos: offsetOf(doc, found.range.start), end: offsetOf(doc, found.range.end), above: true, create: () => ({ dom: render(found.contents.value) }) };
    }, { hoverTime: 200 });

    /** Line numbers after a jump; otherwise the words that begin as typed. */
    const complete = async (context: CompletionContext): Promise<CompletionResult | null> => {
      const line = context.state.doc.lineAt(context.pos);
      const before = line.text.slice(0, context.pos - line.from);
      const word = /[A-Za-z][A-Za-z0-9]*\$?$/.exec(before);
      const target = /\b(?:GOTO|GOSUB|THEN|ELSE|GO\s*TO|RESTORE)\s+(?:\d+\s*,\s*)*(\d*)$/i.exec(before);
      if (!context.explicit && !word && !target) return null;
      const doc = context.state.doc;
      const answer = await ask(doc.toString(), latest.current.dialect, [{ method: "textDocument/completion", params: { position: positionOf(doc, context.pos) } }]);
      const items = (answer?.results[0] as LspCompletion[] | null | undefined) || [];
      if (!items.length) return null;
      const typed = target ? target[1].length : word ? word[0].length : 0;
      return {
        from: context.pos - typed,
        options: items.map((item, order): Completion => ({
          label: item.label,
          detail: item.detail,
          info: item.documentation || undefined,
          type: item.kind === 3 ? "function" : item.kind === 6 ? "variable" : item.kind === 18 ? "constant" : "keyword",
          // keep the program's own order for line numbers
          boost: item.kind === 18 ? -order : 0,
        })),
      };
    };

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

  // Switching between 1964 and later BASIC changes what counts as a problem.
  useEffect(() => {
    const editor = view.current;
    if (!editor) return;
    editor.dispatch({ effects: recheck.of(null) });
    forceLinting(editor);
  }, [dialect]);

  return <div ref={host} className={`basic-editor ${className}`} style={style} data-basic-editor data-basic-dialect={dialect}>{!ready && <pre aria-label={label}>{value}</pre>}</div>;
}
