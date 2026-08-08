import React, { useState, useEffect } from 'react';
import { LifeBuoy, PlusCircle, AlertCircle, Clock, CheckCircle2, MessageSquare, Send, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../../api/client';

export default function SupportSection() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    category: 'Technical',
    subject: '',
    description: '',
    screenshotUrl: '',
    priority: 'Medium'
  });

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const res = await api.get('/complaints/my');
      setComplaints(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.description) {
      toast.error('Please enter a subject and description');
      return;
    }
    try {
      setSubmitting(true);
      await api.post('/complaints', formData);
      toast.success('Support ticket created successfully!');
      setShowModal(false);
      setFormData({ category: 'Technical', subject: '', description: '', screenshotUrl: '', priority: 'Medium' });
      loadComplaints();
    } catch (err) {
      toast.error('Failed to submit support ticket.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><CheckCircle2 size={12}/> Resolved</span>;
      case 'In Progress':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1"><Clock size={12}/> In Progress</span>;
      case 'Closed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-500/20 text-gray-400 border border-gray-500/30">Closed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1"><AlertCircle size={12}/> Pending</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-panel border border-soft p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-heading flex items-center gap-3">
            <LifeBuoy className="text-[#EC4899]" size={28} /> Complaint & Support Portal
          </h1>
          <p className="text-sm text-muted mt-1">
            Need help? Raise a ticket and track resolutions in real-time with our support team.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-xl bg-brand-gradient text-white font-bold text-xs hover:opacity-90 transition flex items-center gap-2 shadow-lg cursor-pointer shrink-0"
        >
          <PlusCircle size={16} /> Raise Support Ticket
        </button>
      </div>

      {/* Ticket List */}
      <div className="bg-panel border border-soft rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-heading flex items-center gap-2">
          <MessageSquare size={18} className="text-purple-400" /> Your Support Tickets
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-base animate-pulse rounded-xl" />
            ))}
          </div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-soft rounded-xl text-muted space-y-2">
            <LifeBuoy size={36} className="mx-auto text-purple-400/50" />
            <p className="font-semibold text-sm">No support tickets raised yet.</p>
            <p className="text-xs text-muted">Click "Raise Support Ticket" above if you encounter any issue.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map(t => (
              <div key={t.id} className="p-4 rounded-xl bg-base border border-soft hover:border-purple-500/40 transition space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-soft pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                      {t.category}
                    </span>
                    <h3 className="font-bold text-heading text-sm">{t.subject}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(t.status)}
                    <span className="text-[10px] text-muted font-mono">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted leading-relaxed">{t.description}</p>

                {t.screenshotUrl && (
                  <div className="text-xs">
                    <a href={t.screenshotUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">
                      🖼 View Attached Screenshot
                    </a>
                  </div>
                )}

                {t.adminReply && (
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs space-y-1">
                    <span className="font-bold text-purple-300 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-amber-400" /> Admin Support Reply:
                    </span>
                    <p className="text-purple-100/90">{t.adminReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Raise Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-panel border border-soft rounded-2xl p-6 w-full max-w-lg space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-soft pb-3">
              <h3 className="text-lg font-bold text-heading flex items-center gap-2">
                <LifeBuoy size={20} className="text-[#EC4899]" /> Raise New Support Ticket
              </h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-heading cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-muted font-semibold mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-base border border-soft rounded-xl p-3 text-heading outline-none focus:border-purple-500"
                >
                  <option value="Technical">Technical Issue</option>
                  <option value="Billing">Billing & Enrollment</option>
                  <option value="Course Content">Course Content / Video</option>
                  <option value="Account">Account & Login</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-muted font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Brief summary of the issue..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-base border border-soft rounded-xl p-3 text-heading outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-muted font-semibold mb-1">Description</label>
                <textarea
                  rows={4}
                  placeholder="Detailed description of what happened..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-base border border-soft rounded-xl p-3 text-heading outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-muted font-semibold mb-1">Screenshot URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.screenshotUrl}
                  onChange={(e) => setFormData({ ...formData, screenshotUrl: e.target.value })}
                  className="w-full bg-base border border-soft rounded-xl p-3 text-heading outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-base border border-soft text-muted hover:text-heading cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-brand-gradient text-white font-bold hover:opacity-90 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={14} /> {submitting ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
