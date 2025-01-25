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
      className={`fixed h-screen w-64 text-slate-800 flex flex-col max-sm:rounded-r-3xl justify-between items-center z-30 transform transition-transform duration-300 shadow-inner rounded-r-2xl border border-blue-950/25 bg-gray-50 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="w-full relative ml-3">
        <div className="flex items-center justify-between h-24 text-3xl text-blue-900 font-bold">
          <h2 className="p-4">Brainion.</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden pr-4 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <ul className="space-y-2 relative">
          {/* Animated Bubble */}
          <div
            className={`absolute top-0 left-2 w-[90%] ring-1 ring-blue-800/25 h-14 bg-white shadow-md shadow-blue-800/15  rounded-2xl transition-all duration-500 ease-in-out`}
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
