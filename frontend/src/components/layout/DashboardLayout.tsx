import type React from "react";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps): React.JSX.Element {
  return (
    <div className="min-h-screen bg-ink text-text-primary font-sans">
      <TopNav />
      <Sidebar />
      <main className="ml-[200px] mt-[48px] p-5 max-[900px]:ml-0 max-[900px]:mt-[94px]">
        {children}
      </main>
    </div>
  );
}
