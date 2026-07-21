# Mault.ai V2 Architecture

## Source of truth

- Canonical project: `/root/projects/mault-ai-v2` in Git.
- Captured WordPress material lives under `reference/source/` with manifests and hashes.
- Migrated structured content lives under `src/content/`; components never scrape WordPress at runtime.
- Route disposition is controlled by `reference/route-map.json`.

## Runtime

- Astro static site, TypeScript, semantic HTML, scoped CSS, and minimal vanilla-JS islands.
- Multi-stage Docker build; static output served by an unprivileged Nginx container.
- Isolated Docker network and a unique preview port registered before deployment.
- Production remains untouched until preview acceptance and explicit cutover approval.

## Service boundaries

- Website: static content and progressive UI only.
- Forms: explicit API endpoint selected after current form behavior and spam controls are documented.
- Analytics: isolated consent-aware module; no tag is included merely because it existed in WordPress.
- CMS: the protected demo includes a deliberately simple Blog Studio UI for title, slug, date, author, excerpt, cover image, raw HTML content, SEO fields, preview, and draft/publish state. The first UI gate stores drafts in browser-local storage; the production publishing adapter will persist to the project API/database and regenerate the static blog without exposing a WordPress-style admin surface.

## Asset pipeline

- Download only first-party assets used by retained routes.
- Preserve originals under `reference/source/assets`; publish optimized derivatives under `public/assets`.
- Generate AVIF/WebP plus appropriate fallbacks, width variants, blur/poster placeholders, and explicit dimensions.
- Replace the current 6MB-class homepage payload with a <= 2MB initial-load target and lazy media beyond the fold.

## Security and privacy

- Default-deny CSP evolved from the final integration list.
- No WordPress admin, XML-RPC, plugin surface, or server-rendered database dependency.
- Security headers include HSTS at the proxy, nosniff, referrer policy, permissions policy, frame restrictions, and an intentional CSP.
- Forms validate client and server side; credentials remain project-scoped and server-only.

## Failure and rollback

- Preview is deployed under a noindex subdomain with `X-Robots-Tag` protection.
- Cutover is DNS/proxy aliasing after acceptance.
- Rollback returns the domain to the existing WordPress origin; no WordPress data is deleted during launch.

## Verification

- Static build, typecheck, unit tests, HTML/link checks, sitemap/schema validation.
- Browser QA at 320, 390, 768, 1024, and 1440px.
- Keyboard, reduced-motion, no-JS, console, network, and form error-path checks.
- Lighthouse mobile/desktop comparison using the same environment and run settings as the baseline.
