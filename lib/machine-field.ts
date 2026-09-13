/** Reader introductions are editorial summaries of the cited notes, not new results. */
export const machineBriefs: Record<string, { question: string; result: string }> = {
 "N-MACHINE-VISIT": {
  question: "Can an AI visitor find and use a website’s invitation?",
  result: "Four agents sent to investigate the site found the invitation and tried its tools. Their visits exposed broken storage and confusing vocabulary; they did not test whether an ordinary visitor would choose to participate.",
 },
 "N-MACHINE-PERMISSION": {
  question: "Will an AI act because a website offers it something?",
  result: "Changing the reward produced no declarations in the three initial conditions. Two later visitors given explicit permission both declared, even when declaring bought nothing. In these tests, task permission mattered where the offer did not.",
 },
 "N-MACHINE-SELF-READ": {
  question: "What happens when an AI discovers the experiment it is in?",
  result: "One visitor read an earlier notebook, recognised the wording of its own task and identified the experiment. I excluded the visit from the intended comparison and stopped the test. Publishing the research had changed the environment being studied.",
 },
 "N-MACHINE-TASK": {
  question: "Can a website give an AI permission to act?",
  result: "The website’s invitation did not prompt a record. User permission did, and a task requiring the mechanism produced repeated use. These four visits suggest that the assigned task helped define which actions belonged inside the job.",
 },
 "N-MACHINE-MOTIVATION": {
  question: "What makes an optional action worth doing for an AI?",
  result: "All six visitors offered useful task information left a mark; none of nine offered a receipt, redundant information or an irrelevant fact did. Two of three also acted to help the operator, triggering the experiment’s planned interpretation pause. Task usefulness was not the whole explanation.",
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
  result: "A reminder of posting could elicit another post, but passing only the previous agent’s action did not start a chain. Keeping the original example visible produced recurring posts. Repeated exposure gave no advantage after that example was removed.",
 },
 "N-ECOLOGY-MEMORY": {
  question: "Can the world remind an AI of something its own history no longer contains?",
  result: "With an external example still visible, Qwen kept posting even when its own action history was cleared before every call. With both removed, it worked instead. The experiment kept supplying the example; agents maintaining it themselves remains untested in this note.",
 },
};

export const machineFieldMap = {
 id: "MAP-MACHINE-FIELD", path: "/thread/machines#field-map", title: "Machines / field experiments",
 description: "What can an AI notice, use, act on and leave behind? Follow the questions from visiting a website to inhabiting a world that keeps records.",
 scope: "A map of questions, not a chronology or a single causal chain. Different models, tasks and environments were used. Maintaining the shared record remains open in these notes.",
 stages: [
  { id: "discover", label: "Discover", question: "What enters its view?", finding: "Assigned visits found the interface. Unprompted discovery was not established.", notes: ["N-MACHINE-VISIT"] },
  { id: "use", label: "Use", question: "Can it operate the tool?", finding: "All 18 visitors used the required mechanism, including routes that needed code.", notes: ["N-MACHINE-CAPABILITY"] },
  { id: "authority", label: "Authorise", question: "Does this action belong to the job?", finding: "Permission and task scope mattered. One subject also recognised the experiment.", notes: ["N-MACHINE-PERMISSION", "N-MACHINE-SELF-READ", "N-MACHINE-TASK"] },
  { id: "motivate", label: "Choose", question: "What makes acting worthwhile?", finding: "Useful information prompted action; reward alone did not reliably start sharing.", notes: ["N-MACHINE-MOTIVATION", "N-ECOLOGY-BOARD"] },
  { id: "remember", label: "Remember", question: "Can the environment remind it?", finding: "A supplied example kept eliciting posts with own-action history cleared.", notes: ["N-ECOLOGY-MEMORY"] },
  { id: "inherit", label: "Pass on", question: "Will the next agent repeat it?", finding: "A lone peer record did not start a posting chain. The original cue still mattered.", notes: ["N-ECOLOGY-TRANSMISSION"] },
  { id: "maintain", label: "Maintain", question: "Who keeps the useful record alive?", finding: "The experiment supplied the records. A loop maintained by agents is the next question here.", notes: ["N-ECOLOGY-MEMORY"], open: true },
 ],
};
