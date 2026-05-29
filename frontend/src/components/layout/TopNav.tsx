import type React from "react";
import { Link } from "react-router-dom";
import { Search, RefreshCw, Bell } from "lucide-react";

export function TopNav(): React.JSX.Element {
  return (
    <nav className="fixed top-0 left-0 w-full h-12 bg-[#090a0d]/90 backdrop-blur-md border-b border-border flex items-center justify-between z-[100]">
      <div className="w-[200px] flex items-center pl-4 gap-2">
        <div className="w-2 h-2 rounded-full bg-parchment" />
        <Link to="/" className="text-[15px] font-medium text-parchment">
          TalentLens
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[480px]">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted flex items-center">
            <Search size={14} />
          </span>
          <input
            type="text"
            className="w-full h-8 bg-surface-2 border border-border rounded-lg pl-8 pr-3 font-sans text-xs text-text-primary outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-border-hi"
            placeholder="Search candidates, skills, roles…"
          />
        </div>
      </div>

      <div className="flex items-center pr-4">
        <button className="bg-transparent border-none text-text-secondary text-xs cursor-pointer mr-4 hover:text-text-primary transition-colors flex items-center gap-1.5">
          <RefreshCw size={12} /> Refresh
        </button>
        <div className="relative mr-4 cursor-pointer text-text-secondary hover:text-text-primary transition-colors flex items-center">
          <Bell size={16} />
          <div className="absolute -top-[2px] -right-[2px] w-2 h-2 bg-rose rounded-full border border-[#090a0d]/90" />
        </div>
        <Link to="/profile" className="w-7 h-7 rounded-full bg-surface-3 flex items-center justify-center text-[10px] text-parchment font-medium cursor-pointer hover:opacity-80 transition-opacity no-underline">
          AD
        </Link>
      </div>
    </nav>
  );
}
