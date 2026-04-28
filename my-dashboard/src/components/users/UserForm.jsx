import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { useApp } from "../../context/AppContext";

export default function UserForm({ isOpen, onClose, user }) {
  const { dispatch, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Viewer",
    status: "pending",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "Viewer",
        status: user.status || "pending",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "Viewer",
        status: "pending",
      });
    }
    setErrors({});
  }, [user, isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const avatar = formData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    if (user) {
      dispatch({
        type: "UPDATE_USER",
        payload: { ...user, ...formData, avatar },
      });
      showToast("User updated successfully", "success");
    } else {
      dispatch({
        type: "ADD_USER",
        payload: {
          ...formData,
          avatar,
          joinDate: new Date().toISOString().split("T")[0],
        },
      });
      showToast("User created successfully", "success");
    }

    onClose();
  };

  const inputClass = (error) =>
    `w-full px-3 py-2 rounded-lg border text-sm transition
     bg-white dark:bg-gray-900
     text-gray-900 dark:text-gray-100
     border-gray-200 dark:border-gray-700
     focus:outline-none focus:ring-2 focus:ring-purple-500
     ${error ? "border-red-500 focus:ring-red-500" : ""}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? "Edit User" : "Add New User"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass(errors.name)}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={inputClass(errors.email)}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className={inputClass(false)}
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className={inputClass(false)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:opacity-80"
          >
            Cancel
          </button>

          <button type="submit" className="btn-primary">
            {user ? "Save Changes" : "Create User"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
