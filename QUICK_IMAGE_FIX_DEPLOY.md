# Quick Deployment Guide - Image Fix

## What Was Fixed
✅ Product images now display correctly in production
✅ Images from Medusa backend's `/static/` folder are properly loaded
✅ All image components updated to use absolute URLs

## Deploy Steps

### 1. Update Environment Variables

**Edit your `.env.production` file:**
```bash
# Add this line (update with your actual backend URL)
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

**If your backend is on a different server:**
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-backend-domain.com
```

### 2. Rebuild the Application
```bash
# Stop the current application
pm2 stop kabiki-storefront

# Rebuild with new changes
yarn build

# Start the application
pm2 start ecosystem.config.js

# Or restart if already running
pm2 restart kabiki-storefront
```

### 3. Verify Images Are Loading
```bash
# Check if the app is running
pm2 status

# Check logs for any errors
pm2 logs kabiki-storefront --lines 50

# Test the frontend
curl http://localhost:8000

# Test the backend
curl http://localhost:9000/health
```

### 4. Check in Browser
1. Open your storefront URL
2. Navigate to the home page
3. Check if product images are displaying
4. Open browser dev tools (F12)
5. Check Network tab - image URLs should be absolute (e.g., `http://localhost:9000/static/...`)

## Common Issues & Solutions

### Issue: Images still not showing
**Solution:**
```bash
# 1. Verify environment variable is set
pm2 show kabiki-storefront | grep NEXT_PUBLIC_MEDUSA_BACKEND_URL

# 2. Check if backend is accessible
curl http://localhost:9000/health

# 3. Rebuild and restart
yarn build && pm2 restart kabiki-storefront
```

### Issue: 404 errors on images
**Solution:**
- Check if images exist in Medusa backend's `static/` folder
- Verify image paths in Medusa admin panel
- Ensure backend is serving static files correctly

### Issue: CORS errors
**Solution:**
Update your Medusa backend's `medusa-config.js`:
```javascript
module.exports = {
  projectConfig: {
    http: {
      storeCors: "http://localhost:8000,https://your-domain.com",
    },
  },
}
```

## Quick Test Commands

```bash
# Test backend health
curl http://localhost:9000/health

# Test frontend health
curl http://localhost:8000/api/health

# Check PM2 status
pm2 status

# View logs
pm2 logs kabiki-storefront

# Restart app
pm2 restart kabiki-storefront

# Full rebuild and restart
yarn build && pm2 restart kabiki-storefront
```

## Rollback (If Needed)

If something goes wrong:
```bash
# Stop the app
pm2 stop kabiki-storefront

# Restore from git
git stash

# Rebuild
yarn build

# Start again
pm2 start ecosystem.config.js
```

## Success Checklist
- [ ] Environment variable `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is set
- [ ] Application rebuilt with `yarn build`
- [ ] PM2 restarted with new environment
- [ ] Home page loads without errors
- [ ] Product images are visible
- [ ] Collection images are visible
- [ ] No 404 errors in browser console
- [ ] No CORS errors in browser console

## Need Help?
Check the detailed guide: `IMAGE_FIX_README.md`
