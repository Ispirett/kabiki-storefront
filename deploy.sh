#!/bin/bash

# Kabiki Storefront Deployment Script
# This script handles the complete deployment process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Deploying Kabiki Storefront${NC}"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check required tools
echo -e "${YELLOW}🔍 Checking required tools...${NC}"
required_tools=("node" "pm2")
missing_tools=()

for tool in "${required_tools[@]}"; do
    if ! command_exists "$tool"; then
        missing_tools+=("$tool")
    fi
done

# Detect package manager
if command_exists "yarn"; then
    PKG_MANAGER="yarn"
    INSTALL_CMD="yarn install --frozen-lockfile"
    BUILD_CMD="yarn build"
elif command_exists "npm"; then
    PKG_MANAGER="npm"
    INSTALL_CMD="npm ci"
    BUILD_CMD="npm run build"
else
    missing_tools+=("npm or yarn")
fi

if [ ${#missing_tools[@]} -ne 0 ]; then
    echo -e "${RED}❌ Missing required tools: ${missing_tools[*]}${NC}"
    echo -e "${YELLOW}Please install the missing tools and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All required tools are available${NC}"

# Check if environment is configured
if [ ! -f ".env.production" ] && [ ! -f ".env.local" ] && [ ! -f ".env" ]; then
    echo -e "${RED}❌ No environment configuration found${NC}"
    echo -e "${YELLOW}Please run ./scripts/setup-storefront.sh first${NC}"
    exit 1
fi

# Load environment
if [ -f ".env.production" ]; then
    source .env.production
    ENV_TYPE="production"
elif [ -f ".env" ]; then
    source .env
    ENV_TYPE="production"
else
    source .env.local
    ENV_TYPE="development"
fi

echo -e "${GREEN}✅ Loaded $ENV_TYPE environment${NC}"

# Parse command line arguments
SKIP_TESTS=false
FORCE_REBUILD=false
SKIP_BACKUP=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        --force-rebuild)
            FORCE_REBUILD=true
            shift
            ;;
        --skip-backup)
            SKIP_BACKUP=true
            shift
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --skip-tests     Skip deployment tests"
            echo "  --force-rebuild  Force rebuild even if build exists"
            echo "  --skip-backup    Skip backup of current deployment"
            echo "  --help          Show this help message"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Create backup if not skipped
if [ "$SKIP_BACKUP" = false ] && pm2 list | grep -q "kabiki-storefront"; then
    echo -e "${YELLOW}📦 Creating backup of current deployment...${NC}"
    backup_dir="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    # Backup current build
    if [ -d ".next" ]; then
        cp -r .next "$backup_dir/"
        echo -e "${GREEN}✅ Build backed up to $backup_dir${NC}"
    fi
    
    # Backup PM2 process info
    pm2 jlist > "$backup_dir/pm2_processes.json"
    echo -e "${GREEN}✅ PM2 configuration backed up${NC}"
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies with $PKG_MANAGER...${NC}"
$INSTALL_CMD
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Build application
if [ "$FORCE_REBUILD" = true ] || [ ! -d ".next" ]; then
    echo -e "${YELLOW}🔨 Building application...${NC}"
    $BUILD_CMD
    echo -e "${GREEN}✅ Build completed${NC}"
else
    echo -e "${GREEN}✅ Using existing build${NC}"
fi

# Stop existing PM2 process if running
if pm2 list | grep -q "kabiki-storefront"; then
    echo -e "${YELLOW}🛑 Stopping existing application...${NC}"
    pm2 stop kabiki-storefront
    echo -e "${GREEN}✅ Application stopped${NC}"
fi

# Start application with PM2
echo -e "${YELLOW}🚀 Starting application...${NC}"
if [ -f "ecosystem.config.js" ]; then
    pm2 start ecosystem.config.js
else
    pm2 start npm --name "kabiki-storefront" -- start
fi
echo -e "${GREEN}✅ Application started${NC}"

# Save PM2 configuration
pm2 save
echo -e "${GREEN}✅ PM2 configuration saved${NC}"

# Wait for application to be ready
echo -e "${YELLOW}⏳ Waiting for application to be ready...${NC}"
sleep 15

# Run tests if not skipped
if [ "$SKIP_TESTS" = false ]; then
    echo -e "${YELLOW}🧪 Running deployment tests...${NC}"
    ./scripts/test-deployment.sh
else
    echo -e "${YELLOW}⚠️  Skipping deployment tests${NC}"
fi

# Display deployment information
echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}📊 Deployment Summary:${NC}"
echo -e "   Environment: $ENV_TYPE"
echo -e "   Port: ${PORT:-8000}"
echo -e "   Base URL: ${NEXT_PUBLIC_BASE_URL}"
echo -e "   Backend: ${MEDUSA_BACKEND_URL}"
echo ""
echo -e "${BLUE}🔧 Management Commands:${NC}"
echo "   View status: pm2 status"
echo "   View logs: pm2 logs kabiki-storefront"
echo "   Monitor: pm2 monit"
echo "   Restart: pm2 restart kabiki-storefront"
echo "   Stop: pm2 stop kabiki-storefront"
echo ""
echo -e "${GREEN}✨ Your Kabiki storefront is now live!${NC}"
echo -e "${BLUE}🌐 Access it at: ${NEXT_PUBLIC_BASE_URL}${NC}"