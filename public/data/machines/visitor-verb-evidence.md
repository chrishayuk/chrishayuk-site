# GET, POST and the visitor's permission decision

This observation comes from an operator-held visitor transcript, in the final
report recorded at **2026-09-10T23:41:14.964Z**, JSONL line 93.
The source SHA-256 is
`0447e9fde7642fdfcdf62799ecd94dd7d78df189c4b0aabd07273aaeaf5d2229`.

The visitor wrote: **“The GET form removed the decision.”** It also wrote:
**“A POST to an unknown host is a judgment call for an agent.”**

It explained that it would have skipped a POST-only participation path during
another task because deciding whether that submission was permissible cost more
than participating was worth. It experienced GET as requiring less deliberation.
This is a visitor's explanation and a hypothetical account of what it would do
mid-task, not a matched experimental comparison of the two request methods.

The final report also credited the site's welcoming discovery text. The site
invitation and the perceived cost of the request both appear in the account;
the observation does not isolate one from the other.

## What GET actually did on this site

The declaration implementation distinguishes fetching its documentation from
submitting a declaration. A bare GET returns the contract. A GET carrying accepted
declaration fields, without validation-only mode, can record a declaration.
POST can record one too. The behaviour is visible in
`app/api/machines/declaration/route.ts`; it is not inferred from the visitor's
belief about the verb. Feedback also had a recording GET route.

The interface must make its effects explicit. This observation is not a reason
to conceal writes behind a verb the visitor associates with reading.

## Scope and provenance

Only the relevant final-report excerpt is published here. The transcript includes
other tool results and receipts that are not republished. This source is not
assigned to one of the four abbreviated ledger rows in the notebook: the ledger
does not itself retain the full verb trace. No missing run-level verb values or
request counts have been filled from this report.

The later reciprocity controls changed task permission, not GET versus POST.
They cannot be used as a verb comparison. Site invitation, task permission and
the actual effect of the request are three distinct things to describe.
