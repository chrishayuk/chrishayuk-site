import { NextResponse, type NextRequest } from "next/server";
import { classify } from "@/lib/readership/classify";
import { record } from "@/lib/readership/store";
import { MACHINE_INDEX_LINK } from "@/lib/machine/link-header";

/**
 * MACHINE READERSHIP — the measurement this site did not have.
 *
 * Everything that reads this publication without running JavaScript is
 * invisible to the Google tag in the layout: every training crawler,
 * every AI search indexer, every fetch an assistant makes because a
 * person asked it something, every feed poll, every citation check.
 * That is most of the audience this site was actually built for, and
 * until now none of it was counted anywhere.
 *
 * Proxy is the only place that sees all of it. It runs before rendering
 * on the Node.js runtime, and it sees the feeds, /follow.json, the
 * record API, robots.txt and the sitemap — the machine-facing documents
 * this site publishes on purpose — as well as the pages.
 *
 * It stays cheap and it stays silent. Classification is a handful of
 * regular expressions; verification is a binary search over addresses
 * their own providers publish; the write is one counter increment. The
 * response is never held for any of it, and a failure anywhere in here
 * costs a count, never a page.
 *
 * See docs/machine-readership.md and /readership.
 */
export function proxy(request: NextRequest) {
 try {
  const url = request.nextUrl;
  const classification = classify({
   pathname: url.pathname,
   userAgent: request.headers.get("user-agent"),
   referer: request.headers.get("referer"),
   utmSource: url.searchParams.get("utm_source"),
   host: request.headers.get("host"),
  });
  // The only use an address is put to, and the last place it exists.
  //
  // Fly sets `Fly-Client-IP` itself and a client cannot forge it. The
  // fallback takes the LAST entry of X-Forwarded-For, not the first:
  // earlier entries are whatever the caller chose to send, so trusting
  // them would let anyone claim to be Anthropic by adding a header —
  // which is the exact failure this whole verification step exists to
  // prevent.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",").at(-1);
  const ip = request.headers.get("fly-client-ip") ?? forwarded ?? request.headers.get("x-real-ip");
  void record(classification, ip?.trim() || null).catch(() => {});
 } catch {
  // Counting readers is never a reason to fail to serve one.
 }
 // The same pointer as the <link> in the head, for anything that reads
 // headers without parsing HTML — a HEAD request, a fetcher that never
 // renders, a client that looks at Link before deciding what to pull.
 const response = NextResponse.next();
 // See lib/machine/link-header.ts for why `describedby` rather than
 // `alternate`, and why the value lives there rather than inline.
 //
 // Reported by a blind visitor that had spent the preceding minutes
 // gathering evidence on which machine-facing conventions agents actually
 // follow. The header was one of the routes by which earlier visitors found
 // the machine surface at all, so it was load-bearing and wrong at once.
 response.headers.append("Link", MACHINE_INDEX_LINK);
 return response;
}

export const config = {
 matcher: [
  // Everything except build output, media, fonts and Fly's own health probe.
  "/((?!_next/|_vinext/|media/|fonts/|api/health|favicon\\.ico).*)",
 ],
};
