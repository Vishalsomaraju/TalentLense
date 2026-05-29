import type React from "react";
import { useEffect } from "react";
import { Candidate } from "@/types";
import { ChevronRight, X, UserCheck, UserMinus } from "lucide-react";
import { SignalBar } from "../ui/SignalBar";
import { Badge } from "../ui/Badge";
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
      <div className="h-14 bg-surface-2 border-b border-border px-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium text-text-primary">
            {candidate.name}
          </div>
          <Badge stage={candidate.stage} />
        </div>
        <button
          onClick={() => { onClose(); }}
          className="bg-transparent border-none text-text-muted cursor-pointer p-1.5 hover:text-text-primary hover:bg-surface-3 rounded-md transition-colors"
        >
          <X size={18} />
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

        <div className="mb-8 grid grid-cols-1 gap-y-4">
          {candidate.signals.map((sig, i) => {
            const colorVariant = sig.value >= 85 ? "sage" : sig.value >= 70 ? "sand" : "rose";
            const statusText = `avg ${String(sig.value)} ${sig.value >= 85 ? "↑ high" : sig.value >= 70 ? "→ near target" : "↓ below target"}`;
            return (
              <SignalBar 
                key={i} 
                label={sig.label} 
                value={sig.value} 
                colorVariant={colorVariant} 
                delayMs={i * 100}
                statusText={statusText}
                showBenchmark
              />
            );
          })}
        </div>

        <div className="font-mono text-[9px] text-text-muted uppercase mb-3 tracking-[0.1em]">
          AI REASONING
        </div>
        <div className="mb-6 space-y-2">
          {candidate.reasoning.map((r, i) => (
            <div
              key={i}
              className="bg-surface-2 rounded-lg py-2.5 px-3 text-xs text-text-secondary leading-[1.6] flex gap-2 items-start"
            >
              <ChevronRight size={14} className="text-parchment-muted shrink-0 mt-[2px]" />
              <span>{r}</span>
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

      <div className="border-t border-border p-4 bg-surface shrink-0 flex gap-3">
        <button className="flex-1 flex justify-center items-center gap-2 bg-transparent text-text-secondary border border-border-hi rounded-lg py-2.5 font-medium text-[13px] cursor-pointer transition-colors hover:border-text-muted hover:text-text-primary">
          <UserMinus size={16} />
          <span>Pass</span>
        </button>
        <button className="flex-1 flex justify-center items-center gap-2 bg-parchment text-ink border-none rounded-lg py-2.5 font-medium text-[13px] cursor-pointer transition-colors hover:bg-parchment-dim">
          <UserCheck size={16} />
          <span>Shortlist</span>
        </button>
      </div>
    </div>
  );
}
