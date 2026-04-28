import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import QuickActions from "../components/dashboard/QuickActions";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { state } = useApp();

  const totalRevenue = state.orders.reduce((sum, o) => sum + o.amount, 0);
  const completedOrders = state.orders.filter(
    (o) => o.status === "completed",
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+12.5%"
          changeType="increase"
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Total Users"
          value={state.users.length}
          change="+8.2%"
          changeType="increase"
          icon={Users}
          color="green"
        />
        <StatCard
          title="Total Orders"
          value={state.orders.length}
          change="+5.7%"
          changeType="increase"
          icon={ShoppingCart}
          color="purple"
        />
        <StatCard
          title="Completion Rate"
          value={`${Math.round((completedOrders / state.orders.length) * 100)}%`}
          change="-2.1%"
          changeType="decrease"
          icon={TrendingUp}
          color="amber"
        />
      </div>

      {/* Charts and widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
