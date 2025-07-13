import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  Trash2,
  FileText,
  StickyNote,
  LayoutGrid,
  LucideLink,
  ExternalLink,
  Calendar,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Skeleton } from "../ui/skeleton";
import useFetchContent from "../../hooks/useFetchContent";
import { useContentStore } from "../../store/useContentStore";
import { useUserStore } from "../../store/useUserStore";
import TwitterEmbed from "../TweetEmbed";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { NoteViewer } from "./NoteViewer";
import { DocumentViewer } from "./DocumentViewer";

const truncateContent = (content: string, wordLimit: number): string => {
  const words = content.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return content;
};

const isYouTubeUrl = (url: string): boolean => {
  return /(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(url);
};

const getYouTubeEmbedUrl = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

const isTwitterUrl = (url: string) => {
  return (
    (url.includes("twitter.com") || url.includes("x.com")) &&
    url.includes("/status/")
  );
};

// Skeleton components (keeping original)
const ContentCardSkeleton: React.FC = () => (
  <Card className="break-inside-avoid mb-6 border border-blue-800/25 bg-white shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl">
    <CardHeader className="p-0">
      <Skeleton className="w-full h-40 rounded-t-xl bg-blue-100/40" />
    </CardHeader>
    <CardContent className="p-4">
      <Skeleton className="h-6 w-3/4 bg-blue-100/40 rounded-lg mb-2" />
      <Skeleton className="h-4 w-1/2 bg-blue-100/40 rounded-lg" />
    </CardContent>
    <CardFooter className="p-4 pt-0 flex justify-between items-center">
      <Skeleton className="h-4 w-20 bg-blue-100/40 rounded-full" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-7 w-16 bg-blue-100/40 rounded-full" />
        <Skeleton className="h-7 w-7 bg-blue-100/40 rounded-full" />
        <Skeleton className="h-7 w-7 bg-blue-100/40 rounded-full" />
      </div>
    </CardFooter>
  </Card>
);

const ContentGridSkeleton: React.FC = () => (
  <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-3 gap-6 space-y-6">
    {Array.from({ length: 9 }).map((_, index) => (
      <ContentCardSkeleton key={index} />
    ))}
  </div>
);

const ErrorMessage: React.FC<{
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}> = ({ message, onRetry, onDismiss }) => (
  <div className="text-center py-12">
    <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl p-6">
      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-red-600 text-sm mb-4">{message}</p>
      <div className="flex gap-2 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  </div>
);

const EmptyState: React.FC<{ activeFilter: string }> = ({ activeFilter }) => (
  <div className="text-center py-12">
    <div className="max-w-md mx-auto">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {activeFilter === "NOTE" && (
          <StickyNote className="w-8 h-8 text-blue-600" />
        )}
        {activeFilter === "DOCUMENT" && (
          <FileText className="w-8 h-8 text-blue-600" />
        )}
        {activeFilter === "LINK" && (
          <LucideLink className="w-8 h-8 text-blue-600" />
        )}
        {activeFilter === "ALL" && (
          <LayoutGrid className="w-8 h-8 text-blue-600" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        No{" "}
        {activeFilter === "ALL" ? "content" : activeFilter.toLowerCase() + "s"}{" "}
        found
      </h3>
      <p className="text-gray-600 text-sm">
        {activeFilter === "ALL"
          ? "Start by creating your first note, uploading a document, or saving a link."
          : `You haven't created any ${activeFilter.toLowerCase()}s yet.`}
      </p>
    </div>
  </div>
);

const IdeasPage: React.FC = () => {
  const { user } = useUserStore();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    title: string;
    type: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Content viewer states
  const [noteViewerOpen, setNoteViewerOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const { contentUpdated } = useContentStore();
  const {
    filteredContent,
    loading,
    error,
    filterContentByType,
    fetchData,
    clearError,
    isEmpty,
  } = useFetchContent(user?.id);

  useEffect(() => {
    if (contentUpdated) {
      fetchData();
      useContentStore.setState({ contentUpdated: false });
    }
  }, [contentUpdated, fetchData]);

  const handleContentClick = (content: any) => {
    switch (content.type) {
      case "NOTE":
        setSelectedNote(content);
        setNoteViewerOpen(true);
        break;
      case "DOCUMENT":
        setSelectedDocument(content);
        setDocumentViewerOpen(true);
        break;
      case "LINK":
        // Open links in new tab
        window.open(content.url, "_blank", "noopener,noreferrer");
        break;
      default:
        console.log("Unknown content type:", content.type);
    }
  };

  const handleDeleteClick = (
    e: React.MouseEvent,
    id: string,
    title: string,
    type: string
  ) => {
    e.stopPropagation(); // Prevent opening the content viewer
    setItemToDelete({ id, title, type });
    setDeleteDialogOpen(true);
    setDeleteError(null);
  };

  const handleDelete = async () => {
    if (!itemToDelete || !user?.id) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/notes/${itemToDelete.id}`,
        {
          withCredentials: true,
          data: { userId: user.id },
        }
      );

      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData();
    } catch (error) {
      console.error("Error deleting content:", error);

      let errorMessage = "Failed to delete item";

      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            errorMessage = "You are not authorized to delete this item";
            break;
          case 403:
            errorMessage = "You don't have permission to delete this item";
            break;
          case 404:
            errorMessage = "Item not found or already deleted";
            break;
          case 500:
            errorMessage = "Server error. Please try again later";
            break;
          default:
            errorMessage =
              error.response?.data?.error || "Failed to delete item";
        }
      }

      setDeleteError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFilterChange = (filter: string) => {
    if (filter) {
      setActiveFilter(filter);
      filterContentByType(filter);
    }
  };

  const getExtensionFromURL = (url: string): string | null => {
    const parts = url.split(".");
    const extension = parts.length > 1 ? parts.pop() : null;
    return extension ?? null;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "NOTE":
        return "bg-blue-700/90 text-white";
      case "DOCUMENT":
        return "bg-green-700/90 text-white";
      case "LINK":
        return "bg-purple-700/90 text-white";
      default:
        return "bg-blue-700/90 text-white";
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
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="p-6 w-full max-w-full overflow-hidden bg-gray-50 min-h-screen">
      {/* Filter Toggle Group */}
      <div className="mb-8 max-w-2xl mx-auto w-full">
        <ToggleGroup
          type="single"
          value={activeFilter}
          onValueChange={handleFilterChange}
          className="justify-center p-2 gap-2 bg-white rounded-2xl shadow-lg border border-blue-800/25"
        >
          <ToggleGroupItem
            value="ALL"
            aria-label="Toggle all"
            className="data-[state=on]:bg-blue-700/50 data-[state=on]:text-white rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center">
              <LayoutGrid className="h-4 w-4 mr-2" />
              <span className="font-medium">All</span>
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="NOTE"
            aria-label="Toggle notes"
            className="data-[state=on]:bg-blue-700/50 data-[state=on]:text-white rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center">
              <StickyNote className="h-4 w-4 mr-2" />
              <span className="font-medium">Notes</span>
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="DOCUMENT"
            aria-label="Toggle documents"
            className="data-[state=on]:bg-blue-700/50 data-[state=on]:text-white rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span className="font-medium">Documents</span>
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="LINK"
            aria-label="Toggle links"
            className="data-[state=on]:bg-blue-700/50 data-[state=on]:text-white rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center">
              <LucideLink className="h-4 w-4 mr-2" />
              <span className="font-medium">Links</span>
            </span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Loading State */}
      {loading && <ContentGridSkeleton />}

      {/* Error State */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={fetchData}
          onDismiss={clearError}
        />
      )}

      {/* Empty State */}
      {!loading && !error && isEmpty && (
        <EmptyState activeFilter={activeFilter} />
      )}

      {/* Content Grid */}
      {!loading && !error && !isEmpty && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-3 gap-6 space-y-6">
          {filteredContent.map((note) => (
            <Card
              key={note.id}
              className="break-inside-avoid mb-6 border border-blue-800/25 bg-blue-50/30 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out rounded-2xl overflow-hidden group cursor-pointer hover:bg-blue-50/50"
              onClick={() => handleContentClick(note)}
            >
              <CardHeader className="p-0 relative overflow-hidden">
                <div className="w-full relative">
                  {/* View indicator overlay */}
                  <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/95 rounded-full p-2 shadow-lg border border-blue-200/50">
                      <Eye className="w-4 h-4 text-blue-700" />
                    </div>
                  </div>

                  {note.type === "DOCUMENT" ? (
                    <div className="flex justify-center items-center py-12 bg-blue-100/40 relative">
                      {getExtensionFromURL(note.url || "") === "pdf" ? (
                        <div className="relative z-10 p-4 bg-white/95 rounded-2xl shadow-lg border border-blue-200/50">
                          <img
                            src="/pdf-document.svg"
                            className="w-16 h-16"
                            alt="PDF Icon"
                          />
                        </div>
                      ) : (
                        <div className="relative z-10 p-4 bg-white/95 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200/50">
                          <FileText size={32} className="text-green-700" />
                        </div>
                      )}
                    </div>
                  ) : note.type === "LINK" ? (
                    <div className="w-full relative">
                      {isTwitterUrl(note.url || "") ? (
                        <div className="w-full max-w-full overflow-hidden bg-blue-100/40 p-4">
                          <TwitterEmbed tweetUrl={note.url || ""} />
                        </div>
                      ) : isYouTubeUrl(note.url || "") ? (
                        <div className="w-full relative">
                          <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-t-2xl">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src={getYouTubeEmbedUrl(note.url || "") ?? ""}
                              title="YouTube Video"
                              frameBorder="0"
                              allowFullScreen
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute top-4 right-4 bg-blue-900/30 backdrop-blur-sm rounded-full p-2">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="block w-full relative">
                          {note.metadata?.thumbnail ? (
                            <div className="w-full overflow-hidden">
                              <img
                                src={note.metadata.thumbnail}
                                alt="Thumbnail"
                                className="w-full h-auto object-cover max-h-56 group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-blue-900/10"></div>
                              <div className="absolute top-4 right-4 bg-blue-50/95 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-blue-200/50">
                                <ExternalLink className="w-4 h-4 text-blue-700" />
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-center items-center py-12 bg-blue-100/40 relative">
                              <div className="relative z-10 p-4 bg-white/95 rounded-2xl shadow-lg border border-blue-200/50">
                                <LucideLink
                                  size={32}
                                  className="text-purple-700"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full p-6 bg-blue-100/40 relative">
                      <div className="relative z-10">
                        <p className="text-gray-700 text-sm leading-relaxed break-words whitespace-pre-wrap font-medium">
                          {truncateContent(note.content, 120)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h1 className="text-lg font-bold text-gray-800 break-words line-clamp-2 leading-tight hover:text-gray-600 transition-colors duration-300">
                        {note.title}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-white shadow-xl border border-gray-200 p-3 text-gray-800 max-w-xs rounded-xl"
                      side="bottom"
                    >
                      <p className="break-words text-sm font-medium">
                        {note.title}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <p className="text-xs font-medium">
                    {formatDate(note.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`text-xs px-3 py-1 rounded-full border-0 font-semibold shadow-sm ${getTypeColor(
                      note.type
                    )}`}
                  >
                    {note.type}
                  </Badge>
                  {note.type === "LINK" && note.url && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(
                                note.url,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }}
                            className="p-2 bg-gray-100 hover:bg-blue-100 rounded-full transition-all duration-300 hover:scale-110 group"
                          >
                            <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-blue-600" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open in new tab</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={(e) =>
                            handleDeleteClick(e, note.id, note.title, note.type)
                          }
                          className="p-2 bg-gray-100 hover:bg-red-100 rounded-full transition-all duration-300 hover:scale-110 group"
                        >
                          <Trash2 className="w-3 h-3 text-gray-600 group-hover:text-red-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete item</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Content Viewers */}
      {selectedNote && (
        <NoteViewer
          note={selectedNote}
          isOpen={noteViewerOpen}
          onClose={() => {
            setNoteViewerOpen(false);
            setSelectedNote(null);
          }}
        />
      )}

      {selectedDocument && (
        <DocumentViewer
          doc={selectedDocument}
          isOpen={documentViewerOpen}
          onClose={() => {
            setDocumentViewerOpen(false);
            setSelectedDocument(null);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Delete {itemToDelete?.type.toLowerCase()}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              Are you sure you want to delete "{itemToDelete?.title}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {deleteError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{deleteError}</p>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              onClick={() => {
                setDeleteDialogOpen(false);
                setItemToDelete(null);
                setDeleteError(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default IdeasPage;
