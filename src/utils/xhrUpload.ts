/**
 * XHR Upload Utility
 * 
 * Provides XMLHttpRequest-based file upload with progress tracking.
 * Can be extended for chunked/resumable uploads by modifying the FormData
 * construction and adding chunk management logic.
 * 
 * Backend field names may need adjustment - see TODO comments below.
 */

export interface UploadProgress {
  loaded: number;
  total: number;
  percent: number;
}

export interface UploadOptions {
  file: File;
  url: string;
  onProgress?: (progress: UploadProgress) => void;
  onComplete?: (response: any) => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

export interface UploadResult {
  xhr: XMLHttpRequest;
  promise: Promise<any>;
  abort: () => void;
}

export function uploadFile(options: UploadOptions): UploadResult {
  const { file, url, onProgress, onComplete, onError, signal, headers = {}} = options;
  
  const xhr = new XMLHttpRequest();
  
  
  const promise = new Promise((resolve, reject) => {
    // Progress tracking
    xhr.upload.onprogress = (event) => {
      console.log("progress")
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress({
          loaded: event.loaded,
          total: event.total,
          percent
        });
      }
    };
    
    // Success handler
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = xhr.responseText ? JSON.parse(xhr.responseText) : {};
          onComplete?.(response);
          resolve(response);
        } catch (error) {
          const parseError = new Error('Invalid JSON response');
          onError?.(parseError);
          reject(parseError);
        }
      } else {
        const statusError = new Error(`Upload failed with status ${xhr.status}`);
        onError?.(statusError);
        reject(statusError);
      }
    };
    
    // Error handler
    xhr.onerror = () => {
      const networkError = new Error('Network error during upload');
      onError?.(networkError);
      reject(networkError);
    };
    
    // Abort handler
    xhr.onabort = () => {
      const abortError = new Error('Upload cancelled');
      onError?.(abortError);
      reject(abortError);
    };
    
    // Handle external abort signal
    if (signal) {
      signal.addEventListener('abort', () => {
        xhr.abort();
      });
    }
  });
  
  // Configure and send request
  xhr.open('PUT', url);
  xhr.setRequestHeader("Content-Type", file.type);
  
  // Set custom headers
  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value);
  });
  
  // TODO: Add any required authentication headers here
  // xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  
  xhr.send(file);
  
  return {
    xhr,
    promise,
    abort: () => xhr.abort()
  };
}

// Fallback to fetch if XHR is not available (rare, but good practice)
export async function uploadFileWithFetch(options: UploadOptions): Promise<any> {
  const { file, url, onComplete, onError, signal, headers = {}, withCredentials = true } = options;
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  formData.append('fileSize', file.size.toString());
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      signal,
      credentials: withCredentials ? 'include' : 'same-origin',
      headers
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }
    
    const result = await response.json();
    onComplete?.(result);
    return result;
  } catch (error) {
    const fetchError = error instanceof Error ? error : new Error('Upload failed');
    onError?.(fetchError);
    throw fetchError;
  }
}