import { auditPublicationLegibility } from "../lib/legibility-audit.ts";

const results = auditPublicationLegibility();
console.log("HAUSE / PUBLICATION LEGIBILITY");
for (const result of results) {
 console.log(`${result.ok ? "PASS" : "FAIL"} ${result.id}`);
 for (const issue of result.diagnostics) {
  console.log(`  ${issue.severity === "error" ? "REQUIRED" : "ADVISORY"} [${issue.code}]: ${issue.message}`);
  console.log(`    ${issue.remedy}`);
 }
}
console.log(`${results.filter(result => result.ok).length}/${results.length} records passed`);
if (results.some(result => !result.ok)) process.exitCode = 1;
