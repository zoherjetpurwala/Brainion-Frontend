import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Metadata {
  thumbnail?: string;
}

interface Content {
  id: string;
  type: string;
  title: string;
  content: string;
  url: string;
  metadata: Metadata;
  createdAt: string;
}

const useFetchContent = (userId: string | undefined) => {
  const [content, setContent] = useState<Content[]>([]);
  const [filteredContent, setFilteredContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
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
      setFilteredContent(response.data);
    } catch (err) {
      setError("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  }, [userId]);

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
    fetchData,
  };
};

export default useFetchContent;
