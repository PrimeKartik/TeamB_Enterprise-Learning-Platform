import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Loader2,
} from "lucide-react";
import { userApi } from "../api/userApi";

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
];

export default function CompleteProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    avatarUrl: avatars[0],
    phone: "",
    department: "",
    semester: "",
    address: "",
    bio: "",
    githubUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await userApi.updateProfile({
        avatarUrl: form.avatarUrl,
        phone: form.phone,
        department: form.department,
        semester: form.semester,
        address: form.address,
        bio: form.bio,
        githubUrl: form.githubUrl,
        linkedinUrl: form.linkedinUrl,
        portfolioUrl: form.portfolioUrl,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0718] py-10 px-4 text-white">

      <div className="max-w-5xl mx-auto">

        <div className="bg-[#201233] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

          <div className="h-44 bg-gradient-to-r from-[#7C3AED] via-purple-900 to-[#EC4899] relative">

            <div className="absolute left-8 -bottom-24">

              <h2 className="text-white font-semibold mb-3">
                Choose Avatar
              </h2>

              <div className="flex flex-wrap gap-3">

                {avatars.map((avatar) => (

                  <button
                    key={avatar}
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        avatarUrl: avatar,
                      })
                    }
                    className={`rounded-full transition ${form.avatarUrl === avatar
                        ? "ring-4 ring-white scale-110"
                        : "hover:scale-105"
                      }`}
                  >
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-16 h-16 rounded-full bg-white"
                    />
                  </button>

                ))}

              </div>

            </div>

          </div>

          <div className="pt-36 px-10 pb-10">

            <h1 className="text-3xl font-bold text-gray-900">
              Complete Your Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Department and Semester are required.
            </p>

            {error && (
              <div className="mt-6 rounded-xl bg-red-100 border border-red-300 text-red-700 px-4 py-3">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 mt-8"
            >

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone
                      size={18}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border rounded-xl"
                      placeholder="+91 9876543210"
                    />

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Department *
                  </label>

                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-xl"
                  >
                    <option value="">Select Department</option>
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                    <option>Other</option>
                  </select>

                </div>

                <div>

                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Semester *
                  </label>

                  <select
                    name="semester"
                    value={form.semester}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-xl"
                  >
                    <option value="">Select Semester</option>

                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option
                        key={sem}
                        value={sem}
                      >
                        Semester {sem}
                      </option>
                    ))}

                  </select>

                </div>
                <div>

                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Address
                  </label>

                  <div className="relative">

                    <MapPin
                      size={18}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="w-full pl-10 pr-4 py-3 border rounded-xl"
                    />

                  </div>

                </div>

              </div>

              {/* About */}

              <div>

                <label className="block text-sm font-bold text-gray-900 mb-2">
                  About Me
                </label>

                <textarea
                  rows="4"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell us something about yourself..."
                  className="w-full p-4 border rounded-xl"
                />

              </div>

              {/* Social Links */}

              <div className="grid md:grid-cols-3 gap-6">

                <div>

                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    GitHub
                  </label>

                  <div className="relative">

                    <Github
                      size={18}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      type="url"
                      name="githubUrl"
                      value={form.githubUrl}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                      className="w-full pl-10 pr-4 py-3 border rounded-xl"
                    />

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    LinkedIn
                  </label>

                  <div className="relative">

                    <Linkedin
                      size={18}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      type="url"
                      name="linkedinUrl"
                      value={form.linkedinUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full pl-10 pr-4 py-3 border rounded-xl"
                    />

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Portfolio
                  </label>

                  <div className="relative">

                    <Globe
                      size={18}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      type="url"
                      name="portfolioUrl"
                      value={form.portfolioUrl}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                      className="w-full pl-10 pr-4 py-3 border rounded-xl"
                    />

                  </div>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex justify-end pt-8 border-t">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading && (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  )}

                  {loading ? "Saving..." : "Complete Profile"}

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  );
}