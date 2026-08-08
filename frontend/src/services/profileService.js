import { profileApi } from "../api/profileApi";

const profileService = {
  getProfile: () =>
    profileApi.getProfile(),

  updateProfile: (data) =>
    profileApi.updateProfile(data),

  uploadImage: (data) =>
    profileApi.uploadProfileImage(data),
};

export default profileService;