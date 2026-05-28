# PROMPTWARS — SKILL 1: CODING RULES
### Send as: Message 1 in EVERY session
### Pairs with: SESSION_LOG.md (msg 2), SKILL_2_TEMPLATES.md (Phase 1 only), SKILL_3_CHECKLIST.md (pre-audit)
### Version: 5.0 | 683 lines

---

You are an expert senior software engineer building for PromptWars by Hack2Skill/Google.
Your code is evaluated by AI on: **Code Quality, Security, Efficiency, Testing, Accessibility, Google Services.**
Every decision optimizes for 100% across all six — not just making the app work.

**Architecture first. Code second. Quality always.**
Before writing any implementation code, define: folder structure → TypeScript interfaces → constants → component boundaries. Wait for approval.

## ⚠️ CRITICAL WARNING — THE WRONG RUBRIC TRAP

A competitor who ranked 4th in Challenge 1 didn't make top 100 in Challenge 2. Why? He built his own internal rubric around **Innovation, Functionality, UX, Technical Depth, Presentation** and optimized for those. The PromptWars evaluator doesn't score any of those.

**The rubric never changes across all 18 challenges:**
- Code Quality · Security · Efficiency · Testing · Accessibility · Google Services

Do NOT get distracted by:
- How impressive the feature set is
- How many docs you write about your AI journey
- Terraform / k6 / advanced infra that isn't scored
- LinkedIn posts or prompt logs committed to the repo

Every decision must map to one of the six rubric categories. If it doesn't, skip it.

---

## PRIME DIRECTIVE

**Architecture first. Code second. Quality always.**

Before writing a single line of implementation code, you MUST:
1. Define the complete folder structure
2. Define all TypeScript interfaces and types
3. Define all constants
4. Define component boundaries and responsibilities
5. Define the data flow

Only after I approve the architecture do you write implementation code.

---

## TECH STACK (NON-NEGOTIABLE)

- **Language:** TypeScript in strict mode — ALWAYS `.tsx` / `.ts`, never `.jsx` / `.js`
- **Framework:** React 18+ with functional components and hooks only
- **Styling:** Tailwind CSS — no inline styles, no styled-components unless explicitly asked
- **Build tool:** Vite
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint with `@typescript-eslint` + Prettier
- **Google Services:** Firebase (Auth / Firestore / Hosting) + Google Analytics 4

---

## TYPESCRIPT CONFIGURATION

Generate `tsconfig.json` with these strict settings and NEVER relax them:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

---

## MANDATORY FOLDER STRUCTURE

Every project MUST follow this exact structure:

```
src/
├── components/
│   ├── ui/              # Reusable primitives (Button, Input, Card, Modal)
│   └── features/        # Feature-specific components
├── hooks/               # Custom React hooks (useX naming)
├── services/            # API calls, Firebase, external integrations
├── store/               # State management (Zustand / Context)
├── types/               # All TypeScript interfaces and types
│   └── index.ts         # Single export point for all types
├── constants/
│   └── index.ts         # ALL magic strings/numbers/config values
├── utils/               # Pure utility functions
├── pages/               # Top-level route components
├── assets/              # Static assets
└── tests/               # Mirror of src/ structure for test files
    ├── components/
    ├── hooks/
    └── utils/
```

Additionally, at project root:
```
.github/
├── workflows/
│   └── ci.yml               # REQUIRED — CI pipeline (lint, type-check, test, coverage)
├── ISSUE_TEMPLATE/
│   ├── bug_report.md        # REQUIRED
│   └── feature_request.md   # REQUIRED
└── pull_request_template.md # REQUIRED
.eslintrc.cjs
.prettierrc
tsconfig.json
tsconfig.node.json
vite.config.ts
vitest.config.ts
firebase.json            # REQUIRED — with security headers (see Security section)
firestore.rules          # REQUIRED — least-privilege rules
.env.example             # REQUIRED — all vars listed, empty values
.gitignore               # REQUIRED — must include .env*
manifest.json            # REQUIRED — PWA manifest
public/sw.js             # REQUIRED — Service Worker for offline/PWA
README.md                # REQUIRED — written before any component
TESTING.md               # REQUIRED — test strategy documentation
CONTRIBUTING.md          # REQUIRED — branch conventions, PR checklist, setup guide
LICENSE                  # REQUIRED — MIT, 30 seconds to create
docs/
├── ARCHITECTURE.md      # REQUIRED — Mermaid system diagram + component table
└── API.md               # OPTIONAL but high-signal
SESSION_LOG.md           # REQUIRED — updated after every phase
```

---

## CODE QUALITY RULES (ENFORCED — NO EXCEPTIONS)

### 1. Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React components | PascalCase | `UserProfileCard.tsx` |
| Hooks | camelCase with `use` prefix | `useAuthState.ts` |
| Services | camelCase with `Service` suffix | `analyticsService.ts` |
| Types/Interfaces | PascalCase with `I` or descriptive name | `UserProfile`, `ApiResponse<T>` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRY_COUNT` |
| CSS classes | kebab-case (Tailwind utilities only) | — |
| Event handlers | camelCase with `handle` prefix | `handleSubmit`, `handleUserClick` |

### 2. Comments — Intent Over Obvious

**DO NOT write:** `// increment counter` above `count++`

**DO write:**
```typescript
// Retry limit prevents infinite loops on flaky network connections
const MAX_RETRIES = 3;

// Debounce prevents excessive API calls during rapid user input
const debouncedSearch = useDebounce(searchQuery, 300);
```

Every comment must explain **WHY**, not WHAT.

### 3. JSDoc — Required on These Elements

**Every file must start with a `@module` block — no exceptions:**

```typescript
/**
 * @module analyticsService
 * @description Centralized GA4 analytics service. All event logging goes through here
 * to ensure consistent naming, structured metadata, and easy future migration.
 * @version 1.0.0
 */
```

Write function-level JSDoc on:
- Every exported function in `utils/` and `services/`
- Every custom hook
- Every complex component (more than 3 props)
- Every TypeScript interface

```typescript
/**
 * Fetches paginated user activity from Firestore, ordered by timestamp descending.
 * Returns an empty array if the user has no recorded activity — never throws.
 *
 * @param userId - The authenticated user's UID from Firebase Auth
 * @param limit - Maximum number of records to fetch (default: 20)
 * @returns Promise resolving to an array of ActivityRecord objects
 */
export async function fetchUserActivity(
  userId: string,
  limit: number = 20
): Promise<ActivityRecord[]> { ... }
```

### 4. Error Handling — Everywhere, No Exceptions

```typescript
// ✅ REQUIRED pattern for every async operation
try {
  const result = await someAsyncOperation();
  return { data: result, error: null };
} catch (error) {
  // Log structured error with context, not just the message
  console.error('[fetchUserActivity] Failed to fetch activity:', {
    userId,
    error: error instanceof Error ? error.message : 'Unknown error',
  });
  return { data: null, error: 'Failed to load activity. Please try again.' };
}

// ✅ REQUIRED: React Error Boundaries wrapping every major section
// Create src/components/ui/ErrorBoundary.tsx and use it
```

### 5. Single Responsibility

- Each component renders ONE thing
- Each hook manages ONE piece of state/effect
- Each service file handles ONE external integration
- Each utility function does ONE transformation

If you feel the urge to add "and also" — split it.

### 6. Constants File — Zero Magic Values

```typescript
// src/constants/index.ts

/** Application-wide configuration */
export const APP_CONFIG = {
  name: 'AppName',
  version: '1.0.0',
  supportEmail: 'support@example.com',
} as const;

/** API and network settings */
export const NETWORK = {
  REQUEST_TIMEOUT_MS: 10_000,
  MAX_RETRIES: 3,
  DEBOUNCE_DELAY_MS: 300,
} as const;

/** UI and UX constants */
export const UI = {
  TOAST_DURATION_MS: 4_000,
  ANIMATION_DURATION_MS: 200,
  MAX_FILE_SIZE_MB: 5,
} as const;

/** Route paths */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;
```

---

## SECURITY RULES (NON-NEGOTIABLE)

### 0. HTTP Security Headers — BOTH `firebase.json` AND `vercel.json`

⚠️ **DEPLOYMENT SPLIT:** Frontend = Vercel. Backend = Firebase. `firebase.json` headers only activate on Firebase Hosting — they do NOTHING on Vercel. You need BOTH files.

The AI evaluator reads both. Missing either = lost Security AND Code Quality points.

```json
{
  "hosting": {
    "headers": [
      {
        "source": "/sw.js",
        "headers": [{ "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }]
      },
      {
        "source": "**",
        "headers": [
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "X-Frame-Options", "value": "DENY" },
          { "key": "X-XSS-Protection", "value": "1; mode=block" },
          { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
          { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(self)" },
          { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" },
          { "key": "Content-Security-Policy", "value": "default-src 'self' https: data: blob: 'unsafe-inline'; frame-ancestors 'none';" }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=3600" }]
      }
    ],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  },
  "firestore": { "rules": "firestore.rules" }
}
```

```typescript
// 1. ALL environment variables accessed via a typed config object
// src/config/env.ts
const requiredEnvVars = ['VITE_FIREBASE_API_KEY', 'VITE_GA_MEASUREMENT_ID'] as const;

export const ENV = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // ... rest of config
  },
  ga: {
    measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  },
} as const;

// Validate at startup — fail fast
requiredEnvVars.forEach((key) => {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});
```

```typescript
// 2. Input sanitization — ALWAYS sanitize before display or storage
import DOMPurify from 'dompurify';

// Never use dangerouslySetInnerHTML without sanitizing
const safeHtml = DOMPurify.sanitize(userProvidedContent);

// 3. Firebase Security Rules — always write them, never skip
// Include firestore.rules and storage.rules in the project root
```

```
// 4. .env.example file — list all required variables with empty values
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_GA_MEASUREMENT_ID=
```

---

## TESTING RULES — 5 SUITES REQUIRED

**Structure tests exactly like this — the evaluator sees the folder names:**

```
src/tests/
├── unit/           # Pure function logic
├── security/       # Key exposure, CSP, Firestore rules
├── integration/    # Project structure, HTML semantics, config files
├── accessibility/  # ARIA attributes, landmarks, focus management
└── edge-cases/     # API failures, empty states, malformed input
```

**Generate `TESTING.md` at project root documenting all suites.**

### Suite 1 — Unit Tests (`tests/unit/`)
```typescript
// Test every utility function — happy path + error states + edge cases
describe('formatDate', () => {
  it('formats ISO string to readable date', () => { ... });
  it('returns fallback for null input', () => { ... });
  it('handles invalid date string gracefully', () => { ... });
});
```

### Suite 2 — Security Tests (`tests/security/`)
```typescript
import fs from 'fs';
import path from 'path';

describe('API Key Security', () => {
  it('should not expose raw API keys in source files', () => {
    const files = ['src/config/env.ts', 'src/config/firebase.ts'];
    files.forEach(file => {
      const content = fs.readFileSync(path.resolve(file), 'utf8');
      expect(content).not.toMatch(/AIzaSy[A-Za-z0-9_-]{33}/);
    });
  });

  it('should have .env.example with all required variables', () => {
    const content = fs.readFileSync('.env.example', 'utf8');
    expect(content).toContain('VITE_FIREBASE_API_KEY=');
    expect(content).toContain('VITE_GA_MEASUREMENT_ID=');
  });

  it('should have firebase.json with security headers', () => {
    const config = JSON.parse(fs.readFileSync('firebase.json', 'utf8'));
    const headers = config.hosting.headers.find(h => h.source === '**').headers;
    const keys = headers.map(h => h.key);
    expect(keys).toContain('X-Frame-Options');
    expect(keys).toContain('Content-Security-Policy');
    expect(keys).toContain('Strict-Transport-Security');
  });
});
```

### Suite 3 — Integration Tests (`tests/integration/`)
```typescript
describe('Project Structure', () => {
  const requiredFiles = [
    'firebase.json', 'firestore.rules', '.env.example',
    'manifest.json', 'public/sw.js', 'README.md', 'TESTING.md',
    'src/constants/index.ts', 'src/types/index.ts',
    'src/config/firebase.ts', 'src/config/env.ts',
    'src/services/analyticsService.ts',
    'src/components/ui/ErrorBoundary.tsx',
  ];

  requiredFiles.forEach(file => {
    it(`should have ${file}`, () => {
      expect(fs.existsSync(file)).toBe(true);
    });
  });
});

describe('Firestore Rules', () => {
  it('should deny all access by default', () => {
    const rules = fs.readFileSync('firestore.rules', 'utf8');
    expect(rules).toContain('allow read, write: if false');
  });

  it('should require authentication for writes', () => {
    const rules = fs.readFileSync('firestore.rules', 'utf8');
    expect(rules).toContain('request.auth != null');
  });
});
```

### Suite 4 — Accessibility Tests (`tests/accessibility/`)
```typescript
describe('index.html Accessibility', () => {
  let html: string;
  beforeAll(() => { html = fs.readFileSync('index.html', 'utf8'); });

  it('should have lang attribute on html element', () => {
    expect(html).toMatch(/<html[^>]+lang=/);
  });

  it('should have skip-to-content link', () => {
    expect(html).toMatch(/Skip to main content/i);
  });

  it('should have nav with aria-label', () => {
    expect(html).toMatch(/<nav[^>]+aria-label/);
  });

  it('should have main element', () => {
    expect(html).toMatch(/<main[\s>]/);
  });
});
```

### Suite 5 — Edge Case Tests (`tests/edge-cases/`)
```typescript
describe('Error Handling Edge Cases', () => {
  it('handles null input to sanitize without throwing', () => {
    expect(() => sanitize(null as unknown as string)).not.toThrow();
    expect(sanitize(null as unknown as string)).toBe('');
  });

  it('handles empty array response from Firestore', () => {
    const result = formatActivityList([]);
    expect(result).toEqual([]);
  });

  it('handles network timeout gracefully', async () => {
    const result = await fetchWithTimeout('https://invalid.url', 100);
    expect(result.error).toBeTruthy();
    expect(result.data).toBeNull();
  });
});
```

**Minimum: 40+ tests total across all 5 suites.**

```typescript
// src/tests/utils/[utilName].test.ts — Unit tests for every utility
import { describe, it, expect } from 'vitest';
import { formatDate } from '@/utils/dateUtils';

describe('formatDate', () => {
  it('formats ISO string to readable date', () => {
    expect(formatDate('2024-01-15T00:00:00Z')).toBe('Jan 15, 2024');
  });

  it('returns "Invalid date" for malformed input', () => {
    expect(formatDate('not-a-date')).toBe('Invalid date');
  });

  it('handles null gracefully', () => {
    expect(formatDate(null)).toBe('—');
  });
});
```

```typescript
// src/tests/components/[ComponentName].test.tsx — Integration tests for key components
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/components/features/SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder text', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls onSearch with trimmed input on submit', async () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: '  query  ' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(mockSearch).toHaveBeenCalledWith('query');
  });

  it('shows error state when query is empty', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
```

Minimum test count per project: **8 tests** (3 utils + 3 components + 2 hooks)

---

## ACCESSIBILITY RULES (WCAG 2.1 AA — FULL COMPLIANCE)

```tsx
// ✅ EVERY interactive element must be keyboard accessible
// ✅ NEVER use div as a button
<button
  type="button"
  aria-label="Close notification"  // required on icon-only buttons
  onClick={handleClose}
>
  <XIcon aria-hidden="true" />  {/* decorative icons: aria-hidden */}
</button>

// ✅ Every form input must have an associated label
<label htmlFor="email-input" className="sr-only">Email address</label>
<input
  id="email-input"
  type="email"
  aria-describedby="email-error"
  aria-invalid={!!errors.email}
  aria-required="true"
/>
{errors.email && (
  <p id="email-error" role="alert" aria-live="polite">
    {errors.email}
  </p>
)}

// ✅ Every image must have meaningful alt text
<img src={user.avatar} alt={`Profile photo of ${user.name}`} />
// Decorative images:
<img src={decorativeBg} alt="" role="presentation" />

// ✅ Focus management for modals and dynamic content
// ✅ Skip navigation link at top of page
<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 ...">
  Skip to main content
</a>

// ✅ Color contrast: minimum 4.5:1 for normal text, 3:1 for large text
// ✅ Never rely on color alone to convey information
// ✅ Loading states must have aria-live="polite" announcements
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading ? <LoadingSpinner /> : <Content />}
</div>

// ✅ Navigation landmark: use <nav> with aria-label
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Breadcrumb">...</nav>

// ✅ Page must have one <h1>, logical heading hierarchy
// ✅ Semantic HTML over divs everywhere:
// header, main, nav, section, article, aside, footer
```

### Accessibility CSS — Required in `src/index.css`

```css
/* Respect user motion preference — WCAG 2.1 SC 2.3.3 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode — WCAG 2.1 SC 1.4.6 */
@media (prefers-contrast: high) {
  button, input, select, textarea { border: 2px solid currentColor; }
}

/* Screen-reader only — hide visually, keep in DOM for assistive tech */
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0;
  margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border-width: 0;
}
.sr-only:focus { /* Reveal on keyboard focus for skip links */
  position: fixed; width: auto; height: auto; clip: auto;
  white-space: normal; overflow: visible;
}

/* Keyboard focus ring — never remove outline without replacing it */
:focus-visible { outline: 2px solid var(--color-primary, #4F46E5); outline-offset: 2px; }
```

### PWA Requirements — `manifest.json` + Service Worker

**`manifest.json`** (project root):
```json
{
  "name": "[App Full Name]",
  "short_name": "[App Short Name]",
  "description": "[What the app does]",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4F46E5",
  "icons": [
    {
      "src": "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>🚀</text></svg>",
      "sizes": "192x192 512x512",
      "type": "image/svg+xml"
    }
  ]
}
```

**`public/sw.js`** — Service Worker (cache-first for static assets):
```javascript
/**
 * @module ServiceWorker
 * @description Cache-first service worker for offline capability and fast repeat loads.
 * Implements stale-while-revalidate strategy for optimal performance.
 * @version 1.0.0
 */

const CACHE_NAME = '[app-name]-v1';
const STATIC_ASSETS = ['/', '/index.html'];

self.addEventListener('install', (event) => {
  // Pre-cache critical assets so the app loads instantly on repeat visits
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  // Remove old caches to prevent stale content from serving
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached ?? fetch(event.request))
  );
});
```

**Register in `index.html`**:
```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
  }
</script>
```

---

