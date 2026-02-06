import React from "react";
import { FaSearch } from "react-icons/fa";

const MenuHeader = ({
  now,
  searchText,
  setSearchText,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-[#1f2430] border-b border-gray-700">
      {/* TOP HEADER */}
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold">Chef Kitchen</h1>
          <p className="text-sm text-gray-400 hidden sm:block">
            {now.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            •{" "}
            {now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex items-center bg-[#1a1f2e] px-4 py-2 rounded-xl w-[320px] border border-gray-700">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search for food..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex gap-6 px-6 text-sm">
        {["all", "today", "our", "south"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 ${
              activeTab === tab
                ? "text-orange-400 border-b-2 border-orange-400"
                : "text-gray-400"
            }`}
          >
            {tab === "all"
              ? "All"
              : tab === "today"
              ? "Today Special"
              : tab === "our"
              ? "Our Specials"
              : "South Indian Special"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuHeader;
