export type Status = "OPEN" | "PROPOSED" | "TESTING" | "ONGOING" | "SUPPORTED" | "PARTIALLY SUPPORTED" | "NOT SUPPORTED" | "REFUTED" | "SUPERSEDED" | "ARCHIVED";
export type Act =
  | { kind: "statement"; text: string }
  | { kind: "observation"; label?: string; text: string }
  | { kind: "question"; text: string; status: Status; detail?: string }
  | { kind: "claim"; text: string; status: Status; detail?: string }
  | { kind: "evidence"; items: { label: string; status: Status; detail: string }[] }
  | { kind: "refusal"; title: string; lines: string[]; principle: string }
  | { kind: "photograph"; media: string }
  | { kind: "film"; media: string }
  | { kind: "comparison"; objectLabel: string; blockLabels: string[]; left: { label: string; properties: string[] }; right: { label: string; properties: string[] } };
export type PublicationRecord = {
  id: string; slug: string; kind: "work" | "notebook" | "question" | "film";
  title: string; dek: string; abstract: string; created: string; published?: string;
  version: string; status?: Status; publication: "draft" | "published" | "catalogued";
  authors: string[]; body: Act[]; concepts: string[]; related: string[];
  media: string[]; sources: { title: string; url?: string; note?: string }[];
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
