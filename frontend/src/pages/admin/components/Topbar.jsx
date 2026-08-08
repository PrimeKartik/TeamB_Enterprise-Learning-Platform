import { Search, Bell, UserCircle, Shield, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../../../components/ThemeToggle";

export default function Topbar({
  title = "Dashboard",
  adminName = "SkillSphere Admin",
}) {
  const [search, setSearch] = useState("");

  return (
    <header className="bg-panel border-b border-soft h-20 flex items-center justify-between px-8 text-heading">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-heading">
          {title}
        </h1>
        <p className="text-muted text-xs mt-0.5">
          SkillSphere System Control · Welcome back, <strong className="text-heading">{adminName}</strong>
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="px-3.5 py-2 rounded-xl bg-base border border-soft text-xs font-semibold text-heading hover:bg-soft transition flex items-center gap-1.5"
          title="Return to Student Portal"
        >
          <ArrowLeft size={14} /> Student View
        </Link>

        <ThemeToggle />

        {/* Admin Badge */}
        <div className="flex items-center gap-3 bg-base/80 border border-soft px-3.5 py-1.5 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white">
            <Shield size={16} />
          </div>
          <div>
            <p className="font-bold text-xs text-heading leading-tight">{adminName}</p>
            <p className="text-[10px] text-purple-400 font-mono">SUPER_ADMIN</p>
          </div>
        </div>
      </div>
    </header>
  );
}