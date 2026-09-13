import { citationFormats, type CitationRecord } from "../vendor/hause/cite.ts";
import ibmCatalogue from "../content/ibm-catalogue.json" with { type: "json" };
import catalogue from "../content/youtube-catalogue.json" with { type: "json" };
import captions from "../content/youtube-transcripts.json" with { type: "json" };
export type ChannelVideo = (typeof catalogue.videos)[number] & { producer?: string; collection?: string; participants?: string[]; episode?: string | null; sourcePage?: string; participationEvidence?: string; uploadedAt?: string | null };
export type Passage = {start:number;end:number;text:string};
export const youtube = catalogue;
const localPosters:Record<string,string>={"8Ppw8254nLI":"larql-poster.webp","UvogrjCgaJQ":"studio-poster.webp","5_ZiJpl4hvs":"latest-poster.webp"};
export const channelVideos = catalogue.videos.map(v=>({...v,poster:localPosters[v.youtubeId]?`/media/youtube/${localPosters[v.youtubeId]}`:v.poster}));
export const ibm = ibmCatalogue;
export const ibmVideos:ChannelVideo[] = ibmCatalogue.videos;
export const allVideos:ChannelVideo[] = [...channelVideos,...ibmVideos];
export const videoRetrievedAt = (v:ChannelVideo) => v.producer === "IBM" ? ibm.retrievedAt : youtube.retrievedAt;
export const latestMoe = ibmVideos.filter(v=>v.participants?.includes("Chris Hay")).sort((a,b)=>(b.published||"").localeCompare(a.published||""))[0];
export const popularMoe = [...ibmVideos].sort((a,b)=>(b.views??-1)-(a.views??-1))[0];
export const videoPath = (v: ChannelVideo) => `/film/youtube/${v.youtubeId}`;
export const getVideo = (id:string) => allVideos.find(v=>v.youtubeId===id||v.id===id);
export const transcriptFor = (id:string) => (captions as Record<string,{source:string;status:string;language:string;passages:Passage[]}>)[id];
export const latestVideo = channelVideos.filter(v=>v.format==="video").sort((a,b)=>(b.published||"").localeCompare(a.published||""))[0];
export const featuredVideo = getVideo("8Ppw8254nLI")!;
export const selectedVideos = [featuredVideo,getVideo("UvogrjCgaJQ")!,latestVideo];
export const durationLabel = (seconds:number|null) => {if(seconds===null)return "—";const n=Math.floor(seconds);return n>=3600?`${Math.floor(n/3600)}:${String(Math.floor(n/60)%60).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`:`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`;};
export const viewLabel = (v:ChannelVideo) => v.views===null?"":`${v.viewsApproximate?"≈ ":""}${v.views.toLocaleString("en-GB")} views`;
// Discovery associations are metadata-derived, never evidence of a scientific claim.
const topics:[string,RegExp][]=[
 ["model-as-database",/\b(larql|vindex|databases?|query them)\b/i], ["ffn",/\bffn\b|feed.forward/i],
 ["mcp",/\bmcp\b|model context protocol/i],["agents",/\bagents?\b|agentic/i],
 ["mixture-of-experts",/mixture.of.experts|\bmoe\b/i],["model-memory",/\bmemory\b|\bcontext\b|kv cache/i],
 ["quantization",/quantiz|quantis|\b4.bit\b/i],["open-models",/\bqwen|\bllama|\bgemma|\bdeepseek|gpt.oss/i],
 ["ai-interface",/\bui\b|interface|mcp apps/i],["coding",/coding|claude code|copilot/i],
];
export const videoConcepts=(v:ChannelVideo)=>topics.filter(([,pattern])=>pattern.test(`${v.title} ${v.description} ${v.collection||""}`)).map(([id])=>id);
export const videoWork=(v:ChannelVideo)=>{const text=`${v.title} ${v.description}`;return [ [/\blarql\b/i,"W-LARQL"], [/\bvindex3?\b/i,"W-VINDEX3"], [/\bhause\b/i,"W-HAUSE"], [/\bmcp\b|\bchuk\b/i,"W-MCP"] ].filter(([pattern])=>(pattern as RegExp).test(text)).map(([,id])=>id as string);};
export function filterVideos(q="",format="all",sort="channel") {
 const terms=q.toLowerCase().trim().split(/\s+/).filter(Boolean);
 const list=channelVideos.filter(v=>(format==="all"||v.format===format)&&terms.every(t=>`${v.title} ${v.description} ${videoConcepts(v).join(" ")}`.toLowerCase().includes(t)));
 if(sort==="views")list.sort((a,b)=>(b.views??-1)-(a.views??-1));
 if(sort==="title")list.sort((a,b)=>a.title.localeCompare(b.title));
 return list;
}
/** Map a source film to HAUSE's citation model; retrieval is not publication. */
export function videoCitation(v: ChannelVideo): CitationRecord {
 return { id: v.id, kind: "film", title: v.title,
  authors: v.producer === "IBM" ? [{ literal: "IBM" }] : [{ family: "Hay", given: "Chris" }],
  ...(v.published ? { published: v.published } : {}), url: v.url,
  publisher: "YouTube", abstract: v.description.split("\n\n")[0] || v.title,
  partOf: { title: v.collection || "Chris Hay on YouTube", url: v.producer === "IBM" ? ibm.playlistUrl : youtube.channelUrl },
 };
}
export function videoReferences(v: ChannelVideo) {
 return citationFormats(videoCitation(v)).map(f => ({ ...f, id: f.id === "csl" ? "csl-json" : f.id }));
}
