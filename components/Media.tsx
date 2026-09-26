/* Exhibition-local Photograph and controlled Film: extending HAUSE’s semantic
 * Film contract. Playback ownership belongs to MotionProvider, not each scene. */
"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { getMedia, readyMedia } from "@/lib/media";
import { useMotion } from "./Motion";
import { useNotebookEdition } from '@chrishayuk/hause/components/NotebookEdition';
import { NotebookFilm } from '@chrishayuk/hause/components/NotebookTemplate';
export function Media({ id, className = "", priority = false, caption = false }: { id: string; className?: string; priority?: boolean; caption?: boolean }) {
  const asset = getMedia(id); const unique = useId(); const motionId = `${id}-${unique}`;
  const frame = useRef<HTMLElement>(null); const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false); const [decoded, setDecoded] = useState(false); const [failed, setFailed] = useState(false);
  const { register, request, setPaused } = useMotion();
  const notebook = useNotebookEdition();
  const ready = asset && readyMedia(asset);
  useEffect(() => {
    if (!ready || !asset || asset.type !== "film" || !frame.current || !video.current) return;
    const element = video.current;
    return register({ id: motionId, element: frame.current,
      start: () => {
        const source = matchMedia("(max-width: 767px)").matches ? asset.mobile : asset.desktop;
        if (!source) return;
        if (element.getAttribute("src") !== source) { setDecoded(false); element.src = source; }
        element.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }, stop: () => { element.pause(); setPlaying(false); },
    });
  }, [asset, motionId, ready, register]);
  if (!asset) return null;
  const style = { "--media-ratio": asset.desktopRatio, "--mobile-media-ratio": asset.mobileRatio } as CSSProperties;
  const poster = asset.type === "image" ? asset.desktop : asset.poster;
  const mobilePoster = asset.type === "image" ? asset.mobile : asset.mobilePoster;
  const mounted = notebook && asset.type === 'film';
  const surface = <figure ref={frame} className={`media ${ready ? "media-ready" : "media-required"} ${className}`} style={style} data-media-id={id}>
    {ready && poster && !failed ? <picture><source media="(max-width: 767px)" srcSet={mobilePoster || poster} /><img src={poster} alt={asset.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} onError={() => setFailed(true)} /></picture> : <div className="media-slate"><span className="slate-cross" aria-hidden="true">+</span><p className="record-voice">{asset.title}</p><span className="slate-note">{failed ? "IMAGE UNAVAILABLE" : "ORIGINAL MEDIA TO FOLLOW"}</span></div>}
    {ready && asset.type === "film" && <><video ref={video} loop={asset.loop} muted playsInline preload="none" poster={poster} className={decoded ? "is-decoded" : ""} onLoadedData={() => setDecoded(true)} onEnded={() => setPlaying(false)} onError={() => { setDecoded(false); setPlaying(false); }} aria-label={asset.title}>{asset.captions && <track kind="captions" src={asset.captions} srcLang="en" label="English" default />}</video><button className="media-control record-voice" onClick={() => { if (playing) setPaused(true); else { if (video.current?.ended) video.current.currentTime = 0; request(motionId); } }} aria-label={`${playing ? "Pause" : "Play"} ${asset.title}`}>{playing ? "Ⅱ PAUSE" : "▷ PLAY"}</button></>}
    {caption && !mounted && <figcaption className="media-caption record-voice">{asset.caption || asset.title}{asset.creator && ` · ${asset.creator}`}</figcaption>}
  </figure>;
  return mounted ? <NotebookFilm marker="Recorded film study" caption={<>{asset.caption || asset.title}{asset.creator && ` · ${asset.creator}`}</>} source={asset.source ? {href: asset.source, label: 'Original source'} : undefined}>{surface}</NotebookFilm> : surface;
}
