# Mault.ai V2 Product Requirements

## Functional requirements

### Global shell

- Responsive sticky header with logo, Platform, How It Works, Pricing, FAQ, Blog, and Contact/Pilot entry points.
- Accessible mobile menu with focus management, escape-to-close, and body scroll locking.
- Consistent footer containing product, legal, social, and contact destinations.

### Homepage

- Preserve the core narrative: governance promise, supported coding agents, enforcement/visibility/verification, central management, orchestration, evidence model, pricing, FAQ, and final conversion.
- Recreate the visual rhythm of dark panels, luminous green emphasis, purple supporting accents, technical grids, cards, and terminal/product demonstrations.
- Replace heavyweight autoplay behavior with optimized media, responsive posters, lazy loading, and user-respecting playback.

### Supporting pages

- Platform/product overview.
- How it works.
- Pricing.
- Enterprise/pilot.
- FAQ.
- Contact.
- Blog index and seven captured articles.
- Documentation entry and AI Coder Guide.
- Privacy, Terms, Cookie Policy, and Billing Policy.

### Content migration

- Capture page title, slug, source URL, publish/modified date, headings, readable body, metadata, featured media, inline media, outbound links, forms, and structured data.
- Keep a checksum-backed source manifest so migrated copy can be compared with WordPress.
- Classify each URL as retain, consolidate, redirect, archive, or review.

### AI/search readiness

- Semantic page landmarks and heading order.
- Organization, WebSite, SoftwareApplication/Product, FAQ, Article, Breadcrumb, and WebPage schema only where supported by visible content.
- XML sitemap, robots.txt, llms.txt, and llms-full.txt generated from the same route/content source.
- Descriptive internal links and indexable text for key product claims.

## Nonfunctional requirements

- Astro static output with TypeScript and small framework-free islands where interaction is necessary.
- Docker image served by unprivileged Nginx or equivalent static runtime.
- Local assets with explicit dimensions, modern formats, responsive source sets, and immutable cache headers.
- Content Security Policy planned before analytics/forms are reintroduced.
- WCAG 2.2 AA target, including contrast, keyboard access, focus visibility, labels, reduced motion, and zoom/reflow.

## Acceptance criteria

- All approved routes render without client JavaScript.
- Navigation, accordion, mobile menu, and any media controls work with keyboard and touch.
- No copied Elementor runtime, WordPress plugin CSS, jQuery, or remote page-builder dependencies.
- Route/content manifest reconciles all 31 sitemap URLs and 31 WordPress page/post records.
- Preview passes build, HTML validation, link scan, accessibility checks, browser console checks, responsive screenshot review, and Lighthouse comparison.
