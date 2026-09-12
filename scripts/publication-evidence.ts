import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import type { EvidenceReference } from "../vendor/hause/provenance.ts";

/** Capture only public local source artifacts; never fetch or execute a source link. */
export async function preserveEvidence(sources: EvidenceReference[], date: string): Promise<EvidenceReference[]> {
 const result: EvidenceReference[] = [];
 for (const source of sources) {
  if (!source.url?.startsWith("/data/") || source.url.includes("..") || /[?#]/.test(source.url)) { result.push({ ...source }); continue; }
  const bytes = await readFile(new URL(`../public${source.url}`, import.meta.url));
  const hash = createHash("sha256").update(bytes).digest("hex");
  const extension = source.url.match(/\.(json|csv|txt|md|jsonl|svg|png|pdf)$/)?.[0] || ".bin";
  const url = `/data/publications/sha256/${hash}${extension}`;
  const target = new URL(`../public${url}`, import.meta.url);
  await mkdir(new URL(".", target), { recursive: true });
  try { await writeFile(target, bytes, { flag: "wx" }); }
  catch (error) {
   if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
   if (!(await readFile(target)).equals(bytes)) throw new Error(`Preserved artifact differs: ${url}`);
  }
  result.push({ ...source, preserved: { url, sha256: hash, date } });
 }
 return result;
}
