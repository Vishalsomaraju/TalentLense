import type React from "react";
import { Link, useParams } from "react-router-dom";
import { TopNav } from "../components/layout/TopNav";
import { SignalBar } from "../components/ui/SignalBar";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { useAnalysis } from "@/context/AnalysisContext";
import { ChevronRight, AlertCircle } from "lucide-react";
import { Candidate } from "@/types";

const radarData = [
  { subject: "PyTorch", A: 95, fullMark: 100 },
  { subject: "MLOps", A: 85, fullMark: 100 },
  { subject: "Systems", A: 80, fullMark: 100 },
  { subject: "NLP", A: 70, fullMark: 100 },
  { subject: "Research", A: 60, fullMark: 100 },
];

const MOCK_CANDIDATE: Candidate = {
  id: "1",
  rank: 1,
  initials: "AR",
  name: "Aditya Rao",
  current_role: "Senior ML Engineer",
  experience_years: 5,
  overall_score: 91,
  confidence: 87,
  summary: "Strong PyTorch depth with production deployment experience. Exceptionally strong candidate for this role.",
  signals: [
    { label: "Semantic Match", value: 94, explanation: "High keyword and contextual alignment with JD requirements." },
    { label: "Career Trajectory", value: 88, explanation: "Consistent promotions every ~1.8 years." },
    { label: "Project Impact", value: 82, explanation: "Led 3 major initiatives at current company." },
    { label: "Learning Velocity", value: 64, explanation: "Recent tech stack evolution is slower." },
  ],
  skills: ["PyTorch", "MLOps", "Transformers", "Kubernetes"],
  stage: "Shortlisted",
  green_flags: [
    "Strong PyTorch depth with production deployment experience.",
    "Career arc shows deliberate ML platform specialization.",
  ],
  red_flags: [
    "Less exposure to LLM serving architectures compared to traditional CV/NLP.",
  ],
};

export default function CandidateDetail(): React.JSX.Element {
  const { id } = useParams();
  const { result } = useAnalysis();
  
  const candidate = result?.candidates.find((c) => c.id === id) || MOCK_CANDIDATE;

  return (
    <div className="min-h-screen bg-ink text-text-primary font-sans">
      <TopNav />

      <main className="mt-12 p-6 grid grid-cols-[360px_1fr] gap-6 items-start max-[980px]:grid-cols-1">
        {/* Left Panel */}
        <div className="flex flex-col gap-6">
          <Link
            to="/dashboard"
            className="text-[13px] text-text-secondary no-underline flex items-center gap-2 transition-colors duration-200 hover:text-text-primary"
          >
            <span className="text-lg leading-none">‹</span> Back to Pool
          </Link>

          <div className="bg-surface border border-border rounded-xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-surface-3 flex items-center justify-center font-mono text-lg text-parchment shrink-0">
                {candidate.initials}
              </div>
              <div>
                <h1 className="m-0 text-[18px] font-medium text-text-primary mb-1">
                  {candidate.name}
                </h1>
                <div className="text-[13px] text-text-secondary">
                  {candidate.current_role} · {candidate.experience_years}yr exp
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {candidate.skills.map((skill, idx) => (
                <div key={idx} className="font-mono text-[10px] bg-surface-3 border border-border px-2 py-[2px] rounded-full text-parchment-muted whitespace-nowrap">
                  {skill}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
              <div>
                <div className="text-[11px] text-text-muted mb-1">Location</div>
                <div className="text-[13px] text-text-secondary">
                  Bengaluru, IN
                </div>
              </div>
              <div>
                <div className="text-[11px] text-text-muted mb-1">Current</div>
                <div className="text-[13px] text-text-secondary">Flipkart</div>
              </div>
              <div>
                <div className="text-[11px] text-text-muted mb-1">
                  Education
                </div>
                <div className="text-[13px] text-text-secondary">
                  B.Tech CS, IIT Madras
                </div>
              </div>
              <div>
                <div className="text-[11px] text-text-muted mb-1">Links</div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/aditya-rao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-parchment transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/aditya-rao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-parchment transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#141814] border border-[#232c21] rounded-xl p-5 relative overflow-hidden">
            <div className="absolute right-[-20px] bottom-[-20px] text-sage opacity-5 font-mono text-[120px] font-bold leading-none select-none">
              {candidate.overall_score}
            </div>
            <div className="font-mono text-[9px] text-sage uppercase tracking-[0.1em] mb-2">
              OVERALL MATCH
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-light text-[64px] leading-none text-sage">
                {candidate.overall_score}
              </span>
              <span className="font-mono text-[13px] text-[#5c7a56]">/100</span>
            </div>
            <div className="font-mono text-[11px] text-text-muted mt-1 flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${candidate.confidence >= 80 ? 'bg-sage' : candidate.confidence >= 65 ? 'bg-sand' : 'bg-rose'}`} />
              {candidate.confidence}% confidence
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2">
            <button className="w-full h-10 rounded-lg bg-parchment text-ink font-medium text-[13px] border-none cursor-pointer transition-colors hover:bg-parchment-dim">
              Shortlist Candidate
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="h-10 rounded-lg bg-transparent text-text-secondary font-medium text-[13px] border border-border cursor-pointer transition-colors hover:border-border-hi hover:text-text-primary">
                Pass
              </button>
              <button className="h-10 rounded-lg bg-transparent text-text-secondary font-medium text-[13px] border border-border cursor-pointer transition-colors hover:border-border-hi hover:text-text-primary flex items-center justify-center gap-2">
                <span>✉</span> Email
              </button>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6">
          <section className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="h-12 border-b border-border bg-surface-2 px-5 flex items-center gap-2 font-mono text-[11px] text-parchment-muted tracking-[0.06em] uppercase">
              <span className="text-sage">✦</span> AI Reasoning
            </div>
            <div className="p-6 flex flex-col gap-6">
              <p className="text-[14px] text-text-secondary leading-[1.6] m-0">
                {candidate.summary}
              </p>

              {candidate.green_flags.length > 0 && (
                <div>
                  <div className="font-mono text-[11px] text-sage uppercase tracking-[0.06em] mb-3">Strengths</div>
                  <ul className="list-none m-0 p-0 flex flex-col gap-2">
                    {candidate.green_flags.map((flag, idx) => (
                      <li key={idx} className="flex gap-3 text-[13px] text-text-secondary leading-[1.6] p-3 rounded-lg" style={{ backgroundColor: 'rgba(141, 186, 133, 0.06)' }}>
                        <ChevronRight size={16} className="text-sage shrink-0 mt-0.5" />
                        <div>{flag}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {candidate.red_flags.length > 0 && (
                <div>
                  <div className="font-mono text-[11px] text-rose uppercase tracking-[0.06em] mb-3">Gaps</div>
                  <ul className="list-none m-0 p-0 flex flex-col gap-2">
                    {candidate.red_flags.map((flag, idx) => (
                      <li key={idx} className="flex gap-3 text-[13px] text-text-secondary leading-[1.6] p-3 rounded-lg" style={{ backgroundColor: 'rgba(235, 115, 115, 0.06)' }}>
                        <AlertCircle size={16} className="text-rose shrink-0 mt-0.5" />
                        <div>{flag}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <section className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="h-12 border-b border-border bg-surface-2 px-5 flex items-center font-mono text-[11px] text-text-muted tracking-[0.06em] uppercase">
              Signal Deep Dive
            </div>
            <div className="p-6 grid grid-cols-2 gap-x-12 gap-y-8 max-[980px]:grid-cols-1">
              {candidate.signals.map((s, idx) => (
                <div key={idx}>
                  <SignalBar
                    label={s.label}
                    value={s.value}
                    colorVariant={s.value >= 80 ? "sage" : s.value >= 65 ? "sand" : "rose"}
                    delayMs={idx * 100}
                  />
                  {s.explanation && (
                    <p className="mt-3 text-[11px] text-text-muted leading-[1.5] italic">
                      {s.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="h-12 border-b border-border bg-surface-2 px-5 flex items-center font-mono text-[11px] text-text-muted tracking-[0.06em] uppercase">
              Career Timeline
            </div>
            <div className="p-6 pl-8">
              <div className="relative border-l-2 border-border-hi pb-8 pl-6 last:pb-0">
                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-parchment ring-4 ring-surface" />
                <div className="font-mono text-[11px] text-text-muted mb-1">
                  2021 — Present
                </div>
                <div className="text-[14px] text-text-primary font-medium mb-1">
                  Senior ML Engineer{" "}
                  <span className="text-text-secondary font-normal">
                    @ Flipkart
                  </span>
                </div>
                <p className="text-[13px] text-text-secondary leading-[1.5] m-0">
                  Leading the recommendation system infrastructure team.
                  Migrated core training pipelines to a scalable
                  Kubernetes-based architecture reducing training time by 40%.
                </p>
              </div>
              <div className="relative border-l-2 border-border-hi pb-8 pl-6 last:pb-0">
                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-surface-3 border border-border-hi ring-4 ring-surface" />
                <div className="font-mono text-[11px] text-text-muted mb-1">
                  2019 — 2021
                </div>
                <div className="text-[14px] text-text-primary font-medium mb-1">
                  Data Scientist{" "}
                  <span className="text-text-secondary font-normal">
                    @ Swiggy
                  </span>
                </div>
                <p className="text-[13px] text-text-secondary leading-[1.5] m-0">
                  Developed ETA prediction models using XGBoost and deep
                  learning. Improved prediction accuracy by 12% during peak
                  hours.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="h-12 border-b border-border bg-surface-2 px-5 flex items-center font-mono text-[11px] text-text-muted tracking-[0.06em] uppercase">
              Skill Intelligence
            </div>
            <div className="p-8 flex items-center justify-center min-h-[240px]">
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="var(--border-hi)" opacity={0.3} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: "var(--text-secondary)", fontSize: 11, fontFamily: "monospace" }} 
                  />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="var(--sage)"
                    strokeWidth={2}
                    fill="var(--sage)"
                    fillOpacity={0.3}
                    isAnimationActive={true}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
