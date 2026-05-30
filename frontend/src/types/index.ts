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

export interface SignalScore {
  label: string;
  value: number;
  explanation: string;
}

export interface Candidate {
  id: string;
  rank: number;
  name: string;
  initials: string;
  current_role: string;
  experience_years: number;
  overall_score: number;
  confidence: number;
  signals: SignalScore[];
  summary: string;
  green_flags: string[];
  red_flags: string[];
  skills: string[];
  stage: 'Screening' | 'Interview' | 'Shortlisted' | 'Rejected';
}

export interface RankingResponse {
  job_title: string;
  total_analyzed: number;
  processing_time_ms: number;
  candidates: Candidate[];
  model_version: string;
}

export interface Job {
  slug: string;
  title: string;
  candidates: number;
  avgScore: number;
  dateCreated: string;
  status: 'Active' | 'Closed';
}

export interface AnalysisWeights {
  semantic: number;
  trajectory: number;
  impact: number;
  velocity: number;
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

export function deriveInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function normalizeCandidate(raw: Omit<Candidate, 'initials' | 'stage'>): Candidate {
  return {
    ...raw,
    initials: deriveInitials(raw.name),
    stage: 'Screening',
  };
}
