import { useEffect, useState } from "react";
import { StoreLogin } from "./store/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import MyDriveBox from "./component/MyDriveBox";
import StorageInfoCard from "./component/StorageInfoCard";
import toast from "react-hot-toast";
import { Container, ThemeToggle } from "./components/ui";
import { 
  UserMenu, 
  ActionButtons, 
  FileUploadForm, 
  FolderCreateForm, 
  FileGrid, 
  FolderGrid 
} from "./components/dashboard";

interface fileDataType {
  _id: string;
  name: string;
  id: string;
  parent: string;
  extension: string;
  isPaid: boolean;
  createdAt?: string;
  size?: number;
}

export interface PathTypes {
  _id: string;
  name: string;
}
interface directoryDataType {
  _id: string;
  name: string;
  id: string;
  directories: directoryDataType[];
  files: fileDataType[];
  parent: string;
  path: PathTypes[];
  createdAt?: string;
  size?: number;
}

interface StorageInfoType {
  totalStorage: number;
  usedStorage: number;
}

type createFilePropsType = "folder" | "file" | null;

const DirectoryData = () => {
  const { "*": dirname } = useParams();
  const [files, setFiles] = useState<directoryDataType | null>(null);
  const base_url = import.meta.env.VITE_SERVER_URL;

  //read directory data
  const GetData = async () => {
    const dirId = dirname?.split("=")?.[1];
    const url = `${base_url}/directory${dirId ? `/${dirId}` : ""}`;
    const data = await fetch(url, { credentials: "include" });
    const json = await data.json();
    setFiles(json);
    if (!dirId)
      setStorageInfo((prev) => {
        return { ...prev, usedStorage: json?.size };
      });
    if (data.status == 409 || data.status == 404) {
      navigate("login");
    }
  };


//get the file Content 
const GetFileContent = async(fileID:string)=>{
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/file/${fileID}`,{credentials:"include"})
  const {url}= await res.json()
  window.open(url,'_blank')
}

  //create new directory
  const createNewDir = async () => {
    const PostUrl = `${base_url}/directory`;

    if (!files?.id) return;
    try {
      const res = await fetch(PostUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", parentid: files?.id },
        body: JSON.stringify({ newName: newDirname }),
        credentials: "include",
      });
      await res.json();
    } catch (error) {
      console.log("erro in create new dir", error);
    } finally {
      GetData();
      setDirname(null);
    }
  };

  //upload new file
  const [uploadfile, setUploadfile] = useState<File | null>(null);
  const [uploadProgress , setUploadProgress] = useState<number>(0)
  const handleUpload = async () => {
    if (!uploadfile || !files?.id) return;
try {
      const UrlData = await fetch(`${base_url}/file/uploads/initiate`,{
      method:"POST", body:JSON.stringify({fileSize:`${uploadfile?.size}`,fileName:`${uploadfile?.name}`}),credentials:"include",headers:{
        "Content-Type": 'application/json'
      }
    })
    const {postUrl,id} = await UrlData.json()
  // const s3Res = await fetch(postUrl, {method:"put",headers:{'Content-Type':`${uploadfile?.type}`},body:uploadfile })
const xhr = new XMLHttpRequest();
const formData = new FormData()
formData.append("file",uploadfile)
xhr.open("put",postUrl)
xhr.send(formData)

xhr.upload.onprogress=(event)=>{
  if(event.lengthComputable){
    setUploadProgress(Math.floor((event.loaded/event.total)*100))
  }
}

xhr.onload=async()=>{
 if( xhr.status==200){
  const serverRes = await fetch(`${base_url}/file/uploads/complete`,{
      method:"put", headers:{ "Content-Type": "application/json"},credentials:"include",body:JSON.stringify({fileId:`${id}`})
    })
const json = await serverRes.json()
toast.success(json?.msg)
 }else{
   toast.error("upload falied")
 }
}
    } catch (error) {
      console.log("error",error)
      toast.error("upload falied")
    } finally {
      GetData();
      setUploadfile(null);
    }
  };

useEffect(()=>{console.log(uploadProgress)},[uploadProgress])

  

  //delete the file and folder
  const handleDelete = async (id: string, fileType: parameterType) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/${fileType}/${id}`;

    try {
      await fetch(url, {
        method: "DELETE",
        headers: { parentid: `${files?.id}` },
        credentials: "include",
      });
      GetData();
    } catch (error) {
      console.log("error while delete the file", error);
      GetData();
    }
  };

  //open the rename popup
  const handleRenameBox = (item: fileDataType | directoryDataType) => {
    if ("extension" in item) {
      setRename(() => {
        return {
          newName: `${item.name}${item.extension}`,
          oldName: `${item.name}${item.extension}`,
          Id: item._id,
        };
      });
      return setRenameType("file");
    } else {
      setRename(() => {
        return { newName: item.name, oldName: item.name, Id: item._id };
      });
      setRenameType("directory");
    }
  };

  interface renameObj {
    newName: string | null;
    oldName: string | null;
    Id: string | null;
  }

  const [rename, setRename] = useState<renameObj>({
    newName: null,
    oldName: null,
    Id: null,
  });


  type parameterType = "file" | "directory";

  const handleRename = async () => {
    const url = `${base_url}/${renameType}/${rename.Id}`;
    try {
      const data = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          parentid: `${files?.id}`,
        },
        body: JSON.stringify({ newName: `${rename.newName}` }),
        credentials: "include",
      });
      await data.json();
      GetData();
    } catch (error) {
      console.log("error while renaming the file", error);
    } finally {
      setRename({ newName: null, oldName: null, Id: null });
    }
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${base_url}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      await response.json();
      if (response.status == 200) {
        setFiles(null);
        navigate("/login");
      }
    } catch (error) {
      console.log("Error while logout the user", error);
    }
  };

  interface Userinfo {
    name: string;
    email: string;
    emailVarified: boolean;
    role: "user" | "admin" | "owner" | "manager";
    isSubscribed: boolean;
  }
  const [userInfo, setUserinfo] = useState<Userinfo | null>(null);
  const [userLogo, setUserLogo] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const GetUserInfo = async () => {
    const url = `${base_url}/user/profile`;
    const res = await fetch(url, { credentials: "include" });
    const userData  = await res.json();
    if(!userData) return
    const { email, name, role, emailVarified, totalStorage, isSubscribed } = userData
    setUserinfo({ email, name, emailVarified, role, isSubscribed });
    console.log(totalStorage);
    setStorageInfo((prev) => {
      return { ...prev, totalStorage };
    });
    dispatch(StoreLogin({ email, name, role, emailVarified }));
  };

  useEffect(() => {
    GetUserInfo();
  }, []);

  // useEffect(() => {
  //   GetData();
  // }, [dirname]);

  const [renameType, setRenameType] = useState<parameterType>("directory");
  const [createFile, setCreateFile] = useState<createFilePropsType>(null);
  const [newDirname, setDirname] = useState<string | null>(null);
  const [storageInfo, setStorageInfo] = useState<StorageInfoType>({
    totalStorage: 0,
    usedStorage: 0,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <Container>
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              My Drive
            </h1>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* User Menu */}
              <div className="relative">
                <img
                  src="./userlogo.png"
                  className="h-10 w-10 cursor-pointer rounded-full ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-primary-500 transition-all"
                  alt="user"
                  onClick={() => setUserLogo(!userLogo)}
                />
                <UserMenu
                  userInfo={userInfo}
                  isOpen={userLogo}
                  onClose={() => setUserLogo(false)}
                  onLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <Container>
          {/* Storage Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <MyDriveBox />
            <StorageInfoCard
              totalStorage={storageInfo.totalStorage}
              usedStorage={storageInfo.usedStorage}
              isSubscribed={userInfo?.isSubscribed || false}
            />
          </div>

          {/* Action Buttons */}
          <ActionButtons
            onCreateFolder={() => setCreateFile("folder")}
            onUploadFile={() => setCreateFile("file")}
          />

          {/* Content Grid */}
          <div className="space-y-12">
            {/* Folders */}
            <FolderGrid
              folders={files?.directories || []}
              parentName={files?.name || ""}
              path={files?.path || []}
              onRename={(folder) => handleRenameBox(folder as any)}
              onDelete={(id) => handleDelete(id, "directory")}
            />

            {/* Files */}
            <FileGrid
              files={files?.files || []}
              parentName={files?.name || ""}
              path={files?.path || []}
              onRename={(file) => handleRenameBox(file as any)}
              onDelete={(id) => handleDelete(id, "file")}
              onOpen={GetFileContent}
            />
          </div>
        </Container>
      </main>

      {/* Modals */}
      <FolderCreateForm
        isVisible={createFile === "folder"}
        onClose={() => setCreateFile(null)}
        onCreate={(name) => {
          setDirname(name);
          createNewDir();
        }}
      />

      <FileUploadForm
        isVisible={createFile === "file"}
        onClose={() => setCreateFile(null)}
        onUpload={(file) => {
          setUploadfile(file);
          handleUpload();
        }}
      />

      {/* Rename Modal */}
      {rename.newName && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Rename {renameType}
            </h3>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-4"
              value={rename.newName}
              onChange={(e) =>
                setRename((prev) => ({ ...prev, newName: e.target.value }))
              }
            />
            <div className="flex gap-3">
              <button
                onClick={() => setRename({ newName: null, oldName: null, Id: null })}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRename}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectoryData;
