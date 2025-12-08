# UI Components - File Upload & Hover Details

This directory contains production-ready UI components for file uploading with XHR progress tracking and enhanced hover tooltips.

## Components

### SingleFileUploader
A complete file upload solution with real-time progress tracking using XMLHttpRequest.

**Features:**
- XHR-based upload with precise progress tracking
- Drag & drop support
- Cancel/retry functionality  
- File validation (size, type)
- Graceful fallback to fetch API
- Replace confirmation for active uploads
- Throttled UI updates (100ms) to prevent render thrashing

**Usage:**
```tsx
<SingleFileUploader
  uploadUrl="/api/upload"
  onComplete={(response) => console.log('Done:', response)}
  onError={(error) => console.error('Failed:', error)}
  maxSize={100 * 1024 * 1024} // 100MB
  accept="image/*"
/>
```

### HoverDetails
A compact, accessible tooltip that replaces basic hover popups with rich file/folder metadata.

**Features:**
- 150ms hover intent delay
- Keyboard accessible (focus/blur, Esc to close)
- Viewport-aware positioning
- Mobile modal fallback (long-press)
- Action buttons (download, rename, copy path)
- Non-flickering hover behavior

**Usage:**
```tsx
<HoverDetails
  name="document.pdf"
  path="/projects/docs"
  size={1024000}
  lastModified={new Date()}
  type="file"
  isVisible={true}
  onDownload={() => downloadFile()}
  onRename={() => openRenameDialog()}
  onCopyPath={() => copyToClipboard()}
>
  <FileCard {...props} />
</HoverDetails>
```

### UploadCard
Visual component for displaying single file upload progress and status.

### ProgressBar
Reusable progress bar with ARIA attributes and theme support.

## Backend Integration

The uploader expects these API patterns:

```typescript
// Upload initiation
POST /api/upload
Content-Type: multipart/form-data

FormData fields:
- file: File blob
- fileName: string  
- fileSize: string (bytes)

Response: { message: string, id?: string }
```

## Extending for Chunked/Resumable Uploads

To add chunked upload support:

1. **Modify `xhrUpload.ts`:**
   - Split files into chunks (e.g., 5MB each)
   - Track chunk upload state
   - Add resume logic for failed chunks

2. **Update backend integration:**
   - Add chunk metadata to FormData
   - Handle chunk assembly on server
   - Support range requests for resume

3. **Enhance UI:**
   - Add pause/resume controls
   - Show chunk-level progress
   - Handle partial upload recovery

## Testing

Run tests with:
```bash
npm run test
```

Key test scenarios:
- XHR progress event simulation
- File validation edge cases
- Hover tooltip timing and positioning
- Keyboard accessibility
- Mobile modal behavior

## Accessibility

All components follow WCAG guidelines:
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance (both themes)

## Performance Notes

- Progress updates are throttled to 100ms intervals
- Hover tooltips use requestAnimationFrame for smooth positioning
- Components are optimized for minimal re-renders
- XHR provides better progress tracking than fetch API