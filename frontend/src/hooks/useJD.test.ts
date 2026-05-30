import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useJD } from './useJD';

describe('useJD', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty JD and not valid', () => {
    const { result } = renderHook(() => useJD());
    expect(result.current.jd).toBe('');
    expect(result.current.isValid).toBe(false);
  });

  it('should update JD and write to localStorage', () => {
    const { result } = renderHook(() => useJD());
    
    act(() => {
      result.current.updateJD('Hello world');
    });

    expect(result.current.jd).toBe('Hello world');
    expect(localStorage.getItem('talentlens_jd')).toBe('Hello world');
    expect(result.current.wordCount).toBe(2);
    expect(result.current.isValid).toBe(false);
  });

  it('should be valid if word count >= 50', () => {
    const { result } = renderHook(() => useJD());
    
    act(() => {
      // 50 words
      const words = Array(50).fill('word').join(' ');
      result.current.updateJD(words);
    });

    expect(result.current.wordCount).toBe(50);
    expect(result.current.isValid).toBe(true);
  });

  it('should clear JD and remove from localStorage', () => {
    localStorage.setItem('talentlens_jd', 'Testing');
    const { result } = renderHook(() => useJD());
    
    expect(result.current.jd).toBe('Testing');

    act(() => {
      result.current.clearJD();
    });

    expect(result.current.jd).toBe('');
    expect(localStorage.getItem('talentlens_jd')).toBeNull();
  });
});
