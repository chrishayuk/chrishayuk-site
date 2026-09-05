"use client";
import Link from "next/link";
import {useState} from "react";
import {channelVideos,filterVideos,videoPath,durationLabel,viewLabel} from "@/lib/youtube";
export function VideoArchive(){
 const [query,setQuery]=useState("");const [format,setFormat]=useState("all");const [sort,setSort]=useState("channel");
 const results=filterVideos(query,format,sort);
 return <section className="video-archive" id="archive" data-hause-act="sequence"><div className="archive-controls">
 <label className="archive-search"><span className="record-voice">SEARCH THE FILMS</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="A question, a model, an idea…"/></label>
 <label><span className="record-voice">FORMAT</span><select value={format} onChange={e=>setFormat(e.target.value)}><option value="all">All films</option><option value="video">Videos</option><option value="short">Shorts</option></select></label>
 <label><span className="record-voice">ORDER</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="channel">Channel order</option><option value="views">Most viewed</option><option value="title">Title A–Z</option></select></label></div>
 <p role="status" className="archive-count record-voice">{results.length} / {channelVideos.length} FILMS</p>
 <div className="archive-rows">{results.map((v,i)=><Link href={videoPath(v)} key={v.id} className="archive-row"><span className="archive-number record-voice">{String(i+1).padStart(3,"0")}</span><div className="archive-image"><img src={v.poster} alt="" loading="lazy" width="480" height="360"/></div><div><p className="record-voice">{v.format.toUpperCase()} · {durationLabel(v.duration)}{v.published?` · ${v.published}`:""}</p><h2>{v.title}</h2><p className="archive-views record-voice">{viewLabel(v)}</p></div><span className="archive-arrow" aria-hidden="true">↗</span></Link>)}</div>
 {results.length===0&&<p className="archive-empty">No films match that search. Try another phrase or choose all formats.</p>}
 </section>;
}
