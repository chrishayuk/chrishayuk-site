export type Status = "OPEN" | "PROPOSED" | "TESTING" | "ONGOING" | "SUPPORTED" | "PARTIALLY SUPPORTED" | "NOT SUPPORTED" | "BOUND" | "REFUTED" | "SUPERSEDED" | "ARCHIVED";
export type Act =
  | { kind: "statement"; text: string }
  | { kind: "observation"; label?: string; text: string; references?: { label: string; url: string }[] }
  | { kind: "connection"; text: string; links: { href: string; label: string }[]; demonstration?: "addressed-memory" | "authority-gate" }
  | { kind: "summary"; label: string; lines: string[]; detail?: string }
  | { kind: "question"; text: string; status: Status; detail?: string }
  | { kind: "claim"; text: string; status: Status; detail?: string }
  | { kind: "evidence"; items: { label: string; status: Status; detail: string }[] }
  | { kind: "refusal"; title: string; lines: string[]; principle: string }
  | { kind: "photograph"; media: string }
  | { kind: "film"; media: string }
  | { kind: "film"; youtubeId: string; start: number; caption: string }
  | { kind: "comparison"; objectLabel: string; blockLabels: string[]; left: { label: string; properties: string[] }; right: { label: string; properties: string[] } };
export type PublicationRecord = {
  id: string; slug: string; kind: "work" | "notebook" | "question" | "film";
  title: string; dek: string; abstract: string; created: string; published?: string; revised?: string;
  version: string; status?: Status; publication: "draft" | "published" | "catalogued";
  /** Unlisted records resolve at their own URL and appear in no index, feed or graph. */
  visibility?: "unlisted";
  authors: string[]; body: Act[]; concepts: string[]; related: string[];
  /** How this note came about, shown on the notebook index. Films are one route in, not the only one. */
  lineage?: string;
  /** Optional reviewed copy for native off-site distribution. Links belong in the follow-up, not the image post. */
  share?: { linkedin?: string; linkedinComment?: string; x?: string; xReply?: string };
  media: string[]; sources: { title: string; url?: string; note?: string }[];
  /** Identifiers supplied by the experimental record, never inferred from a title. */
  experiments?: { id: string; url?: string }[];
  /** A later interpretation may replace another record while its original remains citable. */
  supersedes?: { id: string; version: string; reason: string }[];
  sourceMetadata?: { retrievedAt: string; sourceHash: string; transcript: string; views: number | null; viewsApproximate: boolean };
  youtubeId?: string; originalUrl?: string; episode?: string; collection?: string;
};
export type MediaRecord = {
  id: string; title: string; type: "image" | "film" | "system";
  loop?: boolean; state: "required" | "ready"; desktop?: string; mobile?: string;
  poster?: string; mobilePoster?: string; captions?: string;
  alt: string; caption?: string; creator?: string; source?: string;
  rights: "pending" | "owned" | "licensed"; desktopRatio: string; mobileRatio: string;
};
