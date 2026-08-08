import React, { useState, useEffect } from 'react';
import {
  IndianRupee,
  Calendar,
  Filter,
  Download,
  FileSpreadsheet,
  Printer,
  Sparkles,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { toast } from 'react-toastify';
import revenueService from '../../../../services/revenueService';
import RevenueKpiCards from './RevenueKpiCards';
import RevenueCharts from './RevenueCharts';
import TopCoursesTable from './TopCoursesTable';
import RecentTransactionsTable from './RecentTransactionsTable';
import RevenueInsights from './RevenueInsights';

export default function RevenueAnalytics() {
  const [timeframe, setTimeframe] = useState('30DAYS'); // TODAY | 7DAYS | 30DAYS | 6MONTHS | 1YEAR
  const [analyticsData, setAnalyticsData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRevenueData(timeframe);
  }, [timeframe]);

  const loadRevenueData = async (tf) => {
    setLoading(true);
    try {
      const [aData, tData] = await Promise.all([
        revenueService.getAnalytics(tf),
        revenueService.getTransactions()
      ]);
      setAnalyticsData(aData);
      setTransactions(tData);
    } catch (e) {
      console.error('Error loading revenue data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = (reportType) => {
    toast.success(`Generating & downloading ${reportType} Revenue Report...`);
  };

  return (
    <div className="space-y-8 animate-fadeIn pt-4 border-t border-soft/60">
      
      {/* Revenue Section Header & Filter Controls Bar */}
      <div className="bg-panel border border-soft rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-500 flex items-center justify-center text-white shadow-lg shrink-0">
            <IndianRupee size={26} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-heading flex items-center gap-2">
              Revenue Analytics <Sparkles size={18} className="text-amber-400" />
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Financial performance, paid enrollments, transaction ledger & business insights
            </p>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Admin Reports Dropdown Menu */}
          <button
            onClick={() => handleDownloadReport('Annual PDF')}
            className="px-3.5 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold hover:bg-purple-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} /> Download PDF Report
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-muted flex items-center justify-center gap-2">
          <RefreshCw size={20} className="animate-spin text-purple-400" /> Updating financial analytics...
        </div>
      ) : (
        <>
          {/* 8 KPI Cards */}
          <RevenueKpiCards data={analyticsData} />

          {/* 5 Dynamic Recharts Charts */}
          <RevenueCharts data={analyticsData} />

          {/* Business Insights */}
          <RevenueInsights insights={analyticsData?.insights} />

          {/* Top Revenue Courses Ranked Table */}
          <TopCoursesTable topCourses={analyticsData?.topRevenueCourses} />

          {/* Recent Payment Transactions Table */}
          <RecentTransactionsTable transactions={transactions} />
        </>
      )}

    </div>
  );
}
