import type { MediaRecord } from "./types";
import overrides from "../content/media-library.json";
import { filmStills, stillPath } from "./film-stills.ts";
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
media.push(
  { id: "notebook-map-trajectory", title: "The map / residual trajectory from the film", type: "film", state: "ready", rights: "owned", creator: "Chris Hay", source: "https://www.youtube.com/watch?v=HJlWDSyDcD4&t=155", desktop: "/media/notebook/map-trajectory.mp4", mobile: "/media/notebook/map-trajectory.mp4", poster: "/media/notebook/stills/HJlWDSyDcD4-156.webp", desktopRatio: "16 / 9", mobileRatio: "16 / 9", loop: true, alt: "A projected residual trajectory moves among Tokyo, Paris, Berlin and Cairo in Chris Hay’s map demonstration.", caption: "FROM THE FILM / THE RESIDUAL MAP · 02:35–02:40" },
  { id: "notebook-map", title: "The map / a constructed vector study", type: "film", state: "ready", rights: "owned", creator: "Chris Hay", source: "https://github.com/chrishayuk/the-mechanism", desktop: "/media/notebook/map.mp4", mobile: "/media/notebook/map.mp4", poster: "/media/notebook/map.png", desktopRatio: "16 / 9", mobileRatio: "16 / 9", loop: false, alt: "Capital, currency and language directions add to one packed vector in a constructed six-dimensional example.", caption: "CONSTRUCTED EXAMPLE / VECTOR ADDITION · ORIGINAL STUDY, 2026" },
  { id: "notebook-state", title: "What has to survive / original film poster", type: "image", state: "ready", rights: "owned", creator: "Chris Hay", source: "https://www.youtube.com/watch?v=TYgCRPCAFhE", desktop: "/media/notebook/state.jpg", desktopRatio: "16 / 9", mobileRatio: "16 / 9", alt: "Original poster for Chris Hay’s film We Don’t Need KV Cache Anymore?", caption: "FROM THE FILM / WE DON’T NEED KV CACHE ANYMORE? · 10 MARCH 2026" },
  { id: "notebook-address", title: "Reading by address / an explanatory sequence", type: "film", state: "ready", rights: "owned", creator: "Chris Hay", source: "https://github.com/chrishayuk/the-mechanism", desktop: "/media/notebook/address.mp4", mobile: "/media/notebook/address.mp4", poster: "/media/notebook/address.png", desktopRatio: "16 / 9", mobileRatio: "16 / 9", loop: false, alt: "An explanatory conveyor: a capital-of-France address reaches an FFN lookup and writes Paris into the residual stream for downstream reading.", caption: "EXPLANATORY SEQUENCE / ADDRESS → LOOKUP → VALUE · ORIGINAL STUDY, 2026" },
);
media.push(...filmStills.map(still => ({
  id: `film-still-${still.youtubeId}-${still.start}`, title: still.description,
  type: "image" as const, state: "ready" as const, rights: "owned" as const,
  creator: "Chris Hay", source: `https://www.youtube.com/watch?v=${still.youtubeId}&t=${still.frameTime}`,
  desktop: stillPath(still), desktopRatio: "16 / 9", mobileRatio: "16 / 9",
  alt: still.description, caption: `ORIGINAL FILM FRAME / ${Math.floor(still.frameTime / 60)}:${String(still.frameTime % 60).padStart(2, "0")} · CHRIS HAY`,
})));
export const getMedia = (id: string) => media.find(m => m.id === id);
export const readyMedia = (m: MediaRecord) => m.state === "ready" && m.rights !== "pending" && Boolean(m.desktop);
