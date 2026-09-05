import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getRecord, sectionFor, recordPath } from "@/lib/records";
import { RecordPage } from "@/components/RecordPage";
import { FilmIndex } from "@/components/FilmIndex";
type Props={params:Promise<{section:string;slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const{section,slug}=await params;const r=getRecord(slug);return{title:section==="film"&&slug==="mixture-of-experts"?"Mixture of Experts":r?.title||"Record not found",description:r?.abstract};}
export default async function Page({params}:Props){const{section,slug}=await params;if(section==="film"&&slug==="mixture-of-experts")return <main id="main"><FilmIndex collection/></main>;const r=getRecord(slug);if(!r||sectionFor(r)!==section)notFound();if(r.youtubeId)redirect(recordPath(r));return <RecordPage record={r}/>;}
