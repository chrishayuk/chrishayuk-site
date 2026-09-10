import type { PublicationRecord } from "./types.ts";

/** Personal experiments in an established artificial-life tradition. Working drafts. */
export const cell80Records: PublicationRecord[] = [
  {
    "id": "N-CELL80-01",
    "slug": "can-you-name-the-mutation-that-changed-a-world",
    "kind": "notebook",
    "title": "Can you name the mutation that changed a world?",
    "dek": "One birth. Two inherited changes. A world I can run again.",
    "abstract": "Artificial-life researchers have been building evolving digital organisms for decades. Tierra and Avida are important precedents. I built this small executable world because I wanted to inspect its histories and test these distinctions for myself. The note records what happened in my system; it makes no claim to a new principle of evolution. A one-field reversion removes a recorded sustained plurality shift. This is one event, not a demonstration of fixation or a universal fitness advantage.",
    "created": "2026-09-09",
    "version": "0.1",
    "status": "SUPPORTED",
    "publication": "draft",
    "authors": [
      "Chris Hay"
    ],
    "lineage": "CELL80 / 01 · WORLD → INTERVENTION → QUESTION",
    "concepts": [
      "artificial-life",
      "digital-evolution",
      "causal-intervention"
    ],
    "related": [
      "N-CELL80-02",
      "N-CELL80-03"
    ],
    "media": [],
    "body": [
      {
        "kind": "observation",
        "label": "A deep old question",
        "text": "Artificial-life researchers have been building evolving digital organisms for decades. Tierra and Avida are important precedents. I built this small executable world because I wanted to inspect its histories and test these distinctions for myself. The note records what happened in my system; it makes no claim to a new principle of evolution.",
        "references": [
          {
            "label": "Tierra — evolution of digital organisms (CMU repository)",
            "url": "https://www.cs.cmu.edu/afs/cs.cmu.edu/project/ai-repository/ai/areas/alife/systems/tierra/0.html"
          }
        ]
      },
      {
        "kind": "observation",
        "label": "THE NOTE",
        "text": "At tick 993, the two histories are identical."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "At tick 994, organism 2231 is born. It inherits its parent's genome with two changes: a lower threshold for reproduction and a different program deciding when reproduction should happen."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "threshold 198 → 192"
      },
      {
        "kind": "observation",
        "label": "",
        "text": "program 37 → 33"
      },
      {
        "kind": "observation",
        "label": "",
        "text": "In one history, I leave that birth as it happened. In the other, I undo only the program change. The lower threshold stays."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Then I run the world forward."
      },
      {
        "kind": "observation",
        "label": "If a world can be replayed, evolution can become an experiment.",
        "text": "Cell80 is a small artificial ecology. Organisms eat, move, reproduce and die. They inherit small executable programs and numerical settings. Mutation can alter either, and the consequences play out among other organisms competing for resources."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Watching such a world raises a familiar temptation. Something spreads, so we assume it helped. A population changes, so we tell a story about why."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "I wanted to be able to test that story at the point where it began."
      },
      {
        "kind": "observation",
        "label": "The same world, twice",
        "text": "Before I could undo a mutation, I needed to know that the world would otherwise repeat itself."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The first experiment tested exactly that. Repeating the same starting conditions produced identical histories. The parallel GPU implementation also agreed with the slower CPU reference at every tested tick."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Randomness is part of the world, but each draw is tied to its seed, tick, organism and purpose. Running organisms in a different dispatch order does not give them different luck."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "This makes a controlled replay possible. Keep the setup and rules fixed. Change one inherited field at one birth. Check that the histories agree before the intervention, then measure what follows."
      },
      {
        "kind": "observation",
        "label": "The change that became common",
        "text": "The lineage experiment found a sustained shift in which reproduction program was most common."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "At tick 1080, program 33 had become the plurality choice. It accounted for 35.3% of the population, reaching 41.6% during the recorded sustain window. The detector sampled every twenty ticks and required the new leader to persist for a further five samples."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "That was enough to identify an event worth explaining. It was still a population containing many competing programs: the new leader did not occupy a majority, let alone replace everything else."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Tracing backward from organisms carrying the program at the event led to a single origin: organism 2231, born to organism 2059 at tick 994."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The ancestry record also exposed something easy to miss. That birth had changed two fields together."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "If I undid both, I would lose the ability to say which change mattered."
      },
      {
        "kind": "observation",
        "label": "Undo one thing",
        "text": "The comparison keeps the offspring's reproduction threshold at 192 in both histories. It changes only which reproduction program the offspring inherits."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Every tick before the birth remains identical."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "With the program change undone, the detected plurality shift no longer occurs."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "That gives a precise answer: this inherited program change mattered to this event in this world. The claim rests on an intervention as well as an ancestry trace."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "It does not establish that the program is better everywhere, that every population shift has a single cause, or that a different lineage could never reach the same result. The report searched for a suitable event and demonstrated one end to end."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "But I can point to the birth, show the complete change, and show what happens when one part is removed."
      },
      {
        "kind": "observation",
        "label": "A test that can disappoint you",
        "text": "The replay machinery soon became useful for a less satisfying result."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Another experiment introduced compositions of existing programs as movement genes. Some appeared in the population. Their presence made it tempting to describe the ecology as exploiting new code."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "I tested fifteen births where an organism acquired a composed movement gene. Each replay gave that same organism its parent's movement gene instead, then compared its direct offspring count."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "None of the fifteen compositions increased that count. Twelve tied. Three reduced it."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The later, broader experiment would find useful compositions under a different pool and sampling procedure. But this early sample did not support the claim I had wanted to make."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "That is part of the value of the replayable world. The instrument can challenge the interpretation suggested by the animation."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "A living-looking system gives us something to watch. A controlled intervention gives us something to ask."
      }
    ],
    "sources": [
      {
        "title": "Cell80 — recorded measurements and source hashes",
        "url": "/data/cell80/evidence.json",
        "note": "Report-derived EX-4 intervention and recorded EX-9/EX-10 results. Schematics do not reconstruct organism positions."
      },
      {
        "title": "Cell80 — historical experiment findings",
        "url": "/data/cell80/historical-findings.md"
      },
      {
        "title": "Cell80 — completed closure results",
        "url": "/data/cell80/closure-results.md"
      },
      {
        "title": "Cell80 — registered closure tests",
        "url": "/data/cell80/preregistration.md"
      },
      {
        "title": "Tierra — evolution of digital organisms (CMU repository)",
        "url": "https://www.cs.cmu.edu/afs/cs.cmu.edu/project/ai-repository/ai/areas/alife/systems/tierra/0.html",
        "note": "Thomas Ray’s early artificial-life system and its 1991 publications."
      },
      {
        "title": "Misevic, Ofria & Lenski (2006) — Sexual reproduction reshapes the genetic architecture of digital organisms",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1560214/",
        "note": "Avida experiments on modularity and epistasis."
      }
    ]
  },
  {
    "id": "N-CELL80-02",
    "slug": "what-keeps-an-evolving-world-alive",
    "kind": "notebook",
    "title": "What keeps an evolving world alive?",
    "dek": "Variation keeps the world populated. An arms race is another question.",
    "abstract": "Predator–prey coevolution and whether it produces an arms race have a long history in artificial life. Nolfi and Floreano asked this question of coevolving robots in 1998. Here I am examining what the particular rules of my small world sustain. Both species survived to 10,000 ticks in 5/6 worlds at 1% swaps and 6/6 at 2%. None of the eleven surviving worlds passed either registered categorical-coupling screen.",
    "created": "2026-09-09",
    "version": "0.1",
    "status": "PARTIALLY SUPPORTED",
    "publication": "draft",
    "authors": [
      "Chris Hay"
    ],
    "lineage": "CELL80 / 02 · WORLD → INTERVENTION → QUESTION",
    "concepts": [
      "artificial-life",
      "digital-evolution",
      "causal-intervention"
    ],
    "related": [
      "N-CELL80-01",
      "N-CELL80-03"
    ],
    "media": [],
    "body": [
      {
        "kind": "observation",
        "label": "A long-running question",
        "text": "Predator–prey coevolution and whether it produces an arms race have a long history in artificial life. Nolfi and Floreano asked this question of coevolving robots in 1998. Here I am examining what the particular rules of my small world sustain.",
        "references": [
          {
            "label": "Nolfi & Floreano (1998) — Coevolving predator and prey robots: do “arms races” arise in artificial evolution?",
            "url": "https://pubmed.ncbi.nlm.nih.gov/10352236/"
          }
        ]
      },
      {
        "kind": "observation",
        "label": "THE NOTE",
        "text": "The predators disappear when I stop the mutations."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "That happened in all ten worlds in the original control comparison: five seeds in each of two configurations. With mutation enabled, both species survived in all ten to the 3,000-tick endpoint."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The same worlds could sustain predators and grazers. Their fate depended on whether inherited variation continued to arrive."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "It was a result about what kept this ecology populated. Understanding what kind of evolution was happening required another test."
      },
      {
        "kind": "observation",
        "label": "A world with consequences",
        "text": "Cell80's grazers seek food. Predators seek grazers. Organisms spend energy, acquire it, reproduce and pass on their programs and numerical settings."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The smaller prototype had suffered familiar collapses: predators exhausted the available prey and then starved. Making a larger world with more resources produced configurations where both populations survived."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Those were the configurations used for the mutation-off controls. Turning mutation off still lost the predators."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "I also added a period of satiation after a predator fed. That improved some surviving populations but did not rescue the mutation-off worlds. A pause between meals was not enough to explain the difference."
      },
      {
        "kind": "observation",
        "label": "What needs to vary?",
        "text": "There are two kinds of inherited change in these experiments."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Numerical mutations alter settings such as reproduction thresholds. Program swaps replace a gene used for a role such as movement or deciding when to reproduce."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "A later experiment kept numerical mutation and removed program swapping. In all six tested seeds, predators were extinct by the 10,000-tick endpoint. The matched full-mutation worlds retained both species."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Changing the settings alone did not sustain those predator populations. Allowing the organisms to inherit different role programs did."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "That narrows the question. The available program variation matters to the persistence of this ecology. It does not yet explain exactly how the many resulting changes combine to sustain the populations."
      },
      {
        "kind": "observation",
        "label": "Survival is an observation. Response is a claim.",
        "text": "An evolutionary arms race would involve something more specific: changes on one side creating pressure for changes on the other, with further responses following."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Population curves alone cannot establish that sequence. Predator numbers can rise and fall as food becomes abundant or scarce. The most common programs can also change without one species having evolved in response to the other."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The registered test therefore looked at sustained changes in categorical traits across the two species. It asked whether their alternation was stronger than expected under randomized comparisons."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The original predator experiment did not pass that test."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "One possible objection remained: perhaps the rate of program swapping was itself obscuring a response. Removing swaps entirely could not settle that, because it also removed the surviving predators."
      },
      {
        "kind": "observation",
        "label": "Enough variation to keep asking",
        "text": "The follow-up tested lower, nonzero swap rates while keeping numerical mutation active."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "There were now eleven surviving worlds in which to examine the coupling question."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "None passed either of the two registered screens: a label-permutation comparison and a circular-shift comparison preserving within-species event clustering. Each used the fixed threshold of 0.05 divided by twelve. No causal arms-race replay was triggered."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Lower swap rates had kept the question testable. They had not produced the required signal."
      },
      {
        "kind": "observation",
        "label": "What the living world tells us",
        "text": "Across these tested conditions, continued mutation—and specifically access to program swaps in the numerical-only comparison—can determine whether predators persist."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The claim stops at the measured horizons. Survival to 10,000 ticks does not establish indefinite coexistence. The categorical detector also does not cover every form of coevolution: it does not measure continuous numerical-trait responses, and grazers in this world have no direct predator-sensing channel."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The evidence supports a populated, changing ecology. A traced arms race remains unestablished."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "That distinction matters because an active world makes progress easy to imagine. We see organisms moving, lineages changing and populations recovering. Each observation raises a question about what the system has learned to do."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "In the first note, replay let me test whether one inherited change mattered to a particular event. Here, the question was whether variation could sustain the interactions in which further evolution might happen.",
        "references": [
          {
            "label": "first note",
            "url": "/notebook/can-you-name-the-mutation-that-changed-a-world"
          }
        ]
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The next question asks what those interactions can build."
      }
    ],
    "sources": [
      {
        "title": "Cell80 — recorded measurements and source hashes",
        "url": "/data/cell80/evidence.json",
        "note": "Report-derived EX-4 intervention and recorded EX-9/EX-10 results. Schematics do not reconstruct organism positions."
      },
      {
        "title": "Cell80 — historical experiment findings",
        "url": "/data/cell80/historical-findings.md"
      },
      {
        "title": "Cell80 — completed closure results",
        "url": "/data/cell80/closure-results.md"
      },
      {
        "title": "Cell80 — registered closure tests",
        "url": "/data/cell80/preregistration.md"
      },
      {
        "title": "Nolfi & Floreano (1998) — Coevolving predator and prey robots: do “arms races” arise in artificial evolution?",
        "url": "https://pubmed.ncbi.nlm.nih.gov/10352236/"
      }
    ]
  },
  {
    "id": "N-CELL80-03",
    "slug": "when-does-improvement-become-invention",
    "kind": "notebook",
    "title": "When does improvement become invention?",
    "dek": "I wanted to know when getting better becomes building on what came before.",
    "abstract": "This is an old question in artificial life. In 2003, Lenski, Ofria, Pennock and Adami used Avida to show complex computational functions building on simpler functions that had evolved earlier. I had a much smaller world with traceable lineages and replayable history. I wanted to see how far I could get. Eight of 108 compositions helped locally; five repeated existing immediate actions. Two later helpful mutations were found, but neither passed the held-out dependence gate. Compositions were prepared offline.",
    "created": "2026-09-09",
    "version": "0.1",
    "status": "OPEN",
    "publication": "draft",
    "authors": [
      "Chris Hay"
    ],
    "lineage": "CELL80 / 03 · WORLD → INTERVENTION → QUESTION",
    "concepts": [
      "artificial-life",
      "digital-evolution",
      "causal-intervention"
    ],
    "related": [
      "N-CELL80-01",
      "N-CELL80-02"
    ],
    "media": [],
    "body": [
      {
        "kind": "observation",
        "label": "I wanted to see it for myself",
        "text": "This is an old question in artificial life. In 2003, Lenski, Ofria, Pennock and Adami used Avida to show complex computational functions building on simpler functions that had evolved earlier. I had a much smaller world with traceable lineages and replayable history. I wanted to see how far I could get.",
        "references": [
          {
            "label": "Lenski, Ofria, Pennock & Adami (2003) — The evolutionary origin of complex features",
            "url": "https://cse.msu.edu/~ofria/pubs/2003LenskiEtAl.pdf"
          }
        ]
      },
      {
        "kind": "observation",
        "label": "THE NOTE",
        "text": "An artificial ecology can change. It can adapt. It can discover things that help."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "But does anything new become the foundation for what comes next?"
      },
      {
        "kind": "observation",
        "label": "",
        "text": "In Cell80, organisms carry small programs as genes. Those programs help determine when they eat, how they move and when they reproduce. Offspring inherit programs and numerical settings, with mutations. Some lineages leave more offspring than others."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "In the first note, I traced a population shift to a birth and tested what happened when one inherited change was undone. The second asked what kept predators and grazers alive long enough for evolution to continue.",
        "references": [
          {
            "label": "first note",
            "url": "/notebook/can-you-name-the-mutation-that-changed-a-world"
          },
          {
            "label": "second",
            "url": "/notebook/what-keeps-an-evolving-world-alive"
          }
        ]
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Here I use replay to ask a different question: did a mutation help its carrier reproduce, and did a later advantage depend on it?"
      },
      {
        "kind": "observation",
        "label": "",
        "text": "I completed a batch of 379 primary worlds, with additional verification runs, to separate several claims that are easy to collapse into one story."
      },
      {
        "kind": "observation",
        "label": "Change → benefit → novelty → succession → dependence",
        "text": "Each requires evidence of its own."
      },
      {
        "kind": "observation",
        "label": "01 / CHANGE",
        "text": "A mutation happens."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "An offspring receives a different movement program, or a different threshold for reproduction. Its genome is now different from its parent's."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "This is the easiest step to produce. A changing genome tells us that variation exists. We still have to find out what that variation does."
      },
      {
        "kind": "observation",
        "label": "8 of 108 tested composition changes helped.",
        "text": "I tested changes that replaced an existing movement gene with a composition of library programs. In eight cases, the focal organism produced more direct offspring than it did when that change was undone. Eighty-four cases tied; sixteen produced fewer."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "These were local advantages, measured in particular birth contexts over a fixed horizon. They establish that some composed genes can help in this ecology."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The compositions themselves were generated before the worlds ran. Evolution encountered a prepared pool of possibilities; it did not write these programs during the experiment."
      },
      {
        "kind": "observation",
        "label": "5 of the 8 helpful compositions repeated an existing behaviour.",
        "text": "A program can contain different code and still make the same decisions."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The movement input in this world is small enough to check exhaustively: three food readings, each either zero or forty. That gives eight possible input combinations."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Across all eight, five helpful compositions chose exactly the same immediate actions as a gene already in the library. Even the composition with the largest offspring gain repeated an available behaviour."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Three helpful compositions had distinct action signatures in this domain. That is a specific, bounded kind of novelty. The check concerns immediate movement actions; it does not establish equivalence of execution costs or future mutation possibilities. It was also a later diagnostic, separate from the registered acceptance tests."
      },
      {
        "kind": "observation",
        "label": "2 candidates contained a later beneficial change.",
        "text": "I followed descendants that retained a helpful composition and tested subsequent numerical mutations. Of 72 tested changes, two increased the focal organism's direct offspring count."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "One altered how much energy a parent passed to its offspring. The other lowered the reproduction threshold."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "There was now a sequence worth investigating: a helpful composition, inherited along a lineage, followed by another helpful change."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Getting better twice raises a further question. Did the first improvement contribute to the value of the second?"
      },
      {
        "kind": "observation",
        "label": "Neither candidate passed.",
        "text": "For each candidate, I tested four combinations in fresh worlds: the original genes, the first change alone, the second change alone, and both changes together."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The registered test asked whether the later mutation helped more with the composed movement gene than with the original movement gene. That interaction had to be positive in at least four of five held-out worlds, and positive on average."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "One candidate had positive interaction in three worlds. The other had it in none."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The assay used whole founder populations in fresh environments, so it answers a different question from replaying a single birth in the ancestral world. Under that assay, neither sequence established the registered dependence claim."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "There is also a stronger question beyond this test: would the later mutation have been advantageous at all without the earlier change? A positive interaction alone would not settle that."
      },
      {
        "kind": "observation",
        "label": "06 / THE RATCHET",
        "text": "Still open."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Getting better isn't the same thing as building on what came before."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The result I want next is an inherited capability that makes a later advance possible. A lineage crosses a barrier; something previously unavailable becomes useful; subsequent evolution builds on that access."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "These experiments have not demonstrated that sequence. Even a successful bounded example would leave the larger question of open-ended evolution unresolved."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "A useful next experiment would introduce a resource or environmental structure that no existing primitive can exploit, but a composition can. The primitive library would need to be checked against that barrier, and the lineage would need to acquire and retain the capability through selection."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "Then comes the decisive comparison: a later mutation should help when that capability is present and fail to help when it is absent, across held-out worlds. That would test whether the first advance opened a route to the second."
      },
      {
        "kind": "observation",
        "label": "",
        "text": "The finite experiment is complete. The question it leaves is larger:"
      },
      {
        "kind": "observation",
        "label": "THE EARLIER RECOVERY CLAIM",
        "text": "The earlier numerical recovery “ratchet” is separate from cumulative capability dependence. Extending the no-swap condition from five seeds to ten lowered mean recovery from 0.505 to 0.359. No tested full-role dose reached the registered 0.5 threshold. This genome endpoint is not reproductive fitness."
      }
    ],
    "sources": [
      {
        "title": "Cell80 — recorded measurements and source hashes",
        "url": "/data/cell80/evidence.json",
        "note": "Report-derived EX-4 intervention and recorded EX-9/EX-10 results. Schematics do not reconstruct organism positions."
      },
      {
        "title": "Cell80 — historical experiment findings",
        "url": "/data/cell80/historical-findings.md"
      },
      {
        "title": "Cell80 — completed closure results",
        "url": "/data/cell80/closure-results.md"
      },
      {
        "title": "Cell80 — registered closure tests",
        "url": "/data/cell80/preregistration.md"
      },
      {
        "title": "Lenski, Ofria, Pennock & Adami (2003) — The evolutionary origin of complex features",
        "url": "https://cse.msu.edu/~ofria/pubs/2003LenskiEtAl.pdf",
        "note": "Avida precedent: complex logic functions built on earlier simpler functions. No particular intermediate was universally essential."
      },
      {
        "title": "Misevic, Ofria & Lenski (2006) — Sexual reproduction reshapes the genetic architecture of digital organisms",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1560214/",
        "note": "Avida experiments on modularity and epistasis."
      },
      {
        "title": "Taylor et al. (2016) — Open-Ended Evolution: Perspectives from the OEE Workshop in York",
        "url": "https://doi.org/10.1162/ARTL_A_00210"
      }
    ]
  }
];
