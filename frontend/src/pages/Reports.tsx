import type React from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { SignalBar } from "../components/candidates/SignalBar";

export default function Reports(): React.JSX.Element {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-light text-parchment m-0">Reports & Analytics</h1>
          <p className="text-sm text-text-secondary mt-1 m-0">
            Pipeline metrics, model accuracy, and hiring funnel velocity.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-2 border border-border text-text-secondary px-3 py-2 rounded-lg text-sm hover:text-text-primary transition-colors">
            Last 30 Days ▾
          </button>
          <button className="bg-surface-2 border border-border text-text-secondary px-3 py-2 rounded-lg text-sm hover:text-text-primary transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-5 max-[900px]:grid-cols-1">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-[0.15em] mb-1">
            Total Pipeline
          </div>
          <div className="font-mono text-3xl font-light text-parchment mb-2">1,248</div>
          <div className="text-xs text-sage flex items-center gap-1">
            <span>↑ 12%</span> <span className="text-text-muted">vs last period</span>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-[0.15em] mb-1">
            Avg Model Score
          </div>
          <div className="font-mono text-3xl font-light text-parchment mb-2">74.2</div>
          <div className="text-xs text-rose flex items-center gap-1">
            <span>↓ 2%</span> <span className="text-text-muted">vs last period</span>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-[0.15em] mb-1">
            Time to Shortlist
          </div>
          <div className="font-mono text-3xl font-light text-parchment mb-2">2.4d</div>
          <div className="text-xs text-sage flex items-center gap-1">
            <span>↓ 18%</span> <span className="text-text-muted">vs last period</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 max-[900px]:grid-cols-1 mb-5">
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-base font-medium text-text-primary mb-4 m-0">Score Distribution</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">Exceptional (90-100)</span>
                <span className="font-mono text-parchment-muted">42</span>
              </div>
              <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-sage rounded-full" style={{ width: "12%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">Strong (80-89)</span>
                <span className="font-mono text-parchment-muted">156</span>
              </div>
              <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-sage rounded-full" style={{ width: "28%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">Average (70-79)</span>
                <span className="font-mono text-parchment-muted">410</span>
              </div>
              <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-sand rounded-full" style={{ width: "45%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">Below Target (&lt;70)</span>
                <span className="font-mono text-parchment-muted">640</span>
              </div>
              <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-rose rounded-full" style={{ width: "65%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-base font-medium text-text-primary mb-4 m-0">Signal Consistency</h2>
          <div className="space-y-4">
            <SignalBar label="Semantic Match" value={84} />
            <SignalBar label="Career Trajectory" value={76} />
            <SignalBar label="Project Impact" value={68} />
            <SignalBar label="Learning Velocity" value={61} />
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
}
