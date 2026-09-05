import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getRecord, sectionFor, recordPath } from "@/lib/records";
import { RecordPage } from "@/components/RecordPage";
import { MoeCollection } from "@/components/MoeCollection";
type Props={params:Promise<{section:string;slug:string}>;searchParams:Promise<{sort?:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const{section,slug}=await params;const r=getRecord(slug);return{title:section==="film"&&slug==="mixture-of-experts"?"Mixture of Experts":r?.title||"Record not found",description:r?.abstract};}
export default async function Page({params,searchParams}:Props){const{section,slug}=await params;if(section==="film"&&slug==="mixture-of-experts")return <MoeCollection sort={(await searchParams).sort}/>;const r=getRecord(slug);if(!r||sectionFor(r)!==section)notFound();if(r.youtubeId)redirect(recordPath(r));return <RecordPage record={r}/>;}
