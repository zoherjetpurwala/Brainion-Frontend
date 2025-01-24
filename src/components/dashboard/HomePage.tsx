import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Share2, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

interface Note {
  id: string;
  type: string;
  title: string;
  content: string;
  url: string;
  createdAt: string;
}

const truncateContent = (content: string, wordLimit: number): string => {
  const words = content.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return content;
};

const getWordsCount = (content: string): number => {
  return content.split(" ").length;
};

const HomePage: React.FC = () => {
  const { user } = useUser();
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchData = async () => {
    try {
      if (!user?.id) {
        console.error("User ID is missing.");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/notes`,
        {
          params: { userId: user.id },
          withCredentials: true,
        }
      );

      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/notes/${id}`,
        {
          withCredentials: true,
        }
      );
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getExtensionFromURL = (url: string): string | null => {
    const parts = url.split(".");
    const extension = parts.length > 1 ? parts.pop() : null;
    return extension ?? null;
  };

  return (
    <div className="grid grid-flow-dense auto-rows-auto grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6">
      {notes.map((note) => {
        const wordCount = getWordsCount(note.content);
        const dynamicClass =
          note.type === "NOTE"
            ? wordCount > 50
              ? "md:col-span-2 md:row-span-2"
              : wordCount > 25
              ? "md:row-span-2"
              : ""
            : "col-span-1 row-span-1";
        return (
          <Card
            key={note.id}
            className={`${dynamicClass} p-4 flex flex-col justify-between ring-1 ring-blue-800/25 bg-white shadow-md shadow-blue-800/15 rounded-2xl transition-all duration-500 ease-in-out`}
          >
            <CardHeader className="p-2 border-b">
              <CardTitle className="flex justify-between items-center p-0">
                <h1 className="text-lg font-semibold text-primary">
                  {note.title}
                </h1>
                <div className="flex gap-1 items-center">
                  <Badge className="border border-blue-800/25 rounded-full">
                    {note.type}
                  </Badge>
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
                <p className="text-gray-800">
                  {dynamicClass.includes("md:col-span-2")
                    ? truncateContent(note.content, 150)
                    : dynamicClass.includes("md:row-span-2")
                    ? truncateContent(note.content, 75)
                    : truncateContent(note.content, 50)}
                </p>
              )}
            </CardContent>

            <CardFooter className="p-2">
              <p className="text-gray-500 text-sm">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default HomePage;
