export function GET() {
  return Response.json({ status: "ok", commit: process.env.GIT_COMMIT || "local" }, { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}
export const dynamic = "force-dynamic";
