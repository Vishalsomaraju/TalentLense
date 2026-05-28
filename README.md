# __APP_NAME__

> __APP_DESCRIPTION__

## 🚀 Live Demo
[__DEPLOYED_URL__]

## 🎯 Problem Statement
__PROBLEM_SUMMARY__

## ✨ Features
- __FEATURE_1__
- __FEATURE_2__
- __FEATURE_3__

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript (strict) |
| Styling | Tailwind CSS |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| Analytics | Google Analytics 4 |
| AI | Gemini 2.0 Flash _(if used)_ |
| Maps | Google Maps JS API _(if used)_ |
| Hosting | Vercel (frontend) + Firebase (backend) |
| Testing | Vitest + React Testing Library + Playwright |
| Build | Vite |

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable primitives
│   └── features/     # Feature-specific components
├── config/           # Firebase + env validation
├── constants/        # All magic values
├── hooks/            # Custom React hooks
├── pages/            # Route-level components
├── services/         # External integrations
├── store/            # Global state
├── types/            # TypeScript interfaces
└── utils/            # Pure utility functions
```

## 🏃 Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
git clone __REPO_URL__
cd __APP_NAME__
npm install
cp .env.example .env.local
# Fill in your Firebase config in .env.local
npm run dev
```

### Running Tests

```bash
npm test                  # All unit tests
npm run test:coverage     # With 70% coverage gate
npm run test:e2e          # Playwright smoke tests
npm run lint              # ESLint + jsx-a11y
npx tsc --noEmit          # Type check
```

### Building for Production

```bash
npm run build
npm run preview
```

## 🔒 Environment Variables

See `.env.example` for all required variables.

## ♿ Accessibility

WCAG 2.1 AA compliant. Full keyboard navigation supported.
`prefers-reduced-motion` and `prefers-contrast` media queries applied globally.

## 📊 Google Services

See [`GOOGLE_SERVICES.md`](./GOOGLE_SERVICES.md) for full integration details.

## 🧪 Testing

See [`TESTING.md`](./TESTING.md) for test strategy across all 5 suites.

## 📐 Architecture

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) for system diagram and design decisions.

## 📄 License

MIT © 2026 Vishal Somaraju
