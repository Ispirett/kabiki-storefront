#!/bin/bash

# Production build script for Kabiki Storefront
set -e

echo "🚀 Starting production build for Kabiki Storefront..."

# Check if we're running as root (common in production)
if [ "$EUID" -eq 0 ]; then
    echo "⚠️  Running as root - this is common in production environments"
fi

# Clean any existing build artifacts
echo "🧹 Cleaning existing build artifacts..."
rm -rf .next
rm -rf node_modules/.cache

# Method 1: Try with npm (recommended)
echo "📦 Attempting build with npm..."
if command -v npm &> /dev/null; then
    echo "Using npm for installation and build..."
    npm ci --production=false
    npm run build
    echo "✅ Build completed successfully with npm!"
    exit 0
fi

# Method 2: Fallback to yarn with fixes
echo "📦 Falling back to yarn..."
if command -v yarn &> /dev/null; then
    echo "Cleaning yarn cache..."
    yarn cache clean
    
    echo "Removing lockfile and node_modules..."
    rm -f yarn.lock
    rm -rf node_modules
    
    echo "Fresh yarn install..."
    yarn install
    
    echo "Building with yarn..."
    yarn build
    
    echo "✅ Build completed successfully with yarn!"
    exit 0
fi

echo "❌ Neither npm nor yarn found. Please install a package manager."
exit 1