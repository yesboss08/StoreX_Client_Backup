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

export interface FileData {
  _id: string;
  name: string;
  extension: string;
  createdAt?: string;
  size?: number;
  id: string;
}

interface PathItem {
  _id: string;
  name: string;
}

interface FileCardProps {
  file: FileData;
  parentName: string;
  path: PathItem[];
  onRename: (file: FileData) => void;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({
  file,
  path,
  onRename,
  onDelete,
  onOpen,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getFileIcon = () => {
    // You can expand this to show different icons based on file type
    return <DocumentIcon className="w-10 h-10 text-current" />;
  };

  const getFileBadgeStyle = () => {
    const ext = file.extension?.replace('.', '').toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300';
      case 'doc':
      case 'docx':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300';
      case 'xls':
      case 'xlsx':
        return 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300';
      case 'ppt':
      case 'pptx':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300';
      case 'zip':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    }
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
        className="group hover:-translate-y-0.5 transition-all duration-200 relative rounded-2xl"
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
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <div className={`p-2.5 rounded-xl ${getFileBadgeStyle()}`}>
            {getFileIcon()}
          </div>
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {file.extension?.replace('.', '') || 'file'}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
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
