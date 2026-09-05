import {recordGraph} from "@/lib/graph";
export function GET(){return Response.json(recordGraph());}
