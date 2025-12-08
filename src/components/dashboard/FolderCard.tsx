import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, HoverDetails } from '../ui';
import { 
  FolderIcon, 
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface FolderData {
  _id: string;
  name: string;
  createdAt?: string;
  size?: number;
}

interface FolderCardProps {
  folder: FolderData;
  parentName: string;
  path: any[];
  onRename: (folder: FolderData) => void;
  onDelete: (id: string) => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({
  folder,
  parentName,
  path,
  onRename,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleCopyPath = () => {
    const fullPath = path.map(p => p.name).join('/') + '/' + folder.name;
    navigator.clipboard.writeText(fullPath);
  };

  return (
    <HoverDetails
      name={folder.name}
      path={path.map(p => p.name).join('/')}
      size={folder.size}
      lastModified={folder.createdAt}
      type="folder"
      isVisible={true}
      onRename={() => onRename(folder)}
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
                onRename(folder);
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
            >
              <PencilIcon className="w-4 h-4" />
              <span>Rename</span>
            </button>
            <button
              onClick={() => {
                onDelete(folder._id);
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

      {/* Folder Content */}
      <div className="flex flex-col items-center space-y-3">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <FolderIcon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
        
        <div className="text-center w-full">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {folder.name}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Link
            to={`/dashboard/${folder.name}=${folder._id}`}
            className="flex-1"
          >
            <Button variant="primary" size="sm" className="w-full">
              <EyeIcon className="w-4 h-4 mr-1" />
              Open
            </Button>
          </Link>
        </div>
      </div>
      </Card>
    </HoverDetails>
  );
};