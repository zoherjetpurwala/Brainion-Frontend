import {
  BrainCircuit,
  Lightbulb,
  LucideSettings,
  UserCircle2,
  X,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  activeContent: string;
  setActiveContent: (content: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  activeContent,
  setActiveContent,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <BrainCircuit width={18} />,
      path: "/dashboard",
    },
    {
      name: "Ideas",
      icon: <Lightbulb width={18} />,
      path: "/dashboard/ideas",
    },
    {
      name: "Profile",
      icon: <UserCircle2 width={18} />,
      path: "/dashboard/profile",
    },
    {
      name: "Settings",
      icon: <LucideSettings width={18} />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div
      className={`fixed h-screen w-64 text-gray-800 flex flex-col max-sm:rounded-r-3xl justify-between items-center z-30 transform transition-transform duration-300 shadow-lg shadow-gray-200 rounded-r-2xl bg-white ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="w-full relative">
        <div className="flex items-center justify-between h-24 text-4xl font-bold border-b">
          <h2 className="p-4 text-blue-950 ubuntu-medium">Brainion.</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden pr-4 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <X className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        <ul className="space-y-2 relative mt-4">
          <div
            className={`absolute top-0 left-2 w-[90%] border h-14 rounded-md border-blue-800/25 bg-white shadow-md shadow-blue-800/25 transition-all duration-500 ease-in-out`}
            style={{
              transform: `translateY(${
                menuItems.findIndex((item) => item.name === activeContent) * 4
              }rem)`,
            }}
          ></div>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`relative flex gap-2 items-center text-sm font-semibold p-4 pl-6 cursor-pointer rounded-2xl z-10 ${
                activeContent === item.name ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => {
                navigate(item.path);
                setActiveContent(item.name);
                toggleSidebar();
              }}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
