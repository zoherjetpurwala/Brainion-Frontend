import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import {
  Home,
  Menu,
  Settings,
  User2,
  FileText,
  Video,
  Twitter,
  StickyNote,
  X,
  SearchIcon,
  ArrowDown,
  ArrowUp,
  ArrowUp01Icon,
  ArrowDown01Icon,
  ChevronUpCircle,
  ChevronDownCircle,
} from "lucide-react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { SearchBar } from "../components/ui/search-bar";
import HomePage from "../components/dashboard/HomePage";
import AskQuestionPage from "../components/dashboard/AskQuestionPage";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const Dashboard: React.FC = () => {
  const { user, loading, logout } = useUser();
  const [activeContent, setActiveContent] = useState<string>("Home");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true); // Track whether the content is expanded

  const handleSearch = async (searchQuery: string) => {
    if (!user?.id) {
      console.error("User ID is missing.");
      return;
    }

    if (!searchQuery) {
      setError("Please enter a query.");
      return;
    }

    setSearchLoading(true);
    setError(null);
    setResults([]);
    setAnswer(null);

    try {
      const userId = user.id;
      const contentType = "NOTE";

      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/notes`, {
        query: searchQuery,
        userId,
        contentType,
      });

      const { title, answer, listOfNotes } = response.data;

      setResults(listOfNotes);
      setAnswer(`Answer based on your note titled "${title}":\n${answer}`);
    } catch (error: any) {
      setError(error.response?.data?.error || "Something went wrong.");
    } finally {
      setSearchLoading(false);
    }
  };

  const navigate = useNavigate();
  const toggleSearchBar = () => {
    setSearchOpen(!isSearchOpen);
    setError(null);
    setResults([]);
    setAnswer(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return <p>"Loading..."</p>;
  }

  return (
    <div className="flex h-screen relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-1000 lg:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SearchBar Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4 overflow-y-auto"
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
              }
            `}</style>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="rounded-2xl w-full max-w-3xl relative mt-8"
            >
              <button
                onClick={toggleSearchBar}
                className="absolute top-4 p-1 right-[-4px] text-2xl text-gray-600 bg-white rounded-lg hover:text-gray-800 transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="p-6">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Search for anything..."
                />
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto rounded-2xl">
                  {searchLoading && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-600 bg-white rounded-2xl p-8"
                    >
                      Searching...
                    </motion.p>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-red-100 text-red-700 rounded-lg"
                    >
                      {error}
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {answer && (
                      <motion.div
                        key="answer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-3 p-4 rounded-2xl shadow-md bg-blue-100  overflow-hidden"
                      >
                        <div className="flex justify-between">
                          <h2 className="text-2xl font-bold">
                            Brainion's answer
                          </h2>

                          <button
                            onClick={() => setIsOpen((prev) => !prev)} // Toggle isOpen state
                            className="text-blue-500 hover:text-blue-700"
                          >
                            {isOpen ? <ChevronUpCircle className="w-4 h-4"/> : <ChevronDownCircle className="w-4 h-4" />}
                          </button>
                        </div>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 overflow-hidden"
                          >
                            {answer.split("\n").map((line, index) => (
                              <p key={index} className="mb-2">
                                {line}
                              </p>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {results.length > 0 && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-3 p-4 bg-white rounded-2xl"
                      >
                        <h2 className="text-2xl font-bold">Related Notes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {results.map((note) => (
                            <motion.div
                              key={note.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                            >
                              <h3 className="font-bold text-lg">
                                {note.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-2">
                                {note.content.length > 100
                                  ? `${note.content.slice(0, 100)}...`
                                  : note.content}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                Created At:{" "}
                                {new Date(note.createdAt).toLocaleDateString()}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed h-screen w-64 text-slate-800 flex flex-col max-sm:rounded-r-3xl justify-between items-center z-30 transform transition-transform duration-300 bg-gray-50 ease-in-out ${
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
                  {
                    Home: "0rem",
                    Notes: "4rem",
                    Documents: "8rem",
                    Videos: "12rem",
                    Tweets: "16rem",
                    Settings: "20rem",
                    Profile: "24rem",
                  }[activeContent]
                })`,
              }}
            ></div>

            <li
              className={`relative flex gap-2 items-center text-sm font-semibold p-4 cursor-pointer rounded-2xl z-10 ${
                activeContent === "Home" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => {
                navigate("/dashboard/home");
                setActiveContent("Home");
                setSidebarOpen(false);
              }}
            >
              <Home width={18} />
              Home
            </li>
            <li
              className={`relative flex gap-2 items-center text-sm font-semibold p-4 cursor-pointer rounded-2xl z-10 ${
                activeContent === "Notes" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => {
                navigate("/dashboard/notes");
                setActiveContent("Notes");
                setSidebarOpen(false);
              }}
            >
              <StickyNote width={18} />
              Notes
            </li>
            <li
              className={`relative flex gap-2 items-center text-sm font-semibold p-4 cursor-pointer rounded-2xl z-10 ${
                activeContent === "Documents"
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => {
                navigate("/dashboard/documents");
                setActiveContent("Documents");
                setSidebarOpen(false);
              }}
            >
              <FileText width={18} />
              Documents
            </li>
            <li
              className={`relative flex gap-2 items-center text-sm font-semibold p-4 cursor-pointer rounded-2xl z-10 ${
                activeContent === "Videos" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => {
                navigate("/dashboard/videos");
                setActiveContent("Videos");
                setSidebarOpen(false);
              }}
            >
              <Video width={18} />
              Videos
            </li>
            <li
              className={`relative flex gap-2 items-center text-sm font-semibold p-4 cursor-pointer rounded-2xl z-10 ${
                activeContent === "Tweets" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => {
                navigate("/dashboard/tweets");
                setActiveContent("Tweets");
                setSidebarOpen(false);
              }}
            >
              <Twitter width={18} />
              Tweets
            </li>
            <li
              className={`relative flex gap-2 items-center text-sm font-semibold p-4 cursor-pointer rounded-2xl z-10 ${
                activeContent === "Settings" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => {
                navigate("/dashboard/settings");
                setActiveContent("Settings");
                setSidebarOpen(false);
              }}
            >
              <Settings width={18} />
              Settings
            </li>
            <li
              className={`relative flex gap-2 items-center text-sm font-semibold p-4 cursor-pointer rounded-2xl z-10 ${
                activeContent === "Profile" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => {
                navigate("/dashboard/profile");
                setActiveContent("Profile");
                setSidebarOpen(false);
              }}
            >
              <User2 width={18} />
              Profile
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col w-full bg-gray-50 transition-all duration-300">
        {/* Navbar */}
        <div className="w-full sm:w-[calc(100%-16rem)] fixed h-24 p-4 flex items-center justify-between z-10 bg-gray-50">
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
            <h1 className="text-2xl font-normal max-sm:hidden">
              {activeContent}
            </h1>
          </div>
          <div className="flex items-center w-full justify-end gap-4">
            <button
              onClick={toggleSearchBar}
              className="w-12 h-12 flex justify-center items-center border rounded-full border-blue-800/25 bg-white shadow-md shadow-blue-800/25"
            >
              <SearchIcon className="h-6 w-6 text-blue-700" />
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

        {/* Main Content */}
        <main className="p-4 mt-24">
          <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="notes" element={<AskQuestionPage />} />
            <Route path="documents" element={<div>Documents Page</div>} />
            <Route path="videos" element={<div>Videos Page</div>} />
            <Route path="tweets" element={<div>Tweets Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
            <Route path="profile" element={<div>Profile Page</div>} />
            <Route
              path="*"
              element={<Navigate to="/dashboard/home" replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
