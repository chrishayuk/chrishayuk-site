"use client";
import {useEffect,useId,useRef,useState} from "react";
import {useMotion} from "./Motion";
import {Media} from "./Media";
import type {ChannelVideo} from "@/lib/youtube";
export function FilmPlayer({video,preview,priority=false,start=0,playRequest=0}:{video:ChannelVideo;preview?:string;priority?:boolean;start?:number;playRequest?:number}) {
 const [active,setActive]=useState(false); const frame=useRef<HTMLDivElement>(null); const id=useId();
 const {register,request}=useMotion();
 useEffect(()=>{if(!frame.current)return;return register({id,element:frame.current,manualOnly:true,start:()=>setActive(true),stop:()=>setActive(false)});},[id,register]);
 useEffect(()=>{if(playRequest>0)request(id);},[start,playRequest,id,request]);
 return <div ref={frame} className={`cinema-player ${active?"is-playing":""}`} data-hause-act="film">
  {active?<iframe key={start} src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&rel=0&start=${Math.max(0,Math.floor(start))}`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>:<>
  {preview?<Media id={preview} priority={priority}/>:<img src={video.poster} alt={`Poster for ${video.title}`} loading={priority?"eager":"lazy"} />}
  <button className="cinema-enter" onClick={()=>request(id)}><span aria-hidden="true">▷</span><span className="record-voice">WATCH FILM{start>0?` · FROM ${Math.floor(start/60)}:${String(Math.floor(start%60)).padStart(2,"0")}`:""}</span></button>
  </>}
 </div>;
}
