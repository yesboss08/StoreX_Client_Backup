import React from "react";
import { Link} from "react-router-dom";



interface StorageProps {totalStorage:number , usedStorage:number,isSubscribed:boolean}


const StorageInfoCard:React.FC<StorageProps>=({totalStorage,usedStorage,isSubscribed})=> {
  
  // Circle math
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const totalStorageInGB = totalStorage/1024**3
  const usedStorageInGB =usedStorage/1024**3 
  //const usedStorageInGB =isSubscribed ? usedStorage/1024**3 :totalStorage/1024**3
  const usedPercent = usedStorageInGB/totalStorageInGB*100

  const formatedPercentage = usedPercent.toFixed(2)
  const offset = circumference - (usedPercent / 100) * circumference;

console.log({usedStorage})


  return (
    <div className="w-80 h-52 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
      {/* Title */}
      <h2 className="font-semibold text-xl  text-black text-start w-full">Total Storage</h2>

 <div className=" flex items-center gap-4 ">
         {/* Circular Progress */}
      <div className="relative w-40 h-40 pt-5 ">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="15"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="15"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
          {/* Gradient */}
          <defs>
            <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
         
      </div>
{/* storage details */}
   <div >
      <div className="mt-4 text-center ">
        <p className="text-lg font-semibold text-blue-600">{totalStorageInGB.toFixed(2)} GB</p>
        <p className="text-sm text-gray-500">Total Storage</p>
        <p className="text-blue-600 font-semibold">{usedStorageInGB.toFixed(2)} GB</p>
        <p className={`text-md text-nowrap ${usedPercent>98 ? "text-red-600":"text-blue-500"}`}>{formatedPercentage}% Used</p>
      </div>

      <Link to={'/plans'}><button className="mt-1 h-12 bg-violet-600 text-white px-4 py-2 rounded-xl">
        Upgrade
      </button>
      </Link>
   </div>
 </div>


    </div>
  );
}


export default StorageInfoCard


