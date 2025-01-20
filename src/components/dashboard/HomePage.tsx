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

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const truncateContent = (content: string, wordLimit: number): string => {
  const words = content.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return content;
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

  const handleShare = (id: string) => {
    const shareUrl = `${import.meta.env.VITE_CLIENT_URL}/shared/${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Note link copied to clipboard!");
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {notes.map((note) => (
        <Card className="h-full flex flex-col hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <h1 className="text-lg font-semibold text-primary truncate">
                {note.title}
              </h1>
              <div className="flex gap-1">
                <Trash2
                  onClick={() => handleDelete(note.id)}
                  className="w-5 h-5 text-red-600"
                />
                <Share2
                  onClick={() => handleShare(note.id)}
                  className="w-5 h-5"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800">
              {truncateContent(note.content, 30)}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-gray-500 text-sm">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
        // <div
        //   key={note.id}
        //   className="border border-gray-300 rounded-lg shadow-lg p-6 bg-gradient-to-r from-indigo-100 to-blue-50 hover:shadow-xl transition-shadow"
        // >
        //   <h3 className="text-xl font-semibold text-indigo-900 truncate">
        //     {note.title}
        //   </h3>
        //   <p className="text-gray-800 mt-4">
        //     {truncateContent(note.content, 30)}
        //   </p>
        //   <p className="text-gray-500 text-sm mt-4">
        //     {new Date(note.createdAt).toLocaleDateString()}
        //   </p>
        //   <div className="mt-6 flex justify-between items-center">
        //     <button
        //       className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        //       onClick={() => handleDelete(note.id)}
        //     >
        //       Delete
        //     </button>
        //     <button
        //       className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        //       onClick={() => handleShare(note.id)}
        //     >
        //       Share
        //     </button>
        //   </div>
        // </div>
      ))}
    </div>
  );
};

export default HomePage;
