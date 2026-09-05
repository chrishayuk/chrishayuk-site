# GitHub → Fly → chrishayuk.com

Repository: https://github.com/chrishayuk/chrishayuk-site (private).
Fly app: `chrishayuk-site`, London (`lhr`).
Canonical publication: https://chrishayuk.com.

## Deploy

Push to `main`. GitHub Actions installs the lockfile, runs the publication tests,
builds Next.js, and checks the served homepage, graph, Ask, citations, indexing
policy and all domain redirects. Only then does it deploy the standalone Docker
image. A health check confirms the deployed commit. Pull requests run verification
without deployment credentials. The app-scoped `FLY_API_TOKEN` GitHub secret was
created on 6 September 2026 with a one-year expiry; rotate it before expiry.

The app runs one 512 MB machine, kept warm in London. Fly handles TLS. The container
runs as the unprivileged `node` user. There are no database or storage bindings.
Media and the source catalogue are versioned in Git. New uploads or catalogue
refreshes require another deployment. To roll back, revert the relevant commit and
push `main` through the same checks.

The existing `.openai/hosting.json`, Sites build and private preview remain intact.
`npm run build` builds Sites; `npm run build:fly` builds Next.js for Fly. Indexing
defaults to off. The public Docker image sets `SITE_INDEXABLE=true` during build
and runtime. The Fly test hostname serves an `X-Robots-Tag: noindex, nofollow`
header. Published records and catalogued films retain their own citation status;
making the site public does not publish draft research claims.

## Squarespace DNS

Apply the same four records in each domain's DNS settings:
`chrishayuk.com`, `chrishay.uk`, `chrishayuk.net`, `chrishay.net`, `chrishayuk.io`.

| Host | Type | Value |
| --- | --- | --- |
| @ | A | 66.241.125.218 |
| @ | AAAA | 2a09:8280:1::184:863a:0 |
| www | A | 66.241.125.218 |
| www | AAAA | 2a09:8280:1::184:863a:0 |

Replace conflicting A/AAAA/CNAME records only at `@` and `www`, including the
Squarespace website preset if present. Keep MX and TXT mail/verification records.
These are direct DNS records, not Squarespace URL forwarding rules. All alternate
hosts receive a permanent 308 redirect to chrishayuk.com with path and query intact.

Fly certificate registrations exist for all ten hosts. Issuance and renewal use
the DNS records above. DNS edits must be applied in Squarespace; they have not
been applied by this repository. Check status after saving:

```sh
flyctl certs list --app chrishayuk-site
flyctl certs check chrishayuk.com --app chrishayuk-site
curl -I 'https://chrishay.uk/film/mixture-of-experts?sort=popular'
```

Expected redirect destination:
`https://chrishayuk.com/film/mixture-of-experts?sort=popular`.
The Fly test address https://chrishayuk-site.fly.dev works before DNS cutover.

Reference: [Fly custom-domain configuration](https://fly.io/docs/networking/custom-domain/).
