import React from "react";
import { Menu, X, SearchIcon, PlusCircleIcon } from "lucide-react";
import { useUser } from "../context/UserContext";

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
  const { user, logout } = useUser();
  return (
    <div className="w-full sm:w-[calc(100%-18rem)] fixed backdrop-blur-3xl rounded-r-2xl border border-blue-950/25 p-3 flex justify-between items-center md:ml-64 shadow-sm shadow-blue-800/25 md:right-4 md:top-3 mr-3 sm:mx-auto rounded-2xl max-sm:mx-[0.5rem] max-sm:top-3 max-sm:max-w-[calc(100%-1rem)]">
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
        <h1 className="text-2xl font-normal">{activeContent}</h1>
      </div>
      <div className="flex items-center w-full justify-end gap-2">
        <button
          onClick={() => {
            console.log("THIS WORKS");
          }}
          className="h-12 max-sm:w-12 md:py-2 md:px-4 flex justify-center items-center border rounded-full border-blue-800/25 bg-white shadow-md shadow-blue-800/25"
        >
          <span className="flex gap-2">
            <PlusCircleIcon className="h-6 w-6 text-blue-700" />
            <h1 className="max-sm:hidden">Add Ideas</h1>
          </span>
        </button>
        <button
          onClick={toggleSearchBar}
          className="h-12 max-sm:w-12 md:py-2 md:px-4 flex justify-center items-center border rounded-full border-blue-800/25 bg-white shadow-md shadow-blue-800/25"
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
            className="w-12 h-12 rounded-full border border-blue-800/25 shadow-md shadow-blue-800/25"
          />
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
