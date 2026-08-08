import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { useThemeContext } from "../../../../context/ThemeContext";

export default function CourseProgressChart({ courses = [] }) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const data = courses.map((c) => ({
    name: c.courseTitle.length > 14 ? `${c.courseTitle.slice(0, 14)}…` : c.courseTitle,
    progress: c.progress,
  }));

  return (
    <div className="bg-panel border border-soft rounded-2xl shadow-xl p-6">
      <h2 className="text-lg font-bold text-heading mb-5">
        Progress Breakdown by Course
      </h2>

      {data.length === 0 ? (
        <p className="text-muted text-xs py-12 text-center">
          Enroll in a course to see your progress chart here.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb"} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: isDark ? "rgba(255,255,255,0.7)" : "#6b7280" }} />
            <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: isDark ? "rgba(255,255,255,0.7)" : "#6b7280" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#170b26" : "#ffffff",
                borderColor: isDark ? "rgba(255,255,255,0.15)" : "#e5e7eb",
                borderRadius: "12px",
                color: isDark ? "#ffffff" : "#1f2937",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="progress" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.progress === 100 ? "#10b981" : "#a855f7"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
