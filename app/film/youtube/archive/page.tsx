import { pageMetadata } from "@/lib/metadata";
import {YouTubeCollection} from "@/components/YouTubeCollection";
export const metadata=pageMetadata('The complete YouTube index','The complete indexed catalogue of Chris Hay’s YouTube films and Shorts.','/film/youtube/archive');
export default function Page(){return <YouTubeCollection archive/>;}
