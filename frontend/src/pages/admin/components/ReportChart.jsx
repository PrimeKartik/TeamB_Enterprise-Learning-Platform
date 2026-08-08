import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useThemeContext } from "../../../context/ThemeContext";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

export default function ReportChart({
  enrollments = [],
  completion = [],
  certificates = [],
}) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const chartGridStroke = isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb";
  const chartTextColor = isDark ? "rgba(255,255,255,0.7)" : "#6b7280";
  const tooltipStyle = {
    backgroundColor: isDark ? "#170b26" : "#ffffff",
    borderColor: isDark ? "rgba(255,255,255,0.15)" : "#e5e7eb",
    borderRadius: "12px",
    color: isDark ? "#ffffff" : "#1f2937",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Enrollment Chart */}

      <div className="bg-panel border border-soft rounded-2xl shadow-xl p-6">

        <h2 className="text-lg font-bold text-heading mb-5">
          Monthly Enrollments
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={enrollments}>

            <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />

            <XAxis dataKey="month" tick={{ fontSize: 12, fill: chartTextColor }} />

            <YAxis tick={{ fontSize: 12, fill: chartTextColor }} />

            <Tooltip contentStyle={tooltipStyle} />

            <Bar
              dataKey="students"
              fill="#7C3AED"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Completion */}

      <div className="bg-panel border border-soft rounded-2xl shadow-xl p-6">

        <h2 className="text-lg font-bold text-heading mb-5">
          Course Completion
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={completion}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {completion.map((item, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                  stroke={chartGridStroke}
                />
              ))}
            </Pie>

            <Tooltip contentStyle={tooltipStyle} />

            <Legend wrapperStyle={{ color: chartTextColor }} />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Certificate Chart */}

      <div className="bg-panel border border-soft rounded-2xl shadow-xl p-6 xl:col-span-2">

        <h2 className="text-lg font-bold text-heading mb-5">
          Certificates Issued
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={certificates}>

            <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />

            <XAxis dataKey="month" tick={{ fontSize: 12, fill: chartTextColor }} />

            <YAxis tick={{ fontSize: 12, fill: chartTextColor }} />

            <Tooltip contentStyle={tooltipStyle} />

            <Legend wrapperStyle={{ color: chartTextColor }} />

            <Line
              type="monotone"
              dataKey="issued"
              stroke="#EC4899"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}