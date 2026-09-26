import type { PublicationRecord } from './types.ts';

type Conclusion = { takeaway: string; scope: string };
/** Editorial summaries of the current records, not additional experimental claims. */
export const notebookConclusions: Record<string, Conclusion> = {
 'N-ECOLOGY-RECOVERY': {
  takeaway: 'A repair method can outlast its maker. From equal starting state and damage, inherited executable machinery supported recovery in seven of twelve worlds; prose supported none.',
  scope: 'The machinery stayed protected, the builder library was shared, and successors sometimes failed to apply correct proposals. Repairing the inherited program itself remains the next question.' },
 'N-ECOLOGY-WORLD-REMEMBERS': {
  takeaway: 'What an agent leaves in the world can become part of a successor’s capability. These records carried useful answers, propagated an error and preserved validated repairs after the stronger agent left.',
  scope: 'Preservation was explicitly requested, and repair relied on a public-evidence validator. Autonomous institutions and open-ended cultural evolution remain outside these results.' },
 'N-MACHINE-RECOGNITION': {
  takeaway: 'How a result describes its capability can change which work an agent thinks it offers. In the second study, all six matched scenarios changed first provider selection when only that description changed.',
  scope: 'This was one model and harness with supplied candidate sets. First selection and eventual use are separate outcomes; the fetcher blocked the target after selection. Recognition and choice changed together, without establishing mediation.' },
 'N-ECOLOGY-INHERITANCE': {
  takeaway: 'A retained record gave fresh successors access to useful work. Qwen and Gemma both used the inheritance, but neither renewed it; the advantage disappeared when it expired.',
  scope: 'The producer, world and source record stayed fixed. Failures in Gemma’s control branch prevent a clean ranking of the recipients. Useful inheritance has been shown here; self-sustaining maintenance has not.' },
 'N-MACHINE-DISCOVERY': {
  takeaway: 'A usable capability cannot enter a choice if the agent never sees it. Six subjects without the address did not reach the target; all three given its domain completed the use sequence.',
  scope: 'The evidence describes the search results these subjects received. It cannot separate indexing, retrieval and ranking, or tell us whether different on-site wording would have changed exposure.' },
 'N-MACHINE-PEER': {
  takeaway: 'The comparison makes apparent peer authority a question worth testing, alongside what an agent is technically allowed to do.',
  scope: 'This note reports no new experiment and offers no causal explanation of the reported incident. Its proposed benign test must keep model, task, scale and safeguards distinct from the incident accounts.' },
 'N-ECOLOGY-BOARD': {
  takeaway: 'Providing a message board did not produce the expected pattern of useful contribution. Posting was possible, but rewarded experience did not elicit the predicted positive response.',
  scope: 'These small controlled worlds expose a contribution problem. They do not demonstrate useful consumption or autonomous culture. The next question is which part of a supplied experience enters the next decision.' },
 'N-ECOLOGY-TRANSMISSION': {
  takeaway: 'A reminder, a peer example and repeated exposure do not establish the same mechanism. Posting recurred while the artefact was supplied, without the registered advantage after it was withdrawn.',
  scope: 'The experiments used different controlled interfaces. They do not establish one general imitation mechanism or sustained retention. External artefacts and the agent’s own action history need to be separated.' },
 'N-ECOLOGY-MEMORY': {
  takeaway: 'In this comparison, the external artefact sustained the requested action even when the agent’s own history was cleared. The world supplied an effective reminder.',
  scope: 'The harness maintained that reminder, and identical requests repeatedly elicited the same action. Weight learning, independent replications and autonomous maintenance were not demonstrated.' },
 'N-MACHINE-CAPABILITY': {
  takeaway: 'All eighteen assigned agents completed the task across six described mechanisms, including WebSocket and WebAssembly. The predicted drop-off for mechanisms requiring code did not occur.',
  scope: 'The address and task were supplied on a well-equipped workstation. Discovery was not tested, and a harness cache leak compromised one subject’s blindness. The next question moves earlier: how a capability enters consideration.' },
 'N-MACHINE-MOTIVATION': {
  takeaway: 'Task-useful information accompanied participation in all six relevant visits. Two of three visitors also left a mark described afterwards as a courtesy to the operator.',
  scope: 'Those two marks triggered the registered interpretation pause, whose later release was not predefined. The stronger reading remains exploratory. A model’s decision, runtime permission and recorded action must be measured separately.' },
 'N-MACHINE-TASK': {
  takeaway: 'Across these four visits, the site’s invitation alone produced no record. User permission and a task requiring the mechanism each accompanied action.',
  scope: 'There was one agent per condition, executed sequentially with one recorded model. The results refine the task-scope question without establishing a universal hierarchy, a participation rate or perfect experimental blindness.' },
 'N-MACHINE-SELF-READ': {
  takeaway: 'The visitor found the experiment behind its invitation. Once it reported recognising its condition in the published research, its participation could no longer count as a blind comparison.',
  scope: 'The test was stopped. There is no matched unexposed subject establishing a behavioural effect, and the onset of recognition was not measured. The disagreement over the reported fetch count remains explicit.' },
 'N-MACHINE-PERMISSION': {
  takeaway: 'Changing the reward did not make the three arriving visitors declare. Two later controls with explicit permission did declare, including one for whom declaring bought nothing.',
  scope: 'These runs support a permission effect within the tested setting. Incidental visitors never arrived, and the small sequential comparison does not establish internal decision order or an organic participation rate.' },
 'N-MACHINE-VISIT': {
  takeaway: 'Directed visitors could use the invitation and expose concrete faults in discovery, declarations and feedback. Their visits helped reveal where the interface lost information.',
  scope: 'These were induced usability visits against changing revisions. Voluntary participation, retrieval superiority and a causal GET-versus-POST effect remain unmeasured; acknowledged but lost feedback cannot be recovered.' },
 'N-CELL80-BOUND': {
  takeaway: 'Each design changed what evolution could reach, but the controls explained that change through representation, target choice or selection. The evolved invention did not need to be special to explain the observed expansion.',
  scope: 'This bounds the tested instruments, substrate and building-block library, including one evolved module. It is not a theorem about evolution or a general rejection of the possibility of cumulative invention.' },
 'N-CELL80-BARRIER': {
  takeaway: 'Mutation crossed the engineered food-processing barrier. The lineage did not meet the registered persistence criterion often enough, and later changes arrived before they were eligible for the dependence test.',
  scope: 'The ratchet criterion failed. With zero eligible candidates, conditional dependence was untested; an early event cannot be promoted into a confirmatory result after its outcome is known.' },
 'N-CELL80-HISTORY': {
  takeaway: 'One family transmitted both changes before dying out. The later comparisons make reproductive opportunity a plausible bottleneck, rather than establishing that the conditional advantage reversed.',
  scope: 'This is one transmitted opportunity and one checkpoint ecology. Replication is pending, and the raw-file/report discrepancy remains unresolved. One hundred sampled futures are not one hundred independent innovations.' },
 'N-CELL80-01': {
  takeaway: 'Undoing one inherited program change at one birth removed a later population shift. Replay made it possible to test a particular event instead of relying on how convincing the animation looked.',
  scope: 'The intervention explains this event in the tested world. It does not make that program universally better. A replayable history is useful because it lets the instrument challenge the interpretation.' },
 'N-CELL80-02': {
  takeaway: 'Eleven of twelve worlds kept predator and grazer populations alive for the full run. None of those eleven passed the tests for an evolutionary response between species.',
  scope: 'Persistence and an evolutionary response are different findings. Keeping interactions alive creates a setting in which to ask what evolution can build; it does not by itself establish coevolution.' },
 'N-CELL80-03': {
  takeaway: 'Some combined programs helped their carriers, and some made new choices. The two later improvements did not show that the first change reliably made the next more useful.',
  scope: 'The later food-processing work follows this question without establishing a general ratchet. Replication remains pending, and the reported source discrepancy stays unresolved rather than being silently corrected.' },
 'N-EXHIBITION': {
  takeaway: 'A website can stage an idea through the form its information needs: evidence, uncertainty, transformation and refusal each deserve a distinct voice. Making the notebook extended HAUSE’s shared language.',
  scope: 'This is a design thesis and a record of making. Cinematic movement must explain a relationship, with a designed resting state when motion is reduced. Whether a machine can learn to stage ideas remains an open question.' },
 'N-ATTRIBUTION': {
  takeaway: 'The repository makes the authorship policy enforceable at the pull-request boundary. The check rejects disallowed metadata until it is rewritten; it cannot edit an immutable commit itself.',
  scope: 'The broader proposal is to distinguish accountable authorship from tool provenance. This particular disagreement shows which policy prevailed in this workflow, without establishing a general theory of agent authority.' },
 'N-ADDRESS-BUILD': {
  takeaway: 'For the tested relations, relation information was readable and causally consequential by layer 8. Entity binding became decisive later, between layers 24 and 28 in the final-position residual.',
  scope: 'This is Gemma 3 4B IT, capital versus language, at one residual position. Later layers may carry answer tokens, so the mechanistic window is layers 8–24. A basis change enabling entity commitment remains an inference to test.' },
 'N-MAP': {
  takeaway: 'The map becomes useful when its picture is tied to a specified state, projection and intervention. It shows residual state relative to selected answer directions; the constructed memory makes one reading operation tangible.',
  scope: 'The visualisation is not a complete map of meaning. The small neighbouring-layer test gives no dependable interchangeability rule, and the hand-built memory does not establish how every fact is organised in a trained model.' },
 'N-STATE': {
  takeaway: 'The question is which state must survive at which boundary. Full-sequence transplantation, a single token’s residual and persistent decode state make different claims about continuation.',
  scope: 'The tested planets transition falls between layers 20 and 24 under repeated patches. This does not establish a universal thought layer or justify compressing every conversation into one vector. Positions, tokens and metadata still need an account.' },
 'N-ADDRESS': {
  takeaway: 'Addressing is an operation between a query pattern and a reader. The constructed memory and native-model demonstrations make that operation inspectable, while the retrieval results show where it remains approximate.',
  scope: 'A useful shortlist is not a guaranteed row lookup. Layer choice depends on the metric, and changing weights is a different intervention from swapping transient residual state. Each result belongs to its tested instrument.' },
 'N-AUTHORITY': {
  takeaway: 'Which source can still be read changes which source answers. A compact record can replace a retired source, while a readable competing source can remain decisive; attention access matters to that competition.',
  scope: 'The source was never changed, so the results do not license forgetting it. Late promotion did not reproduce native binding in the tested comparison. Resolving a path outside the model remains a specific architectural direction, not a universal guarantee.' },
 'N-OPERATOR': {
  takeaway: 'Predicting where a model’s trajectory goes and reproducing its computation are different capabilities.',
  scope: 'This is an open distinction, not an experimental finding. Matching a route alone is insufficient to establish an equivalent operation, especially under intervention.' },
 'N-CONTEXT': {
  takeaway: 'Retaining and indexing reusable state may change the cost of returning to earlier work. That possibility motivates the proposition that context could become more abundant.',
  scope: 'A saving has not been measured here. Storage, indexing, retrieval and reconstruction still have costs; the proposal needs a workload and an experiment that compares them.' },
};

export function conclusionFor(record: PublicationRecord): Conclusion {
 return notebookConclusions[record.id] || {
  takeaway: record.abstract || record.dek,
  scope: record.publication === 'published' ? 'Read the supporting evidence and scope in this notebook’s source record.' : 'This is a working note. Its questions and proposals remain subject to revision.',
 };
}
