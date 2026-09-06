import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { videoObjectLd, breadcrumbLd } from "@chrishayuk/hause/seo";
import Link from "next/link";
import {notFound} from "next/navigation";
import {getVideo,videoConcepts,videoWork,transcriptFor,videoReferences,videoCitation,durationLabel,viewLabel,youtube,ibm,videoRetrievedAt,videoPath} from "@/lib/youtube";
import {getRecord,recordPath,SITE,records} from "@/lib/records";
import {VideoScreening} from "@/components/VideoScreening";
import {previewFor} from "@/components/YouTubeCollection";
import {Reference} from "@/components/Reference";
type Props={params:Promise<{id:string}>;searchParams:Promise<{t?:string}>};
export async function generateMetadata({params}:Props){const{id}=await params;const v=getVideo(id);return v?pageMetadata(v.title,v.description.split("\n\n")[0]||v.title,videoPath(v),v.poster,videoCitation(v)):{title:"Film not found"};}
export default async function Page({params,searchParams}:Props){
 const{id}=await params;const v=getVideo(id);if(!v)notFound();const{t}=await searchParams;const offset=Number(t)||0;const start=Math.max(0,Math.min(offset,v.duration||0));
 const transcript=transcriptFor(v.youtubeId);const related=videoWork(v).map(getRecord).filter(r=>r!==undefined);
 const notebook=records.filter(r=>r.kind==="notebook"&&r.related.includes(v.id));
 const structured=videoObjectLd({citation:videoCitation(v),pageUrl:`${SITE}${videoPath(v)}`,thumbnailUrl:v.poster.startsWith("/")?`${SITE}${v.poster}`:v.poster,embedUrl:`https://www.youtube-nocookie.com/embed/${v.youtubeId}`,durationSeconds:v.duration,uploadDate:v.uploadedAt||undefined,participants:v.participants});
 const crumbs=breadcrumbLd([{name:"Film",url:`${SITE}/film`},{name:v.collection||"YouTube",url:`${SITE}${v.producer==="IBM"?"/film/mixture-of-experts":"/film/youtube"}`},{name:v.title,url:`${SITE}${videoPath(v)}`}]);
 return <main id="main" className="screening-page"><JsonLd data={[structured,crumbs]}/>
 <header className="screening-title"><nav className="breadcrumbs record-voice" aria-label="Breadcrumb"><Link href="/film">FILM</Link><span>/</span><Link href={v.producer === "IBM"?"/film/mixture-of-experts":"/film/youtube"}>{v.producer === "IBM"?"IBM / MIXTURE OF EXPERTS":"YOUTUBE"}</Link></nav><h1>{v.title}</h1><div className="record-bar record-voice"><span>{v.id}</span><span>{durationLabel(v.duration)}</span>{v.published&&<span>PUBLISHED ON YOUTUBE {v.published}</span>}<a href="#cite">CITE ↓</a></div></header>
 <p className="film-answer-first">{v.description.split("\n\n")[0]||`Chris Hay’s “${v.title}”, a film published on YouTube. Full description and transcript are not yet indexed.`}</p>
 <VideoScreening video={v} preview={previewFor(v)} passages={transcript?.passages||[]} initialStart={start}/>
 <div className="screening-details"><section className="film-description"><p className="kicker record-voice">{v.producer === "IBM"?"ABOUT THE EPISODE / IBM":"FROM CHRIS / ORIGINAL VIDEO DESCRIPTION"}</p>{v.description?<p>{v.description}</p>:<p>Chris Hay’s “{v.title}”. This catalogue entry currently contains the channel listing; a full description and transcript have not yet been imported.</p>}<a className="text-link" href={v.url}>WATCH THE ORIGINAL ON YOUTUBE ↗</a></section>
 {related.length>0&&<section className="related-records"><h2>CONNECTED WORK / FROM THE VIDEO METADATA</h2>{related.map(r=><Link href={recordPath(r)} key={r.id}>{r.title}<span>↗</span></Link>)}</section>}
 {notebook.length>0&&<section className="related-records"><h2>AFTER THE FILM / FROM THE NOTEBOOK</h2><p className="notebook-related-context">The questions, experiments and follow-ups connected to this conversation. These are working editorial notes.</p>{notebook.map(r=><Link href={recordPath(r)} key={r.id}>{r.title}<span>↗</span></Link>)}</section>}
 <section className="film-concepts"><h2 className="record-voice">EXPLORE RELATED SUBJECTS</h2><p>Discovery links inferred from the title and description.</p><div>{videoConcepts(v).map(c=><Link key={c} href={`/ask?q=${encodeURIComponent(c.replaceAll("-"," "))}`}>{c.replaceAll("-"," ")} ↗</Link>)}</div></section>
 <section className="sources" id="source-record"><h2>SOURCE RECORD</h2><p>{v.producer === "IBM"?"Produced and published by IBM. Chris Hay appears as a participant.":"Created and published by Chris Hay on YouTube."} Catalogued {videoRetrievedAt(v).slice(0,10)}. {viewLabel(v)} at retrieval{v.viewsApproximate?" (rounded by YouTube)":""}.</p>{v.sourcePage&&<p><a href={v.sourcePage}>IBM / MIXTURE OF EXPERTS ↗</a></p>}<p>Film publication dates are retained separately from catalogue retrieval dates. Citations below identify the original film.</p><a href={`/api/record/${v.id}`}>MACHINE-READABLE RECORD ↗</a></section>
 <Reference formats={videoReferences(v)} draft={false} id={v.id}/></div></main>;
}
