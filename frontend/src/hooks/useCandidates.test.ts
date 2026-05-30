import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCandidates } from './useCandidates';
import * as AnalysisContext from '@/context/AnalysisContext';
import { MOCK_CANDIDATES } from '@/constants/mockData';

// Mock useAnalysis
vi.mock('@/context/AnalysisContext', () => ({
  useAnalysis: vi.fn()
}));

describe('useCandidates', () => {
  beforeEach(() => {
    vi.mocked(AnalysisContext.useAnalysis).mockReturnValue({
      result: null, // this will make it fall back to MOCK_CANDIDATES
      pendingAnalysis: null,
      setPendingAnalysis: vi.fn(),
      setResult: vi.fn(),
      weights: { semantic: 0.35, trajectory: 0.25, impact: 0.25, velocity: 0.15 },
      setWeights: vi.fn(),
      reset: vi.fn()
    });
  });

  it('should return mock candidates by default', () => {
    const { result } = renderHook(() => useCandidates());
    expect(result.current.candidates).toEqual(MOCK_CANDIDATES);
  });

  it('should filter by score', () => {
    const { result } = renderHook(() => useCandidates());
    const highScorers = result.current.filterByScore(80);
    // MOCK_CANDIDATES has two above 80: AR (91) and SK (84)
    expect(highScorers.length).toBe(2);
    expect(highScorers[0].overall_score).toBeGreaterThanOrEqual(80);
  });

  it('should filter by skill', () => {
    const { result } = renderHook(() => useCandidates());
    const pyUsers = result.current.filterBySkill('pytorch');
    expect(pyUsers.length).toBe(1);
    expect(pyUsers[0].name).toBe('Aditya Rao');
  });

  it('should filter by experience range', () => {
    const { result } = renderHook(() => useCandidates());
    const midLevel = result.current.filterByExperience(3, 5);
    expect(midLevel.length).toBe(3); // 3, 4, 5 years exp
  });

  it('should sort by name asc', () => {
    const { result } = renderHook(() => useCandidates());
    const sorted = result.current.sortBy(MOCK_CANDIDATES, 'name', 'asc');
    expect(sorted[0].name).toBe('Aditya Rao');
    expect(sorted[1].name).toBe('Dev Nair');
  });

  it('should sort by score desc', () => {
    const { result } = renderHook(() => useCandidates());
    const sorted = result.current.sortBy(MOCK_CANDIDATES, 'overall_score', 'desc');
    expect(sorted[0].overall_score).toBeGreaterThanOrEqual(sorted[1].overall_score);
    expect(sorted[0].name).toBe('Aditya Rao'); // score 91
  });

  it('should filter by stage', () => {
    const { result } = renderHook(() => useCandidates());
    const screening = result.current.filterByStage('Screening');
    expect(screening.length).toBe(2);
    expect(screening[0].name).toBe('Priya Mehta');
    
    const all = result.current.filterByStage('All');
    expect(all.length).toBe(MOCK_CANDIDATES.length);
  });
});
