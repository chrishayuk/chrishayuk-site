// How the page asks the george program for things, and how it reads what
// comes back. The page runs exactly the command line of README.md, so
// these are its arguments and its output.

export const PROGRAM = "/program.george";
export const DATA = "/program.in";
/** A trace keeps every accumulator, so it is cut off sooner than a run. */
export const TRACE_LIMIT = 100_000;

/**
 * The arguments and files for one run of george.
 *
 * @param {object} what
 * @param {string} what.program   the G-program
 * @param {string} [what.data]    data cards, one number to a line
 * @param {string} [what.keys]    numbers set on the input keys, for I
 * @param {boolean} [what.singleShot]  carry on through resumable stops
 * @param {"run"|"cards"|"trace"|"deck"|"format"|"table"|"stops"} [what.mode]
 * @param {number} [what.limit]   symbols to obey before giving up
 */
export function invocation({ program, data = "", keys = "", singleShot = false, mode = "run", limit }) {
  if (mode === "table" || mode === "stops") return { args: [mode], files: {} };
  const files = { [PROGRAM]: program };
  if (mode === "deck" || mode === "format") return { args: [mode, PROGRAM], files };
  const args = ["run", PROGRAM];
  if (data.trim()) {
    files[DATA] = data;
    args.push("--data", DATA);
  }
  const keyList = keys.split(/[\s,]+/).filter(Boolean);
  if (keyList.length) args.push("--keys", keyList.join(","));
  if (singleShot) args.push("--single-shot");
  if (mode === "cards") args.push("--cards");
  if (mode === "trace") args.push("--trace", "--limit", String(limit ?? TRACE_LIMIT));
  else if (limit) args.push("--limit", String(limit));
  return { args, files };
}

/** The punched numbers, one to a line, from standard output. */
export function punched(stdout) {
  return stdout.split("\n").filter((line) => line !== "");
}

/**
 * The trace lines george prints on standard error with --trace: the index
 * of the symbol obeyed, the symbol, and the accumulator after it, first
 * cell first.
 */
export function trace(stderr) {
  const steps = [];
  for (const line of stderr.split("\n")) {
    const found = /^ *(\d+)  (\S+)(?: +(.*))?$/.exec(line);
    if (!found) continue;
    steps.push({ at: Number(found[1]), symbol: found[2], cells: (found[3] ?? "").trim().split(/\s+/).filter(Boolean) });
  }
  return steps;
}

/**
 * Everything else george says on standard error: the stop it ended on, the
 * stops a single shot got past, what wait showed, a limit reached, or a
 * mistake in the program text.
 */
export function report(stderr, code) {
  const lines = stderr.split("\n");
  const stops = [];
  const lights = [];
  let limit = null;
  let problem = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let found;
    if ((found = /^stop (.+?): (.*)$/.exec(line))) {
      let text = line;
      const stop = { indication: found[1], cause: found[2], at: null, line: null, column: null, symbol: null, resumed: null };
      const where = /^  at symbol (\d+) "(.*)", line (\d+), column (\d+)/.exec(lines[i + 1] ?? "");
      if (where) {
        Object.assign(stop, { at: Number(where[1]), symbol: where[2], line: Number(where[3]), column: Number(where[4]) });
        text += "\n" + lines[++i];
      }
      const resumed = /\(single shot: (.*)\)$/.exec(text);
      if (resumed) {
        stop.resumed = resumed[1];
        stop.cause = stop.cause.replace(/ \(single shot: .*\)$/, "");
      }
      stop.text = text;
      stops.push(stop);
    } else if ((found = /^wait: the output lights show (.*)$/.exec(line))) {
      lights.push(found[1]);
    } else if ((found = /^george: gave up after (\d+) symbols obeyed/.exec(line))) {
      limit = Number(found[1]);
    } else if ((found = /^george: (.*)$/.exec(line))) {
      const message = found[1].replace(`${PROGRAM}: `, "").replace(`${DATA}: `, "data: ");
      const at = /^line (\d+), column (\d+): (.*)$/.exec(message);
      problem = at ? { line: Number(at[1]), column: Number(at[2]), message: at[3], text: message } : { message, text: message };
    }
  }
  const final = code === 1 ? stops.filter((s) => !s.resumed).at(-1) ?? null : null;
  return { stop: final, resumed: stops.filter((s) => s.resumed), lights, limit, problem };
}

/** The twenty columns of a punched card, as `george run --cards` prints them. */
export function columns(card) {
  const c = card.padEnd(20).slice(0, 20);
  return { sign: c[0], mantissa: c.slice(1, 10), exponentSign: c[10], exponent: c.slice(11, 20), all: c };
}

/**
 * How many numbers a punching symbol punched, given the accumulator before
 * it: one for (P); b - a + 1 for a b P|; (m - i + 1)(n - j + 1) for i m j n P||.
 */
export function punchCount(symbol, before) {
  const index = (s) => Math.floor(Number(s));
  const last = (k) => index(before[before.length - k]);
  if (symbol === "(P)") return 1;
  if (symbol === "P|" && before.length >= 2) return Math.max(0, last(1) - last(2) + 1);
  if (symbol === "P||" && before.length >= 4) return Math.max(0, last(3) - last(4) + 1) * Math.max(0, last(1) - last(2) + 1);
  return 0;
}
