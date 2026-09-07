import { readershipReport } from "@/lib/readership/report";

/**
 * The same counts /readership prints, in the form a program wants —
 * including the definitions and the caveats, because a number lifted
 * out of this document without them is a claim this site did not make.
 */
export async function GET() {
 return Response.json(await readershipReport(), {
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=300", "Access-Control-Allow-Origin": "*" },
 });
}
export const dynamic = "force-dynamic";
