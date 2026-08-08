import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  Users,
  PieChart as PieIcon,
  TrendingUp,
  Award,
  HelpCircle,
  Code2,
  Calendar
} from 'lucide-react';

export default function EnrollmentCharts({ data }) {
  const cEnroll = data?.courseEnrollmentChart || [];
  const pDist = data?.studentProgressDistribution || [];
  const daily = data?.dailyActiveStudentsChart || [];
  const trend = data?.courseCompletionTrendChart || [];
  const quizData = data?.quizPerformanceChart || [];
  const radarData = data?.codingPracticeRadar || [];
  const certData = data?.certificatesIssuedChart || [];
  const mEnroll = data?.monthlyEnrollmentsChart || [];

  return (
    <div className="space-y-6">
      
      {/* Row 1: Course Enrollment Bar + Progress Distribution Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Course Enrollment Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-heading flex items-center gap-2">
                <Users size={18} className="text-purple-400" /> Course Enrollment Breakdown
              </h3>
              <p className="text-xs text-muted">Total student enrollments per individual course</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cEnroll} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="course" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="students" fill="#7C3AED" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Progress Distribution Pie Chart (5 cols) */}
        <div className="lg:col-span-5 bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-heading flex items-center gap-2">
              <PieIcon size={18} className="text-pink-400" /> Student Progress Distribution
            </h3>
            <p className="text-xs text-muted">Completion status allocation</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pDist} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                  {pDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#7C3AED'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Daily Active Line + Course Completion Trend Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 3. Daily Active Students Line Chart (6 cols) */}
        <div className="lg:col-span-6 bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-heading flex items-center gap-2">
              <TrendingUp size={18} className="text-cyan-400" /> Daily Active Students (7 Days)
            </h3>
            <p className="text-xs text-muted">Real-time daily active student engagement</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={daily} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Line type="monotone" dataKey="active" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Course Completion Trend Area Chart (6 cols) */}
        <div className="lg:col-span-6 bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-heading flex items-center gap-2">
              <Award size={18} className="text-emerald-400" /> Course Completion Trend
            </h3>
            <p className="text-xs text-muted">Monthly course completion growth trajectory</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="compColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="completions" stroke="#10B981" fillOpacity={1} fill="url(#compColor)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Quiz Performance Bar + Coding Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 5. Quiz Performance Analytics (6 cols) */}
        <div className="lg:col-span-6 bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-heading flex items-center gap-2">
              <HelpCircle size={18} className="text-amber-400" /> Quiz Performance Analytics
            </h3>
            <p className="text-xs text-muted">Average score breakdown across module quizzes</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quizData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="quiz" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="avgScore" fill="#F59E0B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6. Coding Practice Radar Chart (6 cols) */}
        <div className="lg:col-span-6 bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-heading flex items-center gap-2">
              <Code2 size={18} className="text-pink-400" /> Coding Practice Performance Radar
            </h3>
            <p className="text-xs text-muted">Skill proficiency across coding domains</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" fontSize={10} />
                <Radar name="Student Average" dataKey="score" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
                <Tooltip contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
