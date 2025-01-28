import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Share2,
  Trash2,
  FileText,
  StickyNote,
  LayoutGrid,
  LucideLink,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import useFetchContent from "../../hooks/useFetchContent";

const truncateContent = (content: string, wordLimit: number): string => {
  const words = content.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return content;
};

const IdeasPage: React.FC = () => {
  const { user } = useUser();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const { filteredContent, loading, error, filterContentByType } =
    useFetchContent(user?.id);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/content/${id}`,
        {
          withCredentials: true,
        }
      );
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
          className="justify-center p-1 gap-10 bg-muted rounded-lg"
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
        </ToggleGroup>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredContent.map((note) => (
          <Card
            key={note.id}
            className={`p-4 flex flex-col justify-between border border-blue-800/25 bg-white rounded-md transition-all duration-500 ease-in-out`}
          >
            <CardHeader className="p-2 border-b">
              <CardTitle className="flex justify-between items-center p-0">
                <h1 className="text-lg font-semibold text-primary truncate">
                  {note.title}
                </h1>
                <div className="flex gap-2 items-center">
                  {note.type === "DOCUMENT" && (
                    <div>
                      <div>
                        <a
                          href={`${note.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LucideLink className="w-4 h-4 text-gray-600 cursor-pointer" />
                        </a>
                      </div>
                    </div>
                  )}
                  <Trash2
                    onClick={() => handleDelete(note.id)}
                    className="w-4 h-4 text-gray-600 cursor-pointer"
                  />
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-2 flex-auto overflow-hidden border-b">
              {note.type === "DOCUMENT" ? (
                <div className="flex h-full justify-center items-center">
                  {getExtensionFromURL(note.url) === "pdf" ? (
                    <img
                      src="/pdf-document.svg"
                      className="w-12 h-12"
                      alt="PDF Icon"
                    />
                  ) : (
                    <Share2 />
                  )}
                </div>
              ) : (
                <p className="text-gray-800 line-clamp-4">
                  {truncateContent(note.content, 50)}
                </p>
              )}
            </CardContent>

            <CardFooter className="p-2 flex justify-between">
              <p className="text-gray-500 text-sm">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
              <Badge className="border border-blue-800/25 rounded-full">
                {note.type}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IdeasPage;
