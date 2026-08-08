import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, FileSpreadsheet, Printer, CheckCircle2, Clock, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

export default function RecentTransactionsTable({ transactions = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.courseName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || t.paymentStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const paginatedData = filteredTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleExportCSV = () => {
    const headers = "Transaction ID,Student Name,Course Name,Amount,Payment Method,Payment Status,Date\n";
    const rows = filteredTransactions.map(t =>
      `${t.transactionId},"${t.studentName}","${t.courseName}",${t.amount},${t.paymentMethod},${t.paymentStatus},${t.date}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillSphere_Transactions_${Date.now()}.csv`;
    a.click();
    toast.success("Transactions CSV exported successfully!");
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header & Export Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-heading">Recent Payment Transactions</h3>
          <p className="text-xs text-muted">Real-time ledger of incoming student course fees</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-base border border-soft text-heading rounded-xl text-xs font-semibold hover:bg-soft transition flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet size={14} className="text-emerald-400" /> Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="px-3 py-1.5 bg-base border border-soft text-heading rounded-xl text-xs font-semibold hover:bg-soft transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer size={14} className="text-purple-400" /> Export PDF
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:w-64">
          <Search size={14} className="absolute left-3.5 top-2.5 text-muted" />
          <input
            type="text"
            placeholder="Search by student, ID, or course..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-3 py-1.5 bg-base border border-soft rounded-xl text-xs text-heading outline-none focus:border-purple-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="bg-base border border-soft text-heading rounded-xl px-3 py-1.5 text-xs font-medium outline-none focus:border-purple-500 cursor-pointer"
        >
          <option value="ALL">All Payment Statuses</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
          <option value="REFUNDED">REFUNDED</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-base border-b border-soft text-muted uppercase font-bold tracking-wider">
            <tr>
              <th className="px-4 py-3">Txn ID</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Course Purchased</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3">Payment Method</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soft/50 font-sans">
            {paginatedData.map((t, idx) => (
              <tr key={idx} className="hover:bg-soft/30 transition">
                <td className="px-4 py-3.5 font-mono font-bold text-purple-300">
                  {t.transactionId}
                </td>
                <td className="px-4 py-3.5 font-bold text-heading">
                  {t.studentName}
                </td>
                <td className="px-4 py-3.5 text-muted">
                  {t.courseName}
                </td>
                <td className="px-4 py-3.5 text-right font-black text-amber-400 font-mono">
                  ₹{t.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3.5 text-muted font-medium">
                  {t.paymentMethod}
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 w-24 mx-auto ${
                    t.paymentStatus === 'COMPLETED'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : t.paymentStatus === 'PENDING'
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                  }`}>
                    {t.paymentStatus === 'COMPLETED' && <CheckCircle2 size={11} />}
                    {t.paymentStatus === 'PENDING' && <Clock size={11} />}
                    {t.paymentStatus === 'REFUNDED' && <RefreshCw size={11} />}
                    {t.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right text-muted font-mono text-[11px]">
                  {t.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2 text-xs text-muted">
        <span>Showing {paginatedData.length} of {filteredTransactions.length} transactions</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg bg-base border border-soft text-muted hover:text-heading disabled:opacity-40 transition cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-bold text-heading">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg bg-base border border-soft text-muted hover:text-heading disabled:opacity-40 transition cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
