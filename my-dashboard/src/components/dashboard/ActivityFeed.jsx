import { Package, UserPlus, CreditCard, AlertTriangle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "order",
    message: "New order #1089 received",
    time: "2 min ago",
    icon: Package,
  },
  {
    id: 2,
    type: "user",
    message: "New user registered",
    time: "15 min ago",
    icon: UserPlus,
  },
  {
    id: 3,
    type: "payment",
    message: "Payment of $599 received",
    time: "1 hour ago",
    icon: CreditCard,
  },
  {
    id: 4,
    type: "alert",
    message: "Server CPU usage high",
    time: "2 hours ago",
    icon: AlertTriangle,
  },
  {
    id: 5,
    type: "order",
    message: "Order #1088 shipped",
    time: "3 hours ago",
    icon: Package,
  },
];

const typeStyles = {
  order: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  user: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  payment:
    "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  alert: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function ActivityFeed() {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${typeStyles[activity.type]}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.message}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
        View all activity →
      </button>
    </div>
  );
}
