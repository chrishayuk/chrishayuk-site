import { records } from "./records.ts";
import type { PublicationRecord } from "./types.ts";

export const CATALOGUE_KINDS = ["all", "work", "question", "notebook", "film"] as const;
export type CatalogueQuery = { q?: string; kind?: string; page?: string };
export const PAGE_SIZE = 30;

/** A source's publication date and our catalogue retrieval date are different facts. */
export function catalogueDate(record: PublicationRecord) {
  if (record.published) return { label: record.youtubeId ? "RELEASED" : "PUBLISHED", value: record.published };
  if (record.youtubeId) return { label: "RELEASE DATE", value: "NOT RECORDED" };
  return { label: "RECORDED", value: record.created };
}

export function catalogue(query: CatalogueQuery, source = records) {
  const q = (query.q || "").trim().slice(0, 300);
  const kind = CATALOGUE_KINDS.find(k => k === query.kind) || "all";
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const matching = source.filter(r => (kind === "all" || r.kind === kind) && terms.every(t =>
    `${r.id} ${r.title} ${r.abstract} ${r.authors.join(" ")} ${r.concepts.join(" ")}`.toLowerCase().includes(t)
  ));
  // Authored work first, then source films in their existing editorial catalogue order.
  const pages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  const requested = /^\d+$/.test(query.page || "") ? Number(query.page) : 1;
  const page = Math.min(pages, Math.max(1, Number.isSafeInteger(requested) ? requested : 1));
  return { q, kind, page, pages, total: matching.length, entries: matching.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) };
}

export function catalogueUrl(q: string, kind: string, page = 1) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (kind !== "all") params.set("kind", kind);
  if (page > 1) params.set("page", String(page));
  return `/record${params.size ? `?${params}` : ""}`;
}
