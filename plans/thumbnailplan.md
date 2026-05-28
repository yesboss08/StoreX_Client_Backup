# Thumbnail photo delivery plan

## Goal

Implement dashboard thumbnails by rendering CloudFront-hosted thumbnail URLs in the frontend while the backend authorizes access by setting CloudFront signed cookies. The frontend should not download image bytes through the API. It should fetch or receive thumbnail URLs from the API, then let the browser request those URLs directly from CloudFront with cookies.

## Current frontend state

- The live dashboard route is `/dashboard/*` and is rendered by `DirectoryData`.
- File cards are rendered through `FileGrid` and `FileCard`.
- Current file preview/open flow is `DirectoryData.GetFileContent(fileID)`, which calls `GET /file/:id` with `credentials: "include"` and opens the returned `url`.
- Directory data currently includes file metadata such as `_id`, `id`, `name`, `extension`, `parent`, `isPaid`, `createdAt`, and `size`.
- There is no thumbnail-specific field, image preview, thumbnail loading state, or thumbnail fallback behavior yet.

## Required backend/frontend contract

- Directory/file listing responses should include thumbnail metadata for image files.
  - Add `thumbnailUrl` for the CloudFront thumbnail URL.
  - Add `mimeType` or a reliable image indicator so the client can distinguish image files from documents.
  - Optional but useful: add `thumbnailStatus` with values like `ready`, `processing`, `failed`, or `missing`.

- Backend must expose an auth/cookie refresh endpoint for thumbnails.
  - Recommended endpoint: `GET /file/thumbnails/cookies` or `POST /file/thumbnails/session`.
  - Frontend calls this endpoint with `credentials: "include"` before rendering protected thumbnails or when a thumbnail request fails with auth symptoms.
  - Backend response can be small JSON such as `{ "ok": true, "expiresAt": "ISO_DATE" }`.
  - The important part is the `Set-Cookie` headers on the response.

- Backend must set CloudFront signed cookies that the browser will send to thumbnail URLs.
  - Cookie names are typically `CloudFront-Policy`, `CloudFront-Signature`, and `CloudFront-Key-Pair-Id`.
  - Cookies must be `Secure`.
  - If the app/API and CDN are cross-site, cookies must use `SameSite=None`.
  - The cookie `Domain` must match the thumbnail URL host rules. The browser will not send API-domain cookies to `*.cloudfront.net`.

## CloudFront cookie domain decision

- Preferred setup: use a custom CDN domain under the same parent domain as the API/app, such as `cdn.storex.example` for CloudFront and `api.storex.example` for the backend.
  - Backend can set signed cookies with `Domain=.storex.example`.
  - Browser will send those cookies to `cdn.storex.example`.
  - Thumbnail `<img src="https://cdn.storex.example/...">` works without adding request headers.

- If thumbnails use the raw CloudFront domain, such as `https://xxxxx.cloudfront.net/...`, the API server cannot set cookies for that domain unless the cookie-setting response is served from that CloudFront domain.
  - In that case, use a custom CDN domain or route the cookie-setting endpoint through the same CDN domain.
  - Do not plan to attach cookies manually to `<img>` requests. Browsers do not allow custom cookie headers on image tags.

## Frontend implementation plan

- Extend dashboard file types.
  - Update the local file metadata type in `DirectoryData`.
  - Update `FileCard` `FileData`.
  - Add optional `thumbnailUrl`, `mimeType`, and `thumbnailStatus`.

- Add a thumbnail cookie bootstrap step on dashboard load.
  - In `DirectoryData`, call the thumbnail cookie endpoint after user/profile auth is known or before rendering thumbnail images.
  - Use `fetch(endpoint, { credentials: "include" })`.
  - Store a lightweight `thumbnailAuthReady` boolean and optionally `thumbnailAuthExpiresAt`.
  - If the cookie endpoint fails, keep the dashboard usable and render icon fallbacks.

- Render thumbnails in file cards.
  - In `FileCard`, if the file is an image and `thumbnailUrl` exists, render an `<img>` using that URL.
  - Use `crossOrigin` only if the backend/CDN requires CORS for canvas access. For normal `<img>` display, cookies are controlled by browser cookie rules, not by manually setting headers.
  - Add `onError` fallback so broken or unauthorized thumbnails fall back to the current document icon.
  - Keep Open and Download actions unchanged unless backend changes the file serving contract.

- Add thumbnail loading and fallback states.
  - `thumbnailStatus: "processing"` should show a neutral placeholder.
  - `thumbnailStatus: "failed"` or missing `thumbnailUrl` should show the existing file icon.
  - Image load error should hide the broken image and show fallback icon.

- Add cookie refresh behavior for expired signed cookies.
  - If multiple image loads fail after previously working, call the cookie endpoint once and then retry affected thumbnail URLs by appending a cache-busting query parameter such as `?thumbRetry=<timestamp>`.
  - Avoid refreshing cookies separately for every image error.
  - Add a per-page guard like `hasRetriedThumbnailAuth` to prevent loops.

- Keep direct file preview separate from thumbnail rendering.
  - `GetFileContent` can continue calling `/file/:id` for full file open/preview.
  - Thumbnail rendering should use listing-provided `thumbnailUrl` so the grid does not call `/file/:id` for every card.

## Dashboard flow

1. User opens `/dashboard`.
2. `DirectoryData` fetches user/profile and current directory data with credentials.
3. `DirectoryData` calls the thumbnail cookie endpoint with credentials.
4. Backend validates the user and sets CloudFront signed cookies.
5. Directory response includes files with thumbnail metadata.
6. `FileGrid` passes each file to `FileCard`.
7. `FileCard` renders `thumbnailUrl` for image files.
8. Browser requests the thumbnail from CloudFront and automatically includes matching signed cookies.
9. If the image fails, `FileCard` falls back to the current icon UI.

## Important constraints

- Do not try to send cookies manually with the thumbnail URL from React.
- Do not fetch every thumbnail as a blob unless there is a specific need to process bytes in the browser. Blob fetching would add memory pressure and require CORS/credentials handling per image.
- Do not put signed cookies or signed policy data in localStorage.
- Do not expose private S3 URLs in the directory response. The frontend should receive only the CloudFront thumbnail URL.
- Use short-lived signed cookies and refresh them through the backend when needed.

## Testing checklist

- Open `/dashboard` while authenticated and confirm the cookie endpoint is called with `credentials: include`.
- Confirm browser devtools shows CloudFront signed cookies scoped to the CDN domain or shared parent domain.
- Confirm image file cards request thumbnails from CloudFront, not from the API server.
- Confirm non-image files still show the existing icon.
- Confirm missing `thumbnailUrl` does not break the file card.
- Confirm expired or missing CloudFront cookies cause thumbnail fallback and one cookie refresh attempt.
- Confirm full file open still uses the existing `/file/:id` flow.
- Confirm root directory and nested directory pages both render thumbnails.

## Backend dependencies to communicate

- Provide `thumbnailUrl` and image metadata in directory file objects.
- Provide a cookie-setting endpoint called by the dashboard before thumbnail rendering.
- Use a CDN domain/cookie domain setup that allows browser cookies to be sent to CloudFront.
- Return CORS headers for the cookie endpoint so credentials work from the frontend origin.
- Set cookies with `Secure`, `HttpOnly` if JavaScript does not need to read them, and `SameSite=None` when cross-site.

