import DashSidebar from "./DashSidebar";
import DashHeader from "./DashHeader";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-[250px] fixed left-0 top-0 h-screen bg-white border-r">
        <DashSidebar />
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex-1 ml-[250px] flex flex-col">
        {/* HEADER */}
        <div className="h-[60px] fixed top-0 left-[250px] right-0 bg-white border-b z-10">
          <DashHeader />
        </div>

        {/* CONTENT (NO FORCED SCROLL) */}
        <main className="mt-[60px] p-6 bg-gray-50 min-h-[calc(100vh-60px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
