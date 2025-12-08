import React from 'react';
import { FolderCard } from './FolderCard';

interface FolderData {
  _id: string;
  name: string;
  createdAt?: string;
  size?: number;
}

interface FolderGridProps {
  folders: FolderData[];
  parentName: string;
  path: any[];
  onRename: (folder: FolderData) => void;
  onDelete: (id: string) => void;
}

export const FolderGrid: React.FC<FolderGridProps> = ({
  folders,
  parentName,
  path,
  onRename,
  onDelete,
}) => {
  if (!folders || folders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No folders yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Create your first folder to organize your files
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
          📁 Folders
          <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            {folders.length}
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {folders.map((folder) => (
          <FolderCard
            key={folder._id}
            folder={folder}
            parentName={parentName}
            path={path}
            onRename={onRename}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};