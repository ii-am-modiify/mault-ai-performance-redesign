# Mault.ai V2 UX Specification

## Visual direction

- Keep the existing black/charcoal field, high-contrast white type, electric green primary accent, and restrained purple secondary accent.
- Use a tighter, intentional type scale with large editorial headlines and compact technical labels.
- Preserve luminous borders, grid textures, terminal motifs, proof cards, and hover elevation, but remove decorative movement that competes with reading.
- Prefer CSS gradients, masks, and inline SVG over rasterized interface chrome.

## Homepage flow

1. Sticky header and direct conversion action.
2. Hero: deterministic governance promise, short supporting explanation, primary/secondary actions, optimized product proof.
3. Supported agent strip.
4. Problem/gap statement.
5. Three-pillar overview: Enforce, See, Prove.
6. Deep-dive feature chapters with alternating evidence visuals.
7. Central management and collision-free orchestration.
8. Evidence integrity: Identity, Logging, Auditable, Transparency.
9. Consistent production standard comparison.
10. Pricing.
11. FAQ.
12. Final conversion and updates signup.

## Motion system

- Entrance motion: opacity plus 12–20px translation, 350–550ms, once per section.
- Hover: cards rise no more than 4px; border/glow changes carry most feedback.
- Demonstrations: timeline or terminal sequences only when visible; pause outside viewport.
- Navigation: 180–240ms transitions.
- No scroll-jacking, custom cursor, or content hidden pending JavaScript.
- `prefers-reduced-motion: reduce` disables entrances, parallax, looping demonstrations, smooth scrolling, and animated counters.

## Responsive behavior

- 320–479px: single-column narrative, compact hero, horizontally scrollable agent rail with accessible labels, full-width actions, collapsed FAQs.
- 480–767px: single column with selective two-up proof cards.
- 768–1023px: tablet navigation, two-column feature chapters where content remains readable.
- 1024px+: desktop header and alternating two-column product storytelling.
- Long technical strings wrap safely; code examples scroll inside their own containers.

## States

- Loading: static content appears immediately; enhanced media uses poster/skeleton only inside its reserved box.
- Error: forms preserve entered fields and provide inline plus summary errors.
- Empty: blog/category pages explain when no matching content exists.
- Offline/blocked third party: no primary content or navigation depends on remote scripts.
