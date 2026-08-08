import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, FileSpreadsheet, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminContestManager({ onClose, onSaveContest }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(90);
  const [difficulty, setDifficulty] = useState('Medium');
  const [totalMarks, setTotalMarks] = useState(400);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newContest = {
      id: Date.now(),
      title,
      description,
      durationMinutes: Number(duration),
      difficulty,
      questionCount: 4,
      totalMarks: Number(totalMarks),
      status: 'UPCOMING',
      startTime: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(),
      endTime: new Date(Date.now() + 2 * 24 * 3600 * 1000 + 90 * 60 * 1000).toISOString()
    };

    if (onSaveContest) onSaveContest(newContest);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-panel border border-soft rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-base border border-soft text-muted hover:text-heading transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 border-b border-soft pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Plus size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-heading">Admin Contest Manager</h3>
            <p className="text-xs text-muted">Create & Schedule Competitive Coding Tournaments</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-muted font-bold mb-1">Contest Title</label>
            <input
              type="text"
              placeholder="e.g. SkillSphere Code Wars #2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-base border border-soft rounded-xl px-3.5 py-2 text-heading outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-muted font-bold mb-1">Description & Rules</label>
            <textarea
              rows={3}
              placeholder="Enter tournament description and rules..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-base border border-soft rounded-xl px-3.5 py-2 text-heading outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-muted font-bold mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-base border border-soft rounded-xl px-3.5 py-2 text-heading outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-muted font-bold mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-base border border-soft text-heading rounded-xl px-3 py-2 outline-none focus:border-purple-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            <div>
              <label className="block text-muted font-bold mb-1">Total Marks</label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                className="w-full bg-base border border-soft rounded-xl px-3.5 py-2 text-heading outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-soft">
            <button
              type="button"
              onClick={() => alert("Report Export feature: Contest Participants CSV exported!")}
              className="px-3.5 py-2 bg-base border border-soft text-muted hover:text-heading rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet size={14} /> Export CSV
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-base border border-soft text-heading rounded-xl font-bold hover:bg-soft transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-gradient text-white rounded-xl font-bold hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save size={14} /> Schedule Contest
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
