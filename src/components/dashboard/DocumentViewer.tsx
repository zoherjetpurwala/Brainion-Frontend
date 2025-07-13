import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Download, ExternalLink, FileText, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface Document {
  id: string;
  title: string;
  url: string;
  metadata?: {
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
  };
  createdAt: string;
}

interface DocumentViewerProps {
  doc: Document;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ doc, isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isPDF = doc.metadata?.mimeType === 'application/pdf' || doc.url.endsWith('.pdf');
  
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownload = () => {
    const link = document.createElement('a'); // now refers to the global DOM `document`
    link.href = doc.url;
    link.download = doc.metadata?.fileName || doc.title;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full h-full max-w-7xl max-h-screen overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-green-50/50 border-b border-green-200/30 p-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-gray-800 truncate">
                  {doc.title}
                </h1>
                <p className="text-sm text-gray-600 truncate">
                  {doc.metadata?.fileName} • {formatFileSize(doc.metadata?.fileSize)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="rounded-full"
              >
                <Download className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(doc.url, '_blank')}
                className="rounded-full"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 relative bg-gray-100 min-h-0">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600">Loading document...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Failed to load document</p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" onClick={() => window.open(doc.url, '_blank')}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in new tab
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isPDF ? (
            <iframe
              src={`${doc.url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
              className="w-full h-full border-0"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
              title={doc.title}
              style={{ minHeight: '600px' }}
            />
          ) : (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center max-w-md">
                <FileText className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Preview Not Available
                </h3>
                <p className="text-gray-600 mb-6">
                  This document type cannot be previewed directly in the browser.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleDownload} className="flex-1 sm:flex-none">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(doc.url, '_blank')}
                    className="flex-1 sm:flex-none"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in new tab
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};