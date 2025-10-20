#!/usr/bin/env bash
# ===========================================
# 🧱 Supabase Migration Generator (Shell版)
# Usage:
#   ./scripts/create_migration.sh add_matches_table
# ===========================================

set -e

# マイグレーション名（例: add_matches_table）
NAME="$1"

if [ -z "$NAME" ]; then
  echo "❌ マイグレーション名を指定してください。"
  echo "   例: ./scripts/create_migration.sh add_matches_table"
  exit 1
fi

# タイムスタンプ生成（YYYYMMDDHHMMSS）
TIMESTAMP=$(date +"%Y%m%d%H%M%S")

# ディレクトリ作成
MIG_DIR="supabase/migrations"
mkdir -p "$MIG_DIR"

# ファイルパス
FILE="$MIG_DIR/${TIMESTAMP}_${NAME}.sql"

# 雛形
cat <<EOF > "$FILE"
-- ===========================================
-- 🧱 Migration: ${NAME}
-- Created: $(date)
-- ===========================================

-- 🔧 Write your SQL below (PostgreSQL syntax)
-- Example:
-- create table public.sample (
--   id uuid primary key default gen_random_uuid(),
--   created_at timestamptz default now()
-- );

EOF

echo "✅ Migration file created: $FILE"
