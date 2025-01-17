import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

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

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/notes`, {
        params: { userId: user.id },
        withCredentials: true,
      });

      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="border border-gray-300 rounded-lg shadow-md p-4 bg-white"
        >
          <h3 className="text-lg font-bold">{note.title}</h3>
          <p className="text-gray-700 mt-2">
            {truncateContent(note.content, 30)}
          </p>
          <p className="text-gray-500 text-sm mt-4">
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
