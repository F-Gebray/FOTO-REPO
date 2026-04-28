import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    green:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    purple:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    amber:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>

          {change && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${
                changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}
            >
              {changeType === "increase" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">{change}</span>
              <span className="text-gray-500 dark:text-gray-400">
                vs last month
              </span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
