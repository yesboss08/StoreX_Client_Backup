import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { TopBar } from '../../components/dashboard/TopBar';
import { StorageCard } from '../../components/dashboard/StorageCard';
import { FolderCard } from '../../components/dashboard/FolderCard';
import { StatsPanel } from '../../components/dashboard/StatsPanel';
import { RecentFilesTable } from '../../components/dashboard/RecentFilesTable';
import { FileUploadForm, FolderCreateForm } from '../../components/dashboard';
import { useTheme } from '../../contexts/ThemeContext';

import { StorageResponse, File, Folder, User, Member, StorageProvider } from '../../types';

const demoMembers: Member[] = [
  { id: 'm1', name: 'Ava Peterson', initials: 'AP', avatar: 'https://i.pravatar.cc/80?img=5' },
  { id: 'm2', name: 'Noah Smith', initials: 'NS', avatar: 'https://i.pravatar.cc/80?img=12' },
  { id: 'm3', name: 'Mia Chen', initials: 'MC', avatar: 'https://i.pravatar.cc/80?img=32' },
  { id: 'm4', name: 'Leo Martin', initials: 'LM', avatar: 'https://i.pravatar.cc/80?img=18' }
];

const demoData = {
  storage: {
    google: { used: 67, total: 100 },
    onedrive: { used: 12.5, total: 15 },
    dropbox: { used: 3.5, total: 9 },
    totals: { used: 83, total: 124 }
  } as StorageResponse['storage'],
  folders: [
    {
      id: 'f-1',
      name: 'Annual reports',
      fileCount: 36,
      members: demoMembers.slice(0, 3),
      createdAt: '2025-11-20T10:00:00.000Z',
      updatedAt: '2025-12-01T08:30:00.000Z'
    },
    {
      id: 'f-2',
      name: 'Sales invoices',
      fileCount: 697,
      members: demoMembers.slice(1, 4),
      createdAt: '2025-10-12T14:10:00.000Z',
      updatedAt: '2025-12-10T09:15:00.000Z'
    },
    {
      id: 'f-3',
      name: 'Presentation',
      fileCount: 16,
      members: demoMembers.slice(0, 2),
      createdAt: '2025-09-02T08:00:00.000Z',
      updatedAt: '2025-11-28T18:45:00.000Z'
    },
    {
      id: 'f-4',
      name: 'Project images',
      fileCount: 697,
      members: demoMembers.slice(2, 4),
      createdAt: '2025-08-25T16:20:00.000Z',
      updatedAt: '2025-12-15T11:25:00.000Z'
    }
  ] as Folder[],
  files: [
    {
      id: 'file-1',
      name: 'Disaster plan report',
      type: 'pdf',
      sizeBytes: 6400000,
      members: demoMembers.slice(0, 3),
      lastModified: '2025-11-29T11:00:00.000Z'
    },
    {
      id: 'file-2',
      name: 'Meeting presentation',
      type: 'ppt',
      sizeBytes: 3100000,
      members: demoMembers.slice(1, 4),
      lastModified: '2025-11-29T09:30:00.000Z'
    },
    {
      id: 'file-3',
      name: 'Sales Invoice Aug-Oct 21',
      type: 'xls',
      sizeBytes: 9000000,
      members: demoMembers.slice(0, 2),
      lastModified: '2025-11-28T10:15:00.000Z'
    },
    {
      id: 'file-4',
      name: 'Employee lists updated',
      type: 'doc',
      sizeBytes: 897000,
      members: [],
      lastModified: '2025-11-27T15:10:00.000Z'
    },
    {
      id: 'file-5',
      name: 'Master of Analytics',
      type: 'pdf',
      sizeBytes: 4900000,
      members: demoMembers.slice(2, 4),
      lastModified: '2025-11-26T12:05:00.000Z'
    }
  ] as File[],
  user: {
    id: 'u-1',
    name: 'Ariana Lopez',
    email: 'ariana@cloudrive.test',
    avatar: 'https://i.pravatar.cc/100?img=47',
    quotaUsed: 83,
    quotaTotal: 124
  } as User
};

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [createMode, setCreateMode] = useState<'folder' | 'file' | null>(null);
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
    setData({
      storage: demoData.storage,
      files: demoData.files,
      folders: demoData.folders,
      user: demoData.user
    });
    setLoading(false);
  }, []);

  const handleCreateFolder = (name: string) => {
    const timestamp = new Date().toISOString();
    setData((prev) => ({
      ...prev,
      folders: [
        {
          id: `demo-folder-${Date.now()}`,
          name,
          fileCount: 0,
          members: [],
          createdAt: timestamp,
          updatedAt: timestamp
        },
        ...prev.folders
      ]
    }));
    setCreateMode(null);
  };

  if (loading) {
     return <div className={`flex h-screen items-center justify-center ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>Loading...</div>;
  }

  return (
    <div className={`flex h-screen overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <Sidebar
        onCreateFolder={() => setCreateMode('folder')}
        onCreateFile={() => setCreateMode('file')}
      />
      
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
                 const providerKey = key as StorageProvider['id'];
                 const providerInfo = getProviderInfo(providerKey, value as ProviderStorage);
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
        totals={
          data.storage
            ? {
                used: data.storage.totals.used,
                total: data.storage.totals.total,
                percentage: data.storage.totals.total
                  ? Math.round((data.storage.totals.used / data.storage.totals.total) * 100)
                  : 0
              }
            : { used: 0, total: 0, percentage: 0 }
        }
        categories={[
            { id: '1', name: 'Images', icon: '', sizeBytes: 12360000000, color: '#4F46E5' },
            { id: '2', name: 'Documents', icon: '', sizeBytes: 796000000, color: '#0EA5E9' },
            { id: '3', name: 'Videos', icon: '', sizeBytes: 6800000000, color: '#F43F5E' },
            { id: '4', name: 'Audios', icon: '', sizeBytes: 1300000000, color: '#10B981' },
            { id: '5', name: 'Archive', icon: '', sizeBytes: 16000000000, color: '#F59E0B' },
            { id: '6', name: 'Others files', icon: '', sizeBytes: 11500000000, color: '#8B5CF6' },
        ]} 
      />

      <FolderCreateForm
        isVisible={createMode === 'folder'}
        onClose={() => setCreateMode(null)}
        onCreate={handleCreateFolder}
      />

      <FileUploadForm
        isVisible={createMode === 'file'}
        onClose={() => setCreateMode(null)}
        onUploadComplete={() => setCreateMode(null)}
      />
    </div>
  );
};

type ProviderStorage = { used: number; total: number };
type ProviderConfig = { name: string; icon: string; color: string };

function getProviderInfo(key: StorageProvider['id'], data: ProviderStorage) {
  const config: Record<string, ProviderConfig> = {
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
  const info = config[key] ?? { name: key, icon: '', color: '#999' };
  return {
    id: key,
    ...info,
    ...data
  };
}

export default Dashboard;
