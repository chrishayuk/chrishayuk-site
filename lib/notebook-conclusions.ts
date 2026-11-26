import type { PublicationRecord } from './types.ts';

type Conclusion = { takeaway: string; scope: string };
/** Editorial summaries of the current records, not additional experimental claims. */
export const notebookConclusions: Record<string, Conclusion> = {
 'N-MACHINE-LINK': {
  takeaway: 'A correct address is not a request. In these four trials, the plain-text path produced no code-page requests; the same destination presented as a hyperlink was requested twice and both exact codes were returned.',
  scope: 'Two trials per condition, one host, one day. The amendment followed the original failure, whose verdict remains FAIL. A complete absolute URL in plain text was not tested, and the component that prevented the requests is unknown. The source records preserve the post hoc comparison and its limits.' },
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
 'N-MOUSE': {
  takeaway: 'A port can match its reference exactly and still be wrong, because the reference was. The agent guessed one inherited misprint and said it had not checked; it copied three other bugs without knowing they were there.',
  scope: 'One port, one session, one small interpreter. The bugs were found by a reader in 1980, not by the agent. Where the C reference came from has not been established.' },
 'N-BOHM': {
  takeaway: 'A compiler written in 1951 for a machine that was never more than a design runs, and compiles itself, once four slips in its printed text are corrected. Three of them were found by running it; the fourth had been reported in 1976.',
  scope: 'One thesis, one session, one agent that wrote all three readings the result rests on. The only outside check is one formula Knuth and Trabb Pardo worked by hand. An earlier implementation is reported and was not found.' },
 'N-CPL': {
  takeaway: 'The one large program in the 1966 papers that define CPL does not compile as printed, and with its typing slips put right it gives wrong answers in two ways. With eleven corrections it runs, and reads its own text to the last word.',
  scope: 'One appendix, read from a scan by one coding agent in one session, on an interpreter the same agent built. Each slip has a page number and a detail of the page. Whether the program was run in 1966 is not known.' },
 'N-JOSS': {
  takeaway: 'Five console sessions printed in RAND’s papers of 1964 and 1965, typed again on a reconstruction of JOSS, come out the same on all 767 lines. Five of them, one unit in the last digit of a logarithm, an exponential or a power, come out right only when JOSS’s own routines are followed from its 1965 listing: its logarithm cuts off where it should round.',
  scope: 'Five sessions, read from scans and replayed by one coding agent in one session. The columns were fitted to these pages; the digits were not, and the routines are a reading of the listing, not a run of the original. A second model spot-checked twenty places. What the sessions do not exercise rests on a listing of the program and has no page to check it against.' },
 'N-LANING-ZIERLER': {
  takeaway: 'The three complete programs in Laning and Zierler’s 1954 manual run on a reconstruction built from it, and give answers that check against mathematics. The troubles worth reporting are a slip in the manual’s own figure for its largest number, a 1954 copy of its differential-equation program that would not have been accepted, and an incompatibility between Knuth and Trabb Pardo’s 1976 example and the 1954 specification: on its last number it uses a computed zero as an index, which the manual forbids whatever its sign. The one page of 1954 output found, from the lead-pursuit program, agrees with the reconstruction to within 4.2 parts in ten million, except two values from the arcsine.',
  scope: 'One manual and three later accounts, read from scans by one coding agent in one session, on an interpreter the same agent built. The translator of 1954 has not been found; a smaller version of March 1953 survives and was not used. The page of output is checked only to its end, at t = .6, and does not use x|N. The sign given to a computed zero is an inference, and the alarm the reconstruction gives TPK rests on it; as far as is known TPK was never run on Whirlwind. A second model reviewed the repository and checked twenty places against the scans, and later the lead-pursuit transcriptions.' },
 'N-TURING-ACE': {
  takeaway: 'The two programs in Turing’s 1945 report do not run as printed on the machine the report describes. INDEXIN needs three corrections, all slips; CALPOL five changes, three of them slips. Three of the thirteen cards Turing drew for INDEXIN disagree with its table, a reading checked blind by a second model.',
  scope: 'One report, read by one coding agent in one session, on a simulation the same agent built at the level of instructions. Nine places where the report says two things were decided one way, and the tables were drafts by Turing’s own account. Carpenter and Doran noted some of the same problems in 1986, and their 1977 analysis of CALPOL was not read; a second model reviewed the repository.' },
 'N-IPLV': {
  takeaway: 'The IPL-V manual of 1964 prints one run of its own system in full, and a reconstruction built from the manual agrees with all 46 lines of its trace, cycle count included. That count settles how the 1963 Logic Theorist measured its effort, and transcribing the manual’s own programs found two things wrong with the reconstruction.',
  scope: 'Three small runs of one system the manual does not name, and one deck transcribed by others, read from scans by one coding agent in one session on a machine the same agent built. The last 1.5 per cent of the Logic Theorist’s effort is not explained. Moews and Shrager ran that deck first; a second model reviewed the repository.' },
 'N-RHIND-PAPYRUS': {
  takeaway: 'Checked exactly against its own working, 845 of the 956 lines of the Rhind papyrus, as transcribed, agree. The 113 diagnostic records on the rest are of three kinds: 75 differ only in the sign for “part”, a notation Chace says need not be an error; 4 are ticks; 34 are figures, most of them pointed out by Chace or Peet, like the 15 for 14 in Problem 27. Nothing new is claimed about the papyrus; what has been made is its working as a structured, executable object, whose every step the notation can hold can be challenged, changed and checked again, page by page or all at once, by anyone, in the browser.',
  scope: 'One transcription of two editions, made from page images by a coding agent and its sub-agents, reviewed at 72 places by a second model and by no person. Every count is against that transcription and the checker’s stated choices; the review found the first census unsound, and these are the numbers after its findings were acted on. 2 ÷ 59 is a question for the photograph. Imhausen and the literature on the 2 ÷ n table were not read.' },
 'N-GEORGE': {
  takeaway: 'An interpreter built from Hamblin’s 1958 manual runs the manual’s programs, and Example 3 punches a quarter of what Simpson’s rule gives: its coefficients are for a step of a sixteenth, not a quarter. His own translator, transcribed from 22 handwritten coding sheets and run on a simulated DEUCE, runs the same programs; traced instruction by instruction, it now agrees with the interpreter on 4,993 of 5,000 random programs, the other 7 differing where the manual says otherwise, and shows an addition that drops a binary digit and a multiplication that can lose the sign.',
  scope: 'One manual, 52 pages of flow diagrams and 22 coding sheets, read from scans by a coding agent and its sub-agents, and checked by no person. Running his translator needed three corrections where a sheet contradicts its flow diagram, and choices the sheets cannot show; the two routes share the program reader and the card formats, so their agreement does not check those.' },
 'N-ALGOL-60': {
  takeaway: 'No copy has been found of the first ALGOL 60 system’s run-time routines, but its documents say what they did. Rebuilt from those documents, the run-time reproduces 80 of the 82 numbers the X1 printed for one program in 1964; the other two are last digits just above a decimal tie. The page also corrected the rebuild in two places, and the real compiler, run on a simulator, showed that most of the manual’s 23 rules were advice, not checks.',
  scope: 'One run of X1 output for one program, which uses no switches, own variables or deep recursion. The other evidence is the compiler on a simulator whose run-time is itself a reconstruction. Everything was read and built by one coding agent; a thesis on how the X1 ran programs is under embargo until 2027 and was not read.' },
 'N-ATLAS-AUTOCODE': {
  takeaway: 'Rebuilt from its 1965 manual, Atlas Autocode prints the words of all 29 lines of the one full page COMPILER AB printed that survives with its program, and the Mini-Manual’s table of binomial coefficients number for number. The listing printed with the first page declares a′ and assigns a″, so it would not have compiled; the printout suggests the program that ran declared a″. The second page’s map counts a line its listing lacks, and the manual’s first program prints a negative sum of squares.',
  scope: 'Two pages of COMPILER AB output, both retyped for the documents they are in, and nothing printed by COMPILER AA. The monitor’s layout was read off the page it is tested against; the line and serial numbers, values and cycle counts come from running the program. Everything was read and built by one coding agent in a day.' },
 'N-BABBAGE': {
  takeaway: 'Run as he wrote them, the two programs on Babbage’s sheet of 4 and 5 August 1837 agree with what their operations do in 122 of the 123 things the sheet states: every store cell, formula and accent, both compositions, the results and the counts. The sheet relies on the mill keeping a table of multiples between operations, as Babbage’s own remark explains, and its accents name numbers, not columns. The one disagreement is a subtraction whose result is written −c − ax.',
  scope: 'One sheet of the 27 in the series, with the engine’s rules read off that sheet alone. The transcription was made from the scans by one coding agent and has not been checked by a person; two readings by Rojas were read and a short search made; Bromley’s paper of 2000 was not read.' },
 'N-ABSYS': {
  takeaway: 'Rebuilt from its designers’ papers, Absys gives every result they print: Elcock’s binding environments for append and reverse variable for variable, with the equations between unknowns held suspended until one is known, Clark’s students, set, and the three triples of 1969 in the paper’s order. One text gave one outcome in all 5,040 orders of its assertions; only not makes the order matter. Elcock’s setdiff, run on inputs chosen here, gives the right answer if each applied body takes its goal’s place, or if not waits for its variables; it favours one answer to a question his account leaves open. Every list of relations in Elcock’s 1982 walk-through comes out as printed once returned relations go to the head of the list, against his word “appended”; that settles the order only if the lists were copied from a run.',
  scope: 'No Absys program or listing survives; the language is rebuilt from three papers, one read only in OCR extracts, and where they are silent the choice made is listed as a decision. Elcock and Gray’s fuller description of 1988 has not been seen. Everything was read and built by one coding agent in one day and has not been checked by a person. The comparison with Prolog was run on SWI-Prolog 11.0.1 alone; no Prolog of the 1970s was run.' },
 'N-Q-SYSTEMS-POSSIBILITIES': {
  takeaway: 'Measured on graphs built to test it, the reconstructed machine of Colmerauer’s report works on shared alternatives as they stand: 2⁴⁰ strings in 80 arrows are rewritten in 80 applications, and the report’s grammar writes 9,565,938 paraphrases into 2,760 arrows. But a result carried along a string is made once for each path that reaches it, because the report adds a whole new path for every application and no rule can see two alternatives at once: parity of twelve choices costs 8,190 applications for two results. A variant that merges equal arrows does it in 46 and can still count every derivation, but changes what A == A. means. The second phase removes strings no rule touched; purifying by strings keeps them but breaks the report’s analysis and its cul-de-sac, so the loss is what makes analysis return only complete analyses.',
  scope: 'The machine as the report describes it, not the lost program, which may have merged equal arrows; none of the report’s examples could show it. The graphs of choices and the variants are our own. Beyond one embedded clause the grammar was sampled. Everything was built and measured by one coding agent and checked by no person, and merging equal results is the familiar idea of tabulation, so nothing is claimed as new.' },
 'N-Q-SYSTEMS': {
  takeaway: 'Rebuilt from Colmerauer’s report of 1970, the Q-systems give every result it prints but two. A rule never replaces anything: it adds a path beside the one it matched, and rewritten arrows go only at the end, so one graph holds every alternative. The report’s sixteen French rules, inverted, analyse its sentence into one tree; as written, they synthesise its eighteen paraphrases into one graph of nineteen vertices that matches the printout of pages 38 to 40 line for line, and each paraphrase analyses back to the tree. The two that differ: the rules of page 30 for turning a tree into a string do not stop as printed, and the last printout comes out in exactly the reverse order. And the rules for removing a string remove every string that shares an arrow with it.',
  scope: 'No program text survives; the formalism is rebuilt from one report, read from its scans, which lacks printed page 23. The order of printing is a decision fitted to the report’s pages; the two-readings grammar is ours. The TAUM grammars have not been seen. Everything was read and built by one coding agent and has not been checked by a person; no literature search was made.' },
 'N-NINE-CHAPTERS': {
  takeaway: 'Worked on a counting board as the text says, 38 of the 39 statements of chapter 8 of the Nine Chapters and its commentators that the board reaches agree with it; the one that does not is Problem 6, whose signs in this edition give −8 and −3, as Li Huang saw when he corrected them. The text writes each problem’s fractional answers over one denominator, not always in lowest terms: Problem 2’s 1 18/52 is over 52, the 法 as the board leaves it. Liu Hui’s 77 算 does not work as printed, but both published reconstructions of it run: Guo Shuchun’s, counting operations, and Roger Hart’s, counting rods, which keeps within 77 only if each step is worked from the bottom up. Each reaches 77 only on its own path, so the number cannot choose between them. Nothing new is claimed about the text; what has been made is the chapter as a structured, executable object, whose every step can be challenged, changed and run again, page by page or all at once, by anyone, in the browser.',
  scope: 'One transcription of one edition, the Sibu congkan reprint of the Weiboxie text, made from the scans by a coding agent and its sub-agents, reviewed by a second model and by no person. Every result is against that transcription and the choices jiuzhang decisions lists, and is not a census of every number in the text. Dai Zhen’s 99 is given only by a rule proposed after the fact; none of 100,000,000 combinations of a small menu makes Liu Hui’s 77 passage work as printed. Guo’s and Hart’s reconstructions were run from a second model’s extraction of their work; Guo’s 10 placings of rods are not modelled, and which reading Liu Hui meant is not decided. The literature was searched by a second model, not read here.' },
 'N-NINE-CHAPTERS-124': {
  takeaway: 'Run on Guo Shuchun’s working of Liu Hui’s new method, with every operation up to the peak fixed by the text, no count of operations gives Liu Hui’s 124, and the counting board holds at most 124 rods, exactly, at the step before the text takes the third column away. That 124 means rods was already the reading of Hart and of Wei and Guo; the run supplies a measurement that supports it, which anyone can repeat in the browser.',
  scope: 'One published working, read from an OCR transcription by a second model and checked by no person, under a rule of rods that confirms Hart’s fifteen counts. A total near 124 could arise by chance; the evidence is that it is exact, the maximum, at the text’s own clearing of a column, and that no operation count reaches it. It holds only if a multiple can be taken at once: with every take done singly, the least is 125. Wei and Guo (2016) could not be read beyond their opening and may already state this.' },
 'N-TPK': {
  takeaway: 'Run on reconstructions built from each system’s own sources, none of Knuth and Trabb Pardo’s three TPK programs that can be tested is accepted as printed: Böhm’s uses two letters his compiler keeps and prints nothing; Laning and Zierler’s reads its input with a routine not yet in operation; ALGOL 60’s heading breaks the Report, and the surviving X1 compiler refuses its label and compiles the heading’s parameter as a value array. Knuth had corrected the heading in 2014. Six systems they did not cover give six other answers, from accepted by the manual to not expressible in the defining document.',
  scope: 'The Böhm, Laning and Zierler, and Report findings are the documents’ rules applied by reconstructions; only the X1 findings come from a surviving compiler. The six new programs were written and checked by a coding agent against the reconstructions they run on. The search for earlier work was limited, and two reprints and most of one thesis could not be read.' },
 'N-BASIC': {
  takeaway: 'An interpreter can run every later program it is shown, agree with a second implementation, and still stop on the language’s first manual. In 1964 a square root was taken of the absolute value; the later BASICs that everything had been checked against call that an error.',
  scope: 'One interpreter, the programs of two 1964 manuals: three from a reprint of the May beginners’ part, and the October manual’s, whose rules for printing 1964 mode follows. Its arithmetic and random numbers are not 1964’s. The checks were run by a coding agent and reported. Other differences from the 1964 language may not have been met yet.' },
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
