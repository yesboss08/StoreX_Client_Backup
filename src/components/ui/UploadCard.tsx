import React from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { 
  DocumentIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error' | 'cancelled';

export interface UploadCardProps {
  file: File;
  status: UploadStatus;
  progress?: {
    loaded: number;
    total: number;
    percent: number;
  };
  error?: string;
  successMessage?: string;
  onCancel?: () => void;
  onRetry?: () => void;
  onRemove?: () => void;
  className?: string;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getStatusIcon = (status: UploadStatus) => {
  switch (status) {
    case 'success':
      return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
    case 'error':
    case 'cancelled':
      return <XCircleIcon className="w-5 h-5 text-red-600" />;
    case 'uploading':
      return <ArrowPathIcon className="w-5 h-5 text-primary-600 animate-spin" />;
    default:
      return <DocumentIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
  }
};

const getStatusColor = (status: UploadStatus) => {
  switch (status) {
    case 'success':
      return 'success';
    case 'error':
    case 'cancelled':
      return 'error';
    case 'uploading':
      return 'default';
    default:
      return 'default';
  }
};

export const UploadCard: React.FC<UploadCardProps> = ({
  file,
  status,
  progress,
  error,
  successMessage,
  onCancel,
  onRetry,
  onRemove,
  className = ''
}) => {
  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        if (progress) {
          return `Uploading — ${progress.percent}% (${formatBytes(progress.loaded)} / ${formatBytes(progress.total)})`;
        }
        return 'Uploading...';
      case 'success':
        return successMessage || 'Upload complete';
      case 'error':
        return error || 'Upload failed';
      case 'cancelled':
        return 'Upload cancelled';
      default:
        return 'Ready to upload';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        {/* File Icon */}
        <div className="flex-shrink-0 mt-1">
          {getStatusIcon(status)}
        </div>
        
        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate pr-2">
              {file.name}
            </h4>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-1 flex-shrink-0">
              {status === 'uploading' && onCancel && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCancel}
                  className="p-1 h-8 w-8"
                  aria-label="Cancel upload"
                >
                  <XMarkIcon className="w-4 h-4" />
                </Button>
              )}
              
              {(status === 'error' || status === 'cancelled') && onRetry && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRetry}
                  className="p-1 h-8 w-8"
                  aria-label="Retry upload"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                </Button>
              )}
              
              {(status === 'success' || status === 'error' || status === 'cancelled') && onRemove && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRemove}
                  className="p-1 h-8 w-8"
                  aria-label="Remove file"
                >
                  <XMarkIcon className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* File Size */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {formatBytes(file.size)}
          </p>
          
          {/* Status Text */}
          <p className={`text-xs mb-3 ${
            status === 'error' || status === 'cancelled' 
              ? 'text-red-600 dark:text-red-400' 
              : status === 'success'
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {getStatusText()}
          </p>
          
          {/* Progress Bar */}
          {status === 'uploading' && progress && (
            <ProgressBar
              value={progress.percent}
              variant={getStatusColor(status)}
              size="sm"
            />
          )}
        </div>
      </div>
    </div>
  );
};