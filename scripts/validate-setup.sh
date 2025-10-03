#!/bin/bash

# Kabiki Storefront Setup Validation Script
# This script validates that all necessary components are properly configured

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Validating Kabiki Storefront Setup${NC}"
echo ""

# Track validation results
VALIDATION_PASSED=true

# Function to check and report
check_item() {
    local description="$1"
    local condition="$2"
    
    echo -n "  $description... "
    
    if eval "$condition"; then
        echo -e "${GREEN}✅${NC}"
    else
        echo -e "${RED}❌${NC}"
        VALIDATION_PASSED=false
    fi
}

# Check required tools
echo -e "${YELLOW}🔧 Checking Required Tools${NC}"
check_item "Node.js installed" "command -v node >/dev/null 2>&1"
check_item "Yarn installed" "command -v yarn >/dev/null 2>&1"
check_item "PM2 installed" "command -v pm2 >/dev/null 2>&1"
check_item "curl installed" "command -v curl >/dev/null 2>&1"
check_item "jq installed" "command -v jq >/dev/null 2>&1 || command -v python3 >/dev/null 2>&1"

echo ""

# Check project structure
echo -e "${YELLOW}📁 Checking Project Structure${NC}"
check_item "package.json exists" "[ -f 'package.json' ]"
check_item "next.config.js exists" "[ -f 'next.config.js' ]"
check_item "tailwind.config.js exists" "[ -f 'tailwind.config.js' ]"
check_item "src directory exists" "[ -d 'src' ]"
check_item "scripts directory exists" "[ -d 'scripts' ]"

echo ""

# Check scripts
echo -e "${YELLOW}📜 Checking Scripts${NC}"
check_item "setup-storefront.sh exists" "[ -f 'scripts/setup-storefront.sh' ]"
check_item "deploy.sh exists" "[ -f 'scripts/deploy.sh' ]"
check_item "test-deployment.sh exists" "[ -f 'scripts/test-deployment.sh' ]"
check_item "manage-storefront.sh exists" "[ -f 'scripts/manage-storefront.sh' ]"
check_item "Scripts are executable" "[ -x 'scripts/setup-storefront.sh' ]"

echo ""

# Check dependencies
echo -e "${YELLOW}📦 Checking Dependencies${NC}"
check_item "node_modules exists" "[ -d 'node_modules' ]"
check_item "yarn.lock exists" "[ -f 'yarn.lock' ]"

if [ -f "package.json" ]; then
    check_item "Next.js dependency" "grep -q '\"next\"' package.json"
    check_item "Medusa SDK dependency" "grep -q '@medusajs/js-sdk' package.json"
    check_item "React dependency" "grep -q '\"react\"' package.json"
fi

echo ""

# Check configuration files
echo -e "${YELLOW}⚙️  Checking Configuration${NC}"
check_item "Environment file exists" "[ -f '.env.local' ] || [ -f '.env.production' ]"

if [ -f "ecosystem.config.js" ]; then
    check_item "PM2 config exists" "[ -f 'ecosystem.config.js' ]"
    check_item "PM2 config is valid" "node -c ecosystem.config.js 2>/dev/null"
else
    echo "  PM2 config exists... ${YELLOW}⚠️  (Run setup first)${NC}"
fi

echo ""

# Check environment variables
if [ -f ".env.local" ] || [ -f ".env.production" ]; then
    echo -e "${YELLOW}🔐 Checking Environment Variables${NC}"
    
    # Load environment
    if [ -f ".env.production" ]; then
        source .env.production
    else
        source .env.local
    fi
    
    check_item "MEDUSA_BACKEND_URL set" "[ -n '$MEDUSA_BACKEND_URL' ]"
    check_item "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY set" "[ -n '$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY' ]"
    check_item "NEXT_PUBLIC_BASE_URL set" "[ -n '$NEXT_PUBLIC_BASE_URL' ]"
    check_item "NEXT_PUBLIC_DEFAULT_REGION set" "[ -n '$NEXT_PUBLIC_DEFAULT_REGION' ]"
    
    echo ""
fi

# Check build
echo -e "${YELLOW}🔨 Checking Build${NC}"
check_item "Build directory exists" "[ -d '.next' ]"

if [ -d ".next" ]; then
    check_item "Build is recent" "find .next -name 'BUILD_ID' -mtime -1 | grep -q ."
fi

echo ""

# Check health endpoint
echo -e "${YELLOW}🏥 Checking Health Endpoint${NC}"
check_item "Health route exists" "[ -f 'src/app/api/health/route.ts' ]"

echo ""

# Final validation result
if [ "$VALIDATION_PASSED" = true ]; then
    echo -e "${GREEN}🎉 All validations passed!${NC}"
    echo -e "${GREEN}✨ Your Kabiki storefront setup is ready for deployment.${NC}"
    echo ""
    echo -e "${BLUE}📋 Next Steps:${NC}"
    echo "1. Run setup if not done: yarn setup"
    echo "2. Deploy the application: yarn deploy"
    echo "3. Test the deployment: yarn test-deployment"
    echo ""
else
    echo -e "${RED}❌ Some validations failed!${NC}"
    echo -e "${YELLOW}Please address the issues above before proceeding with deployment.${NC}"
    echo ""
    echo -e "${BLUE}📋 Common Solutions:${NC}"
    echo "1. Install missing tools (Node.js, Yarn, PM2)"
    echo "2. Run 'yarn install' to install dependencies"
    echo "3. Run 'yarn setup' to configure the environment"
    echo "4. Run 'yarn build' to create the build"
    echo ""
    exit 1
fi