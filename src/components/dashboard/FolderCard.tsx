import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Folder } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface FolderCardProps {
  folder: Folder;
}

export const FolderCard: React.FC<FolderCardProps> = ({ folder }) => {
  const { theme } = useTheme();

  return (
    <div className="min-w-[220px]">
      <div className={`p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
        theme === 'light' 
          ? 'bg-white border-gray-100' 
          : 'bg-gray-800 border-gray-700'
      }`}>
        <div className="flex justify-between items-start mb-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-xl text-blue-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <button className={`p-1 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50 text-gray-400' : 'hover:bg-gray-700 text-gray-500'}`}>
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        <h3 className={`font-semibold mb-1 text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          {folder.name}
        </h3>
        <p className="text-xs text-gray-500 mb-4">{folder.fileCount} files</p>
        
        <div className="flex -space-x-2 items-center">
  
          {folder?.members?.slice(0, 3)?.map(m => (
            <img 
              key={m.id} 
              src={m.avatar || `https://ui-avatars.com/api/?name=${m.name}`} 
              alt={m.name}
              className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 object-cover" 
            />
          ))}
          {folder?.members?.length > 3 && (
            <div className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
              +{folder?.members.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};