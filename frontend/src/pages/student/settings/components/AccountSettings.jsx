import { useEffect, useState } from "react";
import { User, Mail, Phone, Check } from "lucide-react";

export default function AccountSettings({ profile, onSave }) {
  const [form, setForm] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Keep the form in sync if the profile loads/refreshes after mount.
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave?.(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-panel border border-soft rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex justify-between items-center border-b border-soft pb-4">
        <div>
          <h2 className="text-lg font-bold text-heading flex items-center gap-2">
            <User size={18} className="text-primary" /> Personal & Account Information
          </h2>
          <p className="text-xs text-muted mt-1">Manage your account profile details and email address</p>
        </div>

        {saved && (
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            <Check size={14} /> Account Saved!
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5">Full Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              className="w-full bg-base border border-soft rounded-xl pl-10 pr-4 py-2.5 text-sm text-heading outline-none focus:border-primary transition"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted mb-1.5">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              className="w-full bg-base/60 border border-soft rounded-xl pl-10 pr-4 py-2.5 text-sm text-muted cursor-not-allowed outline-none"
              name="email"
              value={form.email}
              disabled
              title="Email can't be changed here"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted mb-1.5">Phone Number</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              className="w-full bg-base border border-soft rounded-xl pl-10 pr-4 py-2.5 text-sm text-heading outline-none focus:border-primary transition"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-brand-gradient text-white rounded-xl text-xs font-semibold hover:opacity-95 transition shadow-md disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Account Changes"}
        </button>
      </div>
    </form>
  );
}
