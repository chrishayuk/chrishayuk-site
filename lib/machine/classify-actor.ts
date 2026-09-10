import { COLLABORATION, EXECUTION, MACHINE_CLASS, TRANSPORT, wordOf, type MachineClass } from "./vocabulary.ts";
import type { Declaration } from "./declaration.ts";
import type { Purpose } from "../readership/classify.ts";

/**
 * WHAT KIND OF ACTOR THIS IS — derived, never declared.
 *
 * "bot_type = Claude" conflates a brand with a kind. ClaudeBot and a
 * Claude Code worker are both Anthropic and are radically different
 * visitors: one indexes the web, the other is acting on somebody's
 * immediate task. The class separates them.
 *
 * It is THIS SITE'S CONCLUSION and is never a value a visitor can set.
 * It reads what was declared alongside what the request looked like, and
 * a visitor cannot name its own class any more than it can name its own
 * evidence level.
 *
 * The question it makes answerable is the one worth asking: how much of
 * this site's machine traffic is acting on an immediate task rather than
 * indexing the web.
 */
export function machineClass(declaration: Declaration, observedPurpose: Purpose): MachineClass {
 const transport = wordOf(TRANSPORT, declaration.transport);
 const execution = wordOf(EXECUTION, declaration.execution);
 const collaboration = wordOf(COLLABORATION, declaration.collaboration);

 // Declared coordination outranks everything: an orchestrator that says so
 // is telling us something no observation could.
 if (execution === "orchestrator" || collaboration === "multi_agent_orchestrator") return "m6_orchestrator";
 if (collaboration.startsWith("multi_agent")) return "m5_multi_agent_worker";
 if (execution === "user_delegated") return "m4_delegated_task_agent";
 if (execution === "autonomous_worker" || execution === "monitor") return "m3_interactive_agent";

 // Nothing declared that settles it, so fall back to what arrived.
 if (execution === "passive_crawler" || observedPurpose === "ai_training") return "m1_crawler";
 if (observedPurpose === "search_bot" || observedPurpose === "ai_search") return "m2_retrieval_bot";
 if (observedPurpose === "ai_user") return "m4_delegated_task_agent";
 if (transport === "cli_tool" || transport === "api_client" || transport === "browser_automation") return "m3_interactive_agent";
 if (transport === "crawler") return "m1_crawler";
 if (transport === "search_fetcher") return "m2_retrieval_bot";

 return "m0_unknown_automation";
}

/** The classes, with what each one means, for the contract and the exhibit. */
export const CLASS_MEANING: Record<MachineClass, string> = {
 m0_unknown_automation: "machine-shaped, and nothing further established",
 m1_crawler: "indexing the web rather than acting on a task",
 m2_retrieval_bot: "fetching for a search or answer surface",
 m3_interactive_agent: "an agent acting, with no delegation declared",
 m4_delegated_task_agent: "acting on somebody's immediate task",
 m5_multi_agent_worker: "one of several agents on a declared shared task",
 m6_orchestrator: "directing other agents",
};

export const CLASSES = MACHINE_CLASS;
