# Original Mault.ai site audit

Audit date: July 21, 2026  
Source: publicly accessible `https://mault.ai/` pages and discovery endpoints  
Scope: observation only; the production website was not changed

## Executive finding

The existing site had a strong visual direction and a clear product premise, but its WordPress/Elementor delivery, legacy information architecture, and missing machine-readable resources weakened performance, accessibility, technical trust, and AI-search readiness.

## Performance and quality baseline

### Mobile

- Lighthouse performance: 64
- Largest Contentful Paint: 3.50s
- Total Blocking Time: 768ms
- Time to Interactive: 16.14s
- Transfer size: 6.52MB
- Requests: 133

### Desktop

- Performance: 96
- Accessibility: 91
- Best practices: 54
- SEO: 85
- Transfer size: 6.10MB
- Requests: 132

The desktop score concealed the heavier mobile cost. The primary issue was not the design itself; it was the amount of framework, plugin, tracking, font, form, and page-builder code needed to deliver it.

## AI discovery and crawler fundamentals

Observed on July 21:

- `/sitemap.xml` redirected correctly to Yoast's `/sitemap_index.xml`.
- `/robots.txt` returned 200 and referenced the sitemap.
- `/llms.txt` redirected to `/llms.txt/`, which returned 404.
- `/llms-full.txt` returned 404.
- `/.well-known/security.txt` returned 404.
- No dedicated AI-oriented content map comparable to the rebuilt `llms.txt`/`llms-full.txt` pair was accessible.

`llms.txt` alone does not guarantee AI visibility. The more material issue was the combination of missing machine-readable context, duplicate route intent, heavy client delivery, and inconsistent page ownership.

## Sitemap and route quality

The live sitemap exposed 31 URLs. The captured crawl found 33 accessible public routes. The proposed disposition classified them as:

- 20 retain
- 2 consolidate
- 7 redirect
- 3 editorial review
- 1 archive

Examples of competing or legacy intent:

- `/`, `/homepage/`, and `/mault-home-new/`
- `/enterprise/`, `/enterprise-new/`, and `/enterprise-old/`
- `/contact/` and `/contact-2-old/`
- `/blog/` and `/blog-old-2/`
- `/docs/` and `/document/`
- `/product/` and the proposed `/platform/`
- `/qa/`, `/author/maultai-admin/`, and `/category/uncategorized/`

Publishing duplicate, obsolete, placeholder, author, and uncategorized routes in the sitemap can dilute crawl focus, create inconsistent search snippets, and make the site appear less maintained. It is more accurate to call this a search-quality and reputation risk than a direct ranking penalty.

The complete evidence-backed mapping is in [`../reference/route-map.json`](../reference/route-map.json).

## Analytics and verification found

The public HTML included:

- Google Analytics 4 measurement ID: `G-1B6B2C93BP`
- Google Ads tag: `AW-17931346719`
- Google Tag Manager bootstrap code
- Mixpanel
- Brevo
- Leadsy
- TrustedSite
- reCAPTCHA and other WordPress/plugin scripts

DNS TXT records included two `google-site-verification` values, indicating that Google Search Console domain verification had been configured. This confirms verification records, not current Search Console ownership, indexing health, or data access.

The demo intentionally does not copy analytics or advertising tags. Ownership, consent requirements, retention, and business need should be confirmed before restoring any vendor.

## Accessibility and content quality

- Desktop accessibility scored 91 rather than passing at 100.
- Several migrated articles contained WordPress artifacts, encoded titles, weak editorial spacing, or layouts dependent on page-builder output.
- Mobile interaction and content delivery paid the cost of desktop-oriented scripts and plugins.
- Duplicate or legacy routes increased the chance of inconsistent headings, metadata, canonicals, and user journeys.

## Remediation demonstrated

- Static Astro output with semantic HTML and minimal JavaScript
- Consolidated route ownership and explicit redirects/archives
- Responsive desktop/mobile design and reduced-motion support
- Corrected article presentation and optimized first-party media
- Sitemap, canonical metadata, organization schema, `llms.txt`, `llms-full.txt`, `humans.txt`, and security contact
- Hardened container and headers
- Automated build, route, discovery-file, dependency, CodeQL, and secret controls

## Important limitations

- This is an independent prototype based only on public information.
- No production analytics, forms, CMS, databases, or Mault credentials were accessed.
- The protected preview is intentionally noindex and is not a production cutover.
- Product claims, metrics, legal copy, and final route decisions require Mault owner review.
