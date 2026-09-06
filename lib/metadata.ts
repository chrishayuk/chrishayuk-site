import { publicationMetadata } from "@chrishayuk/hause/seo";
import type { CitationRecord } from "@chrishayuk/hause/cite";
import { SITE } from "./records";
/** Fly explicitly enables the public edition; Sites and local previews default to noindex. */
export const INDEXABLE = process.env.SITE_INDEXABLE === "true";
export function pageMetadata(title: string, description: string, path: string, image?: string, citation?: CitationRecord) {
 return publicationMetadata({ title, description, url: `${SITE}${path}`, siteName: "Chris Hay",
  indexable: INDEXABLE, image: image || `${SITE}/og-house.png`, citation });
}
