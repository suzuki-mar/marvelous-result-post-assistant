#!/usr/bin/env bash
set -e

echo "📋 public スキーマ内のテーブル一覧を表示します..."
echo "----------------------------------------"

psql 'postgresql://postgres:postgres@127.0.0.1:54322/postgres' <<'SQL'
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
SQL

echo "----------------------------------------"
echo "✅ テーブル一覧の表示が完了しました。"
