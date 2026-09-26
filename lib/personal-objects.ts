/** Personal accounts supplied by Chris, 26 September 2026.
 * These are possessions and observations, not experimental findings or product reviews.
 * Exact variants, finishes and dates of acquisition have not been supplied.
 */
export type PersonalObject = {
 id: string;
 slug: string;
 name: string;
 maker: string;
 occasion?: string;
 title?: string;
 note?: string;
 photograph?: { kind: "owned" | "reference"; image: string; width: number; height: number; alt: string; caption: string; credit: string; source?: string };
};

export const seeingCollection = {
 id: "LOOKBOOK-SEEING",
 path: "/objects/things-i-look-through",
 title: "Things I look through",
 description: "I’m sensitive to light. I always wear sunglasses outside and usually wear Swanwicks indoors. The glasses I own and wear, beginning with my actual pair on film.",
 recorded: "2026-09-26",
};

export const personalObjects: PersonalObject[] = [
 {
  id: "OBJECT-SWANWICK", slug: "swanwick", name: "Swanwick", maker: "Swanwick",
  photograph: {kind:"owned",image:"/media/objects/swanwick-my-pair.png",width:4032,height:3024,alt:"Chris’s black Swanwick frames with amber lenses resting on a pale wooden surface.",caption:"Swanwick / My pair",credit:"Chris Hay"},
  occasion: "In the videos", title: "The pair you see on screen.",
  note: "I’m sensitive to light. I always wear sunglasses outside and usually wear my Swanwicks indoors. These are the glasses I wear in my videos.",
 },
 {
  id: "OBJECT-JULIET", slug: "juliet", name: "Juliet", maker: "Oakley",
  occasion: "For special occasions", title: "Formal, with a little ease.",
  note: "One of my favourite old pairs. Metallic and classy, formal but casual. I wear them for special occasions and formal events. I love how they look.",
  photograph: {kind:"reference",image:"/media/objects/juliet-reference.jpg",width:1000,height:1000,alt:"Reference Oakley Juliet with a dark metal frame and gold mirrored lenses.",caption:"Juliet / Carbon · Fire Iridium",credit:"300700",source:"https://300700.co.uk/products/oakley-x-metal-juliet-carbon-fire-iridium"},
 },
 { id: "OBJECT-WAYFARER", slug: "wayfarer", name: "Wayfarer", maker: "Ray-Ban", photograph: {kind:"owned",image:"/media/objects/wayfarer-my-pair.png",width:4032,height:3024,alt:"Chris’s black Ray-Ban frames with red-orange mirrored lenses resting on a pale wooden surface.",caption:"Ray-Ban / My pair",credit:"Chris Hay"} },
 { id: "OBJECT-EYE-JACKET", slug: "eye-jacket", name: "Eye Jacket", maker: "Oakley", photograph: {kind:"reference",image:"/media/objects/eye-jacket-reference.jpg",width:1000,height:1000,alt:"Reference black Oakley Eye Jacket frames with curved oval lenses.",caption:"Eye Jacket / Black",credit:"300700",source:"https://300700.co.uk/products/oakley-eye-jacket-black-black"} },
 { id: "OBJECT-FROGSKINS", slug: "frogskins", name: "Frogskins", maker: "Oakley", photograph: {kind:"owned",image:"/media/objects/frogskins-my-pair.png",width:4032,height:3024,alt:"Chris’s translucent Oakley Frogskins with gold mirrored lenses resting on a pale wooden surface.",caption:"Frogskins / My pair",credit:"Chris Hay"} },
 { id: "OBJECT-META", slug: "meta", name: "Meta", maker: "Ray-Ban", photograph: {kind:"reference",image:"/media/objects/meta-reference.jpg",width:800,height:400,alt:"Reference black Ray-Ban Meta Wayfarer frames with visible camera apertures.",caption:"Meta Wayfarer / Gen 2 reference",credit:"Ray-Ban / LensCrafters",source:"https://www.ray-ban.com/usa/electronics/RW4012ray-ban%20%7C%20meta%20wayfarer-black/8056262721292"} },
];

/** An existing, unretouched frame of Chris from his own film. The film's
 * original title/overlays are retained. Chris confirmed these are his Swanwicks.
 */
export const objectsFilm = {
 image: "/media/objects/swanwick-on-screen.webp",
 video: "/media/objects/swanwick-on-screen.mp4",
 mediaId: "objects-swanwick",
 alt: "Chris wearing his black Swanwick frames with orange lenses in his studio, with the film’s original terminal overlay.",
 title: "I Quantized Qwen3.8-27B",
 path: "/film/youtube/5_ZiJpl4hvs",
 source: "https://www.youtube.com/watch?v=5_ZiJpl4hvs",
};
