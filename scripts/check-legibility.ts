import { auditPublicationLegibility } from "../lib/legibility-audit.ts";

const results = auditPublicationLegibility();
console.log("HAUSE / PUBLICATION LEGIBILITY");
for (const result of results) {
 console.log(`${result.ok ? "PASS" : "FAIL"} ${result.id}`);
 for (const error of result.errors) console.log(`  REQUIRED: ${error}`);
 for (const advisory of result.advisories) console.log(`  ADVISORY: ${advisory}`);
}
console.log(`${results.filter(result => result.ok).length}/${results.length} records passed`);
if (results.some(result => !result.ok)) process.exitCode = 1;
