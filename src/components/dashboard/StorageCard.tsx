import React from 'react';
import { StorageProvider } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { MoreHorizontal } from 'lucide-react';

interface StorageCardProps {
  provider: StorageProvider;
}

export const StorageCard: React.FC<StorageCardProps> = ({ provider }) => {
  const { theme } = useTheme();
  
  const percentage = Math.min(100, (provider.used / provider.total) * 100);
  const isWarning = percentage > 80;

  return (
    <div className={`p-5 rounded-2xl min-w-[280px] flex-1 transition-all duration-300 ${
      theme === 'light' 
        ? 'bg-white shadow-sm hover:shadow-md border border-gray-100' 
        : 'bg-gray-800 border border-gray-700'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${
          theme === 'light' ? 'bg-gray-50' : 'bg-gray-700/50'
        }`}>
           <img 
             src={provider.icon} 
             alt={provider.name} 
             className="w-8 h-8 object-contain"
             onError={(e) => {
               (e.target as HTMLImageElement).style.display = 'none';
               (e.target as HTMLImageElement).parentElement!.innerText = provider.name[0];
             }}
           />
        </div>
        <button className={`p-1 rounded-lg transition-colors ${
          theme === 'light' ? 'text-gray-400 hover:bg-gray-50' : 'text-gray-500 hover:bg-gray-700'
        }`}>
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <h3 className={`font-semibold text-lg mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
        {provider.name}
      </h3>
      
      <div className={`flex items-end gap-1 mb-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
        <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          {provider.used} GB
        </span>
        <span className="text-xs mb-0.5">used of {provider.total} GB</span>
      </div>

      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: isWarning ? '#EF4444' : provider.color 
          }}
        />
      </div>
    </div>
  );
};
