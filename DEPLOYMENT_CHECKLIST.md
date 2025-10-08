# 🚀 Image Fix Deployment Checklist

## Pre-Deployment
- [ ] All code changes committed to git
- [ ] `.env.production` file updated with correct backend URL
- [ ] Backend is running and accessible
- [ ] You have SSH/terminal access to production server

## Deployment Steps

### Step 1: Update Environment Variables
```bash
# Edit .env.production
nano .env.production

# Add or update this line:
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Save and exit (Ctrl+X, Y, Enter)
```

### Step 2: Stop Current Application
```bash
pm2 stop kabiki-storefront
```

### Step 3: Rebuild Application
```bash
yarn build
```
**Expected:** Build completes without errors

### Step 4: Start Application
```bash
pm2 start ecosystem.config.js
# OR if already configured:
pm2 restart kabiki-storefront
```

### Step 5: Verify Deployment
```bash
# Check PM2 status
pm2 status

# Should show: kabiki-storefront | online

# Check logs for errors
pm2 logs kabiki-storefront --lines 50

# Should NOT show image loading errors
```

## Post-Deployment Testing

### Test 1: Backend Health
```bash
curl http://localhost:9000/health
```
**Expected:** `{"status":"ok"}` or similar

### Test 2: Frontend Health
```bash
curl http://localhost:8000
```
**Expected:** HTML response (not error)

### Test 3: Environment Variable
```bash
pm2 show kabiki-storefront | grep NEXT_PUBLIC_MEDUSA_BACKEND_URL
```
**Expected:** Shows the correct backend URL

### Test 4: Browser Testing
1. [ ] Open `http://localhost:8000` (or your domain)
2. [ ] Home page loads without errors
3. [ ] Product images are visible on home page
4. [ ] Collection images are visible
5. [ ] Navigate to a product page
6. [ ] Product detail images are visible
7. [ ] Navigate to store page
8. [ ] All product grid images are visible

### Test 5: Browser Console
1. [ ] Open browser DevTools (F12)
2. [ ] Check Console tab - no errors
3. [ ] Check Network tab
4. [ ] Filter by "Img"
5. [ ] All image requests should be 200 OK
6. [ ] Image URLs should be absolute (e.g., `http://localhost:9000/static/...`)

## Verification Checklist

### Environment
- [ ] `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is set in `.env.production`
- [ ] Backend URL is correct and accessible
- [ ] PM2 environment includes the new variable

### Application
- [ ] Application built successfully
- [ ] PM2 shows status as "online"
- [ ] No errors in PM2 logs
- [ ] Frontend is accessible

### Images
- [ ] Home page product images display
- [ ] Collection card images display
- [ ] Featured collection images display
- [ ] Product detail page images display
- [ ] Store page product grid images display
- [ ] No broken image icons
- [ ] No 404 errors in browser console

### Performance
- [ ] Page loads in reasonable time
- [ ] Images load without delay
- [ ] No console warnings or errors

## Troubleshooting

### If images still don't show:

#### Check 1: Environment Variable
```bash
pm2 show kabiki-storefront | grep BACKEND_URL
```
If not showing, rebuild and restart:
```bash
yarn build && pm2 restart kabiki-storefront
```

#### Check 2: Backend Accessibility
```bash
curl http://localhost:9000/health
```
If fails, check if backend is running:
```bash
# Check if backend process is running
ps aux | grep medusa
```

#### Check 3: Image Files
```bash
# Check if static folder exists in backend
ls -la /path/to/medusa-backend/static/

# Test direct image access
curl -I http://localhost:9000/static/your-image.jpg
```

#### Check 4: CORS
If you see CORS errors in browser console:
```bash
# Edit Medusa backend config
nano /path/to/medusa-backend/medusa-config.js

# Update storeCors:
http: {
  storeCors: "http://localhost:8000,https://your-domain.com",
}

# Restart backend
pm2 restart medusa-backend
```

#### Check 5: Clear Cache
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
yarn build

# Restart
pm2 restart kabiki-storefront
```

## Rollback Procedure

If something goes wrong:

### Option 1: Quick Rollback
```bash
# Stop app
pm2 stop kabiki-storefront

# Restore from git
git stash

# Rebuild
yarn build

# Start
pm2 start ecosystem.config.js
```

### Option 2: Full Rollback
```bash
# Stop app
pm2 stop kabiki-storefront

# Checkout previous commit
git log --oneline -5  # Find previous commit hash
git checkout <previous-commit-hash>

# Rebuild
yarn build

# Start
pm2 start ecosystem.config.js
```

## Success Criteria

✅ All checkboxes above are checked
✅ No errors in PM2 logs
✅ No errors in browser console
✅ All images display correctly
✅ Application is stable and responsive

## Support

If you encounter issues:
1. Check `IMAGE_FIX_README.md` for detailed troubleshooting
2. Check `QUICK_IMAGE_FIX_DEPLOY.md` for quick fixes
3. Review PM2 logs: `pm2 logs kabiki-storefront`
4. Check browser console for specific errors

## Notes
- Keep a backup of your `.env.production` file
- Document any custom changes you make
- Test thoroughly before marking as complete
- Monitor logs for the first few hours after deployment

---

**Deployment Date:** _________________
**Deployed By:** _________________
**Status:** ⬜ Success  ⬜ Failed  ⬜ Rolled Back
**Notes:** _________________
