import { publicationHistory } from "@/lib/provenance";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
 const { id } = await params;
 const history = publicationHistory(id);
 if (!history) return Response.json({ error: "Record not found" }, { status: 404 });
 return Response.json(history);
}
