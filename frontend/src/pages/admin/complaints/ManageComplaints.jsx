import React, { useState, useEffect } from 'react';
import { LifeBuoy, AlertCircle, Clock, CheckCircle2, MessageSquare, Send, Sparkles, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../../api/client';

export default function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Pending');
  const [ticketPriority, setTicketPriority] = useState('Medium');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadAllComplaints();
  }, []);

  const loadAllComplaints = async () => {
    try {
      setLoading(true);
      const res = await api.get('/complaints/admin/all');
      setComplaints(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenTicket = (t) => {
    setSelectedTicket(t);
    setReplyText(t.adminReply || '');
    setTicketStatus(t.status || 'Pending');
    setTicketPriority(t.priority || 'Medium');
  };

  const handleUpdateTicket = async () => {
    if (!selectedTicket) return;
    try {
      setUpdating(true);
      const res = await api.patch(`/complaints/admin/${selectedTicket.id}`, {
        status: ticketStatus,
        priority: ticketPriority,
        adminReply: replyText
      });
      toast.success('Support ticket updated successfully!');
      setSelectedTicket(res.data);
      loadAllComplaints();
    } catch (err) {
      toast.error('Failed to update support ticket.');
    } finally {
      setUpdating(false);
    }
  };

  const filtered = complaints.filter(c => filterStatus === 'ALL' || c.status === filterStatus);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Resolved</span>;
      case 'In Progress':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">In Progress</span>;
      case 'Closed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-500/20 text-gray-400 border border-gray-500/30">Closed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Pending</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Admin Header */}
      <div className="bg-panel border border-soft p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-heading flex items-center gap-3">
            <LifeBuoy className="text-[#EC4899]" size={28} /> Complaint & Support Ticket Desk
          </h1>
          <p className="text-sm text-muted mt-1">
            Review student support tickets, assign priority levels, respond, and update resolution statuses.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-base border border-soft text-xs text-heading rounded-xl p-2.5 outline-none font-bold"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Grid Layout: Ticket List & Detail/Reply Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Ticket List */}
        <div className="lg:col-span-1 bg-panel border border-soft rounded-2xl p-4 shadow-xl space-y-3">
          <h2 className="text-sm font-bold text-heading px-2 flex items-center justify-between">
            <span>Student Tickets ({filtered.length})</span>
          </h2>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-base animate-pulse rounded-xl" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-muted">No tickets found for selected status.</div>
          ) : (
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filtered.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleOpenTicket(t)}
                  className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer space-y-2 ${
                    selectedTicket?.id === t.id
                      ? 'bg-purple-500/20 border-purple-500 text-heading shadow-md'
                      : 'bg-base/60 border-soft text-muted hover:text-heading hover:bg-soft/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-heading truncate">{t.subject}</span>
                    {getStatusBadge(t.status)}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted">
                    <span>{t.studentEmail}</span>
                    <span className="font-mono text-[10px]">{new Date(t.createdAt).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Selected Ticket Details & Response Panel */}
        <div className="lg:col-span-2 bg-panel border border-soft rounded-2xl p-6 shadow-xl space-y-5">
          {!selectedTicket ? (
            <div className="text-center py-20 text-muted space-y-2">
              <MessageSquare size={36} className="mx-auto text-purple-400/40" />
              <p className="font-bold text-sm">Select a ticket from the left panel to review and reply.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Ticket Info Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-soft pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {selectedTicket.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Priority: {selectedTicket.priority}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-heading mt-2">{selectedTicket.subject}</h2>
                  <span className="text-xs text-muted">From: {selectedTicket.studentName} ({selectedTicket.studentEmail})</span>
                </div>
                {getStatusBadge(selectedTicket.status)}
              </div>

              {/* Ticket Description */}
              <div className="space-y-2 bg-base p-4 rounded-xl border border-soft">
                <span className="text-xs font-bold text-heading">Student Description:</span>
                <p className="text-xs text-muted leading-relaxed whitespace-pre-line">{selectedTicket.description}</p>
                {selectedTicket.screenshotUrl && (
                  <div className="pt-2 text-xs">
                    <a href={selectedTicket.screenshotUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">
                      🖼 Open Screenshot Link
                    </a>
                  </div>
                )}
              </div>

              {/* Admin Actions & Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-soft pt-4 text-xs">
                <div>
                  <label className="block text-muted font-bold mb-1">Update Status</label>
                  <select
                    value={ticketStatus}
                    onChange={(e) => setTicketStatus(e.target.value)}
                    className="w-full bg-base border border-soft rounded-xl p-3 text-heading outline-none font-bold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted font-bold mb-1">Assign Priority</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                    className="w-full bg-base border border-soft rounded-xl p-3 text-heading outline-none font-bold"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Admin Reply Textarea */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-heading flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-400" /> Official Admin Response
                </label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your resolution response to the student..."
                  className="w-full bg-base border border-soft rounded-xl p-4 text-xs text-heading outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleUpdateTicket}
                  disabled={updating}
                  className="px-6 py-2.5 rounded-xl bg-brand-gradient text-white font-bold text-xs hover:opacity-90 transition flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} /> {updating ? 'Updating...' : 'Save & Send Reply'}
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
