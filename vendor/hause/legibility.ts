/** Expression and discovery are projections of one publication, not rival titles.
 * Framework-neutral; deliberately no keyword density or character-count rules.
 */
export type Legibility = {
 subject: string;
 question: string;
 searchTitle: string;
 description: string;
 concepts: readonly string[];
};

export type LegiblePublication = Legibility & {
 title: string;
 abstract: string;
 url: string;
 authors: readonly string[];
 indexable: boolean;
 state: "draft" | "published";
 published?: string;
 /** Text the reader can reach without executing an interaction. */
 visibleAbstract: string;
 partOf?: { title: string; url: string };
};

export function searchProjection(record: Legibility & { title: string }) {
 return { title: record.searchTitle || record.title, description: record.description };
}

/** Adds meaning, never publication dates, scholarly status or a fabricated answer. */
export function legibilityLd(record: Legibility & { title: string; abstract: string }) {
 return {
  headline: record.title,
  alternativeHeadline: record.searchTitle,
  description: record.description,
  abstract: record.abstract,
  about: [...new Set([record.subject, ...record.concepts])].map(name => ({ "@type": "Thing", name })),
 };
}

export function auditLegibility(record: LegiblePublication) {
 const errors: string[] = [];
 const advisories: string[] = [];
 for (const field of ["title", "subject", "question", "abstract", "description"] as const)
  if (!record[field]?.trim()) errors.push(`Missing ${field}`);
 const validUrl = (value: string) => { try { return ["https:", "http:"].includes(new URL(value).protocol); } catch { return false; } };
 if (!validUrl(record.url)) errors.push("Canonical URL must be absolute HTTP(S)");
 if (typeof record.indexable !== "boolean") errors.push("Index policy must be explicit");
 if (!record.authors.length || record.authors.some(author => !author.trim())) errors.push("Missing author");
 if (!record.concepts.length || record.concepts.some(concept => !concept.trim())) errors.push("Missing concepts");
 if (!record.visibleAbstract.trim() || record.visibleAbstract !== record.abstract) errors.push("Abstract must have an equivalent in the readable page");
 if (record.state === "published" && (!record.published || !/^\d{4}-\d{2}-\d{2}$/.test(record.published) || Number.isNaN(Date.parse(record.published)))) errors.push("Published work needs its recorded publication date");
 if (record.partOf && !validUrl(record.partOf.url)) errors.push("Collection URL must be absolute HTTP(S)");
 if (!record.partOf) advisories.push("No larger body of work declared");
 if (!record.searchTitle?.trim() || record.searchTitle === record.title) advisories.push("Search title uses the editorial title; check that the subject is clear");
 return { ok: errors.length === 0, errors, advisories };
}
