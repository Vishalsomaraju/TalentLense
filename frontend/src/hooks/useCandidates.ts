import { useAnalysis } from "@/context/AnalysisContext";
import { Candidate } from "@/types";
import { MOCK_CANDIDATES } from "@/constants/mockData";

export function useCandidates() {
  const { result } = useAnalysis();
  const candidates = result?.candidates ?? MOCK_CANDIDATES;

  // Filter by minimum score
  const filterByScore = (min: number) =>
    candidates.filter(c => c.overall_score >= min);

  // Filter by skill substring (case-insensitive)
  const filterBySkill = (skill: string) =>
    candidates.filter(c =>
      c.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );

  // Filter by experience range
  const filterByExperience = (min: number, max: number) =>
    candidates.filter(c =>
      c.experience_years >= min && c.experience_years <= max
    );

  // Filter by stage
  const filterByStage = (stage: string) =>
    stage === 'All' ? candidates : candidates.filter(c => c.stage === stage);

  // Sort
  const sortBy = (list: Candidate[], key: 'overall_score' | 'experience_years' | 'name', dir: 'asc' | 'desc') =>
    [...list].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (typeof av === 'string' && typeof bv === 'string')
        return dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return dir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });

  return { candidates, filterByScore, filterBySkill, filterByExperience, filterByStage, sortBy };
}
