import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rankCandidates, checkHealth, rankCandidatesJson } from './api';

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock('@/types', async () => {
  const actual = await vi.importActual('@/types');
  return {
    ...actual as object,
    normalizeCandidate: (c: any) => ({ ...c, initials: 'T' })
  };
});

describe('API Service', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('checkHealth', () => {
    it('should return true when healthy', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });
      const result = await checkHealth();
      expect(result).toBe(true);
    });

    it('should return false on failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      const result = await checkHealth();
      expect(result).toBe(false);
    });
  });

  describe('rankCandidates', () => {
    it('should construct form data and fetch', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ candidates: [{ id: '1', name: 'Test' }] })
      });

      const file = new File([''], 'test.pdf');
      const result = await rankCandidates('job desc', [file], { semantic: 1, trajectory: 0, impact: 0, velocity: 0 });
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/rank'),
        expect.objectContaining({ method: 'POST' })
      );
      
      expect(result.candidates[0].initials).toBe('T');
    });

    it('should throw error on bad response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ detail: 'Bad Request' })
      });

      await expect(rankCandidates('job desc', [])).rejects.toThrow('API Error 400: Bad Request');
    });
  });

  describe('rankCandidatesJson', () => {
    it('should post json correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ candidates: [] })
      });

      await rankCandidatesJson('jd', [{}]);
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/rank/json'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      );
    });

    it('should throw error on non-json bad response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => { throw new Error('Not json'); }
      });

      await expect(rankCandidatesJson('jd', [])).rejects.toThrow('API Error 500: Internal Server Error');
    });
  });
});
