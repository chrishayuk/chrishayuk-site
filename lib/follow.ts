import { publicationSnapshots, recordPath, SITE } from "./records.ts";
import { authoredRecords } from "./canonical.ts";
import { entryDate, FEEDS } from "./feeds.ts";
import { firstCapture } from "./archive.ts";
import type { PublicationRecord } from "./types";

/**
 * FOLLOW.JSON — the publication signal, for readers who are programs.
 *
 * A feed reader wants items. An agent watching on someone's behalf wants
 * something duller and more precise: what exists, which version it is,
 * when it was recorded, and whether the change since last time was worth
 * waking its owner for. This endpoint answers exactly that and nothing
 * else. It has no subscribers, no authentication and no identifiers,
 * because it never learns who is asking — the polling happens in the
 * reader's own tools, and this site acquires no relationship with them.
 *
 * Three properties make it safe to poll:
 *
 * - **`updated_at` is derived from the content, never from the clock.**
 *   A document that changed its own timestamp on every request would
 *   look like news on every poll, and an agent diffing it would cry wolf
 *   forever. Two polls with nothing published in between return
 *   byte-identical documents.
 * - **`material_revision` is a fact, not a guess.** It is true when an
 *   earlier version of that record exists. Prose edits inside a version
 *   never produce one, so "ignore minor revisions" is a rule this
 *   endpoint can actually support.
 * - **A draft says it is a draft.** There is no `published_at` on
 *   unpublished work, because inventing one is precisely the claim this
 *   whole record exists to make impossible. `recorded_at` is always
 *   present, and it is the date the work first became publicly readable.
 */

/** How many records the signal carries. Enough to catch up, not an archive. */
const LATEST = 20;

/**
 * The shared ChatGPT scheduled task that watches this endpoint, if one
 * has been published.
 *
 * A shared task link is created by hand in a ChatGPT account and cannot
 * be minted through an API, so this is the one fact the site cannot
 * derive: paste the chatgpt.com/s/... URL here and the Follow panel
 * grows a third option. Left null, it offers none — an affordance that
 * does not exist is absent, exactly like an identifier that does not.
 */
export const CHATGPT_TASK: string | null = null;

/** True when this record has an earlier version on file — a real revision. */
export function isMaterialRevision(record: PublicationRecord): boolean {
 return publicationSnapshots.some(s => {
  if(s.record.id!==record.id)return false;
  const a=s.record.version.split(".").map(Number), b=record.version.split(".").map(Number);
  for(let i=0;i<Math.max(a.length,b.length);i++){if((a[i]??0)!==(b[i]??0))return (a[i]??0)<(b[i]??0);}
  return false;
 });
}

export type FollowEntry = {
 id: string;
 version: string;
 title: string;
 kind: PublicationRecord["kind"];
 /** "draft" or "published" — the state, stated, never implied by a date. */
 state: PublicationRecord["publication"];
 /** When the work first became publicly readable. Always present. */
 recorded_at: string;
 updated_at: string;
 /** First publication. Absent on a draft, because a draft has none. */
 published_at?: string;
 material_revision: boolean;
 topics: string[];
 summary: string;
 url: string;
 /** The independent capture corroborating that date, where one exists. */
 archived_at?: string;
 archive_url?: string;
};

export function followEntries(): FollowEntry[] {
 return authoredRecords()
  .sort((a, b) => entryDate(b).localeCompare(entryDate(a)))
  .slice(0, LATEST)
  .map(record => {
   const url = `${SITE}${recordPath(record)}`;
   const capture = firstCapture(url);
   return {
    id: record.id,
    version: record.version,
    title: record.title,
    kind: record.kind,
    state: record.publication,
    recorded_at: `${record.created}T00:00:00Z`,
    updated_at: `${entryDate(record)}T00:00:00Z`,
    ...(record.publication === "published" && record.published ? { published_at: `${record.published}T00:00:00Z` } : {}),
    material_revision: isMaterialRevision(record),
    topics: record.concepts,
    summary: record.abstract,
    url,
    ...(capture ? { archived_at: `${capture.date}T00:00:00Z`, archive_url: capture.url } : {}),
   };
  });
}

export function followSignal() {
 const latest = followEntries();
 return {
  // Derived from the newest record, so an unchanged record set produces
  // an unchanged document. This is what makes the endpoint pollable.
  updated_at: latest[0]?.updated_at ?? "1970-01-01T00:00:00Z",
  site: SITE,
  author: "Chris Hay",
  policy: "A record is a draft until it is individually reviewed and published; drafts carry recorded_at and no published_at. material_revision is true only when an earlier version of that record exists, so edits within a version are not revisions. updated_at is derived from the newest record and does not move on its own.",
  feeds: {
   notebook: `${SITE}${FEEDS.notebook.path}`,
   record: `${SITE}${FEEDS.record.path}`,
   json: `${SITE}/feed.json`,
   record_json: `${SITE}/record/feed.json`,
  },
  record_index: `${SITE}/api/records`,
  latest,
 };
}
