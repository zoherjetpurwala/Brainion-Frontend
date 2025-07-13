import { useState, useEffect, useCallback, useRef } from "react";
import axios, { AxiosError } from "axios";

interface Metadata {
  thumbnail?: string;
  author?: string;
  publishedAt?: string;
  siteName?: string;
  description?: string;
  originalUrl?: string;
  normalizedUrl?: string;
  fileName?: string;
  [key: string]: any;
}

interface Content {
  id: string;
  type: 'NOTE' | 'DOCUMENT' | 'LINK';
  title: string;
  content: string;
  url?: string;
  metadata?: Metadata;
  createdAt: string;
  updatedAt?: string;
}

interface ApiResponse {
  success: boolean;
  data: Content[];
  count: number;
  message?: string;
}

interface ApiError {
  error: string;
  details?: any;
}

interface UseFetchContentReturn {
  content: Content[];
  filteredContent: Content[];
  loading: boolean;
  error: string | null;
  filterContentByType: (type: string) => void;
  getCountByType: (type: string) => number;
  fetchData: () => Promise<void>;
  refetch: () => Promise<void>;
  clearError: () => void;
  totalCount: number;
  isEmpty: boolean;
}

const useFetchContent = (userId: string | undefined): UseFetchContentReturn => {
  const [content, setContent] = useState<Content[]>([]);
  const [filteredContent, setFilteredContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to track the current request to prevent race conditions
  const abortControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  // Cleanup function
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const fetchData = useCallback(async (): Promise<void> => {
    // Validate userId
    if (!userId || userId.trim().length === 0) {
      setContent([]);
      setFilteredContent([]);
      setError(null);
      return;
    }

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
        {
          params: { userId: userId.trim() },
          withCredentials: true,
          timeout: 10000, // 10 second timeout
          signal: abortControllerRef.current.signal,
        }
      );

      // Check if component is still mounted before updating state
      if (!mountedRef.current) return;

      // Handle the improved API response format
      if (response.data.success && response.data.data) {
        const contentData = response.data.data;
        
        // Validate and sanitize the data
        const validatedContent = contentData.map((item: any) => ({
          id: item.id || '',
          type: item.type || 'NOTE',
          title: item.title || 'Untitled',
          content: item.content || '',
          url: item.url || undefined,
          metadata: item.metadata || {},
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: item.updatedAt || undefined,
        }));

        setContent(validatedContent);
        setFilteredContent(validatedContent);
      } else {
        // Handle case where API returns success: false
        throw new Error(response.data.message || 'Invalid response format');
      }

    } catch (err) {
      // Check if component is still mounted before updating state
      if (!mountedRef.current) return;

      // Don't set error for cancelled requests
      if (axios.isCancel(err)) {
        return;
      }

      let errorMessage = "Failed to fetch content";

      if (err instanceof AxiosError) {
        if (err.response) {
          // Server responded with error status
          const apiError = err.response.data as ApiError;
          
          switch (err.response.status) {
            case 401:
              errorMessage = "You are not authorized. Please log in again.";
              break;
            case 400:
              errorMessage = apiError.error || "Invalid request. Please check your input.";
              break;
            case 404:
              errorMessage = "Content not found.";
              break;
            case 500:
              errorMessage = "Server error. Please try again later.";
              break;
            default:
              errorMessage = apiError.error || `Request failed with status ${err.response.status}`;
          }
        } else if (err.request) {
          // Request was made but no response received
          errorMessage = "Network error. Please check your connection.";
        } else {
          // Something else happened
          errorMessage = err.message || "An unexpected error occurred";
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      
      // Clear content on error to prevent showing stale data
      setContent([]);
      setFilteredContent([]);
      
      console.error("Error fetching content:", err);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [userId]);

  const filterContentByType = useCallback((type: string) => {
    if (type === "ALL") {
      setFilteredContent(content);
    } else {
      const validTypes: Content['type'][] = ['NOTE', 'DOCUMENT', 'LINK'];
      if (validTypes.includes(type as Content['type'])) {
        setFilteredContent(content.filter((item) => item.type === type));
      } else {
        console.warn(`Invalid content type: ${type}`);
        setFilteredContent(content);
      }
    }
  }, [content]);

  const getCountByType = useCallback((type: string): number => {
    if (type === "ALL") {
      return content.length;
    }
    return content.filter((item) => item.type === type).length;
  }, [content]);

  const refetch = useCallback(async (): Promise<void> => {
    await fetchData();
  }, [fetchData]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-fetch when userId changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derived state
  const totalCount = content.length;
  const isEmpty = content.length === 0 && !loading && !error;

  return {
    content,
    filteredContent,
    loading,
    error,
    filterContentByType,
    getCountByType,
    fetchData,
    refetch,
    clearError,
    totalCount,
    isEmpty,
  };
};

export default useFetchContent;