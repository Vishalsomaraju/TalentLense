import type React from "react";

interface SignalBarProps {
  label: string;
  value: number; // 0-100
  colorVariant?: string;
  delayMs?: number;
  className?: string;
  isDrawer?: boolean;
  showBenchmark?: boolean;
  statusText?: string;
}

export function SignalBar({
  label,
  value,
  colorVariant,
  delayMs = 0,
  className = "",
  isDrawer = false,
  showBenchmark = false,
  statusText,
}: SignalBarProps): React.JSX.Element {
  let colorClass = "bg-sage";
  let textColorClass = "text-sage";

  if (colorVariant) {
    colorClass = `bg-${colorVariant}`;
    textColorClass = `text-${colorVariant}`;
  } else {
    if (value < 65) {
      colorClass = "bg-rose";
      textColorClass = "text-rose";
    } else if (value < 75) {
      colorClass = "bg-sand";
      textColorClass = "text-sand";
    } else if (value < 85) {
      colorClass = "bg-parchment-muted";
      textColorClass = "text-parchment-muted";
    }
  }

  if (statusText) {
    return (
      <div className={`mb-3 ${className}`}>
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-[11px] text-text-primary">
            {label}
          </span>
          <span className={`font-mono text-[11px] ${textColorClass}`}>
            {statusText}
          </span>
        </div>
        <div className="h-1 bg-surface-2 rounded-full relative overflow-hidden">
          <div 
            className={`h-full rounded-full ${colorClass} animate-grow`} 
            style={{ 
              "--target-width": `${String(value)}%`, 
              animationDelay: `${String(delayMs)}ms` 
            } as React.CSSProperties} 
          />
          {showBenchmark && (
            <div className="absolute right-[20%] top-0 bottom-0 w-[2px] bg-text-muted z-[2]" />
          )}
        </div>
      </div>
    );
  }

  if (isDrawer) {
    return (
      <div className={`flex items-center mb-2 ${className}`}>
        <div className="text-xs text-text-secondary w-[120px]">{label}</div>
        <div className="flex-1 h-[6px] bg-border rounded-full relative overflow-hidden mx-3">
          <div
            className={`h-full rounded-full ${colorClass}`}
            style={{ width: `${String(value)}%`, transition: "width 500ms ease" }}
          />
          {showBenchmark && (
            <div className="absolute right-[20%] top-0 bottom-0 w-[2px] bg-text-muted z-[2]" />
          )}
        </div>
        <div className="font-mono text-xs text-parchment-muted w-6 text-right">
          {value}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-[124px_1fr_34px] max-[520px]:grid-cols-1 gap-3 items-center ${className}`}
    >
      <div className="text-[11px] text-text-secondary tracking-[0.04em]">
        {label}
      </div>
      <div className="relative h-1 bg-surface-3 rounded-full overflow-hidden border border-[#252733]/75 max-[520px]:col-auto">
        <div
          className={`h-full rounded-full ${colorClass} animate-grow`}
          style={
            {
              "--target-width": `${String(value)}%`,
              animationDelay: `${String(delayMs)}ms`,
            } as React.CSSProperties
          }
        />
        {showBenchmark && (
          <div className="absolute right-[20%] top-0 bottom-0 w-[2px] bg-text-muted z-[2]" />
        )}
      </div>
      <div className="font-mono text-[11px] text-text-secondary text-right max-[520px]:col-auto max-[520px]:text-left">
        {value}
      </div>
    </div>
  );
}
