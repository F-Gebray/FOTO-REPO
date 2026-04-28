import { useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "My Dashboard",
    email: "admin@example.com",
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="card p-6 space-y-4">
        <div>
          <label className="text-sm">Site Name</label>
          <input
            className="input"
            value={settings.siteName}
            onChange={(e) =>
              setSettings({ ...settings, siteName: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm">Email</label>
          <input
            className="input"
            value={settings.email}
            onChange={(e) =>
              setSettings({ ...settings, email: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
