# Mault.ai performance and AI-discovery redesign

An independent, unsolicited redesign prototype created by [Tech Adventures](https://fltechadventures.com) after reviewing Mault's public WordPress site. The goal was to preserve the dark technical identity while proving that the experience could be faster, accessible, easier to maintain, safer to review, and ready for both conventional search and AI discovery.

> This is not an official Mault repository, is not affiliated with Mault, and is not deployed to `mault.ai`. Mault product names, copy, and first-party assets remain the property of Mault and are used only to demonstrate the redesign. The public preview is intentionally `noindex`.

**Live protected demo:** [mault.fltechadventures.com](https://mault.fltechadventures.com)

## The measured problem

The July 21, 2026 production benchmark found:

- Mobile Lighthouse performance **64**, LCP **3.5s**, TBT **768ms**, and TTI **16.1s**.
- **6.52MB** transferred through **133 requests** on mobile.
- Desktop: performance **96**, accessibility **91**, best practices **54**, and SEO **85**.
- WordPress exposed 31 sitemap URLs, including parallel homepage, enterprise, contact, blog, documentation, author, category, QA, and legacy variants.
- `llms.txt` redirected to a WordPress 404, while `llms-full.txt` and `/.well-known/security.txt` returned 404.
- The site had a valid XML sitemap and robots reference, but the sitemap mixed primary content with obsolete, duplicate, archive, and review-only routes.
- The page loaded a large WordPress/Elementor and third-party stack, including Google Analytics, Google Ads, Mixpanel, Brevo, Leadsy, TrustedSite, reCAPTCHA, and other scripts.

See [Original site audit](docs/original-site-audit.md) for the evidence and route-by-route findings.

## What changed

- Rebuilt the frontend with Astro and a responsive, mobile-first design system.
- Preserved Mault's visual language while replacing WordPress/Elementor runtime overhead.
- Consolidated the route model and documented every retained, redirected, reviewed, or archived source URL.
- Reconstructed seven articles with corrected entities, editorial typography, metadata, and optimized first-party imagery.
- Added a sitemap, canonical metadata, structured data, `llms.txt`, `llms-full.txt`, `humans.txt`, and `/.well-known/security.txt`.
- Added a public Blog Studio prototype with HTML editing, dates, authors, images, SEO fields, previews, and browser-local drafts.
- Added a clearly labeled shared demo-access gate. Google Workspace and Microsoft 365 OAuth are documented as the production authentication path, not simulated as complete.
- Added reduced-motion support, keyboard navigation, responsive layouts, content sanitization, security headers, and an unprivileged read-only container.
- Added CI, CodeQL, dependency review, Dependabot, secret scanning, push protection, private vulnerability reporting, and branch protection.

## Before and after

- WordPress mobile: **64 performance**, **3.5s LCP**, **768ms TBT**, **6.52MB**, **133 requests**.
- Rebuild mobile: **100 performance**, **100 accessibility**, **100 best practices**, **0.9s LCP**, **0ms TBT**, **0 CLS**, **23KB**, **2 requests** before later optional motion assets.
- Preview SEO is intentionally capped by `noindex`; production-ready metadata and discovery files are present but the demo must not compete with Mault's real domain.

The Lighthouse JSON and review captures are committed under [`qa/`](qa/).

## AI-search readiness

This project treats AI discovery as a content architecture concern, not one magic text file:

- `llms.txt` supplies a concise machine-readable site map.
- `llms-full.txt` supplies expanded product and content context.
- Sitemap, canonicals, metadata, schema, clean route ownership, readable HTML, and internal linking provide the underlying crawl foundation.
- Duplicate and dummy URLs are removed from the proposed production information architecture rather than advertised to crawlers.

## Reproducible evidence

- Raw HTML for 33 accessible URLs, retrieval metadata, SHA-256 hashes, links, media, scripts, styles, and forms are under `reference/source/`.
- The source-to-target disposition is in [`reference/route-map.json`](reference/route-map.json).
- Product brief, PRD, UX specification, architecture, epics, readiness review, and QA checklist are under [`docs/`](docs/).
- The delivery review packet is [`qa/review-packet-2026-07-21.md`](qa/review-packet-2026-07-21.md).
- The final security review is [`docs/security-audit-2026-07-21.md`](docs/security-audit-2026-07-21.md).

## Timeline

The task-board record began at **8:34 AM EDT on July 21, 2026**. The first complete protected preview was verified at **9:17 AM**, about **43 minutes** later. The public repository, editorial repair, discovery files, security hardening, and reviewed PR were completed by **10:07 AM**. The final demo-authentication and handoff audit followed in the same session.

The timestamps are based on the task and deployment evidence, rather than an estimate. Production `mault.ai` was never modified.

## Run locally

```bash
npm ci
npm run check
npm run verify
```

Or run the hardened unprivileged Nginx image:

```bash
docker compose up --build
```

## Blog Studio demo

Open `/admin/blog/`. The shared credentials are printed on the login screen because this is a public interaction prototype:

- Email: `demo@mault.ai`
- Demo passphrase: `govern-the-code`

This client-side gate is deliberately not represented as production security. Drafts remain in browser-local storage. A real deployment requires server-side sessions, role-based Google Workspace/Microsoft 365 OAuth, persistent storage, audit events, authorization, and an authenticated publishing API.

## Security boundary

- No production credentials, Mault integrations, form delivery, or analytics tags are included.
- The container is unprivileged, read-only, health-checked, and isolated on its own network.
- CSP, COOP, CORP, frame protection, permissions policy, MIME protection, referrer policy, and noindex headers are applied.
- GitHub Actions are pinned to immutable commit SHAs.

See [`SECURITY.md`](SECURITY.md) for responsible reporting.
