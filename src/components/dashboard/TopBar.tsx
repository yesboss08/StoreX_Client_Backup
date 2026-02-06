import React from 'react';
import { Search, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { User } from '../../types';

interface TopBarProps {
  user?: User;
}

export const TopBar: React.FC<TopBarProps> = ({ user }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-20 px-8 flex items-center justify-between shrink-0">
      <div className={`relative w-96 flex items-center px-4 py-2.5 rounded-xl transition-colors ${
        theme === 'light' 
          ? 'bg-white shadow-sm border border-gray-100' 
          : 'bg-gray-800 border border-gray-700'
      }`}>
        <Search className={`w-5 h-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
        <input 
          type="text" 
          placeholder="Search the files" 
          className={`w-full ml-3 bg-transparent outline-none text-sm font-medium ${
            theme === 'light'
              ? 'placeholder:text-gray-400 text-gray-900'
              : 'placeholder:text-gray-500 text-white'
          }`}
        />
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl transition-all ${
            theme === 'light' 
              ? 'bg-white hover:bg-gray-50 text-gray-600 shadow-sm border border-gray-100' 
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <button className={`p-2.5 rounded-xl transition-all ${
            theme === 'light' 
              ? 'bg-white hover:bg-gray-50 text-gray-600 shadow-sm border border-gray-100' 
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
          }`}>
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2" />

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5">
             <img 
               src={user?.avatar || "https://i.pravatar.cc/150?img=3"} 
               alt={user?.name || "User"} 
               className={`w-full h-full rounded-full object-cover border-2 ${
                 theme === 'light' ? 'border-white' : 'border-gray-900'
               }`}
             />
          </div>
        </div>
      </div>
    </div>
  );
};
