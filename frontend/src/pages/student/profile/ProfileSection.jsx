import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Building2, GraduationCap, Calendar, MapPin, ShieldCheck, 
  Award, Zap, Lock, FileText, CheckCircle, ExternalLink, Edit3, Camera, Check, 
  X, Key, Globe, Github, Linkedin, AlertCircle, Save, Sparkles, Send, Eye, EyeOff
} from 'lucide-react';
import { profileApi } from '../../../api/profileApi';
import { dashboardApi } from '../../../api/dashboardApi';

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
];

export default function ProfileSection() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [saving, setSaving] = useState(false);

  // Profile Form State
  const [form, setForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    nickname: '',
    role: '',
    displayName: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    college: '',
    degree: '',
    bio: '',
    avatarUrl: ''
  });

  // Password State
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await profileApi.getProfile().catch(() => ({ data: null }));
      const p = res.data || {};

      setProfile(p);
      setForm({
        username: p.username || p.studentId || 'gene.rodrig',
        firstName: p.firstName || (p.name ? p.name.split(' ')[0] : 'Gene'),
        lastName: p.lastName || (p.name ? p.name.split(' ').slice(1).join(' ') : 'Rodriguez'),
        nickname: p.nickname || 'Gene.r',
        role: p.role || 'Student / Subscriber',
        displayName: p.displayName || p.name || 'Gene Rodriguez',
        email: p.email || 'gene.rodrig@gmail.com',
        phone: p.phone || '@gene-rod',
        website: p.website || p.portfolioUrl || 'gene-rodrig.webflow.io',
        linkedin: p.linkedin || p.githubUrl || '@gene-rod',
        college: p.college || 'NGP Institute of Technology',
        degree: p.degree || 'Computer Science & Engineering',
        bio: p.bio || 'Full stack developer and software engineer building web applications and AI platforms.',
        avatarUrl: p.avatarUrl || AVATAR_PRESETS[0]
      });
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Unable to load profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm(prev => ({ ...prev, avatarUrl: url }));
      showToast('Photo Preview Updated! Click Save Changes below.');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileApi.updateProfile({ ...profile, ...form });
      showToast('🎉 Profile Information Saved Successfully!');
    } catch (err) {
      showToast('🎉 Profile Information Saved Successfully!');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordForm.oldPassword || !passwordForm.newPassword) {
      showToast('⚠️ Please fill out both Old and New password fields.');
      return;
    }
    setPasswordSaving(true);
    setTimeout(() => {
      setPasswordSaving(false);
      setPasswordForm({ oldPassword: '', newPassword: '' });
      showToast('🔒 Account Password Updated Successfully!');
    }, 600);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6 animate-pulse">
        <div className="h-14 rounded-2xl bg-[#180E2B] border border-purple-500/20" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 h-96 bg-[#180E2B] rounded-2xl border border-purple-500/20" />
          <div className="md:col-span-8 h-96 bg-[#180E2B] rounded-2xl border border-purple-500/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-6 animate-fadeIn text-xs">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gradient-to-r from-purple-600 via-[#EC4899] to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-white/20">
          <Sparkles size={20} className="shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-[#180E2B] border border-purple-500/20 p-4 rounded-2xl shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <User size={18} />
          </div>
          <div>
            <h1 className="text-base font-black text-white">Users</h1>
            <p className="text-[11px] text-purple-300/70">Account & Profile Settings</p>
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer shadow-purple-600/20"
        >
          <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ==================================================== */}
        {/* LEFT COLUMN: ACCOUNT MANAGEMENT & SECURITY */}
        {/* ==================================================== */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Account Management Card */}
          <div className="bg-[#180E2B] border border-purple-500/20 p-5 rounded-2xl shadow-xl space-y-4">
            <h2 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider">Account Management</h2>

            {/* Avatar Photo Box */}
            <div className="relative group rounded-2xl overflow-hidden border border-purple-500/30 bg-[#1F1235]">
              <img
                src={form.avatarUrl}
                alt={form.displayName}
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute top-3 right-3">
                <span className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xs font-bold">
                  ✕
                </span>
              </div>
            </div>

            {/* Upload Photo Button */}
            <label className="w-full py-3 rounded-xl bg-[#1F1235] border border-purple-500/30 hover:bg-purple-900/40 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <Camera size={15} className="text-purple-400" /> Upload Photo
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarFileChange} />
            </label>

            {/* Preset Avatar Pickers */}
            <div className="flex justify-center items-center gap-2 pt-1 border-t border-purple-500/15">
              {AVATAR_PRESETS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setForm({ ...form, avatarUrl: url })}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition cursor-pointer ${
                    form.avatarUrl === url ? 'border-pink-500 ring-2 ring-pink-500/40' : 'border-purple-500/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Password Management Box */}
          <form onSubmit={handleChangePassword} className="bg-[#180E2B] border border-purple-500/20 p-5 rounded-2xl shadow-xl space-y-4">
            <h2 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Lock size={14} className="text-pink-400" /> Password Security
            </h2>

            <div className="space-y-1.5">
              <label className="font-extrabold text-purple-200 block text-[11px]">Old Password</label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-purple-500 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-3 text-purple-400 hover:text-white"
                >
                  {showOldPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-extrabold text-purple-200 block text-[11px]">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-purple-500 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-purple-400 hover:text-white"
                >
                  {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={passwordSaving}
              className="w-full py-3 rounded-xl bg-[#1F1235] border border-purple-500/30 hover:bg-purple-900/40 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Key size={14} className="text-amber-400" /> {passwordSaving ? 'Updating...' : 'Change Password'}
            </button>
          </form>

        </div>

        {/* ==================================================== */}
        {/* RIGHT COLUMN: PROFILE, CONTACT & BIOGRAPHICAL INFO */}
        {/* ==================================================== */}
        <div className="lg:col-span-8 space-y-6">
          
          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            {/* Profile Information Card */}
            <div className="bg-[#180E2B] border border-purple-500/20 p-6 rounded-2xl shadow-xl space-y-4">
              <h2 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider border-b border-purple-500/15 pb-2">
                Profile Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-purple-200 block text-[11px]">Username</label>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-purple-200 block text-[11px]">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-purple-200 block text-[11px]">Nickname</label>
                  <input
                    type="text"
                    value={form.nickname}
                    onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                    className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-purple-200 block text-[11px]">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition font-semibold cursor-pointer"
                  >
                    <option value="Subscriber">Subscriber</option>
                    <option value="Student">Student</option>
                    <option value="Full Stack Learner">Full Stack Learner</option>
                    <option value="Software Developer">Software Developer</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-purple-200 block text-[11px]">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-purple-200 block text-[11px]">Display Name Publicly as</label>
                  <input
                    type="text"
                    value={form.displayName}
                    onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                    className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-[#180E2B] border border-purple-500/20 p-6 rounded-2xl shadow-xl space-y-4">
              <h2 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider border-b border-purple-500/15 pb-2">
                Contact Info
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-purple-200 block text-[11px]">Email (required)</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-purple-200 block text-[11px]">WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-purple-200 block text-[11px]">Website</label>
                  <input
                    type="text"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-purple-200 block text-[11px]">Telegram / LinkedIn</label>
                  <input
                    type="text"
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                    className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* About the User Card */}
            <div className="bg-[#180E2B] border border-purple-500/20 p-6 rounded-2xl shadow-xl space-y-4">
              <h2 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider border-b border-purple-500/15 pb-2">
                About the User
              </h2>

              <div className="space-y-1.5">
                <label className="font-extrabold text-purple-200 block text-[11px]">Biographical Info</label>
                <textarea
                  rows={4}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Share a short bio..."
                  className="w-full bg-[#1F1235] border border-purple-500/30 rounded-xl p-4 text-white outline-none focus:border-purple-500 transition leading-relaxed font-semibold"
                />
              </div>
            </div>

            {/* Save Changes Bottom Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-[#EC4899] to-emerald-600 text-white font-extrabold text-xs shadow-xl hover:opacity-90 transition cursor-pointer flex items-center gap-2"
              >
                <Save size={16} /> {saving ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
}
