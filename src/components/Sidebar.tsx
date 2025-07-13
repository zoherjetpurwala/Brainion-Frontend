import {
  BrainCircuit,
  Lightbulb,
  LucideSettings,
  UserCircle2,
  X,
  ChevronRight,
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
      icon: <BrainCircuit width={20} />,
      path: "/dashboard",
      description: "Overview & stats",
    },
    {
      name: "Ideas",
      icon: <Lightbulb width={20} />,
      path: "/dashboard/ideas",
      description: "Notes, docs & links",
    },
    {
      name: "Profile",
      icon: <UserCircle2 width={20} />,
      path: "/dashboard/profile",
      description: "Account settings",
    },
    {
      name: "Settings",
      icon: <LucideSettings width={20} />,
      path: "/dashboard/settings",
      description: "Preferences",
    },
  ];

  return (
    <div
      className={`fixed h-screen w-72 text-gray-800 flex flex-col max-sm:rounded-r-3xl justify-between items-center z-30 transform transition-all duration-500 ease-out bg-white backdrop-blur-sm border-r border-blue-200/50 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="w-full relative max-sm:rounded-r-3xl">
        {/* Header */}
        <div className="flex items-center justify-between h-24 border-b border-blue-200/30 bg-blue-100/30 max-sm:rounded-r-3xl">
          <div className="p-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent ubuntu-medium">
              Brainion.
            </h2>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden pr-6 focus:outline-none hover:bg-blue-100/50 rounded-full p-2 transition-all duration-300"
            aria-label="Toggle sidebar"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Navigation */}
        <div className="mt-8 px-4">
          <ul className="space-y-2 relative">
            {/* Active item background */}
            <div
              className={`absolute left-0 w-full h-[72px] bg-gradient-to-r from-blue-700/10 to-blue-600/5 border border-blue-700/20 rounded-2xl shadow-lg transition-all duration-500 ease-out ${
                activeContent ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `translateY(${
                  menuItems.findIndex((item) => item.name === activeContent) * 5
                }rem)`,
              }}
            ></div>

            {menuItems.map((item, _) => {
              const isActive = activeContent === item.name;
              return (
                <li
                  key={item.name}
                  className={`relative flex items-center gap-4 p-4 cursor-pointer rounded-2xl z-10 group transition-all duration-300 hover:bg-blue-50/50 ${
                    isActive 
                      ? "text-blue-700 transform translate-x-1" 
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setActiveContent(item.name);
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  {/* Icon container */}
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-blue-700/90 text-white shadow-lg shadow-blue-700/30" 
                      : "bg-blue-100/60 text-blue-600 group-hover:bg-blue-200/80"
                  }`}>
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm transition-colors duration-300 ${
                      isActive ? "text-blue-700" : "text-gray-700 group-hover:text-blue-700"
                    }`}>
                      {item.name}
                    </p>
                    <p className={`text-xs transition-colors duration-300 truncate ${
                      isActive ? "text-blue-600/70" : "text-gray-500 group-hover:text-blue-600/70"
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
                    isActive 
                      ? "text-blue-700 transform opacity-100" 
                      : "text-gray-400 opacity-0 group-hover:opacity-50"
                  }`} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full p-6 border-t border-blue-200/30 bg-blue-100/20 max-sm:rounded-r-3xl">
        <div className="text-center">
          <p className="text-xs text-blue-600/60 font-medium">
            Built with ❤️ for productivity
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;