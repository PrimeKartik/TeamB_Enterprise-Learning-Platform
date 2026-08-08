import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieIcon, Calendar, Layers } from 'lucide-react';

export default function RevenueCharts({ data }) {
  const monthlyData = data?.monthlyRevenueChart || [];
  const courseData = data?.revenueByCourseChart || [];
  const distData = data?.revenueDistributionChart || [];
  const weeklyData = data?.weeklyRevenueChart || [];
  const evsData = data?.enrollmentVsRevenueChart || [];

  return (
    <div className="space-y-6">
      {/* Row 1: Monthly Revenue Smooth Line + Revenue Distribution Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Monthly Revenue Smooth Line Chart (7 cols) */}
        <div className="lg:col-span-7 bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-heading flex items-center gap-2">
                <TrendingUp size={18} className="text-purple-400" /> Monthly Revenue Trend (12 Months)
              </h3>
              <p className="text-xs text-muted">Smooth trajectory of monthly gross income (₹)</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/30 text-purple-300">
              Avg ₹38.5k/mo
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#A855F7" strokeWidth={3} dot={{ r: 4, fill: '#EC4899' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Revenue Distribution Doughnut / Pie Chart (5 cols) */}
        <div className="lg:col-span-5 bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-heading flex items-center gap-2">
              <PieIcon size={18} className="text-pink-400" /> Revenue Distribution Channel
            </h3>
            <p className="text-xs text-muted">Income allocation across courses & revenue streams</p>
          </div>

          <div className="h-44 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {distData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#7C3AED'} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Revenue']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Color Legend Breakdown List */}
          <div className="space-y-2 pt-2 border-t border-soft">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted block mb-1">
              Color Legend & Income Share:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {distData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-base border border-soft">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color || '#7C3AED' }}
                  />
                  <div className="truncate">
                    <span className="font-bold text-heading text-[11px] block truncate">{item.name}</span>
                    <span className="text-[10px] text-muted font-mono font-semibold">₹{Number(item.value).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Revenue by Course Bar + Weekly Revenue Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 2. Revenue by Course Bar Chart (6 cols) */}
        <div className="lg:col-span-6 bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-heading flex items-center gap-2">
              <BarChart3 size={18} className="text-emerald-400" /> Revenue by Course (₹)
            </h3>
            <p className="text-xs text-muted">Gross earnings per individual catalog course</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="course" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Course Revenue']}
                />
                <Bar dataKey="revenue" fill="#7C3AED" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Weekly Revenue Area Chart (6 cols) */}
        <div className="lg:col-span-6 bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-heading flex items-center gap-2">
              <Calendar size={18} className="text-cyan-400" /> Weekly Daily Revenue (₹)
            </h3>
            <p className="text-xs text-muted">Daily breakdown from Monday to Sunday</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Daily Income']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#EC4899" fillOpacity={1} fill="url(#areaColor)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Combined Enrollment vs Revenue Bar + Line Chart */}
      <div className="bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-heading flex items-center gap-2">
              <Layers size={18} className="text-purple-400" /> Enrollment vs Revenue Comparison
            </h3>
            <p className="text-xs text-muted">Comparing student signup growth (Bar) against revenue volume (Line)</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={evsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#EC4899" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A102B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="enrollments" name="Paid Enrollments" fill="#7C3AED" radius={[6, 6, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#EC4899" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
