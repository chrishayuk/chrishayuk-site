import { auditLegibility, legibilityAuditResult, type Legibility } from "../vendor/hause/legibility.ts";
import { records, recordPath, SITE } from "./records.ts";
import { threads } from "./threads.ts";
import { publicationLegibility } from "./legibility.ts";

export function auditPublicationLegibility(registry: Readonly<Record<string, Legibility>> = publicationLegibility) {
 const corpus = [
  ...records.filter(record => record.kind === "notebook").map(record => ({
   id: record.id, title: record.title, abstract: record.abstract, url: `${SITE}${recordPath(record)}`,
   authors: record.authors, state: record.publication === "published" ? "published" as const : "draft" as const,
   published: record.published, partOf: { title: "The notebook", url: `${SITE}/notebook` },
  })),
  ...threads.map(thread => ({
   id: thread.id, title: thread.title, abstract: thread.abstract, url: `${SITE}${thread.path}`,
   authors: ["Chris Hay"], state: "draft" as const, published: undefined,
   partOf: { title: "The notebook", url: `${SITE}/notebook` },
  })),
 ];
 const results = corpus.map(record => {
  const meaning = registry[record.id];
  return { id: record.id, ...(meaning ? auditLegibility({ ...meaning, ...record, indexable: process.env.SITE_INDEXABLE === "true", visibleAbstract: record.abstract }) : legibilityAuditResult([{
   code: "record-meaning", severity: "error", message: "This listed publication has no declared subject or reader question.",
   remedy: `Add a legibility record for ${record.id}. If its editorial head should stand, declare search.mode = editorial with a reason; do not omit the meaning record.`,
  }])) };
 });
 const titles = new Map<string, string>();
 for (const record of corpus) {
  const meaning = registry[record.id];
  const title = meaning?.search?.mode === "editorial" ? record.title : meaning?.searchTitle;
  const key = title?.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim();
  if (key && titles.has(key)) {
   const result = results.find(result => result.id === record.id)!;
   Object.assign(result, legibilityAuditResult([...result.diagnostics, {
    code: "duplicate-search-title", severity: "error", message: `The search title is indistinguishable from ${titles.get(key)}.`,
    remedy: `Give ${record.id} wording that identifies its own question. This check catches duplicate titles, not every possible overlap in search intent.`,
   }]));
  }
  if (key) titles.set(key,record.id);
 }
 for (const id of Object.keys(registry)) if (!corpus.some(record => record.id === id)) results.push({ id, ...legibilityAuditResult([{
  code: "unresolved-publication", severity: "error", message: "This discovery record has no listed publication to describe.",
  remedy: `Resolve ${id} to a listed note or thread, or remove the orphaned discovery entry. Unlisted work must not enter the public corpus.`,
 }]) });
 return results;
}
