import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Award,
  Zap,
  Clock,
  CheckCircle,
  Activity,
} from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import QuickActions from "../components/dashboard/QuickActions";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { state } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const totalRevenue = state.orders.reduce((sum, o) => sum + o.amount, 0);
  const completedOrders = state.orders.filter(
    (o) => o.status === "completed",
  ).length;
  const pendingOrders = state.orders.filter(
    (o) => o.status === "pending",
  ).length;
  const completionRate =
    state.orders.length > 0
      ? Math.round((completedOrders / state.orders.length) * 100)
      : 0;

  // Format date
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                    Live
                  </span>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {getGreeting()}, {user?.name?.split(" ")[0] || "User"}! Welcome
                back. Here's what's happening today.
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <Calendar className="w-4 h-4 text-purple-500" />
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {formattedDate}
                </span>
                <span className="mx-2 text-gray-300 dark:text-gray-700">|</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {formattedTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Clickable cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div
            onClick={() => navigate("/analytics")}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <StatCard
              title="Total Revenue"
              value={`$${totalRevenue.toLocaleString()}`}
              change="+12.5%"
              changeType="increase"
              icon={DollarSign}
              color="blue"
            />
          </div>

          <div
            onClick={() => navigate("/users")}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <StatCard
              title="Total Users"
              value={state.users.length}
              change="+8.2%"
              changeType="increase"
              icon={Users}
              color="green"
            />
          </div>

          <div
            onClick={() => navigate("/orders")}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <StatCard
              title="Total Orders"
              value={state.orders.length}
              change="+5.7%"
              changeType="increase"
              icon={ShoppingCart}
              color="purple"
            />
          </div>

          <div
            onClick={() => navigate("/analytics")}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <StatCard
              title="Completion Rate"
              value={`${completionRate}%`}
              change="-2.1%"
              changeType="decrease"
              icon={TrendingUp}
              color="amber"
            />
          </div>
        </div>

        {/* Glassmorphism Metrics Row - Clickable cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Pending Orders - Navigate to Orders with pending filter */}
          <div
            onClick={() => navigate("/orders")}
            className="relative overflow-hidden bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 dark:border-gray-700/40 shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-orange-500/20 rounded-xl backdrop-blur-sm group-hover:bg-orange-500/30 transition-colors">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-orange-500/70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {pendingOrders}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Pending Orders
              </div>
              <div className="mt-3 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                  style={{
                    width: `${(pendingOrders / state.orders.length) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {((pendingOrders / state.orders.length) * 100).toFixed(1)}% of
                total orders • Click to view
              </div>
            </div>
          </div>

          {/* Completion Rate - Navigate to Analytics */}
          <div
            onClick={() => navigate("/analytics")}
            className="relative overflow-hidden bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 dark:border-gray-700/40 shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-emerald-500/20 rounded-xl backdrop-blur-sm group-hover:bg-emerald-500/30 transition-colors">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-500/70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {completionRate}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Completion Rate
              </div>
              <div className="mt-3 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {completedOrders} out of {state.orders.length} orders completed
                • Click for insights
              </div>
            </div>
          </div>

          {/* System Status - Navigate to Settings or Help */}
          <div
            onClick={() => navigate("/settings")}
            className="relative overflow-hidden bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 dark:border-gray-700/40 shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-cyan-500/20 rounded-xl backdrop-blur-sm group-hover:bg-cyan-500/30 transition-colors">
                  <Activity className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-cyan-500/70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Operational
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                System Status
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  All systems operational
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Last checked: Just now • Click for details
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm overflow-hidden">
              <div className="border-b border-gray-200/50 dark:border-gray-800/50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Revenue Overview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Monthly revenue trends and analytics
                </p>
              </div>
              <div className="p-6">
                <RevenueChart />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm overflow-hidden">
              <div className="border-b border-gray-200/50 dark:border-gray-800/50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Actions
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Common tasks and shortcuts
                </p>
              </div>
              <div className="p-6">
                <QuickActions />
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm overflow-hidden">
              <div className="border-b border-gray-200/50 dark:border-gray-800/50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Latest updates and notifications
                </p>
              </div>
              <div className="p-6">
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Insights Footer - Also clickable */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => navigate("/analytics")}
            className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-800/50 p-4 cursor-pointer transition-all hover:scale-105 hover:bg-white/80 dark:hover:bg-gray-900/80"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100/50 dark:bg-purple-900/20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Performance Insight
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Your revenue has increased by 12.5% compared to last month.
                  Great progress! Click for details →
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/users")}
            className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-800/50 p-4 cursor-pointer transition-all hover:scale-105 hover:bg-white/80 dark:hover:bg-gray-900/80"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100/50 dark:bg-green-900/20 rounded-lg">
                <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  User Growth
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {state.users.length} total users with 8.2% growth rate this
                  quarter. Click to manage →
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
