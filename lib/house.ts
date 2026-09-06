/** Author-supplied positioning. A practice, not a separate legal organization
 * or a research finding. Shared by the visible About page and source retrieval. */
export const HOUSE = {
  id: "PRACTICE-CHRIS",
  name: "Chris Hay",
  descriptor: "A house for ideas, systems and objects",
  proposition: "Building things to find out how they work.",
  personLine: "A life in questions.",
  description: "Chris Hay explores how intelligent systems are represented, executed, understood and experienced.",
  disciplines: ["Research", "Engineering", "Design", "Film"],
  principle: "Publish the uncertainty as well as the result.",
  sourcePath: "/about#the-house",
};

export const HOUSE_PARTS = [
  {id:"ideas",name:"Ideas",path:"/ideas",text:"Questions, research and the notebook. A place for thinking before the answer."},
  {id:"systems",name:"Systems",path:"/systems",text:"Models, software, design languages and infrastructure. Giving an idea a structure that can be explored."},
  {id:"objects",name:"Objects",path:"/objects",text:"What is made: software, interfaces, films and publications. An idea takes a form that can be used, watched or held."},
];

export const HOUSE_WORK = [
  { id: "W-LARQL", name: "LARQL", field: "RESEARCH / ENGINEERING", path: "/work/larql", text: "Querying and running learned systems. An investigation into what becomes possible when a model can be addressed." },
  { id: "W-VINDEX3", name: "VINDEX3", field: "REPRESENTATION / EXECUTION", path: "/work/vindex3", text: "Exploring how a model is represented, and how that representation relates to its execution." },
  { id: "W-HAUSE", name: "HAUSE", field: "DESIGN", path: "/work/hause", text: "A language for how intelligent systems express themselves: claims, evidence, questions, comparisons and refusals." },
  { id: "W-MCP", name: "MCP-CLI / CHUK", field: "TOOLS / INFRASTRUCTURE", path: "/work/mcp-cli", text: "Tools for connecting agents, models and the systems they use." },
];

export const HOUSE_PUBLICATIONS = [
  { name: "Research", path: "/research", text: "The questions, the evidence and the boundary of what has been shown." },
  { name: "Notebook", path: "/notebook", text: "The record before the answer. Thoughts, sketches and questions while they are still taking shape." },
  { name: "Film", path: "/film", text: "Another medium for thinking. Experiments, explanations and conversations in public." },
];

export const HOUSE_ABSTRACT = `${HOUSE.name}. ${HOUSE.descriptor}. ${HOUSE.proposition} ${HOUSE_PARTS.map(p=>`${p.name}: ${p.text}`).join(" ")} ${HOUSE.description} ${HOUSE.disciplines.join(", ")} form one practice. ${HOUSE_WORK.map(w=>`${w.name}: ${w.text}`).join(" ")} ${HOUSE_PUBLICATIONS.map(p=>`${p.name}: ${p.text}`).join(" ")} The record is the catalogue of the practice: stable identities, authorship, dates, source credits and citations. ${HOUSE.principle} IBM Mixture of Experts is an external production in which Chris is a regular panelist; IBM remains its producer.`;
