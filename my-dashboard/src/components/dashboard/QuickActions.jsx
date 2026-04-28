import { Link } from "react-router-dom";
import { Plus, FileText, Download, Send } from "lucide-react";

const actions = [
  { label: "New User", icon: Plus, path: "/users", color: "bg-blue-600" },
  {
    label: "Reports",
    icon: FileText,
    path: "/analytics",
    color: "bg-green-600",
  },
  { label: "Export", icon: Download, path: "#", color: "bg-purple-600" },
  { label: "Invite", icon: Send, path: "#", color: "bg-amber-600" },
];

export default function QuickActions() {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className={`p-2 rounded-lg ${action.color} text-white`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
