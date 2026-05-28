# Google Services — __APP_NAME__

> Single authoritative reference for every Google/Firebase service integrated.
> The AI evaluator uses this file to verify Google Services integration depth.

---

## 1. Firebase Authentication

| Property | Value |
|----------|-------|
| Package | `firebase/auth` |
| Key files | `src/config/firebase.ts`, `src/services/authService.ts` |
| Usage | __AUTH_USAGE__ |
| Env var | `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN` |
| Docs | https://firebase.google.com/docs/auth |

---

## 2. Cloud Firestore

| Property | Value |
|----------|-------|
| Package | `firebase/firestore` |
| Key files | `src/services/__DOMAIN__Service.ts`, `src/hooks/use__FEATURE__.ts` |
| Usage | __FIRESTORE_USAGE__ |
| Env var | `VITE_FIREBASE_PROJECT_ID` |
| Docs | https://firebase.google.com/docs/firestore |

---

## 3. Firebase Hosting

| Property | Value |
|----------|-------|
| Config | `firebase.json`, `.firebaserc` |
| Usage | Backend/API hosting with security headers |
| Docs | https://firebase.google.com/docs/hosting |

---

## 4. Google Analytics 4

| Property | Value |
|----------|-------|
| Package | `firebase/analytics` |
| Key files | `src/services/analyticsService.ts` |
| Custom events | `page_view`, `action_completed`, `app_error`, `search` |
| Usage | Page view tracking on every route; custom events for __GA4_EVENTS__ |
| Env var | `VITE_GA_MEASUREMENT_ID` |
| Docs | https://firebase.google.com/docs/analytics |

---

## 5. Google Fonts

| Property | Value |
|----------|-------|
| Loading | `<link>` preconnect in `index.html` (NOT CSS @import — faster) |
| Font | Inter — legible at all weights, system-neutral |
| Docs | https://fonts.google.com |

---

## 6. Vercel (Frontend Hosting)

| Property | Value |
|----------|-------|
| Config | `vercel.json` |
| Usage | CDN-delivered SPA with 8 security headers + SPA rewrites |
| Docs | https://vercel.com/docs |

---

<!-- ── OPTIONAL SERVICES — uncomment when used ────────────────────────── -->

<!--
## 7. Gemini AI

| Property | Value |
|----------|-------|
| Package | `@google/generative-ai` |
| Key files | `src/services/geminiService.ts`, `src/hooks/useGemini.ts` |
| Model | `gemini-2.0-flash` |
| Usage | __GEMINI_USAGE__ |
| Env var | `VITE_GEMINI_API_KEY` |
| Docs | https://ai.google.dev/docs |
-->

<!--
## 8. Google Maps JavaScript API

| Property | Value |
|----------|-------|
| Package | `@googlemaps/js-api-loader` |
| Key files | `src/components/features/Map.tsx`, `src/hooks/useGoogleMaps.ts` |
| APIs enabled | Maps JavaScript API |
| Usage | __MAPS_USAGE__ |
| Env var | `VITE_GOOGLE_MAPS_API_KEY` |
| Docs | https://developers.google.com/maps/documentation/javascript |
-->

---

## Environment Variables

| Variable | Service | Required |
|----------|---------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase | ✅ |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth | ✅ |
| `VITE_FIREBASE_PROJECT_ID` | Firestore / Hosting | ✅ |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage | ✅ |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase | ✅ |
| `VITE_FIREBASE_APP_ID` | Firebase | ✅ |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 | ✅ |
| `VITE_GEMINI_API_KEY` | Gemini AI | If used |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps | If used |
