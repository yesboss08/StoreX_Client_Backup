import React from 'react';
import { File as FileModel } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { formatFileSize, formatRelativeTime } from '../../utils/cloud-storage-dashboard/fileUtils';
import { MoreHorizontal, Pencil, Copy, Scissors } from 'lucide-react';

interface FileRowProps {
  file: FileModel;
  path?: string;
}

export const FileRow: React.FC<FileRowProps> = ({ file, path }) => {
  const { theme } = useTheme();
  const members = file.members ?? [];

  const getFileIconColor = (type: string) => {
    switch(type) {
      case 'pdf': return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300';
      case 'doc':
      case 'docx': return 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300';
      case 'xls':
      case 'xlsx': return 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300';
      case 'zip': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300';
      case 'mp4': return 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300';
      case 'jpg': 
      case 'png': return 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (date: string): string => {
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`group relative flex items-center justify-between p-4 rounded-xl transition-colors cursor-pointer ${
      theme === 'light' 
        ? 'hover:bg-gray-50 border-b border-gray-50 last:border-0' 
        : 'hover:bg-gray-800 border-b border-gray-800 last:border-0'
    }`}>
      <div className="flex items-center gap-4 w-[40%]">
        <div className={`p-2.5 rounded-lg text-xs font-bold uppercase w-10 h-10 flex items-center justify-center ${getFileIconColor(file.type)}`}>
          {file.type}
        </div>
        <div>
           <h4 className={`font-medium text-sm mb-0.5 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
             {file.name}
           </h4>
        </div>
      </div>

      <div className={`w-[15%] text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
        {formatFileSize(file.sizeBytes)}
      </div>

      <div className="w-[20%] flex items-center">
        {members.length > 0 ? (
          <div className="flex -space-x-2">
            {members.slice(0, 3).map((member) => (
              <img 
                key={member.id}
                src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=random`} 
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                title={member.name}
              />
            ))}
            {members.length > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-500">
                +{members.length - 3}
              </div>
            )}
          </div>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </div>

      <div className={`w-[20%] text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
        {formatRelativeTime(file.lastModified)}
      </div>

      <div className="w-[5%] flex justify-end">
         <button className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all ${
           theme === 'light' ? 'hover:bg-gray-200 text-gray-500' : 'hover:bg-gray-700 text-gray-400'
         }`}>
           <MoreHorizontal className="w-5 h-5" />
         </button>
      </div>

      {/* Hover details card */}
      <div className="absolute left-4 bottom-[70%] mt-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-20">
        <div className={`rounded-xl border shadow-lg px-4 py-3 min-w-[220px] ${
          theme === 'light'
            ? 'bg-white border-gray-100 text-gray-800'
            : 'bg-slate-900 border-slate-700 text-gray-200'
        }`}>
          <div className="text-sm font-semibold">{file.name}</div>
          {path && (
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {path}
            </div>
          )}
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Size: {formatFileSize(file.sizeBytes)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Modified: {formatDate(file.lastModified)}
          </div>

          <div className="flex items-center gap-3 mt-3">
            <div className="p-1.5 rounded-md">
              <Pencil className="w-4 h-4" />
            </div>
            <div className="p-1.5 rounded-md">
              <Copy className="w-4 h-4" />
            </div>
            <div className="p-1.5 rounded-md">
              <Scissors className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
