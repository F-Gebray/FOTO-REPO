import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <div className="flex h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Add mt-16 (margin-top) to push content down */}
        <div className="w-full px-4 pb-4 mt-16">{children}</div>
      </div>
    </div>
  );
}
