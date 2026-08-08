import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useThemeContext } from "../../../../context/ThemeContext";

const COLORS = ["#a855f7", "#ec4899"];

export default function ProgressChart({ progress = 75 }) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const data = [
    {
      name: "Completed",
      value: progress,
    },
    {
      name: "Remaining",
      value: Math.max(0, 100 - progress),
    },
  ];

  return (
    <div className="bg-panel border border-soft rounded-2xl shadow-xl p-6">
      <h2 className="text-lg font-bold text-heading mb-4">
        Overall Completion Rate
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={75}
            outerRadius={105}
            dataKey="value"
            paddingAngle={4}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                stroke={isDark ? "rgba(255,255,255,0.05)" : "#e5e7eb"}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#170b26" : "#ffffff",
              borderColor: isDark ? "rgba(255,255,255,0.15)" : "#e5e7eb",
              borderRadius: "12px",
              color: isDark ? "#ffffff" : "#1f2937",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 text-xs text-muted font-medium pt-2">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500" /> Completed ({progress}%)
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-pink-500" /> Remaining ({100 - progress}%)
        </span>
      </div>
    </div>
  );
}