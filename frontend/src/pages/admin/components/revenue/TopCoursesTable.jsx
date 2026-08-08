import React from 'react';
import { Award, TrendingUp, Users, DollarSign, BookOpen } from 'lucide-react';

export default function TopCoursesTable({ topCourses = [] }) {
  return (
    <div className="bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-heading flex items-center gap-2">
            <Award size={18} className="text-amber-400" /> Top Revenue Generating Courses
          </h3>
          <p className="text-xs text-muted">Ranked performance by gross income generated</p>
        </div>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          5 Active Catalog Leaders
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-base border-b border-soft text-muted uppercase font-bold tracking-wider">
            <tr>
              <th className="px-4 py-3 text-center">Rank</th>
              <th className="px-4 py-3">Course Name</th>
              <th className="px-4 py-3">Instructor</th>
              <th className="px-4 py-3 text-center">Paid Students</th>
              <th className="px-4 py-3 text-right">Revenue</th>
              <th className="px-4 py-3 text-center">Growth</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soft/50 font-sans">
            {topCourses.map((item, idx) => (
              <tr key={idx} className="hover:bg-soft/30 transition">
                <td className="px-4 py-3.5 text-center font-mono font-bold text-heading">
                  {item.rank === 1 && '🥇'}
                  {item.rank === 2 && '🥈'}
                  {item.rank === 3 && '🥉'}
                  {item.rank > 3 && `#${item.rank}`}
                </td>

                <td className="px-4 py-3.5 font-bold text-heading">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-purple-400 shrink-0" />
                    {item.courseName}
                  </div>
                </td>

                <td className="px-4 py-3.5 text-muted font-medium">
                  {item.instructor}
                </td>

                <td className="px-4 py-3.5 text-center font-bold text-purple-300">
                  {item.studentsEnrolled?.toLocaleString()}
                </td>

                <td className="px-4 py-3.5 text-right font-black text-amber-400 font-mono">
                  ₹{item.revenue?.toLocaleString('en-IN')}
                </td>

                <td className="px-4 py-3.5 text-center font-bold text-emerald-400">
                  {item.growth}
                </td>

                <td className="px-4 py-3.5 text-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    {item.status || 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
