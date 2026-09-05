import type { PublicationRecord } from "./types";
export function stableJson(value: unknown): string {
 if (value === null || typeof value !== "object") return JSON.stringify(value);
 if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
 const object=value as Record<string,unknown>;
 return `{${Object.keys(object).filter(k=>object[k]!==undefined).sort().map(k=>`${JSON.stringify(k)}:${stableJson(object[k])}`).join(",")}}`;
}
export function validateRecord(record: PublicationRecord) {
 if(!/^[A-Z0-9-]+$/.test(record.id)||!/^[a-z0-9-]+$/.test(record.slug)) throw new Error("Invalid stable record identifier");
 if(!record.title||!record.abstract||!record.authors.length||!record.body.length)throw new Error("Record is missing substantive content");
 if(record.publication==="published"&&(!record.published||!/^\d{4}-\d{2}-\d{2}$/.test(record.published)))throw new Error("Published records need a first-publication date");
 if(!/^\d+\.\d+(?:\.\d+)?$/.test(record.version))throw new Error("Invalid version");
 return record;
}
export const escapeXml=(value:string)=>value.replace(/[<>&"']/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"}[c]!));
