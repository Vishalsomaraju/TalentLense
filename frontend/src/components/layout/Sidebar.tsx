import type React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Target, LineChart, Settings } from "lucide-react";
import { ROUTES } from "@/constants";

export function Sidebar(): React.JSX.Element {
  return (
    <aside className="fixed top-12 left-0 w-[200px] h-[calc(100vh-48px)] bg-surface border-r border-border overflow-y-auto py-4 z-[90] max-[900px]:w-full max-[900px]:h-auto max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:flex max-[900px]:px-4 max-[900px]:py-2 max-[900px]:whitespace-nowrap">
      <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.18em] px-4 mb-2 max-[900px]:hidden">
        WORKSPACE
      </div>

      <nav className="flex flex-col max-[900px]:flex-row">
        <NavLink
          to={ROUTES.DASHBOARD}
          className={({ isActive }) =>
            `h-[34px] px-4 flex items-center gap-2.5 text-[13px] cursor-pointer transition-colors duration-120 border-l-2 pl-[14px] max-[900px]:h-auto max-[900px]:px-3 max-[900px]:py-2 max-[900px]:border-l-0 max-[900px]:border-b-2 max-[900px]:pl-3 ${
              isActive
                ? "bg-surface-2 text-text-primary border-l-parchment max-[900px]:border-b-parchment"
                : "text-text-secondary border-l-transparent hover:bg-surface-2 hover:text-text-primary max-[900px]:border-b-transparent"
            }`
          }
        >
          <LayoutDashboard size={14} className="max-[900px]:hidden text-text-muted" /> Dashboard
        </NavLink>
        <NavLink
          to={ROUTES.CANDIDATES}
          className={({ isActive }) =>
            `h-[34px] px-4 flex items-center gap-2.5 text-[13px] cursor-pointer transition-colors duration-120 border-l-2 pl-[14px] max-[900px]:h-auto max-[900px]:px-3 max-[900px]:py-2 max-[900px]:border-l-0 max-[900px]:border-b-2 max-[900px]:pl-3 ${
              isActive
                ? "bg-surface-2 text-text-primary border-l-parchment max-[900px]:border-b-parchment"
                : "text-text-secondary border-l-transparent hover:bg-surface-2 hover:text-text-primary max-[900px]:border-b-transparent"
            }`
          }
        >
          <Users size={14} className="max-[900px]:hidden text-text-muted" /> Candidates
        </NavLink>
        <NavLink
          to={ROUTES.ANALYSIS_NEW}
          className={({ isActive }) =>
            `h-[34px] px-4 flex items-center gap-2.5 text-[13px] cursor-pointer transition-colors duration-120 border-l-2 pl-[14px] max-[900px]:h-auto max-[900px]:px-3 max-[900px]:py-2 max-[900px]:border-l-0 max-[900px]:border-b-2 max-[900px]:pl-3 ${
              isActive
                ? "bg-surface-2 text-text-primary border-l-parchment max-[900px]:border-b-parchment"
                : "text-text-secondary border-l-transparent hover:bg-surface-2 hover:text-text-primary max-[900px]:border-b-transparent"
            }`
          }
        >
          <Target size={14} className="max-[900px]:hidden text-text-muted" /> Analysis
        </NavLink>
        <NavLink
          to={ROUTES.REPORTS}
          className={({ isActive }) =>
            `h-[34px] px-4 flex items-center gap-2.5 text-[13px] cursor-pointer transition-colors duration-120 border-l-2 pl-[14px] max-[900px]:h-auto max-[900px]:px-3 max-[900px]:py-2 max-[900px]:border-l-0 max-[900px]:border-b-2 max-[900px]:pl-3 ${
              isActive
                ? "bg-surface-2 text-text-primary border-l-parchment max-[900px]:border-b-parchment"
                : "text-text-secondary border-l-transparent hover:bg-surface-2 hover:text-text-primary max-[900px]:border-b-transparent"
            }`
          }
        >
          <LineChart size={14} className="max-[900px]:hidden text-text-muted" /> Reports
        </NavLink>
        <NavLink
          to={ROUTES.SETTINGS}
          className={({ isActive }) =>
            `h-[34px] px-4 flex items-center gap-2.5 text-[13px] cursor-pointer transition-colors duration-120 border-l-2 pl-[14px] max-[900px]:h-auto max-[900px]:px-3 max-[900px]:py-2 max-[900px]:border-l-0 max-[900px]:border-b-2 max-[900px]:pl-3 ${
              isActive
                ? "bg-surface-2 text-text-primary border-l-parchment max-[900px]:border-b-parchment"
                : "text-text-secondary border-l-transparent hover:bg-surface-2 hover:text-text-primary max-[900px]:border-b-transparent"
            }`
          }
        >
          <Settings size={14} className="max-[900px]:hidden text-text-muted" /> Settings
        </NavLink>
      </nav>

      <div className="h-px bg-border mx-4 my-4 max-[900px]:hidden" />

      <div className="bg-surface-2 border border-border rounded-[10px] mx-3 p-3 max-[900px]:hidden">
        <div className="flex justify-between font-mono text-[9px]">
          <span className="text-text-muted">Last run</span>
          <span className="text-parchment-muted">2 min ago</span>
        </div>
        <div className="flex justify-between items-baseline mt-1">
          <span className="font-mono text-[9px] text-text-muted">Analyzed</span>
          <span className="font-mono font-light text-sm text-parchment">
            24
          </span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <div className="w-1 h-1 rounded-full bg-sage animate-blink" />
          <span className="font-mono text-[9px] text-sage">Model active</span>
        </div>
      </div>
    </aside>
  );
}
