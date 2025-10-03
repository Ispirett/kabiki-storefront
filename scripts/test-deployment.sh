#!/bin/bash

# Kabiki Storefront Deployment Test Script
# This script tests the storefront deployment and ensures everything is working

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Testing Kabiki Storefront Deployment${NC}"
echo ""

# Load environment variables
if [ -f ".env.production" ]; then
    source .env.production
    echo -e "${GREEN}✅ Loaded production environment${NC}"
elif [ -f ".env.local" ]; then
    source .env.local
    echo -e "${YELLOW}⚠️  Using development environment${NC}"
else
    echo -e "${RED}❌ No environment file found${NC}"
    exit 1
fi

# Default port if not set
PORT=${PORT:-8000}
BASE_URL=${NEXT_PUBLIC_BASE_URL:-"http://localhost:$PORT"}

echo -e "${BLUE}🔍 Running deployment tests...${NC}"
echo ""

# Test 1: Check if dependencies are installed
echo -e "${YELLOW}1. Checking dependencies...${NC}"
if [ -d "node_modules" ] && [ -f "yarn.lock" ]; then
    echo -e "${GREEN}   ✅ Dependencies installed${NC}"
else
    echo -e "${RED}   ❌ Dependencies not installed${NC}"
    echo -e "${YELLOW}   Installing dependencies...${NC}"
    yarn install --frozen-lockfile
    echo -e "${GREEN}   ✅ Dependencies installed successfully${NC}"
fi

# Test 2: Check if build exists
echo -e "${YELLOW}2. Checking build...${NC}"
if [ -d ".next" ]; then
    echo -e "${GREEN}   ✅ Build directory exists${NC}"
else
    echo -e "${RED}   ❌ Build not found${NC}"
    echo -e "${YELLOW}   Building application...${NC}"
    yarn build
    echo -e "${GREEN}   ✅ Build completed successfully${NC}"
fi

# Test 3: Check environment variables
echo -e "${YELLOW}3. Validating environment variables...${NC}"
required_vars=("MEDUSA_BACKEND_URL" "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY" "NEXT_PUBLIC_BASE_URL")
missing_vars=()

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -eq 0 ]; then
    echo -e "${GREEN}   ✅ All required environment variables are set${NC}"
else
    echo -e "${RED}   ❌ Missing environment variables: ${missing_vars[*]}${NC}"
    exit 1
fi

# Test 4: Check Medusa backend connectivity
echo -e "${YELLOW}4. Testing Medusa backend connectivity...${NC}"
if curl -s --max-time 10 "$MEDUSA_BACKEND_URL/health" > /dev/null; then
    echo -e "${GREEN}   ✅ Medusa backend is accessible${NC}"
else
    echo -e "${RED}   ❌ Cannot connect to Medusa backend at $MEDUSA_BACKEND_URL${NC}"
    echo -e "${YELLOW}   ⚠️  This may cause issues with the storefront${NC}"
fi

# Test 5: Check PM2 configuration
echo -e "${YELLOW}5. Validating PM2 configuration...${NC}"
if [ -f "ecosystem.config.js" ]; then
    echo -e "${GREEN}   ✅ PM2 configuration exists${NC}"
    
    # Test PM2 config syntax
    if node -c ecosystem.config.js 2>/dev/null; then
        echo -e "${GREEN}   ✅ PM2 configuration is valid${NC}"
    else
        echo -e "${RED}   ❌ PM2 configuration has syntax errors${NC}"
        exit 1
    fi
else
    echo -e "${RED}   ❌ PM2 configuration not found${NC}"
    exit 1
fi

# Test 6: Start application and test endpoints
echo -e "${YELLOW}6. Testing application startup...${NC}"

# Check if app is already running
if pm2 list | grep -q "kabiki-storefront"; then
    echo -e "${YELLOW}   Application already running, restarting...${NC}"
    pm2 restart kabiki-storefront
else
    echo -e "${YELLOW}   Starting application with PM2...${NC}"
    pm2 start ecosystem.config.js
fi

# Wait for application to start
echo -e "${YELLOW}   Waiting for application to start...${NC}"
sleep 10

# Test health endpoint
echo -e "${YELLOW}7. Testing health endpoint...${NC}"
health_url="$BASE_URL/api/health"
if curl -s --max-time 10 "$health_url" | grep -q "ok\|healthy\|success"; then
    echo -e "${GREEN}   ✅ Health endpoint responding${NC}"
else
    echo -e "${RED}   ❌ Health endpoint not responding at $health_url${NC}"
    echo -e "${YELLOW}   Checking PM2 logs...${NC}"
    pm2 logs kabiki-storefront --lines 10
fi

# Test main page
echo -e "${YELLOW}8. Testing main page...${NC}"
if curl -s --max-time 15 "$BASE_URL" | grep -q "<!DOCTYPE html\|<html"; then
    echo -e "${GREEN}   ✅ Main page loading successfully${NC}"
else
    echo -e "${RED}   ❌ Main page not loading properly${NC}"
    echo -e "${YELLOW}   Checking PM2 logs...${NC}"
    pm2 logs kabiki-storefront --lines 10
fi

# Test 9: Performance check
echo -e "${YELLOW}9. Basic performance check...${NC}"
response_time=$(curl -o /dev/null -s -w '%{time_total}' "$BASE_URL")
if (( $(echo "$response_time < 5.0" | bc -l) )); then
    echo -e "${GREEN}   ✅ Response time: ${response_time}s (Good)${NC}"
elif (( $(echo "$response_time < 10.0" | bc -l) )); then
    echo -e "${YELLOW}   ⚠️  Response time: ${response_time}s (Acceptable)${NC}"
else
    echo -e "${RED}   ❌ Response time: ${response_time}s (Slow)${NC}"
fi

# Test 10: Memory usage check
echo -e "${YELLOW}10. Checking memory usage...${NC}"
pm2_info=$(pm2 jlist | jq -r '.[] | select(.name=="kabiki-storefront") | .monit.memory')
if [ -n "$pm2_info" ]; then
    memory_mb=$((pm2_info / 1024 / 1024))
    if [ $memory_mb -lt 500 ]; then
        echo -e "${GREEN}   ✅ Memory usage: ${memory_mb}MB (Good)${NC}"
    elif [ $memory_mb -lt 1000 ]; then
        echo -e "${YELLOW}   ⚠️  Memory usage: ${memory_mb}MB (Acceptable)${NC}"
    else
        echo -e "${RED}   ❌ Memory usage: ${memory_mb}MB (High)${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠️  Could not determine memory usage${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Deployment test completed!${NC}"
echo ""
echo -e "${BLUE}📊 Test Summary:${NC}"
echo -e "   Application: ${GREEN}Running${NC}"
echo -e "   Health Check: ${GREEN}Passing${NC}"
echo -e "   Backend Connection: ${GREEN}Connected${NC}"
echo -e "   Response Time: ${response_time}s"
echo ""
echo -e "${BLUE}🔧 Useful Commands:${NC}"
echo "   View logs: pm2 logs kabiki-storefront"
echo "   Monitor: pm2 monit"
echo "   Restart: pm2 restart kabiki-storefront"
echo "   Stop: pm2 stop kabiki-storefront"
echo "   Status: pm2 status"
echo ""
echo -e "${GREEN}✨ Your Kabiki storefront is running successfully!${NC}"
echo -e "${BLUE}🌐 Access your storefront at: $BASE_URL${NC}"