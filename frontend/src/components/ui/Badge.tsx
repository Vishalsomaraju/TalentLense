import type React from "react";

interface BadgeProps {
  stage: "Screening" | "Interview" | "Shortlisted" | "Rejected";
}

export function Badge({ stage }: BadgeProps): React.JSX.Element {
  const getStyles = (): string => {
    switch (stage) {
      case "Screening":
        return "border-border-hi text-text-secondary bg-surface-3";
      case "Interview":
        return "border-sand text-sand bg-surface-3";
      case "Shortlisted":
        return "border-sage text-sage bg-surface-3";
      case "Rejected":
        return "border-rose text-rose bg-surface-3";
      default:
        return "";
    }
  };

  return (
    <div
      className={`font-mono text-[10px] py-[3px] px-2 rounded-full border inline-block text-center ${getStyles()}`}
    >
      {stage}
    </div>
  );
}
