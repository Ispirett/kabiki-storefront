#!/bin/bash

# Kabiki Storefront Setup Script
# This script sets up the Medusa storefront for production deployment

set -e

echo "🚀 Setting up Kabiki Storefront for production..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to validate URL format
validate_url() {
    local url="$1"
    if [[ $url =~ ^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:[0-9]+)?(/.*)?$ ]]; then
        return 0
    else
        return 1
    fi
}

echo -e "${GREEN}📋 Environment Configuration${NC}"
echo "Please provide the following information for your storefront deployment:"
echo ""

# Prompt for environment variables
prompt_with_default "Enter your domain/subdomain (e.g., shop.kabiki.com):" "" "DOMAIN"
prompt_with_default "Enter your Medusa backend URL:" "https://api.kabiki.com" "BACKEND_URL"
prompt_with_default "Enter your Medusa publishable key:" "" "PUBLISHABLE_KEY"
prompt_with_default "Enter your default region (ISO-2 format):" "us" "DEFAULT_REGION"
prompt_with_default "Enter your Stripe public key (optional):" "" "STRIPE_KEY"
prompt_with_default "Enter your revalidation secret:" "$(openssl rand -base64 32)" "REVALIDATE_SECRET"
prompt_with_default "Enter the port for production (default: 8000):" "8000" "PROD_PORT"
prompt_with_default "Enter the port for development (default: 3001):" "3001" "DEV_PORT"

# Validate URLs
if ! validate_url "$BACKEND_URL"; then
    echo -e "${RED}❌ Invalid backend URL format. Please use format: https://domain.com${NC}"
    exit 1
fi

# Determine base URL from domain
if [[ $DOMAIN == *"localhost"* ]] || [[ $DOMAIN == *"127.0.0.1"* ]]; then
    BASE_URL="http://$DOMAIN"
else
    BASE_URL="https://$DOMAIN"
fi

echo ""
echo -e "${GREEN}📝 Creating environment files...${NC}"

# Create production environment file
cat > .env.production << EOF
# Kabiki Storefront Production Environment
# Generated on $(date)

# Medusa Backend Configuration
MEDUSA_BACKEND_URL=$BACKEND_URL
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$PUBLISHABLE_KEY

# Storefront Configuration
NEXT_PUBLIC_BASE_URL=$BASE_URL
NEXT_PUBLIC_DEFAULT_REGION=$DEFAULT_REGION

# Payment Configuration
NEXT_PUBLIC_STRIPE_KEY=$STRIPE_KEY

# Next.js Configuration
REVALIDATE_SECRET=$REVALIDATE_SECRET
NODE_ENV=production
PORT=$PROD_PORT

# Deployment Configuration
DOMAIN=$DOMAIN
EOF

# Create development environment file (update existing .env.local)
cat > .env.local << EOF
# Kabiki Storefront Development Environment
# Generated on $(date)

# Medusa Backend Configuration
MEDUSA_BACKEND_URL=$BACKEND_URL
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$PUBLISHABLE_KEY

# Storefront Configuration  
NEXT_PUBLIC_BASE_URL=http://localhost:$DEV_PORT
NEXT_PUBLIC_DEFAULT_REGION=$DEFAULT_REGION

# Payment Configuration
NEXT_PUBLIC_STRIPE_KEY=$STRIPE_KEY

# Next.js Configuration
REVALIDATE_SECRET=$REVALIDATE_SECRET
NODE_ENV=development
PORT=$DEV_PORT
EOF

echo -e "${GREEN}✅ Environment files created successfully!${NC}"

# Create PM2 ecosystem file
echo -e "${GREEN}📝 Creating PM2 configuration...${NC}"

cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'kabiki-storefront',
      script: 'yarn',
      args: 'start',
      cwd: '$(pwd)',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: $PROD_PORT
      },
      env_file: '.env.production',
      log_file: './logs/storefront.log',
      out_file: './logs/storefront-out.log',
      error_file: './logs/storefront-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      max_memory_restart: '1G',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.next'],
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000
    }
  ]
};
EOF

# Create logs directory
mkdir -p logs

echo -e "${GREEN}✅ PM2 configuration created successfully!${NC}"

# Create Kadi configuration if needed
echo ""
echo -e "${BLUE}🌐 Would you like to create a Kadi deployment configuration? (y/n)${NC}"
read -p "> " create_kadi

if [[ $create_kadi =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}📝 Creating Kadi configuration...${NC}"
    
    prompt_with_default "Enter your Kadi project name:" "kabiki-storefront" "KADI_PROJECT"
    prompt_with_default "Enter your Kadi environment (staging/production):" "production" "KADI_ENV"
    
    cat > kadi.config.json << EOF
{
  "name": "$KADI_PROJECT",
  "environment": "$KADI_ENV",
  "domain": "$DOMAIN",
  "build": {
    "command": "yarn build",
    "outputDirectory": ".next",
    "installCommand": "yarn install --frozen-lockfile"
  },
  "start": {
    "command": "yarn start",
    "port": $PROD_PORT
  },
  "env": {
    "NODE_ENV": "production",
    "MEDUSA_BACKEND_URL": "$BACKEND_URL",
    "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY": "$PUBLISHABLE_KEY",
    "NEXT_PUBLIC_BASE_URL": "$BASE_URL",
    "NEXT_PUBLIC_DEFAULT_REGION": "$DEFAULT_REGION",
    "NEXT_PUBLIC_STRIPE_KEY": "$STRIPE_KEY",
    "REVALIDATE_SECRET": "$REVALIDATE_SECRET"
  },
  "healthCheck": {
    "path": "/api/health",
    "timeout": 30
  }
}
EOF
    
    echo -e "${GREEN}✅ Kadi configuration created successfully!${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Review the generated configuration files"
echo "2. Install dependencies: yarn install"
echo "3. Build the application: yarn build"
echo "4. Start with PM2: pm2 start ecosystem.config.js"
echo "5. Test the deployment: ./scripts/test-deployment.sh"
echo ""
echo -e "${BLUE}📁 Generated files:${NC}"
echo "  - .env.production (production environment)"
echo "  - .env.local (development environment)"
echo "  - ecosystem.config.js (PM2 configuration)"
if [[ $create_kadi =~ ^[Yy]$ ]]; then
    echo "  - kadi.config.json (Kadi deployment configuration)"
fi
echo ""
echo -e "${GREEN}✨ Your Kabiki storefront is ready for deployment!${NC}"