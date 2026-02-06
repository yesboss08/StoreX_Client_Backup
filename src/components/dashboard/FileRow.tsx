import React from 'react';
import { File as FileModel } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { formatFileSize, formatRelativeTime } from '../../utils/cloud-storage-dashboard/fileUtils';
import { MoreHorizontal } from 'lucide-react';

interface FileRowProps {
  file: FileModel;
}

export const FileRow: React.FC<FileRowProps> = ({ file }) => {
  const { theme } = useTheme();

  const getFileIconColor = (type: string) => {
    switch(type) {
      case 'pdf': return 'bg-red-100 text-red-600';
      case 'doc':
      case 'docx': return 'bg-blue-100 text-blue-600';
      case 'xls':
      case 'xlsx': return 'bg-green-100 text-green-600';
      case 'zip': return 'bg-yellow-100 text-yellow-600';
      case 'mp4': return 'bg-purple-100 text-purple-600';
      case 'jpg': 
      case 'png': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`group flex items-center justify-between p-4 rounded-xl transition-colors cursor-pointer ${
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

      <div className="w-[20%] flex -space-x-2">
        {file.members.slice(0, 3).map((member) => (
          <img 
            key={member.id}
            src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=random`} 
            alt={member.name}
            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
            title={member.name}
          />
        ))}
        {file.members.length > 3 && (
          <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
            +{file.members.length - 3}
          </div>
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
    </div>
  );
};
