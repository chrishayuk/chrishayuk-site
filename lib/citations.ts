import { getVideo, videoReferences } from "./youtube";
import { citationFormats, type CitationRecord } from "@chrishayuk/hause/cite";
import { SITE, recordPath } from "./records";
import type { PublicationRecord } from "./types";
export function citationRecord(record: PublicationRecord): CitationRecord | null {
 if (record.publication !== "published" || !record.published) return null;
 return { title: record.title, authors: record.authors, published: record.published, version: record.version, url: `${SITE}/records/${record.id}/${record.version}`, publisher: "Chris Hay", kind: record.kind === "work" ? "software" : record.kind === "notebook" || record.kind === "question" ? "research-note" : "page", abstract: record.abstract, note: record.kind === "film" ? "Editorial record of an appearance; original production by IBM." : undefined };
}
export function referenceFormats(record: PublicationRecord) {
 if(record.youtubeId){const video=getVideo(record.youtubeId);if(video)return videoReferences(video);}
 const citation = citationRecord(record);
 if (citation) return citationFormats(citation).map(f => ({ ...f, id: f.id === "csl" ? "csl-json" : f.id }));
 const url = `${SITE}${recordPath(record)}`;
 const plain = `${record.authors.join(", ")}. ${record.title} [Unpublished draft, version ${record.version}]. ${url}`;
 const esc = (v: string) => v.replace(/\\/g, "\\textbackslash{} ").replace(/[{}%&#_]/g, m => `\\${m}`);
 return [
  { id: "plain", label: "Plain", text: plain },
  { id: "bibtex", label: "BibTeX", text: `@unpublished{${record.id},\n  author = {${record.authors.map(esc).join(" and ")}},\n  title = {${esc(record.title)}},\n  note = {Unpublished draft, version ${esc(record.version)}},\n  url = {${url}}\n}` },
  { id: "apa", label: "APA", text: `Hay, C. (n.d.). ${record.title} [Unpublished manuscript, version ${record.version}]. ${url}` },
  { id: "csl-json", label: "CSL-JSON", text: JSON.stringify({ id: record.id, type: "manuscript", title: record.title, author: [{ family: "Hay", given: "Chris" }], URL: url, version: record.version, note: "Unpublished draft" }, null, 2) },
 ];
}
