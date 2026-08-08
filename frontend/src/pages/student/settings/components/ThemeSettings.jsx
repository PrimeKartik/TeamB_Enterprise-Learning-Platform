import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../../../../context/ThemeContext";

export default function ThemeSettings() {
  const { theme, setTheme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <div className="bg-panel border border-soft rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-heading flex items-center gap-2">
            {isDark ? <Moon size={18} className="text-purple-400" /> : <Sun size={18} className="text-amber-400" />}
            Appearance & Theme Preference
          </h2>
          <p className="text-xs text-muted mt-1">
            Choose between dark mode and light mode for maximum viewing comfort.
          </p>
        </div>

        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition shadow-md ${
            isDark
              ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {isDark ? (
            <>
              <Sun size={16} /> Switch to Light Mode
            </>
          ) : (
            <>
              <Moon size={16} /> Switch to Dark Mode
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div
          onClick={() => setTheme("dark")}
          className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
            isDark ? 'border-primary bg-primary/10 text-heading' : 'border-soft bg-base/50 text-muted hover:text-heading'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-purple-400">
            <Moon size={16} />
          </div>
          <div>
            <p className="text-xs font-bold">Dark Theme</p>
            <p className="text-[10px] text-muted">Deep purple aesthetics</p>
          </div>
        </div>

        <div
          onClick={() => setTheme("light")}
          className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
            !isDark ? 'border-primary bg-primary/10 text-heading' : 'border-soft bg-base/50 text-muted hover:text-heading'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-amber-500">
            <Sun size={16} />
          </div>
          <div>
            <p className="text-xs font-bold">Light Theme</p>
            <p className="text-[10px] text-muted">Clean bright interface</p>
          </div>
        </div>
      </div>
    </div>
  );
}
