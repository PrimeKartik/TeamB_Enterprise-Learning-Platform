import { useState } from "react";
import { Lock, ShieldAlert, Check } from "lucide-react";

export default function SecuritySettings({ onChangePassword }) {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!passwords.currentPassword || !passwords.newPassword) {
      setMessage({ type: 'error', text: 'Please fill in all password fields.' });
      return;
    }
    if (passwords.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirm password do not match.' });
      return;
    }

    setSubmitting(true);
    try {
      await onChangePassword?.({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Could not update password. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-panel border border-soft rounded-2xl p-6 shadow-xl space-y-5">
      <div className="border-b border-soft pb-4">
        <h2 className="text-lg font-bold text-heading flex items-center gap-2">
          <Lock size={18} className="text-primary" /> Password & Security
        </h2>
        <p className="text-xs text-muted mt-1">Ensure your account password remains strong and secure</p>
      </div>

      {message && (
        <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
          message.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
        }`}>
          {message.type === 'error' ? <ShieldAlert size={16} /> : <Check size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="space-y-4 max-w-lg">
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            placeholder="••••••••"
            className="w-full bg-base border border-soft rounded-xl px-4 py-2.5 text-sm text-heading outline-none focus:border-primary transition"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            placeholder="••••••••"
            className="w-full bg-base border border-soft rounded-xl px-4 py-2.5 text-sm text-heading outline-none focus:border-primary transition"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            placeholder="••••••••"
            className="w-full bg-base border border-soft rounded-xl px-4 py-2.5 text-sm text-heading outline-none focus:border-primary transition"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition shadow-md disabled:opacity-60"
        >
          {submitting ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );
}
