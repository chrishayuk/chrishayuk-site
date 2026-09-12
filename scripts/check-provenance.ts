import { execFileSync } from "node:child_process";
import { publicationSnapshots } from "../lib/records.ts";
import { publicationProvenance } from "../lib/provenance.ts";
import { assertAppendOnly, auditProvenance } from "../lib/provenance-audit.ts";

const result = await auditProvenance(publicationSnapshots, publicationProvenance);
const base = process.env.PROVENANCE_BASE;
if (base && !/^0+$/.test(base)) {
 if (!/^[a-f0-9]{7,40}$/.test(base)) throw new Error("PROVENANCE_BASE must be a Git commit hash.");
 for (const [path, entries, key] of [
  ["content/publications.json", publicationSnapshots, (entry: {record:{id:string;version:string}}) => `${entry.record.id}@${entry.record.version}`],
  ["content/publication-provenance.json", publicationProvenance, (entry: {id:string;version:string}) => `${entry.id}@${entry.version}`],
 ] as const) {
  // A newly introduced manifest has no previous entries. Failure to resolve
  // the base commit itself is still fatal, rather than silently skipping CI.
  execFileSync("git", ["cat-file", "-e", `${base}^{commit}`]);
  const exists = execFileSync("git", ["ls-tree", "--name-only", base, "--", path], { encoding: "utf8" }).trim();
  if (exists) assertAppendOnly(JSON.parse(execFileSync("git", ["show", `${base}:${path}`], { encoding: "utf8" })), entries, key);
 }
}
console.log("HAUSE / PROVENANCE & CONTINUITY");
for (const error of result.errors) console.error(`REQUIRED ${error}`);
for (const advisory of result.advisories) console.log(`ADVISORY ${advisory}`);
console.log(`${result.ok ? "PASS" : "FAIL"} ${publicationSnapshots.length} preserved versions${base ? "; Git history checked" : "; run with PROVENANCE_BASE to check append-only history"}`);
if (!result.ok) process.exitCode = 1;
