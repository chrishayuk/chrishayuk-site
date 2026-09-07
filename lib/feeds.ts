import { escapeXml as x } from "./publication.ts";
import { publishedRecords, records, recordPath, SITE } from "./records.ts";
import type { PublicationRecord } from "./types";

/**
 * THE FEEDS — the record, distributed as it changes.
 *
 * A record nobody receives is a record only its author is watching.
 * Distribution is the fourth surface of the same provenance argument:
 * if a note reaches subscribers on the day it is recorded, its
 * existence on that day is witnessed by people who are not the author
 * and by infrastructure the author does not control.
 *
 * Two feeds, because two questions are being asked, and they have
 * genuinely different answers:
 *
 * - **The record** carries published objects only. It follows the
 *   publication policy exactly: a draft is not a publication, and this
 *   feed will not say it is.
 * - **The notebook** carries the notebook as it is actually kept —
 *   including entries still in draft, each one labelled with its
 *   status, version and recorded date. This is the feed the whole
 *   argument needs, because notebook entries are where the work first
 *   becomes visible, and priority attaches to when it became visible.
 *
 * The distinction is stated, not hidden: an entry that has not been
 * reviewed and published says so, in its own title, in every reader
 * that receives it. Nothing is presented as more finished than it is.
 */

export type Feed = {
 path: string;
 title: string;
 description: string;
 /** What a subscriber is choosing, in one line, for the Follow panel. */
 blurb: string;
 items: () => PublicationRecord[];
};

/** Notebook entries, newest first, by the date each was recorded. */
const notebookEntries = () =>
 records.filter(record => record.kind === "notebook")
  .sort((a, b) => entryDate(b).localeCompare(entryDate(a)));

/** Published records, newest first, by first publication. */
const publishedEntries = () =>
 [...publishedRecords()].sort((a, b) => entryDate(b).localeCompare(entryDate(a)));

export const FEEDS: Record<"notebook" | "record", Feed> = {
 notebook: {
  path: "/notebook/feed.xml",
  title: "Chris Hay — The notebook",
  description: "Notebook entries as they are recorded. Drafts are included and labelled with their status, version and recorded date.",
  blurb: "New ideas, experiments and essays, as they are recorded. Includes labelled working drafts.",
  items: notebookEntries,
 },
 record: {
  path: "/record/feed.xml",
  title: "Chris Hay — The record",
  description: "Records published to the Chris Hay record. Drafts are omitted.",
  blurb: "Everything published to the Chris Hay record.",
  items: publishedEntries,
 },
};

/** The date a feed dates an entry by: publication where there is one, else the recorded date. */
export const entryDate = (record: PublicationRecord) => record.revised || record.published || record.created;

/**
 * The status a subscriber is handed with the entry. A draft that
 * arrives looking like a publication is the one thing these feeds must
 * never do, so the state leads the description rather than trailing it.
 */
export const entryState = (record: PublicationRecord) =>
 record.publication === "published"
  ? `PUBLISHED ${record.published} · V${record.version}`
  : `${record.publication.toUpperCase()} · V${record.version} · RECORDED ${record.created}`;

/**
 * The identity of an entry in a reader. A published version has an
 * immutable snapshot URL and is a permalink; a draft has no such URL,
 * so it is identified by a URN and says it is not a link. Both carry
 * the version, so a revision arrives as the new object it is rather
 * than silently rewriting the old one.
 */
export const entryGuid = (record: PublicationRecord) =>
 record.publication === "published"
  ? { value: `${SITE}/records/${record.id}/${record.version}`, permalink: true }
  : { value: `urn:chrishayuk:record:${record.id}:${record.version}`, permalink: false };

export function renderFeed(feed: Feed): string {
 const entries = feed.items();
 const self = `${SITE}${feed.path}`;
 const built = entries.length ? new Date(`${entryDate(entries[0])}T00:00:00Z`) : new Date(0);
 const items = entries.map(record => {
  const guid = entryGuid(record);
  const link = `${SITE}${recordPath(record)}`;
  return `<item><title>${x(record.title)}</title><link>${x(link)}</link>`
   + `<guid isPermaLink="${guid.permalink}">${x(guid.value)}</guid>`
   + `<description>${x(`${entryState(record)} — ${record.abstract}`)}</description>`
   + `<dc:creator>${x(record.authors.join(", "))}</dc:creator>`
   + `<pubDate>${new Date(`${entryDate(record)}T00:00:00Z`).toUTCString()}</pubDate>`
   + record.concepts.map(concept => `<category>${x(concept)}</category>`).join("")
   + `</item>`;
 }).join("");
 return `<?xml version="1.0" encoding="UTF-8"?>`
  + `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">`
  + `<channel><title>${x(feed.title)}</title><link>${SITE}</link>`
  + `<atom:link href="${x(self)}" rel="self" type="application/rss+xml"/>`
  + `<description>${x(feed.description)}</description><language>en</language>`
  + `<lastBuildDate>${built.toUTCString()}</lastBuildDate>`
  + `<copyright>© Chris Hay</copyright>`
  + `${items}</channel></rss>`;
}

export const feedResponse = (feed: Feed) =>
 new Response(renderFeed(feed), { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=600" } });

/** JSON Feed follows the notebook by default, with explicit editorial state. */
export function jsonFeed(feed: Feed, path: string) {
 return {version:"https://jsonfeed.org/version/1.1",title:feed.title,home_page_url:SITE,feed_url:`${SITE}${path}`,description:feed.description,authors:[{name:"Chris Hay",url:SITE}],items:feed.items().map(record=>({
  id:entryGuid(record).value,url:`${SITE}${recordPath(record)}`,title:record.title,summary:record.dek,content_text:`${entryState(record)} — ${record.abstract}`,
  ...(record.publication==="published" && record.published ? {date_published:`${record.published}T00:00:00Z`}:{}),
  date_modified:`${entryDate(record)}T00:00:00Z`,authors:record.authors.map(name=>({name})),tags:record.concepts,
  _chrishayuk:{state:record.publication,version:record.version,recorded_at:record.created,...(record.revised?{revised_at:record.revised}:{})},
 }))};
}
