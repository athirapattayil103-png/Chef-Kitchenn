// import React from "react";
// import { FiSettings } from "react-icons/fi";

// const DashHeader = () => {
//   return (
//     <header className="h-[60px] bg-white flex items-center justify-between px-6 shadow">
//       <h2 className="text-lg font-semibold">Dashboard</h2>

//       {/* RIGHT SIDE */}
//       <div className="flex items-center gap-4">
//         <FiSettings className="text-xl cursor-pointer" />

//         {/* ADMIN PROFILE */}
//         <div className="flex items-center gap-2 cursor-pointer">
//           <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white">
//             A
//           </div>
//           <span className="text-sm font-medium">Admin</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashHeader;


import { FiSettings } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";

const DashHeader = ({ onMenuClick }) => {
  return (
    <header className="h-[60px] bg-white flex items-center justify-between px-4 md:px-6 shadow">
      <div className="flex items-center gap-3">
        {/* ☰ MENU (MOBILE ONLY) */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-2xl"
        >
          <HiMenu />
        </button>

        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <FiSettings className="text-xl cursor-pointer" />

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white">
            A
          </div>
          <span className="text-sm font-medium hidden sm:block">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
