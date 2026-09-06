# Unlisted previews

A record can be deployed to production with a working URL while appearing in no index.
This is for reviewing a draft in place — real fonts, real film players, real HAUSE forms,
a real phone — before deciding whether it belongs in the publication at all.

Set one field:

```ts
{ ...draft, visibility: "unlisted", id: "N-EXAMPLE", slug: "a-note-in-review", … }
```

`N-AUTHORITY` was reviewed this way and is now listed. Nothing is unlisted at present; the
mechanism and its test remain, because the next note will want it.

## What that changes

The record resolves at its canonical path, `/notebook/<slug>`. The URL does not change when
it is later listed, so a review link stays valid and no redirect is needed.

Everywhere else it is absent:

| Surface | Excluded by |
|---|---|
| `/notebook`, `/ideas`, `/research`, section indexes | `records` |
| `/record` catalogue and its search | `lib/catalogue.ts` (default source `records`) |
| `/api/graph`, `/api/search`, `/ask` | `lib/graph.ts` |
| `/api/records`, `/api/concepts`, `/rss.xml`, `/feed.json` | `indexedRecords()` |
| `/sitemap.xml` | `indexedRecords()` |
| `/thread/*` reading order | `lib/threads.ts` |
| “Follow the record” on other pages | `components/RecordPage.tsx` |
| Search engines | `robots: { index: false, follow: false }` |

The page carries a visible `UNLISTED PREVIEW · NOT PUBLISHED` notice, so a shared link
cannot be mistaken for a published record.

## Why it is built this way

`lib/records.ts` exposes two arrays. `allRecords` is everything and is used for
*resolution* — `getRecord` reads it, which is what makes the URL work. `records` is the
listed subset, and every index, feed, catalogue and graph surface reads that one.

The split matters: a listing surface added later reads `records` because that is the
obvious name, and therefore excludes previews without anyone remembering to. The mechanism
fails closed. `allRecords` is the deliberate, unusual import.

The same applies to interactive studies in `lib/threads.ts`: a study marked
`visibility: "unlisted"` is withheld from the thread and from the graph.

## Threads

A thread is composed in full and published without its unlisted members, so numbering stays
correct and the steps rejoin *in place* when the record is listed. While a member is
unlisted, its page shows no thread navigation — that part of the layout is only reviewable
once it is listed.

Thread copy must therefore read correctly in both states. Do not count members in a thread
abstract; `mapThread` says “through the visual notebooks”, not “through four visual
notebooks”, for exactly this reason.

## Reviewing one

Deploy as normal — a passing push to `main` ships the Fly app. Then open the URL directly.
Nothing links to it, so keep the link somewhere you can find it; there is deliberately no
index of previews, because that index would itself be a listing.

`tests/publication.test.ts` asserts the whole contract: every unlisted record resolves by
id and slug, and is absent from the listed set, the catalogue, the graph, Ask, the sitemap
source, the threads and every `related` list. It also asserts the notice and the noindex
metadata are still wired. The test is written against `allRecords`, so it covers any future
preview without being edited.

## Listing it

Delete the `visibility` field from the record, and from any study in `lib/threads.ts` that
should appear with it. Nothing else changes — same URL, same ID, same version. Then check
the surfaces it rejoins: the notebook index count, the thread numbering, any thread copy
that assumed the shorter sequence, and `scripts/check-deployment.mjs`, which asserts the
thread's step count and should now assert the note is listed rather than hidden.

Listing is still not publishing. A listed record remains a draft until it gets a real
publication date and an immutable snapshot through `scripts/publish-record.ts`.
