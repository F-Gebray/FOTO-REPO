import {
  Download,
  Filter,
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import OrderTable from "../components/orders/OrderTable";
import { useApp } from "../context/AppContext";
import { useState } from "react";

export default function Orders() {
  const { state, showToast } = useApp();
  const [dateRange, setDateRange] = useState("last30");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate stats
  const totalOrders = state.orders.length;
  const totalRevenue = state.orders.reduce(
    (sum, order) => sum + parseFloat(order.amount || 0),
    0,
  );
  const pendingOrders = state.orders.filter(
    (o) => o.status === "Pending",
  ).length;
  const completedOrders = state.orders.filter(
    (o) => o.status === "Completed",
  ).length;

  // Pagination calculations
  const totalPages = Math.ceil(totalOrders / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = state.orders.slice(startIndex, endIndex);

  // Generate page numbers to show (show 5 pages)
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 4);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 4);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
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

        {/* Filters Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filters:
              </span>
            </div>

            {/* Date Range Dropdown - Dark */}
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all [&>option]:bg-gray-800 [&>option]:text-white"
              >
                <option value="today" className="bg-gray-800 text-white">
                  Today
                </option>
                <option value="last7" className="bg-gray-800 text-white">
                  Last 7 days
                </option>
                <option value="last30" className="bg-gray-800 text-white">
                  Last 30 days
                </option>
                <option value="last90" className="bg-gray-800 text-white">
                  Last 90 days
                </option>
                <option value="thisyear" className="bg-gray-800 text-white">
                  This year
                </option>
              </select>
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Status Dropdown - Dark */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all [&>option]:bg-gray-800 [&>option]:text-white"
              >
                <option value="all" className="bg-gray-800 text-white">
                  All Status
                </option>
                <option value="pending" className="bg-gray-800 text-white">
                  Pending
                </option>
                <option value="processing" className="bg-gray-800 text-white">
                  Processing
                </option>
                <option value="completed" className="bg-gray-800 text-white">
                  Completed
                </option>
                <option value="cancelled" className="bg-gray-800 text-white">
                  Cancelled
                </option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Search Input */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Active Filters Badge */}
            {(dateRange !== "last30" ||
              statusFilter !== "all" ||
              searchTerm) && (
              <button
                onClick={() => {
                  setDateRange("last30");
                  setStatusFilter("all");
                  setSearchTerm("");
                }}
                className="px-3 py-1.5 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <OrderTable orders={currentOrders} />
          </div>
        </div>

        {/* Pagination - Fixed Layout */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {Math.min(endIndex, totalOrders)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {totalOrders}
              </span>{" "}
              results
            </div>

            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Prev</span>
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[40px] h-10 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <span className="text-sm">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
