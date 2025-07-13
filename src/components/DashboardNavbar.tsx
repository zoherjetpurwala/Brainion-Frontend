import React, { useState } from "react";
import { Menu, X, SearchIcon } from "lucide-react";
import UploadDialog from "./UploadDialog";
import { useUserStore } from "../store/useUserStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FaSignOutAlt } from "react-icons/fa";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

type NavbarProps = {
  toggleSidebar: () => void;
  toggleSearchBar: () => void;
  isSidebarOpen: boolean;
  activeContent: string;
};

const DashboardNavbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  toggleSearchBar,
  isSidebarOpen,
  activeContent,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, logout } = useUserStore();

  return (
    <div className="w-full lg:w-[calc(100%-18rem)] fixed bg-blue-100/30 border-b border-blue-200/50 py-4 px-4 flex justify-between items-center h-24 shadow-sm">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mr-4 p-2 hover:bg-blue-100/50 rounded-xl transition-all duration-300 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {activeContent}
        </h1>
      </div>
      <div className="flex items-center w-full justify-end gap-3">
        <UploadDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
        <button
          onClick={toggleSearchBar}
          className="h-12 max-sm:w-12 md:py-2 md:px-4 flex justify-center items-center border rounded-2xl border-blue-200/60 bg-blue-100/40 hover:bg-blue-100/70 hover:shadow-lg hover:border-blue-300/60 transition-all duration-300"
        >
          <span className="flex gap-2 items-center">
            <SearchIcon className="h-5 w-5 text-blue-700" />
            <h1 className="max-sm:hidden font-medium text-blue-700">AI Search</h1>
          </span>
        </button>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-12 h-12 rounded-2xl border-2 border-blue-200/60 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl shadow-xl">
              <DropdownMenuLabel className="p-3 border-b border-blue-200/30 font-medium text-gray-800">
                Hello, {user?.name.split(" ")[0] || user?.name}
              </DropdownMenuLabel>
              <DropdownMenuItem 
                onClick={logout} 
                className="text-red-600 hover:bg-red-50/80 rounded-xl m-2 p-3 transition-all duration-300 font-medium"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;