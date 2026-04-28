import { useState } from "react";
import { Plus } from "lucide-react";
import UserTable from "../components/users/UserTable";
import UserForm from "../components/users/UserForm";

export default function Users() {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your team members and their permissions.
          </p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="card p-6">
        <UserTable onEdit={handleEdit} />
      </div>

      <UserForm isOpen={showForm} onClose={handleClose} user={editingUser} />
    </div>
  );
}
