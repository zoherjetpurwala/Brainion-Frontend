import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios, { AxiosError } from "axios";
import {
  ChevronDownCircle,
  ChevronUpCircle,
  Search,
  SearchIcon,
  X,
  Wand2,
  Sparkles,
  AlertTriangle,
  Calendar,
  FileText,
  StickyNote,
  LucideLink,
} from "lucide-react";
import LoadingAnimation from "./AILoadingAnimation";
import { useUserStore } from "../store/useUserStore";

type SearchResult = {
  id: string;
  title: string;
  content: string;
  type: 'NOTE' | 'DOCUMENT' | 'LINK';
  url?: string;
  metadata?: any;
  createdAt: string;
  relevanceScore?: number;
};

type APIResponse = {
  success: boolean;
  query: string;
  searchType: string;
  results?: SearchResult[];
  allResults?: SearchResult[];
  total: number;
  aiAnswer?: string;
  sourceDocument?: {
    id: string;
    title: string;
    type: string;
    relevanceScore?: number;
  };
  message?: string;
  warning?: string;
};

type APIError = {
  error: string;
  details?: string[];
};

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
  const [results, setResults] = useState<SearchResult[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [sourceInfo, setSourceInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<"ai" | "normal">("ai");
  const [searchType, setSearchType] = useState<string>("");
  const [totalResults, setTotalResults] = useState<number>(0);
  const { user } = useUserStore();

  const handleSearch = async (searchQuery: string) => {
    if (!user?.id) {
      setError("Please log in to search your content.");
      return;
    }

    if (!searchQuery || searchQuery.trim().length === 0) {
      setError("Please enter a search query.");
      return;
    }

    if (searchQuery.length > 1000) {
      setError("Search query is too long (max 1000 characters).");
      return;
    }

    setSearchLoading(true);
    setError(null);
    setWarning(null);
    setResults([]);
    setAnswer(null);
    setSourceInfo(null);

    try {
      const userId = user.id;
      const trimmedQuery = searchQuery.trim();
      
      const endpoint = searchMode === "ai"
        ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/search/ai`
        : `${import.meta.env.VITE_BACKEND_URL}/api/v1/search/title`;

      const requestData = {
        query: trimmedQuery,
        userId,
        ...(searchMode === "ai" && {
          useAI: true,
          similarityThreshold: 0.3,
          limit: 5
        }),
        ...(searchMode === "normal" && {
          limit: 10
        })
      };

      const response = await axios.post<APIResponse>(endpoint, requestData, {
        withCredentials: true,
        timeout: searchMode === "ai" ? 60000 : 30000, // Longer timeout for AI search
      });

      if (response.data.success) {
        if (searchMode === "ai") {
          // Handle AI search response
          if (response.data.aiAnswer) {
            setAnswer(response.data.aiAnswer);
            if (response.data.sourceDocument) {
              setSourceInfo(
                `Based on "${response.data.sourceDocument.title}" (${response.data.sourceDocument.type})`
              );
            }
            setResults(response.data.allResults || []);
          } else {
            // AI search but no AI answer generated
            setResults(response.data.results || []);
            if (response.data.warning) {
              setWarning(response.data.warning);
            }
          }
        } else {
          // Handle title search response
          setResults(response.data.results || []);
        }

        setTotalResults(response.data.total || 0);
        setSearchType(response.data.searchType || "");

        // Show warning if available
        if (response.data.warning) {
          setWarning(response.data.warning);
        }

        // Show message if no results
        if (response.data.total === 0) {
          setError(response.data.message || "No results found for your query.");
        }
      } else {
        setError(response.data.message || "Search failed. Please try again.");
      }
    } catch (error) {
      console.error("Search error:", error);
      
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error instanceof AxiosError) {
        if (error.response) {
          const apiError = error.response.data as APIError;
          switch (error.response.status) {
            case 401:
              errorMessage = "Please log in to search your content.";
              break;
            case 400:
              if (apiError.details && Array.isArray(apiError.details)) {
                errorMessage = apiError.details.join(", ");
              } else {
                errorMessage = apiError.error || "Invalid search request.";
              }
              break;
            case 408:
              errorMessage = "Search timed out. Please try a simpler query.";
              break;
            case 503:
              errorMessage = "Search service is temporarily unavailable.";
              break;
            default:
              errorMessage = apiError.error || "Search failed. Please try again.";
          }
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      
      setError(errorMessage);
    } finally {
      setSearchLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "NOTE":
        return <StickyNote className="w-4 h-4 text-blue-600" />;
      case "DOCUMENT":
        return <FileText className="w-4 h-4 text-green-600" />;
      case "LINK":
        return <LucideLink className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "NOTE":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "DOCUMENT":
        return "bg-green-100 text-green-700 border-green-200";
      case "LINK":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const resetSearch = () => {
    setQuery("");
    setError(null);
    setWarning(null);
    setResults([]);
    setAnswer(null);
    setSourceInfo(null);
    setTotalResults(0);
    setSearchType("");
  };

  // Animation variants (keeping original ones)
  const overlayVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: "blur(0px)",
    },
    visible: {
      opacity: 1,
      backdropFilter: "blur(4px)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const containerVariants = {
    hidden: {
      y: -100,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.6,
      },
    },
    exit: {
      y: -50,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const staggerItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-gradient-to-br from-blue-900/40 to-blue-600/50 flex justify-center items-start z-50 p-4 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl mt-8"
          >
            <div className="rounded-3xl p-8">
              <motion.form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(query);
                }}
                className="relative w-full grid grid-cols-12 gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Search Input */}
                <div className="relative w-full col-span-10 max-md:col-span-8">
                  <Search
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    className="w-full h-14 bg-white rounded-2xl border border-blue-200/60 py-4 pl-12 pr-6 text-gray-900 placeholder-blue-600/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 text-lg shadow-sm"
                    placeholder={
                      searchMode === "ai"
                        ? "Ask anything about your notes..."
                        : "Search note titles..."
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search input"
                    disabled={searchLoading}
                    maxLength={1000}
                  />
                </div>

                {/* Toggle AI / Title Mode */}
                <motion.button
                  type="button"
                  onClick={() =>
                    setSearchMode((prev) => (prev === "ai" ? "normal" : "ai"))
                  }
                  className={`h-14 px-4 col-span-1 max-md:col-span-2 flex justify-center items-center rounded-2xl border transition-all duration-300 shadow-sm ${
                    searchMode === "ai"
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-white border-blue-200/60 text-blue-600 hover:bg-blue-50"
                  }`}
                  title={`Switch to ${
                    searchMode === "ai" ? "title" : "AI"
                  } search`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={searchLoading}
                >
                  <Wand2 className="w-4 h-4" />
                </motion.button>

                {/* Submit Button (hidden on small screens) */}
                <motion.button
                  type="submit"
                  className="h-14 hidden px-4 col-span-1 rounded-2xl bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/30 disabled:opacity-50"
                  aria-label="Search"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={searchLoading}
                >
                  <SearchIcon className="w-4 h-4" />
                </motion.button>

                {/* Close Button */}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSearchBar();
                    resetSearch();
                  }}
                  className="h-14 px-4 col-span-1 max-md:col-span-2 flex justify-center items-center rounded-2xl bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 shadow-sm disabled:opacity-50"
                  aria-label="Close search"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={searchLoading}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.form>

              <div className="max-h-[calc(100vh-280px)] overflow-y-auto mt-6">
                <AnimatePresence mode="wait">
                  {searchLoading && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <LoadingAnimation />
                      {/* Modern Loading Text */}
                      <motion.div
                        className="mt-24 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      >
                        <motion.div
                          className="text-white font-semibold text-xl tracking-wide mb-2 text-center"
                          style={{
                            fontFamily: "system-ui, -apple-system, sans-serif",
                          }}
                          animate={{
                            textShadow: [
                              "0 0 20px rgba(255, 255, 255, 0.5)",
                              "0 0 40px rgba(255, 255, 255, 0.8)",
                              "0 0 20px rgba(255, 255, 255, 0.5)",
                            ],
                            transition: {
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: [0.4, 0, 0.6, 1],
                            },
                          }}
                        >
                          <span>
                          {searchMode === "ai"
                            ? "AI is thinking"
                            : "Searching"}
                          </span>

                          <span className="inline-flex ml-3">
                            {[0, 1, 2].map((index) => (
                              <motion.span
                                key={index}
                                className="w-2 h-2 rounded-full mx-1"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
                                }}
                                animate={{
                                  scale: [0, 1.2, 0],
                                  opacity: [0.4, 1, 0.4],
                                  transition: {
                                    duration: 1.8,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: [0.4, 0, 0.6, 1],
                                    delay: index * 0.2,
                                  },
                                }}
                              />
                            ))}
                          </span>
                        </motion.div>

                        {/* Enhanced Progress Bar */}
                        <motion.div
                          className="mt-6 w-64 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 256, opacity: 1 }}
                          transition={{ delay: 1.5, duration: 1 }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))",
                            }}
                            animate={{
                              x: ["-100%", "100%"],
                              transition: {
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: [0.4, 0, 0.6, 1],
                              },
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}

                  {warning && (
                    <motion.div
                      key="warning"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="p-6 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-2xl mb-4"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium">{warning}</span>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="font-medium">{error}</span>
                      </div>
                    </motion.div>
                  )}

                  {answer && searchMode === "ai" && (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-lg mb-6"
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                              AI Answer
                            </h2>
                            {sourceInfo && (
                              <p className="text-sm text-blue-600/70 mt-1">{sourceInfo}</p>
                            )}
                          </div>
                        </div>
                        <motion.button
                          onClick={() => setIsOpen((prev) => !prev)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100/50 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isOpen ? (
                            <ChevronUpCircle className="w-6 h-6" />
                          ) : (
                            <ChevronDownCircle className="w-6 h-6" />
                          )}
                        </motion.button>
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 overflow-hidden"
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 300,
                            }}
                          >
                            {answer.split("\n").map((line, index) => (
                              <motion.p
                                key={index}
                                className="mb-3 text-gray-700 leading-relaxed"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                {line}
                              </motion.p>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {results.length > 0 && (
                    <motion.div
                      key="results"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-5 p-6 bg-white rounded-3xl border border-blue-100 shadow-lg"
                    >
                      <motion.div
                        className="flex justify-between items-center mb-6"
                        variants={staggerItem}
                      >
                        <h2 className="text-2xl font-bold text-gray-800">
                          {searchMode === "ai" ? "Related Notes" : "Search Results"}
                          <span className="text-sm font-normal text-blue-600 ml-2">
                            ({totalResults} found)
                          </span>
                        </h2>
                        {searchType && (
                          <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {searchType}
                          </span>
                        )}
                      </motion.div>
                      
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        variants={staggerContainer}
                      >
                        {results.map((note) => (
                          <motion.div
                            key={note.id}
                            variants={staggerItem}
                            className="p-5 border border-blue-100/50 rounded-2xl bg-white/80 hover:bg-white/95 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                            whileHover={{ y: -2 }}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2">
                                {note.title}
                              </h3>
                              <div className="flex items-center gap-2 ml-2">
                                {getTypeIcon(note.type)}
                                <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(note.type)}`}>
                                  {note.type}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                              {note.content.length > 150
                                ? `${note.content.slice(0, 150)}...`
                                : note.content}
                            </p>
                            
                            <div className="flex justify-between items-center text-xs">
                              <div className="flex items-center gap-1 text-blue-600/70">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(note.createdAt)}</span>
                              </div>
                              {note.relevanceScore && (
                                <span className="text-green-600 font-medium">
                                  {Math.round(note.relevanceScore * 100)}% match
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
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