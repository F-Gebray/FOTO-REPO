import Modal from "../ui/Modal";
import { Package, Mail, Calendar, CreditCard, Printer } from "lucide-react";

export default function OrderDetails({ order, isOpen, onClose }) {
  if (!order) return null;

  const statusColors = {
    completed:
      "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    processing:
      "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
    pending:
      "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
    cancelled: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order #${order.id}`}
      size="md"
    >
      <div className="space-y-6">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Status
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Package className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Product
              </p>
              <p className="font-medium text-sm text-gray-900 dark:text-white">
                {order.product}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <CreditCard className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
              <p className="font-medium text-sm text-gray-900 dark:text-white">
                ${order.amount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Customer
              </p>
              <p className="font-medium text-sm text-gray-900 dark:text-white">
                {order.customer}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-medium text-sm text-gray-900 dark:text-white">
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium transition-all duration-200 flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print Invoice
          </button>
        </div>
      </div>
    </Modal>
  );
}
