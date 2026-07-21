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

Final command output and GitHub check links are recorded in [pull request #7](https://github.com/ii-am-modiify/mault-ai-performance-redesign/pull/7).

- Astro diagnostics/build: passed with 0 errors, 0 warnings, and 0 hints; 24 routes built.
- Route/discovery verification: all 24 HTML routes and required sitemap, robots, LLM, humans, and security files passed.
- npm dependency audit at low severity: 0 known vulnerabilities.
- Repository/history high-confidence secret-pattern scan: no OpenAI, GitHub, AWS, Google API/OAuth, or private-key patterns found outside immutable public-source captures.
- GitHub secret scanning: 0 alerts; push protection enabled.
- Dependabot: 0 open alerts; npm and GitHub Actions update monitoring configured.
- Private vulnerability reporting: enabled.
- GitHub Actions: all third-party actions pinned to immutable commit SHAs.
- Pull-request checks: CI, CodeQL, and dependency review passed.
- CodeQL scope excludes immutable third-party WordPress HTML captures while scanning application, utility, and workflow code. The capture utility's flagged HTML regexes were replaced with bounded parsing logic.
- Live discovery audit: `/`, `/admin/blog/`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/humans.txt`, and `/.well-known/security.txt` returned 200.
- Live headers: CSP, HSTS, COOP, CORP, frame denial, MIME protection, referrer policy, permissions policy, and noindex protection present.
- Container: healthy, UID 101, read-only root filesystem, all Linux capabilities dropped, and `no-new-privileges` enabled.
- Browser verification: incorrect demo passphrase rejected, documented passphrase accepted, session state persisted, 390px layout had no horizontal overflow, and console errors were 0.
- HTML article preview: scripts, embedded contexts, forms, event handlers, inline styles, and unsafe JavaScript URLs are stripped before insertion.

No dedicated base-image CVE scanner was installed in the build environment. Both build and runtime images are pinned to immutable digests, and the runtime is minimal and unprivileged. Production operations should still add Trivy or Grype image scanning plus SBOM generation to CI.

## Residual risks

- Browser-local drafts are readable by anyone with access to that browser profile.
- Uploaded demo images are stored as local data URLs and are not suitable for production scale.
- CSP currently permits inline script/style because Astro emits inline client code; production can move to nonces or hashes.
- The preview is public by design, although blocked from indexing.
- Mault product claims and copied first-party assets require owner approval before any official use.
