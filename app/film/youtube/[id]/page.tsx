import Link from "next/link";
import {notFound} from "next/navigation";
import {getVideo,videoConcepts,videoWork,transcriptFor,videoReferences,durationLabel,viewLabel,youtube,ibm,videoRetrievedAt,videoPath} from "@/lib/youtube";
import {getRecord,recordPath,SITE} from "@/lib/records";
import {VideoScreening} from "@/components/VideoScreening";
import {previewFor} from "@/components/YouTubeCollection";
import {Reference} from "@/components/Reference";
type Props={params:Promise<{id:string}>;searchParams:Promise<{t?:string}>};
export async function generateMetadata({params}:Props){const{id}=await params;const v=getVideo(id);return{title:v?.title||"Film not found",description:v?.description.split("\n\n")[0]||v?.title};}
export default async function Page({params,searchParams}:Props){
 const{id}=await params;const v=getVideo(id);if(!v)notFound();const{t}=await searchParams;const offset=Number(t)||0;const start=Math.max(0,Math.min(offset,v.duration||0));
 const transcript=transcriptFor(v.youtubeId);const related=videoWork(v).map(getRecord).filter(r=>r!==undefined);
 const structured={"@context":"https://schema.org","@type":"VideoObject","@id":`${SITE}${videoPath(v)}`,name:v.title,description:v.description||v.title,thumbnailUrl:v.poster.startsWith("/")?`${SITE}${v.poster}`:v.poster,...(v.published?{uploadDate:v.published}:{}),...(v.duration?{duration:`PT${v.duration}S`}:{}),embedUrl:`https://www.youtube-nocookie.com/embed/${v.youtubeId}`,url:v.url,creator:v.producer === "IBM"?{"@type":"Organization",name:"IBM"}:{"@type":"Person",name:"Chris Hay"},...(v.producer === "IBM"?{actor:{"@type":"Person",name:"Chris Hay"}}:{}),isPartOf:{"@type":"CreativeWorkSeries",name:v.collection||"Chris Hay on YouTube",url:v.producer === "IBM"?ibm.playlistUrl:youtube.channelUrl}};
 return <main id="main" className="screening-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,"\\u003c")}}/>
 <header className="screening-title"><nav className="breadcrumbs record-voice" aria-label="Breadcrumb"><Link href="/film">FILM</Link><span>/</span><Link href={v.producer === "IBM"?"/film/mixture-of-experts":"/film/youtube"}>{v.producer === "IBM"?"IBM / MIXTURE OF EXPERTS":"YOUTUBE"}</Link></nav><h1>{v.title}</h1><div className="record-bar record-voice"><span>{v.id}</span><span>{durationLabel(v.duration)}</span>{v.published&&<span>PUBLISHED ON YOUTUBE {v.published}</span>}<a href="#cite">CITE ↓</a></div></header>
 <VideoScreening video={v} preview={previewFor(v)} passages={transcript?.passages||[]} initialStart={start}/>
 <div className="screening-details"><section className="film-description"><p className="kicker record-voice">{v.producer === "IBM"?"ABOUT THE EPISODE / IBM":"FROM CHRIS / ORIGINAL VIDEO DESCRIPTION"}</p>{v.description?<p>{v.description}</p>:<p>Chris Hay’s “{v.title}”. This catalogue entry currently contains the channel listing; a full description and transcript have not yet been imported.</p>}<a className="text-link" href={v.url}>WATCH THE ORIGINAL ON YOUTUBE ↗</a></section>
 {related.length>0&&<section className="related-records"><h2>CONNECTED WORK / FROM THE VIDEO METADATA</h2>{related.map(r=><Link href={recordPath(r)} key={r.id}>{r.title}<span>↗</span></Link>)}</section>}
 <section className="film-concepts"><h2 className="record-voice">EXPLORE RELATED SUBJECTS</h2><p>Discovery links inferred from the title and description.</p><div>{videoConcepts(v).map(c=><Link key={c} href={`/ask?q=${encodeURIComponent(c.replaceAll("-"," "))}`}>{c.replaceAll("-"," ")} ↗</Link>)}</div></section>
 <section className="sources"><h2>SOURCE RECORD</h2><p>{v.producer === "IBM"?"Produced and published by IBM. Chris Hay appears as a participant.":"Created and published by Chris Hay on YouTube."} Catalogued {videoRetrievedAt(v).slice(0,10)}. {viewLabel(v)} at retrieval{v.viewsApproximate?" (rounded by YouTube)":""}.</p>{v.sourcePage&&<p><a href={v.sourcePage}>IBM / MIXTURE OF EXPERTS ↗</a></p>}<p>Film publication dates are retained separately from catalogue retrieval dates. Citations below identify the original film.</p><a href={`/api/record/${v.id}`}>MACHINE-READABLE RECORD ↗</a></section>
 <Reference formats={videoReferences(v)} draft={false} id={v.id}/></div></main>;
}
