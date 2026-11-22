/**
 * The IPL computer of github.com/chrishayuk/ipl-v, in the page.
 *
 * public/demos/ipl-v/iplv.wasm and examples.json are copied from that
 * repository's web/ folder: rebuild them there with `node web/build.mjs` and
 * copy them across, rather than editing them here. This file is a typed copy
 * of the wrapper web/iplv.js, for the playground and the note's runners. See
 * src/web.rs in the repository for what each call does.
 */

export const FILES = "/demos/ipl-v";
export const H0 = 24574, H1 = 24575, H2 = 24576, W0 = 24587;
const WORD = 12; // bytes to a cell: P at 0, Q at 1, SYMB at 4, LINK at 8

export type Example = { name: string; title: string; deck: string; input: string; expected?: string };
export type Why = "done" | "halted" | "error" | "breakpoint";
export type Item = { a: number; name: string; text: string };
export type Stack = { depth: number; items: Item[] };
export type State = {
  cycles: number; h3: number; level: number; halted: boolean; error: string | null;
  free: number; low: number; space: number; brk: number; top: number; h5: "+" | "-";
  cia: { a: number; place: string; line: number; p: number; q: number; symb: string; link: string; comment: string };
  calls: { a: number; cell: number; place: string; line: number; native: boolean }[];
  h0: Stack; w: Stack[]; regions: { ch: string; origin: number; size: number }[]; cards: number;
};
export type Cell = { a: number; p: number; q: number; s: number; l: number; name: string; kind: "data" | "empty" | "local" | "regional" | "internal"; data: string };
export type Structure = { root: number; cells: number; lists: { a: number; name: string; end: "0" | "cell" | "more" | "loop" | "data"; cells: Cell[] }[] };

type Exports = {
  memory: WebAssembly.Memory;
  iplv_buf(len: number): number; iplv_result(): number; iplv_load(deck: number, input: number, cells: number): number;
  iplv_advance(n: number, mode: number): number; iplv_state(): number; iplv_lines(): number;
  iplv_structure(root: number, limit: number): number; iplv_describe(a: number): number; iplv_resolve(len: number): number;
  iplv_take(what: number): number; iplv_break(a: number, on: number): void; iplv_trace(mode: number): void;
  iplv_mem(): number; iplv_mem_len(): number;
};

let compiled: Promise<WebAssembly.Module> | null = null;

export class Iplv {
  private encoder = new TextEncoder();
  private decoder = new TextDecoder();
  private constructor(private x: Exports) {}

  /** A new IPL computer. The module is fetched once and shared. */
  static async create(): Promise<Iplv> {
    compiled ??= WebAssembly.compileStreaming(fetch(`${FILES}/iplv.wasm`));
    const instance = await WebAssembly.instantiate(await compiled, {});
    return new Iplv(instance.exports as unknown as Exports);
  }

  private put(...texts: string[]): number[] {
    const parts = texts.map(text => this.encoder.encode(text));
    const total = parts.reduce((n, part) => n + part.length, 0);
    // Ask for the buffer first: it may grow memory, which replaces memory.buffer.
    const at = this.x.iplv_buf(total);
    const bytes = new Uint8Array(this.x.memory.buffer, at, total);
    let offset = 0;
    for (const part of parts) { bytes.set(part, offset); offset += part.length; }
    return parts.map(part => part.length);
  }

  private text(length: number): string {
    const at = this.x.iplv_result();
    return this.decoder.decode(new Uint8Array(this.x.memory.buffer, at, length));
  }

  /** Load a deck, with the cards the program will read. True if it loaded. */
  load(deck: string, input = "", cells = 22000): boolean {
    if (input && !deck.endsWith("\n")) deck += "\n";
    const [d, i] = this.put(deck, input);
    return this.x.iplv_load(d, i, cells) === 1;
  }

  /** Interpret up to n instructions. mode: 0 that many, 1 over, 2 out. */
  advance(n = 1, mode = 0): Why {
    return (["done", "halted", "error", "breakpoint"] as const)[this.x.iplv_advance(n, mode)];
  }

  state(): State { return JSON.parse(this.text(this.x.iplv_state())); }
  lines(): [number, number][] { return JSON.parse(this.text(this.x.iplv_lines())); }
  structure(root: number, limit = 300): Structure { return JSON.parse(this.text(this.x.iplv_structure(root, limit))); }
  describe(a: number): string { return this.text(this.x.iplv_describe(a)); }
  output(): string { return this.text(this.x.iplv_take(0)); }
  traced(): string { return this.text(this.x.iplv_take(1)); }
  warnings(): string { return this.text(this.x.iplv_take(2)); }
  setBreak(a: number, on: boolean) { this.x.iplv_break(a, on ? 1 : 0); }
  /** 0: as the program's marks say; 1: every instruction; 2: none. */
  trace(mode: number) { this.x.iplv_trace(mode); }

  /** The address of a symbol as written (L1, 9-1350, 1350), or -1. */
  resolve(text: string): number {
    const [n] = this.put(text);
    return this.x.iplv_resolve(n);
  }

  /** Storage as it stands, good until the next call into the module. */
  words() {
    const length = this.x.iplv_mem_len();
    const at = this.x.iplv_mem();
    const view = new DataView(this.x.memory.buffer, at, length * WORD);
    return {
      length,
      bytes: new Uint8Array(this.x.memory.buffer, at, length * WORD),
      q: (a: number) => view.getUint8(a * WORD + 1),
      symb: (a: number) => view.getUint32(a * WORD + 4, true),
      link: (a: number) => view.getUint32(a * WORD + 8, true),
    };
  }
}

/** Run a deck to the end and return what it printed, traced lines first,
 *  as the tests in the repository do. */
export async function runDeck(deck: string, input = "", limit = 1_000_000): Promise<{ text: string; error: string | null; cycles: number }> {
  const m = await Iplv.create();
  m.load(deck, input);
  const warned = m.warnings();
  const why = m.advance(limit);
  let text = m.traced() + m.output();
  if (warned) text = warned.split("\n").filter(Boolean).map(line => `! warning: ${line.split("\n")[0]}\n`).join("") + text;
  const s = m.state();
  if (why === "done") text += `! stopped after ${limit} cycles\n`;
  return { text, error: s.error, cycles: s.cycles };
}
