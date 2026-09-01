import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, User } from "lucide-react";

function SideBar() {
  const navItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      to: "/add-todo",
      label: "Add Todo",
      icon: <PlusCircle size={20} />,
    },
    {
      to: "/profile",
      label: "Profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-blue-500">

      <nav className="flex flex-col gap-2 p-5">

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
              ${
                isActive
                  ? "bg-green-500 text-white shadow-md"
                  : "text-white hover:bg-blue-500"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}

export default SideBar;