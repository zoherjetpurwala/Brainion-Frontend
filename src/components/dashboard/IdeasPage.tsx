import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Trash2,
  FileText,
  StickyNote,
  LayoutGrid,
  LucideLink,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import useFetchContent from "../../hooks/useFetchContent";
import { useContentStore } from "../../store/useContentStore";
import { useUserStore } from "../../store/useUserStore";
import LoadingComponent from "../LoadingComponent";
import TwitterEmbed from "../TweetEmbed";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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

const IdeasPage: React.FC = () => {
  const { user } = useUserStore();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const { contentUpdated } = useContentStore();
  const { filteredContent, loading, error, filterContentByType, fetchData } =
    useFetchContent(user?.id);

  useEffect(() => {
    if (contentUpdated) {
      fetchData();
      useContentStore.setState({ contentUpdated: false });
    }
  }, [contentUpdated]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/notes/${id}`,
        {
          withCredentials: true,
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting content:", error);
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

  return (
    <div className="p-4">
      <div className="mb-4">
        <ToggleGroup
          type="single"
          value={activeFilter}
          onValueChange={handleFilterChange}
          className="justify-center p-1 sm:gap-5 md:gap-10 bg-muted rounded-lg"
        >
          <ToggleGroupItem
            value="ALL"
            aria-label="Toggle all"
            className="data-[state=on]:bg-blue-700/50 data-[state=on]:text-white"
          >
            <span className="flex px-4">
              <LayoutGrid className="h-4 w-4 mr-2" />
              <h1>All</h1>
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="NOTE"
            aria-label="Toggle notes"
            className="data-[state=on]:bg-blue-700/50 data-[state=on]:text-white"
          >
            <span className="flex px-4">
              <StickyNote className="h-4 w-4 mr-2" />
              <h1>Notes</h1>
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="DOCUMENT"
            aria-label="Toggle documents"
            className="data-[state=on]:bg-blue-700/50 data-[state=on]:text-white"
          >
            <span className="flex px-4">
              <FileText className="h-4 w-4 mr-2" />
              <h1>Documents</h1>
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="LINK"
            aria-label="Toggle links"
            className="data-[state=on]:bg-blue-700/50 data-[state=on]:text-white"
          >
            <span className="flex px-4">
              <LucideLink className="h-4 w-4 mr-2" />
              <h1>Links</h1>
            </span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <LoadingComponent />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
        {filteredContent.map((note) => (
          <Card
            key={note.id}
            className="break-inside-avoid mb-6 p-4 flex flex-col justify-between border border-blue-800/25 bg-white rounded-md transition-all duration-500 ease-in-out self-start"
          >
            <CardHeader className="p-2">
              {note.type === "DOCUMENT" ? (
                <div className="flex justify-center items-center p-10">
                  {getExtensionFromURL(note.url) === "pdf" ? (
                    <img
                      src="/pdf-document.svg"
                      className="w-12 h-12"
                      alt="PDF Icon"
                    />
                  ) : (
                    <a
                      href={note.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline flex items-center"
                    >
                      <LucideLink size={24} className="text-gray-500" />
                    </a>
                  )}
                </div>
              ) : note.type === "LINK" ? (
                <div className="flex justify-center items-center">
                  {isTwitterUrl(note.url) ? (
                    <TwitterEmbed tweetUrl={note.url} />
                  ) : isYouTubeUrl(note.url) ? (
                    <iframe
                      width="100%"
                      src={getYouTubeEmbedUrl(note.url) ?? ""}
                      title="YouTube Video"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  ) : (
                    <a
                      href={note.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline flex items-center"
                    >
                      {note.metadata?.thumbnail ? (
                        <img
                          src={note.metadata.thumbnail}
                          alt="Thumbnail"
                          className="object-cover rounded"
                        />
                      ) : (
                        <LucideLink size={24} className="text-gray-500" />
                      )}
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-gray-800">
                  {truncateContent(note.content, 50)}
                </p>
              )}
            </CardHeader>

            <CardContent className="p-2 ">
              <CardTitle className="flex justify-between items-center p-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h1 className="text-lg font-semibold text-primary truncate">
                        {note.title}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-blue-700/25 backdrop-blur-xl shadow-sm p-2 text-gray-800"
                      side="bottom"
                    >
                      <p>{note.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex gap-2 items-center"></div>
              </CardTitle>
            </CardContent>

            <CardFooter className="p-2 flex justify-between">
              <p className="text-gray-500 text-sm">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2">
                <Badge className="border border-blue-800/25 rounded-full">
                  {note.type}
                </Badge>
                {note.type != "NOTE" && (
                  <Badge className="border border-blue-800/25 rounded-full">
                    <div>
                      <a
                        href={`${note.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LucideLink className="w-4 h-4 text-gray-600 cursor-pointer" />
                      </a>
                    </div>
                  </Badge>
                )}
                <Badge className="border border-blue-800/25 rounded-full">
                  <Trash2
                    onClick={() => handleDelete(note.id)}
                    className="w-4 h-4 text-gray-600 cursor-pointer"
                  />
                </Badge>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IdeasPage;
