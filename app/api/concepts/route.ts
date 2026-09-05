import { publishedRecords } from "@/lib/records";
export function GET(){const records=publishedRecords();return Response.json({concepts:[...new Set(records.flatMap(r=>r.concepts))].sort().map(id=>({id,records:records.filter(r=>r.concepts.includes(id)).map(r=>r.id)}))});}
