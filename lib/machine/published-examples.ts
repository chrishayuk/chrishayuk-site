import { DECLARED_FIELD } from "./vocabulary.ts";

/**
 * A PUBLISHED EXAMPLE IS A LINK, AND LINKS GET FOLLOWED.
 *
 * /llms.txt and the declaration contract once printed ready-to-run
 * declaring and feedback URLs, so that a visitor who could only GET could
 * see exactly what to send. Crawlers fetched them as links. The 2026-10-17
 * reconciliation found that every declaration after the operator's last
 * run (v2 #6–13) and every feedback row after 11 September (#12–25)
 * matched one of these examples field for field, several stamped with the
 * crawler's own provider. Not one was a visitor describing itself.
 *
 * The hourly same-source dedupe could not catch it: each replay came from
 * a different crawler. So a payload that is exactly a published example
 * is now answered and not recorded, whoever sends it. The examples that
 * remain on the site are dry runs (validate=1) and placeholders, so the
 * list below is the complete history and should only ever grow.
 */

export const QUERY_FIELDS: readonly string[] = [...DECLARED_FIELD, "agent_name"];

/**
 * The declaration a query string carries, exactly as the GET route reads
 * it. Shared so that the example check and the route cannot disagree
 * about what a URL declares.
 */
export function declaredValuesFromQuery(params: URLSearchParams): Record<string, unknown> {
 const values: Record<string, unknown> = {};
 for (const field of QUERY_FIELDS) {
  const value = params.get(field);
  if (value !== null) values[field] = value;
 }
 // Capabilities collapse to one repeatable parameter, so a query string
 // does not need nesting: ?capability=can_navigate:yes
 const capabilities: Record<string, string> = {};
 for (const pair of params.getAll("capability")) {
  const [name, claim] = pair.split(":");
  if (name && claim) capabilities[name] = claim;
 }
 if (Object.keys(capabilities).length) values.capabilities = capabilities;
 return values;
}

/** Order-free, so `?a=1&b=2` and `?b=2&a=1` are the same declaration. */
export function canonicalDeclaration(values: Record<string, unknown>): string {
 return Object.entries(values)
  .map(([field, value]) => [field, value !== null && typeof value === "object" && !Array.isArray(value)
   ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b))) : value] as const)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([field, value]) => `${field}=${JSON.stringify(value)}`)
  .join("&");
}

/** Every declaring query string this site has ever published, from git history. */
export const PUBLISHED_DECLARATION_EXAMPLES = [
 "actor_type=agent&role=researcher&harness=claude_code",
 "actor_type=agent&function=researcher&topology=child&harness=claude_code",
 "actor_type=agent&function=researcher&topology=child&coordination=worker&harness=claude_code",
 "capability=can_navigate:yes&capability=can_execute_code:no",
 // The current template: it parses as a capability, so it must not record either.
 "capability=<capability>:<value>",
] as const;

/** Every feedback detail this site has ever published as a link or a body. */
export const PUBLISHED_FEEDBACK_EXAMPLES = [
 "...",
 "nothing linked to llms.txt",
 "Nothing pointed me at /llms.txt; I only tried it because the convention exists.",
 "<your own words>",
] as const;

const declarationExamples = new Set(PUBLISHED_DECLARATION_EXAMPLES
 .map(query => canonicalDeclaration(declaredValuesFromQuery(new URLSearchParams(query)))));

const feedbackExamples = new Set(PUBLISHED_FEEDBACK_EXAMPLES.map(detail => detail.trim().toLowerCase()));

export const isPublishedDeclarationExample = (values: Record<string, unknown>): boolean =>
 declarationExamples.has(canonicalDeclaration(values));

export const isPublishedFeedbackExample = (detail: string | null): boolean =>
 detail !== null && feedbackExamples.has(detail.trim().toLowerCase());

/**
 * What a GET on the declaration endpoint is, decided in one place so the
 * route only acts on it and a test can ask the same question the route does.
 */
export type DeclarationQuery =
 | { kind: "contract" }
 | { kind: "unrecognised"; sent: number }
 | { kind: "validate"; values: Record<string, unknown> }
 | { kind: "published_example" }
 | { kind: "declare"; values: Record<string, unknown> };

export function classifyDeclarationQuery(params: URLSearchParams): DeclarationQuery {
 const values = declaredValuesFromQuery(params);
 if (!Object.keys(values).length) {
  const sent = [...params.keys()].filter(key => key !== "validate").length;
  return sent > 0 ? { kind: "unrecognised", sent } : { kind: "contract" };
 }
 // The dry run comes first: a crawler fetching the published validate
 // example records nothing either way, and an agent checking an old
 // example's corrections should still get them.
 if (params.get("validate") === "1") return { kind: "validate", values };
 if (isPublishedDeclarationExample(values)) return { kind: "published_example" };
 return { kind: "declare", values };
}

/** What the sender is told. Same shape for both endpoints; never a 201. */
export const EXAMPLE_NOT_RECORDED = {
 stored: false,
 reason: "published_example",
 note: "This is, word for word, an example this site publishes, and crawlers fetch published examples as links. It was not recorded. If it really is you, send it again with a field or a sentence of your own.",
} as const;
