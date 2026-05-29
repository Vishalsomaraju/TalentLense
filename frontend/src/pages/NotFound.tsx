import React from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout";

export default function NotFound(): React.JSX.Element {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-up">
        <div className="font-mono text-[80px] text-surface-3 font-light leading-none mb-4 select-none">
          404
        </div>
        <h1 className="text-2xl font-light text-text-primary tracking-tight mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          This candidate wasn't found in our database either.
        </p>
        <Link
          to="/dashboard"
          className="bg-parchment text-ink px-6 py-2.5 rounded-lg text-sm font-medium transition-transform duration-200 hover:bg-[#cfc0b0] transform hover:-translate-y-px"
        >
          Back to Dashboard
        </Link>
      </div>
    </DashboardLayout>
  );
}
