import { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { Edit, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import ConfirmDialog from "../ui/ConfirmDialog";

export default function UserTable({ onEdit }) {
  const { state, dispatch, showToast } = useApp();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const pageSize = 5;

  const filteredUsers = useMemo(() => {
    let result = state.users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });

    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [state.users, search, roleFilter, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_USER", payload: deleteId });
    showToast("User deleted successfully", "success");
    setDeleteId(null);
  };

  const statusBadge = {
    active:
      "inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    inactive:
      "inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    pending:
      "inline-flex px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input pl-10"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="input w-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
        >
          <option value="all">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="input w-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th
                className="text-left py-3 px-4 text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => handleSort("name")}
              >
                User{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => handleSort("role")}
              >
                Role{" "}
                {sortConfig.key === "role" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Join Date
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center font-medium">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {user.role}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <span className={statusBadge[user.status]}>
                    {user.status}
                  </span>
                </td>

                <td className="py-3 px-4 text-sm text-gray-500">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>

                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-purple-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteId(user.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500">
          Showing {Math.min((page - 1) * pageSize + 1, filteredUsers.length)} to{" "}
          {Math.min(page * pageSize, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn-secondary p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="flex items-center px-3 text-sm">
            {page} / {totalPages || 1}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="btn-secondary p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        danger
      />
    </>
  );
}
