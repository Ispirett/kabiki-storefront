#!/bin/bash

# Complete Production Server Setup for Kabiki Storefront
# This script sets up everything needed: Node.js, PM2, Caddy, SSL, and the application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up complete production server for Kabiki Storefront${NC}"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ This script must be run as root (use sudo)${NC}"
    exit 1
fi

# Function to prompt for input with default value
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    local var_name="$3"
    
    echo -e "${BLUE}$prompt${NC}"
    if [ -n "$default" ]; then
        echo -e "${YELLOW}Default: $default${NC}"
    fi
    read -p "> " input
    
    if [ -z "$input" ] && [ -n "$default" ]; then
        input="$default"
    fi
    
    eval "$var_name='$input'"
}

# Get configuration
echo -e "${GREEN}📋 Server Configuration${NC}"
prompt_with_default "Enter your domain (e.g., shop.kabiki.com):" "" "DOMAIN"
prompt_with_default "Enter your email for SSL certificates:" "" "EMAIL"
prompt_with_default "Enter your Medusa backend URL:" "https://api.kabiki.com" "BACKEND_URL"
prompt_with_default "Enter your Medusa publishable key:" "" "PUBLISHABLE_KEY"
prompt_with_default "Enter application port:" "8000" "APP_PORT"
prompt_with_default "Enter your default region:" "us" "DEFAULT_REGION"

# Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
apt update && apt upgrade -y

# Install Node.js 20
echo -e "${YELLOW}📦 Installing Node.js 20...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install Yarn
echo -e "${YELLOW}📦 Installing Yarn...${NC}"
npm install -g yarn

# Install PM2
echo -e "${YELLOW}📦 Installing PM2...${NC}"
npm install -g pm2

# Install Caddy
echo -e "${YELLOW}📦 Installing Caddy...${NC}"
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install -y caddy

# Create application user
echo -e "${YELLOW}👤 Creating application user...${NC}"
if ! id "kabiki" &>/dev/null; then
    useradd -m -s /bin/bash kabiki
    usermod -aG sudo kabiki
fi

# Create application directory
APP_DIR="/home/kabiki/kabiki-storefront"
mkdir -p "$APP_DIR"
chown -R kabiki:kabiki "$APP_DIR"

# Create Caddyfile
echo -e "${YELLOW}🌐 Creating Caddy configuration...${NC}"
cat > /etc/caddy/Caddyfile << EOF
# Kabiki Storefront Caddy Configuration
$DOMAIN {
    # Enable automatic HTTPS
    tls $EMAIL
    
    # Reverse proxy to Next.js application
    reverse_proxy localhost:$APP_PORT {
        # Health check
        health_uri /api/health
        health_interval 30s
        health_timeout 10s
        
        # Headers for better performance
        header_up Host {host}
        header_up X-Real-IP {remote}
        header_up X-Forwarded-For {remote}
        header_up X-Forwarded-Proto {scheme}
    }
    
    # Security headers
    header {
        # Enable HSTS
        Strict-Transport-Security max-age=31536000;
        # Prevent clickjacking
        X-Frame-Options DENY
        # Prevent content type sniffing
        X-Content-Type-Options nosniff
        # XSS protection
        X-XSS-Protection "1; mode=block"
        # Referrer policy
        Referrer-Policy strict-origin-when-cross-origin
    }
    
    # Gzip compression
    encode gzip
    
    # Static file caching
    @static {
        path /_next/static/*
        path /favicon.ico
        path /robots.txt
        path /sitemap.xml
    }
    header @static Cache-Control "public, max-age=31536000, immutable"
    
    # Logging
    log {
        output file /var/log/caddy/kabiki-storefront.log {
            roll_size 100mb
            roll_keep 5
            roll_keep_for 720h
        }
    }
}

# Redirect www to non-www
www.$DOMAIN {
    redir https://$DOMAIN{uri} permanent
}
EOF

# Create log directory
mkdir -p /var/log/caddy
chown caddy:caddy /var/log/caddy

# Create environment file
echo -e "${YELLOW}📝 Creating environment configuration...${NC}"
cat > "$APP_DIR/.env.production" << EOF
# Kabiki Storefront Production Environment
NODE_ENV=production
PORT=$APP_PORT

# Medusa Configuration
MEDUSA_BACKEND_URL=$BACKEND_URL
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$PUBLISHABLE_KEY

# Storefront Configuration
NEXT_PUBLIC_BASE_URL=https://$DOMAIN
NEXT_PUBLIC_DEFAULT_REGION=$DEFAULT_REGION

# Security
REVALIDATE_SECRET=$(openssl rand -base64 32)
EOF

# Create PM2 ecosystem file
echo -e "${YELLOW}📝 Creating PM2 configuration...${NC}"
cat > "$APP_DIR/ecosystem.config.js" << EOF
module.exports = {
  apps: [
    {
      name: 'kabiki-storefront',
      script: 'yarn',
      args: 'start',
      cwd: '$APP_DIR',
      instances: 1,
      exec_mode: 'fork',
      user: 'kabiki',
      env_file: '$APP_DIR/.env.production',
      log_file: '$APP_DIR/logs/storefront.log',
      out_file: '$APP_DIR/logs/storefront-out.log',
      error_file: '$APP_DIR/logs/storefront-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      max_memory_restart: '1G',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000
    }
  ]
};
EOF

# Create logs directory
mkdir -p "$APP_DIR/logs"
chown -R kabiki:kabiki "$APP_DIR"

# Create systemd service for PM2
echo -e "${YELLOW}⚙️  Creating PM2 systemd service...${NC}"
cat > /etc/systemd/system/pm2-kabiki.service << EOF
[Unit]
Description=PM2 process manager for Kabiki Storefront
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
Type=forking
User=kabiki
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
Environment=PATH=/usr/local/bin:/usr/bin:/bin
Environment=PM2_HOME=/home/kabiki/.pm2
PIDFile=/home/kabiki/.pm2/pm2.pid
Restart=on-failure

ExecStart=/usr/bin/pm2 resurrect
ExecReload=/usr/bin/pm2 reload all
ExecStop=/usr/bin/pm2 kill

[Install]
WantedBy=multi-user.target
EOF

# Create deployment script
echo -e "${YELLOW}📝 Creating deployment script...${NC}"
cat > "$APP_DIR/deploy.sh" << 'EOF'
#!/bin/bash
set -e

echo "🚀 Deploying Kabiki Storefront..."

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build application
npm run build

# Restart PM2
pm2 restart kabiki-storefront

echo "✅ Deployment completed!"
EOF

chmod +x "$APP_DIR/deploy.sh"
chown kabiki:kabiki "$APP_DIR/deploy.sh"

# Create firewall rules
echo -e "${YELLOW}🔥 Configuring firewall...${NC}"
ufw --force enable
ufw allow ssh
ufw allow 80
ufw allow 443
ufw reload

# Enable and start services
echo -e "${YELLOW}🚀 Starting services...${NC}"
systemctl enable caddy
systemctl start caddy
systemctl enable pm2-kabiki

# Test Caddy configuration
echo -e "${YELLOW}🧪 Testing Caddy configuration...${NC}"
caddy validate --config /etc/caddy/Caddyfile

echo ""
echo -e "${GREEN}🎉 Production server setup completed!${NC}"
echo ""
echo -e "${BLUE}📋 What was installed:${NC}"
echo "  ✅ Node.js 20"
echo "  ✅ Yarn package manager"
echo "  ✅ PM2 process manager"
echo "  ✅ Caddy web server with SSL"
echo "  ✅ Firewall configuration"
echo "  ✅ Application user and directories"
echo ""
echo -e "${BLUE}📁 Important files:${NC}"
echo "  - Application: $APP_DIR"
echo "  - Caddy config: /etc/caddy/Caddyfile"
echo "  - Environment: $APP_DIR/.env.production"
echo "  - PM2 config: $APP_DIR/ecosystem.config.js"
echo "  - Deploy script: $APP_DIR/deploy.sh"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Switch to kabiki user: sudo su - kabiki"
echo "2. Clone your repository to $APP_DIR"
echo "3. Run: cd $APP_DIR && npm install && npm run build"
echo "4. Start PM2: pm2 start ecosystem.config.js"
echo "5. Save PM2 config: pm2 save && pm2 startup"
echo ""
echo -e "${BLUE}🔧 Management commands:${NC}"
echo "  - Check Caddy: systemctl status caddy"
echo "  - Check PM2: sudo su - kabiki -c 'pm2 status'"
echo "  - View logs: sudo su - kabiki -c 'pm2 logs'"
echo "  - Restart app: sudo su - kabiki -c 'pm2 restart kabiki-storefront'"
echo ""
echo -e "${GREEN}🌐 Your domain $DOMAIN is ready for deployment!${NC}"
EOF