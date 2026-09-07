import { FEEDS, jsonFeed } from "@/lib/feeds";
export function GET(){return Response.json(jsonFeed(FEEDS.record,"/record/feed.json"),{headers:{"Content-Type":"application/feed+json; charset=utf-8","Cache-Control":"public, max-age=600"}});}
