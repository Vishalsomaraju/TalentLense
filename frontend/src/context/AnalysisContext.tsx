import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RankingResponse, AnalysisWeights } from '@/types';

interface AnalysisContextValue {
  pendingAnalysis: Promise<RankingResponse> | null;
  setPendingAnalysis: (p: Promise<RankingResponse> | null) => void;
  result: RankingResponse | null;
  setResult: (r: RankingResponse | null) => void;
  weights: AnalysisWeights;
  setWeights: (w: AnalysisWeights) => void;
  reset: () => void;
}

const DEFAULT_WEIGHTS: AnalysisWeights = {
  semantic: 0.35,
  trajectory: 0.25,
  impact: 0.25,
  velocity: 0.15,
};

const AnalysisContext = createContext<AnalysisContextValue | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [pendingAnalysis, setPendingAnalysis] = useState<Promise<RankingResponse> | null>(null);
  const [result, setResult] = useState<RankingResponse | null>(null);
  const [weights, setWeightsState] = useState<AnalysisWeights>(() => {
    try {
      const stored = localStorage.getItem('talentlens_weights');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          typeof parsed.semantic === 'number' &&
          typeof parsed.trajectory === 'number' &&
          typeof parsed.impact === 'number' &&
          typeof parsed.velocity === 'number'
        ) {
          return parsed;
        }
      }
    } catch (e) {
      // Ignore parsing errors and fallback
    }
    return DEFAULT_WEIGHTS;
  });

  const setWeights = (w: AnalysisWeights) => {
    setWeightsState(w);
    localStorage.setItem('talentlens_weights', JSON.stringify(w));
  };

  const reset = () => {
    setPendingAnalysis(null);
    setResult(null);
  };

  return (
    <AnalysisContext.Provider
      value={{
        pendingAnalysis,
        setPendingAnalysis,
        result,
        setResult,
        weights,
        setWeights,
        reset,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis(): AnalysisContextValue {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
