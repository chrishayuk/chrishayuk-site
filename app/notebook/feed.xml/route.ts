import { FEEDS, feedResponse } from "@/lib/feeds";
export const GET = () => feedResponse(FEEDS.notebook);
