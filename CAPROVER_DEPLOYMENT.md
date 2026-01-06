# CapRover Deployment Guide

## Prerequisites

- CapRover server set up and running
- CapRover CLI installed (`npm install -g caprover`)
- Your Medusa backend URL accessible

## Quick Deploy

### 1. Create the App in CapRover

1. Go to your CapRover dashboard
2. Click "Apps" → "One-Click Apps/Databases" or create a blank app
3. Create a new app named `kabiki-storefront` (or your preferred name)

### 2. Configure Environment Variables

In CapRover dashboard, go to your app → "App Configs" and add:

```
MEDUSA_BACKEND_URL=https://your-medusa-backend.com
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-medusa-backend.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_key_here
NEXT_PUBLIC_BASE_URL=https://your-storefront-domain.com
NEXT_PUBLIC_DEFAULT_REGION=us
NEXT_PUBLIC_STRIPE_KEY=pk_live_your_stripe_key
REVALIDATE_SECRET=your_secret_here
```

### 3. Deploy via CLI

```bash
# Login to CapRover (first time only)
caprover login

# Deploy
caprover deploy
```

When prompted:
- Select your CapRover server
- Enter app name: `kabiki-storefront`
- Branch: `main` (or your branch)

### 4. Deploy via Tarball (Alternative)

```bash
# Create tarball
tar -cvf deploy.tar --exclude='node_modules' --exclude='.git' --exclude='.next' .

# Deploy
caprover deploy -t ./deploy.tar
```

## Build Arguments

The Dockerfile accepts these build args (set in CapRover App Configs):

| Variable | Description |
|----------|-------------|
| `MEDUSA_BACKEND_URL` | Backend URL for server-side requests |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Backend URL for client-side requests |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Medusa publishable API key |
| `NEXT_PUBLIC_BASE_URL` | Your storefront's public URL |
| `NEXT_PUBLIC_DEFAULT_REGION` | Default region code (e.g., `us`) |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe publishable key |
| `REVALIDATE_SECRET` | Secret for on-demand revalidation |

## SSL/HTTPS

1. In CapRover, go to your app
2. Click "Enable HTTPS"
3. CapRover will automatically provision Let's Encrypt certificate

## Custom Domain

1. Point your domain's DNS to your CapRover server IP
2. In CapRover app settings, add your custom domain
3. Enable HTTPS after DNS propagates

## Troubleshooting

### Build Fails
- Check CapRover logs: App → Deployment → View Build Logs
- Ensure all required env vars are set before building

### App Won't Start
- Check app logs in CapRover dashboard
- Verify `MEDUSA_BACKEND_URL` is accessible from the container

### Images Not Loading
- Ensure `NEXT_PUBLIC_MEDUSA_BACKEND_URL` matches your backend
- Check `next.config.js` has your backend domain in `remotePatterns`
