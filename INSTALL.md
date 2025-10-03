# Kabiki Storefront Installation Guide

## 🚀 Quick Installation

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Yarn** package manager
- **PM2** process manager
- **curl** and **jq** (for health checks)

```bash
# Install Node.js (if not installed)
# Visit: https://nodejs.org/

# Install Yarn
npm install -g yarn

# Install PM2
npm install -g pm2

# Install jq (macOS)
brew install jq

# Install jq (Ubuntu/Debian)
sudo apt-get install jq
```

### 2. Clone and Setup
```bash
# Clone the repository
git clone <your-repo-url> kabiki-storefront
cd kabiki-storefront

# Install dependencies
yarn install

# Validate setup
yarn validate

# Run initial setup
yarn setup
```

### 3. Configure Environment
The setup script will prompt you for:

- **Domain/Subdomain**: Your storefront domain (e.g., shop.kabiki.com)
- **Medusa Backend URL**: Your Medusa backend API URL
- **Publishable Key**: Your Medusa publishable API key
- **Default Region**: Default region code (e.g., 'us')
- **Stripe Public Key**: Your Stripe public key (optional)
- **Revalidation Secret**: Next.js revalidation secret (auto-generated)

### 4. Deploy
```bash
# Deploy the application
yarn deploy

# Test the deployment
yarn test-deployment
```

## 🔧 Manual Configuration

If you prefer manual configuration:

### 1. Create Environment File
```bash
cp .env.local.example .env.production
# Edit .env.production with your values
```

### 2. Create PM2 Configuration
```bash
# Copy the template and modify as needed
cp ecosystem.config.template.js ecosystem.config.js
```

### 3. Build and Start
```bash
yarn build
yarn pm2:start
```

## 🌐 Kadi Hosting Setup

### 1. Install Kadi CLI
```bash
npm install -g @kadi/cli
```

### 2. Login to Kadi
```bash
kadi login
```

### 3. Configure Project
The setup script creates a `kadi.config.json` file automatically. You can also create it manually:

```json
{
  "name": "kabiki-storefront",
  "domain": "your-domain.com",
  "build": {
    "command": "yarn build",
    "outputDirectory": ".next"
  },
  "start": {
    "command": "yarn start",
    "port": 8000
  }
}
```

### 4. Deploy to Kadi
```bash
kadi deploy
```

## 📋 Verification Checklist

After installation, verify everything is working:

- [ ] Dependencies installed (`yarn validate`)
- [ ] Environment configured (`.env.production` exists)
- [ ] Application builds successfully (`yarn build`)
- [ ] PM2 configuration valid (`pm2 list`)
- [ ] Health endpoint responds (`yarn health`)
- [ ] Medusa backend accessible
- [ ] Storefront loads in browser

## 🚨 Troubleshooting

### Common Issues

#### Permission Denied on Scripts
```bash
chmod +x scripts/*.sh
```

#### Missing Dependencies
```bash
yarn install --frozen-lockfile
```

#### PM2 Not Found
```bash
npm install -g pm2
```

#### Build Failures
```bash
# Clear cache and rebuild
yarn clear-cache
yarn build
```

#### Backend Connection Issues
- Verify `MEDUSA_BACKEND_URL` is correct
- Check backend is running and accessible
- Verify CORS settings on backend

### Getting Help

1. Check logs: `yarn manage logs`
2. Validate setup: `yarn validate`
3. Test deployment: `yarn test-deployment`
4. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed information

## 🎯 Next Steps

After successful installation:

1. **Customize**: Modify the storefront to match your brand
2. **Configure**: Set up payment providers, regions, etc.
3. **Test**: Thoroughly test all functionality
4. **Monitor**: Set up monitoring and alerts
5. **Scale**: Configure scaling based on traffic needs

---

**Need help?** Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide for detailed deployment instructions.