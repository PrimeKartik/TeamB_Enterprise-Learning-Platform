import { useEffect, useState } from "react";
import { profileApi } from "../api/profileApi";

export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);

      const [profileRes, skillsRes, achievementsRes] =
        await Promise.all([
          profileApi.getProfile(),
          profileApi.getSkills(),
          profileApi.getAchievements(),
        ]);

      setProfile(profileRes.data);
      setSkills(skillsRes.data);
      setAchievements(achievementsRes.data);
    } catch (err) {
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const updateProfile = async (data) => {
    await profileApi.updateProfile(data);
    loadProfile();
  };

  const uploadProfileImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    await profileApi.uploadProfileImage(formData);

    loadProfile();
  };

  return {
    profile,
    skills,
    achievements,
    loading,
    error,
    refresh: loadProfile,
    updateProfile,
    uploadProfileImage,
  };
}