import React from 'react';
import { File as FileModel } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { FileRow } from './FileRow';
import { ArrowUp } from 'lucide-react';

interface RecentFilesTableProps {
  files: FileModel[];
}

export const RecentFilesTable: React.FC<RecentFilesTableProps> = ({ files }) => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-4">
        <h3 className={`font-bold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Recent files
        </h3>
        <button className="text-sm text-[#4F46E5] font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="w-full">
        {/* Header */}
        <div className={`flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider mb-2 ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          <div className="w-[40%] flex items-center gap-1 cursor-pointer">
            Name <ArrowUp className="w-3 h-3" />
          </div>
          <div className="w-[15%] flex items-center gap-1 cursor-pointer">
            File Size <ArrowUp className="w-3 h-3" />
          </div>
          <div className="w-[20%] flex items-center gap-1 cursor-pointer">
            Member <ArrowUp className="w-3 h-3" />
          </div>
          <div className="w-[20%] flex items-center gap-1 cursor-pointer">
            Last Modified <ArrowUp className="w-3 h-3" />
          </div>
          <div className="w-[5%]"></div>
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {files.map(file => (
            <FileRow key={file.id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
};
