import type { PublicationRecord } from "./types.ts";

export const addressBuildRecord: PublicationRecord = {
  id: "N-ADDRESS-BUILD", slug: "the-address-is-built-through-depth", kind: "notebook",
  title: "The address is built through depth.",
  dek: "Relation is there early. Entity arrives late. The coordinates change in between.",
  abstract: "For capital versus language on Gemma 3 4B IT, two instruments agree: relation information is readable and causally consequential by L8; entity binding becomes decisive in the final-position residual between L24 and L28. Cross-layer reader alignment recovers relation information across changing coordinates. The L28–30 endpoint may carry the answer token, so the mechanistic evidence window is L8–24.",
  created: "2026-09-06", version: "0.1", publication: "draft", status: "SUPPORTED",
  authors: ["Chris Hay"], lineage: "QUESTION → EXPERIMENT → INSTRUMENT",
  concepts: ["residual-stream", "model-representation", "model-memory", "factual-recall", "activation-patching"],
  related: ["N-MAP", "N-ADDRESS", "N-AUTHORITY", "W-LARQL"], media: [],
  body: [
    { kind: "question", text: "When does a factual question become a usable address?", status: "SUPPORTED", detail: "ADDRESS-BUILD-1 tests native facts with single-position causal transplants and a separate cross-layer reader." },
    { kind: "observation", label: "RELATION FIRST", text: "Relation readability is 0.90 at L8 and 1.00 at L16. Same-binding and wrong-entity transplants both retain the recipient answer in 46/48 cases at L16. What converges early is the relation frame, not the entity binding." },
    { kind: "observation", label: "ENTITY LATER", text: "At L20 a wrong-entity donor preserves 46/48 recipient answers and supplies its own answer in 0/48 cases. At L24 those counts are 33/48 and 6/48. At L28 they are 0/48 and 48/48. These are cohort rates, not probabilities for one Japan/France prompt." },
    { kind: "observation", label: "CHANGING COORDINATES", text: "For relation, L8→L12 raw transfer is 0.39 versus 0.90 after Procrustes alignment; L20→L24 is 0.46 versus 1.00. Norm-only equals identity in every cell. Entity’s coordinate behaviour remains unresolved." },
    { kind: "observation", label: "SCOPE", text: "One model, capital versus language, final-position residual only. L28–30 may decode answer tokens. A basis change enabling entity commitment is an open inference, not a finding." },
    { kind: "observation", label: "INSTRUMENT & RECORD", text: "ADDRESS-BUILD-1, EXP-20260906-181253-00733. Gemma 3 4B IT bf16, 2026-09-06. 48 native-fact prompts in the causal half; 194 prompts, 20 bindings, 12 wordings, 3 folds in reader Part 2b. Splice floor 0.000e+00. Source commit f97a470. Original Part 2 is preserved as a failed instrument." },
  ],
  sources: [
    { title: "ADDRESS-BUILD-1 — frozen experiment registry record", url: "/data/address-build-1/registry.json", note: "Experiment EXP-20260906-181253-00733; consolidated write-up version 7. Retrieved from chuk-experiments on 2026-09-06." },
    { title: "Causal transplant — complete recorded aggregates", url: "/data/address-build-1/causal.json", note: "Extracted from local git object f97a470. Rates aggregate the eligible prompts in each arm." },
    { title: "Reader Part 2b — complete results", url: "/data/address-build-1/reader.json", note: "Component-specific readability, all transfer controls and frozen gates." },
    { title: "Reader Part 2 — preserved instrument failure", url: "/data/address-build-1/reader-failed.json", note: "Insufficient examples per binding class; no mechanistic inference is drawn from this failed reader." },
  ],
};
