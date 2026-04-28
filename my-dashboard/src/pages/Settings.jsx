import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Save,
  Bell,
  Shield,
  Palette,
  Globe,
  Moon,
  Sun,
  Loader2,
  CheckCircle,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
} from "lucide-react";

export default function Settings() {
  const { state, dispatch, showToast } = useApp();
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    siteName: "My Dashboard",
    email: user?.email || "admin@example.com",
    notifications: true,
    twoFactor: false,
    language: "english",
    timezone: "utc-5",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update user email if changed
    if (updateUser && settings.email !== user?.email) {
      updateUser({ ...user, email: settings.email });
    }

    showToast("Settings saved successfully", "success");
    setIsSaving(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    // Simulate API call
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    showToast("Password changed successfully", "success");
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsSaving(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      showToast("Please type DELETE to confirm", "error");
      return;
    }

    setIsDeleting(true);

    // Simulate API call for account deletion
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear all user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("theme");

    // Clear all app state (you can add more cleanup here)
    dispatch({ type: "CLEAR_ALL_DATA" });

    // Show success message
    showToast("Account deleted successfully", "success");

    // Logout and redirect to login
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 500);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Manage your account preferences and security settings
                </p>
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Settings Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* General Settings Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    General Settings
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Configure your basic information
                  </p>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) =>
                        setSettings({ ...settings, siteName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) =>
                        setSettings({ ...settings, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Preferences
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customize your experience
                  </p>
                </div>
                <div className="p-6 space-y-5">
                  {/* Notifications Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Email Notifications
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive email updates about your account
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setSettings({
                          ...settings,
                          notifications: !settings.notifications,
                        })
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${settings.notifications ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-700"}`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform ${settings.notifications ? "translate-x-6" : "translate-x-0.5"}`}
                      />
                    </button>
                  </div>

                  {/* Two-Factor Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Add an extra layer of security
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setSettings({
                          ...settings,
                          twoFactor: !settings.twoFactor,
                        })
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${settings.twoFactor ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-700"}`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform ${settings.twoFactor ? "translate-x-6" : "translate-x-0.5"}`}
                      />
                    </button>
                  </div>

                  {/* Language Select */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Language
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Choose your preferred language
                        </p>
                      </div>
                    </div>
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        setSettings({ ...settings, language: e.target.value })
                      }
                      className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Appearance Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Appearance
                    </h3>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <button
                    onClick={() =>
                      dispatch({ type: "SET_THEME", payload: "light" })
                    }
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                      state.theme === "light"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">Light Mode</span>
                    </div>
                    {state.theme === "light" && (
                      <CheckCircle className="w-5 h-5 text-purple-500" />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      dispatch({ type: "SET_THEME", payload: "dark" })
                    }
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                      state.theme === "dark"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Dark Mode</span>
                    </div>
                    {state.theme === "dark" && (
                      <CheckCircle className="w-5 h-5 text-purple-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Security
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Change Password
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                    Last password change: 30 days ago
                  </p>
                </div>
              </div>

              {/* Danger Zone - Updated with functional delete */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl border border-red-200 dark:border-red-800/50 shadow-sm overflow-hidden">
                <div className="border-b border-red-200 dark:border-red-800/50 px-6 py-4">
                  <h3 className="font-semibold text-red-600 dark:text-red-400">
                    Danger Zone
                  </h3>
                </div>
                <div className="p-6">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
                  <p className="text-xs text-red-600 dark:text-red-400 text-center mt-3">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="border-b border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Change Password
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Update your password to keep your account secure
              </p>
            </div>

            <form onSubmit={handlePasswordChange} className="p-6 space-y-5">
              {passwordError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {passwordError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full border border-red-200 dark:border-red-800/50 shadow-2xl">
            <div className="border-b border-red-200 dark:border-red-800/50 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
                    Delete Account
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    This action is permanent and cannot be undone
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-red-50 dark:bg-red-950/20 rounded-xl p-4 border border-red-200 dark:border-red-800/50">
                <p className="text-sm text-red-800 dark:text-red-300 font-medium mb-2">
                  Warning: This will permanently:
                </p>
                <ul className="text-xs text-red-700 dark:text-red-400 space-y-1 list-disc list-inside">
                  <li>Delete your account and all personal data</li>
                  <li>Remove all your orders and transactions</li>
                  <li>Cancel any active subscriptions</li>
                  <li>You will lose access to all your data</li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type{" "}
                  <span className="font-mono font-bold text-red-600">
                    DELETE
                  </span>{" "}
                  to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE here"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none font-mono"
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmText("");
                  }}
                  className="flex-1 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || deleteConfirmText !== "DELETE"}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Permanently Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
