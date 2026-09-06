import { pageMetadata } from "@/lib/metadata";
import { citationRecord } from "@/lib/citations";
import {panelistIntroduction} from "@/lib/ibm-appearances";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getRecord, sectionFor, recordPath } from "@/lib/records";
import { RecordPage } from "@/components/RecordPage";
import { MoeCollection } from "@/components/MoeCollection";
type Props={params:Promise<{section:string;slug:string}>;searchParams:Promise<{sort?:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const{section,slug}=await params;const r=getRecord(slug);if(section==="film"&&slug==="mixture-of-experts")return pageMetadata("Mixture of Experts",panelistIntroduction,"/film/mixture-of-experts");if(!r)return{title:"Record not found"};const meta=pageMetadata(r.title,r.abstract,recordPath(r),undefined,citationRecord(r)||undefined);return r.visibility==="unlisted"?{...meta,robots:{index:false,follow:false}}:meta;}
export default async function Page({params,searchParams}:Props){const{section,slug}=await params;if(section==="film"&&slug==="mixture-of-experts")return <MoeCollection sort={(await searchParams).sort}/>;const r=getRecord(slug);if(!r||sectionFor(r)!==section)notFound();if(r.youtubeId)redirect(recordPath(r));return <RecordPage record={r}/>;}
