import { useState } from "react";
import {
  Plus,
  Users as UsersIcon,
  Shield,
  UserCheck,
  UserPlus,
  TrendingUp,
} from "lucide-react";
import UserTable from "../components/users/UserTable";
import UserForm from "../components/users/UserForm";
import { useApp } from "../context/AppContext";

export default function Users() {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { state } = useApp();

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  // Calculate user stats
  const totalUsers = state.users?.length || 0;
  const activeUsers =
    state.users?.filter((u) => u.status !== "Inactive").length || 0;
  const adminUsers = state.users?.filter((u) => u.role === "Admin").length || 0;
  const newThisMonth =
    state.users?.filter((u) => {
      const joinDate = new Date(u.joinDate);
      const now = new Date();
      return (
        joinDate.getMonth() === now.getMonth() &&
        joinDate.getFullYear() === now.getFullYear()
      );
    }).length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Users
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Manage your team members and their permissions
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <UsersIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-lg">
                Total
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalUsers}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Total Users
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg">
                Active
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeUsers}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Active Users
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
                Admins
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {adminUsers}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Admin Users
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                New
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {newThisMonth}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Joined This Month
            </p>
          </div>
        </div>

        {/* Users Table - All filters are inside UserTable */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6">
            <UserTable onEdit={handleEdit} />
          </div>
        </div>

        {/* Add User Tip */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-xl border border-purple-100 dark:border-purple-900/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <UserPlus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Pro Tip:</span> Click on any
                user row to edit their information, or use the "Add User" button
                to invite new team members.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Form Modal */}
      <UserForm isOpen={showForm} onClose={handleClose} user={editingUser} />
    </div>
  );
}
