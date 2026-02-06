import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { TopBar } from '../../components/dashboard/TopBar';
import { StorageCard } from '../../components/dashboard/StorageCard';
import { FolderCard } from '../../components/dashboard/FolderCard';
import { StatsPanel } from '../../components/dashboard/StatsPanel';
import { RecentFilesTable } from '../../components/dashboard/RecentFilesTable';
import { useTheme } from '../../contexts/ThemeContext';

import { StorageResponse, File, Folder, User } from '../../types';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    storage: StorageResponse['storage'] | null;
    files: File[];
    folders: Folder[];
    user: User | null;
  }>({
    storage: null,
    files: [],
    folders: [],
    user: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hello")
        const api = ""
        const [storageData, filesData, foldersData, userData] = await Promise.all([
          api.getStorage(),
          api.getFiles(),
          api.getFolders(),
          api.getUser()
        ]);

        setData({
          storage: storageData.storage,
          files: filesData.files,
          folders: foldersData.folders,
          user: userData
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
     return <div className={`flex h-screen items-center justify-center ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>Loading...</div>;
  }

  return (
    <div className={`flex h-screen overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative transition-colors duration-300">
        <TopBar user={data.user || undefined} />
        
        <div className="flex-1 overflow-y-auto px-8 pb-8">
           {/* Storage Cards */}
           <div className="mb-10">
             <h2 className={`text-lg font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
               Storage
             </h2>
             <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
               {data.storage && Object.entries(data.storage).map(([key, value]) => {
                 if (key === 'totals') return null;
                 const providerInfo = getProviderInfo(key, value as any);
                 return <StorageCard key={key} provider={providerInfo} />;
               })}
             </div>
           </div>

           {/* Folders */}
           <div className="mb-10">
             <div className="flex items-center justify-between mb-4">
               <h2 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                 Folders
               </h2>
               <button className="text-sm text-[#4F46E5] font-medium hover:underline">
                 View All
               </button>
             </div>
             <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                {data.folders.map(folder => (
                  <FolderCard key={folder.id} folder={folder} />
                ))}
             </div>
           </div>

           {/* Recent Files */}
           <RecentFilesTable files={data.files} />
        </div>
      </main>

      <StatsPanel 
        totals={data.storage?.totals || { used: 0, total: 0, percentage: 0 }} 
        categories={[
            { id: '1', name: 'Images', icon: '', sizeBytes: 12360000000, color: '#4F46E5' },
            { id: '2', name: 'Documents', icon: '', sizeBytes: 796000000, color: '#0EA5E9' },
            { id: '3', name: 'Videos', icon: '', sizeBytes: 6800000000, color: '#F43F5E' },
            { id: '4', name: 'Audios', icon: '', sizeBytes: 1300000000, color: '#10B981' },
            { id: '5', name: 'Archive', icon: '', sizeBytes: 16000000000, color: '#F59E0B' },
            { id: '6', name: 'Others files', icon: '', sizeBytes: 11500000000, color: '#8B5CF6' },
        ]} 
      />
    </div>
  );
};

function getProviderInfo(key: string, data: { used: number, total: number }) {
   const config: any = {
     google: { 
       name: 'Google Drive', 
       icon: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png', 
       color: '#3B82F6' 
     },
     onedrive: { 
       name: 'One Drive', 
       icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Microsoft_Office_OneDrive_%282019%E2%80%93present%29.svg', 
       color: '#0EA5E9' 
     },
     dropbox: { 
       name: 'Dropbox', 
       icon: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg', 
       color: '#0061FF' 
     }
   };
   const info = config[key] || { name: key, icon: '', color: '#999' };
   return {
     id: key,
     ...info,
     ...data
   };
}

export default Dashboard;
