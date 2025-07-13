import React from "react";
import { motion } from "framer-motion";
import { X, Calendar, Edit3, Share } from "lucide-react";
import { Button } from "../ui/button";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

interface NoteViewerProps {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
}

export const NoteViewer: React.FC<NoteViewerProps> = ({
  note,
  isOpen,
  onClose,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-50/50 border-b border-blue-200/30 p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                {note.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Created: {formatDate(note.createdAt)}</span>
                </div>
                {note.updatedAt && note.updatedAt !== note.createdAt && (
                  <div className="flex items-center gap-1">
                    <Edit3 className="w-4 h-4" />
                    <span>Updated: {formatDate(note.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  navigator.share?.({
                    title: note.title,
                    text: note.content,
                  });
                }}
              >
                <Share className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-base">
              {note.content}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
