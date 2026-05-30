import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { useAnalysis } from "@/context/AnalysisContext";
import { rankCandidates } from "@/services/api";
import { useJD } from "@/hooks/useJD";

export default function NewAnalysis(): React.JSX.Element {
  const navigate = useNavigate();
  const { setPendingAnalysis, weights, reset } = useAnalysis();
  const { jd, updateJD, isValid } = useJD();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const step1Complete = jd.trim().length > 0;
  const step2Active = step1Complete;
  const step2Complete = files.length > 0;
  const step3Active = step1Complete && step2Complete;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  const handleRemoveFile = (index: number): void => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRunAnalysis = (): void => {
    if (!jd.trim() || files.length === 0) return;
    setIsLoading(true);
    reset();
    const promise = rankCandidates(jd, files, weights);
    setPendingAnalysis(promise);
    navigate("/analysis/processing");
  };

  return (
    <DashboardLayout>
      <div className="max-w-[900px] mx-auto pt-8 pb-16 px-6">
        <div className="mb-10 animate-fade-up">
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-border z-0" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-parchment z-0 transition-all duration-300" style={{ width: step3Active ? '100%' : (step1Complete || step2Complete ? '50%' : '0%') }} />
            
            {/* Step 1 */}
            <div className={`relative z-10 flex flex-col items-center gap-2 bg-ink px-4 transition-colors text-parchment`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-mono transition-colors ${step1Complete ? 'bg-parchment text-ink border-parchment' : 'bg-surface-3 border-parchment text-parchment'}`}>
                1
              </div>
              <span className="text-[11px] uppercase tracking-wider font-mono bg-ink px-2">Define Role</span>
            </div>

            {/* Step 2 */}
            <div className={`relative z-10 flex flex-col items-center gap-2 bg-ink px-4 transition-colors ${step2Complete ? 'text-parchment' : (step2Active ? 'text-parchment-muted' : 'text-text-muted')}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-mono transition-colors ${step2Complete ? 'bg-parchment text-ink border-parchment' : (step2Active ? 'bg-surface-3 border-parchment-muted text-parchment-muted' : 'bg-surface-2 border-border text-text-muted')}`}>
                2
              </div>
              <span className="text-[11px] uppercase tracking-wider font-mono bg-ink px-2">Upload Resumes</span>
            </div>

            {/* Step 3 */}
            <div className={`relative z-10 flex flex-col items-center gap-2 bg-ink px-4 transition-colors ${step3Active ? 'text-parchment' : 'text-text-muted'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-mono transition-colors ${step3Active ? 'bg-surface-3 border-parchment text-parchment' : 'bg-surface-2 border-border text-text-muted'}`}>
                3
              </div>
              <span className="text-[11px] uppercase tracking-wider font-mono bg-ink px-2">Run Analysis</span>
            </div>
          </div>
          <h1 className="text-3xl font-light text-text-primary tracking-tight">
            New Analysis
          </h1>
          <p className="text-sm text-text-secondary mt-2 max-w-[60ch]">
            Paste the job description below, then upload candidate resumes to
            generate predictive AI rankings.
          </p>
        </div>

        <div
          className="space-y-8 animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          {/* Section 1: JD Input */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="jd-input"
                className="text-sm font-medium text-text-primary"
              >
                Job Description
              </label>
            </div>
            <textarea
              id="jd-input"
              value={jd}
              onChange={(e) => {
                updateJD(e.target.value);
              }}
              placeholder="e.g. We are looking for a Senior Machine Learning Engineer with experience in PyTorch..."
              className="w-full h-48 bg-surface-2 border border-border rounded-xl p-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-parchment-dim transition-colors resize-none"
            />
          </section>

          {/* Section 2: Resume Upload */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="resume-upload"
                className="text-sm font-medium text-text-primary"
              >
                Candidate Resumes
              </label>
              <span className="text-xs text-text-secondary">PDF or DOCX</span>
            </div>

            <div
              role="presentation"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all duration-200 ${
                isDragging
                  ? "border-parchment bg-[rgba(221,208,192,0.03)]"
                  : "border-border-hi bg-surface-2 hover:border-parchment-dim hover:bg-surface-3"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-surface-3 border border-border flex items-center justify-center mb-4 text-parchment-muted text-xl">
                +
              </div>
              <p className="text-sm text-text-primary mb-1 text-center">
                Drag and drop resumes here
              </p>
              <p className="text-xs text-text-secondary mb-6 text-center">
                or click to browse from your computer
              </p>

              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="btn-ghost rounded-full px-5 py-2 text-xs border border-border-hi text-parchment-dim hover:border-parchment-muted hover:text-parchment transition-colors"
              >
                Select Files
              </button>
              <input
                id="resume-upload"
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
                aria-hidden="true"
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-surface-2 border border-border rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-3 flex items-center justify-center text-[9px] font-mono text-parchment-muted uppercase">
                        {file.name.split(".").pop()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-text-primary font-medium truncate max-w-[300px]">
                          {file.name}
                        </span>
                        <span className="text-[10px] text-text-secondary">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveFile(i);
                      }}
                      className="text-text-muted hover:text-rose transition-colors px-2 py-1 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Action Row */}
          <div className="pt-6 border-t border-border flex justify-end">
            <button
              type="button"
              onClick={handleRunAnalysis}
              disabled={isLoading || !isValid || files.length === 0}
              className="bg-parchment text-ink px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#cfc0b0] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-parchment transform hover:-translate-y-px active:translate-y-0"
            >
              {isLoading ? "Starting Analysis..." : "Run AI Analysis"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
