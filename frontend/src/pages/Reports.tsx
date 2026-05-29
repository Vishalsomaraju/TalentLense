import type React from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { SignalBar } from "../components/ui/SignalBar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";

const scoreData = [
  { name: "<70", count: 640 },
  { name: "70-79", count: 410 },
  { name: "80-89", count: 156 },
  { name: "90-100", count: 42 },
];

const trendData = [
  { name: "R1", score: 71 },
  { name: "R2", score: 73 },
  { name: "R3", score: 72 },
  { name: "R4", score: 75 },
  { name: "R5", score: 74 },
  { name: "R6", score: 76.2 },
  { name: "R7", score: 76.8 },
];

const funnelData = [
  { stage: "Screening", count: 1248, percentage: 100, color: "var(--surface-3)" },
  { stage: "Interview", count: 312, percentage: 25, color: "var(--border-hi)" },
  { stage: "Shortlisted", count: 64, percentage: 5, color: "var(--sand)" },
  { stage: "Offer", count: 12, percentage: 1, color: "var(--sage)" },
];

export default function Reports(): React.JSX.Element {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-end mb-6 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4">
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
        
        {/* Score Distribution */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-base font-medium text-text-primary mb-6 m-0">Score Distribution</h2>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'var(--surface-3)' }}
                  contentStyle={{ backgroundColor: 'var(--ink)', borderColor: 'var(--border-hi)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {scoreData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.name === "<70" ? "var(--rose)" :
                        entry.name === "70-79" ? "var(--sand)" :
                        entry.name === "80-89" ? "var(--sage)" :
                        "rgba(141, 186, 133, 0.95)" // higher opacity/bright sage
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Avg Score Trend */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-base font-medium text-text-primary mb-6 m-0">Average Score Trend</h2>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--ink)', borderColor: 'var(--border-hi)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="score" stroke="var(--sage)" strokeWidth={2} dot={{ r: 4, fill: 'var(--surface)', stroke: 'var(--sage)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Funnel */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-base font-medium text-text-primary mb-6 m-0">Pipeline Funnel</h2>
          <div className="flex flex-col h-[200px] justify-between pb-2">
            {funnelData.map((stage, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex justify-between items-end text-xs">
                  <span className="text-text-secondary">{stage.stage}</span>
                  <span className="font-mono text-parchment-muted">{stage.count}</span>
                </div>
                <div className="w-full h-4 bg-surface-2 rounded-sm overflow-hidden flex justify-center">
                  <div 
                    className="h-full rounded-sm transition-all duration-700" 
                    style={{ width: `${stage.percentage}%`, backgroundColor: stage.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signal Consistency */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-base font-medium text-text-primary mb-6 m-0">Signal Consistency</h2>
          <div className="space-y-5">
            <SignalBar label="Semantic Match" value={84} statusText="avg 84 → near target" showBenchmark />
            <SignalBar label="Career Trajectory" value={76} statusText="avg 76 → near target" showBenchmark />
            <SignalBar label="Project Impact" value={68} statusText="avg 68 ↓ below target" showBenchmark />
            <SignalBar label="Learning Velocity" value={61} statusText="avg 61 ↓ low" showBenchmark />
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
}
