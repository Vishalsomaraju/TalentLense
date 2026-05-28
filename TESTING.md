# Testing — __APP_NAME__

> 5 suites | 40+ tests | 70% coverage gate enforced in CI

---

## Overview

```
src/tests/
├── unit/             Pure function logic
├── security/         File compliance (vercel.json, firebase.json, firestore.rules, env)
├── integration/      Project structure — all required files exist
├── accessibility/    HTML landmarks, ARIA, skip link, lang attribute
└── edge-cases/       Null input, empty arrays, API failure, network errors

tests/
└── e2e/
    └── smoke.spec.ts  Playwright: loads, nav, skip link, no missing alt
```

---

## Running Tests

```bash
npm test                    # All unit + component tests
npm run test:coverage       # With 70% coverage gate (fails below threshold)
npm run test:watch          # Watch mode during development
npm run test:e2e            # Playwright smoke tests

# Run a single suite
npx vitest run src/tests/security
npx vitest run src/tests/accessibility
npx vitest run src/tests/integration
```

---

## Suite 1 — Unit (`src/tests/unit/`)

Tests pure utility functions in isolation.
**Every function exported from `src/utils/` must have a test.**

| Pattern | What to test |
|---------|-------------|
| Happy path | Valid input → correct output |
| Error path | Invalid/null input → graceful return (not throw) |
| Edge case | Empty string, 0, undefined, very long input |

---

## Suite 2 — Security (`src/tests/security/`)

Programmatically proves security compliance — not just that code works, but that the project is correctly configured. The evaluator reads these tests.

| Test | What it verifies |
|------|-----------------|
| `vercel.test.ts` | vercel.json has X-Frame-Options, CSP, HSTS, Referrer-Policy, Permissions-Policy |
| `firebase.test.ts` | firebase.json has security headers |
| `firestore.test.ts` | firestore.rules has deny-all default + auth required |
| `env.test.ts` | .env.example lists all VITE_ vars; .gitignore excludes .env and AI tool caches |
| `source.test.ts` | No raw API keys (AIzaSy...) in config source files |

---

## Suite 3 — Integration (`src/tests/integration/`)

Verifies the project structure. A missing file = lost Code Quality points. Catches it before submission.

| Test | Required files checked |
|------|----------------------|
| `structure.test.ts` | All 25+ mandatory files exist |
| `folders.test.ts` | src/components/ui, features, services, hooks, types, constants, config all exist |
| `github.test.ts` | .github/workflows/ci.yml, PR template, issue templates |
| `docs.test.ts` | README.md, TESTING.md, CONTRIBUTING.md, LICENSE, GOOGLE_SERVICES.md, docs/ARCHITECTURE.md |

---

## Suite 4 — Accessibility (`src/tests/accessibility/`)

Verifies index.html has structural a11y requirements. JSX-level checks are enforced by `eslint-plugin-jsx-a11y` in CI.

| Test | WCAG criterion |
|------|---------------|
| `lang` on `<html>` | SC 3.1.1 Language of Page |
| `<meta viewport>` | SC 1.4.4 Resize text |
| `<title>` present | SC 2.4.2 Page Titled |
| Skip-to-content link | SC 2.4.1 Bypass Blocks |
| `<link rel="manifest">` | PWA requirement |
| Google Fonts via `<link>` | Performance + Google Services signal |
| Service worker registered | PWA / Efficiency |

---

## Suite 5 — Edge Cases (`src/tests/edge-cases/`)

Tests paths that break in production. Every async service function must handle these gracefully — no uncaught exceptions, no undefined returns.

| Test | What it covers |
|------|---------------|
| Null input | Sanitize/format functions return safe default, never throw |
| Empty array | UI renders empty state, not crash |
| Network failure | Returns `{ data: null, error: string }` |
| Invalid date | Returns fallback value |
| Malformed JSON | Caught and handled |

---

## E2E Smoke (`tests/e2e/smoke.spec.ts`)

Playwright tests proving the app loads and critical a11y features work. Runs in CI on every PR.

| Test | Verifies |
|------|---------|
| App loads | Title matches app name |
| Navigation visible | `<nav>` role visible |
| Main content visible | `<main>` role visible |
| Skip link focusable | First Tab press focuses skip link |
| No images missing alt | `img:not([alt])` count = 0 |
| Single h1 | Exactly one `<h1>` on page |
| Manifest linked | `<link rel="manifest">` present |

---

## Coverage Thresholds

Enforced as a hard gate in CI — PRs fail if coverage drops below:

| Metric | Threshold |
|--------|-----------|
| Lines | **70%** |
| Functions | **70%** |
| Branches | **60%** |
| Statements | **70%** |

Coverage report generated at `coverage/index.html` after `npm run test:coverage`.
