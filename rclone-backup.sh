#!/bin/bash

# Samarth Foundation Trust — Daily Backup Script
# Archives JSON databases (/data) and media uploads (/uploads),
# maintains a 30-day local history, and mirrors archives to rclone.

BACKUP_DIR="./backups"
RETENTION_DAYS=30
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
ARCHIVE_NAME="samarth_backup_$TIMESTAMP.zip"

# Ensure backup destination exists
mkdir -p "$BACKUP_DIR"

echo "Starting Samarth Foundation archive utility at $TIMESTAMP..."

# Compress directories
zip -r "$BACKUP_DIR/$ARCHIVE_NAME" ./data ./uploads

# Sync to cloud remote (requires 'samarth-cloud' config profile on the server)
if command -v rclone &> /dev/null; then
  echo "Mirroring archive to remote cloud storage..."
  rclone copy "$BACKUP_DIR/$ARCHIVE_NAME" samarth-cloud:backups
else
  echo "[WARNING] rclone command not found. Skipping remote mirror."
fi

# Clean up local archives older than 30 days
find "$BACKUP_DIR" -type f -name "samarth_backup_*.zip" -mtime +$RETENTION_DAYS -delete

echo "Backup complete. Retained local files updated."
