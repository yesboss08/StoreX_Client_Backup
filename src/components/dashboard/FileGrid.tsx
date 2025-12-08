import React from 'react';
import { FileCard } from './FileCard';

interface FileData {
  _id: string;
  name: string;
  extension: string;
  createdAt?: string;
  size?: number;
  id: string;
}

interface FileGridProps {
  files: FileData[];
  parentName: string;
  path: any[];
  onRename: (file: FileData) => void;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({
  files,
  parentName,
  path,
  onRename,
  onDelete,
  onOpen,
}) => {
  if (!files || files.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No files yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Upload your first file to get started
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
          📄 Files
          <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            {files.length}
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {files.map((file) => (
          <FileCard
            key={file._id}
            file={file}
            parentName={parentName}
            path={path}
            onRename={onRename}
            onDelete={onDelete}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
};