# Known operator request corrections

Published 11 September 2026. An excerpt of the manual ledger in
`docs/machine-guestbook-mg2.md`, section 5. This is not a complete inventory
of operator activity. It names eleven requests in three hourly cells.

```text
OPERATOR CORRECTIONS — /machines

  2026-09-10T00:00Z
    9 × (page, automation, unknown, curl,                inferred, none)
    1 × (page, automation, unknown, unrecognised client, inferred, none)
    reason: c0-treatment-equivalence

  2026-09-10T06:00Z
    1 × (page, automation, unknown, curl,                inferred, none)
    reason: c1-treatment-equivalence, first run after the MG-2B deployment
    note:   the C1 gate writes NO declaration, by design — only this one
            /machines request. The numerator is untouched by it.
```

Subtract each count only from its exact matching cell. Other requests in
the same cell remain counted. A missing cell or an observed count below the
correction is unresolved; no zero or organic total can be inferred.

Blind-run declarations are separately operator-induced and must be excluded
from organic participation measures. These three request corrections do not
enumerate all requests made by those runs.

Run 2 feedback: two reports were acknowledged with 201 but not stored after a
memoised store failure. The ledger records the fix as revision `355d537`.
The lost reports are unrecoverable.

Source file SHA-256 at extraction: `73d3e17bc16050ee4c6035541603e59b0c8772eefe9e87d776e80d9d90f7aac2`.

## Example replay, 12 September – 17 October 2026

Added 17 October 2026. Not operator requests: link-followers fetching the
ready-to-run write URLs this site published in `/llms.txt` and the
declaration contract. Each fetch recorded a declaration or a feedback row.

```text
EXAMPLE REPLAY — /api/machines/declaration and /api/machines/feedback

  declarations v2 #6–13   2026-09-12 to 2026-10-15
    each matches a published example declaration field for field
    #6, #7, #8 recorded provider_seen amazon; #10 recorded provider_seen meta
  feedback #12–25         2026-09-11 to 2026-10-01
    each detail is a published example ("nothing linked to llms.txt", "...")
    reason: example-replay
```

The rows are kept and not rewritten. Exclude them from every participation
measure. The guestbook's Declaration mark for any day in this window was
moved by crawlers, not visitors. With these and the blind runs excluded,
the site has recorded no independent declaration and no independent
feedback.

From the deployment that carries `lib/machine/published-examples.ts`, the
published examples are dry runs and placeholders, and a payload identical to
any example ever published is answered without being recorded.
