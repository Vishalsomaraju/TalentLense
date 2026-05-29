/**
 * @module constants
 * @description All application constants — zero magic strings or numbers in components.
 * Import from '@/constants' everywhere. Add new constants here first.
 * @version 1.0.0
 */

// ── App config ────────────────────────────────────────────────────────────────
export const APP_CONFIG = {
  name: "TalentLens",
  version: "1.0.0",
  supportEmail: "support@talentlens.ai",
} as const;

// ── Routes ────────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  JOBS: "/jobs",
  CANDIDATES: "/candidates",
  CANDIDATE_DETAIL: "/candidate/:id",
  ANALYSIS_NEW: "/analysis/new",
  ANALYSIS_PROCESSING: "/analysis/processing",
  REPORTS: "/reports",
  SETTINGS: "/settings",
  PROFILE: "/profile",
} as const;

// ── Network ───────────────────────────────────────────────────────────────────
export const NETWORK = {
  REQUEST_TIMEOUT_MS: 10_000,
  MAX_RETRIES: 3,
  DEBOUNCE_DELAY_MS: 300,
} as const;

// ── UI ────────────────────────────────────────────────────────────────────────
export const UI = {
  TOAST_DURATION_MS: 4_000,
  ANIMATION_DURATION_MS: 200,
  MAX_FILE_SIZE_MB: 5,
  ITEMS_PER_PAGE: 20,
} as const;

// ── TODO: Add feature-specific constants below ────────────────────────────────
