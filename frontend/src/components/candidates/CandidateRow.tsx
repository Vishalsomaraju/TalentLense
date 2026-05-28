import type React from "react";
import { Badge } from "../ui/Badge";

export interface CandidateSignal {
  label: string;
  value: number;
}

export interface CandidateRowProps {
  rank: number;
  initials: string;
  name: string;
  role: string;
  score: number;
  signals: CandidateSignal[];
  skills: string[];
  stage: "Screening" | "Interview" | "Shortlisted" | "Rejected";
  onClick?: () => void;
}

export function CandidateRow({
  rank,
  initials,
  name,
  role,
  score,
  signals,
  skills,
  stage,
  onClick,
}: CandidateRowProps): React.JSX.Element {
  const scoreColor = score >= 85 ? "sage" : score >= 70 ? "sand" : "rose";
  const scoreTextClass = `text-${scoreColor}`;
  const scoreBgClass = `bg-${scoreColor}`;

  const getSignalDotClass = (val: number): string => {
    if (val >= 85) return "bg-sage";
    if (val >= 70) return "bg-sand opacity-90";
    if (val >= 60) return "bg-sand opacity-50";
    return "bg-rose opacity-60";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (onClick) onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="h-14 flex items-center px-4 gap-3 border-b border-border bg-surface cursor-pointer transition-colors duration-120 hover:bg-surface-2 last:border-b-0 group"
    >
      <div className="w-7 text-right font-mono font-light text-[13px] text-parchment-muted">
        {rank}
      </div>

      <div className="flex-1 flex items-center gap-2.5 overflow-hidden">
        <div className="w-[30px] h-[30px] min-w-[30px] rounded-full bg-surface-3 flex items-center justify-center text-[10px] text-parchment">
          {initials}
        </div>
        <div className="flex flex-col overflow-hidden whitespace-nowrap text-ellipsis">
          <div className="font-sans font-medium text-[13px] text-text-primary">
            {name}
          </div>
          <div className="font-sans text-[11px] text-text-secondary">
            {role}
          </div>
        </div>
      </div>

      <div className="w-[68px] text-right flex flex-col items-end gap-[2px]">
        <div className={`font-mono font-light text-xl leading-none ${scoreTextClass}`}>
          {score}
        </div>
        <div className="w-12 h-[3px] bg-surface-3 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-in-out ${scoreBgClass}`}
            style={{ width: `${String(score)}%` }}
          />
        </div>
      </div>

      <div className="w-[120px] flex gap-1 items-center">
        {signals.map((sig, i) => (
          <div key={i} className="relative inline-flex group/dot">
            <div
              className={`w-2 h-2 rounded-full relative ${getSignalDotClass(
                sig.value
              )}`}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-inherit rounded-full" />
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-surface-3 border border-border-hi px-2 py-1 font-sans text-[10px] text-text-secondary rounded whitespace-nowrap pointer-events-none opacity-0 group-hover/dot:opacity-100 transition-opacity z-10">
              {sig.label}: {sig.value}
            </div>
          </div>
        ))}
      </div>

      <div className="w-[140px] flex gap-1 flex-wrap">
        {skills.slice(0, 2).map((skill, i) => (
          <div
            key={i}
            className="font-mono text-[10px] bg-surface-3 border border-border px-2 py-[2px] rounded-full text-parchment-muted whitespace-nowrap"
          >
            {skill}
          </div>
        ))}
      </div>

      <div className="w-[80px]">
        <Badge stage={stage} />
      </div>

      <div className="w-8 text-center text-text-muted text-base leading-none transition-colors duration-120 group-hover:text-text-primary">
        ···
      </div>
    </div>
  );
}
