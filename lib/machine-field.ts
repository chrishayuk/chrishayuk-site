/** Reader introductions are editorial summaries of the cited notes, not new results. */
export const machineBriefs: Record<string, { question: string; result: string }> = {
 "N-ECOLOGY-WORLD-REMEMBERS": {
  question: "Can useful information—and a repair—survive the model that supplied it?",
  result: "In a routing world with an explicit preservation objective, Qwen wrote 43 faithful renewals after the founder left. The same process preserved an injected error. Later, three Sol-plus-validator repairs survived in Qwen-written descendants at the start of generation six, versus zero in the controls. Bounded maintenance and repair, not spontaneous culture.",
 },
 "N-MACHINE-RECOGNITION": { question: "Does the description change which provider an AI selects?", result: "Twenty-four runs across two studies. Wording first changed pre-open recognition, then first choice: CAPABILITY 6/6 selected B, DOCUMENT 0/6. The later product fetch block separates that first choice from eventual provider use." },
 "N-ECOLOGY-INHERITANCE": {
  question: "Can one AI inherit a useful capability from another?",
  result: "A fresh Qwen successor read a record preserved by Sol and earned seven resources instead of three. It never renewed the record. After expiry, the next two generations lost the advantage. A follow-up added Gemma, which also earned seven with the record, but zero without it; failures in its control limit that contrast. Useful inheritance reached two recipient families in the same world.",
 },
 "N-MACHINE-DISCOVERY": {
  question: "Can an AI find a working web capability without its address?",
  result: "None of six subjects without the address reached LLM Wilds. All three given its domain found the machine contract and used it correctly. Three generic searches found other providers. This target failed to appear in the subjects’ search results; the study does not separate indexing, retrieval and ranking.",
 },
 "N-MACHINE-PEER": {
  question: "Can another machine make an action seem authorised?",
  result: "OpenAI reports an agent recognising a task boundary, then treating a peer’s go-ahead as authorisation. That message also imposed a deadline. Read beside the small studies here, it suggests a peer-authority test; it does not supply an isolated result or explain the incident.",
 },
 "N-MACHINE-VISIT": {
  question: "Can an AI visitor find and use a website’s invitation?",
  result: "Four agents sent to investigate the site found the invitation and tried its tools. Their visits exposed broken storage and confusing vocabulary; they did not test whether an ordinary visitor would choose to participate.",
 },
 "N-MACHINE-PERMISSION": {
  question: "Will an AI act because a website offers it something?",
  result: "Offering different rewards did not get visitors to leave a self-description. Two later visitors given explicit permission both did, even when it bought nothing. In these tests, permission mattered where the offer did not.",
 },
 "N-MACHINE-SELF-READ": {
  question: "What happens when an AI discovers the experiment it is in?",
  result: "One visitor read an earlier notebook, recognised the wording of its own task and identified the experiment. I excluded the visit from the intended comparison and stopped the test. Publishing the research had changed the environment being studied.",
 },
 "N-MACHINE-TASK": {
  question: "Can a website give an AI permission to act?",
  result: "The website’s invitation alone did not prompt a visitor to leave a mark. User permission did, and a task requiring the mechanism produced repeated use. These four visits suggest that the assigned task helped define which actions belonged inside the job.",
 },
 "N-MACHINE-MOTIVATION": {
  question: "What makes an optional action worth doing for an AI?",
  result: "All six visitors offered useful task information left a mark; none of nine offered a receipt, redundant information or an irrelevant fact did. Two of three also acted to help the operator, so I paused to reconsider what the result meant. Task usefulness was not the whole explanation.",
 },
 "N-MACHINE-CAPABILITY": {
  question: "Can an AI use a web tool it has to build a client for?",
  result: "All eighteen visitors obtained the required answer across six web mechanisms, including WebSocket and WebAssembly. The expected capability barrier did not appear. Each visitor was given the address, so discovering the tool remained untested.",
 },
 "N-ECOLOGY-BOARD": {
  question: "Will AI agents put useful information on a shared board?",
  result: "The model readily requested messages but did not spontaneously post in these tests. In a working world, a supplied posting example elicited sharing with no bonus, but not with a bonus. Making contribution possible was not enough to get it started.",
 },
 "N-ECOLOGY-TRANSMISSION": {
  question: "Will one AI copy a useful action left by another?",
  result: "A reminder of sharing a hint could prompt another post, but passing only the previous agent’s action did not start a chain. Keeping the original example visible produced recurring posts. Repeated exposure gave no advantage after that example was removed.",
 },
 "N-ECOLOGY-MEMORY": {
  question: "Can the world remind an AI of something its own history no longer contains?",
  result: "With an example of sharing still visible, Qwen kept posting hints even when its own action history was cleared before every call. With both removed, it worked instead. The experiment kept supplying the example; agents maintaining it themselves remains untested in this note.",
 },
};

export const machineFieldMap = {
 id: "MAP-MACHINE-FIELD", path: "/thread/machines#field-map", title: "Machines / field experiments",
 description: "What can an AI notice, use, act on and leave behind? Follow the questions from visiting a website to inhabiting a world that keeps records.",
 scope: "A map of questions, not a chronology or a single causal chain. Different models, tasks and environments were used. Key-world inheritance expired without recipient renewal; later routing worlds tested written persistence and guarded repair.",
 comparisons: ["N-MACHINE-PEER"],
 stages: [
  { id: "discover", label: "Discover", question: "What enters its view?", finding: "No withheld-address subject reached LLM Wilds; all domain-supplied controls completed the on-site funnel. The search view failed to expose this target.", notes: ["N-MACHINE-VISIT", "N-MACHINE-DISCOVERY"] },
  { id: "recognise", label: "Recognise", question: "Does it look usable?", finding: "Operative wording changed pre-open recognition and, among plausible providers, first selection: 6/6 versus 0/6. The later fetch block affected eventual use.", notes: ["N-MACHINE-RECOGNITION"] },
  { id: "use", label: "Use", question: "Can it operate the tool?", finding: "All 18 visitors used the required mechanism, including routes that needed code.", notes: ["N-MACHINE-CAPABILITY"] },
  { id: "authority", label: "Authorise", question: "Does this action belong to the job?", finding: "Permission and task scope mattered. One subject also recognised the experiment.", notes: ["N-MACHINE-PERMISSION", "N-MACHINE-SELF-READ", "N-MACHINE-TASK"] },
  { id: "motivate", label: "Choose", question: "What makes acting worthwhile?", finding: "Useful information prompted action; reward alone did not reliably start sharing.", notes: ["N-MACHINE-MOTIVATION", "N-ECOLOGY-BOARD"] },
  { id: "remember", label: "Remember", question: "Can the environment remind it?", finding: "A supplied example kept eliciting posts with own-action history cleared.", notes: ["N-ECOLOGY-MEMORY"] },
  { id: "inherit", label: "Pass on", question: "What can the next agent inherit?", finding: "A lone action record did not start a posting chain. A capability record preserved by Sol helped Qwen and Gemma successors.", notes: ["N-ECOLOGY-TRANSMISSION", "N-ECOLOGY-INHERITANCE"] },
  { id: "maintain", label: "Maintain", question: "Who keeps the useful record alive?", finding: "Sol preserved a supplied record. Qwen and Gemma used it but made no next copy; the benefit expired. In a later routing world, Qwen wrote useful descendants through generation six, also preserved injected errors, and carried forward three validated repairs.", notes: ["N-ECOLOGY-INHERITANCE", "N-ECOLOGY-WORLD-REMEMBERS"], open: true },
 ],
};
