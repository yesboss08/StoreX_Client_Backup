import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, HoverDetails } from '../ui';
import { 
  DocumentIcon, 
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface FileData {
  _id: string;
  name: string;
  extension: string;
  createdAt?: string;
  size?: number;
  id: string;
}

interface FileCardProps {
  file: FileData;
  parentName: string;
  path: any[];
  onRename: (file: FileData) => void;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({
  file,
  parentName,
  path,
  onRename,
  onDelete,
  onOpen,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getFileIcon = () => {
    // You can expand this to show different icons based on file type
    return <DocumentIcon className="w-12 h-12 text-gray-600 dark:text-gray-400" />;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/file/${file.id}?action=download`, '_blank');
  };

  const handleCopyPath = () => {
    const fullPath = path.map(p => p.name).join('/') + '/' + file.name + file.extension;
    navigator.clipboard.writeText(fullPath);
  };

  return (
    <HoverDetails
      name={`${file.name}${file.extension}`}
      path={path.map(p => p.name).join('/')}
      size={file.size}
      lastModified={file.createdAt}
      type="file"
      isVisible={true}
      onDownload={handleDownload}
      onRename={() => onRename(file)}
      onCopyPath={handleCopyPath}
    >
      <Card 
        variant="elevated" 
        padding="md"
        className="group hover:scale-105 transition-all duration-200 relative"
      >

      {/* Menu Button */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          className="p-1"
          onClick={() => setShowMenu(!showMenu)}
        >
          <EllipsisVerticalIcon className="w-4 h-4" />
        </Button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
            <button
              onClick={() => {
                onRename(file);
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
            >
              <PencilIcon className="w-4 h-4" />
              <span>Rename</span>
            </button>
            <button
              onClick={() => {
                onDelete(file._id);
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-red-600"
            >
              <TrashIcon className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* File Content */}
      <div className="flex flex-col items-center space-y-3">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          {getFileIcon()}
        </div>
        
        <div className="text-center w-full">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {`${file.name}${file.extension}`}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formatFileSize(file.size)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Button 
            variant="primary" 
            size="sm" 
            className="flex-1"
            onClick={() => onOpen(file._id)}
          >
            <EyeIcon className="w-4 h-4 mr-1" />
            Open
          </Button>
          
          <Link
            to={`${import.meta.env.VITE_SERVER_URL}/file/${file.id}?action=download`}
            className="flex-1"
          >
            <Button variant="secondary" size="sm" className="w-full">
              <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
              Download
            </Button>
          </Link>
        </div>
      </div>
      </Card>
    </HoverDetails>
  );
};