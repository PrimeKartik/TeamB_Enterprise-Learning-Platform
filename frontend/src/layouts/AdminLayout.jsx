import { Outlet } from "react-router-dom";

import Sidebar from "../pages/admin/components/Sidebar"
import Topbar from "../pages/admin/components/Topbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-base">

      <Sidebar />

      <div className="flex-1 ml-64">

        <Topbar />

        <div className="p-6">

          <Outlet />

        </div>

      </div>

    </div>
  );
}