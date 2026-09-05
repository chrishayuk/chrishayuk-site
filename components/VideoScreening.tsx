"use client";
import { FilmChapters } from "@chrishayuk/hause/components/FilmChapters";
import { TimedTranscript } from "@chrishayuk/hause/components/TimedTranscript";
import {useRef,useState} from "react";
import {FilmPlayer} from "./FilmPlayer";
import {durationLabel,type ChannelVideo,type Passage} from "@/lib/youtube";
export function VideoScreening({video,preview,passages,initialStart=0}:{video:ChannelVideo;preview?:string;passages:Passage[];initialStart?:number}){
 const [start,setStart]=useState(initialStart);const [request,setRequest]=useState(0);const screen=useRef<HTMLDivElement>(null);
 function seek(time:number){setStart(time);setRequest(n=>n+1);screen.current?.scrollIntoView({behavior:"instant",block:"center"});}
 return <><div ref={screen} className="screening-frame"><FilmPlayer video={video} preview={preview} priority start={start} playRequest={request}/></div>
 <div className="screening-details"><FilmChapters chapters={video.chapters} onSeek={seek}/><TimedTranscript passages={passages} onSeek={seek} sourceAt={time=>`${video.url}&t=${Math.floor(time)}`} provenance="Automatic English captions from YouTube, preserved as spoken and not yet reviewed. Names, code and technical terms may contain transcription errors."/></div>
 </>;
}
