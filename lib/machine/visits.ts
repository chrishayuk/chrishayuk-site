/** Transcribed from the frozen protocol's ledger. Null means not established
 * by this source, never that the visitor skipped an action. */
export const VISIT_NOTE_PATH = "/notebook/can-a-machine-use-an-invitation";
export const VISITS = [
 { run: 1, revision: "5577b6a", discovery: ["Guessed /llms.txt"], declared: true, ask: "Not available", feedback: "None recorded", feedbackState: "absent", result: "An invitation could be found and acted on. Discovery depended on a guess.", validatedFirst: null, verb: null, exactUrlSequence: null },
 { run: 2, revision: "94f463d", discovery: ["robots.txt", "Followed its comment"], declared: true, ask: "Not available", feedback: "2 acknowledged · lost", feedbackState: "lost", result: "The visitor acted and reported friction. The server acknowledged two reports without retaining them.", validatedFirst: null, verb: null, exactUrlSequence: null },
 { run: 3, revision: "fb3989f", discovery: ["robots.txt", "Machine index"], declared: true, ask: "Judged worse than anonymous", feedback: "2 kept", feedbackState: "kept", result: "Feedback survived. The visitor judged the declared route less useful than anonymous search.", validatedFirst: null, verb: null, exactUrlSequence: null },
 { run: 4, revision: "57e8e98", discovery: ["Link: header on /"], declared: true, ask: "Used · judged useful", feedback: "2 kept", feedbackState: "kept", result: "The visitor composed topology=child, function=explorer, coordination=worker and runtime_context=very_long without hesitation. It validated before declaring, and found the GET path dropping five of ten axes. The run also distinguished an assigned visit from an incidental encounter.", validatedFirst: true, verb: null, exactUrlSequence: null },
] as const;
