#!/bin/bash

# Supabase Database Restore Script
# This script restores a database from a backup file

# Configuration
DB_HOST="${DB_HOST:-db.psozdkkyjztfveghayfq.supabase.co}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-postgres}"
DB_USER="${DB_USER:-postgres}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"

# Check if backup file is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <backup_file.sql.gz>"
  echo "Available backups:"
  ls -lh "${BACKUP_DIR}"/supabase_backup_*.sql.gz 2>/dev/null || echo "No backups found"
  exit 1
fi

BACKUP_FILE="$1"

# Check if backup file exists
if [ ! -f "${BACKUP_FILE}" ]; then
  echo "Error: Backup file not found: ${BACKUP_FILE}"
  exit 1
fi

echo "WARNING: This will restore the database from backup."
echo "This will overwrite existing data!"
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "Restore cancelled."
  exit 0
fi

echo "Starting restore at $(date)"

# Decompress if needed
if [[ "${BACKUP_FILE}" == *.gz ]]; then
  echo "Decompressing backup..."
  gunzip -c "${BACKUP_FILE}" > /tmp/restore_temp.sql
  RESTORE_FILE="/tmp/restore_temp.sql"
else
  RESTORE_FILE="${BACKUP_FILE}"
fi

# Restore database
PGPASSWORD="${DB_PASSWORD}" psql \
  -h "${DB_HOST}" \
  -p "${DB_PORT}" \
  -U "${DB_USER}" \
  -d "${DB_NAME}" \
  -f "${RESTORE_FILE}"

if [ $? -eq 0 ]; then
  echo "Restore completed successfully!"
  
  # Clean up temp file
  if [ -f "/tmp/restore_temp.sql" ]; then
    rm /tmp/restore_temp.sql
  fi
else
  echo "Restore failed!"
  exit 1
fi

echo "Restore process completed at $(date)"
