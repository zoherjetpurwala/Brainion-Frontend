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
import axios from "axios";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { PlusCircleIcon } from "lucide-react";

type NoteFormData = {
  noteTitle: string;
  noteContent: string;
};

type DocumentFormData = {
  document: FileList;
};

const UploadDialog: React.FC<{
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}> = ({ dialogOpen, setDialogOpen }) => {
  const {
    register: registerNote,
    handleSubmit: handleNoteSubmit,
    reset: resetNoteForm,
  } = useForm<NoteFormData>();
  const {
    register: registerDocument,
    handleSubmit: handleDocumentSubmit,
    reset: resetDocumentForm,
  } = useForm<DocumentFormData>();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const onNoteSubmit = async (data: NoteFormData) => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/notes`,
        {
          title: data.noteTitle,
          content: data.noteContent,
          userId: user?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Note uploaded successfully!");
      resetNoteForm();
      setDialogOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to upload note");
    } finally {
      setLoading(false);
    }
  };

  const onDocumentSubmit = async (data: DocumentFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data.document[0]);
      formData.append("userId", user?.id || "");

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success("Document uploaded successfully!");
      resetDocumentForm();
      setDialogOpen(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Failed to upload document";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button className="h-12 max-sm:w-12 md:py-2 md:px-4 flex justify-center items-center border rounded-2xl border-blue-800/25 bg-white shadow-none hover:shadow-blue-800/25 hover:shadow-md transition-shadow duration-300">
          <span className="flex gap-2">
            <PlusCircleIcon className="h-6 w-6 text-blue-700" />
            <h1 className="max-sm:hidden">Add Ideas</h1>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white backdrop-blur-xl shadow-lg rounded-lg p-6 overflow-hidden">
        <DialogTitle className="text-2xl font-bold mb-4 text-blue-950">
          Add Idea
        </DialogTitle>
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="notes"
              className="text-blue-950 data-[state=active]:bg-blue-300/50"
            >
              Notes
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="text-blue-950 data-[state=active]:bg-blue-300/50"
            >
              Document
            </TabsTrigger>
          </TabsList>
          <TabsContent value="notes">
            <form
              onSubmit={handleNoteSubmit(onNoteSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="noteTitle">Note Title</Label>
                <Input
                  id="noteTitle"
                  {...registerNote("noteTitle", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="noteContent">Note Content</Label>
                <Textarea
                  id="noteContent"
                  {...registerNote("noteContent", { required: true })}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-950 text-white"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload Note"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="documents">
            <form
              onSubmit={handleDocumentSubmit(onDocumentSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="document">Document File</Label>
                <Input
                  id="document"
                  type="file"
                  {...registerDocument("document", { required: true })}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-950 text-white"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload Document"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <DialogClose asChild>
          <Button variant="outline" className="w-full bg-black text-white">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
