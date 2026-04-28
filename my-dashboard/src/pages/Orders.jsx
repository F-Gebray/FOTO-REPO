import { Download } from "lucide-react";
import OrderTable from "../components/orders/OrderTable";
import { useApp } from "../context/AppContext";

export default function Orders() {
  const { state, showToast } = useApp();

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
    a.download = "orders.csv";
    a.click();
    showToast("Orders exported successfully", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track and manage customer orders.
          </p>
        </div>
        <button onClick={handleExport} className="btn-secondary">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="card p-6">
        <OrderTable />
      </div>
    </div>
  );
}
