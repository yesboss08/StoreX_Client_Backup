/**
 * Single File Uploader Component
 * 
 * Production-ready XHR uploader with progress tracking, cancel/retry functionality.
 * 
 * Future enhancements for chunked/resumable uploads:
 * 1. Modify xhrUpload.ts to split files into chunks
 * 2. Add chunk tracking state and resume logic
 * 3. Update backend to handle chunk assembly
 * 4. Add pause/resume UI controls
 */

import React, { useState, useRef, useCallback } from 'react';
import { UploadCard, type UploadStatus } from './UploadCard';
import { Button } from './Button';
import { uploadFile, type UploadProgress, type UploadResult } from '../../utils/xhrUpload';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

export interface SingleFileUploaderProps {
  uploadUrl: string;
  onComplete?: (response: any) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: UploadProgress) => void;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
  disabled?: boolean;
}

// Throttle function to limit UI updates
const throttle = <T extends (...args: any[]) => void>(func: T, delay: number): T => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return ((...args: any[]) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
};

export const SingleFileUploader: React.FC<SingleFileUploaderProps> = ({
  uploadUrl,
  onComplete,
  onError,
  onProgress,
  accept,
  maxSize,
  className = '',
  disabled = false
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [showReplaceConfirm, setShowReplaceConfirm] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<UploadResult | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Throttled progress update to avoid excessive re-renders
  const throttledProgressUpdate = useCallback(
    throttle((newProgress: UploadProgress) => {
      setProgress(newProgress);
      onProgress?.(newProgress);
    }, 100),
    [onProgress]
  );
  
  const validateFile = (selectedFile: File): string | null => {
    if (maxSize && selectedFile.size > maxSize) {
      return `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`;
    }
    return null;
  };
  
  const handleFileSelect = (selectedFile: File) => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // If currently uploading, show confirmation
    if (status === 'uploading') {
      setPendingFile(selectedFile);
      setShowReplaceConfirm(true);
      return;
    }
    
    setFile(selectedFile);
    setStatus('idle');
    setProgress(null);
    setError('');
    setSuccessMessage('');
  };
  
  const confirmReplace = () => {
    if (pendingFile) {
      // Cancel current upload
      if (uploadRef.current) {
        uploadRef.current.abort();
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      setFile(pendingFile);
      setStatus('idle');
      setProgress(null);
      setError('');
      setSuccessMessage('');
    }
    setShowReplaceConfirm(false);
    setPendingFile(null);
  };
  
  const cancelReplace = () => {
    setShowReplaceConfirm(false);
    setPendingFile(null);
  };
  
  const startUpload = async () => {
    if (!file) return;
    
    setStatus('uploading');
    setProgress(null);
    setError('');
    setSuccessMessage('');
    
    try {
      // Try XHR first, fallback to fetch
      const UrlData = await fetch(uploadUrl,{
      method:"POST", body:JSON.stringify({fileSize:`${file?.size}`,fileName:`${file?.name}`}),credentials:"include",headers:{
        "Content-Type": 'application/json'
      }
    })
    const {postUrl,id} = await UrlData.json()
      if (typeof XMLHttpRequest !== 'undefined') {
        abortControllerRef.current = new AbortController();
        
        uploadRef.current = uploadFile({
          file,
          url: postUrl,
          onProgress: throttledProgressUpdate,
          onComplete: async(response) => {
           try {
               const serverRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/file/uploads/complete`,{
      method:"put", headers:{ "Content-Type": "application/json"},credentials:"include",body:JSON.stringify({fileId:`${id}`})
    })
const json = await serverRes.json()
            setStatus('success');
            setSuccessMessage(json?.msg);
            onComplete?.(response);
           } catch (error) {
            console.log("error",error)
           }
          },
          onError: (uploadError) => {
            if (uploadError.message !== 'Upload cancelled') {
              setStatus('error');
              setError(uploadError.message);
              onError?.(uploadError);
            }
          },
          signal: abortControllerRef.current.signal,
        });
        
        await uploadRef.current.promise;
      } 
    } catch  {
      console.log("erro",error)
    }
  };
  
  const cancelUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.abort();
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setStatus('cancelled');
  };
  
  const retryUpload = () => {
    startUpload();
  };
  
  const removeFile = () => {
    setFile(null);
    setStatus('idle');
    setProgress(null);
    setError('');
    setSuccessMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };
  
  return (
    <div className={className}>
      {/* Replace Confirmation Modal */}
      {showReplaceConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Replace Current Upload?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              A file is currently uploading. Do you want to cancel it and upload the new file instead?
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={cancelReplace} className="flex-1">
                Keep Current
              </Button>
              <Button variant="primary" onClick={confirmReplace} className="flex-1">
                Replace
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* File Upload Area */}
      {!file && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <CloudArrowUpIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span className="font-medium text-primary-600 hover:text-primary-700">
              Click to upload
            </span>{' '}
            or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {accept ? `Accepted formats: ${accept}` : 'Any file type'}
            {maxSize && ` • Max size: ${Math.round(maxSize / 1024 / 1024)}MB`}
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
      )}
      
      {/* Upload Card */}
      {file && (
        <div className="space-y-4">
          <UploadCard
            file={file}
            status={status}
            progress={progress || undefined}
            error={error}
            successMessage={successMessage}
            onCancel={status === 'uploading' ? cancelUpload : undefined}
            onRetry={status === 'error' || status === 'cancelled' ? retryUpload : undefined}
            onRemove={status !== 'uploading' ? removeFile : undefined}
          />
          
          {status === 'idle' && (
            <Button
              onClick={startUpload}
              disabled={disabled}
              className="w-full"
            >
              Start Upload
            </Button>
          )}
        </div>
      )}
    </div>
  );
};