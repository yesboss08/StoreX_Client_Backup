/**
 * Cloud Storage Dashboard - Type Definitions
 * 
 * This file contains all TypeScript interfaces and types for the cloud storage dashboard.
 * These types are used throughout the application for type safety and IntelliSense support.
 */

// ============================================================================
// Storage Provider Types
// ============================================================================

/**
 * Represents a cloud storage provider (Google Drive, OneDrive, Dropbox)
 */
export interface StorageProvider {
  /** Unique identifier for the provider */
  id: 'google' | 'onedrive' | 'dropbox';
  /** Display name of the provider */
  name: string;
  /** Path or URL to the provider's icon */
  icon: string;
  /** Amount of storage used in GB */
  used: number;
  /** Total storage capacity in GB */
  total: number;
  /** Theme color for progress bars and UI elements */
  color: string;
}

/**
 * Aggregated storage totals across all providers
 */
export interface StorageTotals {
  /** Total storage used across all providers in GB */
  used: number;
  /** Total storage capacity across all providers in GB */
  total: number;
  /** Percentage of total storage used (0-100) */
  percentage: number;
}

// ============================================================================
// File System Types
// ============================================================================

/**
 * Represents a folder in the cloud storage
 */
export interface Folder {
  /** Unique identifier for the folder */
  id: string;
  /** Display name of the folder */
  name: string;
  /** Number of files contained in the folder */
  fileCount: number;
  /** Array of members who have access to the folder */
  members: Member[];
  /** ISO 8601 timestamp when the folder was created */
  createdAt: string;
  /** ISO 8601 timestamp when the folder was last updated */
  updatedAt: string;
}

/**
 * Represents a file in the cloud storage
 */
export interface File {
  /** Unique identifier for the file */
  id: string;
  /** Display name of the file including extension */
  name: string;
  /** File type/extension */
  type: FileType;
  /** File size in bytes */
  sizeBytes: number;
  /** Array of members who have access to the file */
  members: Member[];
  /** ISO 8601 timestamp when the file was last modified */
  lastModified: string;
  /** Optional URL to access or download the file */
  url?: string;
}

/**
 * Supported file types for icon mapping and display
 */
export type FileType = 
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'xls'
  | 'xlsx'
  | 'ppt'
  | 'pptx'
  | 'jpg'
  | 'png'
  | 'mp4'
  | 'mp3'
  | 'zip'
  | 'txt'
  | 'other';

/**
 * Represents a user or member with access to files/folders
 */
export interface Member {
  /** Unique identifier for the member */
  id: string;
  /** Full name of the member */
  name: string;
  /** Optional URL to the member's avatar image */
  avatar?: string;
  /** Initials derived from the member's name (e.g., "JD" for John Doe) */
  initials: string;
}

// ============================================================================
// User Types
// ============================================================================

/**
 * Represents the current authenticated user
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** Full name of the user */
  name: string;
  /** Email address of the user */
  email: string;
  /** Optional URL to the user's avatar image */
  avatar?: string;
  /** Amount of storage quota used in GB */
  quotaUsed: number;
  /** Total storage quota available in GB */
  quotaTotal: number;
}

// ============================================================================
// Category Types
// ============================================================================

/**
 * Represents a storage category for breakdown statistics
 */
export interface StorageCategory {
  /** Unique identifier for the category */
  id: string;
  /** Display name of the category (e.g., "Images", "Documents") */
  name: string;
  /** Icon identifier or path for the category */
  icon: string;
  /** Total size of files in this category in bytes */
  sizeBytes: number;
  /** Theme color for the category */
  color: string;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Response structure for the /storage endpoint
 */
export interface StorageResponse {
  storage: {
    /** Google Drive storage information */
    google: {
      /** Storage used in GB */
      used: number;
      /** Total storage capacity in GB */
      total: number;
    };
    /** OneDrive storage information */
    onedrive: {
      /** Storage used in GB */
      used: number;
      /** Total storage capacity in GB */
      total: number;
    };
    /** Dropbox storage information */
    dropbox: {
      /** Storage used in GB */
      used: number;
      /** Total storage capacity in GB */
      total: number;
    };
    /** Aggregated totals across all providers */
    totals: {
      /** Total storage used in GB */
      used: number;
      /** Total storage capacity in GB */
      total: number;
    };
  };
}

/**
 * Response structure for the /folders endpoint
 */
export interface FoldersResponse {
  /** Array of folders */
  folders: Folder[];
}

/**
 * Response structure for the /files endpoint
 */
export interface FilesResponse {
  /** Array of files */
  files: File[];
  /** Total number of files available (may be more than returned) */
  total: number;
  /** Indicates if there are more files available for pagination */
  hasMore: boolean;
}

/**
 * Response structure for the /user endpoint
 */
export interface UserResponse {
  /** User information */
  user: User;
  /** Storage statistics by category */
  stats: {
    /** Storage used by images (formatted string, e.g., "2.5 GB") */
    images: string;
    /** Storage used by documents (formatted string) */
    documents: string;
    /** Storage used by videos (formatted string) */
    videos: string;
    /** Storage used by audio files (formatted string) */
    audios: string;
    /** Storage used by archives (formatted string) */
    archive: string;
    /** Storage used by other file types (formatted string) */
    others: string;
  };
}

// ============================================================================
// Component Prop Types
// ============================================================================

/**
 * Props for the Sidebar component
 */
export interface SidebarProps {
  /** Whether the sidebar is collapsed (mobile view) */
  isCollapsed: boolean;
  /** Callback to toggle sidebar visibility */
  onToggle: () => void;
  /** Current active route path */
  currentRoute: string;
}

/**
 * Navigation link configuration
 */
export interface NavLink {
  /** Unique identifier for the link */
  id: string;
  /** Display label for the link */
  label: string;
  /** Icon identifier (from lucide-react) */
  icon: string;
  /** Route path for navigation */
  route: string;
  /** Optional badge count to display */
  badge?: number;
}

/**
 * Props for the StorageCard component
 */
export interface StorageCardProps {
  /** Storage provider information to display */
  provider: StorageProvider;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Props for the FolderCard component
 */
export interface FolderCardProps {
  /** Folder information to display */
  folder: Folder;
  /** Optional click handler with folder ID */
  onClick?: (folderId: string) => void;
}

/**
 * Props for the FileRow component
 */
export interface FileRowProps {
  /** File information to display */
  file: File;
  /** Optional action handler */
  onAction?: (action: FileAction, fileId: string) => void;
}

/**
 * Available actions for files
 */
export type FileAction = 'download' | 'share' | 'rename' | 'delete' | 'info';

/**
 * Props for the StatsPanel component
 */
export interface StatsPanelProps {
  /** Aggregated storage totals */
  totals: StorageTotals;
  /** Array of storage categories for breakdown */
  categories: StorageCategory[];
  /** Optional upgrade button click handler */
  onUpgrade?: () => void;
}

/**
 * Props for the ThemeToggle component
 */
export interface ThemeToggleProps {
  /** Current theme mode */
  theme: 'light' | 'dark';
  /** Callback to toggle theme */
  onToggle: () => void;
}

/**
 * Props for the CategoryItem component
 */
export interface CategoryItemProps {
  /** Storage category information to display */
  category: StorageCategory;
}

/**
 * Props for the UserAvatar component
 */
export interface UserAvatarProps {
  /** User information to display */
  user: User;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Props for the SearchInput component
 */
export interface SearchInputProps {
  /** Current search value */
  value: string;
  /** Callback when search value changes */
  onChange: (value: string) => void;
  /** Optional placeholder text */
  placeholder?: string;
}

/**
 * Props for the CreateNewButton component
 */
export interface CreateNewButtonProps {
  /** Callback when a creation option is selected */
  onSelect?: (option: CreateOption) => void;
}

/**
 * Available creation options
 */
export type CreateOption = 'folder' | 'text' | 'sheet' | 'presentation' | 'more';

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Theme mode type
 */
export type Theme = 'light' | 'dark';

/**
 * API response wrapper with demo mode flag
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T;
  /** Indicates if the response came from mock data (demo mode) */
  isDemoMode?: boolean;
}

/**
 * Generic loading state wrapper
 */
export interface LoadingState<T> {
  /** The data being loaded */
  data: T | null;
  /** Whether data is currently being fetched */
  loading: boolean;
  /** Error object if loading failed */
  error: Error | null;
}

/**
 * Validation result for user input
 */
export interface ValidationResult {
  /** Whether the input is valid */
  valid: boolean;
  /** Sanitized input value (if valid) */
  sanitized?: string;
  /** Error message (if invalid) */
  error?: string;
}
