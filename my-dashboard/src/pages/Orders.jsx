import { Download, TrendingUp, Package, DollarSign, Clock } from "lucide-react";
import OrderTable from "../components/orders/OrderTable";
import { useApp } from "../context/AppContext";

export default function Orders() {
  const { state, showToast } = useApp();

  // Calculate stats based on ALL orders
  const totalOrders = state.orders.length;
  const totalRevenue = state.orders.reduce(
    (sum, order) => sum + parseFloat(order.amount || 0),
    0,
  );
  const pendingOrders = state.orders.filter(
    (o) => o.status?.toLowerCase() === "pending",
  ).length;
  const completedOrders = state.orders.filter(
    (o) => o.status?.toLowerCase() === "completed",
  ).length;

  const handleExport = () => {
    const csv = [
      ["ID", "Customer", "Product", "Amount", "Status", "Date"],
      ...state.orders.map((o) => [
        o.id,
        o.customer,
        o.product,
        o.amount,
        o.status,
        o.date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Orders exported successfully", "success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Orders
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Track and manage customer orders efficiently
              </p>
            </div>
            <button
              onClick={handleExport}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-lg">
                Total
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalOrders}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Total Orders
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg">
                Revenue
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              ${totalRevenue.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Total Revenue
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                Pending
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {pendingOrders}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Pending Orders
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
                Completed
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {completedOrders}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Completed Orders
            </p>
          </div>
        </div>

        {/* Orders Table - All filters (date, status, search) are inside OrderTable */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6">
            <OrderTable />
          </div>
        </div>
      </div>
    </div>
  );
}
