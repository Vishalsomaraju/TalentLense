import type React from "react";
import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { CandidateRow } from "../components/candidates/CandidateRow";
import { CandidateDrawer } from "../components/candidates/CandidateDrawer";
import { Candidate, RankingResponse } from "@/types";
import { useAnalysis } from "@/context/AnalysisContext";

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
      "GitHub signal: 12 repos, 4 with >50 stars.",
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
    green_flags: [
      "Kubernetes mastery aligned with infra needs.",
      "Consistent delivery on scalable architectures.",
    ],
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
      "Good trajectory in data pipeline optimization.",
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
    green_flags: [
      "Strong backend engineering fundamentals.",
    ],
    red_flags: [
      "Limited direct ML experience, requires onboarding.",
    ],
  },
];

const MOCK_DATA: RankingResponse = {
  job_title: "Senior ML Engineer",
  total_analyzed: 24,
  processing_time_ms: 3200,
  candidates: MOCK_CANDIDATES,
  model_version: "v2.4.1",
};

import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { List, Grid } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const sparkAnalyzed = [
  { val: 14 },
  { val: 16 },
  { val: 18 },
  { val: 17 },
  { val: 20 },
  { val: 22 },
  { val: 24 },
];
const sparkScore = [
  { val: 72 },
  { val: 74 },
  { val: 71 },
  { val: 75 },
  { val: 76 },
  { val: 74 },
  { val: 76.8 },
];
const sparkMatch = [
  { val: 88 },
  { val: 85 },
  { val: 89 },
  { val: 90 },
  { val: 88 },
  { val: 91 },
  { val: 91 },
];
const sparkShortlisted = [
  { val: 4 },
  { val: 5 },
  { val: 4 },
  { val: 6 },
  { val: 5 },
  { val: 6 },
  { val: 6 },
];

export default function Dashboard(): React.JSX.Element {
  const { result } = useAnalysis();
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );

  const [searchParams] = useSearchParams();
  const displayData = result ?? MOCK_DATA;
  const candidates = displayData.candidates;
  
  const jobTitle = result
    ? displayData.job_title
    : searchParams.get("job")
      ? searchParams.get("job")!
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "Senior ML Engineer";

  const avgScore = (candidates.reduce((sum, c) => sum + c.overall_score, 0) / candidates.length).toFixed(1);
  const topCandidate = candidates.length > 0 ? candidates.reduce((prev, curr) => (prev.overall_score > curr.overall_score) ? prev : curr) : null;

  return (
    <DashboardLayout>
      <div className="mb-4 text-[13px] text-text-secondary font-medium tracking-wide flex items-center justify-between">
        <div>
          {jobTitle} <span className="text-border-hi mx-1.5">•</span> May 28, 2025{" "}
          <span className="text-border-hi mx-1.5">•</span> {displayData.total_analyzed} candidates analyzed.
        </div>
        {result && (
          <div className="font-mono text-text-muted text-[10px] bg-surface-2 px-2 py-1 rounded border border-border">
            Live Result · {displayData.processing_time_ms}ms
          </div>
        )}
      </div>
      <div className="border border-border rounded-xl overflow-hidden grid grid-cols-4 mb-5 max-[900px]:grid-cols-2">
        <div className="p-4 px-5 bg-surface border-r border-border max-[900px]:border-b max-[900px]:border-r flex flex-col">
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.15em]">
            ANALYZED
          </div>
          <div className="font-mono font-light text-[28px] text-parchment my-1 leading-[1.1]">
            {displayData.total_analyzed}
          </div>
          <div className="font-mono text-[10px] text-sage mb-2">
            ↑ 8 from last week
          </div>
          <div className="h-[40px] w-full mt-auto -ml-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkAnalyzed}>
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke="var(--sage)"
                  fill="var(--sage)"
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="p-4 px-5 bg-surface border-r border-border max-[900px]:border-b max-[900px]:border-r-0 flex flex-col">
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.15em]">
            AVG SCORE
          </div>
          <div className="font-mono font-light text-[28px] text-parchment my-1 leading-[1.1]">
            {avgScore}
          </div>
          <div className="font-mono text-[10px] text-sage mb-2">
            ↑ 2.4% this run
          </div>
          <div className="h-[40px] w-full mt-auto -ml-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkScore}>
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke="var(--sage)"
                  fill="var(--sage)"
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="p-4 px-5 bg-surface border-r border-border max-[900px]:border-b-0 max-[900px]:border-r flex flex-col">
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.15em]">
            TOP MATCH
          </div>
          <div className="font-mono font-light text-[28px] text-parchment my-1 leading-[1.1]">
            {topCandidate ? topCandidate.overall_score : 0}%
          </div>
          <div className="font-mono text-[10px] text-text-muted mb-2">
            → {topCandidate ? topCandidate.name : "N/A"}
          </div>
          <div className="h-[40px] w-full mt-auto -ml-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkMatch}>
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke="var(--parchment-muted)"
                  fill="var(--parchment-muted)"
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="p-4 px-5 bg-surface flex flex-col">
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.15em]">
            SHORTLISTED
          </div>
          <div className="font-mono font-light text-[28px] text-parchment my-1 leading-[1.1]">
            6
          </div>
          <div className="font-mono text-[10px] text-rose mb-2">↓ 2 passed</div>
          <div className="h-[40px] w-full mt-auto -ml-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkShortlisted}>
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke="var(--rose)"
                  fill="var(--rose)"
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-5 max-[900px]:grid-cols-1">
        <section>
          <div className="flex justify-between items-center mb-3.5">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-text-primary">
                Candidates
              </span>
              <span className="text-sm text-text-muted">({candidates.length})</span>
            </div>
            <div className="flex items-center gap-3">
              <select className="font-sans text-xs bg-surface-2 border border-border text-text-secondary rounded-md px-2.5 py-1.5 outline-none cursor-pointer">
                <option>Score: High → Low</option>
                <option>Score: Low → High</option>
                <option>Name A–Z</option>
                <option>Experience</option>
              </select>
              <div className="flex gap-1">
                <button className="w-7 h-7 rounded-md border-none bg-border-hi text-text-primary cursor-pointer flex items-center justify-center">
                  <List size={14} />
                </button>
                <button className="w-7 h-7 rounded-md border-none bg-transparent text-text-secondary cursor-pointer flex items-center justify-center hover:bg-surface-3 transition-colors">
                  <Grid size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-3.5">
            <button className="font-mono text-[11px] text-text-secondary px-3 py-1 bg-surface-2 border border-border rounded-full cursor-pointer transition-colors duration-120 flex items-center gap-1 hover:border-border-hi">
              All Stages ▾
            </button>
            <button className="font-mono text-[11px] text-text-secondary px-3 py-1 bg-surface-2 border border-border rounded-full cursor-pointer transition-colors duration-120 flex items-center gap-1 hover:border-border-hi">
              Any Experience ▾
            </button>
            <button className="font-mono text-[11px] text-text-secondary px-3 py-1 bg-surface-2 border border-border rounded-full cursor-pointer transition-colors duration-120 flex items-center gap-1 hover:border-border-hi">
              Min Score: 0 ▾
            </button>
            <button className="font-mono text-[11px] text-parchment-dim px-3 py-1 bg-surface-3 border border-parchment-muted rounded-full cursor-pointer transition-colors duration-120 flex items-center gap-1">
              Skills: Any ▾
            </button>
          </div>

          <div className="border border-border rounded-xl overflow-hidden bg-surface">
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

            {candidates.map((c) => (
              <CandidateRow
                key={c.id}
                {...c}
                onClick={() => {
                  setSelectedCandidate(c);
                }}
              />
            ))}

            <div className="h-10 bg-surface-2 border-t border-border px-4 flex justify-between items-center">
              <div className="font-mono text-[11px] text-text-muted">
                Showing 1–{candidates.length} of {displayData.total_analyzed}
              </div>
              <div className="flex gap-2">
                <button className="bg-transparent border border-border rounded-md text-text-secondary font-sans text-[11px] px-3 py-1 cursor-pointer transition-colors duration-120 hover:border-border-hi hover:text-text-primary">
                  ‹ Prev
                </button>
                <button className="bg-transparent border border-border rounded-md text-text-secondary font-sans text-[11px] px-3 py-1 cursor-pointer transition-colors duration-120 hover:border-border-hi hover:text-text-primary">
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside className="right-column">
          <div className="bg-surface border border-border rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[9px] text-text-muted uppercase">
                RUN SUMMARY
              </span>
              <span className="font-mono text-[9px] text-text-muted">
                May 28, 2025, 14:32
              </span>
            </div>
            <div className="h-px bg-border mb-2" />
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-[11px] text-text-secondary">Job role</span>
              <span className="font-mono text-[11px] text-parchment-muted text-right">
                Senior ML Engineer
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-[11px] text-text-secondary">
                Resumes analyzed
              </span>
              <span className="font-mono text-[11px] text-parchment-muted text-right">
                {displayData.total_analyzed}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-[11px] text-text-secondary">
                Signals computed
              </span>
              <span className="font-mono text-[11px] text-parchment-muted text-right">
                {displayData.total_analyzed * 4}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-[11px] text-text-secondary">
                Model version
              </span>
              <span className="font-mono text-[11px] text-parchment-muted text-right">
                {displayData.model_version}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-[11px] text-text-secondary">
                Processing time
              </span>
              <span className="font-mono text-[11px] text-parchment-muted text-right">
                {(displayData.processing_time_ms / 1000).toFixed(1)}s
              </span>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[9px] text-text-muted uppercase">
                SCORE DISTRIBUTION
              </span>
            </div>
            <div className="h-px bg-border mb-2" />
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] text-text-muted w-9">
                90-100
              </span>
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-sage w-[10%]" />
              </div>
              <span className="font-mono text-[10px] text-parchment-muted w-3 text-right">
                1
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] text-text-muted w-9">
                80-89
              </span>
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-sage w-[30%]" />
              </div>
              <span className="font-mono text-[10px] text-parchment-muted w-3 text-right">
                3
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] text-text-muted w-9">
                70-79
              </span>
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-sand w-[80%]" />
              </div>
              <span className="font-mono text-[10px] text-parchment-muted w-3 text-right">
                8
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] text-text-muted w-9">
                60-69
              </span>
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-sand w-[70%]" />
              </div>
              <span className="font-mono text-[10px] text-parchment-muted w-3 text-right">
                7
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-text-muted w-9">
                &lt;60
              </span>
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-rose w-[50%]" />
              </div>
              <span className="font-mono text-[10px] text-parchment-muted w-3 text-right">
                5
              </span>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[9px] text-text-muted uppercase">
                SIGNAL GAPS <span className="normal-case">(across pool)</span>
              </span>
            </div>
            <div className="h-px bg-border mb-2" />

            <div className="mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[11px] text-text-primary">
                  Learning Velocity
                </span>
                <span className="font-mono text-[11px] text-rose">
                  avg 54 ↓ low
                </span>
              </div>
              <div className="h-1 bg-surface-2 rounded-full relative overflow-hidden">
                <div className="h-full rounded-full bg-rose w-[54%]" />
                <div className="absolute right-[20%] top-0 bottom-0 w-[2px] bg-text-muted z-[2]" />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[11px] text-text-primary">
                  Project Impact
                </span>
                <span className="font-mono text-[11px] text-sand">
                  avg 68 ↓ below target
                </span>
              </div>
              <div className="h-1 bg-surface-2 rounded-full relative overflow-hidden">
                <div className="h-full rounded-full bg-sand w-[68%]" />
                <div className="absolute right-[20%] top-0 bottom-0 w-[2px] bg-text-muted z-[2]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[11px] text-text-primary">
                  Career Trajectory
                </span>
                <span className="font-mono text-[11px] text-parchment-muted">
                  avg 72 → near target
                </span>
              </div>
              <div className="h-1 bg-surface-2 rounded-full relative overflow-hidden">
                <div className="h-full rounded-full bg-parchment-muted w-[72%]" />
                <div className="absolute right-[20%] top-0 bottom-0 w-[2px] bg-text-muted z-[2]" />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <CandidateDrawer
        isOpen={selectedCandidate !== null}
        onClose={() => {
          setSelectedCandidate(null);
        }}
        candidate={selectedCandidate}
      />
    </DashboardLayout>
  );
}
