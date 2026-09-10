import { OBSERVATORY_COOKIE, observatoryAdmits, observatoryEnabled } from "@/lib/machine/access";
import { SITE } from "@/lib/records";

/**
 * Exchange the key for a cookie, once, so the secret stops travelling in
 * URLs — where it would land in history, in a Referer, and in anything
 * that logs a query string.
 *
 * A wrong key and an unset key both 404, so probing this distinguishes
 * nothing.
 */
export async function GET(request: Request): Promise<Response> {
 const key = new URL(request.url).searchParams.get("key");
 if (!observatoryEnabled() || !observatoryAdmits(key)) {
  return new Response("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
 }
 return new Response(null, {
  status: 303,
  headers: {
   Location: `${SITE}/machine-observatory`,
   "Set-Cookie": `${OBSERVATORY_COOKIE}=${key}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
   "Cache-Control": "no-store",
   "X-Robots-Tag": "noindex",
  },
 });
}
