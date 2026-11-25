// The Friden Flexowriter as Atlas Autocode was typed on it: a typewriter
// that punched seven-track paper tape as it printed.
//
// This module has two halves. The first is a model, with no DOM, which
// web/test.mjs checks against the native build: the keys and their tape
// codes, the line image Atlas rebuilt from the tape, and the tape itself.
// The second draws the page, the tape and the keyboard in a browser.
//
// What is from the sources (see src/flexo.rs, which this follows):
//
// - Each key has an upper-case and a lower-case symbol, and the case is a
//   key of its own: the digits and the point are on UPPER case, and , ( )
//   = < > * _ | on lower case (Atlas Bible, §8.7.4, "The Flexowriter Code",
//   dated 1.7.63). So `x = 1.5` takes four case shifts on the tape.
// - "A back-spacing facility allows underlining and also the formation of
//   compound characters" (Atlas Autocode Reference Manual, 1965, p. 2.1).
//   BACKSPACE moves the carriage back one place and the next key strikes on
//   top of what is there: `cycle`, five backspaces, five underlines, is the
//   delimiter c̲y̲c̲l̲e̲. ≠ is = struck with /, ≥ is > struck with _, ↑ is *
//   struck with |, and ; is : struck with , (Appendix 5; Lunnon and Riding,
//   Mini-Manual, 1965, p. 5).
// - "On input, each line of data is reconstructed to give an image of the
//   print-out produced by the Flexowriter. Thus 'backspace', 'tab', 'upper
//   case' and 'lower case' do not appear as characters in the reconstructed
//   line" (p. 5.4). The page here is that image: the symbols struck in one
//   place are drawn one on top of another.
// - "All tape characters should have an odd number of holes" (Atlas Bible
//   §8.7.4), and the sprocket hole "comes between the digits of value 4 and
//   8" (Reference Manual, p. 5.6).
//
// What is not: the arrangement of the keys on the keyboard drawn here. The
// sources give each key's two symbols and its tape code, not where it sat.

// ---- the keys -------------------------------------------------------------

/** A key's symbol: its numerical equivalent (Appendix 5), tape code, case. */
const BASIC = new Map();
const add = (ch, code, tape, upper) => BASIC.set(ch, { ch, code, tape, upper });
add("(", 8, 0b0111000, false);
add(")", 9, 0b0101001, false);
add(",", 10, 0b0101111, false);
add("π", 11, 0b0111011, false);
add("?", 12, 0b0101100, false);
add("&", 13, 0b0111101, false);
add("*", 14, 0b0111110, false);
add("/", 15, 0b0011111, true);
"0123456789".split("").forEach((d, i) =>
  add(d, 16 + i, [0b0100000, 0b0110001, 0b0110010, 0b0100011, 0b0110100, 0b0100101, 0b0100110, 0b0110111, 0b0111000, 0b0101001][i], true),
);
add("<", 26, 0b0100011, false);
add(">", 27, 0b0110100, false);
add("=", 28, 0b0100101, false);
add("+", 29, 0b0111101, true);
add("-", 30, 0b0111110, true);
add(".", 31, 0b0101111, true);
add("'", 32, 0b0100000, false);
add(":", 79, 0b0011111, false);
add("[", 81, 0b0110001, false);
add("]", 82, 0b0110010, false);
add("_", 86, 0b0100110, false);
add("|", 87, 0b0110111, false);
add("²", 88, 0b0101010, false);
add("α", 90, 0b0101010, true);
add("β", 91, 0b0111011, true);
add("½", 92, 0b0101100, true);
const LETTER_TAPE = [
  0b1010001, 0b1010010, 0b1000011, 0b1010100, 0b1000101, 0b1000110, 0b1010111, 0b1011000, 0b1001001, 0b1001010, 0b1011011,
  0b1001100, 0b1011101, 0b1011110, 0b1001111, 0b1110000, 0b1100001, 0b1100010, 0b1110011, 0b1100100, 0b1110101, 0b1110110,
  0b1100111, 0b1101000, 0b1111001, 0b1111010,
];
for (let i = 0; i < 26; i++) {
  add(String.fromCharCode(65 + i), 33 + i, LETTER_TAPE[i], true);
  add(String.fromCharCode(97 + i), 97 + i, LETTER_TAPE[i], false);
}

export const TAPE = { space: 0b0010000, newline: 0b0000010, tab: 0b0000100, backspace: 0b0010101, lower: 0b0010110, upper: 0b0000111, erase: 0b1111111 };

/** The keys of the keyboard, each with its upper- and lower-case symbol. */
export const KEYBOARD = [
  [["1", "["], ["2", "]"], ["3", "<"], ["4", ">"], ["5", "="], ["6", "_"], ["7", "|"], ["8", "("], ["9", ")"], ["0", "'"], ["-", "*"], ["+", "&"]],
  [..."QWERTYUIOP"].map((c) => [c, c.toLowerCase()]).concat([["α", "²"], ["β", "π"]]),
  [..."ASDFGHJKL"].map((c) => [c, c.toLowerCase()]).concat([["½", "?"], ["/", ":"]]),
  [..."ZXCVBNM"].map((c) => [c, c.toLowerCase()]).concat([[".", ","]]),
];

export function symbol(ch) {
  return BASIC.get(ch) || null;
}

/** Marks typed over a character after a backspace, by combining character. */
const MARKS = { "̲": "_", "̸": "/", "⃒": "|" };
/** Compound characters typed as two keys. */
const COMPOUNDS = { "≠": ["=", "/"], "≥": [">", "_"], "≤": ["<", "_"], "↑": ["*", "|"], ";": [":", ","], ø: ["0", "/"] };

/** Modern stand-ins, as `aa` takes them (src/source.rs, transliterate). */
export function transliterate(text) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === "%") {
      while (i + 1 < text.length && /[A-Za-z]/.test(text[i + 1])) out += text[++i].toLowerCase() + "̲";
    } else if ((c === "!" || c === "<" || c === ">") && text[i + 1] === "=") {
      out += { "!": "≠", "<": "≤", ">": "≥" }[c];
      i++;
    } else if (c === "^") out += "↑";
    else out += c;
  }
  return out;
}

/**
 * The keys typed for a piece of text: {k: "p", ch} for a key that prints,
 * and "sp", "bs", "tab", "nl", "erase". Characters the Flexowriter had no
 * key for are left out.
 */
export function keysOf(text) {
  const keys = [];
  const print = (ch) => BASIC.has(ch) && keys.push({ k: "p", ch });
  for (const c of transliterate(text)) {
    if (c === "\n") keys.push({ k: "nl" });
    else if (c === "\r") continue;
    else if (c === " ") keys.push({ k: "sp" });
    else if (c === "\t") keys.push({ k: "tab" });
    else if (c === "\b") keys.push({ k: "bs" });
    else if (c === "\x7f") keys.push({ k: "erase" });
    else if (MARKS[c]) keys.push({ k: "bs" }, { k: "p", ch: MARKS[c] });
    else if (COMPOUNDS[c]) {
      print(COMPOUNDS[c][0]);
      keys.push({ k: "bs" });
      print(COMPOUNDS[c][1]);
    } else print(c);
  }
  return keys;
}

/** Tab stops (Reference Manual, p. 5.5). */
export const TAB_STOPS = [8, 16, 24, 32, 48, 64, 80, 96, 112, 128, 144, 159];
const nextTab = (col) => TAB_STOPS.find((t) => t > col) ?? col + 1;

/**
 * Rebuild the printed lines from the keys: each line an array of
 * positions, each position the symbols struck there in the order typed.
 */
export function reconstruct(keys) {
  const lines = [[]];
  let col = 0;
  for (const key of keys) {
    const line = lines[lines.length - 1];
    if (key.k === "nl") {
      lines.push([]);
      col = 0;
    } else if (key.k === "sp") col++;
    else if (key.k === "tab") col = nextTab(col);
    else if (key.k === "bs") col = Math.max(0, col - 1);
    else if (key.k === "p") {
      while (line.length <= col) line.push([]);
      if (!line[col].includes(key.ch)) line[col].push(key.ch);
      col++;
    }
  }
  return lines;
}

const NAMED = [
  [["=", "/"], "≠"],
  [["=", "/", "_"], "≠"],
  [[">", "_"], "≥"],
  [["<", "_"], "≤"],
  [["*", "|"], "↑"],
  [[":", ","], ";"],
  [["0", "/"], "ø"],
];
const COMBINING = { _: "̲", "/": "̸", "|": "⃒" };

/** How a position is written in Unicode text, as src/flexo.rs writes it. */
export function positionText(pos) {
  if (pos.length === 0) return " ";
  if (pos.length === 1) return pos[0];
  const set = [...pos].sort().join("");
  for (const [parts, ch] of NAMED) if ([...parts].sort().join("") === set) return ch;
  const plain = pos.filter((c) => !COMBINING[c]);
  const marks = pos.filter((c) => COMBINING[c]);
  if (plain.length === 0) return marks.join("\b");
  return plain.join("\b") + marks.map((m) => COMBINING[m]).join("");
}

/** Text written the way the Flexowriter would have printed it. */
export function canonical(text) {
  return reconstruct(keysOf(text))
    .map((line) => line.map(positionText).join("").replace(/ +$/, ""))
    .join("\n");
}

/**
 * The rows of tape punched for the keys, with the case shifts the typist
 * had to press, as src/flexo.rs `punch` does.
 */
export function punch(keys) {
  const rows = [];
  let upper = null;
  for (const key of keys) {
    if (key.k === "sp") rows.push(TAPE.space);
    else if (key.k === "bs") rows.push(TAPE.backspace);
    else if (key.k === "tab") rows.push(TAPE.tab);
    else if (key.k === "nl") rows.push(TAPE.newline);
    else if (key.k === "erase") rows.push(TAPE.erase);
    else {
      const s = BASIC.get(key.ch);
      if (!s) continue;
      if (upper !== s.upper) {
        rows.push(s.upper ? TAPE.upper : TAPE.lower);
        upper = s.upper;
      }
      rows.push(s.tape);
    }
  }
  return rows;
}

/** What a row of tape is, for its label. */
export function rowLabel(row, upper) {
  const names = { [TAPE.space]: "SP", [TAPE.newline]: "NL", [TAPE.tab]: "TAB", [TAPE.backspace]: "BS", [TAPE.lower]: "LC", [TAPE.upper]: "UC", [TAPE.erase]: "ER" };
  if (names[row]) return names[row];
  for (const s of BASIC.values()) if (s.tape === row && s.upper === upper) return s.ch;
  return "";
}

/** Plain text of a line, without marks, for finding words in it. */
function bare(line) {
  return line.normalize("NFD").replace(/[̀-ͯ⃐-⃿%]/g, "").toLowerCase().replace(/\s+/g, "");
}

/**
 * Split a tape into the program, up to and including the line that ends it,
 * and the rest (the data and ***Z). Returns {program, data}; data is null
 * if there is no `end of program`.
 */
export function splitTape(text) {
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const b = bare(lines[i]).replace(/^(\d+:)+/, "");
    if (b.startsWith("endofprogram")) {
      const program = lines.slice(0, i + 1).join("\n") + (i + 1 < lines.length ? "\n" : "");
      return { program, data: lines.slice(i + 1).join("\n") };
    }
  }
  return { program: text, data: null };
}

/**
 * The lines of a page that the comparison with a 1965 transcript looks at,
 * as tests/transcripts.rs takes them: blank lines, editors' notes in
 * brackets and the compiler's title left out, runs of spaces as one, and
 * the machine addresses and sizes the reconstruction cannot print taken
 * off. Each entry is [index of the line, words].
 */
export function significant(page) {
  const out = [];
  page.split("\n").forEach((raw, i) => {
    const l = raw.replace(/\f/g, "");
    const t = l.trim();
    if (!t || (t.startsWith("[") && t.endsWith("]")) || t === "COMPILER AB/3") return;
    let w = t.split(/\s+/);
    const cut = w.findIndex((x) => x === "ADDRESS" || x === "OCCUPIES");
    if (cut >= 0) w = w.slice(0, cut);
    out.push([i, w.join(" ").replaceAll(" <", "<").replaceAll("<", " <")]);
  });
  return out;
}

// ---- drawing --------------------------------------------------------------

/**
 * Draw lines of text on a page, each position in a cell of its own, with
 * the symbols struck there drawn on top of one another. A form feed starts
 * a new sheet.
 */
export function drawPage(element, text, { carriage = null, marks = null } = {}) {
  const doc = element.ownerDocument;
  element.textContent = "";
  const lines = reconstruct(keysOf(text.replace(/\f/g, "\n\f\n")));
  const sourceLines = text.replace(/\f/g, "\n\f\n").split("\n");
  lines.forEach((line, n) => {
    const div = doc.createElement("div");
    div.className = "line";
    if (sourceLines[n] === "\f") {
      div.className = "line sheet";
      element.append(div);
      return;
    }
    if (marks && marks.has(n)) div.classList.add("differs");
    const cols = Math.max(line.length, carriage && carriage.line === n ? carriage.col + 1 : 0);
    for (let c = 0; c < cols; c++) {
      const pos = line[c] || [];
      const cell = doc.createElement("span");
      cell.className = "cell";
      if (pos.length === 0) cell.textContent = " ";
      pos.forEach((ch, k) => {
        const g = doc.createElement("span");
        g.className = k === 0 ? "glyph" : "glyph over";
        g.textContent = ch;
        cell.append(g);
      });
      if (carriage && carriage.line === n && carriage.col === c) cell.classList.add("carriage");
      div.append(cell);
    }
    if (line.length === 0 && !(carriage && carriage.line === n)) div.textContent = " ";
    element.append(div);
  });
}

/** Draw the tape as a strip of rows, holes and sprocket, with labels. */
export function drawTape(canvas, rows, { follow = true } = {}) {
  const dpr = globalThis.devicePixelRatio || 1;
  const pitch = 14; // one row of tape
  const width = Math.max(rows.length * pitch + 40, canvas.parentElement ? canvas.parentElement.clientWidth : 600);
  const height = 140;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const g = canvas.getContext("2d");
  g.scale(dpr, dpr);
  g.fillStyle = "#efe6cf";
  g.fillRect(0, 8, width, 104);
  g.strokeStyle = "#cbbd97";
  g.beginPath();
  g.moveTo(0, 8.5);
  g.lineTo(width, 8.5);
  g.moveTo(0, 111.5);
  g.lineTo(width, 111.5);
  g.stroke();
  // Channels from the top: 64 32 16 8, sprocket, 4 2 1.
  const ys = [20, 32, 44, 56, 72, 84, 96];
  const sprocket = 64;
  let upper = null;
  rows.forEach((row, i) => {
    const x = 20 + i * pitch;
    g.fillStyle = "#b9ab83";
    g.beginPath();
    g.arc(x, sprocket, 1.6, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#2a2722";
    for (let b = 6; b >= 0; b--) {
      if (row >> b & 1) {
        g.beginPath();
        g.arc(x, ys[6 - b], 4, 0, Math.PI * 2);
        g.fill();
      }
    }
    if (row === TAPE.upper) upper = true;
    if (row === TAPE.lower) upper = false;
    const label = rowLabel(row, upper);
    g.fillStyle = label.length > 1 ? "#8a7d5c" : "#2a2722";
    g.font = label.length > 1 ? "8px ui-monospace, monospace" : "11px ui-monospace, monospace";
    g.textAlign = "center";
    g.fillText(label, x, 128);
  });
  if (follow && canvas.parentElement) canvas.parentElement.scrollLeft = canvas.parentElement.scrollWidth;
}

/**
 * Typing on the Flexowriter. The document is the text in a textarea; keys
 * typed here strike on its last line at the carriage, as on paper, and the
 * text is written back in its canonical form.
 */
export class Flexowriter {
  constructor({ getText, setText, onChange }) {
    this.getText = getText;
    this.setText = setText;
    this.onChange = onChange;
    this.upper = false;
    this.typed = []; // the keys typed since the text was last edited by hand
    this.carriage = null;
  }

  /** Put the carriage at the end of the text, on a new line if the last is not empty. */
  start() {
    const lines = reconstruct(keysOf(this.getText()));
    this.lines = lines;
    const last = lines.length - 1;
    this.carriage = { line: last, col: lines[last].length };
    this.typed = [];
  }

  write() {
    const text = this.lines.map((l) => l.map(positionText).join("").replace(/ +$/, "")).join("\n");
    this.setText(text);
    this.onChange(this);
  }

  strike(ch) {
    const s = symbol(ch);
    if (!s) return false;
    const line = this.lines[this.carriage.line];
    while (line.length <= this.carriage.col) line.push([]);
    const pos = line[this.carriage.col];
    if (!pos.includes(ch)) {
      if (pos.length >= 3) return false; // "MORE THAN 3 SYMBOLS IN POSITION"
      pos.push(ch);
    }
    this.upper = s.upper;
    this.typed.push({ k: "p", ch });
    this.carriage.col++;
    return true;
  }

  /** A key on the keyboard pressed, in the current case. */
  press(key) {
    const [up, low] = key;
    return this.strike(this.upper ? up : low);
  }

  /** A character typed on a modern keyboard; the case shifts itself. */
  type(ch) {
    if (COMPOUNDS[ch]) {
      const [a, b] = COMPOUNDS[ch];
      this.strike(a);
      this.backspace();
      return this.strike(b);
    }
    if (ch === "^") return this.type("↑");
    if (ch === " ") return this.space();
    return this.strike(ch);
  }

  space() {
    this.carriage.col++;
    this.typed.push({ k: "sp" });
    return true;
  }

  backspace() {
    if (this.carriage.col > 0) this.carriage.col--;
    this.typed.push({ k: "bs" });
    return true;
  }

  tab() {
    this.carriage.col = nextTab(this.carriage.col);
    this.typed.push({ k: "tab" });
    return true;
  }

  newline() {
    this.carriage.line++;
    if (this.carriage.line >= this.lines.length) this.lines.push([]);
    this.carriage.col = 0;
    this.typed.push({ k: "nl" });
    return true;
  }

  /** Underline the word before the carriage: back over it, then underline. */
  underlineWord() {
    const line = this.lines[this.carriage.line];
    let end = this.carriage.col;
    while (end > 0 && (line[end - 1] || []).length === 0) end--;
    let start = end;
    while (start > 0 && (line[start - 1] || []).some((c) => /[a-z]/.test(c))) start--;
    if (start === end) return false;
    while (this.carriage.col > start) this.backspace();
    for (let c = start; c < end; c++) this.strike("_");
    return true;
  }
}
