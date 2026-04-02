import { Routes, Route } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Overview from "./pages/Overview";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import ReportsPage from "./pages/ReportsPage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import HelpPage from "./pages/HelpPage";

export default function App() {
  return (
    <SettingsProvider>
      <DashboardLayout>
        <Routes>
          {/* Original routes */}
          <Route path="/" element={<Overview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />

          {/* New routes for modern sidebar items */}
          {/* <Route path="/reports" element={<Reports />} /> */}
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/messages" element={<MessagesPage />} />

          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </DashboardLayout>
    </SettingsProvider>
  );
}
