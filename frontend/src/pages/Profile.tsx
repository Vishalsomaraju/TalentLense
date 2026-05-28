import type React from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";

export default function Profile(): React.JSX.Element {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-2xl font-light text-parchment m-0 mb-6">
          Your Profile
        </h1>

        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {/* Header/Banner */}
          <div className="h-32 bg-surface-2 border-b border-border relative">
            <div className="absolute -bottom-10 left-8">
              <div className="w-20 h-20 rounded-full bg-surface-3 border-4 border-surface flex items-center justify-center text-xl text-parchment font-medium shadow-lg">
                AD
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="pt-14 px-8 pb-8 border-b border-border">
            <h2 className="text-xl font-medium text-text-primary m-0">
              Alex Developer
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              alex@talentlens.ai • Admin
            </p>
          </div>

          {/* Settings Form */}
          <div className="p-8 space-y-6 bg-surface-2">
            <div className="grid grid-cols-2 gap-6 max-[600px]:grid-cols-1">
              <div>
                <label htmlFor="first-name" className="block text-xs text-text-secondary mb-1.5 uppercase font-mono tracking-wider">
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  defaultValue="Alex"
                  className="w-full bg-ink border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-border-hi transition-colors"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-xs text-text-secondary mb-1.5 uppercase font-mono tracking-wider">
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  defaultValue="Developer"
                  className="w-full bg-ink border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-border-hi transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs text-text-secondary mb-1.5 uppercase font-mono tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                defaultValue="alex@talentlens.ai"
                className="w-full max-w-md bg-ink border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-border-hi transition-colors"
              />
            </div>

            <div>
              <label htmlFor="timezone" className="block text-xs text-text-secondary mb-1.5 uppercase font-mono tracking-wider">
                Timezone
              </label>
              <select id="timezone" className="w-full max-w-md bg-ink border border-border text-text-primary text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
                <option>Pacific Time (PT)</option>
                <option>Eastern Time (ET)</option>
                <option>Coordinated Universal Time (UTC)</option>
              </select>
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium text-text-primary mb-3">
                Notification Preferences
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-parchment w-4 h-4"
                  />
                  <span className="text-sm text-text-secondary">
                    Email me when a new candidate analysis is complete
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-parchment w-4 h-4"
                  />
                  <span className="text-sm text-text-secondary">
                    Send weekly pipeline summaries
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="p-4 px-8 border-t border-border bg-surface flex justify-end gap-3">
            <button className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
              Cancel
            </button>
            <button className="bg-parchment text-ink font-medium px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
