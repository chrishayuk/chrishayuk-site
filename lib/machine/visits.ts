/** Transcribed from the frozen protocol's ledger. Null means not established
 * by this source, never that the visitor skipped an action. */
export const VISIT_PROTOCOL_PATH = "/machines/experiments/MACHINE-VISIT-1";
export const VISITS = [
 { run: 1, revision: "5577b6a", discovery: ["Guessed /llms.txt"], declared: true, ask: "Not available", feedback: "None recorded", feedbackState: "absent", result: "An invitation could be found and acted on. Discovery depended on a guess.", validatedFirst: null, verb: null, exactUrlSequence: null },
 { run: 2, revision: "94f463d", discovery: ["robots.txt", "Followed its comment"], declared: true, ask: "Not available", feedback: "2 acknowledged · lost", feedbackState: "lost", result: "The visitor acted and reported friction. The server acknowledged two reports without retaining them.", validatedFirst: null, verb: null, exactUrlSequence: null },
 { run: 3, revision: "fb3989f", discovery: ["robots.txt", "Machine index"], declared: true, ask: "Judged worse than anonymous", feedback: "2 kept", feedbackState: "kept", result: "Feedback survived. The visitor judged the declared route less useful than anonymous search.", validatedFirst: null, verb: null, exactUrlSequence: null },
] as const;
