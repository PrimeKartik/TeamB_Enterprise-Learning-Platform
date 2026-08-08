import { useEffect, useState } from "react";
import { Mail, MapPin, Globe, Github, Linkedin, Check, Edit3, Loader2 } from "lucide-react";

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
];

const emptyForm = {
  name: "",
  bio: "",
  address: "",
  avatarUrl: "",
  githubUrl: "",
  linkedinUrl: "",
  portfolioUrl: "",
};

export default function ProfileCard({ profile, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        bio: profile.bio || "",
        address: profile.address || "",
        avatarUrl: profile.avatarUrl || AVATAR_PRESETS[0],
        githubUrl: profile.githubUrl || "",
        linkedinUrl: profile.linkedinUrl || "",
        portfolioUrl: profile.portfolioUrl || "",
      });
    }
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onUpdateProfile?.(form);
      setIsEditing(false);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Profile Header Card */}
      <div className="bg-panel border border-soft rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-10">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
            <div className="relative group">
              <img
                src={form.avatarUrl}
                alt={form.name}
                className="w-28 h-28 rounded-2xl object-cover border-2 border-primary/50 shadow-lg shadow-purple-500/20"
              />
              {isEditing && (
                <div className="mt-2 flex gap-1 justify-center">
                  {AVATAR_PRESETS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setForm({ ...form, avatarUrl: url })}
                      className={`w-6 h-6 rounded-full overflow-hidden border ${form.avatarUrl === url ? 'border-primary ring-2 ring-primary/40' : 'border-soft'}`}
                    >
                      <img src={url} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-heading">
                {form.name || "Your Name"}
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-muted mt-3">
                {profile?.email && (
                  <span className="flex items-center gap-1.5"><Mail size={14} className="text-purple-400" /> {profile.email}</span>
                )}
                {form.address && (
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-purple-400" /> {form.address}</span>
                )}
              </div>

              {form.bio && (
                <p className="text-xs text-muted mt-3 max-w-xl leading-relaxed">
                  {form.bio}
                </p>
              )}

              {(form.githubUrl || form.linkedinUrl || form.portfolioUrl) && (
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                  {form.githubUrl && (
                    <a href={form.githubUrl} target="_blank" rel="noreferrer" className="text-muted hover:text-heading transition">
                      <Github size={16} />
                    </a>
                  )}
                  {form.linkedinUrl && (
                    <a href={form.linkedinUrl} target="_blank" rel="noreferrer" className="text-muted hover:text-heading transition">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {form.portfolioUrl && (
                    <a href={form.portfolioUrl} target="_blank" rel="noreferrer" className="text-muted hover:text-heading transition">
                      <Globe size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-xl bg-base border border-soft text-heading hover:bg-soft transition text-xs font-semibold flex items-center gap-2 shrink-0 self-center md:self-start"
          >
            <Edit3 size={15} /> {isEditing ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>

        {savedNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <Check size={16} /> Profile changes saved successfully!
          </div>
        )}
      </div>

      {/* Edit Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-panel border border-soft rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-heading border-b border-soft pb-3">Edit Profile Information</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-base border border-soft rounded-xl px-3.5 py-2 text-sm text-heading outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Location</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-base border border-soft rounded-xl px-3.5 py-2 text-sm text-heading outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">GitHub URL</label>
              <input
                type="text"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                placeholder="https://github.com/username"
                className="w-full bg-base border border-soft rounded-xl px-3.5 py-2 text-sm text-heading outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-base border border-soft rounded-xl px-3.5 py-2 text-sm text-heading outline-none focus:border-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-muted mb-1">Portfolio / Website URL</label>
              <input
                type="text"
                value={form.portfolioUrl}
                onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                placeholder="https://yoursite.com"
                className="w-full bg-base border border-soft rounded-xl px-3.5 py-2 text-sm text-heading outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted mb-1">Bio</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full bg-base border border-soft rounded-xl p-3.5 text-sm text-heading outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-base border border-soft text-muted rounded-xl text-xs font-semibold hover:bg-soft"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-brand-gradient text-white rounded-xl text-xs font-semibold hover:opacity-90 transition shadow-md disabled:opacity-60 flex items-center gap-2"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
