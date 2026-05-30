import { AnalysisWeights, RankingResponse, normalizeCandidate } from '@/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

// Main ranking call — accepts JD text + PDF files + optional weights
export async function rankCandidates(
  jobDescription: string,
  resumeFiles: File[],
  weights?: AnalysisWeights,
): Promise<RankingResponse> {
  const formData = new FormData();
  formData.append('job_description', jobDescription);
  
  resumeFiles.forEach((file) => {
    formData.append('resumes', file);
  });

  if (weights) {
    formData.append('weights', JSON.stringify(weights));
  }

  const response = await fetch(`${BASE_URL}/api/rank`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'Unknown error';
    try {
      const body = await response.json();
      errorMessage = body.detail || errorMessage;
    } catch {
      errorMessage = response.statusText;
    }
    throw new Error(`API Error ${response.status}: ${errorMessage}`);
  }

  const data = (await response.json()) as RankingResponse;
  
  data.candidates = data.candidates.map(normalizeCandidate);
  
  return data;
}

// Health check — call on app startup to verify backend is reachable
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}

// JSON-only ranking — for testing without real PDFs
export async function rankCandidatesJson(
  jobDescription: string,
  candidateProfiles: Record<string, unknown>[],
  weights?: AnalysisWeights,
): Promise<RankingResponse> {
  const response = await fetch(`${BASE_URL}/api/rank/json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      job_description: jobDescription,
      candidate_profiles: candidateProfiles,
      weights: weights ?? null,
    }),
  });

  if (!response.ok) {
    let errorMessage = 'Unknown error';
    try {
      const body = await response.json();
      errorMessage = body.detail || errorMessage;
    } catch {
      errorMessage = response.statusText;
    }
    throw new Error(`API Error ${response.status}: ${errorMessage}`);
  }

  const data = (await response.json()) as RankingResponse;
  
  data.candidates = data.candidates.map(normalizeCandidate);
  
  return data;
}
