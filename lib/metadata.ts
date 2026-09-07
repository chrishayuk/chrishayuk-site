import { publicationMetadata } from "@chrishayuk/hause/seo";
import type { CitationRecord } from "@chrishayuk/hause/cite";
import { FEEDS } from "./feeds";
import { SITE } from "./records";
/** Fly explicitly enables the public edition; Sites and local previews default to noindex. */
export const INDEXABLE = process.env.SITE_INDEXABLE === "true";

/**
 * Feed discovery, on every page rather than only the homepage.
 *
 * This is the tag readers and feed-finding tools actually look for,
 * and it used to survive only where a page set no metadata of its own:
 * `publicationMetadata` returns its own `alternates` for the canonical
 * URL, and Next replaces the layout's `alternates` wholesale rather
 * than merging it. Every record page therefore advertised no feed at
 * all. Anything that builds on `pageMetadata` now carries both.
 */
export const feedAlternates = {
 "application/rss+xml": [
  { url: FEEDS.notebook.path, title: FEEDS.notebook.title },
  { url: FEEDS.record.path, title: FEEDS.record.title },
 ],
 "application/feed+json": [{ url: "/feed.json", title: FEEDS.notebook.title }],
};

type PageMetadataOptions = {
 openGraphType?: "website" | "article";
 image?: { width: number; height: number; alt: string; type?: string };
};

export function pageMetadata(title: string, description: string, path: string, image?: string, citation?: CitationRecord, options?: PageMetadataOptions) {
 const base = publicationMetadata({ title, description, url: `${SITE}${path}`, siteName: "Chris Hay",
  indexable: INDEXABLE, image: image || `${SITE}/og-house.png`, citation });
 const detailedImage=image&&options?.image?{url:image,...options.image}:undefined;
 return { ...base,
  openGraph:{...base.openGraph,type:options?.openGraphType||base.openGraph.type,...(detailedImage?{images:[detailedImage]}:{})},
  twitter:{...base.twitter,...(detailedImage?{images:[{url:detailedImage.url,width:detailedImage.width,height:detailedImage.height,alt:detailedImage.alt}]}:{})},
  alternates: { ...base.alternates, types: feedAlternates }
 };
}
