import { allVideos, videoConcepts, videoWork, videoRetrievedAt } from "./youtube.ts";
import type { PublicationRecord } from "./types";
export const videoRecords:PublicationRecord[]=allVideos.map(v=>({
 id:v.id,slug:`youtube-${v.youtubeId}`,kind:"film",title:v.title,dek:v.producer === "IBM" ? "Produced by IBM · featuring Chris Hay." : "A film by Chris Hay.",
 abstract:v.description.split("\n\n")[0]||`“${v.title}” is a ${v.format==="short"?"Short":"video"} on Chris Hay’s YouTube channel. Its full transcript has not yet been indexed.`,
 created:videoRetrievedAt(v).slice(0,10),published:v.published||undefined,publication:"catalogued",version:"1.0",authors:v.producer === "IBM" ? ["IBM"] : ["Chris Hay"],
 body:[{kind:"film",media:`youtube-${v.youtubeId}`}],concepts:videoConcepts(v),related:videoWork(v),media:[`youtube-${v.youtubeId}`],
 sourceMetadata:{retrievedAt:videoRetrievedAt(v),sourceHash:v.sourceHash,transcript:v.transcript,views:v.views,viewsApproximate:v.viewsApproximate},
 episode:v.episode||undefined, collection:v.collection||"YouTube",originalUrl:v.url,youtubeId:v.youtubeId,
 sources:[...(v.sourcePage?[{title:"IBM / Mixture of Experts",url:v.sourcePage,note:v.participationEvidence}]:[]),{title:"Original YouTube film",url:v.url,note:`Metadata retrieved ${videoRetrievedAt(v)}. Topic links are inferred from title and description; they are discovery links, not validated claims.`}],
}));
