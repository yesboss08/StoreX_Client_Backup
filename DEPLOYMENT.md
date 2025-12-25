# Deployment Guide

## Vercel Deployment

This project is optimized for Vercel deployment with the following configuration:

### Prerequisites
- Node.js 18+ 
- npm 8+
- Vercel account

### Environment Variables
Set these in your Vercel dashboard:

```bash
VITE_SERVER_URL=https://your-backend-server.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Deployment Steps

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Vercel will auto-detect it as a Vite project

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the variables listed above

3. **Deploy**
   - Vercel will automatically build and deploy
   - Build command: `npm run build`
   - Output directory: `dist`

### Build Configuration

The project includes:
- ✅ `vercel.json` for optimal configuration
- ✅ SPA routing support with rewrites
- ✅ Asset caching headers
- ✅ Node.js 18+ engine specification

### Features Included

- 🎨 Modern SaaS landing page
- 🌙 Dark/Light theme system
- 📤 XHR file upload with progress
- 🎯 Enhanced hover tooltips
- 📱 Fully responsive design
- ♿ Accessibility compliant

### Troubleshooting

If deployment fails:
1. Check environment variables are set correctly
2. Ensure backend server URL is accessible
3. Verify all TypeScript errors are resolved
4. Check Vercel build logs for specific errors

### Performance

- Bundle size: ~384KB (gzipped: ~115KB)
- CSS size: ~54KB (gzipped: ~8.5KB)
- Build time: ~5 seconds