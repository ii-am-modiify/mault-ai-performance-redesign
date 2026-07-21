# Mault remaining-pages completion review

## Scope

Replaced the generic migration fallback for Platform, Pricing, Enterprise, Contact, FAQ, Docs, AI Coder Guide, and Careers with dedicated responsive pages. Legal routes intentionally retain the structured document renderer.

## Verification evidence

- Astro check/build: 22 files, 0 errors, 0 warnings, 0 hints.
- Dependency audit: 0 vulnerabilities.
- Route/discovery verification: 34 HTML routes plus sitemap, robots, llms.txt, llms-full.txt, humans.txt, and security.txt passed.
- Live HTTP checks: all eight rebuilt routes returned 200 with unique titles and non-empty rendered bodies.
- Security headers verified live: CSP, HSTS, frame denial, content-type protection, permissions policy.
- Lighthouse mobile results:
  - Platform: 100 performance / 100 accessibility / 100 best practices.
  - Pricing: 100 / 100 / 100.
  - Enterprise: 100 / 100 / 100.
  - Contact: 100 / 100 / 100.
  - FAQ: 100 / 100 / 100.
  - Docs: 100 / 100 / 100.
  - AI Coder Guide: 100 / 100 / 100.
  - Careers: 100 / 100 / 100.
- Observed LCP range: 1.4–1.5 seconds; TBT: 0ms; CLS: 0–0.001.
- Contact form is deliberately demo-only and explicitly states no data or email is transmitted.

## Content disposition

- Public marketing/product pages no longer use the generic migration fallback.
- Blog articles retain the editorial article renderer.
- Privacy, Terms, Cookie Policy, and Billing retain the legal-document renderer.
- Production mault.ai remains untouched.
