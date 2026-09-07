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
 */
const MACHINE_DOCUMENTS = [
 "/robots.txt", "/sitemap.xml", "/follow.json", "/feed.json", "/rss.xml",
 "/record/feed.xml", "/record/feed.json", "/notebook/feed.xml",
 "/api/records", "/api/record", "/api/graph", "/api/search", "/api/citations", "/api/concepts", "/api/social", "/api/share", "/api/readership",
 "/llms.txt", "/readership",
];

let cache: ReadonlySet<string> | null = null;

export function visiblePaths(): ReadonlySet<string> {
 cache ??= new Set([
  ...canonicalPaths(),
  ...records.map(recordPath),
  ...allVideos.map(videoPath),
  ...publicationSnapshots.flatMap(snapshot => [`/records/${snapshot.record.id}`, `/records/${snapshot.record.id}/${snapshot.record.version}`]),
  ...MACHINE_DOCUMENTS,
 ]);
 return cache;
}

/** The machine-facing documents, for the surface breakdown to name them. */
export const machineDocuments = MACHINE_DOCUMENTS;
