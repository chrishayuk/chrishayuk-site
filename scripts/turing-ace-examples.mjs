// Writes public/demos/turing-ace/examples.json from a clone of the turing-ace
// repository, and checks every example through ace.wasm against its .out file.
//   node scripts/turing-ace-examples.mjs ../../esoteric/turing-ace public/demos/turing-ace
// Copy web/ace.wasm from the clone into public/demos/turing-ace first.
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
const [repo, out] = process.argv.slice(2).map((p) => resolve(p));
const { run, stdinFor } = await import(pathToFileURL(out + "/wasi.js").href);
const wasm = new WebAssembly.Module(readFileSync(out + "/ace.wasm"));
const first = ["answer", "add", "fetch", "sum-to-n", "factorial", "fibonacci", "gcd", "polynomial", "indexin-trial", "calpol-twice"];
const trial = "# INDEXIN, printed in section 13, fetches the minor cycle whose position is\n# in TS 27 into TS 28. Here it fetches the 1945 kept in DL 3,5 and punches it.\n# Tick “Tables as printed” to run INDEXIN exactly as the report prints it.\nTRIAL\n  1   B, BURY\n  2   B, INDEXIN\n  3   TS 28 - DL 2,1\n  5   O, DL 2\n  6   B, TRIAL 6\n\nTS 27   DL 3,5\nDL 3,5  1945\n";
const twice = "# cards: listing\n# Turing’s CALPOL twice in a row: x^3 - 2x + 5 at x = 7, which is 334.\n# As printed, CALPOL never stops; with four of its five corrections the\n# second answer is wrong, because the first call leaves its product behind.\n# BINDEC prints what is in TS 13, where CALPOL keeps x, so x is kept in\n# DL 1,1 and put back before each call.\nTWICE\n  1   DL 1,1 - TS 13;  B, BURY;  B, CALPOL;  TS 25 - TS 13;  B, BURY;  B, BINDEC;  O, DL 10\n      DL 1,1 - TS 13;  B, BURY;  B, CALPOL;  TS 25 - TS 13;  B, BURY;  B, BINDEC;  O, DL 10\n 30   B, TWICE 30\n\nDL 1,1   7\nDL 3,25  +1\nDL 3,29  -2\nDL 3,31  +5\n";
const list = readdirSync(repo + "/examples").filter(f => f.endsWith(".ace")).map(f => {
  const name = f.slice(0, -4), input = repo + "/examples/" + name + ".in";
  return { name, program: readFileSync(repo + "/examples/" + f, "utf8"), input: existsSync(input) ? readFileSync(input, "utf8") : "", expected: readFileSync(repo + "/examples/" + name + ".out", "utf8") };
});
list.push({ name: "indexin-trial", program: trial, input: "" }, { name: "calpol-twice", program: twice, input: "" });
list.sort((a, b) => { const [i, j] = [first.indexOf(a.name), first.indexOf(b.name)]; if (i !== -1 || j !== -1) return (i === -1 ? 99 : i) - (j === -1 ? 99 : j); return a.name.localeCompare(b.name); });
let failed = 0;
const ace = (args, program, input) => { let text = ""; const d = new TextDecoder(); const code = run(wasm, stdinFor(program, input), (fd, b) => { text += d.decode(b, { stream: true }); }, args); return { code, text }; };
for (const e of list) {
  const r = ace(["run", "-"], e.program, e.input);
  if (e.expected !== undefined && r.text !== e.expected) { failed++; console.log("FAIL", e.name, JSON.stringify(r.text)); }
  delete e.expected;
}
const t = ace(["run", "-"], trial, ""), tp = ace(["run", "-", "--errata", "none", "--limit", "2000"], trial, "");
const c = ace(["run", "-"], twice, ""), cp = ace(["run", "-", "--errata", "literal,half,return,sign,inputs,branch,carry,contents", "--limit", "2000000"], twice, "");
console.log("trial corrected:", JSON.stringify(t.text), "printed:", JSON.stringify(tp.text), tp.code);
console.log("twice corrected:", JSON.stringify(c.text), "without clear:", JSON.stringify(cp.text));
writeFileSync(out + "/examples.json", JSON.stringify(list));
console.log(`${list.length} examples, ${failed} failed`);
process.exit(failed ? 1 : 0);
