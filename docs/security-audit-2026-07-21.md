# Security audit — July 21, 2026

This document records the final audit scope for the independent Mault redesign demo. Results are updated only from reproducible checks on the public repository, built artifact, container, and protected preview.

## Controls reviewed

- Dependency vulnerabilities
- Static application diagnostics and production build
- Committed and historical secret-pattern scan
- GitHub secret scanning, push protection, Dependabot, dependency review, CodeQL, and branch protection
- GitHub Actions supply-chain pinning
- Container user, read-only filesystem, dropped capabilities, isolated network, and health check
- Live TLS and HTTP response headers
- Discovery-file and route availability
- Browser console errors and HTML-preview injection behavior
- Public demo-access boundary and credential disclosure

## Design boundary

The Blog Studio login is a public demo gate. Its shared passphrase is intentionally displayed and must not be treated as authentication or used anywhere else. The static site contains no privileged backend operation to protect. Production requirements are server-side OAuth sessions, role-based authorization, persistent storage, audit logs, CSRF protection, rate limiting, and an authenticated publishing API.

## Results

Final command output and GitHub check links are recorded in the pull request and delivery closeout. At the time of publication:

- Astro diagnostics/build: pending final branch run
- npm production dependency audit: pending final branch run
- Repository/history secret-pattern scan: pending final branch run
- Live header and route audit: pending final deployment run
- GitHub CI, CodeQL, and dependency review: pending pull request

## Residual risks

- Browser-local drafts are readable by anyone with access to that browser profile.
- Uploaded demo images are stored as local data URLs and are not suitable for production scale.
- CSP currently permits inline script/style because Astro emits inline client code; production can move to nonces or hashes.
- The preview is public by design, although blocked from indexing.
- Mault product claims and copied first-party assets require owner approval before any official use.
