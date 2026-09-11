import {retrieveGraph, type GraphScope} from "@/lib/graph";

/**
 * Source retrieval over the published corpus.
 *
 * It shares `retrieveGraph` with /api/machines/ask rather than holding its
 * own query handling. It used to hold its own, and the two disagreed about
 * one corpus for as long as they did: this endpoint required every term to
 * appear in a single record and offered no fallback, so `llms.txt` returned
 * nothing while ask returned results, and `agent discovery machine readable`
 * returned nothing while the corpus plainly held the answer.
 *
 * Three separate blind visitors reported some form of that. One of them found
 * this site's own primary evidence on the question it had been asked only
 * because a path appeared in a telemetry dump, having been told by this
 * endpoint that nothing matched.
 *
 * `used_terms` is the honest half of the fix. `null` means the question was
 * answered as asked; `[]` means nothing in it survived and the empty result is
 * an absence rather than a ranking; a list means the question was narrowed to
 * the words this CORPUS contains. Those are the site's own words, so naming
 * them echoes nothing back to the caller.
 */
export function GET(request:Request){
 const params=new URL(request.url).searchParams;const q=(params.get("q")||"").slice(0,500);
 const scope=(["records","films","concepts"].includes(params.get("scope")||"")?params.get("scope"):"all") as GraphScope;
 const includeDrafts=params.get("drafts")!=="exclude";
 const {results,usedTerms}=retrieveGraph(q,{scope,includeDrafts});
 return Response.json({query:q,mode:"source-retrieval",scope,includeDrafts,used_terms:usedTerms,results});
}
