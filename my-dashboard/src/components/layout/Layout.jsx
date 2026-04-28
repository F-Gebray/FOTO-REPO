import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Toast from "../ui/Toast";
import { useApp } from "../../context/AppContext";

export default function Layout() {
  const { state } = useApp();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
          <Outlet />
        </main>
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {state.toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </div>
  );
}
