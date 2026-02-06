/**
 * Unit Tests for File Utility Functions
 * 
 * Tests specific examples and edge cases for:
 * - formatFileSize: byte conversion and formatting
 * - getFileIcon: file type to icon mapping
 * - formatRelativeTime: relative time formatting
 * - getInitials: name to initials conversion
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { formatFileSize, getFileIcon, formatRelativeTime, getInitials } from './fileUtils';
import type { FileType } from '../../types';

describe('formatFileSize', () => {
  it('should format bytes correctly', () => {
    expect(formatFileSize(0)).toBe('0.00 B');
    expect(formatFileSize(100)).toBe('100.00 B');
    expect(formatFileSize(1023)).toBe('1023.00 B');
  });

  it('should format kilobytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1.00 KB');
    expect(formatFileSize(1536)).toBe('1.50 KB');
    expect(formatFileSize(2048)).toBe('2.00 KB');
  });

  it('should format megabytes correctly', () => {
    expect(formatFileSize(1048576)).toBe('1.00 MB');
    expect(formatFileSize(1572864)).toBe('1.50 MB');
    expect(formatFileSize(5242880)).toBe('5.00 MB');
  });

  it('should format gigabytes correctly', () => {
    expect(formatFileSize(1073741824)).toBe('1.00 GB');
    expect(formatFileSize(2147483648)).toBe('2.00 GB');
    expect(formatFileSize(5368709120)).toBe('5.00 GB');
  });

  it('should format terabytes correctly', () => {
    expect(formatFileSize(1099511627776)).toBe('1.00 TB');
    expect(formatFileSize(2199023255552)).toBe('2.00 TB');
  });

  it('should handle very large values', () => {
    const result = formatFileSize(10995116277760); // 10 TB
    expect(result).toBe('10.00 TB');
  });

  it('should always format to 2 decimal places', () => {
    expect(formatFileSize(1500)).toMatch(/^\d+\.\d{2} KB$/);
    expect(formatFileSize(1500000)).toMatch(/^\d+\.\d{2} MB$/);
  });
});

describe('getFileIcon', () => {
  it('should map document types to FileText icon', () => {
    expect(getFileIcon('pdf')).toBe('FileText');
    expect(getFileIcon('doc')).toBe('FileText');
    expect(getFileIcon('docx')).toBe('FileText');
    expect(getFileIcon('txt')).toBe('FileText');
  });

  it('should map spreadsheet types to Sheet icon', () => {
    expect(getFileIcon('xls')).toBe('Sheet');
    expect(getFileIcon('xlsx')).toBe('Sheet');
  });

  it('should map presentation types to Presentation icon', () => {
    expect(getFileIcon('ppt')).toBe('Presentation');
    expect(getFileIcon('pptx')).toBe('Presentation');
  });

  it('should map image types to Image icon', () => {
    expect(getFileIcon('jpg')).toBe('Image');
    expect(getFileIcon('png')).toBe('Image');
  });

  it('should map video types to Video icon', () => {
    expect(getFileIcon('mp4')).toBe('Video');
  });

  it('should map audio types to Music icon', () => {
    expect(getFileIcon('mp3')).toBe('Music');
  });

  it('should map archive types to Archive icon', () => {
    expect(getFileIcon('zip')).toBe('Archive');
  });

  it('should map other types to File icon', () => {
    expect(getFileIcon('other')).toBe('File');
  });

  it('should return different icons for semantically different file types', () => {
    const pdfIcon = getFileIcon('pdf');
    const videoIcon = getFileIcon('mp4');
    const imageIcon = getFileIcon('jpg');
    
    expect(pdfIcon).not.toBe(videoIcon);
    expect(pdfIcon).not.toBe(imageIcon);
    expect(videoIcon).not.toBe(imageIcon);
  });
});

describe('formatRelativeTime', () => {
  beforeEach(() => {
    // Mock the current time to 2024-01-17T15:00:00Z for consistent testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-17T15:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "Just now" for dates within the last minute', () => {
    expect(formatRelativeTime('2024-01-17T14:59:30Z')).toBe('Just now');
    expect(formatRelativeTime('2024-01-17T14:59:59Z')).toBe('Just now');
  });

  it('should return minutes ago for dates within the last hour', () => {
    expect(formatRelativeTime('2024-01-17T14:59:00Z')).toBe('1 minute ago');
    expect(formatRelativeTime('2024-01-17T14:58:00Z')).toBe('2 minutes ago');
    expect(formatRelativeTime('2024-01-17T14:30:00Z')).toBe('30 minutes ago');
  });

  it('should return hours ago for dates within the last day', () => {
    expect(formatRelativeTime('2024-01-17T14:00:00Z')).toBe('1 hour ago');
    expect(formatRelativeTime('2024-01-17T13:00:00Z')).toBe('2 hours ago');
    expect(formatRelativeTime('2024-01-17T10:00:00Z')).toBe('5 hours ago');
  });

  it('should return days ago for dates within the last 30 days', () => {
    expect(formatRelativeTime('2024-01-16T15:00:00Z')).toBe('1 day ago');
    expect(formatRelativeTime('2024-01-15T15:00:00Z')).toBe('2 days ago');
    expect(formatRelativeTime('2024-01-10T15:00:00Z')).toBe('7 days ago');
    expect(formatRelativeTime('2023-12-18T15:00:00Z')).toBe('30 days ago');
  });

  it('should return formatted date for dates older than 30 days', () => {
    const result = formatRelativeTime('2023-12-01T10:00:00Z');
    // The exact format depends on locale, but it should be a date string
    expect(result).toMatch(/\d+/); // Should contain numbers
    expect(result).not.toContain('ago');
    expect(result).not.toBe('Just now');
  });

  it('should use singular form for 1 unit', () => {
    expect(formatRelativeTime('2024-01-17T14:59:00Z')).toBe('1 minute ago');
    expect(formatRelativeTime('2024-01-17T14:00:00Z')).toBe('1 hour ago');
    expect(formatRelativeTime('2024-01-16T15:00:00Z')).toBe('1 day ago');
  });

  it('should use plural form for multiple units', () => {
    expect(formatRelativeTime('2024-01-17T14:58:00Z')).toBe('2 minutes ago');
    expect(formatRelativeTime('2024-01-17T13:00:00Z')).toBe('2 hours ago');
    expect(formatRelativeTime('2024-01-15T15:00:00Z')).toBe('2 days ago');
  });
});

describe('getInitials', () => {
  it('should extract initials from two-word names', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('Alice Smith')).toBe('AS');
    expect(getInitials('Bob Johnson')).toBe('BJ');
  });

  it('should extract initial from single-word names', () => {
    expect(getInitials('Alice')).toBe('A');
    expect(getInitials('Bob')).toBe('B');
  });

  it('should extract first two initials from multi-word names', () => {
    expect(getInitials('Mary Jane Watson')).toBe('MJ');
    expect(getInitials('John Paul George Ringo')).toBe('JP');
  });

  it('should return uppercase initials', () => {
    expect(getInitials('john doe')).toBe('JD');
    expect(getInitials('alice smith')).toBe('AS');
  });

  it('should handle empty strings', () => {
    expect(getInitials('')).toBe('');
  });

  it('should handle names with extra spaces', () => {
    expect(getInitials('John  Doe')).toBe('JD');
    expect(getInitials('  Alice Smith  ')).toBe('AS');
  });

  it('should handle names with leading/trailing spaces', () => {
    expect(getInitials(' John Doe ')).toBe('JD');
  });

  it('should return maximum 2 characters', () => {
    const result = getInitials('A B C D E F');
    expect(result).toHaveLength(2);
    expect(result).toBe('AB');
  });
});
