"use client";
import { YouTubeFilm } from "@chrishayuk/hause/components/YouTubeFilm";
import { Media } from "./Media";
import { FilmPoster } from "./FilmPoster";
import type { ChannelVideo } from "@/lib/youtube";
import { filmStill, stillPath } from "@/lib/film-stills";
export function FilmPlayer({video,preview,priority=false,start=0,playRequest=0,stillOnly=false}:{video:ChannelVideo;preview?:string;priority?:boolean;start?:number;playRequest?:number;stillOnly?:boolean}) {
 const still = filmStill(video.youtubeId, start);
 return <YouTubeFilm youtubeId={video.youtubeId} title={video.title} poster={still ? stillPath(still) : video.poster}
  preview={stillOnly ? <FilmPoster video={video} preview={preview} start={start} priority={priority}/> : still ? <img src={stillPath(still)} alt={still.description} width={1600} height={900} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"}/> : preview ? <Media id={preview} priority={priority}/> : undefined} priority={priority}
  start={start} playRequest={playRequest} className="cinema-player" playButtonClassName="cinema-enter"/>;
}
