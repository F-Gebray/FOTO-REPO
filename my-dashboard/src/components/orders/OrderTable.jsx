import { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import OrderDetails from "./OrderDetails";

export default function OrderTable() {
  const { state, dispatch, showToast } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const pageSize = 6;

  const filteredOrders = useMemo(() => {
    return state.orders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.product.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toString().includes(search);
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [state.orders, search, statusFilter]);

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

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="input w-auto"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="processing">Processing</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
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
            {paginatedOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="py-3 px-4 font-medium">#{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {order.product}
                </td>
                <td className="py-3 px-4 font-medium">${order.amount}</td>
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
                <td className="py-3 px-4 text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-primary-600"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500">
          Showing {Math.min((page - 1) * pageSize + 1, filteredOrders.length)}{" "}
          to {Math.min(page * pageSize, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn-secondary p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="flex items-center px-3 text-sm">
            {page} / {totalPages || 1}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="btn-secondary p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Order details modal */}
      <OrderDetails
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
