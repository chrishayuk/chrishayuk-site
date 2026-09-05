import { indexedRecords } from "@/lib/records";
export function GET(){const records=indexedRecords();return Response.json({concepts:[...new Set(records.flatMap(r=>r.concepts))].sort().map(id=>({id,records:records.filter(r=>r.concepts.includes(id)).map(r=>r.id)}))});}
