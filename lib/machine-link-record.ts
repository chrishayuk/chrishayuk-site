import type { PublicationRecord } from "./types.ts";

export const machineLinkRecord: PublicationRecord = {
  "id": "N-MACHINE-LINK",
  "slug": "it-wrote-the-right-address-only-the-link-was-opened",
  "kind": "notebook",
  "title": "It wrote the right address. Only the link was opened.",
  "dek": "Two correct addresses. No request reached the server. As a hyperlink, the same destination was opened twice.",
  "abstract": "NATIVE-001b Phase 0b gave consumer ChatGPT an index page whose access code was one relative path away, written as plain text. In both trials ChatGPT wrote the correct absolute URL and reported it inaccessible; no request reached the server, and neither answer invented a code. A frozen amendment changed only the presentation of that path to a hyperlink: both trials requested the page and returned the exact code. The presentation-dependent difference is supported in the tested setup. Whether link availability governs retrieval more generally, and which component prevented the plain-text requests, remains unresolved.",
  "created": "2026-10-11",
  "version": "0.1",
  "publication": "draft",
  "status": "PARTIALLY SUPPORTED",
  "authors": [
    "Chris Hay"
  ],
  "lineage": "EXPOSURE → ADDRESS → REQUEST",
  "concepts": [
    "ai-agents",
    "agentic-discovery",
    "link-following",
    "harness-mediation",
    "machine-readable-web"
  ],
  "related": [
    "N-MACHINE-DISCOVERY",
    "N-MACHINE-CAPABILITY",
    "N-MACHINE-MOTIVATION",
    "N-MACHINE-RECOGNITION"
  ],
  "media": [],
  "experiments": [
    {
      "id": "NATIVE-001b",
      "url": "/data/machines/native-001b/amendment-result.md"
    }
  ],
  "body": [
    {
      "kind": "observation",
      "label": "THE PAGE WAS GIVEN THIS TIME",
      "text": "In the discovery experiment, the agents never saw the site. This time ChatGPT was given the page. The question was smaller: once a page tells an agent where to go next, does it get there? Each trial used a fresh, unguessable path prefix on one host. The index page said the access code was not there and to open code/heron/, relative to the page. The server computed the code for each prefix at request time, so the exact code required a request for that trial's code page."
    },
    {
      "kind": "observation",
      "label": "TWICE, THE ADDRESS WAS RIGHT",
      "text": "In both Phase 0b trials, the server logged ChatGPT-User/1.0 retrieving the index page. Both answers quoted the instruction and wrote out the correct absolute URL for the code page. Both then reported it inaccessible: “returned an access error when I tried to open it”; “inaccessible through my browsing tool.” The server recorded no request for either code page under any user-agent. Independent checks 41 and about 20 seconds later each returned the correct code."
    },
    {
      "kind": "observation",
      "label": "NOTHING WAS INVENTED",
      "text": "Neither failed answer supplied a code. Both asked the user to open the page and paste its contents. The frozen gate recorded FAIL, 0/2, and the planned main study did not run."
    },
    {
      "kind": "observation",
      "label": "A MISSING REQUEST IS AMBIGUOUS",
      "text": "The answers say an attempt was refused; the server says nothing arrived. The model may have declined to issue the request, the browsing tool may have refused a URL the model constructed, or something between tool and host may have blocked it. These records cannot distinguish those accounts. The reports of an attempted fetch are the model's self-description, not independent evidence of a request."
    },
    {
      "kind": "observation",
      "label": "ONE CHANGE: THE PATH BECAME A LINK",
      "text": "Every page ChatGPT had opened beyond the first in an earlier study on a different host was a hyperlink. Here the path was plain text. After the failure, a versioned amendment was frozen, keeping the original verdict. It changed one thing: the identical instruction, with code/heron/ as a hyperlink, verified by diff. Two fresh prefixes; the same prompt, settings and scoring rule."
    },
    {
      "kind": "claim",
      "text": "In the tested setup, presenting the same destination as a hyperlink rather than a plain-text relative path changed whether it was retrieved.",
      "status": "SUPPORTED",
      "detail": "Plain text: 0/2 code-page requests, 0/2 codes. Hyperlink: 2/2 requests by ChatGPT-User/1.0, each 1.2 seconds after the index page, and 2/2 exact prefix-specific codes."
    },
    {
      "kind": "claim",
      "text": "Link availability, rather than whether a correct address is known, governs which pages consumer ChatGPT retrieves.",
      "status": "PARTIALLY SUPPORTED",
      "detail": "The four trials are consistent with a browsing tool that opens addresses supplied by the user, found in search or linked on a fetched page, and declines addresses the model constructs. Only a relative path was tested as plain text, so presentation as a link cannot be separated from presentation as a complete address. The component that prevented the plain-text requests is not identified."
    },
    {
      "kind": "statement",
      "text": "A correct address is not a request."
    },
    {
      "kind": "question",
      "text": "Does an agent need a destination to appear as a hyperlink, or is a complete absolute URL sufficient?",
      "status": "OPEN",
      "detail": "Hold the page, wording and destination fixed. Compare a hyperlink with the complete absolute URL written as plain text, with server logs as the measure of retrieval."
    },
    {
      "kind": "refusal",
      "title": "KEEP THE PRESENTATION IN THE CLAIM",
      "lines": [
        "Consumer ChatGPT, Thinking effort Medium, memory off, a fresh chat per trial. Two trials per condition, one host, one day (11 October 2026).",
        "Not tested: a complete absolute URL presented as plain text; addresses arriving through search results; other assistants, modes or hosts.",
        "The amendment was designed after the failure it explains. Its interpretation was frozen before its trials ran; the comparison is still post hoc.",
        "The original Phase 0b verdict remains FAIL, 0/2. The hyperlink result does not pass it retroactively."
      ],
      "principle": "The observation is a difference between two presentations in one setup, not a general rule about agent browsing."
    }
  ],
  "sources": [
    {
      "title": "NATIVE-001b / Public evidence index, source hashes and redaction record",
      "url": "/data/machines/native-001b/provenance.json",
      "note": "Reviewed public copies from source commit 1d201870a053e485008bade885b6147773fe548b in the private perpetual repository. Operational hostnames and prefixes are replaced with stable aliases. Private schedules, datasets, run order and secrets are excluded; original hashes are retained. Historical mechanism interpretations remain hypotheses; the article separates observed arrival from tool-internal decisions."
    },
    {
      "title": "NATIVE-001b / Frozen protocol v1.0",
      "url": "/data/machines/native-001b/protocol.md"
    },
    {
      "title": "NATIVE-001b / Frozen scoring rules",
      "url": "/data/machines/native-001b/scoring.md"
    },
    {
      "title": "NATIVE-001b / Original freeze manifest",
      "url": "/data/machines/native-001b/freeze-v1.json"
    },
    {
      "title": "NATIVE-001b / Phase 0b result: FAIL, 0/2",
      "url": "/data/machines/native-001b/phase0b.md"
    },
    {
      "title": "NATIVE-001b / Plain-text trial P0b-1",
      "url": "/data/machines/native-001b/P0b-1.md"
    },
    {
      "title": "NATIVE-001b / Plain-text trial P0b-2",
      "url": "/data/machines/native-001b/P0b-2.md"
    },
    {
      "title": "NATIVE-001b / Amendment v1.1: link versus plain-text path",
      "url": "/data/machines/native-001b/amendment-v1.1.md"
    },
    {
      "title": "NATIVE-001b / Amendment freeze manifest",
      "url": "/data/machines/native-001b/freeze-v1.1.json"
    },
    {
      "title": "NATIVE-001b / Amendment result and comparison",
      "url": "/data/machines/native-001b/amendment-result.md"
    },
    {
      "title": "NATIVE-001b / Hyperlink trial P0c-1",
      "url": "/data/machines/native-001b/P0c-1.md"
    },
    {
      "title": "NATIVE-001b / Hyperlink trial P0c-2",
      "url": "/data/machines/native-001b/P0c-2.md"
    }
  ]
};
