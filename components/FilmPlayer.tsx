"use client";
import { YouTubeFilm } from "@chrishayuk/hause/components/YouTubeFilm";
import { Media } from "./Media";
import type { ChannelVideo } from "@/lib/youtube";
export function FilmPlayer({video,preview,priority=false,start=0,playRequest=0}:{video:ChannelVideo;preview?:string;priority?:boolean;start?:number;playRequest?:number}) {
 return <YouTubeFilm youtubeId={video.youtubeId} title={video.title} poster={video.poster}
  preview={preview?<Media id={preview} priority={priority}/>:undefined} priority={priority}
  start={start} playRequest={playRequest} className="cinema-player" playButtonClassName="cinema-enter"/>;
}
