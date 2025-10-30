import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}
