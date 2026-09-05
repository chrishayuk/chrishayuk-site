import { notFound } from "next/navigation";
import { getVersion } from "@/lib/records";
import { RecordPage } from "@/components/RecordPage";
export default async function Version({params}:{params:Promise<{id:string;version:string}>}){const{id,version}=await params;const snapshot=getVersion(id,version);if(!snapshot)notFound();return <RecordPage record={snapshot.record}/>;}
