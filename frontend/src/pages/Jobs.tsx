import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Plus } from "lucide-react";
import { Job } from "@/types";

export default function Jobs(): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);
  
  const jobs: Job[] = [
    {
      slug: "senior-ml-engineer",
      title: "Senior ML Engineer",
      candidates: 24,
      avgScore: 76.8,
      dateCreated: "May 12, 2025",
      status: "Active",
    },
    {
      slug: "product-designer",
      title: "Product Designer",
      candidates: 41,
      avgScore: 72.1,
      dateCreated: "May 20, 2025",
      status: "Active",
    },
    {
      slug: "frontend-engineer",
      title: "Frontend Engineer",
      candidates: 89,
      avgScore: 68.4,
      dateCreated: "Apr 28, 2025",
      status: "Closed",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-light text-parchment m-0">Jobs</h1>
          <p className="text-sm text-text-secondary mt-1 m-0">
            Manage your open roles and candidate pipelines.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-parchment text-ink font-medium px-4 py-2 rounded-lg hover:bg-parchment-dim transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Create New Job
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 animate-fade-up">
        {jobs.map((job) => (
          <div key={job.slug} className="bg-surface border border-border rounded-xl p-5 flex justify-between items-center max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-base font-medium text-text-primary m-0">{job.title}</h2>
                <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded ${job.status === 'Active' ? 'bg-[rgba(141,186,133,0.1)] text-sage border border-[rgba(141,186,133,0.2)]' : 'bg-surface-3 text-text-muted border border-border'}`}>
                  {job.status}
                </span>
              </div>
              <div className="text-xs text-text-secondary">
                Created {job.dateCreated} <span className="mx-2 text-border-hi">•</span> {job.candidates} Candidates
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right max-[700px]:text-left">
                <div className="font-mono text-xl font-light text-parchment">{job.avgScore}</div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider font-mono">Avg Score</div>
              </div>
              <Link 
                to={`/dashboard?job=${job.slug}`}
                className="text-sm text-text-primary hover:text-parchment border border-border bg-surface-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                View Candidates &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[#00000080] backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in p-4">
          <div className="bg-surface border border-border rounded-xl w-full max-w-md overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-text-primary m-0">Create New Job</h3>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary text-xl leading-none">&times;</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-text-secondary mb-1.5 uppercase font-mono tracking-wider">Role Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Senior Machine Learning Engineer" 
                  className="w-full bg-ink border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-border-hi transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1.5 uppercase font-mono tracking-wider">Description (Optional)</label>
                <textarea 
                  placeholder="Paste job description here..." 
                  className="w-full h-24 resize-none bg-ink border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-border-hi transition-colors"
                />
              </div>
            </div>
            <div className="p-4 border-t border-border bg-surface-2 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">Cancel</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm bg-parchment text-ink font-medium rounded-lg hover:bg-parchment-dim transition-colors">Create Job</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
