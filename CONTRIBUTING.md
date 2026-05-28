# Contributing — __APP_NAME__

## Quick Start

```bash
git clone __REPO_URL__
cd __APP_NAME__
cp .env.example .env.local   # Fill in Firebase config
npm install
npm run dev
```

## Local Checks (run before every PR)

```bash
npm run lint          # ESLint + jsx-a11y — zero errors required
npx tsc --noEmit      # TypeScript strict — zero errors required
npm test              # All tests — zero failures required
npm run test:coverage # Coverage must stay ≥ 70%
```

## Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feat/desc` | `feat/user-auth` |
| Bug fix | `fix/desc` | `fix/modal-focus` |
| Tests | `test/desc` | `test/edge-cases` |
| Docs | `docs/desc` | `docs/api-guide` |

## Commit Convention

```
feat: add Gemini AI streaming chat
fix: handle null Firestore response gracefully
test: add edge cases for date formatter
docs: update architecture diagram
chore: bump firebase to 11.x
```

## PR Checklist

- [ ] `npm run lint` — zero errors
- [ ] `npx tsc --noEmit` — zero errors
- [ ] `npm test` — zero failures, coverage ≥ 70%
- [ ] No secrets committed
- [ ] New async functions have `try/catch`
- [ ] New files have `@module` JSDoc at top
- [ ] Keyboard navigation tested on changed UI
- [ ] `README.md` updated if user-facing feature changed

## Code Rules

- `.tsx` / `.ts` only — never `.jsx` / `.js`
- Tailwind classes only — no inline styles
- One component = one responsibility
- Comments explain WHY, never WHAT
- All magic values go in `src/constants/index.ts`
