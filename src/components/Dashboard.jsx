// import DashSidebar from "./DashSidebar";
// import DashHeader from "./DashHeader";
// import { Outlet } from "react-router-dom";

// const Dashboard = () => {
//   return (
//     <div className="h-screen flex overflow-hidden">
//       {/* SIDEBAR */}
//       <aside className="w-[250px] fixed left-0 top-0 h-screen bg-white border-r">
//         <DashSidebar />
//       </aside>

//       {/* RIGHT SIDE */}
//       <div className="flex-1 ml-[250px] flex flex-col">
//         {/* HEADER */}
//         <div className="h-[60px] fixed top-0 left-[250px] right-0 bg-white border-b z-10">
//           <DashHeader />
//         </div>

//         {/* CONTENT (NO FORCED SCROLL) */}
//         <main className="mt-[60px] p-6 bg-gray-50 min-h-[calc(100vh-60px)]">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useState } from "react";
import DashSidebar from "./DashSidebar";
import DashHeader from "./DashHeader";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`w-[250px] fixed md:static left-0 top-0 h-screen bg-white border-r z-40 transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <DashSidebar />
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <div className="h-[60px] fixed top-0 left-0 md:left-[250px] right-0 bg-white border-b z-20">
          <DashHeader onMenuClick={() => setOpen(true)} />
        </div>

        {/* CONTENT */}
<main className="mt-[60px] p-4 md:p-6 bg-gray-50 min-h-[calc(100vh-60px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
