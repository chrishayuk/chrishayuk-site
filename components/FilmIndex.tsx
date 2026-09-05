import {FilmSelection} from "./YouTubeCollection";
import {MoeSelection} from "./MoeCollection";
import {youtube} from "@/lib/youtube";
import Link from "next/link";
export function FilmIndex(){return <><header className="index-intro"><p className="kicker record-voice">THE MOVING IMAGE</p><h1>Film<span className="amber">.</span></h1><p className="dek">Experiments on Chris Hay’s channel. Conversations with IBM’s Mixture of Experts. A connected record of the work, on film.</p><div className="index-count record-voice"><Link href="/film/youtube">CHRIS HAY / YOUTUBE ↗</Link><Link href="/film/mixture-of-experts">IBM / MIXTURE OF EXPERTS ↗</Link></div></header><MoeSelection/><section className="channel-selection"><div className="section-heading"><p className="kicker record-voice">CHRIS HAY / YOUTUBE</p><h2>Thinking<br/><em>out loud.</em></h2><Link href="/film/youtube" className="text-link">THE CHANNEL / {youtube.videos.length} FILMS ↗</Link></div><FilmSelection/></section></>;}
