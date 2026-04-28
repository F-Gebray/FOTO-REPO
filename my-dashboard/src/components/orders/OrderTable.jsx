import { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import {
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter,
} from "lucide-react";
import OrderDetails from "./OrderDetails";

export default function OrderTable() {
  const { state, dispatch, showToast } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("last30");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const pageSize = 6;

  // Function to get date range based on selection
  const getDateRangeFilter = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (dateRange) {
      case "today":
        return { start: today, end: now };
      case "last7":
        const last7 = new Date(today);
        last7.setDate(today.getDate() - 7);
        return { start: last7, end: now };
      case "last30":
        const last30 = new Date(today);
        last30.setDate(today.getDate() - 30);
        return { start: last30, end: now };
      case "last90":
        const last90 = new Date(today);
        last90.setDate(today.getDate() - 90);
        return { start: last90, end: now };
      case "thisyear":
        const thisYear = new Date(today.getFullYear(), 0, 1);
        return { start: thisYear, end: now };
      default:
        const default30 = new Date(today);
        default30.setDate(today.getDate() - 30);
        return { start: default30, end: now };
    }
  };

  // Filter orders by date range, status, and search
  const filteredOrders = useMemo(() => {
    const { start, end } = getDateRangeFilter();

    return state.orders.filter((order) => {
      // Date range filter
      const orderDate = new Date(order.date);
      const matchesDate = orderDate >= start && orderDate <= end;

      // Search filter
      const matchesSearch =
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.product.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toString().includes(search);

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesDate && matchesSearch && matchesStatus;
    });
  }, [state.orders, search, statusFilter, dateRange]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleStatusChange = (orderId, newStatus) => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: { id: orderId, status: newStatus },
    });
    showToast(`Order status updated to ${newStatus}`, "success");
  };

  const statusBadge = {
    completed: "badge-success",
    processing: "badge-info",
    pending: "badge-warning",
    cancelled: "badge-danger",
  };

  // Reset page when filters change
  const handleDateChange = (value) => {
    setDateRange(value);
    setPage(1);
  };

  const handleStatusChangeFilter = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const clearAllFilters = () => {
    setDateRange("last30");
    setStatusFilter("all");
    setSearch("");
    setPage(1);
  };

  const isFiltersActive =
    dateRange !== "last30" || statusFilter !== "all" || search !== "";

  return (
    <>
      {/* Filters Section */}
      <div className="space-y-4 mb-6">
        {/* Date Range and Status Row */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Filters:</span>
          </div>

          {/* Date Range Dropdown */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => handleDateChange(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 rounded-xl bg-gray-800 text-white border border-gray-700 text-sm cursor-pointer focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            >
              <option value="today">Today</option>
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="thisyear">This year</option>
            </select>
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChangeFilter(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700 text-sm cursor-pointer focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Clear all filters button */}
          {isFiltersActive && (
            <button
              onClick={clearAllFilters}
              className="px-3 py-1.5 text-xs bg-purple-900/30 text-purple-400 rounded-lg hover:bg-purple-900/50 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Search Row */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders by customer, product, or ID..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Order ID
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Product
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No orders found matching your filters
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                    #{order.id}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {order.customer}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                    {order.product}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                    ${order.amount}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer ${statusBadge[order.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {Math.min((page - 1) * pageSize + 1, filteredOrders.length)}{" "}
            to {Math.min(page * pageSize, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="flex items-center px-3 text-sm text-gray-600 dark:text-gray-400">
              {page} / {totalPages || 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <OrderDetails
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
