import { useEffect, useState } from "react";
import { profileApi } from "../../../api/profileApi";
import { settingsApi } from "../../../api/settingsApi";
import { Settings, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

import {
  getNotificationToastsEnabled,
  setNotificationToastsEnabled,
} from "../../../utils/notificationPreference";

import AccountSettings from "./components/AccountSettings";
import SecuritySettings from "./components/SecuritySettings";
import ThemeSettings from "./components/ThemeSettings";
import NotificationSettings from "./components/NotificationSettings";

export default function SettingsSection() {
  const [profile, setProfile] = useState(null);
  const [notifToastsEnabled, setNotifToastsEnabled] = useState(getNotificationToastsEnabled());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError(null);
      const response = await profileApi.getProfile();
      setProfile(response.data);
    } catch (e) {
      console.error(e);
      setError("Unable to load your account settings right now.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveAccount(data) {
    const response = await profileApi.updateProfile({ ...profile, ...data });
    setProfile(response.data);
    toast.success("Account details updated.");
  }

  async function handleChangePassword(data) {
    await settingsApi.changePassword(data);
  }

  function handleToggleNotifications() {
    const next = !notifToastsEnabled;
    setNotifToastsEnabled(next);
    setNotificationToastsEnabled(next);
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-44 rounded-2xl bg-soft animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <AlertCircle className="mx-auto mb-3 text-red-400" size={28} />
        <p className="text-red-400">{error}</p>
        <button
          onClick={loadProfile}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-panel border border-soft rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-primary">
            <Settings size={22} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-heading">
              Account & Platform Settings
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              Configure personal profile, security credentials, theme preferences, and notifications.
            </p>
          </div>
        </div>
      </div>

      <AccountSettings
        profile={profile}
        onSave={handleSaveAccount}
      />

      <ThemeSettings />

      <SecuritySettings
        onChangePassword={handleChangePassword}
      />

      <NotificationSettings
        enabled={notifToastsEnabled}
        onToggle={handleToggleNotifications}
      />
    </div>
  );
}
