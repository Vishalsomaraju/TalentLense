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

export interface CandidateSignal {
  label: string;
  value: number;
}

export interface Candidate {
  id: string;
  rank: number;
  name: string;
  initials: string;
  role: string;
  score: number;
  signals: CandidateSignal[];
  reasoning: string[];
  skills: string[];
  stage: "Screening" | "Interview" | "Shortlisted" | "Rejected";
}

export interface Job {
  slug: string;
  title: string;
  candidates: number;
  avgScore: number;
  dateCreated: string;
  status: "Active" | "Closed";
}

export interface AnalysisRun {
  id: string;
  jobSlug: string;
  jobTitle: string;
  candidateCount: number;
  avgScore: number;
  topScore: number;
  createdAt: string;
  processingTimeMs: number;
}
