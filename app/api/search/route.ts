import {searchGraph, type GraphScope} from "@/lib/graph";
export function GET(request:Request){
 const params=new URL(request.url).searchParams;const q=(params.get("q")||"").slice(0,500);
 const scope=(["records","films","concepts"].includes(params.get("scope")||"")?params.get("scope"):"all") as GraphScope;
 const includeDrafts=params.get("drafts")!=="exclude";
 return Response.json({query:q,mode:"source-retrieval",scope,includeDrafts,results:searchGraph(q,{scope,includeDrafts})});
}
