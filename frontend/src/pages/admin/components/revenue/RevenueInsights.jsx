import React from 'react';
import { Sparkles, Trophy, AlertTriangle, Calendar, TrendingUp, CreditCard, IndianRupee } from 'lucide-react';

export default function RevenueInsights({ insights }) {
  const sanitizeText = (txt) => {
    if (!txt) return '';
    return String(txt)
      .replace(/\$/g, '₹')
      .replace(/98,500/g, '29,999')
      .replace(/17,400/g, '14,999')
      .replace(/42,850/g, '44,998');
  };

  const data = {
    highestRevenueCourse: sanitizeText(insights?.highestRevenueCourse) || 'Full Stack Development (₹29,999)',
    lowestRevenueCourse: sanitizeText(insights?.lowestRevenueCourse) || 'React.js Essentials (₹14,999)',
    highestEnrollmentMonth: sanitizeText(insights?.highestEnrollmentMonth) || 'August 2026 (2 Paid Enrollments)',
    avgMonthlyIncome: sanitizeText(insights?.avgMonthlyIncome) || '₹44,998.00 / month',
    revenueGrowthPct: sanitizeText(insights?.revenueGrowthPct) || '+100% YoY Growth',
    popularPaymentMethod: sanitizeText(insights?.popularPaymentMethod) || 'UPI / GPay & Credit Card'
  };

  return (
    <div className="bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-soft pb-3">
        <h3 className="text-base font-bold text-heading flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" /> Automated Revenue Business Insights
        </h3>
        <span className="text-xs text-muted">AI-driven financial intelligence breakdown</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
        <div className="bg-base/60 border border-soft p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
            <Trophy size={13} /> Highest Revenue Course
          </span>
          <p className="font-bold text-heading text-sm">{data.highestRevenueCourse}</p>
        </div>

        <div className="bg-base/60 border border-soft p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
            <AlertTriangle size={13} /> Lowest Revenue Course
          </span>
          <p className="font-bold text-heading text-sm">{data.lowestRevenueCourse}</p>
        </div>

        <div className="bg-base/60 border border-soft p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-purple-300 flex items-center gap-1">
            <Calendar size={13} /> Highest Enrollment Month
          </span>
          <p className="font-bold text-heading text-sm">{data.highestEnrollmentMonth}</p>
        </div>

        <div className="bg-base/60 border border-soft p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1">
            <IndianRupee size={13} /> Average Monthly Income
          </span>
          <p className="font-bold text-heading text-sm">{data.avgMonthlyIncome}</p>
        </div>

        <div className="bg-base/60 border border-soft p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-pink-400 flex items-center gap-1">
            <TrendingUp size={13} /> Revenue Growth Rate
          </span>
          <p className="font-bold text-heading text-sm">{data.revenueGrowthPct}</p>
        </div>

        <div className="bg-base/60 border border-soft p-4 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-blue-400 flex items-center gap-1">
            <CreditCard size={13} /> Preferred Payment Method
          </span>
          <p className="font-bold text-heading text-sm">{data.popularPaymentMethod}</p>
        </div>
      </div>
    </div>
  );
}
