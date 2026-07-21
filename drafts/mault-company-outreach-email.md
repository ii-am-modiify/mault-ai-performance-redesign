# Draft only — not sent

**Subject:** I rebuilt Mault.ai and documented the full audit trail

Hi [Name],

I recently interviewed with Mault, and while learning more about the product I spent time auditing the public website. I liked the visual direction and the problem Mault is solving, but the WordPress/Elementor implementation was making the site slower, harder to maintain, and less ready for modern search and AI discovery than the product deserved.

Instead of sending a list of suggestions, I rebuilt it as an independent demo.

Live preview:

https://mault-v2.fltechadventures.com

Public repository and full audit trail:

https://github.com/ii-am-modiify/mault-ai-performance-redesign

The original mobile benchmark scored 64 for performance, with a 3.5-second LCP, 768ms of blocking time, 6.52MB transferred, and 133 requests. Desktop performed better, but still scored 91 for accessibility, 54 for best practices, and 85 for SEO.

The sitemap also exposed parallel homepage, enterprise, contact, blog, documentation, author, category, QA, and legacy routes. `llms.txt` redirected to a 404, while `llms-full.txt` and the standard security contact file were missing. Those files are not magic ranking switches, but together with duplicate route intent, heavy rendering, and inconsistent content ownership, they showed the site was not prepared for AI-assisted discovery or clean crawler interpretation.

The rebuild preserves Mault's visual language while adding:

- 100 mobile performance, accessibility, and best-practices scores
- 0.9-second LCP, 0ms blocking time, and zero layout shift
- responsive desktop and mobile layouts
- reconstructed articles and optimized first-party imagery
- clean sitemap and route ownership
- structured metadata and canonical URLs
- `llms.txt`, `llms-full.txt`, `humans.txt`, and `security.txt`
- an interactive Blog Studio prototype
- hardened container deployment and security headers
- CI, CodeQL, dependency review, Dependabot, secret scanning, push protection, and protected pull-request review

The repository includes the raw public-source capture with hashes, a route-by-route disposition, Lighthouse evidence, BMAD product and architecture documents, the original-site audit, security review, and pull-request history. The production Mault site was never touched, and the preview is clearly labeled as an unaffiliated, noindex demo.

The task record started at 8:34 AM EDT. A complete protected preview was verified 43 minutes later, and the public repository plus editorial and security hardening were completed in roughly 90 minutes. I continued through the final authentication prototype and handoff audit in the same session.

I built this because showing the work is more useful than saying I could do it. If the direction is useful, I would be glad to walk you through the architecture, audit findings, and what I would change for a production implementation.

Alain Vartanian

Founder, Tech Adventures LLC

https://fltechadventures.com

https://linkedin.com/in/alainvartanian
