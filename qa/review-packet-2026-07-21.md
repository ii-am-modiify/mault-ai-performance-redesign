# Mault.ai V2 Preview Review Packet

## Review URL

https://mault-v2.fltechadventures.com

The preview is protected by HTML `noindex`, `robots.txt: Disallow /`, and proxy/runtime `X-Robots-Tag: noindex, nofollow, noarchive` headers.

## Delivered

- Reproducible crawl of 33 public WordPress URLs with raw HTML, retrieval metadata, and SHA-256 hashes.
- Draft disposition for all 33 URLs.
- Full BMAD brief, PRD, UX, architecture, epics, readiness review, story, and QA checklist.
- Astro 7 static replacement with responsive design system, homepage, platform/product routes, conversion routes, documentation, legal content, blog index, and seven migrated articles.
- Static sitemap, robots, llms.txt, llms-full.txt, canonical metadata, organization schema, reduced-motion support, keyboard-capable mobile navigation, and security headers.
- Unprivileged read-only Nginx container on isolated Docker network `10.211.21.0/24`.

## Baseline versus preview

### WordPress production baseline

- Mobile performance 64; LCP 3.50s; TBT 768ms; TTI 16.14s.
- 6.52 MB and 133 requests.
- Desktop: performance 96, accessibility 91, best practices 54, SEO 85.

### V2 protected preview

- Mobile performance 100; accessibility 100; best practices 100.
- FCP/LCP 0.90s; TBT 0ms; CLS 0.
- 23 KB and two requests.
- Lighthouse SEO reports 66 only because the review deployment is intentionally blocked from indexing. Production metadata, canonicals, sitemap, and machine-readable files are present.

## Verification

- Astro check/build: 0 errors, 0 warnings, 0 hints; 23 static pages.
- Dependency audit: zero known vulnerabilities after upgrading to Astro 7.1.3.
- All 23 retained/consolidated/review routes returned HTTP 200 over the public preview URL.
- Container health passed.
- Mobile menu open and Escape-to-close passed at 390px.
- Desktop and mobile full-page screenshot reviews passed with no observed horizontal overflow.
- Preview response includes noindex and security headers; sitemap and LLM files return successfully.

## Known acceptance decisions

- Production cutover is not performed.
- Draft `review` routes still need final disposition: Enterprise New, Document, and Hiring/Careers.
- Existing tracking and lead vendors were intentionally not copied. WordPress currently references Mixpanel, Reddit Pixel, Leadsy, Brevo, TrustedSite, and reCAPTCHA; each should return only after ownership, consent, and business need are confirmed.
- Pilot and Contact conversion handling needs an approved destination/API before forms are activated. The preview does not submit visitor data.
- Legal content should receive owner/counsel review before production cutover.

## Rollback

- The production `mault.ai` WordPress site was not changed.
- Preview routing can be removed by reverting `/etc/caddy/Caddyfile` from `/etc/caddy/Caddyfile.bak-mault-v2-20260721-0905`, removing the preview DNS record, and stopping the `mault-ai-v2` container.
