# Kabiki Storefront Deployment Guide

This guide covers the complete deployment setup for the Kabiki Medusa storefront, including PM2 process management and Kadi hosting configuration.

## 🚀 Quick Start

### 1. Initial Setup
```bash
# Make scripts executable and run setup
yarn setup
```

This will prompt you for:
- Domain/subdomain (e.g., shop.kabiki.com)
- Medusa backend URL
- Publishable API key
- Default region
- Stripe public key
- Other configuration options

### 2. Deploy
```bash
# Deploy the application
yarn deploy
```

### 3. Manage
```bash
# Use the management script for ongoing operations
yarn manage [command]
```

## 📋 Available Scripts

### Setup & Deployment
- `yarn setup` - Initial environment and PM2 configuration
- `yarn deploy` - Full deployment process
- `yarn test-deployment` - Test the deployment

### PM2 Management
- `yarn pm2:start` - Start with PM2
- `yarn pm2:stop` - Stop the application
- `yarn pm2:restart` - Restart the application
- `yarn pm2:logs` - View logs
- `yarn pm2:status` - Check status

### Management Commands
- `yarn manage start` - Start the storefront
- `yarn manage stop` - Stop the storefront
- `yarn manage restart` - Restart the storefront
- `yarn manage status` - Show application status
- `yarn manage logs` - Show application logs
- `yarn manage health` - Check application health
- `yarn manage backup` - Create a backup
- `yarn manage restore` - Restore from backup
- `yarn manage update` - Update dependencies and rebuild
- `yarn manage cleanup` - Clean up old logs and backups

## 🔧 Configuration Files

### Environment Files
- `.env.production` - Production environment variables
- `.env.local` - Development environment variables

### PM2 Configuration
- `ecosystem.config.js` - PM2 process configuration

### Kadi Configuration
- `kadi.config.json` - Kadi hosting configuration (generated during setup)
- `kadi.template.json` - Template for Kadi configuration

## 🌐 Kadi Hosting Setup

### Prerequisites
1. Kadi account and CLI installed
2. Domain configured in Kadi dashboard
3. SSL certificate configured

### Deployment to Kadi
```bash
# Login to Kadi
kadi login

# Deploy to Kadi
kadi deploy

# Check deployment status
kadi status

# View logs
kadi logs
```

### Environment Variables for Kadi
The setup script will create a `kadi.config.json` with all necessary environment variables. Key variables include:

- `MEDUSA_BACKEND_URL` - Your Medusa backend URL
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` - Medusa publishable key
- `NEXT_PUBLIC_BASE_URL` - Your storefront URL
- `NEXT_PUBLIC_DEFAULT_REGION` - Default region (e.g., 'us')
- `NEXT_PUBLIC_STRIPE_KEY` - Stripe public key
- `REVALIDATE_SECRET` - Next.js revalidation secret

## 🔍 Health Checks

The storefront includes comprehensive health checks:

### Health Endpoint
- **URL**: `/api/health`
- **Method**: GET
- **Response**: JSON with frontend and backend status

### Manual Health Check
```bash
# Check health via curl
yarn health

# Or use the management script
yarn manage health
```

## 📊 Monitoring

### PM2 Monitoring
```bash
# Real-time monitoring
pm2 monit

# Process status
pm2 status

# View logs
pm2 logs kabiki-storefront
```

### Log Files
- `logs/storefront.log` - Combined logs
- `logs/storefront-out.log` - Standard output
- `logs/storefront-error.log` - Error logs

## 🔄 Backup & Restore

### Create Backup
```bash
yarn manage backup
```

Backs up:
- Built application (`.next` directory)
- Environment files
- PM2 configuration

### Restore from Backup
```bash
yarn manage restore
```

Lists available backups and allows selection for restoration.

## 🚨 Troubleshooting

### Common Issues

#### Application Won't Start
1. Check environment variables: `yarn manage status`
2. Verify backend connectivity: `yarn manage health`
3. Check logs: `yarn manage logs`

#### Backend Connection Issues
1. Verify `MEDUSA_BACKEND_URL` in environment file
2. Check backend health: `curl $MEDUSA_BACKEND_URL/health`
3. Verify CORS settings on backend

#### Performance Issues
1. Check memory usage: `pm2 monit`
2. Review logs for errors: `yarn manage logs`
3. Consider scaling: modify `ecosystem.config.js`

### Debug Commands
```bash
# Check PM2 processes
pm2 list

# View detailed process info
pm2 show kabiki-storefront

# Restart with logs
pm2 restart kabiki-storefront && pm2 logs kabiki-storefront

# Check environment
pm2 env kabiki-storefront
```

## 🔧 Advanced Configuration

### PM2 Ecosystem Configuration
Edit `ecosystem.config.js` to modify:
- Instance count
- Memory limits
- Environment variables
- Log settings

### Scaling
For high-traffic scenarios:
```javascript
// In ecosystem.config.js
{
  instances: 'max', // Use all CPU cores
  exec_mode: 'cluster',
  max_memory_restart: '2G'
}
```

### Custom Domain Setup
1. Configure DNS to point to your server
2. Update `NEXT_PUBLIC_BASE_URL` in environment
3. Configure SSL certificate
4. Update CORS settings on Medusa backend

## 📚 Additional Resources

- [Medusa Documentation](https://docs.medusajs.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Kadi Documentation](https://docs.kadi.sh)

## 🆘 Support

For deployment issues:
1. Check this documentation
2. Review logs: `yarn manage logs`
3. Run health checks: `yarn manage health`
4. Contact support with log details

---

**Note**: Always test deployments in a staging environment before deploying to production.