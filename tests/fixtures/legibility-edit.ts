import assert from "node:assert/strict";
import { publicationLegibility } from "../../lib/legibility.ts";
import { records, recordPath } from "../../lib/records.ts";
import { threads } from "../../lib/threads.ts";
import { legibilityLd } from "../../vendor/hause/legibility.ts";

// Never writes files, starts a web server, or changes a real publication.
const editorial=process.argv[2]==="editorial";
const ids=["N-MACHINE-TASK","N-MACHINE-MOTIVATION","THREAD-MACHINES"];
const published=records.find(record=>record.id==="N-MACHINE-MOTIVATION")!;
const frozenPublication=JSON.stringify(published);
const cases=ids.map((id,index)=>{
 const record=records.find(record=>record.id===id) || threads.find(thread=>thread.id===id)!;
 const sourceTitle=record.title;
 const sourceVersion=record.version;
 const semanticToken=`legibilitytopic${index}`;
 const searchToken=`legibilitysearch${index}`;
 publicationLegibility[id]={
  subject:`${semanticToken} revised subject`,question:`What does ${semanticToken} explain?`,
  searchTitle:`A revised title about ${searchToken}`,description:`A revised description about ${searchToken}.`,
  concepts:[semanticToken],
  ...(editorial?{search:{mode:"editorial" as const,reason:"Keep the authored head for this fixture."}}:{}),
 };
 // Draft and guide prose can evolve. A published manuscript stays intact.
 if(id!==published.id) record.abstract=`A revised readable abstract about ${semanticToken}.`;
 return {id,record,sourceTitle,sourceVersion,semanticToken,searchToken};
});

// These are the production consumers. Load them only after editing the source.
const {pageMetadata}=await import("../../lib/metadata.ts");
const {recordGraph,retrieveGraph}=await import("../../lib/graph.ts");
const {llmsDocument,llmsTxt}=await import("../../lib/llms.ts");
const {auditPublicationLegibility}=await import("../../lib/legibility-audit.ts");
const graph=recordGraph();
const machine=llmsDocument();
for(const {id,record,sourceTitle,sourceVersion,semanticToken,searchToken} of cases) {
 const meaning=publicationLegibility[id];
 const path="path" in record ? record.path : recordPath(record);
 const editorialDescription="dek" in record ? record.dek : record.abstract;
 const head=pageMetadata(record.title,editorialDescription,path,undefined,undefined,{legibility:meaning});
 // The same JSON-LD projection consumed by RecordPage and all thread pages.
 const ld=legibilityLd({...meaning,title:record.title,abstract:record.abstract});
 const node=graph.nodes.find(node=>node.id===id)!;
 assert.equal(head.title,editorial?record.title:meaning.searchTitle);
 assert.equal(head.description,editorial?editorialDescription:meaning.description);
 assert.equal(head.openGraph.title,sourceTitle);
 assert.equal(head.openGraph.description,editorialDescription);
 assert.equal(head.robots.index,true,"Opt-out must not turn into noindex");
 assert.equal(ld.headline,sourceTitle);
 assert.equal(ld.abstract,record.abstract);
 assert.equal(ld.alternativeHeadline,editorial?undefined:meaning.searchTitle);
 assert.equal(ld.description,editorial?undefined:meaning.description);
 assert.ok(ld.about.some(item=>item.name===meaning.subject));
 assert.equal(node.subject,meaning.subject);
 assert.equal(node.question,meaning.question);
 assert.equal(node.searchProjection,editorial?"editorial":"projected");
 assert.equal(node.searchTitle,editorial?undefined:head.title);
 assert.equal(node.searchDescription,editorial?undefined:head.description);
 assert.ok(node.text!.includes(record.abstract));
 assert.equal(node.title,sourceTitle);
 assert.equal(node.version,sourceVersion);
 const line=machine.split("\n").find(line=>line.startsWith(`- [${sourceTitle}]`))!;
 assert.ok(line.includes(meaning.subject));
 assert.ok(line.includes(meaning.question));
 assert.ok(line.includes(record.abstract));
 assert.ok(line.includes(path));
 assert.ok(retrieveGraph(semanticToken,{scope:"records"}).results.some(result=>result.id===id));
 assert.equal(retrieveGraph(searchToken,{scope:"records"}).results.some(result=>result.id===id),!editorial);
 assert.equal(auditPublicationLegibility().find(result=>result.id===id)!.ok,true);
 if(id==="N-MACHINE-TASK") { assert.equal(node.publication,"draft"); assert.equal(node.published,undefined); }
 if(id===published.id) { assert.equal(node.publication,"published"); assert.equal(node.published,published.published); }
}
const thread=threads.find(thread=>thread.id==="THREAD-MACHINES")!;
for(const member of thread.steps) {
 assert.ok(graph.edges.some(edge=>edge.from===member.id&&edge.to===thread.id&&edge.kind==="in-thread"));
 assert.equal(graph.nodes.find(node=>node.id===member.id)!.keywords!.includes("legibilitytopic2"),false,"Thread vocabulary must not overwrite member intent");
}
assert.equal(JSON.stringify(published),frozenPublication,"Discovery edits must not mutate the published record");
assert.equal(llmsTxt(false).includes("legibilitytopic"),false,"Preview withholding survives both modes");
console.log("Three edited records passed metadata, structured data, graph, retrieval and machine-index parity");
