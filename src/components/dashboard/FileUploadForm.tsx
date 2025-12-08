import React from 'react';
import { Card, Button, SingleFileUploader } from '../ui';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface FileUploadFormProps {
  isVisible: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export const FileUploadForm: React.FC<FileUploadFormProps> = ({
  isVisible,
  onClose,
  onUpload,
}) => {
  if (!isVisible) return null;

  const handleUploadComplete = (response: any) => {
    console.log('Upload completed:', response);
    // Close modal after successful upload
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleUploadError = (error: Error) => {
    console.error('Upload failed:', error);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Upload File
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1"
          >
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>

        <SingleFileUploader
          uploadUrl={`${import.meta.env.VITE_SERVER_URL}/file/uploads/initiate`}
          onComplete={handleUploadComplete}
          onError={handleUploadError}
          maxSize={100 * 1024 * 1024} // 100MB
          accept="*/*"
        />

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Files are uploaded with XHR for real-time progress tracking
          </p>
        </div>
      </Card>
    </div>
  );
};