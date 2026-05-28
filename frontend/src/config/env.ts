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
  const metaEnv = import.meta.env as unknown as Record<string, string | undefined>;
  if (!metaEnv[key]) {
    throw new Error(
      `[env] Missing required variable: ${key}\n` +
      `Copy .env.example to .env.local and fill in the values.`
    );
  }
});

const env = import.meta.env as Record<string, string | undefined>;

export const ENV = {
  firebase: {
    apiKey:            env.VITE_FIREBASE_API_KEY as string,
    authDomain:        env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId:         env.VITE_FIREBASE_PROJECT_ID as string,
    storageBucket:     env.VITE_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
    appId:             env.VITE_FIREBASE_APP_ID as string,
    measurementId:     env.VITE_GA_MEASUREMENT_ID as string,
  },
  gemini: {
    apiKey: env.VITE_GEMINI_API_KEY,
  },
  maps: {
    apiKey: env.VITE_GOOGLE_MAPS_API_KEY,
  },
} as const;
