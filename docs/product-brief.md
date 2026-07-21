# Mault.ai V2 Product Brief

## Goal

Rebuild the public Mault.ai marketing site without WordPress or Elementor while preserving the current dark, technical visual identity, neon green/purple accent system, dense product storytelling, and purposeful motion.

## Users and primary action

- Engineering leaders evaluating governance for AI-assisted development.
- Security and compliance leaders who need enforceable controls and evidence.
- Developers comparing Mault with prompt-only or policy-only approaches.
- Primary conversion: request a pilot or contact the Mault team.
- Secondary conversion: understand the platform, pricing, documentation, and technical credibility.

## Current baseline

- Mobile Lighthouse performance: 64; LCP 3.50s; TBT 768ms; TTI 16.14s.
- Desktop: performance 96, accessibility 91, best practices 54, SEO 85.
- Homepage transfers roughly 6.1–6.5 MB across 132–133 requests.
- Initial markup references 31 CSS files, 25 JavaScript files, three AVIFs, three PNGs, one GIF, and one autoplaying MP4.
- Public WordPress inventory: 24 pages, seven posts, and 31 sitemap URLs, including obvious legacy duplicates.

## Product principles

1. Preserve recognition, not implementation debt.
2. Every animation must clarify hierarchy, state, or sequence.
3. Mobile is a designed experience, not stacked desktop sections.
4. Public copy and claims remain traceable to the captured source.
5. Static-first output, progressive enhancement, and minimal client JavaScript.
6. The site must be machine-readable through semantic HTML, structured data, sitemap, robots, and LLM-friendly summaries.

## Success measures

- Mobile Lighthouse performance >= 90 and desktop >= 95 in the preview environment.
- Accessibility, best practices, and SEO >= 95 where third-party integrations do not prevent it.
- Mobile LCP <= 2.5s, TBT <= 200ms, CLS <= 0.05.
- No horizontal overflow at 320, 390, 768, 1024, and 1440px.
- Every retained route has one H1, unique title/description, canonical URL, and intentional redirect mapping.
- Reduced-motion mode removes nonessential motion without hiding content.

## Constraints

- No production cutover without explicit approval.
- Legal and pricing language is migrated verbatim unless Mault approves revisions.
- Existing analytics, lead capture, and tracking are inventoried before deciding what returns.
- Legacy WordPress pages are preserved as source evidence but not automatically retained as public routes.
