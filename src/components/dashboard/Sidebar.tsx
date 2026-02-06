import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Cloud, 
  Home, 
  File, 
  Users, 
  Clock, 
  Star, 
  Trash2, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Plus,
  FolderPlus,
  FileText,
  FileSpreadsheet,
  Presentation,
  MoreHorizontal
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
  const { theme } = useTheme();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: File, label: 'My Files', path: '/dashboard/files' },
    { icon: Users, label: 'Shared with me', path: '/dashboard/shared' },
    { icon: Clock, label: 'Recent', path: '/dashboard/recent' },
    { icon: Star, label: 'Favorites', path: '/dashboard/favorites' },
    { icon: Trash2, label: 'Trash', path: '/dashboard/trash' },
  ];

  const bottomItems = [
    { icon: HelpCircle, label: 'Help', path: '/dashboard/help' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const sidebarClass = theme === 'light' 
    ? 'bg-[#4F46E5] text-white' 
    : 'bg-gray-900 text-gray-300 border-r border-gray-800';

  const itemHoverClass = theme === 'light'
    ? 'hover:bg-white/10'
    : 'hover:bg-gray-800 text-gray-400 hover:text-white';

  const activeClass = theme === 'light'
    ? 'bg-white/20 shadow-sm'
    : 'bg-gray-800 text-white border-l-4 border-[#4F46E5]';

  return (
    <div className={`flex flex-col h-screen ${sidebarClass} transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} py-6 flex-shrink-0 z-50`}>
      <div className="px-8 mb-10 flex items-center gap-3">
        <Cloud className="w-8 h-8" strokeWidth={2.5} />
        {!isCollapsed && <span className="text-2xl font-bold tracking-tight">mCloud</span>}
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => 
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive ? activeClass : itemHoverClass
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 mt-auto space-y-6">
        <div className="space-y-2">
          {bottomItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive ? activeClass : itemHoverClass
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </NavLink>
          ))}
          
          <button className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${itemHoverClass}`}>
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Log out</span>}
          </button>
        </div>

        {!isCollapsed && (
          <div className="relative">
            <button 
              onClick={() => setIsCreateOpen(!isCreateOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                theme === 'light' 
                  ? 'bg-white text-[#4F46E5] hover:bg-gray-50' 
                  : 'bg-[#4F46E5] text-white hover:bg-[#4338ca]'
              }`}
            >
              <span className="flex items-center gap-2">Create new</span>
              <Plus className={`w-5 h-5 transition-transform ${isCreateOpen ? 'rotate-45' : ''}`} />
            </button>

            {isCreateOpen && (
              <div className={`absolute bottom-14 left-0 w-full p-2 rounded-xl shadow-xl border backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 ${
                theme === 'light' 
                  ? 'bg-white/95 border-gray-100 text-gray-700' 
                  : 'bg-gray-800/95 border-gray-700 text-gray-200'
              }`}>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium">
                  <FolderPlus className="w-4 h-4" /> Folder
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium">
                  <FileText className="w-4 h-4" /> Text file
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium">
                  <FileSpreadsheet className="w-4 h-4" /> Sheet
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium">
                  <Presentation className="w-4 h-4" /> Presentation
                </button>
                <div className="h-px bg-black/5 dark:bg-white/5 my-1" />
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium">
                  <MoreHorizontal className="w-4 h-4" /> More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
