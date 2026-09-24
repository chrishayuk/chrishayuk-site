import type { ChannelVideo } from "@/lib/youtube";
import { filmStill, stillPath } from "@/lib/film-stills";
import { getMedia, readyMedia } from "@/lib/media";

/** The same original frame on the index and in the screening room. */
export function FilmPoster({ video, preview, start = 0, priority = false }: {
  video: ChannelVideo; preview?: string; start?: number; priority?: boolean;
}) {
  const still = filmStill(video.youtubeId, start);
  const asset = preview ? getMedia(preview) : undefined;
  const source = still ? stillPath(still) : asset && readyMedia(asset)
    ? (asset.type === "image" ? asset.desktop : asset.poster) || video.poster
    : video.poster;
  return <img src={source} alt={still?.description || `Still from ${video.title}`}
    width={1600} height={900} loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"} />;
}
