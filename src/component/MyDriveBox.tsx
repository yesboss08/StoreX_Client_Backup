import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from '../components/ui';
import { CloudIcon, LinkIcon } from '@heroicons/react/24/outline';

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
        if(e.origin !== import.meta.env.VITE_SERVER_URL) return
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

  const usageGB = Number(storangeInfo?.usage || 0) / 1024**3;
  const limitGB = Number(storangeInfo?.limit || 0) / 1024**3;
  const usagePercent = limitGB > 0 ? (usageGB / limitGB) * 100 : 0;

  return (
    <Card variant="elevated" className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white border-0">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-white/20 rounded-lg">
          <CloudIcon className="h-8 w-8" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Google Drive</h3>
          <p className="text-sm opacity-90">
            {usageGB.toFixed(2)}GB / {limitGB.toFixed(2)}GB
          </p>
        </div>
      </div>

      {driveConnected && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Storage Used</span>
            <span>{usagePercent.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-2 bg-white rounded-full transition-all duration-300"
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>
        </div>
      )}

      {driveConnected ? (
        <Button
          onClick={() => navigate("/mydrive")}
          variant="secondary"
          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
        >
          <CloudIcon className="w-4 h-4 mr-2" />
          Open Google Drive
        </Button>
      ) : (
        <Button
          onClick={handleConnectClick}
          variant="secondary"
          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
        >
          <LinkIcon className="w-4 h-4 mr-2" />
          Connect Google Drive
        </Button>
      )}
    </Card>
  );
};

export default MyDriveBox;