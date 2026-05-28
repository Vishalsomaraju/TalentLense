/**
 * @module config/env
 * @description Typed, validated environment variable access.
 * Fails fast at startup if any required variable is missing — surfaces
 * misconfiguration immediately rather than silently failing at runtime.
 * All VITE_ vars are accessed here only. Never use import.meta.env directly.
 * @version 1.0.0
 */

const REQUIRED_VARS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_GA_MEASUREMENT_ID',
] as const;

// Validate at module load — app won't start with missing config
REQUIRED_VARS.forEach((key) => {
  if (!import.meta.env[key]) {
    throw new Error(
      `[env] Missing required variable: ${key}\n` +
      `Copy .env.example to .env.local and fill in the values.`
    );
  }
});

export const ENV = {
  firebase: {
    apiKey:            import.meta.env.VITE_FIREBASE_API_KEY as string,
    authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
    storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
    appId:             import.meta.env.VITE_FIREBASE_APP_ID as string,
    measurementId:     import.meta.env.VITE_GA_MEASUREMENT_ID as string,
  },
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY as string | undefined,
  },
  maps: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined,
  },
} as const;
