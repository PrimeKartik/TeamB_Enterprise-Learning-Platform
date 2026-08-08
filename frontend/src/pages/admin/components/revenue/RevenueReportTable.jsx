import React, { useState } from 'react';
import { BookOpen, DollarSign, Download, FileSpreadsheet, Printer, Search } from 'lucide-react';
import { toast } from 'react-toastify';

export default function RevenueReportTable({ reportData = [] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = reportData.filter(item =>
    (item.courseName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = "Course Name,Course Price,Total Enrollments,Paid Enrollments,Revenue Generated,Refunds,Net Revenue\n";
    const rows = filtered.map(r =>
      `"${r.courseName}",${r.coursePrice},${r.totalEnrollments},${r.paidEnrollments},${r.revenueGenerated},${r.refunds},${r.netRevenue}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillSphere_Course_Revenue_Report_${Date.now()}.csv`;
    a.click();
    toast.success('Revenue Report CSV downloaded');
  };

  return (
    <div className="bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-heading flex items-center gap-2">
            <BookOpen size={18} className="text-purple-400" /> Course Revenue Ledger & Report
          </h3>
          <p className="text-xs text-muted">Real-time breakdown of course prices, enrollments, refunds & net income</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-base border border-soft text-heading rounded-xl text-xs font-semibold hover:bg-soft transition flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet size={14} className="text-emerald-400" /> Export Ledger CSV
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xs">
        <Search size={14} className="absolute left-3.5 top-2.5 text-muted" />
        <input
          type="text"
          placeholder="Filter courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-base border border-soft rounded-xl text-xs text-heading outline-none focus:border-purple-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-base border-b border-soft text-muted uppercase font-bold tracking-wider">
            <tr>
              <th className="px-4 py-3">Course Name</th>
              <th className="px-4 py-3 text-right">Course Price</th>
              <th className="px-4 py-3 text-center">Total Enrollments</th>
              <th className="px-4 py-3 text-center">Paid Enrollments</th>
              <th className="px-4 py-3 text-right">Revenue Generated</th>
              <th className="px-4 py-3 text-right">Refunds</th>
              <th className="px-4 py-3 text-right">Net Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soft/50 font-sans">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted italic">
                  No courses found in database
                </td>
              </tr>
            ) : (
              filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-soft/30 transition">
                  <td className="px-4 py-3.5 font-bold text-heading">
                    {item.courseName}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-semibold text-purple-300">
                    {item.coursePrice === 0 ? 'Free (₹0)' : `₹${Number(item.coursePrice).toLocaleString('en-IN')}`}
                  </td>
                  <td className="px-4 py-3.5 text-center font-bold text-heading">
                    {item.totalEnrollments}
                  </td>
                  <td className="px-4 py-3.5 text-center font-bold text-emerald-400">
                    {item.paidEnrollments}
                  </td>
                  <td className="px-4 py-3.5 text-right font-black text-amber-400 font-mono">
                    ₹{Number(item.revenueGenerated || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 text-right text-rose-400 font-mono">
                    ₹{Number(item.refunds || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 text-right font-black text-emerald-400 font-mono">
                    ₹{Number(item.netRevenue || 0).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
