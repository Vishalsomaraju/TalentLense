import type React from "react";

interface SignalBarProps {
  label: string;
  value: number;
  colorVariant?: string;
  delayMs?: number;
}

export function SignalBar({ label, value, colorVariant, delayMs = 0 }: SignalBarProps): React.JSX.Element {
  // Determine color based on value, matching dashboard logic visually
  let colorClass = "bg-sage";
  let textColorClass = "text-sage";
  let statusText = `avg ${String(value)} ↑ high`;

  if (colorVariant) {
    colorClass = `bg-${colorVariant}`;
    textColorClass = `text-${colorVariant}`;
    statusText = `avg ${String(value)} ${colorVariant === "sage" ? "↑ high" : colorVariant === "sand" ? "→ near target" : "↓ below target"}`;
  } else {
    if (value < 65) {
      colorClass = "bg-rose";
      textColorClass = "text-rose";
      statusText = `avg ${String(value)} ↓ low`;
    } else if (value < 75) {
      colorClass = "bg-sand";
      textColorClass = "text-sand";
      statusText = `avg ${String(value)} ↓ below target`;
    } else if (value < 85) {
      colorClass = "bg-parchment-muted";
      textColorClass = "text-parchment-muted";
      statusText = `avg ${String(value)} → near target`;
    }
  }

  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[11px] text-text-primary">
          {label}
        </span>
        <span className={`font-mono text-[11px] ${textColorClass}`}>
          {statusText}
        </span>
      </div>
      <div className="h-1 bg-surface-2 rounded-full relative overflow-hidden">
        <div className={`h-full rounded-full ${colorClass} transition-all duration-1000 ease-out`} style={{ width: `${String(value)}%`, animationDelay: `${delayMs}ms` }} />
        <div className="absolute right-[20%] top-0 bottom-0 w-[2px] bg-text-muted z-[2]" />
      </div>
    </div>
  );
}
