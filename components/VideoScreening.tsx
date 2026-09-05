"use client";
import {useRef,useState} from "react";
import {FilmPlayer} from "./FilmPlayer";
import {durationLabel,type ChannelVideo,type Passage} from "@/lib/youtube";
export function VideoScreening({video,preview,passages,initialStart=0}:{video:ChannelVideo;preview?:string;passages:Passage[];initialStart?:number}){
 const [start,setStart]=useState(initialStart);const [request,setRequest]=useState(0);const screen=useRef<HTMLDivElement>(null);
 function seek(time:number){setStart(time);setRequest(n=>n+1);screen.current?.scrollIntoView({behavior:"instant",block:"center"});}
 return <><div ref={screen} className="screening-frame"><FilmPlayer video={video} preview={preview} priority start={start} playRequest={request}/></div>
 <div className="screening-details">{video.chapters.length>0&&<section className="film-chapters"><h2 className="record-voice">IN THE FILM</h2>{video.chapters.map(c=><button key={c.start} onClick={()=>seek(c.start)}><span className="record-voice">{durationLabel(c.start)}</span><span>{c.title}</span><span aria-hidden="true">↗</span></button>)}</section>}
 <section className="film-transcript" id="transcript"><h2>Transcript<span className="amber">.</span></h2>{passages.length>0?<><p>Automatic English captions from YouTube, preserved as spoken and not yet reviewed. Names, code and technical terms may contain transcription errors.</p><details><summary>READ THE TIMED TRANSCRIPT</summary>{passages.map(p=><div className="transcript-passage" id={`t-${Math.floor(p.start)}`} key={p.start}><button onClick={()=>seek(p.start)} aria-label={`Play from ${durationLabel(p.start)}`} className="record-voice">{durationLabel(p.start)} ▷</button><p>{p.text}</p><a href={`${video.url}&t=${Math.floor(p.start)}`} aria-label={`Original source at ${durationLabel(p.start)}`} className="record-voice">SOURCE ↗</a></div>)}</details></>:<p>This film’s transcript has not been indexed yet. Watch the original for its full content.</p>}</section></div>
 </>;
}
