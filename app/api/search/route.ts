import {searchGraph} from "@/lib/graph";
export function GET(request:Request){const q=(new URL(request.url).searchParams.get("q")||"").slice(0,500);return Response.json({query:q,mode:"source-retrieval",results:searchGraph(q)});}
