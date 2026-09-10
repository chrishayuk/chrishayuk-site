import { threads } from "./threads.ts";
import { allRecords, records, indexedRecords, isListed, recordPath, SITE } from "./records.ts";

/**
 * THE CANONICAL SURFACE — the URLs this publication asks the world to
 * treat as addresses, and the smaller set it asks a third party to
 * keep a copy of.
 *
 * The two lists are deliberately different, and the difference is the
 * whole point of the file.
 *
 * `canonicalPaths` is the indexing surface: what the sitemap declares
 * exists. It follows the publication policy exactly — `indexedRecords`
 * decides, including public notebook drafts. Catalogue-only film stubs
 * stay available through their collections rather than dominating the sitemap.
 *
 * `archivePaths` is the evidence surface: what an independent archive
 * is asked to capture. It is NOT the same question. A notebook entry
 * that is publicly readable, dated and citable is an object whose
 * existence on a given day is worth corroborating, whether or not its
 * author has finished reviewing it. Priority attaches to the date the
 * work became visible, so the archive list follows visibility rather
 * than publication.
 *
 * Two exclusions are load-bearing:
 *
 * - **Unlisted previews, never.** A third-party capture cannot be
 *   withdrawn. A preview submitted by accident is published
 *   permanently, by someone else, whatever this site later decides.
 * - **Catalogued film records, never.** Those are editorial records of
 *   IBM's productions, not claims of Chris Hay's that need a priority
 *   trail — and there are 241 of them, which is an abuse of a free
 *   service rather than a provenance strategy.
 */

/** The pages that are always here, independent of any record. */
export const standingPaths = [
 "/", "/ideas", "/systems", "/objects", "/record", "/knowledge",
 "/film", "/notebook", "/research", "/about", "/colophon", "/accessibility", "/readership",
 "/machine-guestbook",
 "/film/youtube", "/film/youtube/archive", "/film/mixture-of-experts",
];

/** The indexing surface: standing pages, threads, and every indexed record. */
export function canonicalPaths(): string[] {
 return [...new Set([...standingPaths, ...threads.map(t => t.path), ...indexedRecords().filter(r => r.publication !== "catalogued").map(recordPath), ...records.filter(r => r.kind === "notebook").map(recordPath)])];
}

/** Records that carry a claim of Chris Hay's — the notebook, the questions, the work. */
export function authoredRecords() {
 return allRecords.filter(record => isListed(record) && record.kind !== "film");
}

/**
 * Standing pages that are indexed but never sent to the archive.
 *
 * /readership is a live counter, not a claim. Its content differs every
 * hour, so a third-party capture corroborates nothing about when any
 * work became readable — it would only pin one hour's traffic figures
 * in somebody else's permanent collection, and consume the submission
 * budget that exists for the record itself.
 *
 * /machine-guestbook is the same kind of object for the same reason: a
 * coarse daily observation of visitors, not a claim of Chris Hay's that
 * needs a priority trail.
 */
const unarchivedPaths = ["/readership", "/machine-guestbook"];

/** The evidence surface: what an independent archive is asked to capture. */
export function archivePaths(): string[] {
 return [...authoredRecords().sort((a,b) => Number(b.kind === "notebook") - Number(a.kind === "notebook")).map(recordPath), ...threads.map(t => t.path), ...standingPaths.filter(path => !unarchivedPaths.includes(path))];
}

/** A path as the absolute URL an archive is given. */
export const canonicalUrl = (path: string) => `${SITE}${path === "/" ? "/" : path}`;

export const canonicalUrls = () => canonicalPaths().map(canonicalUrl);
export const archiveUrls = () => archivePaths().map(canonicalUrl);
