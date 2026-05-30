import type React from "react";
import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { CandidateRow } from "../components/candidates/CandidateRow";
import { Search } from "lucide-react";
import { CandidateDrawer } from "../components/candidates/CandidateDrawer";
import { Candidate } from "@/types";

import { useCandidates } from "@/hooks/useCandidates";

export default function Candidates(): React.JSX.Element {
  const { candidates, sortBy, filterByStage } = useCandidates();
  
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("Stage: All Stages");
  const [sortOption, setSortOption] = useState("Sort: Rank (High to Low)");

  // 1. Stage filter
  const rawStage = stageFilter.replace("Stage: ", "").replace("All Stages", "All");
  let filteredCandidates = filterByStage(rawStage);

  // 2. Search filter (Name, Role, or Skill)
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    filteredCandidates = filteredCandidates.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.current_role.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  // 3. Sort
  if (sortOption === "Sort: Rank (High to Low)") {
    filteredCandidates = sortBy(filteredCandidates, "overall_score", "desc");
  } else if (sortOption === "Sort: Rank (Low to High)") {
    filteredCandidates = sortBy(filteredCandidates, "overall_score", "asc");
  } else if (sortOption === "Sort: Name (A-Z)") {
    filteredCandidates = sortBy(filteredCandidates, "name", "asc");
  }

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
            <select 
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-surface-2 border border-border text-text-secondary text-sm rounded-lg px-3 py-2 outline-none cursor-pointer"
            >
              <option>Stage: All Stages</option>
              <option>Shortlisted</option>
              <option>Interview</option>
              <option>Screening</option>
              <option>Rejected</option>
            </select>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-surface-2 border border-border text-text-secondary text-sm rounded-lg px-3 py-2 outline-none cursor-pointer"
            >
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
            Showing {filteredCandidates.length} of {candidates.length}{" "}
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
