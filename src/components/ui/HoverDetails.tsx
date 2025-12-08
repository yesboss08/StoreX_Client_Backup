import React, { useState, useRef, useEffect } from 'react';
import { 
  DocumentIcon, 
  FolderIcon, 
  ArrowDownTrayIcon, 
  PencilIcon, 
  ClipboardDocumentIcon 
} from '@heroicons/react/24/outline';

export interface HoverDetailsProps {
  name: string;
  path?: string;
  size?: number;
  lastModified?: Date | string;
  type: 'file' | 'folder';
  isVisible: boolean;
  onDownload?: () => void;
  onRename?: () => void;
  onCopyPath?: () => void;
  children: React.ReactNode;
  className?: string;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const HoverDetails: React.FC<HoverDetailsProps> = ({
  name,
  path,
  size,
  lastModified,
  type,
  isVisible,
  onDownload,
  onRename,
  onCopyPath,
  children,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isModalMode, setIsModalMode] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if we should use modal mode (small screens)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsModalMode(window.innerWidth < 640); // sm breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const calculatePosition = () => {
    if (!containerRef.current || !tooltipRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let top = containerRect.top;
    let left = containerRect.right + 8; // 8px gap
    
    // Flip horizontally if tooltip would overflow right
    if (left + tooltipRect.width > viewportWidth - 16) {
      left = containerRect.left - tooltipRect.width - 8;
    }
    
    // Flip vertically if tooltip would overflow bottom
    if (top + tooltipRect.height > viewportHeight - 16) {
      top = viewportHeight - tooltipRect.height - 16;
    }
    
    // Ensure tooltip doesn't go above viewport
    if (top < 16) {
      top = 16;
    }
    
    setTooltipPosition({ top, left });
  };
  
  const showTooltipWithDelay = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      if (isVisible) {
        setShowTooltip(true);
        // Calculate position after tooltip is rendered
        setTimeout(calculatePosition, 0);
      }
    }, 150);
  };
  
  const hideTooltipWithDelay = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    hideTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 100);
  };
  
  const handleMouseEnter = () => {
    showTooltipWithDelay();
  };
  
  const handleMouseLeave = () => {
    hideTooltipWithDelay();
  };
  
  const handleTooltipMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };
  
  const handleTooltipMouseLeave = () => {
    hideTooltipWithDelay();
  };
  
  const handleFocus = () => {
    if (isVisible) {
      setShowTooltip(true);
      setTimeout(calculatePosition, 0);
    }
  };
  
  const handleBlur = () => {
    setShowTooltip(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowTooltip(false);
    }
  };
  
  // Long press for mobile
  const handleTouchStart = () => {
    if (isModalMode) {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, 500); // 500ms long press
    }
  };
  
  const handleTouchEnd = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };
  
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);
  
  const tooltipContent = (
    <div className="flex items-start space-x-3 p-3">
      {/* Icon */}
      <div className="flex-shrink-0 mt-1">
        {type === 'folder' ? (
          <FolderIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        ) : (
          <DocumentIcon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
        )}
      </div>
      
      {/* Metadata */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate mb-1">
          {name}
        </h4>
        
        {path && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-1">
            {path}
          </p>
        )}
        
        <div className="space-y-1">
          {size !== undefined && (
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Size: {formatBytes(size)}
            </p>
          )}
          
          {lastModified && (
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Modified: {formatDate(lastModified)}
            </p>
          )}
        </div>
        
        {/* Action Icons */}
        <div className="flex items-center space-x-2 mt-2">
          {onDownload && (
            <button
              onClick={onDownload}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Download"
              title="Download"
            >
              <ArrowDownTrayIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          )}
          
          {onRename && (
            <button
              onClick={onRename}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Rename"
              title="Rename"
            >
              <PencilIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          )}
          
          {onCopyPath && (
            <button
              onClick={onCopyPath}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Copy path"
              title="Copy path"
            >
              <ClipboardDocumentIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className={className}>
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        className="focus:outline-none"
      >
        {children}
      </div>
      
      {/* Tooltip */}
      {showTooltip && (
        <>
          {isModalMode ? (
            // Modal for small screens
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-w-sm w-full">
                {tooltipContent}
                <div className="px-3 pb-3">
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Tooltip for larger screens
            <div
              ref={tooltipRef}
              className="fixed z-50 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
              style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left,
              }}
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
              role="tooltip"
              aria-describedby="hover-details"
            >
              {tooltipContent}
            </div>
          )}
        </>
      )}
    </div>
  );
};