import { channelVideos, videoConcepts, videoWork, youtube } from "./youtube.ts";
import type { PublicationRecord } from "./types";
export const videoRecords:PublicationRecord[]=channelVideos.map(v=>({
 id:v.id,slug:`youtube-${v.youtubeId}`,kind:"film",title:v.title,dek:"A film by Chris Hay.",
 abstract:v.description.split("\n\n")[0]||`“${v.title}” is a ${v.format==="short"?"Short":"video"} on Chris Hay’s YouTube channel. Its full transcript has not yet been indexed.`,
 created:youtube.retrievedAt.slice(0,10),published:v.published||undefined,publication:"catalogued",version:"1.0",authors:["Chris Hay"],
 body:[{kind:"film",media:`youtube-${v.youtubeId}`}],concepts:videoConcepts(v),related:videoWork(v),media:[`youtube-${v.youtubeId}`],
 sourceMetadata:{retrievedAt:youtube.retrievedAt,sourceHash:v.sourceHash,transcript:v.transcript,views:v.views,viewsApproximate:v.viewsApproximate},
 collection:"YouTube",originalUrl:v.url,youtubeId:v.youtubeId,
 sources:[{title:"Original YouTube film",url:v.url,note:`Metadata retrieved ${youtube.retrievedAt}. Topic links are inferred from title and description; they are discovery links, not validated claims.`}],
}));
