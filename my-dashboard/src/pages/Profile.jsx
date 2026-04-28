import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Settings,
  Calendar,
  Activity,
  Award,
  X,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio:
      user?.bio ||
      "Product designer with 5+ years of experience in creating digital solutions.",
    location: user?.location || "San Francisco, CA",
    company: user?.company || "Tech Corp",
    phone: user?.phone || "+317890761",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsEditing(true);

    // Simulate API call
    setTimeout(() => {
      // Update user context with new data
      const updatedUser = {
        ...user,
        name: editForm.name,
        email: editForm.email,
        bio: editForm.bio,
        location: editForm.location,
        company: editForm.company,
        phone: editForm.phone,
      };

      if (updateUser) {
        updateUser(updatedUser);
      } else {
        // If updateUser doesn't exist in your auth context, manually update
        user.name = editForm.name;
        user.email = editForm.email;
        user.bio = editForm.bio;
        user.location = editForm.location;
        user.company = editForm.company;
        user.phone = editForm.phone;
      }

      setIsEditing(false);
      setShowEditModal(false);

      // Show success message (optional)
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-400 text-lg">No user logged in</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Member since (simulated)
  const memberSince = "January 2024";
  const totalProjects = 12;
  const completionRate = 94;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-4xl mx-auto px-4 py-12">
          {/* Profile Header with Cover */}
          <div className="relative mb-8">
            {/* Cover Image */}
            <div className="h-48 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>

            {/* Profile Avatar */}
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-gray-900 flex items-center justify-center shadow-2xl">
                  <span className="text-4xl font-bold text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => setShowEditModal(true)}
              className="absolute top-4 right-4 px-4 py-2 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white rounded-lg transition-all flex items-center gap-2 text-sm border border-gray-600 hover:border-purple-500/50"
            >
              <Settings className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Profile Info */}
          <div className="mt-16 mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
                {user.role}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Member since {memberSince}
              </span>
            </div>
            {user.bio && (
              <p className="text-gray-300 mt-3 max-w-2xl">{user.bio}</p>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Total Projects</span>
                <Activity className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {totalProjects}
              </div>
              <div className="text-xs text-gray-500 mt-1">Active: 8</div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Completion Rate</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {completionRate}%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div
                  className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Account Status</span>
                <Shield className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-xl font-bold text-white">Verified</div>
              <div className="text-xs text-green-400 mt-1">Active Account</div>
            </div>
          </div>

          {/* Detailed Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Full Name</span>
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Email Address</span>
                  <span className="text-white font-medium">{user.email}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Role</span>
                  <span className="text-purple-400 font-medium">
                    {user.role}
                  </span>
                </div>
                {user.location && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white">{user.location}</span>
                  </div>
                )}
                {user.company && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400">Company</span>
                    <span className="text-white">{user.company}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-400" />
                Contact & Preferences
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Email Notifications</span>
                  <span className="text-green-400 text-sm">Enabled</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Two-Factor Auth</span>
                  <span className="text-yellow-400 text-sm">
                    Not Configured
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Language</span>
                  <span className="text-white">English</span>
                </div>
                {user.phone && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400">Phone</span>
                    <span className="text-white">{user.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/settings")}
              className="flex-1 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-gray-600"
            >
              <Settings className="w-5 h-5" />
              Account Settings
            </button>

            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Update your personal information
                </p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="3"
                  value={editForm.bio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={editForm.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isEditing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                  <LogOut className="w-8 h-8 text-red-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                Confirm Logout
              </h3>
              <p className="text-gray-400 text-center mb-6">
                Are you sure you want to logout? You'll need to login again to
                access your account.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
