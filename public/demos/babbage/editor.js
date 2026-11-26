// Turns the page box into an editor that understands the notation of the
// sheets: colours, problems as you type, hover help and completion, from
// the language server in lsp-worker.js.
//
// The editor itself is CodeMirror, loaded from a CDN because this page has
// no build step. If that cannot be loaded (no network, say), upgrade()
// resolves to null and the plain text box carries on working.
//
// Colours come from the server's semantic tokens, whose names are read from
// the legend it gives when it starts. Where the server gives none, a small
// reader here colours the page by itself (see `localTokens`), and `babbage
// --check`, run by the page, still finds the problems.

const CDN = "https://esm.sh/";
const PIN = "?deps=@codemirror/state@6.7.6,@codemirror/view@6.43.15";

let worker = null;
let nextId = 0;
const waiting = new Map();
/** The server's token type names, once known. */
let legend = null;

/** Opens `text` in the language server and asks it the given requests. */
function ask(text, requests) {
  if (!worker) {
    worker = new Worker(new URL("lsp-worker.js", import.meta.url), { type: "module" });
    worker.onmessage = ({ data }) => {
      waiting.get(data.id)?.(data.error ? null : data);
      waiting.delete(data.id);
    };
    worker.onerror = () => {
      for (const resolve of waiting.values()) resolve(null);
      waiting.clear();
    };
  }
  const id = ++nextId;
  return new Promise((resolve) => {
    waiting.set(id, resolve);
    worker.postMessage({ id, wasmUrl: new URL("babbage.wasm", import.meta.url).href, text, requests });
  });
}

const offsetOf = (doc, position) => {
  const line = doc.line(Math.min(position.line + 1, doc.lines));
  return Math.min(line.from + position.character, line.to);
};
const positionOf = (doc, offset) => {
  const line = doc.lineAt(offset);
  return { line: line.number - 1, character: offset - line.from };
};

/**
 * The page coloured without the server: [from, to, kind] for each piece.
 * Kinds are those of the server's legend.
 */
export function localTokens(text) {
  const out = [];
  const re = /(^[ \t]*%[^\n]*|(?<= )%[^\n]*)|(^[ \t]*(?:Sheet|No\.)\b)|("[^"\n]*"?)|(^[ \t]*(?:Date|Title|Image|Letters|Unknowns|Equation|Find|Store|Working|Op|In|Turn|Wheels|Let|Gives|Cards|Carried|Group|Total|Running|Deck|Letter|Back|Result|Time|Moves|Backing|Composition|States|Remark|Unrun)\b)|((?:v|Car)\d+['′″‴]*)|([×÷+−\-|*=·\/]|\bC(?!ar\d)\.?(?=[a-zA-Z(Δ]))|(\d+)|([a-z]['′]*)/gm;
  for (const m of text.matchAll(re)) {
    const kind = m[1] ? "comment" : m[2] ? "macro" : m[3] ? "string" : m[4] ? "keyword" : m[5] ? "variable" : m[6] ? "operator" : m[7] ? "number" : "parameter";
    const from = m.index + ((m[2] || m[4]) ? m[0].length - m[0].trimStart().length : 0);
    out.push([from, m.index + m[0].length, kind]);
  }
  return out;
}

/** The server's small Markdown: paragraphs, bold, code and code blocks. */
function render(markdown) {
  const element = (tag, text) => {
    const made = document.createElement(tag);
    if (text !== undefined) made.textContent = text;
    return made;
  };
  const box = element("div");
  box.className = "rh-hover";
  const fill = (parent, text) => {
    for (const piece of text.split(/(\*\*(?:`[^`]+`|[^*`])+\*\*|`[^`]+`)/)) {
      if (piece.startsWith("**") && piece.length > 4) fill(parent.appendChild(element("strong")), piece.slice(2, -2));
      else if (piece.startsWith("`") && piece.length > 2) parent.appendChild(element("code", piece.slice(1, -1)));
      else if (piece) parent.appendChild(document.createTextNode(piece));
    }
  };
  for (const block of markdown.split(/\n{2,}/)) {
    const fence = /^```\w*\n([\s\S]*?)\n?```$/.exec(block.trim());
    if (fence) box.appendChild(element("pre", fence[1]));
    else fill(box.appendChild(element("p")), block);
  }
  return box;
}

/**
 * Replaces a <textarea> with the editor. The textarea stays in the page,
 * hidden, and always holds the current page.
 *
 * @param {HTMLTextAreaElement} textarea
 * @param {{onRun?: () => void, check?: (text: string) => Promise<object[]>}} [options]
 *        onRun is called for Cmd/Ctrl+Enter. check, if given, is asked for
 *        problems when the language server has none to give (it is the
 *        page's `babbage --check`).
 * @returns {Promise<(EditorView & {set(text: string): void, mark(line: number): void}) | null>}
 */
export async function upgrade(textarea, { onRun, check } = {}) {
  let cm;
  try {
    const [state, view, commands, lint, autocomplete] = await Promise.all([
      import(`${CDN}@codemirror/state@6.7.6`),
      import(`${CDN}@codemirror/view@6.43.15${PIN}`),
      import(`${CDN}@codemirror/commands@6.11.1${PIN}`),
      import(`${CDN}@codemirror/lint@6.9.8${PIN}`),
      import(`${CDN}@codemirror/autocomplete@6.20.4${PIN}`),
    ]);
    cm = { ...state, ...view, ...commands, ...lint, ...autocomplete };
  } catch {
    return null;
  }
  const { EditorState, StateEffect, StateField, Decoration, EditorView, hoverTooltip, keymap } = cm;

  const setTokens = StateEffect.define();
  const tokens = StateField.define({
    create: () => Decoration.none,
    update(value, transaction) {
      for (const effect of transaction.effects) if (effect.is(setTokens)) return effect.value;
      return value.map(transaction.changes);
    },
    provide: (field) => EditorView.decorations.from(field),
  });
  const markCache = new Map();
  const markFor = (kind, defining = false) => {
    const key = `${kind}${defining ? "!" : ""}`;
    if (!markCache.has(key)) markCache.set(key, Decoration.mark({ class: `rh-token-${kind}${defining ? " rh-token-definition" : ""}` }));
    return markCache.get(key);
  };

  // The equation the printer was at when an alarm stopped the run.
  const setAlarm = StateEffect.define();
  const alarmLine = StateField.define({
    create: () => Decoration.none,
    update(value, transaction) {
      for (const effect of transaction.effects) if (effect.is(setAlarm)) return effect.value;
      return transaction.docChanged ? Decoration.none : value;
    },
    provide: (field) => EditorView.decorations.from(field),
  });

  // The server's five-numbers-per-token list, as editor decorations.
  const decorate = (doc, data) => {
    const ranges = [];
    let line = 0;
    let character = 0;
    for (let i = 0; i + 4 < data.length; i += 5) {
      line += data[i];
      character = data[i] ? data[i + 1] : character + data[i + 1];
      if (line >= doc.lines) break;
      const from = offsetOf(doc, { line, character });
      const to = Math.min(from + data[i + 2], doc.line(line + 1).to);
      const kind = legend?.[data[i + 3]];
      if (to > from && kind) ranges.push(markFor(kind, (data[i + 4] & 1) === 1).range(from, to));
    }
    return Decoration.set(ranges, true);
  };
  const decorateLocally = (doc) =>
    Decoration.set(localTokens(doc.toString()).filter(([a, b]) => b > a).map(([a, b, kind]) => markFor(kind).range(a, b)), true);

  const severities = ["error", "error", "warning", "info", "hint"];
  const problems = cm.linter(async (editor) => {
    const doc = editor.state.doc;
    const text = doc.toString();
    const answer = await ask(text, [{ method: "textDocument/semanticTokens/full" }]);
    if (editor.state.doc !== doc) return [];
    legend ??= answer?.capabilities?.semanticTokensProvider?.legend?.tokenTypes ?? null;
    const data = answer?.results?.[0]?.data || [];
    editor.dispatch({ effects: setTokens.of(data.length && legend ? decorate(doc, data) : decorateLocally(doc)) });
    let found = (answer?.diagnostics || []).map((problem) => {
      const from = offsetOf(doc, problem.range.start);
      return { from, to: Math.max(offsetOf(doc, problem.range.end), from), severity: severities[problem.severity] || "info", message: problem.message, source: "babbage lsp" };
    });
    // A server that says nothing: ask babbage itself.
    if (!answer?.capabilities?.textDocumentSync && check) {
      const listed = await check(text);
      if (editor.state.doc !== doc) return [];
      found = listed.map((p) => {
        const line = doc.line(Math.min(p.line, doc.lines));
        const from = Math.min(line.from + p.column - 1, line.to);
        // babbage gives where a problem begins: mark from there to the end of
        // the line, short of a note
        const rest = doc.sliceString(from, line.to);
        const len = Math.max(1, rest.replace(/#.*$/, "").trimEnd().length);
        return { from, to: Math.min(from + len, line.to), severity: p.severity === "hint" ? "info" : p.severity, message: p.message, source: "babbage --check" };
      });
    }
    return found;
  }, { delay: 150 });

  const hover = hoverTooltip(async (editor, offset) => {
    const doc = editor.state.doc;
    const answer = await ask(doc.toString(), [{ method: "textDocument/hover", params: { position: positionOf(doc, offset) } }]);
    const found = answer?.results?.[0];
    if (!found || editor.state.doc !== doc) return null;
    const contents = typeof found.contents === "string" ? found.contents : found.contents.value ?? "";
    const range = found.range ?? { start: positionOf(doc, offset), end: positionOf(doc, offset) };
    return { pos: offsetOf(doc, range.start), end: offsetOf(doc, range.end), above: true, create: () => ({ dom: render(contents) }) };
  }, { hoverTime: 200 });

  const kinds = { 3: "function", 6: "variable", 14: "keyword", 15: "text", 18: "constant", 24: "keyword" };
  const complete = async (context) => {
    const word = context.matchBefore(/[A-Za-z^]+/);
    if (!context.explicit && !(word && /[A-Z]/.test(word.text))) return null;
    const doc = context.state.doc;
    // Asked where the word began, so that the server sees what is expected
    // there (an instruction at the start of a statement, say); CodeMirror
    // then filters by what has been typed of the word.
    const at = word ? word.from : context.pos;
    const answer = await ask(doc.toString(), [{ method: "textDocument/completion", params: { position: positionOf(doc, at) } }]);
    const reply = answer?.results?.[0];
    const items = Array.isArray(reply) ? reply : reply?.items || [];
    if (!items.length) return null;
    const edit = items[0].textEdit;
    return {
      from: edit ? offsetOf(doc, (edit.range ?? edit.replace).start) : at,
      filter: !edit,
      options: items.map((item, n) => ({
        label: item.label,
        detail: item.detail,
        info: typeof item.documentation === "string" ? item.documentation : item.documentation?.value || undefined,
        type: kinds[item.kind] || "text",
        boost: -n / items.length,
        apply: item.insertTextFormat === 2 && item.insertText
          ? cm.snippet(item.insertText.replace(/\$0/g, "${}").replace(/\\\$/g, "$"))
          : item.textEdit?.newText || item.insertText || item.label,
      })),
    };
  };

  // The Flexowriter's upper case: Alt with a digit types it as an exponent,
  // Alt with minus the upper-case minus, Alt-8 the raised dot.
  const strike = (text) => (view) => {
    view.dispatch(view.state.replaceSelection(text), { scrollIntoView: true, userEvent: "input.type" });
    return true;
  };
  const supers = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  const characters = [
    ...[...supers].map((s, d) => ({ key: `Alt-${d}`, run: strike(s) })),
    { key: "Alt--", run: strike("⁻") },
    { key: "Alt-.", run: strike("·") },
  ];

  const host = document.createElement("div");
  host.className = "rh-editor";
  host.id = "editor";
  textarea.before(host);
  const editor = new EditorView({
    parent: host,
    state: EditorState.create({
      doc: textarea.value,
      extensions: [
        cm.history(),
        keymap.of([{ key: "Mod-Enter", run: () => { onRun?.(); return true; } }, ...characters, ...cm.defaultKeymap, ...cm.historyKeymap]),
        tokens, alarmLine, problems, hover,
        cm.autocompletion({ override: [complete] }),
        EditorState.tabSize.of(4),
        EditorView.contentAttributes.of({ "aria-label": "The transcription of the sheet", spellcheck: "false", autocapitalize: "off", autocorrect: "off" }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            textarea.value = update.state.doc.toString();
            textarea.dispatchEvent(new Event("input"));
          }
        }),
      ],
    }),
  });
  textarea.hidden = true;
  editor.set = (text) => {
    if (editor.state.doc.toString() !== text) editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: text } });
  };
  /** Marks the source of an equation (a 1-based line number), or clears with 0. */
  editor.mark = (line) => {
    const doc = editor.state.doc;
    if (!line || line > doc.lines) return editor.dispatch({ effects: setAlarm.of(Decoration.none) });
    const l = doc.line(line);
    editor.dispatch({ effects: setAlarm.of(Decoration.set([Decoration.line({ class: "rh-alarm-line" }).range(l.from)])), selection: { anchor: l.from }, scrollIntoView: true });
  };
  return editor;
}
