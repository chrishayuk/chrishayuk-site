"use client";
import { FilmChapters } from "@chrishayuk/hause/components/FilmChapters";
import { TimedTranscript } from "@chrishayuk/hause/components/TimedTranscript";
import {useCallback,useEffect,useRef,useState,type ReactNode} from "react";
import {FilmPlayer} from "./FilmPlayer";
import {FilmReturn} from "./FilmReturn";
import {type ChannelVideo,type Passage} from "@/lib/youtube";
export function VideoScreening({video,preview,passages,initialStart=0,children}:{video:ChannelVideo;preview?:string;passages:Passage[];initialStart?:number;children?:ReactNode}){
 const [start,setStart]=useState(initialStart);const [request,setRequest]=useState(0);const screen=useRef<HTMLDivElement>(null);
 const [edition,setEdition]=useState(0);
 const stop=useCallback(()=>{
  if(!screen.current?.querySelector(".is-playing"))return;
  setRequest(0);setEdition(n=>n+1);
 },[]);
 useEffect(()=>{if(edition>0)screen.current?.querySelector<HTMLButtonElement>(".cinema-enter")?.focus({preventScroll:true});},[edition]);
 useEffect(()=>{
  const escape=(event:KeyboardEvent)=>{if(event.key==="Escape")stop();};
  window.addEventListener("keydown",escape);
  return()=>window.removeEventListener("keydown",escape);
 },[stop]);
 function seek(time:number){setStart(time);setRequest(n=>n+1);screen.current?.scrollIntoView({behavior:"instant",block:"center"});}
 return <><section className="screening-room" aria-label={`Screening: ${video.title}`}>
 <div ref={screen} className="screening-frame"><div className="screening-surface"><FilmPlayer key={edition} video={video} preview={preview} priority start={start} playRequest={request} stillOnly/></div></div>
 <div className="screening-controls"><FilmReturn/><div><button type="button" className="screening-stop" onClick={stop}>Stop film</button><a href={video.url}>Watch on YouTube ↗</a></div></div>
 </section>
 {children}
 <div className="screening-details screening-index"><FilmChapters chapters={video.chapters} onSeek={seek}/>{passages.length>0?<TimedTranscript passages={passages} onSeek={seek} sourceAt={time=>`${video.url}&t=${Math.floor(time)}`} provenance="Automatic English captions from YouTube, preserved as spoken and not yet reviewed. Names, code and technical terms may contain transcription errors."/>:<p className="screening-transcript-status" id="transcript">Transcript not yet available.</p>}</div>
 </>;
}
