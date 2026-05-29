import React, { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";

type ProfileTab = "personal" | "notifications" | "security";

export default function Profile(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<ProfileTab>("personal");

  const renderPersonalInfo = (): React.JSX.Element => (
    <div className="bg-surface border border-border rounded-xl overflow-hidden animate-fade-in">
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
      </div>
    </div>
  );

  const renderNotifications = (): React.JSX.Element => (
    <div className="bg-surface border border-border rounded-xl overflow-hidden animate-fade-in">
      <div className="p-5 border-b border-border">
        <h2 className="text-base font-medium text-text-primary m-0">Notification Preferences</h2>
        <p className="text-xs text-text-secondary mt-1">Control how you want to be notified about candidate activities.</p>
      </div>
      
      <div className="p-8 space-y-8 bg-surface-2">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-4">Email Notifications</h3>
          <div className="space-y-4">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="notif-email-1" className="flex items-start gap-3 cursor-pointer group">
              <div className="mt-0.5 relative flex items-center justify-center w-4 h-4 rounded border border-border bg-ink group-hover:border-parchment-dim transition-colors">
                <input id="notif-email-1" type="checkbox" defaultChecked className="opacity-0 absolute inset-0 cursor-pointer" />
                <div className="w-2 h-2 bg-parchment rounded-sm" />
              </div>
              <div>
                <div className="text-sm text-text-primary">New candidate analysis complete</div>
                <div className="text-xs text-text-secondary mt-0.5">Receive an email when a batch of resumes is finished parsing.</div>
              </div>
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="notif-email-2" className="flex items-start gap-3 cursor-pointer group">
              <div className="mt-0.5 relative flex items-center justify-center w-4 h-4 rounded border border-border bg-ink group-hover:border-parchment-dim transition-colors">
                <input id="notif-email-2" type="checkbox" defaultChecked className="opacity-0 absolute inset-0 cursor-pointer" />
                <div className="w-2 h-2 bg-parchment rounded-sm" />
              </div>
              <div>
                <div className="text-sm text-text-primary">Weekly pipeline summaries</div>
                <div className="text-xs text-text-secondary mt-0.5">A digest of all candidate activity for your open roles.</div>
              </div>
            </label>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-4">Push Notifications</h3>
          <div className="space-y-4">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="notif-push-1" className="flex items-start gap-3 cursor-pointer group">
              <div className="mt-0.5 relative flex items-center justify-center w-4 h-4 rounded border border-border bg-ink group-hover:border-parchment-dim transition-colors">
                <input id="notif-push-1" type="checkbox" defaultChecked className="opacity-0 absolute inset-0 cursor-pointer" />
                <div className="w-2 h-2 bg-parchment rounded-sm" />
              </div>
              <div>
                <div className="text-sm text-text-primary">High-match alerts</div>
                <div className="text-xs text-text-secondary mt-0.5">Get notified immediately when a candidate scores above 90.</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = (): React.JSX.Element => (
    <div className="space-y-6 animate-fade-in">
      <section className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="text-base font-medium text-text-primary m-0">Password</h2>
          <p className="text-xs text-text-secondary mt-1">Update your password associated with this account.</p>
        </div>
        <div className="p-5 space-y-4 bg-surface-2">
          <div>
            <label htmlFor="current-password" className="block text-xs text-text-secondary mb-1.5 uppercase font-mono tracking-wider">Current Password</label>
            <input 
              id="current-password"
              type="password" 
              className="w-full max-w-md bg-ink border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-border-hi transition-colors"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-xs text-text-secondary mb-1.5 uppercase font-mono tracking-wider">New Password</label>
            <input 
              id="new-password"
              type="password" 
              className="w-full max-w-md bg-ink border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-border-hi transition-colors"
            />
          </div>
          <button className="bg-surface-3 border border-border text-text-primary text-sm px-4 py-2 rounded-lg hover:border-parchment-dim transition-colors mt-2">
            Update Password
          </button>
        </div>
      </section>

      <section className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="text-base font-medium text-text-primary m-0">Recent Login Activity</h2>
          <p className="text-xs text-text-secondary mt-1">Last 3 sessions from your account.</p>
        </div>
        <div className="p-0 bg-surface-2 divide-y divide-border">
          {[
            { device: "Mac OS • Chrome", location: "San Francisco, CA", time: "Active Now", ip: "192.168.1.1", current: true },
            { device: "Mac OS • Safari", location: "San Francisco, CA", time: "2 days ago", ip: "192.168.1.1", current: false },
            { device: "iOS • Chrome", location: "Los Angeles, CA", time: "1 week ago", ip: "172.16.0.4", current: false },
          ].map((session, i) => (
            <div key={i} className="flex justify-between items-center p-4">
              <div>
                <div className="text-sm font-medium text-text-primary flex items-center gap-2">
                  {session.device}
                  {session.current && <span className="bg-sage/20 text-sage text-[10px] uppercase font-mono px-1.5 py-0.5 rounded">Current</span>}
                </div>
                <div className="text-xs text-text-secondary mt-0.5">{session.location} • {session.ip}</div>
              </div>
              <div className="font-mono text-xs text-text-muted">{session.time}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end mb-6 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4">
        <div>
          <h1 className="text-2xl font-light text-parchment m-0">Your Profile</h1>
          <p className="text-sm text-text-secondary mt-1 m-0">
            Manage your personal information and notification preferences.
          </p>
        </div>
        <button className="bg-sage text-ink font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          Save Profile
        </button>
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-8 max-[900px]:grid-cols-1">
        {/* Profile Navigation */}
        <nav className="flex flex-col gap-1">
          {[
            { id: "personal", label: "Personal Info" },
            { id: "notifications", label: "Notifications" },
            { id: "security", label: "Security" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as ProfileTab); }}
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

        {/* Profile Content */}
        <div className="min-h-[500px]">
          {activeTab === "personal" && renderPersonalInfo()}
          {activeTab === "notifications" && renderNotifications()}
          {activeTab === "security" && renderSecurity()}
        </div>
      </div>
    </DashboardLayout>
  );
}
