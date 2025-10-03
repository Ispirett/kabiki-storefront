#!/bin/bash

# Kabiki Storefront Management Script
# This script provides easy management commands for the storefront

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

APP_NAME="kabiki-storefront"

show_help() {
    echo -e "${BLUE}Kabiki Storefront Management Script${NC}"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo -e "${YELLOW}Commands:${NC}"
    echo "  start       Start the storefront"
    echo "  stop        Stop the storefront"
    echo "  restart     Restart the storefront"
    echo "  status      Show application status"
    echo "  logs        Show application logs"
    echo "  monitor     Open PM2 monitor"
    echo "  health      Check application health"
    echo "  deploy      Deploy the application"
    echo "  test        Run deployment tests"
    echo "  backup      Create a backup"
    echo "  restore     Restore from backup"
    echo "  update      Update dependencies and rebuild"
    echo "  cleanup     Clean up old logs and backups"
    echo "  help        Show this help message"
    echo ""
}

check_pm2() {
    if ! command -v pm2 >/dev/null 2>&1; then
        echo -e "${RED}❌ PM2 is not installed${NC}"
        exit 1
    fi
}

get_app_status() {
    pm2 jlist | jq -r ".[] | select(.name==\"$APP_NAME\") | .pm2_env.status" 2>/dev/null || echo "not_found"
}

start_app() {
    echo -e "${YELLOW}🚀 Starting $APP_NAME...${NC}"
    
    status=$(get_app_status)
    if [ "$status" = "online" ]; then
        echo -e "${GREEN}✅ Application is already running${NC}"
        return 0
    fi
    
    if [ ! -f "ecosystem.config.js" ]; then
        echo -e "${RED}❌ PM2 configuration not found${NC}"
        echo -e "${YELLOW}Please run ./scripts/setup-storefront.sh first${NC}"
        exit 1
    fi
    
    pm2 start ecosystem.config.js
    echo -e "${GREEN}✅ Application started successfully${NC}"
}

stop_app() {
    echo -e "${YELLOW}🛑 Stopping $APP_NAME...${NC}"
    
    status=$(get_app_status)
    if [ "$status" = "not_found" ] || [ "$status" = "stopped" ]; then
        echo -e "${YELLOW}⚠️  Application is not running${NC}"
        return 0
    fi
    
    pm2 stop $APP_NAME
    echo -e "${GREEN}✅ Application stopped successfully${NC}"
}

restart_app() {
    echo -e "${YELLOW}🔄 Restarting $APP_NAME...${NC}"
    
    status=$(get_app_status)
    if [ "$status" = "not_found" ]; then
        echo -e "${YELLOW}⚠️  Application not found, starting instead...${NC}"
        start_app
        return 0
    fi
    
    pm2 restart $APP_NAME
    echo -e "${GREEN}✅ Application restarted successfully${NC}"
}

show_status() {
    echo -e "${BLUE}📊 Application Status${NC}"
    echo ""
    
    status=$(get_app_status)
    case $status in
        "online")
            echo -e "${GREEN}✅ Status: Running${NC}"
            ;;
        "stopped")
            echo -e "${YELLOW}⚠️  Status: Stopped${NC}"
            ;;
        "errored")
            echo -e "${RED}❌ Status: Error${NC}"
            ;;
        "not_found")
            echo -e "${RED}❌ Status: Not Found${NC}"
            ;;
        *)
            echo -e "${YELLOW}⚠️  Status: Unknown ($status)${NC}"
            ;;
    esac
    
    echo ""
    pm2 status $APP_NAME 2>/dev/null || echo -e "${RED}No PM2 process found${NC}"
}

show_logs() {
    echo -e "${BLUE}📋 Application Logs${NC}"
    echo ""
    
    if [ "$1" = "--follow" ] || [ "$1" = "-f" ]; then
        pm2 logs $APP_NAME --lines 50
    else
        pm2 logs $APP_NAME --lines 100 --nostream
    fi
}

monitor_app() {
    echo -e "${BLUE}📊 Opening PM2 Monitor${NC}"
    pm2 monit
}

check_health() {
    echo -e "${BLUE}🏥 Health Check${NC}"
    echo ""
    
    # Load environment to get base URL
    if [ -f ".env.production" ]; then
        source .env.production
    elif [ -f ".env.local" ]; then
        source .env.local
    else
        echo -e "${RED}❌ No environment configuration found${NC}"
        exit 1
    fi
    
    BASE_URL=${NEXT_PUBLIC_BASE_URL:-"http://localhost:8000"}
    
    echo -e "${YELLOW}Testing health endpoint...${NC}"
    if curl -s --max-time 10 "$BASE_URL/api/health" | grep -q "ok\|healthy\|success"; then
        echo -e "${GREEN}✅ Health check passed${NC}"
    else
        echo -e "${RED}❌ Health check failed${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}Testing main page...${NC}"
    if curl -s --max-time 15 "$BASE_URL" | grep -q "<!DOCTYPE html\|<html"; then
        echo -e "${GREEN}✅ Main page accessible${NC}"
    else
        echo -e "${RED}❌ Main page not accessible${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}🎉 All health checks passed!${NC}"
}

create_backup() {
    echo -e "${YELLOW}📦 Creating backup...${NC}"
    
    backup_dir="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    # Backup build
    if [ -d ".next" ]; then
        cp -r .next "$backup_dir/"
        echo -e "${GREEN}✅ Build backed up${NC}"
    fi
    
    # Backup environment files
    for env_file in .env.production .env.local; do
        if [ -f "$env_file" ]; then
            cp "$env_file" "$backup_dir/"
        fi
    done
    
    # Backup PM2 configuration
    if pm2 list | grep -q "$APP_NAME"; then
        pm2 jlist > "$backup_dir/pm2_processes.json"
        echo -e "${GREEN}✅ PM2 configuration backed up${NC}"
    fi
    
    echo -e "${GREEN}✅ Backup created at $backup_dir${NC}"
}

restore_backup() {
    echo -e "${YELLOW}📦 Available backups:${NC}"
    
    if [ ! -d "backups" ] || [ -z "$(ls -A backups 2>/dev/null)" ]; then
        echo -e "${RED}❌ No backups found${NC}"
        exit 1
    fi
    
    ls -la backups/
    echo ""
    echo -e "${BLUE}Enter backup directory name to restore:${NC}"
    read -p "> " backup_name
    
    backup_path="backups/$backup_name"
    if [ ! -d "$backup_path" ]; then
        echo -e "${RED}❌ Backup not found: $backup_path${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}🔄 Restoring from $backup_path...${NC}"
    
    # Stop application
    stop_app
    
    # Restore build
    if [ -d "$backup_path/.next" ]; then
        rm -rf .next
        cp -r "$backup_path/.next" .
        echo -e "${GREEN}✅ Build restored${NC}"
    fi
    
    # Restore environment files
    for env_file in .env.production .env.local; do
        if [ -f "$backup_path/$env_file" ]; then
            cp "$backup_path/$env_file" .
        fi
    done
    
    # Start application
    start_app
    
    echo -e "${GREEN}✅ Restore completed${NC}"
}

update_app() {
    echo -e "${YELLOW}🔄 Updating application...${NC}"
    
    # Create backup first
    create_backup
    
    # Update dependencies
    echo -e "${YELLOW}📦 Updating dependencies...${NC}"
    yarn install --frozen-lockfile
    
    # Rebuild application
    echo -e "${YELLOW}🔨 Rebuilding application...${NC}"
    yarn build
    
    # Restart application
    restart_app
    
    echo -e "${GREEN}✅ Update completed${NC}"
}

cleanup() {
    echo -e "${YELLOW}🧹 Cleaning up...${NC}"
    
    # Clean old logs (keep last 7 days)
    if [ -d "logs" ]; then
        find logs -name "*.log" -mtime +7 -delete 2>/dev/null || true
        echo -e "${GREEN}✅ Old logs cleaned${NC}"
    fi
    
    # Clean old backups (keep last 10)
    if [ -d "backups" ]; then
        backup_count=$(ls -1 backups | wc -l)
        if [ "$backup_count" -gt 10 ]; then
            ls -1t backups | tail -n +11 | xargs -I {} rm -rf "backups/{}"
            echo -e "${GREEN}✅ Old backups cleaned${NC}"
        fi
    fi
    
    # Clean PM2 logs
    pm2 flush $APP_NAME 2>/dev/null || true
    
    echo -e "${GREEN}✅ Cleanup completed${NC}"
}

# Main script logic
if [ $# -eq 0 ]; then
    show_help
    exit 0
fi

check_pm2

case $1 in
    start)
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        restart_app
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs $2
        ;;
    monitor)
        monitor_app
        ;;
    health)
        check_health
        ;;
    deploy)
        ./scripts/deploy.sh "${@:2}"
        ;;
    test)
        ./scripts/test-deployment.sh
        ;;
    backup)
        create_backup
        ;;
    restore)
        restore_backup
        ;;
    update)
        update_app
        ;;
    cleanup)
        cleanup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac