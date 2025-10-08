# Image Display Fix for Production

## Problem
Product images were not displaying in production because:
1. Images are stored in the Medusa backend's `/static/` folder
2. The API returns relative image paths (e.g., `/static/product-image.jpg`)
3. Next.js Image component requires absolute URLs
4. The frontend didn't know how to resolve these relative paths to the backend URL

## Solution
Created an image loader utility that:
1. Detects if an image URL is relative or absolute
2. Prepends the backend URL to relative paths
3. Leaves absolute URLs (like S3 or Unsplash) unchanged

## Files Modified

### 1. New File: `src/lib/util/image-loader.ts`
- Created utility functions to convert relative image paths to absolute URLs
- Uses `NEXT_PUBLIC_MEDUSA_BACKEND_URL` environment variable

### 2. Updated Components
- `src/modules/products/components/thumbnail/index.tsx` - Product thumbnails
- `src/modules/home/components/product-collections/index.tsx` - Collection images
- `src/modules/home/components/featured-collections/index.tsx` - Featured collection images
- `src/modules/home/components/soap-showcase/index.tsx` - Showcase product images

### 3. Environment Files
- `.env.local` - Added `NEXT_PUBLIC_MEDUSA_BACKEND_URL`
- `.env.production` - Added `NEXT_PUBLIC_MEDUSA_BACKEND_URL`

### 4. Configuration Files
- `next.config.js` - Updated image remote patterns to allow localhost with port 9000
- `ecosystem.config.js` - Added `NEXT_PUBLIC_MEDUSA_BACKEND_URL` to PM2 environment

## Setup Instructions

### For Development
1. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
   ```

### For Production
1. Update `.env.production` with your actual backend URL:
   ```bash
   # If backend is on same server
   NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
   
   # OR if backend is on different server/domain
   NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-backend-domain.com
   ```

2. If using PM2, the environment variable will be automatically loaded from `.env.production`

3. Rebuild and restart the application:
   ```bash
   yarn build
   pm2 restart kabiki-storefront
   ```

## How It Works

### Image URL Resolution
```javascript
// Before: /static/product-image.jpg
// After: http://localhost:9000/static/product-image.jpg

// Before: https://images.unsplash.com/photo-123.jpg
// After: https://images.unsplash.com/photo-123.jpg (unchanged)
```

### Usage in Components
```tsx
import { getImageUrl } from "@lib/util/image-loader"

// In component
const imageUrl = getImageUrl(product.thumbnail)

<Image
  src={imageUrl}
  alt="Product"
  fill
  unoptimized={imageUrl.includes('localhost')}
/>
```

## Troubleshooting

### Images Still Not Showing?

1. **Check Backend URL**
   ```bash
   # Verify the backend is accessible
   curl http://localhost:9000/health
   ```

2. **Check Environment Variable**
   ```bash
   # In your app, check if the variable is set
   echo $NEXT_PUBLIC_MEDUSA_BACKEND_URL
   ```

3. **Check Image Paths in Database**
   - Images should be stored as `/static/...` or full URLs
   - Check your Medusa admin panel for product images

4. **Check Static Folder**
   - Ensure images exist in your Medusa backend's `static/` folder
   - Path should be: `medusa-backend/static/...`

5. **CORS Issues**
   - If backend is on different domain, ensure CORS is configured
   - Update `medusa-config.js` in your backend:
   ```javascript
   module.exports = {
     projectConfig: {
       http: {
         storeCors: "http://localhost:8000,https://your-domain.com",
       },
     },
   }
   ```

6. **Rebuild Required**
   - After changing environment variables, always rebuild:
   ```bash
   yarn build
   pm2 restart kabiki-storefront
   ```

### For Different Deployment Scenarios

#### Same Server (Backend and Frontend)
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

#### Different Servers
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.yourdomain.com
```

#### Using Nginx Proxy
If you're using Nginx to proxy both frontend and backend:
```bash
# If backend is at /api path
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://yourdomain.com/api

# Update Nginx config to proxy /api to backend
location /api {
    proxy_pass http://localhost:9000;
}
```

## Testing

1. **Check Image URLs in Browser**
   - Open browser dev tools
   - Check Network tab for image requests
   - URLs should be absolute (starting with http:// or https://)

2. **Test Image Loading**
   ```bash
   # Test if images are accessible
   curl -I http://localhost:9000/static/your-image.jpg
   ```

3. **Check Console for Errors**
   - Look for 404 errors on images
   - Look for CORS errors
   - Look for Next.js Image optimization errors

## Notes

- The `unoptimized` prop is used for localhost images to avoid Next.js optimization issues
- For production with proper domain, you can remove `unoptimized` for better performance
- All external images (S3, Unsplash) continue to work as before
- The fix is backward compatible with existing absolute URLs
