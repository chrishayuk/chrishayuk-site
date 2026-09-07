import { followSignal } from "@/lib/follow";
/**
 * A public publication signal. No subscriber list, no authentication and
 * nothing learned about the caller — the watching happens in the
 * reader's own tools. Cached for ten minutes: this is designed to be
 * polled, and polling it should be cheap for both sides.
 */
export const GET = () =>
 Response.json(followSignal(), { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=600", "Access-Control-Allow-Origin": "*" } });
