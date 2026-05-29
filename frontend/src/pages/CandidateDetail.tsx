import type React from "react";
import { Link } from "react-router-dom";
import { TopNav } from "../components/layout/TopNav";
import { SignalBar } from "../components/ui/SignalBar";

export default function CandidateDetail(): React.JSX.Element {
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
                AR
              </div>
              <div>
                <h1 className="m-0 text-[18px] font-medium text-text-primary mb-1">
                  Aditya Rao
                </h1>
                <div className="text-[13px] text-text-secondary">
                  Senior ML Engineer · 5yr
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              <div className="font-mono text-[10px] bg-surface-3 border border-border px-2 py-[2px] rounded-full text-parchment-muted whitespace-nowrap">
                PyTorch
              </div>
              <div className="font-mono text-[10px] bg-surface-3 border border-border px-2 py-[2px] rounded-full text-parchment-muted whitespace-nowrap">
                MLOps
              </div>
              <div className="font-mono text-[10px] bg-surface-3 border border-border px-2 py-[2px] rounded-full text-parchment-muted whitespace-nowrap">
                Transformers
              </div>
              <div className="font-mono text-[10px] bg-surface-3 border border-border px-2 py-[2px] rounded-full text-parchment-muted whitespace-nowrap">
                Kubernetes
              </div>
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
              91
            </div>
            <div className="font-mono text-[9px] text-sage uppercase tracking-[0.1em] mb-2">
              OVERALL MATCH
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-light text-[64px] leading-none text-sage">
                91
              </span>
              <span className="font-mono text-[13px] text-[#5c7a56]">/100</span>
            </div>
            <p className="mt-3 text-[13px] text-[#8dba85] leading-[1.5] max-w-[280px]">
              Exceptionally strong candidate for this role. Top 2% of the
              applicant pool based on semantic history and velocity.
            </p>
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
            <div className="p-6">
              <ul className="list-none m-0 p-0 flex flex-col gap-4">
                <li className="flex gap-3 text-[14px] text-text-secondary leading-[1.6]">
                  <span className="text-parchment-dim mt-0.5">›</span>
                  <div>
                    <strong className="text-text-primary font-medium">
                      Strong PyTorch depth
                    </strong>{" "}
                    with production deployment experience. His GitHub shows
                    extensive use of custom DDP implementations and distributed
                    training setups.
                  </div>
                </li>
                <li className="flex gap-3 text-[14px] text-text-secondary leading-[1.6]">
                  <span className="text-parchment-dim mt-0.5">›</span>
                  <div>
                    <strong className="text-text-primary font-medium">
                      Career arc
                    </strong>{" "}
                    shows deliberate ML platform specialization, moving from
                    applied modeling to MLOps and infrastructure over the last 3
                    years.
                  </div>
                </li>
                <li className="flex gap-3 text-[14px] text-text-secondary leading-[1.6]">
                  <span className="text-parchment-dim mt-0.5">›</span>
                  <div>
                    <strong className="text-text-primary font-medium">
                      Potential gap:
                    </strong>{" "}
                    Less exposure to LLM serving architectures (vLLM, TGI)
                    compared to traditional CV/NLP model deployment.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="h-12 border-b border-border bg-surface-2 px-5 flex items-center font-mono text-[11px] text-text-muted tracking-[0.06em] uppercase">
              Signal Deep Dive
            </div>
            <div className="p-6 grid grid-cols-2 gap-x-12 gap-y-8 max-[980px]:grid-cols-1">
              <div>
                <SignalBar
                  label="Semantic Match"
                  value={94}
                  colorVariant="sage"
                />
                <p className="mt-3 text-[12px] text-text-muted leading-[1.5]">
                  High keyword and contextual alignment with JD requirements for
                  distributed training and Kubernetes.
                </p>
              </div>
              <div>
                <SignalBar
                  label="Career Trajectory"
                  value={88}
                  colorVariant="sage"
                  delayMs={100}
                />
                <p className="mt-3 text-[12px] text-text-muted leading-[1.5]">
                  Consistent promotions every ~1.8 years. Transitioned to senior
                  roles faster than industry average.
                </p>
              </div>
              <div>
                <SignalBar
                  label="Project Impact"
                  value={82}
                  colorVariant="sand"
                  delayMs={200}
                />
                <p className="mt-3 text-[12px] text-text-muted leading-[1.5]">
                  Led 3 major initiatives at current company. Business impact
                  quantified in 2/3 cases.
                </p>
              </div>
              <div>
                <SignalBar
                  label="Learning Velocity"
                  value={64}
                  colorVariant="rose"
                  delayMs={300}
                />
                <p className="mt-3 text-[12px] text-text-muted leading-[1.5]">
                  Recent tech stack evolution is slower. Has remained within the
                  same core ecosystem for 3+ years.
                </p>
              </div>
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
              <svg
                width="400"
                height="220"
                viewBox="0 0 400 220"
                className="overflow-visible"
              >
                <defs>
                  <style>
                    {`
                      @keyframes radar-grow {
                        from { transform: scale(0); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                      }
                      .radar-poly {
                        transform-origin: 200px 110px;
                        animation: radar-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                      }
                    `}
                  </style>
                </defs>
                {/* Background Grid */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => {
                  const r = 80 * scale;
                  const pts = [
                    `${200},${110 - r}`,
                    `${200 + r * 0.951},${110 - r * 0.309}`,
                    `${200 + r * 0.588},${110 + r * 0.809}`,
                    `${200 - r * 0.588},${110 + r * 0.809}`,
                    `${200 - r * 0.951},${110 - r * 0.309}`,
                  ].join(" ");
                  return (
                    <polygon
                      key={i}
                      points={pts}
                      fill="none"
                      stroke="var(--border-hi)"
                      strokeWidth="1"
                      opacity={0.3}
                    />
                  );
                })}
                {/* Axis Lines */}
                {[
                  [200, 30],
                  [276, 85],
                  [247, 175],
                  [153, 175],
                  [124, 85]
                ].map((pt, i) => (
                  <line
                    key={i}
                    x1="200"
                    y1="110"
                    x2={pt[0]}
                    y2={pt[1]}
                    stroke="var(--border-hi)"
                    strokeWidth="1"
                    opacity={0.5}
                  />
                ))}
                
                {/* Data Polygon */}
                <polygon
                  points="200,42 257,91 228,149 162,162 131,88"
                  fill="var(--sage)"
                  fillOpacity="0.3"
                  stroke="var(--sage)"
                  strokeWidth="2"
                  className="radar-poly"
                />
                <circle cx="200" cy="42" r="4" fill="var(--sage)" className="radar-poly" />
                <circle cx="257" cy="91" r="4" fill="var(--sage)" className="radar-poly" />
                <circle cx="228" cy="149" r="4" fill="var(--sage)" className="radar-poly" />
                <circle cx="162" cy="162" r="4" fill="var(--sage)" className="radar-poly" />
                <circle cx="131" cy="88" r="4" fill="var(--sage)" className="radar-poly" />

                {/* Labels */}
                <text x="200" y="20" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontFamily="monospace">PyTorch Depth</text>
                <text x="286" y="85" fill="var(--text-secondary)" fontSize="11" textAnchor="start" fontFamily="monospace">MLOps</text>
                <text x="257" y="195" fill="var(--text-secondary)" fontSize="11" textAnchor="middle" fontFamily="monospace">Systems</text>
                <text x="143" y="195" fill="var(--text-secondary)" fontSize="11" textAnchor="middle" fontFamily="monospace">NLP</text>
                <text x="114" y="85" fill="var(--text-secondary)" fontSize="11" textAnchor="end" fontFamily="monospace">Research</text>
              </svg>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
