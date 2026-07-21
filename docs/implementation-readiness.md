# Implementation Readiness Review

## Decision

Conditionally ready for the design-system scaffold and automated source capture. Page implementation remains gated on completion of the route disposition and asset/content manifests.

## Agreements

- Brief, PRD, UX, and architecture agree on a static-first Astro/Docker implementation.
- The experience preserves visual identity while replacing WordPress/Elementor runtime debt.
- Mobile, accessibility, reduced motion, AI readability, and measurable performance are first-class acceptance requirements.
- Preview deployment and production cutover are separate gates.

## Open items

- Confirm which legacy pages are intentionally public versus accidental leftovers.
- Confirm final CTA destinations and whether Pilot and Contact are separate funnels.
- Confirm legal-copy ownership and whether copy may be edited beyond formatting corrections.
- Inventory current analytics, Mixpanel, Leadsy, Brevo, Reddit pixel, TrustedSite, and reCAPTCHA behavior before choosing integrations.

## Authorized implementation scope

- Automated read-only capture of public source material.
- Local project, design system, component, content, test, and Docker work.
- No public deployment, DNS change, form submission to third parties, analytics activation, or WordPress mutation.
