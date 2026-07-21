# Mault.ai performance redesign demo

An independent, unsolicited redesign prototype created by Tech Adventures after reviewing the public Mault website. It preserves the brand's dark, technical visual language while replacing the WordPress/Elementor delivery layer with a small Astro site.

This repository is **not an official Mault repository**, is not affiliated with Mault, and is not deployed to `mault.ai`. Product names, copy, and first-party brand assets remain the property of their respective owners and are included only to demonstrate the proposed redesign.

## Results

- Original mobile benchmark: 64 performance, 3.5s LCP, 6.52MB, 133 requests.
- Redesign mobile benchmark: 100 performance, 0.98s LCP, 30KB initial transfer, 0ms blocking time.
- 24 statically generated routes, responsive navigation, reduced-motion support, structured metadata, sitemap, and LLM discovery files.

## Local development

```bash
npm ci
npm run check
npm run build
npm run preview
```

Or run the hardened unprivileged Nginx image:

```bash
docker compose up --build
```

The protected review deployment is intentionally `noindex`. Production cutover was never performed.

## Content Studio

`/admin/blog/` is the interaction prototype for the editorial workflow: title, slug, date, author, status, excerpt, cover image, HTML content, SEO metadata, preview, and post management. Browser-local draft persistence is clearly separated from the future authenticated publishing API.

## Security

- Unprivileged, read-only container with isolated networking.
- Security headers and explicit noindex controls on the demo deployment.
- Dependency review, CodeQL, secret scanning, build verification, and Dependabot configuration.
- No credentials, production integrations, analytics tags, or Mault systems are included.

See [SECURITY.md](SECURITY.md) for reporting guidance and `docs/` for the BMAD planning artifacts.

