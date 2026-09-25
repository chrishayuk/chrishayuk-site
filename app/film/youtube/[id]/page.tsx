import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { videoObjectLd, breadcrumbLd } from "@chrishayuk/hause/seo";
import Link from "next/link";
import { ThreadNavigation } from "@/components/ThreadNavigation";
import {notFound} from "next/navigation";
import {getVideo,videoConcepts,videoWork,transcriptFor,videoReferences,videoCitation,durationLabel,viewLabel,videoRetrievedAt,videoPath} from "@/lib/youtube";
import {getRecord,recordPath,SITE,records} from "@/lib/records";
import {VideoScreening} from "@/components/VideoScreening";
import {previewFor} from "@/components/YouTubeCollection";
import {Reference} from "@/components/Reference";
import { AnchoredDisclosure } from "@chrishayuk/hause/components/AnchoredDisclosure";
import {latestVideo} from "@/lib/youtube";
type Props={params:Promise<{id:string}>;searchParams:Promise<{t?:string}>};
export async function generateMetadata({params}:Props){const{id}=await params;const v=getVideo(id);return v?pageMetadata(v.title,v.description.split("\n\n")[0]||v.title,videoPath(v),v.poster,videoCitation(v)):{title:"Film not found"};}
export default async function Page({params,searchParams}:Props){
 const{id}=await params;const v=getVideo(id);if(!v)notFound();const{t}=await searchParams;const offset=Number(t)||0;const start=Math.max(0,Math.min(offset,v.duration||0));
 const transcript=transcriptFor(v.youtubeId);const related=videoWork(v).map(getRecord).filter(r=>r!==undefined);
 const notebook=records.filter(r=>r.kind==="notebook"&&r.related.includes(v.id));
 const structured=videoObjectLd({citation:videoCitation(v),pageUrl:`${SITE}${videoPath(v)}`,thumbnailUrl:v.poster.startsWith("/")?`${SITE}${v.poster}`:v.poster,embedUrl:`https://www.youtube-nocookie.com/embed/${v.youtubeId}`,durationSeconds:v.duration,uploadDate:v.uploadedAt||undefined,participants:v.participants});
 const crumbs=breadcrumbLd([{name:"Film",url:`${SITE}/film`},{name:v.collection||"YouTube",url:`${SITE}${v.producer==="IBM"?"/film/mixture-of-experts":"/film/youtube"}`},{name:v.title,url:`${SITE}${videoPath(v)}`}]);
 return <main id="main" className="screening-page" data-film-journey={v.youtubeId === latestVideo.youtubeId ? "true" : undefined}><JsonLd data={[structured,crumbs]}/>
 <nav className="screening-breadcrumbs" aria-label="Breadcrumb"><div><Link href="/film">Film</Link><span aria-hidden="true">/</span><Link href={v.producer === "IBM"?"/film/mixture-of-experts":"/film/youtube"}>{v.producer === "IBM"?"Mixture of Experts":"YouTube"}</Link></div><span>{durationLabel(v.duration)}</span></nav>
 <VideoScreening video={v} preview={previewFor(v)} passages={transcript?.passages||[]} initialStart={start}>
  <header className="screening-title">
   <div className="screening-credit"><span>{v.producer === "IBM" ? "IBM / With Chris Hay" : "A film by Chris Hay"}</span>{v.published&&<time dateTime={v.published}>{new Date(`${v.published}T12:00:00Z`).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"})}</time>}<a href="#cite">Cite this film</a></div>
   <div className="screening-introduction"><h1>{v.title}</h1><p className="film-answer-first">{v.description.split("\n\n")[0]||`Chris Hay’s “${v.title}”, published on YouTube.`}</p></div>
  </header>
 </VideoScreening>
 <div className="screening-details screening-reading"><ThreadNavigation id={v.id}/>
 <AnchoredDisclosure className="screening-description" label="About this film"><section id="film-description" className="film-description"><p className="screening-source-label">{v.producer === "IBM"?"Original episode description / IBM":"Original video description / Chris Hay"}</p>{v.description?<p>{v.description}</p>:<p>A full description has not yet been imported.</p>}<a className="text-link" href={v.url}>Watch the original on YouTube ↗</a></section></AnchoredDisclosure>
 {related.length>0&&<section className="related-records"><h2>Connected work</h2>{related.map(r=><Link href={recordPath(r)} key={r.id}>{r.title}<span>↗</span></Link>)}</section>}
 {notebook.length>0&&<section className="related-records"><h2>From the Notebook</h2><p className="notebook-related-context">The questions, experiments and follow-ups connected to this conversation. These are working editorial notes.</p>{notebook.map(r=><Link href={recordPath(r)} key={r.id}>{r.title}<span>↗</span></Link>)}</section>}
 <AnchoredDisclosure className="screening-record" label="Sources & citation">
 <section className="film-concepts"><h2 className="record-voice">EXPLORE RELATED SUBJECTS</h2><p>Discovery links inferred from the title and description.</p><div>{videoConcepts(v).map(c=><Link key={c} href={`/ask?q=${encodeURIComponent(c.replaceAll("-"," "))}`}>{c.replaceAll("-"," ")} ↗</Link>)}</div></section>
 <section className="sources" id="source-record"><h2>SOURCE RECORD</h2><p>{v.producer === "IBM"?"Produced and published by IBM. Chris Hay appears as a participant.":"Created and published by Chris Hay on YouTube."} Catalogued {videoRetrievedAt(v).slice(0,10)}. {viewLabel(v)} at retrieval{v.viewsApproximate?" (rounded by YouTube)":""}.</p>{v.sourcePage&&<p><a href={v.sourcePage}>IBM / MIXTURE OF EXPERTS ↗</a></p>}<p>Film publication dates are retained separately from catalogue retrieval dates. Citations below identify the original film.</p><a href={`/api/record/${v.id}`}>MACHINE-READABLE RECORD ↗</a></section>
 <Reference formats={videoReferences(v)} draft={false} id={v.id}/></AnchoredDisclosure></div></main>;
}
