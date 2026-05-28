# PROMPTWARS — SKILL 3: BUILD PHASES + CHECKLIST
### Send as: Message 1 before running the pre-submission audit
### Contains: 7 build phases in order, full pre-submission checklist per category
### Version: 5.0 | 209 lines

---

## BUILD PHASES — HOW TO STRUCTURE EVERY SESSION

**Phase 0 — Architecture (ALWAYS FIRST)**
- Define folder structure
- Define all TypeScript types and interfaces
- Define constants
- Get approval before proceeding

**Phase 1 — Foundation + Infrastructure (the files around the code score too)**
- `tsconfig.json`, `.eslintrc.cjs` (with jsx-a11y), `.prettierrc`, `vite.config.ts`, `vitest.config.ts` (with coverage thresholds)
- `firebase.json`, `vercel.json` (BOTH — security headers for Firebase backend + Vercel frontend), `firestore.rules`, `.env.example`, `.gitignore`
- `manifest.json`, `public/sw.js`
- `src/config/firebase.ts`, `src/config/env.ts`
- `src/constants/index.ts`, `src/types/index.ts`
- `LICENSE` (MIT — 30 seconds)
- `CONTRIBUTING.md`
- `README.md`, `TESTING.md`, `GOOGLE_SERVICES.md`
- `docs/ARCHITECTURE.md` (Mermaid diagram + component table)
- `.github/workflows/ci.yml`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/bug_report.md` and `feature_request.md`
- Update `SESSION_LOG.md`

**Phase 2 — Core Services**
- `src/services/analyticsService.ts` (with `@module` JSDoc)
- `src/services/authService.ts` (if auth needed, with `@module` JSDoc)
- `src/services/[domain]Service.ts`
- Update `SESSION_LOG.md`

**Phase 3 — UI Primitives**
- `src/components/ui/ErrorBoundary.tsx`
- `src/components/ui/Button.tsx`, `Input.tsx`, `Card.tsx`, `Modal.tsx`, `LoadingSpinner.tsx`, `FormField.tsx`
- `src/index.css` (with accessibility CSS: `prefers-reduced-motion`, `prefers-contrast`, `sr-only`, `:focus-visible`)
- Update `SESSION_LOG.md`

**Phase 4 — Feature Components**
- Build feature by feature
- Each component: props interface → `@module` JSDoc → implementation → accessibility → error state
- Update `SESSION_LOG.md`

**Phase 5 — Pages + PWA**
- Route components, hook up `analyticsService.trackPageView()` on every route
- Register service worker in `index.html`
- Add `<link rel="manifest">` to `index.html`
- Update `SESSION_LOG.md`

**Phase 6 — 5 Test Suites + E2E**
- `src/tests/unit/` — utility function tests (happy path + errors + edge cases)
- `src/tests/security/` — key exposure, firebase.json headers, firestore rules
- `src/tests/integration/` — required files exist INCLUDING `.github/`, `docs/`, `LICENSE`
- `src/tests/accessibility/` — HTML landmarks, ARIA attributes, skip link
- `src/tests/edge-cases/` — null inputs, API failures, empty states, network errors
- `tests/e2e/smoke.spec.ts` — Playwright: app loads, nav visible, skip link focusable
- Minimum 40 unit/integration/a11y tests + E2E smoke
- Update `SESSION_LOG.md`

**Phase 7 — Final Audit**
- Run through the Pre-Submission Checklist below
- Fix every item marked ❌
- Update `SESSION_LOG.md` with final score predictions and notes

---

## PRE-SUBMISSION CHECKLIST

Run this checklist before every submission. Update SESSION_LOG with results.

### Code Quality
- [ ] All files are `.tsx` / `.ts` — zero `.jsx` / `.js` files
- [ ] `tsconfig.json` has `"strict": true`
- [ ] ESLint passes with zero errors (`npm run lint`) — including `jsx-a11y` plugin
- [ ] Zero unused imports (TS compiler catches these)
- [ ] All async functions have try/catch
- [ ] All magic strings/numbers are in `constants/index.ts`
- [ ] `@module` JSDoc at the top of EVERY `.ts` / `.tsx` file
- [ ] JSDoc on every exported util, service, hook, and complex component
- [ ] All comments explain WHY, not WHAT — no obvious comments
- [ ] Single responsibility check: no component does two things
- [ ] Error Boundary wraps every major page section
- [ ] Folder structure matches the mandated structure exactly
- [ ] `TESTING.md` exists and documents all 5 test suites
- [ ] `GOOGLE_SERVICES.md` exists — maps every Google service to package + key files + usage + env var
- [ ] `CONTRIBUTING.md` exists with branch conventions + PR checklist
- [ ] `LICENSE` file exists (MIT)
- [ ] `vercel.json` at project root with 8 security headers + SPA rewrite
- [ ] `docs/ARCHITECTURE.md` exists with Mermaid diagram + component table
- [ ] `.github/workflows/ci.yml` exists with lint + typecheck + test + coverage gate
- [ ] `.github/pull_request_template.md` exists
- [ ] `.github/ISSUE_TEMPLATE/` has bug_report.md + feature_request.md
- [ ] `vitest.config.ts` has coverage thresholds set (lines: 70%)

### Security
- [ ] Zero API keys or secrets in code (all in `.env`)
- [ ] `.env.example` exists with all required vars (empty values)
- [ ] `.gitignore` includes `.env*` (except `.env.example`)
- [ ] `.gitignore` includes all AI tool configs: `.cursor/`, `.cline_storage/`, `CLAUDE.md`, `.aider*`, `.continue/`
- [ ] Run `git ls-files` before submitting — delete anything that isn't source, config, tests, or docs (no linkedin posts, draft notes, placeholder files, AI session logs)
- [ ] `vercel.json` has all 8 security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, X-XSS-Protection, COOP)
- [ ] `vercel.json` has SPA rewrite rule and sw.js no-cache route
- [ ] `firebase.json` has security headers (for Firebase Hosting backend)
- [ ] `firestore.rules` uses deny-all default + `request.auth != null` + field validation
- [ ] All user inputs sanitized before display
- [ ] No `dangerouslySetInnerHTML` without DOMPurify
- [ ] Type assertions (`as`) used sparingly — no `as any`
- [ ] Rate limiting logic exists for any user-triggered API calls (debounce minimum)
- [ ] Security test suite verifies firebase.json headers programmatically

### Accessibility
- [ ] Skip navigation link at top of `App.tsx`
- [ ] `prefers-reduced-motion` media query in `index.css`
- [ ] `prefers-contrast` media query in `index.css`
- [ ] `:focus-visible` styles defined (never remove outline without replacing)
- [ ] `.sr-only` utility class defined and used for screen-reader text
- [ ] Logical heading hierarchy (`h1` → `h2` → `h3`, one `h1` per page)
- [ ] Every image has `alt` text (decorative: `alt=""`)
- [ ] Every form input has an associated `<label>`
- [ ] No `div` or `span` used as interactive elements — use `<button>`
- [ ] All icon-only buttons have `aria-label`
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Error messages use `role="alert"` or `aria-live="polite"`
- [ ] Loading states announced with `aria-live="polite"` and `aria-busy`
- [ ] Modal closes on `Escape` key and traps focus
- [ ] Navigation uses `<nav>` with `aria-label`
- [ ] Semantic HTML throughout: `header`, `main`, `section`, `footer`
- [ ] `lang="en"` attribute on `<html>` tag in `index.html`
- [ ] ESLint `jsx-a11y` plugin catches missing labels/roles in CI

### Google Services
- [ ] Google Analytics 4 initialized and `analyticsService` class created
- [ ] `trackPageView()` called on every route change
- [ ] At least 3 custom GA4 events for meaningful user actions
- [ ] `trackError()` called in every catch block — wires errors to GA4
- [ ] Google Fonts loaded via `<link>` in `index.html` (not CSS `@import`)
- [ ] Firebase used for at least one core feature (auth or db)
- [ ] `docs/ARCHITECTURE.md` documents which Google Services are used and WHY
- [ ] `GOOGLE_SERVICES.md` at root — dedicated file, NOT just a README section

### PWA
- [ ] `manifest.json` exists at project root with name, icons, theme_color
- [ ] `public/sw.js` service worker with install + activate + fetch handlers
- [ ] Service worker registered in `index.html` via `<script>`
- [ ] `<link rel="manifest" href="/manifest.json">` in `index.html` `<head>`

### Testing
- [ ] 5 test suite folders: `unit/`, `security/`, `integration/`, `accessibility/`, `edge-cases/`
- [ ] `TESTING.md` documents every suite with description and run command
- [ ] Minimum 40 tests total across all suites
- [ ] Security tests verify vercel.json headers (X-Frame-Options, CSP, HSTS, etc.)
- [ ] Security tests verify firebase.json headers
- [ ] Security tests verify firestore.rules has deny-all default
- [ ] Integration tests verify ALL required files exist (incl. `.github/`, `docs/`, `LICENSE`)
- [ ] Accessibility tests verify HTML has `lang`, `<main>`, `<nav>`, skip link
- [ ] Edge case tests cover null input, empty arrays, network failure
- [ ] `tests/e2e/smoke.spec.ts` Playwright test exists and checks app loads
- [ ] Coverage threshold enforced in `vitest.config.ts` (fails build below 70%)
- [ ] All tests pass with zero failures (`npm test`)

---

## SESSION_LOG.md — UPDATE AFTER EVERY PHASE

After completing each phase, append to `SESSION_LOG.md`:

```markdown
## Session: [Challenge Name] | [Date]

### Problem Statement Summary
[2-3 sentences describing what was built]

### Architecture Decisions
- [Decision 1 and WHY it was made]
- [Decision 2]

### Challenges Encountered
| Challenge | Solution | Time Spent |
|-----------|----------|------------|
| [Issue] | [How fixed] | [X min] |

### Checklist Results
- Code Quality: [items that passed/failed]
- Security: [items that passed/failed]
- Accessibility: [items that passed/failed]

### Scores Achieved
| Category | Score |
|----------|-------|
| Code Quality | % |
| Security | % |
| Efficiency | % |
| Testing | % |
| Accessibility | % |
| Google Services | % |
| Overall | % |

### What Worked Well
- [Pattern or approach that improved score]

### What to Improve Next Time
- [Specific gap that cost points and how to fix it]

### Reusable Patterns Discovered
- [Any utility, hook, or pattern worth reusing in future sessions]
```

---

> **Remember:** Every prompt you write to me is a bet. A well-structured prompt with architecture-first thinking wins points before a line of code is written.
> Build to score. Not just to ship.
