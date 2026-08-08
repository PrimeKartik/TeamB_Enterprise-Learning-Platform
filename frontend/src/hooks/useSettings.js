import { useEffect, useState } from "react";
import { settingsApi } from "../api/settingsApi";

export default function useSettings() {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    emailNotifications: true,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadSettings = async () => {
    try {
      setLoading(true);

      const res = await settingsApi.getSettings();

      setSettings(res.data);
    } catch (err) {
      setError("Unable to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const updateProfileSettings = async (data) => {
    await settingsApi.updateProfile(data);

    loadSettings();
  };

  const updatePassword = async (data) => {
    await settingsApi.updatePassword(data);
  };

  const updateTheme = async (theme) => {
    await settingsApi.updateTheme({
      theme,
    });

    setSettings((prev) => ({
      ...prev,
      theme,
    }));
  };

  const updateNotifications = async (data) => {
    await settingsApi.updateNotifications(data);

    setSettings((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return {
    settings,
    loading,
    error,
    refresh: loadSettings,
    updateProfileSettings,
    updatePassword,
    updateTheme,
    updateNotifications,
  };
}