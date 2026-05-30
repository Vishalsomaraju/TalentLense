import { useState } from "react";

export function useJD() {
  const [jd, setJD] = useState<string>(() =>
    localStorage.getItem('talentlens_jd') ?? ''
  );

  const updateJD = (text: string) => {
    setJD(text);
    localStorage.setItem('talentlens_jd', text);
  };

  const clearJD = () => {
    setJD('');
    localStorage.removeItem('talentlens_jd');
  };

  const wordCount = jd.trim().split(/\s+/).filter(Boolean).length;
  const isValid = wordCount >= 50;  // JD too short to be meaningful

  return { jd, updateJD, clearJD, wordCount, isValid };
}
