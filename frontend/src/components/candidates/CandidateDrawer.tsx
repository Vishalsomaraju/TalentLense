import type React from "react";
import { useEffect } from "react";
import { CandidateSignal } from "./CandidateRow";

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

interface CandidateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
}

export function CandidateDrawer({
  isOpen,
  onClose,
  candidate,
}: CandidateDrawerProps): React.JSX.Element {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return (): void => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!candidate) {
    return (
      <div
        className={`fixed top-12 right-0 w-[360px] h-[calc(100vh-48px)] bg-surface border-l border-border transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-[1000] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col max-[900px]:top-auto max-[900px]:bottom-0 max-[900px]:w-full max-[900px]:h-[85vh] max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:rounded-t-2xl ${
          isOpen
            ? "translate-x-0 max-[900px]:translate-y-0"
            : "translate-x-full max-[900px]:translate-y-full"
        }`}
      />
    );
  }

  const scoreColor =
    candidate.score >= 85
      ? "sage"
      : candidate.score >= 70
      ? "sand"
      : "rose";

  return (
    <div
      className={`fixed top-12 right-0 w-[360px] h-[calc(100vh-48px)] bg-surface border-l border-border transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-[1000] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col max-[900px]:top-auto max-[900px]:bottom-0 max-[900px]:w-full max-[900px]:h-[85vh] max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:rounded-t-2xl ${
        isOpen
          ? "translate-x-0 max-[900px]:translate-y-0"
          : "translate-x-full max-[900px]:translate-y-full"
      }`}
    >
      <div className="h-12 bg-surface-2 border-b border-border px-4 flex justify-between items-center shrink-0">
        <div className="text-sm font-medium text-text-primary">
          {candidate.name}
        </div>
        <button
          onClick={() => { onClose(); }}
          className="bg-transparent border-none text-text-muted text-xl cursor-pointer leading-none p-1 hover:text-text-primary transition-colors"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className={`font-mono font-light text-[52px] leading-none text-${scoreColor}`}>
              {candidate.score}
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              Overall match
            </span>
          </div>
          <div className="font-mono text-[11px] text-sage mt-2">
            High · 87% certainty
          </div>
        </div>

        <div className="mb-6">
          {candidate.signals.map((sig, i) => {
            const barColor =
              sig.value >= 85
                ? "bg-sage"
                : sig.value >= 70
                ? "bg-sand"
                : "bg-rose";
            return (
              <div key={i} className="flex items-center mb-2">
                <div className="text-xs text-text-secondary w-[120px]">
                  {sig.label}
                </div>
                <div className="flex-1 h-[6px] bg-border rounded-full overflow-hidden mx-3">
                  <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${String(sig.value)}%` }}
                  />
                </div>
                <div className="font-mono text-xs text-parchment-muted w-6 text-right">
                  {sig.value}
                </div>
              </div>
            );
          })}
        </div>

        <div className="font-mono text-[9px] text-text-muted uppercase mb-3 tracking-[0.1em]">
          AI REASONING
        </div>
        <div className="mb-6">
          {candidate.reasoning.map((r, i) => (
            <div
              key={i}
              className="bg-surface-2 rounded-lg py-2 px-2.5 mb-1.5 text-xs text-text-secondary leading-[1.6] flex gap-1.5"
            >
              <span className="text-parchment-muted font-bold">›</span>
              {r}
            </div>
          ))}
        </div>

        <div className="font-mono text-[9px] text-text-muted uppercase mb-3 tracking-[0.1em]">
          SKILLS
        </div>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {candidate.skills.map((s, i) => (
            <div
              key={i}
              className="font-mono text-[10px] bg-surface-3 border border-border px-2 py-[2px] rounded-full text-parchment-muted whitespace-nowrap"
            >
              {s}
            </div>
          ))}
        </div>

        <div className="font-mono text-[9px] text-text-muted uppercase mb-3 tracking-[0.1em]">
          COMPARABLE CANDIDATES
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-surface-3 flex items-center justify-center font-mono text-[9px] text-parchment">
              SK
            </div>
            <div className="text-xs text-text-primary flex-1">
              Sanya Kapoor
            </div>
            <div className="font-mono text-[10px] py-[2px] px-1.5 rounded bg-[rgba(141,186,133,0.1)] text-sage">
              84
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-surface-3 flex items-center justify-center font-mono text-[9px] text-parchment">
              PM
            </div>
            <div className="text-xs text-text-primary flex-1">
              Priya Mehta
            </div>
            <div className="font-mono text-[10px] py-[2px] px-1.5 rounded bg-[rgba(184,154,110,0.1)] text-sand">
              78
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-3 px-4 bg-surface shrink-0">
        <button className="w-full bg-parchment text-ink border-none rounded-lg py-2.5 font-medium text-[13px] cursor-pointer transition-colors duration-150 hover:bg-parchment-dim">
          Shortlist
        </button>
        <button className="w-full bg-transparent text-text-muted border border-transparent rounded-lg py-2.5 font-medium text-[13px] cursor-pointer transition-colors duration-150 mt-2 hover:border-border-hi hover:text-text-primary">
          Pass
        </button>
      </div>
    </div>
  );
}
