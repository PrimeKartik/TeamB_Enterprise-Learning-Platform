import { Sun, Moon } from 'lucide-react'
import { useThemeContext } from "../context/ThemeContext";

export default function ThemeToggle({ showLabel = false }) {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="px-3 py-1.5 rounded-xl border border-soft bg-panel text-heading hover:opacity-90 transition-all flex items-center gap-2 text-xs font-semibold shadow-sm cursor-pointer"
    >
      {isDark ? (
        <>
          <Moon size={15} className="text-purple-400" />
          <span className={showLabel ? "inline" : "hidden sm:inline"}>🌙 Dark Mode</span>
        </>
      ) : (
        <>
          <Sun size={15} className="text-amber-500" />
          <span className={showLabel ? "inline" : "hidden sm:inline"}>☀️ Light Mode</span>
        </>
      )}
    </button>
  );
}

