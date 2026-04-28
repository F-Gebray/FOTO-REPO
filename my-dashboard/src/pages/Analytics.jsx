import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { revenueData, trafficSources } from "../data/mockData";
import {
  TrendingUp,
  Users,
  Globe,
  Activity,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import { useState } from "react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [chartType, setChartType] = useState("revenue");

  // Calculate summary stats
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const revenueGrowth = (
    ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) /
      revenueData[0].revenue) *
    100
  ).toFixed(1);

  const COLORS = [
    "#8b5cf6",
    "#3b82f6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Analytics
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Detailed insights and performance metrics
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Time Range Filter */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm cursor-pointer focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              >
                <option value="30days">Last 30 Days</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>

              {/* Export Button */}
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-lg ${revenueGrowth >= 0 ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"}`}
              >
                {revenueGrowth >= 0 ? "+" : ""}
                {revenueGrowth}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              ${(totalRevenue / 1000).toFixed(0)}k
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Total Revenue
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalOrders.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Total Orders
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              ${avgOrderValue.toFixed(0)}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Avg. Order Value
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              4.2
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Conversion Rate %
            </p>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-2 mb-6 inline-flex gap-2">
          <button
            onClick={() => setChartType("revenue")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              chartType === "revenue"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Revenue View
          </button>
          <button
            onClick={() => setChartType("orders")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              chartType === "orders"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Orders View
          </button>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue/Orders Trend */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {chartType === "revenue" ? "Revenue Trend" : "Orders Trend"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {chartType === "revenue"
                  ? "Monthly revenue performance"
                  : "Monthly order volume"}
              </p>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                    />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis
                      stroke="#9ca3af"
                      tickFormatter={(v) =>
                        chartType === "revenue" ? `$${v / 1000}k` : v
                      }
                    />
                    <Tooltip
                      formatter={(value) =>
                        chartType === "revenue"
                          ? `$${value.toLocaleString()}`
                          : value
                      }
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey={chartType === "revenue" ? "revenue" : "orders"}
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Traffic Sources Pie Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Traffic Sources
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Where your visitors come from
              </p>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Comparison Bar Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-6">
          <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Comparison
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Monthly revenue breakdown by category
            </p>
          </div>
          <div className="p-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis
                    tickFormatter={(v) => `$${v / 1000}k`}
                    stroke="#9ca3af"
                  />
                  <Tooltip
                    formatter={(value) => `$${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Performing Products Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Performing Products
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Best selling items this month
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                  {
                    name: "Premium Plan",
                    sales: 245,
                    revenue: "$24,500",
                    growth: "+15%",
                  },
                  {
                    name: "Business Suite",
                    sales: 189,
                    revenue: "$18,900",
                    growth: "+22%",
                  },
                  {
                    name: "Enterprise License",
                    sales: 67,
                    revenue: "$33,500",
                    growth: "+8%",
                  },
                  {
                    name: "Consulting Service",
                    sales: 34,
                    revenue: "$17,000",
                    growth: "+12%",
                  },
                ].map((product, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {product.revenue}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-600 dark:text-green-400">
                      {product.growth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
