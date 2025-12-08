import React from "react";
import { Link} from "react-router-dom";
import { Card, Button } from '../components/ui';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

interface StorageProps {totalStorage:number , usedStorage:number,isSubscribed:boolean}

const StorageInfoCard:React.FC<StorageProps>=({totalStorage,usedStorage})=> {
  
  // Circle math
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const totalStorageInGB = totalStorage/1024**3
  const usedStorageInGB =usedStorage/1024**3 
  const usedPercent = totalStorageInGB > 0 ? (usedStorageInGB/totalStorageInGB*100) : 0;

  const formatedPercentage = usedPercent.toFixed(2)
  const offset = circumference - (usedPercent / 100) * circumference;

  const getStorageColor = () => {
    if (usedPercent > 90) return 'text-red-500';
    if (usedPercent > 75) return 'text-yellow-500';
    return 'text-primary-600';
  };

  const getGradientId = () => {
    if (usedPercent > 90) return 'redGradient';
    if (usedPercent > 75) return 'yellowGradient';
    return 'blueGradient';
  };

  return (
    <Card variant="elevated" className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Storage Usage
        </h3>
        {usedPercent > 80 && (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-full">
            Almost Full
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        {/* Circular Progress */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress Circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={`url(#${getGradientId()})`}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getStorageColor()}`}>
                {formatedPercentage}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Used
              </div>
            </div>
          </div>
        </div>

        {/* Storage Details */}
        <div className="flex-1 ml-6 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Storage
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {totalStorageInGB.toFixed(2)} GB
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Used Storage
              </span>
              <span className={`text-sm font-medium ${getStorageColor()}`}>
                {usedStorageInGB.toFixed(2)} GB
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link to="/plans">
              <Button 
                variant="primary" 
                size="sm" 
                className="w-full group"
              >
                <ArrowUpIcon className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                Upgrade Storage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default StorageInfoCard;