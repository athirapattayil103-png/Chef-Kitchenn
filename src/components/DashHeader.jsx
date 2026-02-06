import React from "react";
import { FiSettings } from "react-icons/fi";

const DashHeader = () => {
  return (
    <header className="h-[60px] bg-white flex items-center justify-between px-6 shadow">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <FiSettings className="text-xl cursor-pointer" />

        {/* ADMIN PROFILE */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white">
            A
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
