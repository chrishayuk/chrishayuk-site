import { canonicalPaths } from "../canonical.ts";
import { publicationSnapshots, records, recordPath } from "../records.ts";
import { allVideos, videoPath } from "../youtube.ts";

/**
 * THE PATHS THIS PAGE IS WILLING TO NAME.
 *
 * A request path is a string the caller chose. /readership is public,
 * so anything not on this list is counted and reported as one line —
 * "other paths" — rather than printed. That removes the obvious way to
 * write text onto a published page by requesting a URL, and the equally
 * obvious way to bloat the store by requesting a million of them.
 *
 * It follows visibility, not publication. Unlisted previews are absent
 * for the same reason they are absent from the sitemap, the feeds and
 * the archive: naming one here would publish it.
 *
 * /machines is named here and deliberately not in the sitemap. It is
 * advertised to machines through /llms.txt rather than to indexers
 * through the canonical surface, which is what makes the question it
 * exists to ask — how a machine visitor found it — answerable from
 * these counters at all.
 *
 * THE THREE MACHINE ENDPOINTS WERE MISSING, and the omission was only
 * visible because MACHINE-RECIPROCITY-1 went looking for them. Every
 * request to /api/machines/declaration, /ask and /feedback since they
 * were built has been counted as "other paths" — so the one surface
 * this site exists to measure was the one surface its own instrument
 * could not name. The experiment would have read a real declaration and
 * a crawler hitting a typo as the same event.
 *
 * Naming them adds nothing a caller controls. They are this site's own
 * paths, fixed in this file, and a request for anything else still
 * collapses to "other paths" exactly as before.
 */
const MACHINE_DOCUMENTS = [
 "/robots.txt", "/sitemap.xml", "/follow.json", "/feed.json", "/rss.xml",
 "/record/feed.xml", "/record/feed.json", "/notebook/feed.xml",
 "/api/records", "/api/record", "/api/graph", "/api/search", "/api/citations", "/api/concepts", "/api/social", "/api/share", "/api/readership",
 "/api/machines/declaration", "/api/machines/ask", "/api/machines/feedback",
 "/llms.txt", "/readership", "/machines",
];

let cache: ReadonlySet<string> | null = null;

export function visiblePaths(): ReadonlySet<string> {
 cache ??= new Set([
  ...canonicalPaths(),
  ...records.map(recordPath),
  ...allVideos.map(videoPath),
  ...publicationSnapshots.flatMap(snapshot => [`/records/${snapshot.record.id}`, `/records/${snapshot.record.id}/${snapshot.record.version}`]),
  ...MACHINE_DOCUMENTS,
  // Markdown representations. Without these, every `.md` request collapses
  // to "other paths" — which is exactly how contact with the three machine
  // endpoints stayed invisible for as long as it did. The point of serving
  // Markdown is to find out whether agents use it, and that needs counting.
  ...records.map(record => `${recordPath(record)}.md`),
  "/api/markdown",
 ]);
 return cache;
}

/** The machine-facing documents, for the surface breakdown to name them. */
export const machineDocuments = MACHINE_DOCUMENTS;
