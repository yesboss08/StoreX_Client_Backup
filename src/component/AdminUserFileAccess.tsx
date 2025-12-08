// import React from "react"; // Unused
// import { useParams } from "react-router-dom"; // Unused

const userFolders = [
  { id: 1, name: "New Folder" },
  { id: 2, name: "boos-bro" },
  { id: 3, name: "hello" },
];

const userFiles = [
  { id: 101, name: "blogPromiseAll2", extension: ".png" },
  { id: 102, name: "resumeFinal", extension: ".pdf" },
];


const AdminUserFileAccess = () => {
    // const {userId} = useParams() // Unused


  return (
    <div className="bg-black text-white min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
      
      <div className="bg-[#0e0e0e] text-white px-6 py-8">
  <div className="max-w-6xl mx-auto">
    {/* Admin Heading */}
    <h1 className="text-3xl font-bold text-yellow-400 mb-2">🛡️ Admin Dashboard</h1>
    <p className="text-sm text-gray-400">
      View and manage files and folders of users. You have elevated access.
    </p>
    <hr className="mt-4 border-gray-700" />

    {/* User Info Section */}
    <div className="mt-8 bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-md">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src="/user.png" 
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500"
        />
      </div>

      {/* User Details */}
      <div className="flex-1 space-y-2">
        <h2 className="text-xl font-semibold text-yellow-300">👤 SANAT KUMAR RATH</h2>
        <p className="text-sm text-gray-300"><span className="font-medium text-white">Email:</span> sanat@example.com</p>
        <p className="text-sm text-gray-300"><span className="font-medium text-white">User ID:</span> 5f9a8b7c92f3f02dddb3e6a9</p>

        {/* Storage Info */}
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-1">Storage Used</p>
          <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
            <div className="bg-yellow-400 h-full w-[30%]"></div> {/* 30% used */}
          </div>
          <p className="text-xs text-gray-400 mt-1">4.8 GB of 16 GB used</p>
        </div>
      </div>
    </div>
  </div>
</div>




        {/* Folder Section */}
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
            <img src="/dirLogo.png" alt="folder" className="h-6 w-6" />
            Folders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userFolders.map((folder) => (
              <div key={folder.id} className="bg-[#1e1e1e] rounded-xl p-4 shadow flex flex-col items-center">
                {/* Folder Image */}
                <img
                  src="/Paomedia-Small-N-Flat-Folder.512.png" 
                  alt="folder"
                  className="h-20 w-20 object-contain mb-3"
                />
                <p className="text-sm font-medium text-center">{folder.name}</p>

                <div className="flex gap-2 mt-4 flex-wrap justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded-full">
                    Open
                  </button>
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-4 py-1 rounded-full">
                    Rename
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1 rounded-full">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Files Section */}
        <div>
        
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6"><img src="/fileLogo.jpeg" alt="folder" className="h-6 w-6" />
            Files 
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userFiles.map((file) => (
              <div key={file.id} className="bg-[#1e1e1e] rounded-xl p-4 shadow flex flex-col items-center">
                <img
                  src="/Shaunkleyn-Phlat-Blue-Folders-Documents.512.png" 
                  alt="file"
                  className="h-20 w-20 object-contain mb-3"
                />
                <p className="text-sm font-medium text-center">
                  {file.name}
                  {file.extension}
                </p>

               
                <div className="flex gap-2 mt-4 flex-wrap justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded-full">
                    Open
                  </button>
                  
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-4 py-1 rounded-full">
                    Rename
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1 rounded-full">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserFileAccess;
