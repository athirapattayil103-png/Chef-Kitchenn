import { NavLink } from "react-router-dom";

const DashSidebar = () => {
  const menus = [
    { name: "Products", path: "/dashboard/product" },
    { name: "Category", path: "/dashboard/category" },
    { name: "Orders", path: "/dashboard/ordertype" },
  ];

  return (
    <aside className="bg-white w-[250px] h-screen border-r">
      {/* LOGO / TITLE */}
      <div className="px-6 py-5 text-xl font-semibold border-b">
        DIGITAL MENU
      </div>

      {/* MENU */}
      <nav className="flex flex-col px-4 py-6 gap-2">
        {menus.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-gray-100 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashSidebar;
