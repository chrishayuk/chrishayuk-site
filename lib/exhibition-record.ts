import type { PublicationRecord } from "./types.ts";

/** A design-history note. The commit sources are pinned so later HAUSE copy
 * cannot silently rewrite the order in which the design thesis appeared. */
export const exhibitionRecord: PublicationRecord = {
  id: "N-EXHIBITION",
  slug: "i-wanted-a-website-to-behave-like-an-exhibition",
  kind: "notebook",
  title: "I wanted a website to behave like an exhibition.",
  dek: "Before HAUSE was a design system for AI, it was a way of staging ideas.",
  abstract: "The first HOUSE record called itself a cinematic visual language and refused the generic card kit before HAUSE was framed as a design system for AI. This note follows the design thesis from exhibition, scenography and performance through semantic forms to the question of whether a machine can learn to stage an idea.",
  created: "2026-09-08",
  version: "0.1",
  status: "ONGOING",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "EXHIBITION → FORM → LANGUAGE → AI",
  share: {
    linkedin: "Before HAUSE was a design system for AI, it was an attempt to make the web behave more like an exhibition.",
    linkedinComment: "The archive, the forms and the question that followed →",
    x: "Before HAUSE was a design system for AI, it was an attempt to make the web behave more like an exhibition.",
    xReply: "The archive, the forms and the question that followed →",
  },
  concepts: ["semantic-design", "ai-interface", "exhibition-design", "cinematic-design"],
  related: ["W-HAUSE", "W-VINDEX3"],
  media: ["notebook-exhibition"],
  body: [
    { kind: "photograph", media: "notebook-exhibition" },
    {
      kind: "observation",
      label: "01 / THE INFLUENCE",
      text: "I have always been more interested in exhibitions than interfaces: fashion shows, galleries, film and editorial. A room can make one object enormous and another almost disappear. It can make the walk towards something part of understanding it. Dior’s scenography and Burberry’s show environments are useful references because they direct attention and supply context; they are not a mood board for decorative luxury styling.",
      references: [
        { label: "La Galerie Dior", url: "#source-6" },
        { label: "Burberry Summer 2026", url: "#source-8" },
      ],
    },
    {
      kind: "observation",
      label: "02 / DIRECTING ATTENTION",
      text: "A good exhibition does something software often forgets. Not everything receives the same amount of space. Not everything arrives at once. Not everything stays still. Sometimes the room is the argument; sometimes the absence before an object matters almost as much as the object itself.",
    },
    { kind: "statement", text: "Cinematic does not mean motion. It means directing attention through time." },
    {
      kind: "observation",
      label: "03 / THE DESIGN PROBLEM",
      text: "I was not looking for a website covered in animation. I wanted control of arrival, pace, scale, interruption, contrast and reveal: the tools a filmmaker or exhibition designer uses to shape attention. The vocabulary available to software seemed to collapse those decisions into containers.",
    },
    {
      kind: "refusal",
      title: "NO GENERIC CARD KIT",
      lines: ["requested    Card", "needed       a claim, evidence, a question, a comparison"],
      principle: "The content changes. The grammar should be allowed to change with it.",
    },
    {
      kind: "observation",
      label: "04 / WE GAVE IT RECTANGLES",
      text: "Hero. Card. Card. Card. Call to action. Footer. Change the radius, colour or shadow; make one card larger. The content changes while the grammar barely does. Once AI started generating interfaces, the limit became easier to see. Give a model a conventional component library and it will produce a competent wall of rectangles. It is using the language it was given.",
    },
    {
      kind: "observation",
      label: "05 / THE ACT BEFORE THE SHAPE",
      text: "Maybe Card describes the shape of something after the interesting decision has already happened. What matters first is the act. Is this making a claim, showing evidence, asking a question, comparing interpretations, revealing a process or refusing to say something unsupported? Those are not interchangeable styles. They are different parts of a story.",
    },
    {
      kind: "observation",
      label: "06 / THE FIRST RECORD",
      text: "The first HOUSE repository record already described a cinematic visual language for ideas, systems and explanations. Its vocabulary included Hero, Statement, Timeline, Connection, Film, Comparison and FollowReveal. Its design principles refused a generic card kit and said new forms should be built because a real exhibition needed them, not because a taxonomy had a gap.",
      references: [{ label: "HOUSE / first commit", url: "#source-1" }],
    },
    {
      kind: "evidence",
      items: [{
        label: "The exhibition thesis precedes the AI framing",
        status: "SUPPORTED",
        detail: "HOUSE commit 48070bd records the cinematic description and no-card principle at 00:40 BST on 29 August 2026 (23:40 UTC on 28 August). The first hause.design commit followed at 14:37 BST and called itself the design system exhibited in the design system. The explicit design-system-for-AI framing appears later that day in site commit 01da778.",
      }],
    },
    {
      kind: "observation",
      label: "07 / THE SPECIMEN BOOK",
      text: "The first hause.design commit called the site the design system exhibited in the design system. Its front door led into a book divided by mode—Statements, Instruments and Performances—rather than a documentation sidebar. The site was not explaining an exhibition metaphor from outside. It was using the language to exhibit itself.",
      references: [{ label: "hause.design / first commit", url: "#source-2" }],
    },
    {
      kind: "observation",
      label: "08 / THREE ROOMS",
      text: "Statements are forms the reader reads. Instruments are forms the reader operates. Performances are forms the reader watches. The categories appeared after real pages needed different ways of explaining things. The material asked for the rooms; the library named them afterwards.",
      references: [{ label: "HAUSE / current record", url: "#source-4" }],
    },
    {
      kind: "comparison",
      objectLabel: "The words stay the same. The reading changes.",
      blockLabels: ["Claim", "Evidence", "Question"],
      left: { label: "As containers", properties: ["The exhibition thesis came first.", "28 August 2026, 23:40 UTC — the first HOUSE README called it a cinematic visual language for ideas, systems and explanations.", "Can an AI learn to stage an idea?"] },
      right: { label: "As semantic forms", properties: ["The exhibition thesis came first.", "28 August 2026, 23:40 UTC — the first HOUSE README called it a cinematic visual language for ideas, systems and explanations.", "Can an AI learn to stage an idea?"] },
    },
    {
      kind: "observation",
      label: "09 / THE QUESTION CHANGED",
      text: "The original problem was artistic: how should I stage this idea? Working increasingly with AI turned it into a systems question: how does a machine know how to stage this idea? A human designer can decide that one sentence deserves an entire screen. A model needs a language for making that decision. Twenty variants of Card do not provide it; communicative acts might.",
    },
    { kind: "statement", text: "Not every idea deserves a card. Some deserve a room." },
    {
      kind: "observation",
      label: "10 / INFORMATION HAS DRAMATURGY",
      text: "An uncertainty should not look like a conclusion. Evidence should not have the same voice as an assertion. A transformation may be clearer when it happens rather than when it is described. A refusal should stand confidently on the page instead of hiding inside an error message. The ambition is not merely for an AI to assemble a valid interface, but to recognise that information has dramaturgy.",
    },
    {
      kind: "observation",
      label: "11 / EXIT · HOLD · ENTER",
      text: "Cinematic can become an excuse for gratuitous motion. That is not the point. HAUSE stages a change when the relationship requires it: exit, a held beat, enter. A crossfade can suggest two physical states coexist; an authored absence can say that one has ended before another begins. The transition is part of the explanation, while reduced motion and no JavaScript retain a designed resting state.",
      references: [{ label: "HAUSE / Performances", url: "#source-5" }],
    },
    {
      kind: "question",
      text: "Can an AI learn to stage an idea?",
      status: "OPEN",
      detail: "The next question is whether a model can choose among semantic forms because it understands the communicative act, rather than because a keyword happened to match. That turns an artistic instinct into something the system can test.",
    },
  ],
  sources: [
    {
      title: "HOUSE / first repository commit",
      url: "https://github.com/chrishayuk/hause/commit/48070bd53c1df674d904652d150b4ab1ee527448",
      note: "Authored 29 August 2026 at 00:40:06 BST (28 August at 23:40:06 UTC). The README calls HOUSE a cinematic visual language, lists the original forms, refuses a generic card kit and says forms arise from real exhibitions.",
    },
    {
      title: "hause.design / first repository commit",
      url: "https://github.com/chrishayuk/hause-site/commit/58dac4aae1d245705449423b5179e0fb94ee860e",
      note: "Authored 29 August 2026 at 14:37:43 BST. The commit describes the design system exhibited in the design system; the first front door leads to Statements, Instruments and Performances.",
    },
    {
      title: "hause.design / the explicit AI framing",
      url: "https://github.com/chrishayuk/hause-site/commit/01da7785e494874372e4c79e5f7882e5b753f23c",
      note: "Authored 29 August 2026 at 19:18:55 BST. This is the later commit that explicitly describes HAUSE as a design system for AI and adds Ask HAUSE.",
    },
    {
      title: "HAUSE / current source record",
      url: "https://github.com/chrishayuk/hause/tree/b785b0508b251b5a57eaf163b19c44164cd0feec",
      note: "Pinned source reviewed 8 September 2026. The README retains Read / Operate / Watch, the no-card principle and the rule that a real page must expose an explanatory need before a form is promoted.",
    },
    {
      title: "HAUSE / Performances",
      url: "https://hause.design/performances",
      note: "Reviewed 8 September 2026. The page describes cinematic forms, designed resting states and the exit → held beat → enter staging rule.",
    },
    {
      title: "La Galerie Dior / models on the staircase",
      url: "https://www.galeriedior.com/en/galleries/models-on-the-staircase",
      note: "Official Galerie Dior reference, reviewed 8 September 2026. Used as an editorial reference for circulation becoming presentation; no Dior photography is reproduced here.",
    },
    {
      title: "Dior: Crafting Fashion",
      url: "https://www.dior.com/en_gb/fashion/news-savoir-faire/folder-news-and-events/dior%3A-crafting-fashion",
      note: "Official Dior exhibition page, reviewed 8 September 2026. It describes seven thematic sections, multiple perspectives and set design that guides the eye through transformation.",
    },
    {
      title: "Burberry / Summer 2026 show",
      url: "https://int.burberry.com/c/burberry-world/collections/summer-2026-show/",
      note: "Official Burberry show page, reviewed 8 September 2026. It describes a custom tent and an earth-toned environment inspired by the atmosphere of UK summer music culture; no Burberry photography is reproduced here.",
    },
    {
      title: "Burberry / Our Story",
      url: "https://uk.burberry.com/c/burberry-world/heritage/our-story/",
      note: "Official Burberry history, reviewed 8 September 2026. It records the 1968 Hayward Gallery campaign, Burberry Acoustic and the 2010 fashion-show livestream.",
    },
  ],
};
