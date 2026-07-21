# Story: Capture and classify the current Mault.ai site

As the rebuild team, we need a reproducible snapshot of every public page and dependency so the replacement neither loses valuable content nor inherits accidental WordPress clutter.

## Acceptance criteria

- Enumerate all sitemap, navigation, and WordPress page/post API URLs.
- Capture raw HTML, readable content, metadata, headings, links, images, video, forms, scripts, styles, and structured data.
- Store SHA-256 hashes and retrieval timestamps.
- Produce a route map with retain/consolidate/redirect/archive/review status.
- Flag unreachable assets, external dependencies, duplicate titles/slugs, and legacy naming.
- The capture can be rerun without overwriting the previous dated snapshot.
