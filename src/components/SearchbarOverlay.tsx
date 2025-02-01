import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  ChevronDownCircle,
  ChevronUpCircle,
  Search,
  SearchIcon,
  X,
} from "lucide-react";
import LoadingAnimation from "./AILoadingAnimation";
import { useUserStore } from "../store/useUserStore";

type SearchbarProps = {
  isSearchOpen: boolean;
  toggleSearchBar: () => void;
};

const SearchbarOverlay: React.FC<SearchbarProps> = ({
  isSearchOpen,
  toggleSearchBar,
}) => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore();

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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/search`,
        {
          query: searchQuery,
          userId,
        }
      );

      const { title, answer, listOfNotes } = response.data;

      setResults(listOfNotes);
      setAnswer(`Answer based on your note titled "${title}":\n${answer}`);
    } catch (error: any) {
      setError(error.response?.data?.error || "Something went wrong.");
    } finally {
      setSearchLoading(false);
    }
  };
  return (
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
          className="fixed inset-0 bg-gradient-to-br from-blue-500/50 to-white/50 flex justify-center items-start z-50 p-4 overflow-y-auto"
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
            <div className="p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(query);
                }}
                className="relative w-full flex gap-1"
              >
                <div className="relative w-full">
                  <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    className="w-full ring-blue-800/10 shadow-md shadow-blue-800/15 rounded-xl border border-gray-300 bg-white  py-3 pl-10 pr-4 text-sm text-gray-900 ring-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Search for anything..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search for anything..."
                  />
                </div>

                <button
                  type="submit"
                  className="p-3 border-[1px] border-blue-800/10 shadow-md shadow-blue-800/15 text-2xl rounded-xl text-gray-600 bg-white hover:text-gray-800 transition-colors"
                  aria-label="Close search"
                >
                  <SearchIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSearchBar();
                    setQuery("");
                    setError(null);
                    setResults([]);
                    setAnswer(null);
                  }}
                  className="p-3 ring-[1px] ring-blue-800/10 shadow-md shadow-blue-800/15 text-2xl rounded-xl text-gray-600 bg-white hover:text-gray-800 transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>

              <div className="max-h-[calc(100vh-200px)] overflow-y-auto rounded-2xl">
                {searchLoading && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="items-center flex flex-col justify-center text-center text-gray-600 rounded-2xl p-8 mt-2"
                  >
                    <LoadingAnimation />
                    <p className="loading-text pt-1 text-black">Searching</p>
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
                          onClick={() => setIsOpen((prev) => !prev)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          {isOpen ? (
                            <ChevronUpCircle className="w-4 h-4" />
                          ) : (
                            <ChevronDownCircle className="w-4 h-4" />
                          )}
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
                            <h3 className="font-bold text-lg">{note.title}</h3>
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
  );
};

export default SearchbarOverlay;
