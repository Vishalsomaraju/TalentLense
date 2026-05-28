import type React from "react";
import { Link } from "react-router-dom";
import { SignalBar } from "../components/ui/SignalBar";

export default function Home(): React.JSX.Element {
  return (
    <>
      <header className="fixed inset-x-0 top-0 h-[52px] flex items-center justify-between px-6 bg-[#0a0b0e]/70 border-b border-border backdrop-blur-md z-10 max-[768px]:px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-parchment text-[15px] font-medium tracking-[-0.02em]"
          aria-label="TalentLens"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-parchment" />
          <span>TalentLens</span>
        </Link>
        <div className="inline-flex items-center gap-2.5 max-[768px]:gap-2">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full border border-border bg-[#141519]/30 min-h-[34px] px-3 text-xs text-text-secondary whitespace-nowrap transition-all duration-200 hover:border-parchment-dim hover:text-parchment max-[768px]:hidden"
          >
            Sign in
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-parchment text-ink min-h-[34px] px-3.5 text-xs font-medium whitespace-nowrap transition-transform duration-200 hover:-translate-y-px hover:bg-[#cfc0b0]"
          >
            Start free
          </Link>
        </div>
      </header>

      <main className="relative z-[1] min-h-screen pt-[104px] px-6 pb-12 max-[768px]:pt-[88px] max-[768px]:px-4 max-[768px]:pb-8">
        <div
          className="hero-grid-mask absolute inset-x-0 top-[52px] h-[min(82vh,880px)] pointer-events-none max-[768px]:h-[72vh] max-[768px]:bg-[length:48px_48px]"
          aria-hidden="true"
        />

        <section className="relative max-w-[1240px] mx-auto min-h-[calc(100vh-152px)] grid grid-cols-[minmax(0,1.55fr)_minmax(360px,1fr)] gap-10 items-center max-[980px]:grid-cols-1 max-[980px]:gap-7 max-[980px]:items-start max-[980px]:pt-9">
          {/* Hero Copy */}
          <div className="max-w-[720px] max-[980px]:max-w-full opacity-0 translate-y-5 animate-fade-up">
            <div className="font-mono inline-block text-text-muted text-[11px] tracking-[0.2em] uppercase mb-[26px]">
              AI Hiring Intelligence
            </div>
            <h1 className="m-0 text-[clamp(56px,6vw,64px)] max-[768px]:text-[clamp(42px,12vw,56px)] leading-[1.02] tracking-[-0.05em] font-light">
              <span className="block">Predict who</span>
              <span className="block text-parchment">will succeed.</span>
            </h1>
            <p className="mt-6 mb-0 max-w-[38ch] max-[768px]:max-w-[32ch] max-[768px]:text-[15px] text-text-secondary text-base leading-[1.68]">
              Rank candidates by future performance, not resume familiarity.
              TalentLens turns hiring data into explainable predictions your
              team can defend.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 max-[520px]:flex-col">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-full min-h-[48px] px-[18px] text-sm bg-parchment text-ink font-medium transition-transform duration-200 hover:-translate-y-px hover:bg-[#cfc0b0] max-[520px]:w-full"
              >
                Start live analysis
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-border-soft min-h-[48px] px-[18px] text-sm bg-transparent text-parchment-dim transition-all duration-200 hover:border-parchment-dim hover:text-parchment max-[520px]:w-full"
              >
                See ranked preview
              </Link>
            </div>
            <div
              className="mt-7 grid grid-cols-3 max-[768px]:grid-cols-1 gap-2.5 max-w-[760px]"
              aria-label="Trust signals"
            >
              <div className="font-mono flex items-center gap-2.5 min-h-[48px] px-3.5 border border-border rounded-full bg-[#0f1014]/70 text-text-secondary text-[11px] tracking-[0.06em] uppercase">
                <span className="text-parchment-dim text-xs">●</span>
                <span>24 signals analyzed</span>
              </div>
              <div className="font-mono flex items-center gap-2.5 min-h-[48px] px-3.5 border border-border rounded-full bg-[#0f1014]/70 text-text-secondary text-[11px] tracking-[0.06em] uppercase">
                <span className="text-parchment-dim text-xs">◆</span>
                <span>Explainable rankings</span>
              </div>
              <div className="font-mono flex items-center gap-2.5 min-h-[48px] px-3.5 border border-border rounded-full bg-[#0f1014]/70 text-text-secondary text-[11px] tracking-[0.06em] uppercase">
                <span className="text-parchment-dim text-xs">▲</span>
                <span>Zero keyword bias</span>
              </div>
            </div>
          </div>

          {/* Analysis Panel */}
          <aside className="opacity-0 scale-[0.97] animate-panel-in max-[980px]:max-w-[620px]">
            <div className="relative overflow-hidden rounded-2xl bg-surface-2 border border-border border-t-[rgba(255,255,255,0.06)] shadow-[0_24px_64px_rgba(0,0,0,0.6)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent_18%)] before:pointer-events-none">
              <div className="flex items-center justify-between gap-3 px-[18px] pt-4 pb-[14px] border-b border-border">
                <div className="font-mono text-text-muted text-[11px] tracking-[0.18em] uppercase">
                  Live Analysis
                </div>
                <div className="text-sage text-[11px] animate-blink">●</div>
              </div>

              <div className="p-2 pb-3 px-3">
                {[
                  {
                    rank: 1,
                    init: "AR",
                    name: "Aditya Rao",
                    role: "Senior ML Engineer",
                    score: 91,
                    color: "sage",
                    bg: "bg-[rgba(141,186,133,0.08)]",
                  },
                  {
                    rank: 2,
                    init: "PM",
                    name: "Priya Mehta",
                    role: "Data Scientist",
                    score: 78,
                    color: "sand",
                    bg: "bg-[rgba(184,154,110,0.08)]",
                  },
                  {
                    rank: 3,
                    init: "RI",
                    name: "Rohan Iyer",
                    role: "AI Researcher",
                    score: 61,
                    color: "rose",
                    bg: "bg-[rgba(184,138,138,0.08)]",
                  },
                ].map((c) => (
                  <div
                    key={c.rank}
                    className="grid grid-cols-[34px_28px_minmax(0,1fr)_auto] max-[520px]:grid-cols-[28px_28px_minmax(0,1fr)] gap-3 items-center py-3 px-1.5 border-b border-[#252733]/75 last:border-b-0"
                  >
                    <div className="font-mono text-parchment text-[28px] leading-none font-light">
                      {c.rank}
                    </div>
                    <div className="w-7 h-7 rounded-full grid place-items-center bg-surface-3 text-parchment text-[11px] tracking-[0.04em]">
                      {c.init}
                    </div>
                    <div>
                      <div className="text-text-primary text-[13px] leading-[1.3] font-normal">
                        {c.name}
                      </div>
                      <div className="mt-[3px] text-text-secondary text-[11px] leading-[1.45]">
                        {c.role}
                      </div>
                    </div>
                    <div
                      className={`font-mono min-w-[52px] h-7 px-2.5 rounded-full inline-flex items-center justify-center text-[11px] tracking-[0.08em] uppercase border border-current max-[520px]:col-start-2 max-[520px]:col-end-4 max-[520px]:justify-self-start max-[520px]:ml-10 text-${c.color} ${c.bg}`}
                    >
                      {c.score}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-[18px] py-2 pb-5 border-t border-border">
                <SignalBar
                  label="Semantic Match"
                  value={94}
                  colorVariant="sage"
                  delayMs={220}
                  className="mb-3.5"
                />
                <SignalBar
                  label="Trajectory"
                  value={81}
                  colorVariant="sage"
                  delayMs={300}
                  className="mb-3.5"
                />
                <SignalBar
                  label="Project Impact"
                  value={67}
                  colorVariant="sand"
                  delayMs={380}
                  className="mb-3.5"
                />
                <SignalBar
                  label="Learning Velocity"
                  value={55}
                  colorVariant="rose"
                  delayMs={460}
                />
              </div>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
