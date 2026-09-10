import { OBSERVATORY_COOKIE, observatoryAdmits, observatoryEnabled } from "@/lib/machine/access";
import { annotate } from "@/lib/machine/feedback";
import { SITE } from "@/lib/records";

/**
 * The editorial act, and the only writer that is not a visitor.
 *
 * Authenticated by the same secret as the page. An unauthenticated
 * caller gets the same 404 the page gives, so this adds no surface a
 * visitor can find, and no visitor can cause a note to exist.
 */
export async function POST(request: Request): Promise<Response> {
 const cookie = request.headers.get("cookie") ?? "";
 const presented = cookie.split(";").map(part => part.trim())
  .find(part => part.startsWith(`${OBSERVATORY_COOKIE}=`))?.slice(OBSERVATORY_COOKIE.length + 1);

 if (!observatoryEnabled() || !observatoryAdmits(presented)) {
  return new Response("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
 }

 const form = await request.formData();
 const id = Number(form.get("id"));
 const note = String(form.get("note") ?? "");
 if (Number.isInteger(id) && id > 0) await annotate(id, note);

 return new Response(null, {
  status: 303,
  headers: { Location: `${SITE}/machine-observatory`, "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
 });
}
