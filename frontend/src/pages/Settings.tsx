import React, { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { useAnalysis } from "@/context/AnalysisContext";
import { AnalysisWeights } from "@/types";

type SettingsTab = "general" | "model" | "team" | "integrations" | "billing";

export default function Settings(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  const { weights, setWeights } = useAnalysis();

  const handleWeightChange = (key: keyof AnalysisWeights, newVal: number) => {
    const remaining = 1 - newVal;
    const others = Object.keys(weights).filter(k => k !== key) as (keyof AnalysisWeights)[];
    const currentOtherSum = others.reduce((s, k) => s + weights[k], 0);
    const normalized = { ...weights, [key]: newVal };
    if (currentOtherSum > 0) {
      others.forEach(k => {
        normalized[k] = (weights[k] / currentOtherSum) * remaining;
      });
    } else {
      others.forEach(k => { normalized[k] = remaining / 3; });
    }
    setWeights(normalized);
  };

  const renderGeneral = (): React.JSX.Element => (
    <div className="space-y-6 animate-fade-in">
      <section className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="text-base font-medium text-text-primary m-0">Workspace Details</h2>
          <p className="text-xs text-text-secondary mt-1">Update your company info and workspace identity.</p>
        </div>
        <div className="p-5 space-y-4 bg-surface-2">
          <div>
            <label htmlFor="workspace-name" className="block text-xs text-text-secondary mb-1.5 uppercase font-mono tracking-wider">Workspace Name</label>
            <input 
              id="workspace-name"
              type="text" 
              defaultValue="Acme Corp" 
              className="w-full max-w-md bg-ink border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-border-hi transition-colors"
            />
          </div>
          <div>
            <label htmlFor="domain" className="block text-xs text-text-secondary mb-1.5 uppercase font-mono tracking-wider">Domain</label>
            <input 
              id="domain"
              type="text" 
              defaultValue="acme.talentlens.ai" 
              className="w-full max-w-md bg-ink border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-border-hi transition-colors"
              disabled
            />
          </div>
        </div>
      </section>

      <section className="bg-surface border border-rose/30 rounded-xl overflow-hidden">
        <div className="p-5">
          <h2 className="text-base font-medium text-rose m-0">Danger Zone</h2>
          <p className="text-xs text-text-secondary mt-1 mb-4">Irreversible actions for your workspace.</p>
          
          <div className="flex justify-between items-center border border-rose/20 bg-rose/5 rounded-lg p-4">
            <div>
              <div className="text-sm font-medium text-text-primary">Delete Workspace</div>
              <div className="text-xs text-text-secondary mt-1">Permanently delete your workspace and all candidate data.</div>
            </div>
            <button className="bg-rose text-ink font-medium px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
              Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderModelConfig = (): React.JSX.Element => {
    const totalPercentage = Math.round((weights.semantic + weights.trajectory + weights.impact + weights.velocity) * 100);
    const isExactSum = totalPercentage === 100;

    return (
      <div className="space-y-6 animate-fade-in">
        <section className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-5 border-b border-border flex justify-between items-start">
            <div>
              <h2 className="text-base font-medium text-text-primary m-0">Signal Weights</h2>
              <p className="text-xs text-text-secondary mt-1">Adjust the importance of different signals. Rankings will update live.</p>
            </div>
            <div className={`font-mono text-xs ${isExactSum ? 'text-sage bg-[rgba(141,186,133,0.1)]' : 'text-sand bg-[rgba(235,210,136,0.1)]'} px-2 py-1 rounded`}>
              Total: {isExactSum ? '100%' : '~100%'}
            </div>
          </div>
          <div className="p-6 space-y-8 bg-surface-2">
            {[
              { key: "semantic", label: "Semantic Match", color: "sage" },
              { key: "trajectory", label: "Career Trajectory", color: "parchment" },
              { key: "impact", label: "Project Impact", color: "sand" },
              { key: "velocity", label: "Learning Velocity", color: "rose" },
            ].map((slider) => {
              const val = weights[slider.key as keyof AnalysisWeights];
              const pct = Math.round(val * 100);
              return (
                <div key={slider.key}>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-text-primary">{slider.label}</label>
                    <span className={`font-mono text-xs text-${slider.color}`}>{pct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={pct}
                    onChange={(e) => { handleWeightChange(slider.key as keyof AnalysisWeights, parseInt(e.target.value) / 100); }}
                    className={`w-full accent-${slider.color}`}
                  />
                </div>
              );
            })}
            
            <div className="pt-4 border-t border-border flex justify-end">
              <button 
                type="button"
                onClick={() => setWeights({ semantic: 0.35, trajectory: 0.25, impact: 0.25, velocity: 0.15 })}
                className="text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none"
              >
                Reset to defaults
              </button>
            </div>
          </div>
        </section>

      <section className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="text-base font-medium text-text-primary m-0">Base Model</h2>
          <p className="text-xs text-text-secondary mt-1">Select the underlying LLM for semantic embeddings.</p>
        </div>
        <div className="p-5 bg-surface-2">
          <select className="w-full max-w-md bg-ink border border-border text-text-primary text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
            <option>GPT-4o (OpenAI)</option>
            <option>Claude 3.5 Sonnet (Anthropic)</option>
            <option>Gemini 1.5 Pro (Google)</option>
          </select>
        </div>
      </section>
    </div>
  );
};

  const renderTeam = (): React.JSX.Element => (
    <div className="space-y-6 animate-fade-in">
      <section className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border flex justify-between items-center">
          <div>
            <h2 className="text-base font-medium text-text-primary m-0">Team Members</h2>
            <p className="text-xs text-text-secondary mt-1">Manage who has access to this workspace.</p>
          </div>
          <button className="bg-parchment text-ink font-medium px-4 py-2 rounded-lg text-sm hover:bg-parchment-dim transition-colors">
            Invite Member
          </button>
        </div>
        <div className="p-0 bg-surface-2 divide-y divide-border">
          {[
            { name: "Alex Developer", email: "alex@talentlens.ai", role: "Admin" },
            { name: "Sarah Connor", email: "sarah@talentlens.ai", role: "Recruiter" },
            { name: "John Smith", email: "john@talentlens.ai", role: "Hiring Manager" },
          ].map((user, i) => (
            <div key={i} className="flex justify-between items-center p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center text-[10px] text-parchment font-medium">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{user.name}</div>
                  <div className="text-xs text-text-secondary">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-text-muted bg-surface py-1 px-2 rounded border border-border">{user.role}</span>
                <button className="text-text-secondary hover:text-rose transition-colors text-xs">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderIntegrations = (): React.JSX.Element => (
    <div className="space-y-6 animate-fade-in">
      <section className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border flex justify-between items-center">
          <div>
            <h2 className="text-base font-medium text-text-primary m-0">API Keys</h2>
            <p className="text-xs text-text-secondary mt-1">Manage API keys for external integrations.</p>
          </div>
          <button className="bg-surface-2 border border-border text-text-secondary px-3 py-1.5 rounded-lg text-xs hover:text-text-primary transition-colors">
            Generate New Key
          </button>
        </div>
        <div className="p-0 bg-surface-2">
          <div className="flex justify-between items-center p-4 border-b border-border last:border-0">
            <div>
              <div className="text-sm font-medium text-text-primary">Production Key</div>
              <div className="font-mono text-xs text-text-muted mt-1">Created May 12, 2025 • Last used 2h ago</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-mono text-xs bg-ink px-2 py-1 rounded border border-border">tl_live_*******************</div>
              <button className="text-text-secondary hover:text-text-primary">Copy</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderBilling = (): React.JSX.Element => (
    <div className="h-[400px] flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="text-4xl mb-4 opacity-20">💳</div>
      <h2 className="text-xl font-light text-text-primary mb-2">Billing Dashboard</h2>
      <p className="text-sm text-text-secondary max-w-sm">
        Billing capabilities will be activated when you upgrade from the trial tier. Coming soon.
      </p>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end mb-6 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4">
        <div>
          <h1 className="text-2xl font-light text-parchment m-0">Settings</h1>
          <p className="text-sm text-text-secondary mt-1 m-0">
            Manage your workspace, models, and integrations.
          </p>
        </div>
        <button className="bg-sage text-ink font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-8 max-[900px]:grid-cols-1">
        {/* Settings Navigation */}
        <nav className="flex flex-col gap-1">
          {[
            { id: "general", label: "General" },
            { id: "model", label: "Model Configuration" },
            { id: "team", label: "Team & Members" },
            { id: "integrations", label: "Integrations" },
            { id: "billing", label: "Billing" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as SettingsTab); }}
              className={`text-left px-4 py-2 text-sm rounded-lg transition-colors border-l-2 ${
                activeTab === tab.id
                  ? "bg-surface-2 text-text-primary border-parchment"
                  : "text-text-secondary hover:bg-surface-2 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Settings Content */}
        <div className="min-h-[500px]">
          {activeTab === "general" && renderGeneral()}
          {activeTab === "model" && renderModelConfig()}
          {activeTab === "team" && renderTeam()}
          {activeTab === "integrations" && renderIntegrations()}
          {activeTab === "billing" && renderBilling()}
        </div>
      </div>
    </DashboardLayout>
  );
}
