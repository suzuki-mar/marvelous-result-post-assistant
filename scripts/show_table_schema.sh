#!/usr/bin/env bash
set -e

# 第1引数でテーブル名を受け取る
TARGET_TABLE="$1"

# --- 出力メッセージ ---
if [ -n "$TARGET_TABLE" ]; then
  echo "📘 テーブル '${TARGET_TABLE}' のスキーマを表示します..."
else
  echo "📘 public スキーマ内の全テーブル構造を表示します..."
fi
echo "----------------------------------------"

# --- SQLをヒアドキュメントでpsqlへ渡す ---
psql 'postgresql://postgres:postgres@127.0.0.1:54322/postgres' <<SQL
SELECT
  c.table_name,
  c.column_name,
  c.data_type,
  c.is_nullable,
  c.column_default,
  i.index_name,
  i.is_unique,
  i.is_primary
FROM information_schema.columns c
LEFT JOIN (
  SELECT
    t.relname AS table_name,
    i.relname AS index_name,
    ix.indisunique AS is_unique,
    ix.indisprimary AS is_primary,
    a.attname AS column_name
  FROM pg_class t
  JOIN pg_index ix ON t.oid = ix.indrelid
  JOIN pg_class i ON i.oid = ix.indexrelid
  JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(ix.indkey)
  WHERE t.relkind = 'r'
) i
ON c.table_name = i.table_name AND c.column_name = i.column_name
WHERE c.table_schema = 'public'
$( [ -n "$TARGET_TABLE" ] && echo "AND c.table_name = '$TARGET_TABLE'" )
ORDER BY c.table_name, c.ordinal_position;
SQL

echo "----------------------------------------"
if [ -n "$TARGET_TABLE" ]; then
  echo "✅ '${TARGET_TABLE}' のスキーマを表示しました。"
else
  echo "✅ 全テーブルのスキーマを表示しました。"
fi
