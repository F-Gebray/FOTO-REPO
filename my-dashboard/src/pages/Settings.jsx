import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Save, Bell, Shield, Palette } from "lucide-react";

export default function Settings() {
  const { state, dispatch, showToast } = useApp();
  const [settings, setSettings] = useState({
    siteName: "My Dashboard",
    email: "admin@example.com",
    notifications: true,
    twoFactor: false,
  });

  const handleSave = () => {
    showToast("Settings saved successfully", "success");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* General settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">General</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                  className="input"
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">
                      Receive email updates
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
                  className={`w-12 h-6 rounded-full transition-colors ${settings.notifications ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-700"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${settings.notifications ? "translate-x-6" : "translate-x-0.5"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Two-Factor Auth</p>
                    <p className="text-sm text-gray-500">Enhanced security</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setSettings({ ...settings, twoFactor: !settings.twoFactor })
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${settings.twoFactor ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-700"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${settings.twoFactor ? "translate-x-6" : "translate-x-0.5"}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold">Appearance</h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={() =>
                  dispatch({ type: "SET_THEME", payload: "light" })
                }
                className={`w-full p-3 rounded-lg border-2 transition-colors ${state.theme === "light" ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700"}`}
              >
                Light Mode
              </button>
              <button
                onClick={() => dispatch({ type: "SET_THEME", payload: "dark" })}
                className={`w-full p-3 rounded-lg border-2 transition-colors ${state.theme === "dark" ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700"}`}
              >
                Dark Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
