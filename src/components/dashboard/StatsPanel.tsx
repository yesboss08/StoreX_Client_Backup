import React from 'react';
import { StorageTotals, StorageCategory } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { Unlock } from 'lucide-react';
import { formatFileSize } from '../../utils/cloud-storage-dashboard/fileUtils';

interface StatsPanelProps {
  totals: StorageTotals;
  categories: StorageCategory[];
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ totals, categories }) => {
  const { theme } = useTheme();

  return (
    <div className={`w-80 flex-shrink-0 p-6 flex flex-col h-screen overflow-y-auto ${
      theme === 'light' ? 'bg-gray-50' : 'bg-gray-900 border-l border-gray-800'
    }`}>
      
      <div className="mb-8 mt-16">
        <div className="flex items-end justify-between mb-2">
          <span className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {totals.used} <span className="text-lg text-gray-500">GB</span>
          </span>
          <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            {totals.total} GB Total
          </span>
        </div>
        <div className="flex justify-between text-xs mb-2 text-gray-400">
            <span>Used</span>
            <span>Total</span>
        </div>
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
           <div 
             className="h-full bg-[#4F46E5] rounded-full transition-all duration-500"
             style={{ width: `${totals.percentage}%` }}
           />
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl transition-colors ${
                theme === 'light' 
                  ? 'bg-white shadow-sm border border-gray-100 group-hover:bg-blue-50' 
                  : 'bg-gray-800 border border-gray-700 group-hover:bg-gray-700'
              }`}>
                 <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: category.color }} />
              </div>
              <div>
                <h4 className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {category.name}
                </h4>
                <span className="text-xs text-gray-400">
                  {Math.floor(Math.random() * 500) + 50} files
                </span>
              </div>
            </div>
            <div className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {formatFileSize(category.sizeBytes)}
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-8 p-6 rounded-3xl relative overflow-hidden ${
        theme === 'light' ? 'bg-[#EEF2FF]' : 'bg-gray-800'
      }`}>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-purple-400/20 rounded-full blur-xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-[#4F46E5]">
             <Unlock className="w-6 h-6" />
          </div>
          
          <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Upgrade to PRO
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            For more features.
          </p>
          
          <button className="w-full py-3 px-4 bg-[#4F46E5] hover:bg-[#4338ca] text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};
