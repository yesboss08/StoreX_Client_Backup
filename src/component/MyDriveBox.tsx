import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StorageInfoType {limit:string , usage:string , usageInDrive:string ,usageInDriveTrash:string}

const MyDriveBox = () => {

  const [ storangeInfo , setStorageInfo] = useState<StorageInfoType | null>(null)
const [driveConnected , setConnected] = useState<boolean>(false)
const navigate = useNavigate()


  const handleConnectClick = () => {
  const popup =  window.open(
      `${import.meta.env.VITE_SERVER_URL}/drive/getUrl`,
      "GoogleDrivePopup",'width=500,height=600'
       );

     window.addEventListener('message',(e)=>{
      console.log(e)
        if(e.origin !== 'http://localhost:4000') return
        if(e.data =='done' ){
          console.log("done")
          popup?.close()
        }
  })
  };

  useEffect(()=>{
    GetDriveData()
  },[])

  const GetDriveData = async ()=>{
    const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/drive/storageInfo`,{
      credentials:"include"
    })
    const json = await data.json()
   setStorageInfo(json)
   if(data.status==200){
    setConnected(true)
   }
  }
   


  return (
    <div className="bg-green-700 rounded-xl px-4 py-[38px] w-72 shadow-lg text-white relative">
      <div className="flex items-center space-x-3 mb-4">
        <img src="/mydrive-logo.png" alt="Google Drive" className="h-10 w-10" />
        <div>
          <p className="font-semibold text-lg">Google Drive Storage</p>
          <p className="text-md opacity-80 font-semibold">{(Number(storangeInfo?.usage)/1024**3).toFixed(2)}GB / {(Number(storangeInfo?.limit)/1024**3).toFixed(2)}GB</p>
        </div>
      </div>

      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-4">
       {driveConnected && <div
          className="h-2 bg-violet-50 rounded-full"
          style={{ width: `${(Number(storangeInfo?.usage)/1024**3)/(Number(storangeInfo?.limit)/1024**3)*100}%` }}
        />}
      </div>

    {
      driveConnected ?  <button
      onClick={()=>{navigate("/mydrive")}}
      className="w-full py-2 text-sm bg-blue-700 text-gray-50 font-semibold rounded-lg hover:bg-gray-100 hover:text-[rgb(49,109,237)] transition"
    >
      Open Google Drive Files
    </button>:   <button
        onClick={handleConnectClick}
        className="w-full py-2 text-sm bg-violet-800 text-gray-50 font-semibold rounded-lg hover:bg-gray-100 hover:text-[rgb(49,109,237)] transition"
      >
        Connect to My Drive
      </button>
    }
    </div>
  );
};

export default MyDriveBox;


