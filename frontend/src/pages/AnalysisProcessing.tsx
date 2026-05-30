import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ROUTES } from "@/constants";
import { useAnalysis } from "@/context/AnalysisContext";

export default function AnalysisProcessing(): React.JSX.Element {
  const navigate = useNavigate();
  const { pendingAnalysis, setResult, setPendingAnalysis } = useAnalysis();
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phases = [
    "Parsing 24 resumes...",
    "Computing semantic embeddings...",
    "Ranking candidates...",
    "Finalizing models..."
  ];

  useEffect(() => {
    if (!pendingAnalysis) {
      void navigate(ROUTES.ANALYSIS_NEW);
      return;
    }

    let cancelled = false;
    const MIN_DISPLAY_MS = 3000;
    const startTime = Date.now();
    let currentPhase = 0;
    
    // Rotate through phases every 800ms
    const interval = setInterval(() => {
      currentPhase += 1;
      if (currentPhase < phases.length) {
        setPhaseIndex(currentPhase);
      }
    }, 800);

    pendingAnalysis
      .then((response) => {
        if (cancelled) return;
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        setTimeout(() => {
          if (cancelled) return;
          clearInterval(interval);
          setResult(response);
          setPendingAnalysis(null);
          void navigate(ROUTES.DASHBOARD);
        }, remaining);
      })
      .catch((err) => {
        if (cancelled) return;
        clearInterval(interval);
        console.error('Analysis failed:', err);
        setPendingAnalysis(null);
        void navigate(ROUTES.ANALYSIS_NEW);
        // TODO: show error toast when toast system exists
      });

    return (): void => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [navigate, pendingAnalysis, setResult, setPendingAnalysis, phases.length]);

  return (
    <div className="min-h-screen w-full bg-ink flex flex-col items-center justify-center animate-fade-in">
      <div className="flex flex-col items-center gap-6">
          {/* Animated Spinner */}
          <div className="relative flex items-center justify-center w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-surface-3 animate-ping opacity-20" />
            <div className="absolute inset-0 rounded-full border-t-2 border-parchment animate-spin" />
            <Loader2 size={32} className="text-parchment animate-spin" />
          </div>

          {/* Text Content */}
          <div className="text-center">
            <h2 className="text-2xl font-light text-text-primary tracking-tight mb-2">
              AI Analysis in Progress
            </h2>
            <div className="h-6">
              <p className="text-sm text-sage font-mono animate-fade-up" key={phaseIndex}>
                {phases[phaseIndex]}
              </p>
            </div>
          </div>
          
          {/* Progress Bar Container */}
          <div className="w-64 h-1 bg-surface-3 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-parchment transition-all duration-[3000ms] ease-out rounded-full" 
              style={{ width: phaseIndex === phases.length - 1 ? '100%' : `${String((phaseIndex + 1) * 25)}%` }} 
            />
          </div>
        </div>
      </div>
  );
}
