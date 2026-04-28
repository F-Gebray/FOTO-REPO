import Modal from "../ui/Modal";
import { Package, Mail, Calendar, CreditCard } from "lucide-react";

export default function OrderDetails({ order, isOpen, onClose }) {
  if (!order) return null;

  const statusColors = {
    completed: "text-green-600 bg-green-100 dark:bg-green-900/30",
    processing: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
    pending: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
    cancelled: "text-red-600 bg-red-100 dark:bg-red-900/30",
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
          <span className="text-sm text-gray-500">Status</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Package className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Product</p>
              <p className="font-medium text-sm">{order.product}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Amount</p>
              <p className="font-medium text-sm">${order.amount}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Customer</p>
              <p className="font-medium text-sm">{order.customer}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-medium text-sm">
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
          <button className="btn-primary">Print Invoice</button>
        </div>
      </div>
    </Modal>
  );
}
