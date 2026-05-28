# PromptWars Boilerplate — How To Use

## Every Challenge — Quick Start

1. Duplicate this folder, rename to your app name
2. Search & replace all `__PLACEHOLDER__` values
3. Open in Antigravity

## Antigravity Message Sequence

### Start of every session
```
MSG 1 → skill-files/SKILL_1_RULES.md     (coding rules — every session)
MSG 2 → skill-files/SESSION_LOG.md        (knowledge base — every session)
MSG 3 → filled PROBLEM_DECODER.md         (your architecture spec)
```
Wait for architecture approval before any code.

### Phase 1 only (additional message)
```
MSG   → skill-files/SKILL_2_TEMPLATES.md  (file templates)
        "Build Phase 1 using these templates"
```

### Before each submission
```
→ Paste key files to Claude on claude.ai
→ Ask Claude to audit against PRE_SUBMISSION_AUDIT.md + SKILL_3_CHECKLIST.md
→ Fix everything flagged → Submit
```

## Placeholders to Replace

| Placeholder | Replace with |
|-------------|-------------|
| `__APP_NAME__` | App name (e.g. VoteTrack) |
| `__APP_FULL_NAME__` | Full display name |
| `__APP_SHORT_NAME__` | Short PWA name |
| `__APP_DESCRIPTION__` | One-line description |
| `__EMOJI__` | App icon emoji |
| `__REPO_URL__` | GitHub repo URL |
| `__DEPLOYED_URL__` | Vercel deploy URL |

## After Each Phase

Tell Antigravity: `"Update skill-files/SESSION_LOG.md for Phase [N]"`

## Folder Map

| Folder/File | Purpose |
|-------------|---------|
| `skill-files/` | PromptWars strategy — never delete |
| `src/components/ui/` | Reusable UI primitives |
| `src/components/features/` | Challenge-specific components |
| `src/config/` | Firebase + env setup |
| `src/constants/` | All magic values |
| `src/hooks/` | Custom React hooks |
| `src/services/` | External integrations |
| `src/types/` | All TypeScript interfaces |
| `src/utils/` | Pure utility functions |
| `src/tests/unit/` | Utility function tests |
| `src/tests/security/` | vercel.json, firebase.json, rules, env |
| `src/tests/integration/` | Required files exist check |
| `src/tests/accessibility/` | HTML landmarks, a11y CSS |
| `src/tests/edge-cases/` | Null, empty, network failure |
| `tests/e2e/` | Playwright smoke tests |
| `docs/` | Architecture docs |
| `.github/` | CI + PR templates |
