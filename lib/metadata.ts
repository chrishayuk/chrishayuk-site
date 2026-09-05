import { publicationMetadata } from "@chrishayuk/hause/seo";
import type { CitationRecord } from "@chrishayuk/hause/cite";
import { SITE } from "./records";
/** Private working edition. Enable indexing only as part of an approved public launch. */
export const INDEXABLE = false;
export function pageMetadata(title: string, description: string, path: string, image?: string, citation?: CitationRecord) {
 return publicationMetadata({ title, description, url: `${SITE}${path}`, siteName: "Chris Hay",
  indexable: INDEXABLE, ...(image ? { image } : {}), citation });
}
