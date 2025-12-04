import { useEffect, useState } from "react";
import { StoreLogin, StoreLogout } from "./store/authSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import MyDriveBox from "./component/MyDriveBox";

import dayjs from "dayjs";
import StorageInfoCard from "./component/StorageInfoCard";
import FileInfo from "./component/FileCard_UI/FileInfo";
import FIleIcon from "./component/FileCard_UI/FIleIcon";
import toast from "react-hot-toast";
import { Button } from "@material-tailwind/react";

interface fileDataType {
  name: string;
  id: string;
  parent: string;
  extension: string;
  isPaid: boolean;
}

export interface PathTypes {
  _id: string;
  name: string;
}
interface directoryDataType {
  name: string;
  id: string;
  directories: directoryDataType[];
  files: fileDataType[];
  parent: string;
  path: PathTypes[];
}

interface StorageInfoType {
  totalStorage: number;
  usedStorage: number;
}

type createFilePropsType = "folder" | "file";

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
  const handleUpload = async () => {
    if (!uploadfile || !files?.id) return;
try {
      const UrlData = await fetch(`${base_url}/file/uploads/initiate`,{
      method:"POST", body:JSON.stringify({fileSize:`${uploadfile?.size}`,fileName:`${uploadfile?.name}`}),credentials:"include",headers:{
        "Content-Type": 'application/json'
      }
    })
    const {postUrl,id} = await UrlData.json()
  const s3Res = await fetch(postUrl, {method:"put",headers:{'Content-Type':`${uploadfile?.type}`},body:uploadfile })
  if(s3Res?.status==200){

    const serverRes = await fetch(`${base_url}/file/uploads/complete`,{
      method:"put", headers:{ "Content-Type": "application/json"},credentials:"include",body:JSON.stringify({fileId:`${id}`})
    })
const json = await serverRes.json()
toast.success(json?.msg)

  }
    } catch (error) {
      console.log("error",error)
      toast.error("upload falied")
    } finally {
      GetData();
      setUploadfile(null);
    }
  };



  

  //delete the file and folder
  const handleDelete = async (id: string, fileType: parameterType) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/${fileType}/${id}`;

    try {
      const data = await fetch(url, {
        method: "DELETE",
        headers: { parentid: `${files?.id}` },
        credentials: "include",
      });
      //const msg = await data.json()
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
  interface popUoType {
    message: string | null;
    open: boolean;
  }
  const [rename, setRename] = useState<renameObj>({
    newName: null,
    oldName: null,
    Id: null,
  });
  const [popup, setPopup] = useState<popUoType>({ message: null, open: true });

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
      const json = await data.json();
      if (json?.message) {
        setPopup({ open: true, message: json.message });
        GetData();
      }
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
      const json = await response.json();
      if (response.status == 200) {
        setFiles(null);
        //dispatch(StoreLogout())
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

  useEffect(() => {
    GetData();
  }, [dirname]);

  const [renameType, setRenameType] = useState<parameterType>("directory");
  const [createFile, setCreateFile] = useState<createFilePropsType>("folder");
  const [newDirname, setDirname] = useState<string | null>(null);
  interface showDetailsType {
    index: number | null;
    active: boolean;
  }
  const [showDetails, setShowDetails] = useState<showDetailsType>({
    active: false,
    index: null,
  });
  const [storageInfo, setStorageInfo] = useState<StorageInfoType>({
    totalStorage: 0,
    usedStorage: 0,
  });
  const [fileDetailsPopup, setFIleDetailsPopup] = useState<string | null>(null);

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen w-full px-6 py-10 relative">
      <div className="absolute top-6 right-6">
        <img
          src="./userlogo.png"
          className="h-10 w-10 cursor-pointer rounded-full ring-2 ring-white"
          alt="user"
          onClick={() => setUserLogo(!userLogo)}
        />
        {userLogo && (
          <div className="absolute right-0 mt-2 bg-[#1f1f1f] text-white p-5 rounded-xl shadow-xl w-72 flex flex-col gap-4 z-50">
            <div className="text-center">
              <h2 className="text-lg font-semibold">{userInfo?.name}</h2>
              <p className="text-sm text-gray-400">{userInfo?.email}</p>
            </div>

            <button
              className={`w-full px-4 py-2 rounded-xl ${
                userInfo?.emailVarified
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={() =>
                userInfo?.emailVarified ? null : navigate("/varifyEmali")
              }
            >
              {userInfo?.emailVarified ? "Email Verified" : "Verify Email"}
            </button>

            {(userInfo?.role === "owner" || userInfo?.role === "admin") && (
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
                onClick={() => navigate("/adminPage")}
              >
                Go to Admin Page
              </button>
            )}

            <button
              className="w-full bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-xl"
              onClick={() => navigate("/profile")}
            >
              Go to Profile
            </button>

            <button
              className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <button
          onClick={() => setCreateFile("folder")}
          className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-xl text-white"
        >
          Create Folder
        </button>
        <button
          onClick={() => setCreateFile("file")}
          className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-xl text-white"
        >
          Upload File
        </button>
      </div>

      {/* Folder Input */}
      {createFile === "folder" && (
        <div className="bg-[#1a1a1a] w-full max-w-xl mx-auto p-6 rounded-xl mb-10 flex flex-col gap-4 items-center shadow-lg">
          <h2 className="text-xl font-medium">Create New Folder</h2>
          <div className="flex w-full gap-3">
            <input
              type="text"
              placeholder="Enter folder name"
              className="flex-1 px-4 py-2 rounded-lg text-black"
              onChange={(e) => setDirname(e.target.value)}
            />
            <button
              onClick={createNewDir}
              className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg text-white"
            >
              Upload
            </button>
          </div>
        </div>
      )}

      {/* File Upload Input */}
      {createFile === "file" && (
        <div className="bg-[#1a1a1a] w-full max-w-xl mx-auto p-6 rounded-xl mb-10 flex flex-col gap-4 items-center shadow-lg">
          <h2 className="text-xl font-medium">Upload a File</h2>
          {/* //TODO:make the file can upload multiple file once and show the progrees by using xhr */}
          <input
            type="file"
            className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-violet-600 file:text-white hover:file:bg-violet-700"
            onChange={(e) => {
              if (e.target.files?.[0]) setUploadfile(e.target.files[0]);
            }}
          />
          <button
            onClick={handleUpload}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white"
          >
            Upload
          </button>
        </div>
      )}

      {/* Rename Input */}
      {rename.newName && (
        <div className="flex gap-3 justify-center mb-8">
          <input
            type="text"
            className="px-4 py-2 rounded-xl text-black"
            value={rename.newName}
            onChange={(e) =>
              setRename((prev) => ({ ...prev, newName: e.target.value }))
            }
          />
          <button
            onClick={handleRename}
            className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl"
          >
            Rename
          </button>
        </div>
      )}

      <div className="bg-black text-white min-h-screen py-10 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="w-full flex gap-4 items-center">
            <MyDriveBox />
            <StorageInfoCard
              totalStorage={storageInfo.totalStorage}
              usedStorage={storageInfo.usedStorage}
              isSubscribed={userInfo?.isSubscribed ? true :false}
            />
          </div>

          {/* Folders Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">📁 Folders</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {files?.directories?.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#1f1f1f] p-4 rounded-xl shadow-md flex flex-col items-center gap-3 hover:bg-[#2c2c2c] transition relative"
                  onMouseEnter={() => setFIleDetailsPopup(item._id)}
                  onMouseLeave={() => setFIleDetailsPopup(item._id)}
                >
                  {fileDetailsPopup == item?._id && (
                    <FileInfo
                      key={i}
                      parentName={files.name}
                      createdAt={item?.createdAt}
                      name={item.name}
                      path={files.path}
                      size={item.size}
                      type="folder"
                    />
                  )}
                  <img
                    src="/Paomedia-Small-N-Flat-Folder.512.png"
                    alt="folder"
                    className="h-20 w-20"
                  />
                  <span className="text-center text-sm truncate w-full font-medium">
                    {item.name}
                  </span>
                  <div className="flex flex-wrap justify-center gap-2 w-full mt-2">
                    <Link
                      to={`/${item.name}=${item._id}`}
                      className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded-full transition"
                    >
                      Open
                    </Link>
                    <button
                      onClick={() => handleRenameBox(item)}
                      className="px-3 py-1 text-xs bg-yellow-600 hover:bg-yellow-700 rounded-full transition"
                    >
                      Rename
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, "directory")}
                      className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded-full transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Files Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">📄 Files </h2>
            <h3 className="text-2xl font-semibold mb-6">
              Total Number Of Files {files?.files.length}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {files?.files?.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#1f1f1f] relative p-4 rounded-xl shadow-md flex flex-col items-center gap-3 hover:bg-[#2c2c2c] transition"
                  onMouseEnter={() => setFIleDetailsPopup(item._id)}
                  onMouseLeave={() => setFIleDetailsPopup(item._id)}
                >
                  {fileDetailsPopup == item?._id && (
                    <FileInfo
                      key={i}
                      parentName={files.name}
                      createdAt={item?.createdAt}
                      name={item.name}
                      path={files.path}
                      size={item.size}
                      type="folder"
                    />
                  )}
                  <img
                    src="/Shaunkleyn-Phlat-Blue-Folders-Documents.512.png"
                    alt="file"
                    className="h-20 w-20"
                  />
                  <span className="text-center text-sm truncate w-full font-medium">
                    {`${item.name}${item.extension}`}
                  </span>
                  <div className="flex flex-wrap justify-center gap-2 w-full mt-2">
                    <Button
                      onClick={()=>GetFileContent(item?._id)}
                      className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded-full transition"
                    >
                      Open
                    </Button>
                    <Link
                      to={`${import.meta.env.VITE_SERVER_URL}/file/${
                        item.id
                      }?action=download`}
                      className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 rounded-full transition"
                    >
                      Download
                    </Link>
                    <button
                      onClick={() => handleRenameBox(item)}
                      className="px-3 py-1 text-xs bg-yellow-600 hover:bg-yellow-700 rounded-full transition"
                    >
                      Rename
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, "file")}
                      className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded-full transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <FileDetails lastModified='2025' name='sanatBlog' size='12mb' type='file'/> */}
    </div>
  );
};

export default DirectoryData;
