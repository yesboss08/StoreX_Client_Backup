import React, { useState } from 'react';
import { Folder as FolderIcon, MoreHorizontal, Pencil, Trash2, Copy, Scissors } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface FolderMember {
  id: string;
  name: string;
  avatar?: string;
}

interface FolderCardData {
  id?: string;
  _id?: string;
  name: string;
  fileCount?: number;
  files?: Array<unknown>;
  size?: number;
  createdAt?: string;
  updatedAt?: string;
  members?: FolderMember[];
}

interface FolderCardProps {
  folder: FolderCardData;
  path?: string;
  onRename?: (folder: FolderCardData) => void;
  onDelete?: (id: string) => void;
  onOpen?: (id: string) => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({ folder, path, onRename, onDelete, onOpen }) => {
  const { theme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const members = folder.members ?? [];
  const fileCount = folder.fileCount ?? folder.files?.length ?? 0;
  const folderId = folder.id ?? folder._id ?? '';

  const hasActions = Boolean(onRename || onDelete);

  const handleCardClick = () => {
    if (onOpen && folderId) {
      onOpen(folderId);
    }
  };

  const formatBytes = (bytes?: number): string => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date?: string): string => {
    if (!date) return '—';
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const modifiedAt = folder.updatedAt ?? folder.createdAt;

  return (
    <div className="min-w-[220px]">
      <div
        onClick={handleCardClick}
        className={`group relative p-4 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 ${
          theme === 'light'
            ? 'bg-white border-gray-100 shadow-sm hover:shadow-md'
            : 'bg-gray-800/90 border-gray-700 hover:border-gray-600'
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2.5 rounded-xl ${
            theme === 'light' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'bg-indigo-500/10 text-indigo-300'
          }`}>
            <FolderIcon className="w-6 h-6" />
          </div>
          {hasActions && (
            <div className="relative">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  theme === 'light' ? 'hover:bg-gray-50 text-gray-400' : 'hover:bg-gray-700 text-gray-500'
                }`}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {showMenu && (
                <div
                  className={`absolute right-0 mt-2 w-36 rounded-xl border shadow-lg z-20 ${
                    theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'
                  }`}
                >
                  {onRename && (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onRename(folder);
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Rename
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        if (folderId) {
                          onDelete(folderId);
                        }
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <h3 className={`font-semibold text-sm mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          {folder.name}
        </h3>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-500">{fileCount} files</span>
          {members.length > 0 && (
            <div className="flex -space-x-2 items-center">
              {members.slice(0, 3).map((member) => (
                <img
                  key={member.id}
                  src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}`}
                  alt={member.name}
                  className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                />
              ))}
              {members.length > 3 && (
                <div className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-500">
                  +{members.length - 3}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hover details card */}
        <div className="absolute left-3 right-3 top-full mt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-10">
          <div className={`rounded-xl border shadow-lg px-4 py-3 ${
            theme === 'light'
              ? 'bg-white border-gray-100 text-gray-800'
              : 'bg-slate-900 border-slate-700 text-gray-200'
          }`}>
            <div className="text-sm font-semibold">{folder.name}</div>
            {path && (
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {path}
              </div>
            )}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Size: {formatBytes(folder.size)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Modified: {formatDate(modifiedAt)}
            </div>

            <div className="flex items-center gap-3 mt-3">
              <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors" title="Rename">
                <Pencil className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors" title="Copy">
                <Copy className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors" title="Cut">
                <Scissors className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
