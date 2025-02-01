import React, { useState } from "react";
import { Menu, X, SearchIcon } from "lucide-react";
import { useUser } from "../context/UserContext";
import UploadDialog from "./UploadDialog";
import useFetchContent from "../hooks/useFetchContent";

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
  const { user, logout } = useUser();
  const { fetchData} = useFetchContent(user?.id);
  return (
    <div className="w-full lg:w-[calc(100%-16rem)] fixed bg-white border-b border-gray-200 py-4 px-4 flex justify-between items-center h-24">
            <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mr-4 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        <h1 className="text-2xl font-semibold text-blue-950">{activeContent}</h1>
      </div>
      <div className="flex items-center w-full justify-end gap-3">
        <UploadDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} fetchData={fetchData} />
        <button
          onClick={toggleSearchBar}
          className="h-12 max-sm:w-12 md:py-2 md:px-4 flex justify-center items-center border rounded-2xl border-blue-800/25 bg-white shadow-none hover:shadow-blue-800/25 hover:shadow-md transition-shadow duration-300"
        >
          <span className="flex gap-2">
            <SearchIcon className="h-6 w-6 text-blue-700" />
            <h1 className="max-sm:hidden">AI Search</h1>
          </span>
        </button>

        {user && (
          <img
            src={user.avatar}
            alt="Profile"
            onClick={logout}
            className="w-12 h-12 rounded-full border border-blue-800/25 shadow-none hover:shadow-blue-800/25 hover:shadow-md transition-shadow duration-300"
          />
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
