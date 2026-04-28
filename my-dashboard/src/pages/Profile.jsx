import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No user logged in
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
            <User className="w-5 h-5 text-purple-500" />
            <span>{user.name}</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
            <Mail className="w-5 h-5 text-purple-500" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
            <Shield className="w-5 h-5 text-purple-500" />
            <span>{user.role}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate("/settings")}
            className="flex-1 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
