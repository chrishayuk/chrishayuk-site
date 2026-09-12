import { pageMetadata } from "@/lib/metadata";
import { citationRecord } from "@/lib/citations";
import { notFound } from "next/navigation";
import { getVersion } from "@/lib/records";
import { RecordPage } from "@/components/RecordPage";
export default async function Version({params}:{params:Promise<{id:string;version:string}>}){const{id,version}=await params;const snapshot=getVersion(id,version);if(!snapshot)notFound();return <RecordPage record={snapshot.record} canonicalPath={`/records/${id}/${version}`}/>;}

export async function generateMetadata({params}:{params:Promise<{id:string;version:string}>}){const{id,version}=await params;const snapshot=getVersion(id,version);return snapshot?pageMetadata(snapshot.record.title,snapshot.record.abstract,`/records/${id}/${version}`,undefined,citationRecord(snapshot.record)||undefined):{title:"Version not found"};}
