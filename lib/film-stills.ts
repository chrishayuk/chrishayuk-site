/** Editorially selected, unretouched frames from Chris Hay's films.
 * `start` is the passage's playback entry; `frameTime` identifies the poster.
 * Keep the two distinct: a useful still can occur after the chapter begins.
 */
export type FilmStill = {
  youtubeId: string;
  start: number;
  frameTime: number;
  description: string;
};
export const filmStills: FilmStill[] = [
  { youtubeId: "HJlWDSyDcD4", start: 120, frameTime: 156, description: "The projected residual trajectory among Tokyo, Paris, Berlin and Cairo landmarks." },
  { youtubeId: "HJlWDSyDcD4", start: 240, frameTime: 286, description: "France’s residual replaces the Australia state; the layer readouts converge on Paris." },
  { youtubeId: "HJlWDSyDcD4", start: 420, frameTime: 434, description: "KV Anatomist’s attention heatmap with the layer 26, head 2 attribution towards Paris selected." },
  { youtubeId: "HJlWDSyDcD4", start: 1170, frameTime: 1222, description: "The Apollo store query routes to window 170 and returns John Coyle with 23 bowls." },
  { youtubeId: "TYgCRPCAFhE", start: 800, frameTime: 811, description: "Chris explains retained residual state and rebuilding the attention cache." },
  { youtubeId: "g58j6DrLOZ0", start: 1030, frameTime: 1046, description: "The Mechanism’s layer readouts move from Sydney to Canberra for the Australia capital question." },
  { youtubeId: "8Ppw8254nLI", start: 1290, frameTime: 1306, description: "The LARQL knowledge-writing demonstration queries the capital of Atlantis." },
];
export const stillPath = (still: FilmStill) => `/media/notebook/stills/${still.youtubeId}-${still.frameTime}.webp`;
export const filmStill = (youtubeId: string, start: number) => filmStills.find(still => still.youtubeId === youtubeId && still.start === start);
