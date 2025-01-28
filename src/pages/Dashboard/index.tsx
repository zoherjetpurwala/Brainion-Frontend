import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { Routes, Route, Navigate } from "react-router-dom";
import IdeasPage from "../../components/dashboard/IdeasPage";
import Sidebar from "../../components/Sidebar";
import DashboardNavbar from "../../components/DashboardNavbar";
import SearchbarOverlay from "../../components/SearchbarOverlay";
import DashboardPage from "../../components/dashboard/DashboardPage";

const Dashboard: React.FC = () => {
  const { loading } = useUser();
  const [activeContent, setActiveContent] = useState<string>("Dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSearchBar = () => {
    setSearchOpen(!isSearchOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        toggleSearchBar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex h-screen relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-1000 lg:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <SearchbarOverlay
        isSearchOpen={isSearchOpen}
        toggleSearchBar={toggleSearchBar}
      />

      {/* Sidebar */}
      <Sidebar
        activeContent={activeContent}
        setActiveContent={setActiveContent}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 lg:pl-64 flex flex-col w-full bg-white transition-all duration-300">
        {/* Navbar */}
        <DashboardNavbar
          toggleSidebar={toggleSidebar}
          toggleSearchBar={toggleSearchBar}
          isSidebarOpen={isSidebarOpen}
          activeContent={activeContent}
        />

        {/* Main Content */}
        <main className="mt-24">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route
              path="/profile"
              element={
                <div className="flex justify-center items-center">
                  <div
                    className="w-[512px] h-[512px] max-sm:w-96 max-sm:h-96 bg-cover bg-center bg-no-repeat rounded-3xl"
                    style={{
                      backgroundImage: "url('/comingsoon.svg')",
                    }}
                  ></div>
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="flex justify-center items-center">
                  <div
                    className="w-[512px] h-[512px] max-sm:w-96 max-sm:h-96 bg-cover bg-center bg-no-repeat rounded-3xl"
                    style={{
                      backgroundImage: "url('/comingsoon.svg')",
                    }}
                  ></div>
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
