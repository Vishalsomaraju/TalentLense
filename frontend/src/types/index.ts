/**
 * @module types
 * @description Shared TypeScript interfaces and types for the entire application.
 * ALL types and interfaces are defined here — never inline in component files.
 * Import from '@/types' everywhere.
 * @version 1.0.0
 */

// ── API Response Wrapper ──────────────────────────────────────────────────────
// Every async service function returns this shape — never throws to the UI.
// This forces consistent error handling everywhere.
export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };

// ── User ──────────────────────────────────────────────────────────────────────
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: number;
}

// ── TODO: Add feature-specific interfaces below ───────────────────────────────
//
// Example:
// export interface Item {
//   id: string;
//   title: string;
//   userId: string;
//   createdAt: number;
//   updatedAt: number;
// }
