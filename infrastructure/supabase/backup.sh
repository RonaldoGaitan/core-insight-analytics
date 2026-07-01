#!/bin/bash

# Supabase Database Backup Script
# This script creates automated backups of the Supabase database

# Configuration
DB_HOST="${DB_HOST:-db.psozdkkyjztfveghayfq.supabase.co}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-postgres}"
DB_USER="${DB_USER:-postgres}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/supabase_backup_${TIMESTAMP}.sql"
RETENTION_DAYS=7

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

echo "Starting backup at $(date)"

# Create backup using pg_dump
PGPASSWORD="${DB_PASSWORD}" pg_dump \
  -h "${DB_HOST}" \
  -p "${DB_PORT}" \
  -U "${DB_USER}" \
  -d "${DB_NAME}" \
  --format=plain \
  --no-owner \
  --no-acl \
  --verbose \
  > "${BACKUP_FILE}"

if [ $? -eq 0 ]; then
  echo "Backup completed successfully: ${BACKUP_FILE}"
  
  # Compress the backup
  gzip "${BACKUP_FILE}"
  echo "Backup compressed: ${BACKUP_FILE}.gz"
  
  # Remove old backups (retention policy)
  find "${BACKUP_DIR}" -name "supabase_backup_*.sql.gz" -mtime +${RETENTION_DAYS} -delete
  echo "Removed backups older than ${RETENTION_DAYS} days"
  
  # Upload to cloud storage (optional - uncomment and configure)
  # aws s3 cp "${BACKUP_FILE}.gz" s3://your-backup-bucket/
  
else
  echo "Backup failed!"
  exit 1
fi

echo "Backup process completed at $(date)"
