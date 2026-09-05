import type { MediaRecord } from "./types";
import overrides from "../content/media-library.json";
const required = (id: string, title: string, type: MediaRecord["type"], ratio = "16 / 9"): MediaRecord => ({ id, title, type, state: "required", rights: "pending", alt: title, desktopRatio: ratio, mobileRatio: type === "film" ? "9 / 16" : ratio });
export const media: MediaRecord[] = [
  required("youtube-studio", "Chris Hay · studio film", "film"),
  required("youtube-larql", "LARQL · film excerpt", "film"),
  required("youtube-latest", "Latest film · excerpt", "film"),
  required("hero-identity", "Identity film · Chris, London", "film", "2 / 1"),
  required("portrait-editorial", "Chris Hay · editorial portrait", "image", "4 / 5"),
  required("moe-feature", "Mixture of Experts · approved episode frame", "film"),
  required("london-night", "London · a photographic interlude", "image", "3 / 2"),
  required("ffn-notebook", "FFN · the original notebook page", "image", "4 / 5"),
  required("vindex-system", "VINDEX3 · representation and execution", "system", "2 / 1"),
  required("larql-object", "LARQL · objects of the work", "image", "4 / 5"),
  required("personal-architecture", "Architecture · personal photographic record", "image", "3 / 4"),
  required("personal-books", "Books · personal photographic record", "image", "4 / 5"),
  required("personal-journey", "Journey · personal photographic record", "image"),
  required("operator-notebook", "The operator · original notebook page", "image", "4 / 5"),
  required("mcp-interaction", "MCP · a real tool interaction", "film"),
  required("closing-portrait", "Chris Hay · closing portrait film", "film"),
].map(base => ({ ...base, ...(overrides as unknown as Record<string, Partial<MediaRecord>>)[base.id] }));
export const getMedia = (id: string) => media.find(m => m.id === id);
export const readyMedia = (m: MediaRecord) => m.state === "ready" && m.rights !== "pending" && Boolean(m.desktop);
