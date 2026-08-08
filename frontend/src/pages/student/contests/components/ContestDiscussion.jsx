import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, UserCheck, CornerDownRight } from 'lucide-react';

export default function ContestDiscussion({ contestId, discussions = [], onPostComment }) {
  const [commentText, setCommentText] = useState('');
  const [localDiscussions, setLocalDiscussions] = useState(discussions);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      userName: 'You (Student)',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
      commentText,
      likesCount: 0,
      createdAt: 'Just now'
    };

    setLocalDiscussions([newComment, ...localDiscussions]);
    if (onPostComment) onPostComment(commentText);
    setCommentText('');
  };

  const handleLike = (id) => {
    setLocalDiscussions(prev => prev.map(d => d.id === id ? { ...d, likesCount: d.likesCount + 1 } : d));
  };

  return (
    <div className="bg-panel border border-soft rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-soft pb-4">
        <h3 className="text-base font-bold text-heading flex items-center gap-2">
          <MessageSquare size={18} className="text-purple-400" /> Contest Discussion Forum ({localDiscussions.length})
        </h3>
        <span className="text-xs text-muted">Ask doubts, share algorithmic strategies & discuss problems</span>
      </div>

      {/* Post Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          placeholder="Ask a doubt or share your solution strategy..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 bg-base border border-soft rounded-xl px-4 py-2.5 text-xs text-heading outline-none focus:border-purple-500 transition"
        />
        <button
          type="submit"
          disabled={!commentText.trim()}
          className="px-4 py-2.5 bg-brand-gradient text-white rounded-xl text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Send size={14} /> Post
        </button>
      </form>

      {/* Discussion List */}
      <div className="space-y-4">
        {localDiscussions.map((d) => (
          <div key={d.id} className="bg-base/50 border border-soft/60 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={d.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} alt={d.userName} className="w-7 h-7 rounded-full object-cover border border-soft" />
                <span className="font-bold text-xs text-heading">{d.userName}</span>
                <span className="text-[10px] text-muted">{d.createdAt}</span>
              </div>

              <button
                onClick={() => handleLike(d.id)}
                className="flex items-center gap-1 text-xs font-semibold text-muted hover:text-purple-400 transition cursor-pointer"
              >
                <ThumbsUp size={13} /> {d.likesCount}
              </button>
            </div>

            <p className="text-xs text-heading/90 leading-relaxed font-sans pl-9">
              {d.commentText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
