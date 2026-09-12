import { auditLegibility } from "../vendor/hause/legibility.ts";
import { records, recordPath, SITE } from "./records.ts";
import { threads } from "./threads.ts";
import { publicationLegibility } from "./legibility.ts";

export function auditPublicationLegibility() {
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
  const meaning = publicationLegibility[record.id];
  return { id: record.id, ...(meaning ? auditLegibility({ ...record, ...meaning, indexable: true, visibleAbstract: record.abstract }) : { ok: false, errors: ["Missing legibility record"], advisories: [] }) };
 });
 const titles = new Set<string>();
 for (const record of corpus) {
  const title = publicationLegibility[record.id]?.searchTitle;
  if (title && titles.has(title)) { const result = results.find(result => result.id === record.id)!; result.ok = false; result.errors.push("Duplicate search title"); }
  if (title) titles.add(title);
 }
 for (const id of Object.keys(publicationLegibility)) if (!corpus.some(record => record.id === id)) results.push({ id, ok: false, errors: ["Legibility record has no listed destination"], advisories: [] });
 return results;
}
