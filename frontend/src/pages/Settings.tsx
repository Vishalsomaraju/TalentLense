import type React from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";

export default function Settings(): React.JSX.Element {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-end mb-6">
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
          <button className="text-left px-4 py-2 text-sm rounded-lg bg-surface-2 text-text-primary border-l-2 border-parchment">
            General
          </button>
          <button className="text-left px-4 py-2 text-sm rounded-lg text-text-secondary hover:bg-surface-2 border-l-2 border-transparent transition-colors">
            Model Configuration
          </button>
          <button className="text-left px-4 py-2 text-sm rounded-lg text-text-secondary hover:bg-surface-2 border-l-2 border-transparent transition-colors">
            Team & Members
          </button>
          <button className="text-left px-4 py-2 text-sm rounded-lg text-text-secondary hover:bg-surface-2 border-l-2 border-transparent transition-colors">
            Integrations
          </button>
          <button className="text-left px-4 py-2 text-sm rounded-lg text-text-secondary hover:bg-surface-2 border-l-2 border-transparent transition-colors">
            Billing
          </button>
        </nav>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Section: Workspace */}
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

          {/* Section: API Keys */}
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

          {/* Section: Danger Zone */}
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
      </div>
    </DashboardLayout>
  );
}
