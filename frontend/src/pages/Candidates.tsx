import type React from "react";
import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { CandidateRow } from "../components/candidates/CandidateRow";
import { Search } from "lucide-react";
import { CandidateDrawer } from "../components/candidates/CandidateDrawer";
import { Candidate } from "@/types";

// Reusing MOCK_CANDIDATES for demonstration, optionally expanding it
const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "1",
    rank: 1,
    initials: "AR",
    name: "Aditya Rao",
    current_role: "Senior ML Engineer · 5yr",
    experience_years: 5,
    overall_score: 91,
    confidence: 87,
    summary: "Strong PyTorch depth with production deployment experience.",
    signals: [
      { label: "Semantic", value: 94, explanation: "High keyword overlap with JD." },
      { label: "Trajectory", value: 88, explanation: "Consistent promotions to Senior." },
      { label: "Impact", value: 82, explanation: "Led major model rewrites." },
      { label: "Velocity", value: 64, explanation: "Steady learning pace." },
    ],
    skills: ["PyTorch", "MLOps"],
    stage: "Shortlisted",
    green_flags: [
      "Strong PyTorch depth with production deployment experience.",
      "Career arc shows deliberate ML platform specialization.",
    ],
    red_flags: [],
  },
  {
    id: "2",
    rank: 2,
    initials: "SK",
    name: "Sanya Kapoor",
    current_role: "ML Ops Engineer · 4yr",
    experience_years: 4,
    overall_score: 84,
    confidence: 82,
    summary: "Solid infrastructure background.",
    signals: [
      { label: "Semantic", value: 87, explanation: "Matches DevOps needs." },
      { label: "Trajectory", value: 80, explanation: "Good recent growth." },
      { label: "Impact", value: 76, explanation: "Built deployment pipelines." },
      { label: "Velocity", value: 70, explanation: "Learning k8s quickly." },
    ],
    skills: ["Kubernetes", "Terraform"],
    stage: "Interview",
    green_flags: ["Kubernetes mastery aligned with infra needs."],
    red_flags: [],
  },
  {
    id: "3",
    rank: 3,
    initials: "PM",
    name: "Priya Mehta",
    current_role: "Data Scientist · 3yr",
    experience_years: 3,
    overall_score: 78,
    confidence: 75,
    summary: "Good analytics, needs more engineering.",
    signals: [
      { label: "Semantic", value: 81, explanation: "Matches data needs." },
      { label: "Trajectory", value: 72, explanation: "Standard progression." },
      { label: "Impact", value: 74, explanation: "Delivered analytics dashboards." },
      { label: "Velocity", value: 58, explanation: "Learning curve on DL." },
    ],
    skills: ["TensorFlow", "SQL"],
    stage: "Screening",
    green_flags: [
      "Solid analytical foundation but lighter on deep learning frameworks.",
    ],
    red_flags: [],
  },
  {
    id: "4",
    rank: 4,
    initials: "DN",
    name: "Dev Nair",
    current_role: "Backend Engineer · 6yr",
    experience_years: 6,
    overall_score: 72,
    confidence: 90,
    summary: "Backend expert, lacks ML.",
    signals: [
      { label: "Semantic", value: 75, explanation: "Partial match." },
      { label: "Trajectory", value: 68, explanation: "Stable backend role." },
      { label: "Impact", value: 70, explanation: "Built reliable APIs." },
      { label: "Velocity", value: 55, explanation: "No recent ML learning." },
    ],
    skills: ["Go", "Postgres"],
    stage: "Screening",
    green_flags: ["Strong backend engineering fundamentals."],
    red_flags: [],
  },
  {
    id: "5",
    rank: 5,
    initials: "RV",
    name: "Rahul Varma",
    current_role: "AI Engineer · 2yr",
    experience_years: 2,
    overall_score: 68,
    confidence: 65,
    summary: "Junior with high potential.",
    signals: [
      { label: "Semantic", value: 70, explanation: "Keywords missing." },
      { label: "Trajectory", value: 82, explanation: "Fast early growth." },
      { label: "Impact", value: 60, explanation: "Small projects only." },
      { label: "Velocity", value: 85, explanation: "Very fast learner." },
    ],
    skills: ["Python", "OpenAI API"],
    stage: "Rejected",
    green_flags: ["High learning velocity but lacks production experience."],
    red_flags: [],
  },
];

export default function Candidates(): React.JSX.Element {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCandidates: Candidate[] = MOCK_CANDIDATES.filter(
    (c: Candidate) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.current_role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-light text-parchment m-0">Candidates</h1>
          <p className="text-sm text-text-secondary mt-1 m-0">
            Manage and review all analyzed profiles across your active roles.
          </p>
        </div>
        <button className="bg-sage text-ink font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          + Add Candidates
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex justify-between items-center gap-4 flex-wrap">
          <div className="flex gap-2 flex-1 min-w-[280px]">
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); }}
              className="flex-1 bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-border-hi transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <select className="bg-surface-2 border border-border text-text-secondary text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
              <option>Role: All Roles</option>
              <option>Senior ML Engineer</option>
              <option>Data Scientist</option>
            </select>
            <select className="bg-surface-2 border border-border text-text-secondary text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
              <option>Stage: All Stages</option>
              <option>Shortlisted</option>
              <option>Interview</option>
              <option>Screening</option>
              <option>Rejected</option>
            </select>
            <select className="bg-surface-2 border border-border text-text-secondary text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
              <option>Sort: Rank (High to Low)</option>
              <option>Sort: Rank (Low to High)</option>
              <option>Sort: Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Table Header */}
        <div className="h-10 bg-surface-2 border-b border-border flex items-center px-4 gap-3">
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.12em] w-7 text-right">
            #
          </div>
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.12em] flex-1">
            Candidate
          </div>
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.12em] w-[68px] text-right">
            Score
          </div>
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.12em] w-[120px]">
            Signals
          </div>
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.12em] w-[140px]">
            Skills
          </div>
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.12em] w-[80px]">
            Stage
          </div>
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.12em] w-8 text-center">
            ···
          </div>
        </div>

        {/* Candidate List */}
        <div className="min-h-[400px]">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((c) => (
              <CandidateRow
                key={c.id}
                {...c}
                onClick={() => { setSelectedCandidate(c); }}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-text-secondary">
              <Search size={32} className="mb-3 opacity-20 text-text-primary" />
              <p>No candidates found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="h-12 bg-surface border-t border-border px-4 flex justify-between items-center rounded-b-xl">
          <div className="font-mono text-[11px] text-text-muted">
            Showing {filteredCandidates.length} of {MOCK_CANDIDATES.length}{" "}
            total candidates
          </div>
          <div className="flex gap-2">
            <button
              className="bg-surface-2 border border-border rounded-md text-text-secondary font-sans text-xs px-3 py-1.5 hover:text-text-primary transition-colors disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="bg-surface-2 border border-border rounded-md text-text-secondary font-sans text-xs px-3 py-1.5 hover:text-text-primary transition-colors disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <CandidateDrawer
        isOpen={selectedCandidate !== null}
        onClose={() => { setSelectedCandidate(null); }}
        candidate={selectedCandidate}
      />
    </DashboardLayout>
  );
}
