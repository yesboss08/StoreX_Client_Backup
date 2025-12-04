import React, { ChangeEvent, useEffect, useState } from 'react';
import mime from 'mime';
import toast from 'react-hot-toast';
import { useNavigate,Link } from 'react-router-dom';

interface Folder {
  id: string;
  name: string;
  mimeType: string;
  parents:string | null
}



const DriveFiles: React.FC = () => {


const [files , setFiles] = useState<Array<Folder> | []>([])
const [isDownloading , setIsDownloading]= useState<boolean>(false)
const [searchedItem , setSearched] = useState<Folder[]| []>(files)
const GetAllFiles = async ()=>{
 try {
  setLoading(true)
  const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/drive/getDriveData`,{
    credentials:'include'
  })
const json = await data.json()
setFiles(json)
console.log(json)
 } catch (error) {
  console.log("error while getting drive data", error)
 }finally{
  setLoading(false)
 }
}



//download file and dir
const handleDownload = async (file: Folder) => {
  const fileType = mime.getExtension(file.mimeType)
try {
  if(!fileType){
    setIsDownloading(true)
    setDownloadProgress(null)
    const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/drive/download/directory/${file.id}`,{
      credentials:"include",method:'post',body:JSON.stringify({dirName:file.name}),headers: { "Content-Type": "application/json"}
    })
     if(data.status==201){
      toast.success("file downloaded and saved")
     }
  }
} catch (error) {
  console.log("error while dowloading a folder",error)
  toast.error("server error")
}finally{
  setIsDownloading(false)
}
};



useEffect(()=>{
  if(!files?.length){
    GetAllFiles()
  }},[])

function getIconFromMimeType(mimeType:string) {
  if (mimeType.includes("pdf")) return "/icons/pdf.png";
  if (mimeType.includes("spreadsheet")) return "/icons/sheet.png";
  if (mimeType.includes("document")) return "/icons/doc.png";
  if (mimeType.includes("video")) return "/icons/video.png";
  if (mimeType.includes("image")) return "/icons/images.png";
  return "/icons/file.png";
}
type FileTypeInterface=  "All" |"image"|"pdf"|"folder"|"document"|"video"|"spreadsheet"
const AllFileType =["All","image","pdf","folder","document","video","spreadsheet"]
const [FileType , setFileType] = useState<FileTypeInterface>("All")



//get specific file type 
const [loading, setLoading] = useState<boolean>(false);
const GetFileType = async ()=>{
  const url = FileType=="All"? `${import.meta.env.VITE_SERVER_URL}/drive/getDriveData`:`${import.meta.env.VITE_SERVER_URL}/drive/Getfile/${FileType}`
 try {
  setLoading(true);
  const data = await fetch(url,{
    credentials:'include'
  })
  const json = await data.json()
  setFiles(json)
 } catch (error) {
  console.log("error while getting files",error)
 }finally {
  setLoading(false);
}
}

useEffect(()=>{GetFileType()},[FileType])
useEffect(()=>{ setSearched(files)},[files])


const handleSearch = (e:ChangeEvent<HTMLInputElement>)=>{
  const input = e.target.value
  const filteredInput = files?.filter((file)=>file.name.includes(input))
  if(!filteredInput){
  return  setSearched(files)
  }
  setSearched(filteredInput)
}

const [downloadProgress , setDownloadProgress] = useState<number | null>(0)
const DownloadAllImgs = async()=>{
  setIsDownloading(true)
  const eventSourse = new EventSource(`${import.meta.env.VITE_SERVER_URL}/drive/download/AllImgs`,{withCredentials:true})
  eventSourse.onmessage=(e)=>{
    const data = JSON.parse(e.data)
    const progress = data.completed / data.total * 100
    setDownloadProgress(Math.ceil(progress))
  }
  eventSourse.addEventListener("done", () => {
    console.log("All images downloaded!");
    eventSourse.close();
    setIsDownloading(false)
    setDownloadProgress(0)
  });
  eventSourse.onerror = (e) => {
    console.error("SSE connection error or closed unexpectedly.", e);
    eventSourse.close();
    setIsDownloading(false)
  };

}



  return (
<div className="min-h-screen bg-gray-950 text-white p-6">
<div className="w-full py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-900 text-white">
  <h1 className="text-2xl sm:text-3xl font-bold whitespace-nowrap">
    Google Drive Files
  </h1>
  <button
onClick={DownloadAllImgs}
    className="px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
               text-white text-base sm:text-lg font-bold rounded-xl shadow-lg 
               hover:scale-105 hover:shadow-2xl transition-all duration-300"
  >
    🚀 Download All Photos
  </button>

  {/* Search Box */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <label htmlFor="search" className="text-base sm:text-lg font-semibold whitespace-nowrap">
      Search File Name
    </label>
    <input
    onChange={handleSearch}
      id="search"
      type="text"
      placeholder="Enter name..."
      className="bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-xl w-60 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  </div>
</div>

{/* file type section */}
<div className="w-full bg-gray-950 py-4 px-6">
  <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
    {AllFileType.map((type) => (
      <button onClick={()=>setFileType(type)}
        key={type}

        className={`px-5 py-2 rounded-full  ${FileType == type ? "bg-blue-600":"bg-gray-800"} hover:bg-blue-600 text-white font-medium text-sm transition duration-200 border border-gray-700 hover:border-blue-400`}      >
        {type}
      </button>
    ))}
  </div></div>



  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
   {loading ?(<Spinner/>): ( searchedItem?.map((file) => (
  <div
  key={file.id}
  className="bg-gray-900 rounded-xl p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-200"
>
  {/* File Icon */}
  <div className="flex justify-center items-center h-32 mb-4">
    <img
      src={getIconFromMimeType(file?.mimeType)}
      alt="file-icon"
      className="w-16 h-16"
    />
  </div>

  {/* File Info */}
  <div className="text-sm">
    <p className="font-semibold text-lg text-gray-100 truncate mb-1">{file.name}</p>
    <p className="text-gray-400 text-xs break-all mb-1">ID: {file.id}</p>
    <p className="text-gray-500 text-xs">Type: {file.mimeType}</p>
  </div>

  
  <div className="mt-4 flex flex-col gap-2">
  <Link
  to={`${import.meta.env.VITE_SERVER_URL}/drive/file/${file.id}?mimeType=${file.mimeType}`}
  className="block text-center py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg font-medium transition-colors duration-150"
>
  Open
</Link>

 
    <button
      onClick={() => handleDownload(file)}
      className="py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors duration-150"
    >
      Download
    </button>
  </div>
</div>

    )))}
  </div>

{isDownloading && <DownloadPopUp progress={downloadProgress} setIsDownload={(val)=>setIsDownloading(val)}/>}



</div>

  
  );
};

export default DriveFiles;


//spinner
const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-24 h-24 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};




type DownloadPopUpProps = {
  setIsDownload: (val: boolean) => void;
  progress:number | null
};

const DownloadPopUp = ({setIsDownload,progress}:DownloadPopUpProps)=>{

const handleStop=()=>{
setIsDownload(true)
}

  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-8 w-80 flex flex-col items-center">
    
      <div className="relative mb-6">
        <svg className="w-20 h-20 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
         {progress!=null ? `${progress}%`:""}
        </span>
      </div>

      <p className="text-lg font-semibold mb-4">Downloading files...</p>

      <button
       onClick={handleStop}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition duration-200"
      >
        Stop Download
      </button>
    </div>
  </div>
  )
}
