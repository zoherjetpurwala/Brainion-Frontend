import { useState, useEffect } from "react";
import axios from "axios";

interface Content {
  id: string;
  type: string;
  title: string;
  content: string;
  url: string;
  createdAt: string;
}

const useFetchContent = (userId: string | undefined) => {
  const [content, setContent] = useState<Content[]>([]);
  const [filteredContent, setFilteredContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
        {
          params: { userId },
          withCredentials: true,
        }
      );
      setContent(response.data);
      setFilteredContent(response.data); // Default to show all content initially
    } catch (err) {
      setError("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  const filterContentByType = (type: string) => {
    if (type === "ALL") {
      setFilteredContent(content);
    } else {
      setFilteredContent(content.filter((item) => item.type === type));
    }
  };

  const getCountByType = (type: string) => {
    return content.filter((item) => item.type === type).length;
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return {
    content,
    filteredContent,
    loading,
    error,
    filterContentByType,
    getCountByType,
  };
};

export default useFetchContent;
