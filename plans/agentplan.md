# Frontend pending work audit

## Critical issues

- Dashboard folder navigation is broken.
  - Where: `DirectoryData`, `FolderGrid`, `FolderCard`.
  - Why it matters: users can see folders on `/dashboard`, but clicking a folder does not open it because no open handler is passed into the folder card grid.
  - What to do next: wire folder card click to navigate to the selected folder route, using the same route shape already used by breadcrumbs and the back button.

- Dashboard uploads can be created under the wrong parent.
  - Where: `SingleFileUploader`, `FileUploadForm`, `DirectoryData`.
  - Why it matters: the uploader derives `pid` by splitting `window.location.pathname` on `=`, so root `/dashboard` uploads do not send the current root directory id even though `DirectoryData` already has `files.id`.
  - What to do next: pass the current parent directory id explicitly from `DirectoryData` into `FileUploadForm` and `SingleFileUploader`; stop reading parent id from the URL.

- Upload flow has duplicate and incomplete wiring.
  - Where: `DirectoryData.handleUpload`, `FileUploadForm`, `SingleFileUploader`.
  - Why it matters: `FileUploadForm` accepts an `onUpload` prop but does not use it, while `DirectoryData.handleUpload` depends on state that is set immediately before calling it and is effectively not the active upload path.
  - What to do next: keep one upload implementation, remove or disconnect the dead path, and refresh dashboard data only after `/file/uploads/complete` succeeds.

## High priority issues

- Unauthorized dashboard redirects are incorrect.
  - Where: `DirectoryData.GetData`.
  - Why it matters: the code parses JSON before checking `409` or `404`, then calls `navigate("login")`, which resolves relative to the current dashboard route instead of `/login`.
  - What to do next: check response status before parsing JSON and navigate to `/login` with an absolute route.

- Dashboard has no loading or error state.
  - Where: `DirectoryData`.
  - Why it matters: fetch failures and pending requests appear as empty folder/file grids, which hides real failures from users and makes backend integration harder to debug.
  - What to do next: add explicit loading, unauthorized, empty, and error UI states for directory and profile fetches.

- File open and download use inconsistent ids.
  - Where: `FileCard`, `DirectoryData.GetFileContent`.
  - Why it matters: the Open button passes `file._id`, while the download URL uses `file.id`; if the backend expects only one of these ids, preview/open will fail for some files.
  - What to do next: confirm the frontend contract and use the same backend-facing id consistently for open, preview, download, rename, and delete.

- Google Drive connection UI does not refresh after OAuth success.
  - Where: `MyDriveBox`.
  - Why it matters: after the popup posts `done`, the popup closes but the card may still show “Connect Google Drive” until a full reload.
  - What to do next: call the drive storage info refresh after the OAuth success message and update the connected state.

- Demo dashboard logout is a no-op.
  - Where: `TopBar` used by `src/pages/cloud-storage-dashboard/Dashboard`.
  - Why it matters: the user menu appears functional, but logout only closes the menu and does not call `/user/logout` or navigate.
  - What to do next: either wire real logout behavior or clearly keep `/demo` as non-production-only UI.

## Medium priority issues

- Rename behavior needs final wiring and validation.
  - Where: `DirectoryData.handleRenameBox`, rename modal.
  - Why it matters: file rename pre-fills `name + extension`, which may produce incorrect extensions depending on whether the backend expects a base name or full filename.
  - What to do next: define the frontend/backend rename contract and validate empty names, duplicate extensions, and failed responses.

- Delete and rename operations do not surface failures.
  - Where: `DirectoryData.handleDelete`, `DirectoryData.handleRename`.
  - Why it matters: the UI refreshes or closes state even when the request fails, so users cannot tell whether the action succeeded.
  - What to do next: check HTTP status, show success/error toasts, and keep the modal open when rename fails.

- Folder hover action icons are visual only.
  - Where: `FolderCard`.
  - Why it matters: hover details show rename/copy/cut icons, but those buttons do not call handlers.
  - What to do next: wire these actions to real handlers or remove the inactive controls.

- File hover/details behavior has failing coverage.
  - Where: `HoverDetails` and `HoverDetails` tests.
  - Why it matters: hover actions are part of file management UI, but tests time out around tooltip timing and state updates.
  - What to do next: stabilize tooltip behavior and update tests so hover, focus, Escape, and action clicks are covered reliably.

- Search, notification, sidebar, and “View All” controls are not implemented in the demo dashboard.
  - Where: `TopBar`, `Sidebar`, `RecentFilesTable`, `src/pages/cloud-storage-dashboard/Dashboard`.
  - Why it matters: the UI exposes controls that look interactive but do not fetch or navigate to real data views.
  - What to do next: either implement these flows or hide/disable controls until the backing screens and APIs exist.

## Low priority issues

- Several visible labels contain mojibake or encoding artifacts.
  - Where: `FileGrid`, `FolderGrid`, `UploadCard`, `DriveFiles`, `FolderCard`, `FileRow`.
  - Why it matters: users see corrupted symbols in headings and status text.
  - What to do next: replace corrupted text with valid labels or icons.

- Profile picture upload is only static UI.
  - Where: `Profile`.
  - Why it matters: the profile page shows “Upload New Picture”, but there is no file input, upload request, preview, or persistence.
  - What to do next: either implement avatar upload or remove the inactive control.

- Drive download cancel button does not cancel.
  - Where: `DriveFiles.DownloadPopUp`.
  - Why it matters: the “Stop Download” button sets downloading to `true`, so it cannot close or stop the active download UI.
  - What to do next: set the popup state to closed and close/cancel the `EventSource` where possible.

- Drive search is limited and case-sensitive.
  - Where: `DriveFiles`.
  - Why it matters: users may not find files unless casing exactly matches, and search only applies to the currently loaded type filter.
  - What to do next: normalize both query and file names and decide whether search should run across all files or only the active filter.

- Email verification route is misspelled.
  - Where: `main.tsx`, `UserMenu`.
  - Why it matters: `/varifyEmali` is user-visible and error-prone to link manually.
  - What to do next: add a correctly spelled route alias before removing the old route, if backend or emails already depend on it.

## Pending frontend features

- Decide which dashboard is the production dashboard.
  - Where: `main.tsx`, `DirectoryData`, `src/pages/cloud-storage-dashboard/Dashboard`.
  - Why it matters: `/dashboard` uses the legacy/live `DirectoryData` dashboard, while `/demo` uses a newer mock-data dashboard.
  - What to do next: either migrate `/dashboard` to the newer dashboard with real data or continue improving `DirectoryData` as the production route.

- Wire real APIs into the newer dashboard if it is intended for production.
  - Where: `src/pages/cloud-storage-dashboard/Dashboard`, `src/services/cloud-storage-dashboard/api.ts`.
  - Why it matters: `apiService` exists but the page currently uses hardcoded demo data.
  - What to do next: replace local demo state with service calls for storage, folders, files, user, and stats.

- Implement production search.
  - Where: live dashboard and demo dashboard top bar.
  - Why it matters: search is a primary file-management workflow but is not wired on `/dashboard`.
  - What to do next: define whether search is local or API-backed and display combined file/folder results.

- Implement notifications.
  - Where: `TopBar` bell icon.
  - Why it matters: the bell looks actionable but has no popover, count, fetch, or empty state.
  - What to do next: define notification response shape and add a popover with loading, empty, and error states.

- Implement sidebar destination pages or remove inactive links.
  - Where: `Sidebar`.
  - Why it matters: links such as My Files, Shared with me, Recent, Favorites, Trash, Help, and Settings point to dashboard subroutes that are not backed by route components.
  - What to do next: add route components for those views or hide links until implemented.

- Add real file row actions in the newer dashboard.
  - Where: `FileRow`, `RecentFilesTable`.
  - Why it matters: rows show an action menu icon and hover action icons, but no open/download/rename/delete/share behavior is wired.
  - What to do next: add action callbacks and connect them to backend endpoints or route-level handlers.

## Dashboard-specific problems

- `/dashboard` is not using the newer dashboard page.
  - Where: `main.tsx`.
  - Why it matters: the highest-priority page is routed to `DirectoryData`; fixes made only under `src/pages/cloud-storage-dashboard` will not affect `/dashboard`.
  - What to do next: treat `DirectoryData` and `src/components/dashboard` as the current production dashboard unless the route is intentionally changed.

- Breadcrumb and back navigation use a custom `demo=<id>` route segment.
  - Where: `DirectoryData`.
  - Why it matters: this route encoding is fragile and is also used by upload parent id parsing.
  - What to do next: keep it for compatibility if needed, but pass ids through React props/state for component logic instead of parsing the URL string.

- Folder grid empty state can appear even when folders are still loading.
  - Where: `FolderGrid` used by `DirectoryData`.
  - Why it matters: initial load and failed load look the same as a genuinely empty drive.
  - What to do next: make `DirectoryData` own loading/error state and only render empty states after a successful fetch.

- File grid empty state can appear even when files are still loading.
  - Where: `FileGrid` used by `DirectoryData`.
  - Why it matters: users may think files are missing when the request is pending or failed.
  - What to do next: render skeleton/loading or error state before showing “No files yet”.

- Storage cards depend on profile and drive calls without robust fallback.
  - Where: `StorageInfoCard`, `MyDriveBox`, `DirectoryData.GetUserInfo`.
  - Why it matters: missing or failed storage data shows zeros or stale connection state without telling the user what failed.
  - What to do next: handle non-200 responses, show unavailable state, and allow retry.

- The newer `/demo` dashboard is incomplete and mock-driven.
  - Where: `src/pages/cloud-storage-dashboard/Dashboard`.
  - Why it matters: it has better layout but does not use real directory APIs, real auth state, real stats, real folder opening, or real file actions.
  - What to do next: do not assume `/demo` behavior covers `/dashboard`; migrate intentionally if desired.

## Thumbnail-related work

- There is no dedicated thumbnail upload, display, preview, or processing implementation.
  - Where: entire frontend.
  - Why it matters: thumbnail photo handling is planned next, but the current client has no explicit thumbnail data model or UI flow.
  - What to do next: define frontend expectations for thumbnail fields before backend work starts.

- File types do not include thumbnail metadata.
  - Where: `types/index.ts`, `DirectoryData` file interfaces, `docs/cloud-storage-dashboard-api.md`.
  - Why it matters: the client has nowhere to read or store thumbnail URLs, preview URLs, dimensions, processing status, or fallback state.
  - What to do next: add agreed fields such as `thumbnailUrl`, `previewUrl`, `mimeType`, `width`, `height`, or `thumbnailStatus` to the relevant frontend contracts.

- Dashboard file cards do not render image thumbnails.
  - Where: `FileCard`, `FileRow`, `DriveFiles`.
  - Why it matters: image files are shown with generic icons or file type badges, so users cannot visually identify photos.
  - What to do next: render thumbnails for image files when a thumbnail or preview URL exists, and keep the current icon fallback for non-images and failed image loads.

- Upload UI does not preview selected image files.
  - Where: `SingleFileUploader`, `UploadCard`.
  - Why it matters: users uploading photos cannot confirm they selected the correct image before upload.
  - What to do next: generate a local object URL for `image/*` selections, show a small preview, and revoke the object URL on removal or unmount.

- Thumbnail processing state is not represented.
  - Where: dashboard file list/cards and upload completion flow.
  - Why it matters: if thumbnail generation happens after upload, the UI needs to distinguish uploaded, thumbnail processing, thumbnail ready, and thumbnail failed states.
  - What to do next: add UI fallback behavior and refresh/poll strategy once the backend exposes thumbnail status.

- Google Drive image handling is icon-only.
  - Where: `DriveFiles`.
  - Why it matters: Google Drive photo lists use generic image icons and do not show actual image thumbnails.
  - What to do next: if Drive thumbnails are in scope, add a thumbnail URL field from the Drive API response and render it with a safe fallback icon.

