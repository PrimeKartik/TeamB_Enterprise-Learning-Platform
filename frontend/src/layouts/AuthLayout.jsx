import { Outlet } from "react-router-dom";

import AuthNavbar from "../components/New folder/AuthNavbar";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-base flex flex-col">
      <AuthNavbar />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <Outlet />
      </div>
    </div>
  );
}
