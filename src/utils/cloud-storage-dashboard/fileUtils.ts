/**
 * Cloud Storage Dashboard - File Utility Functions
 * 
 * This module provides utility functions for file operations including:
 * - File size formatting with unit conversion
 * - File type to icon mapping
 * - Relative time formatting
 * - User initials generation
 * 
 * Requirements: 6.3, 6.2, 6.5, 12.2
 */

import { FileType } from '../../types';

/**
 * Formats a byte value into a human-readable string with appropriate units.
 * 
 * Converts bytes to the largest unit where the value is less than 1024.
 * Returns a string with 2 decimal places and the unit (B, KB, MB, GB, TB).
 * 
 * @param bytes - The number of bytes to format (non-negative)
 * @returns Formatted string (e.g., "1.50 MB", "256.00 B")
 * 
 * @example
 * formatFileSize(1024) // "1.00 KB"
 * formatFileSize(1536) // "1.50 KB"
 * formatFileSize(1048576) // "1.00 MB"
 * formatFileSize(0) // "0.00 B"
 * 
 * Validates: Requirements 6.3, 7.6
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  // Convert to larger units while size >= 1024 and we haven't reached the largest unit
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // Format to 2 decimal places
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Maps a file type to an appropriate icon identifier from lucide-react.
 * 
 * Returns icon names that can be used with the lucide-react icon library.
 * Different file types are grouped by their semantic meaning:
 * - Documents: FileText
 * - Spreadsheets: Sheet
 * - Presentations: Presentation
 * - Images: Image
 * - Videos: Video
 * - Audio: Music
 * - Archives: Archive
 * - Default: File
 * 
 * @param type - The file type/extension
 * @returns Icon identifier string for lucide-react
 * 
 * @example
 * getFileIcon('pdf') // "FileText"
 * getFileIcon('xlsx') // "Sheet"
 * getFileIcon('mp4') // "Video"
 * getFileIcon('other') // "File"
 * 
 * Validates: Requirements 6.2
 */
export function getFileIcon(type: FileType): string {
  const iconMap: Record<FileType, string> = {
    pdf: 'FileText',
    doc: 'FileText',
    docx: 'FileText',
    xls: 'Sheet',
    xlsx: 'Sheet',
    ppt: 'Presentation',
    pptx: 'Presentation',
    jpg: 'Image',
    png: 'Image',
    mp4: 'Video',
    mp3: 'Music',
    zip: 'Archive',
    txt: 'FileText',
    other: 'File'
  };

  return iconMap[type] || 'File';
}

/**
 * Formats an ISO 8601 date string into a relative time description.
 * 
 * Returns human-readable relative time strings:
 * - "Just now" for dates within the last minute
 * - "X minute(s) ago" for dates within the last hour
 * - "X hour(s) ago" for dates within the last day
 * - "X day(s) ago" for dates within the last 30 days
 * - Formatted date string (locale-specific) for dates older than 30 days
 * 
 * @param isoDate - ISO 8601 formatted date string
 * @returns Relative time description
 * 
 * @example
 * formatRelativeTime('2024-01-15T10:30:00Z') // "2 days ago" (if today is Jan 17)
 * formatRelativeTime('2024-01-17T14:58:00Z') // "2 minutes ago" (if now is 15:00)
 * formatRelativeTime('2023-12-01T10:00:00Z') // "12/1/2023" (if more than 30 days)
 * 
 * Validates: Requirements 6.5
 */
export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 30) {
    return date.toLocaleDateString();
  } else if (diffDay > 0) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else if (diffHour > 0) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffMin > 0) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

/**
 * Generates initials from a person's name for avatar display.
 * 
 * Extracts the first letter of each word in the name and returns
 * up to 2 uppercase initials. Handles various name formats:
 * - Single name: returns first letter
 * - Two names: returns first letter of each
 * - Multiple names: returns first letter of first two words
 * 
 * @param name - Full name of the person
 * @returns Uppercase initials (1-2 characters)
 * 
 * @example
 * getInitials('John Doe') // "JD"
 * getInitials('Alice') // "A"
 * getInitials('Mary Jane Watson') // "MJ"
 * getInitials('') // ""
 * 
 * Validates: Requirements 12.2
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(part => part.length > 0) // Filter out empty strings from multiple spaces
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
