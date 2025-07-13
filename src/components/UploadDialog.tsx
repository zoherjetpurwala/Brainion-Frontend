import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import {
  PlusCircleIcon,
  StickyNote,
  FileText,
  LucideLink,
  Upload,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useContentStore } from "../store/useContentStore";
import { useUserStore } from "../store/useUserStore";

type NoteFormData = {
  noteTitle: string;
  noteContent: string;
};

type DocumentFormData = {
  document: FileList;
};

type LinkFormData = {
  url: string;
};

interface ApiResponse {
  success: boolean;
  data: any;
  message?: string;
}

interface ApiError {
  error: string;
  details?: any;
}

const UploadDialog: React.FC<{
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}> = ({ dialogOpen, setDialogOpen }) => {
  const {
    register: registerNote,
    handleSubmit: handleNoteSubmit,
    reset: resetNoteForm,
    formState: { errors: noteErrors },
  } = useForm<NoteFormData>();

  const {
    register: registerDocument,
    handleSubmit: handleDocumentSubmit,
    reset: resetDocumentForm,
    formState: { errors: documentErrors },
  } = useForm<DocumentFormData>();

  const {
    register: registerLink,
    handleSubmit: handleLinkSubmit,
    reset: resetLinkForm,
    formState: { errors: linkErrors },
  } = useForm<LinkFormData>();

  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("notes");
  const [uploadType, setUploadType] = useState<string | null>(null);

  // Validation rules
  const noteValidation = {
    noteTitle: {
      required: "Title is required",
      minLength: { value: 1, message: "Title cannot be empty" },
      maxLength: {
        value: 500,
        message: "Title is too long (max 500 characters)",
      },
    },
    noteContent: {
      required: "Content is required",
      minLength: { value: 1, message: "Content cannot be empty" },
      maxLength: {
        value: 50000,
        message: "Content is too long (max 50,000 characters)",
      },
    },
  };

  const linkValidation = {
    url: {
      required: "URL is required",
      pattern: {
        value: /^https?:\/\/.+/,
        message: "Please enter a valid URL starting with http:// or https://",
      },
    },
  };

  const resetAllForms = () => {
    resetNoteForm();
    resetDocumentForm();
    resetLinkForm();
    setUploadProgress(0);
    setUploadType(null);
  };

  const handleError = (error: any, defaultMessage: string) => {
    let errorMessage = defaultMessage;

    if (error instanceof AxiosError) {
      if (error.response) {
        const apiError = error.response.data as ApiError;
        switch (error.response.status) {
          case 401:
            errorMessage = "You are not authorized. Please log in again.";
            break;
          case 400:
            errorMessage =
              apiError.error || "Invalid request. Please check your input.";
            break;
          case 409:
            errorMessage = apiError.error || "This content already exists.";
            break;
          case 413:
            errorMessage = "File size is too large.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = apiError.error || defaultMessage;
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }
    }

    toast.error(errorMessage);
    console.error("Upload error:", error);
  };

  const onNoteSubmit = async (data: NoteFormData) => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);
    setUploadType("note");

    try {
      const response = await axios.post<ApiResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/notes`,
        {
          title: data.noteTitle.trim(),
          content: data.noteContent.trim(),
          userId: user.id,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          timeout: 30000, // 30 second timeout
        }
      );

      if (response.data.success) {
        toast.success("Note created successfully!", {
          description: `"${data.noteTitle}" has been saved to your collection.`,
        });
        useContentStore.getState().triggerUpdate();
        resetAllForms();
        setDialogOpen(false);
      } else {
        throw new Error(response.data.message || "Failed to create note");
      }
    } catch (error) {
      handleError(error, "Failed to create note");
    } finally {
      setLoading(false);
      setUploadType(null);
    }
  };

  const onDocumentSubmit = async (data: DocumentFormData) => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    if (!data.document?.[0]) {
      toast.error("Please select a file");
      return;
    }

    const file = data.document[0];

    // Enhanced file validation
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "text/markdown",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Unsupported file type", {
        description: "Supported formats: PDF, DOC, DOCX, TXT, MD",
      });
      return;
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      toast.error("File size too large", {
        description: "Maximum file size is 50MB",
      });
      return;
    }

    setLoading(true);
    setUploadType("document");
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.id);

      const response = await axios.post<ApiResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/documents`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          timeout: 120000, // 2 minute timeout for large files
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
            }
          },
        }
      );

      if (response.data.success) {
        setUploadProgress(100);
        toast.success("Document uploaded successfully!", {
          description: `"${file.name}" has been processed and saved.`,
        });
        useContentStore.getState().triggerUpdate();
        resetAllForms();
        setDialogOpen(false);
      } else {
        throw new Error(response.data.message || "Failed to upload document");
      }
    } catch (error) {
      handleError(error, "Failed to upload document");
    } finally {
      setLoading(false);
      setUploadType(null);
      setUploadProgress(0);
    }
  };

  const onLinkSubmit = async (data: LinkFormData) => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);
    setUploadType("link");

    try {
      // Normalize URL
      let url = data.url.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
      }

      const response = await axios.post<ApiResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/link`,
        { url, userId: user.id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          timeout: 60000, // 1 minute timeout for URL processing
        }
      );

      if (response.data.success) {
        toast.success("Link saved successfully!", {
          description:
            "The link has been processed and saved to your collection.",
        });
        useContentStore.getState().triggerUpdate();
        resetAllForms();
        setDialogOpen(false);
      } else {
        throw new Error(response.data.message || "Failed to save link");
      }
    } catch (error) {
      handleError(error, "Failed to save link");
    } finally {
      setLoading(false);
      setUploadType(null);
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "notes":
        return <StickyNote className="h-4 w-4" />;
      case "documents":
        return <FileText className="h-4 w-4" />;
      case "links":
        return <LucideLink className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getLoadingMessage = () => {
    switch (uploadType) {
      case "note":
        return "Creating note...";
      case "document":
        return "Processing document...";
      case "link":
        return "Processing link...";
      default:
        return "Processing...";
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          resetAllForms();
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="h-12 max-sm:w-12 md:py-2 md:px-4 flex justify-center items-center border rounded-2xl border-blue-800/25 bg-white hover:shadow-lg hover:scale-105 hover:bg-blue-50/30 transition-all duration-300 group">
          <span className="flex gap-2 items-center">
            <PlusCircleIcon className="h-6 w-6 text-blue-700 group-hover:text-blue-800 transition-colors" />
            <h1 className="max-sm:hidden font-semibold text-gray-700 group-hover:text-blue-800 transition-colors">
              Add Ideas
            </h1>
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-white shadow-2xl rounded-2xl p-0 border border-blue-200/50 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-blue-100/40 border-b border-blue-200/30">
          <DialogTitle className="text-2xl font-bold text-blue-950 flex items-center gap-3">
            <div className="p-2 bg-blue-700/90 rounded-xl">
              <PlusCircleIcon className="h-5 w-5 text-white" />
            </div>
            Add New Idea
          </DialogTitle>
          <p className="text-blue-700/60 text-sm mt-1 font-medium">
            Create notes, upload documents, or save links
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-blue-50/50 p-1 rounded-xl border border-blue-200/30">
              <TabsTrigger
                value="notes"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 rounded-lg transition-all duration-200"
              >
                {getTabIcon("notes")}
                <span className="font-medium">Notes</span>
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 rounded-lg transition-all duration-200"
              >
                {getTabIcon("documents")}
                <span className="font-medium">Docs</span>
              </TabsTrigger>
              <TabsTrigger
                value="links"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 rounded-lg transition-all duration-200"
              >
                {getTabIcon("links")}
                <span className="font-medium">Links</span>
              </TabsTrigger>
            </TabsList>

            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-6">
              <form
                onSubmit={handleNoteSubmit(onNoteSubmit)}
                className="space-y-4"
              >
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Note Title
                  </Label>
                  <Input
                    {...registerNote("noteTitle", noteValidation.noteTitle)}
                    placeholder="Enter a descriptive title..."
                    className="border-blue-200/50 focus:border-blue-500 focus:ring-blue-500/20"
                    disabled={loading}
                  />
                  {noteErrors.noteTitle && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      <p className="text-red-500 text-xs">
                        {noteErrors.noteTitle.message}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Note Content
                  </Label>
                  <Textarea
                    {...registerNote("noteContent", noteValidation.noteContent)}
                    placeholder="Write your note content here..."
                    className="border-blue-200/50 focus:border-blue-500 focus:ring-blue-500/20 min-h-[120px] resize-none"
                    disabled={loading}
                  />
                  {noteErrors.noteContent && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      <p className="text-red-500 text-xs">
                        {noteErrors.noteContent.message}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading && uploadType === "note" ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {getLoadingMessage()}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <StickyNote className="w-4 h-4" />
                      Create Note
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-6">
              <form
                onSubmit={handleDocumentSubmit(onDocumentSubmit)}
                className="space-y-4"
              >
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Document File
                  </Label>
                  <div className="relative">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.md"
                      {...registerDocument("document", {
                        required: "Please select a file",
                      })}
                      className="border-blue-200/50 focus:border-blue-500 focus:ring-blue-500/20 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={loading}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, DOC, DOCX, TXT, MD (Max 50MB)
                  </p>
                  {documentErrors.document && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      <p className="text-red-500 text-xs">
                        {documentErrors.document.message}
                      </p>
                    </div>
                  )}
                </div>

                {loading && uploadType === "document" && uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Upload Progress</span>
                      <span className="text-blue-600 font-medium">
                        {uploadProgress}%
                      </span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading && uploadType === "document" ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {getLoadingMessage()}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Document
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Links Tab */}
            <TabsContent value="links" className="mt-6">
              <form
                onSubmit={handleLinkSubmit(onLinkSubmit)}
                className="space-y-4"
              >
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                    URL Link
                  </Label>
                  <Input
                    type="url"
                    {...registerLink("url", linkValidation.url)}
                    placeholder="https://example.com or paste any link..."
                    className="border-blue-200/50 focus:border-blue-500 focus:ring-blue-500/20"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supports websites, YouTube videos, Twitter posts, and more
                  </p>
                  {linkErrors.url && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      <p className="text-red-500 text-xs">
                        {linkErrors.url.message}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading && uploadType === "link" ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {getLoadingMessage()}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LucideLink className="w-4 h-4" />
                      Save Link
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-xl"
              disabled={loading}
            >
              {loading ? "Processing..." : "Cancel"}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
