import { CitationExport } from "@chrishayuk/hause/components/CitationExport";
export function Reference({ formats, draft, id }: { formats: { id: string; label: string; text: string }[]; draft: boolean; id: string }) {
 return <CitationExport formats={formats} id={id} heading={draft?"REFERENCE THIS DRAFT":"CITE THIS RECORD"}
 context={draft?"An unpublished working record. These references identify the draft and omit a publication date. They become version-specific publication citations when the record is released.":undefined}/>;
}
