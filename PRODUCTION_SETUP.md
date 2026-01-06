# Production Setup Guide

## Issue: Cart Images Not Showing in Production

The images work in development but not in production because the backend URL is set to `localhost:9000`, which only works on your local machine.

## Solution

### 1. Find Your Production Backend URL

Your Medusa backend needs to be accessible from the internet. Common scenarios:

**Option A: Backend on Same Server as Frontend**
```bash
# If both are on the same server (e.g., DigitalOcean droplet)
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

**Option B: Backend on Different Server**
```bash
# If backend is hosted separately (e.g., Railway, Render, Heroku)
MEDUSA_BACKEND_URL=https://your-backend-domain.com
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-backend-domain.com
```

**Option C: Backend on Subdomain**
```bash
# If you set up a subdomain for your backend
MEDUSA_BACKEND_URL=https://api.kabiki.com
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.kabiki.com
```

### 2. Update .env.production

Edit `.env.production` file:

```bash
# Replace localhost:9000 with your actual backend URL
MEDUSA_BACKEND_URL=https://your-actual-backend-url.com
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-actual-backend-url.com
```

### 3. Update Your Storefront URL

```bash
# Replace with your actual storefront domain
NEXT_PUBLIC_BASE_URL=https://kabiki.com
```

### 4. Rebuild and Redeploy

After updating `.env.production`:

```bash
# Rebuild your application
npm run build

# Restart PM2 (if using PM2)
pm2 restart kabiki-storefront

# Or restart your deployment
```

### 5. Update CORS in Medusa Backend

Make sure your Medusa backend allows requests from your storefront domain.

Edit your Medusa backend's `medusa-config.js`:

```javascript
module.exports = {
  projectConfig: {
    http: {
      storeCors: "https://kabiki.com,https://www.kabiki.com",
      adminCors: "https://admin.kabiki.com",
    },
  },
}
```

## Quick Check

After deployment, check if images load:

1. Open browser console (F12)
2. Go to Network tab
3. Try to add item to cart
4. Look for image requests
5. Check if they're going to the correct URL (not localhost)

## Common Issues

### Images still showing localhost
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check that you rebuilt after changing .env.production

### CORS errors
- Update Medusa backend CORS settings
- Restart Medusa backend after changes

### 404 errors on images
- Verify backend URL is correct
- Check that Medusa backend is running
- Verify images exist in Medusa backend

## Need Help?

If images still don't work, check:
1. Is your Medusa backend accessible from the internet?
2. Can you access: `https://your-backend-url.com/health` ?
3. Are product images uploaded to Medusa admin?
