import { pageMetadata } from "@/lib/metadata";
import {YouTubeCollection} from "@/components/YouTubeCollection";
export const metadata=pageMetadata('YouTube — Thinking out loud','Chris Hay’s YouTube films. Latest uploads, selected experiments and the complete channel archive.','/film/youtube');
export default function Page(){return <YouTubeCollection/>;}
