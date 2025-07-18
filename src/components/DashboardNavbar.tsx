import React, { useState } from "react";
import { Menu, X, SearchIcon, User, Settings, LogOut, ChevronRight } from "lucide-react";
import UploadDialog from "./UploadDialog";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
    setDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    navigate("/dashboard/settings");
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
  };

  return (
    <div className="w-full lg:w-[calc(100%-18rem)] fixed bg-blue-50 border-b border-blue-200/50 py-4 px-4 flex justify-between items-center h-24 shadow-sm z-40 bg-blue-100/30">
      <div className="w-full flex items-center">
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
            className="h-12 max-sm:w-12 md:py-2 md:px-4 flex justify-center items-center border rounded-2xl border-blue-400/90 bg-blue-200/90 hover:bg-blue-100/70 hover:shadow-lg hover:border-blue-300/60 transition-all duration-300 text-blue-700"
          >
            <span className="flex gap-2 items-center">
              <SearchIcon className="h-5 w-5" />
              <h1 className="max-sm:hidden font-medium">AI Search</h1>
            </span>
          </button>

          {user && (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="relative group">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-2xl border-2 border-blue-200/60 hover:border-blue-400/80 hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full opacity-90"></div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-64 bg-white/95 backdrop-blur-lg border border-blue-200/50 rounded-2xl shadow-2xl p-2 mt-2" 
                align="end"
                sideOffset={8}
              >
                {/* User Info Header */}
                <DropdownMenuLabel className="p-4 border-b border-blue-100/50">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-xl border border-blue-200/60"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                {/* Menu Items */}
                <div className="py-2">
                  <DropdownMenuItem 
                    onClick={handleProfileClick}
                    className="flex items-center gap-3 p-3 rounded-xl m-1 cursor-pointer hover:bg-blue-50/80 transition-all duration-200 group"
                  >
                    <div className="p-2 bg-blue-100/60 rounded-lg group-hover:bg-blue-200/80 transition-colors duration-200">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">View Profile</p>
                      <p className="text-xs text-gray-500">Manage your account</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                  </DropdownMenuItem>

                  <DropdownMenuItem 
                    onClick={handleSettingsClick}
                    className="flex items-center gap-3 p-3 rounded-xl m-1 cursor-pointer hover:bg-blue-50/80 transition-all duration-200 group"
                  >
                    <div className="p-2 bg-gray-100/60 rounded-lg group-hover:bg-gray-200/80 transition-colors duration-200">
                      <Settings className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Settings</p>
                      <p className="text-xs text-gray-500">Preferences & privacy</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                  </DropdownMenuItem>

                  {/* <DropdownMenuItem 
                    className="flex items-center gap-3 p-3 rounded-xl m-1 cursor-pointer hover:bg-purple-50/80 transition-all duration-200 group"
                  >
                    <div className="p-2 bg-purple-100/60 rounded-lg group-hover:bg-purple-200/80 transition-colors duration-200">
                      <HelpCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Help & Support</p>
                      <p className="text-xs text-gray-500">Get assistance</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors duration-200" />
                  </DropdownMenuItem> */}
                </div>

                <DropdownMenuSeparator className="my-2 bg-blue-100/50" />

                {/* Logout */}
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-xl m-1 cursor-pointer hover:bg-red-50/80 transition-all duration-200 group"
                >
                  <div className="p-2 bg-red-100/60 rounded-lg group-hover:bg-red-200/80 transition-colors duration-200">
                    <LogOut className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-red-700">Sign Out</p>
                    <p className="text-xs text-red-500">Logout from your account</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;