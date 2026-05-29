import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignalBar } from "../components/ui/SignalBar";

export default function Login(): React.JSX.Element {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#090a0d] flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-24">
        <div className="w-full max-w-md mx-auto animate-fade-up">
          <Link to="/" className="inline-flex items-center gap-2.5 text-parchment text-[15px] font-medium mb-12">
            <span className="w-2.5 h-2.5 rounded-full bg-parchment" />
            <span>TalentLens</span>
          </Link>
          
          <h1 className="text-3xl font-light text-text-primary tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-text-secondary mb-8">
            Log in to continue analyzing your candidate pipeline.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-mono tracking-wider text-text-secondary mb-2 uppercase">
                Work Email
              </label>
              <input
                id="email"
                type="email"
                required
                defaultValue="alex@talentlens.ai"
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-parchment-dim transition-colors"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-mono tracking-wider text-text-secondary uppercase">
                  Password
                </label>
                <a href="#" className="text-xs text-parchment-dim hover:text-parchment transition-colors">
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                defaultValue="password123"
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-parchment-dim transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-parchment text-ink py-2.5 rounded-lg text-sm font-medium transition-transform duration-200 hover:bg-[#cfc0b0] hover:-translate-y-px mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-text-secondary">
            Don't have an account? <Link to="/" className="text-parchment hover:underline">Contact Sales</Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Live Analysis Preview */}
      <div className="hidden lg:flex flex-1 bg-surface border-l border-border relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 hero-grid-mask opacity-30" />
        
        <div className="relative w-full max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-xl font-light text-parchment mb-2">AI Hiring Intelligence</h2>
            <p className="text-sm text-text-secondary">Identify top performers before the first interview.</p>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl bg-surface-2 border border-border border-t-[rgba(255,255,255,0.06)] shadow-[0_24px_64px_rgba(0,0,0,0.6)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent_18%)] before:pointer-events-none animate-panel-in opacity-0 scale-[0.97]" style={{ animationDelay: "200ms" }}>
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
                  className="grid grid-cols-[34px_28px_minmax(0,1fr)_auto] gap-3 items-center py-3 px-1.5 border-b border-[#252733]/75 last:border-b-0"
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
                    className={`font-mono min-w-[52px] h-7 px-2.5 rounded-full inline-flex items-center justify-center text-[11px] tracking-[0.08em] uppercase border border-current text-${c.color} ${c.bg}`}
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
                delayMs={400}
                className="mb-3.5"
              />
              <SignalBar
                label="Trajectory"
                value={81}
                colorVariant="sage"
                delayMs={480}
                className="mb-3.5"
              />
              <SignalBar
                label="Project Impact"
                value={67}
                colorVariant="sand"
                delayMs={560}
                className="mb-3.5"
              />
              <SignalBar
                label="Learning Velocity"
                value={55}
                colorVariant="rose"
                delayMs={640}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
