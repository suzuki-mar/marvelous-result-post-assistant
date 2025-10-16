-- ===========================================
-- 🧱 Migration: add_matches_table
-- Created: Thu Oct 16 09:48:17 JST 2025
-- ===========================================

-- 🔧 Write your SQL below (PostgreSQL syntax)
-- Example:
-- create table public.sample (
--   id uuid primary key default gen_random_uuid(),
--   created_at timestamptz default now()
-- );

-- ===========================================
-- 🧱 Migration: add_matches_table
-- Created: 2025-10-16
-- ===========================================

-- 🔸 既に同名の型・テーブルが存在する場合はスキップ
do $$
begin
  if not exists (select 1 from pg_type where typname = 'match_order_type') then
    create type match_order_type as enum (
      '1','2','3','4','5','6','7','8','9','SEMI','MAIN'
    );
  end if;
end $$;

-- 🔸 matchesテーブルを作成
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null,
  card_title text not null,
  match_order match_order_type not null,
  created_at timestamptz default now(),

  constraint fk_event
    foreign key (event_id)
    references public.events (id)
    on update no action
    on delete cascade,

  constraint unique_event_order
    unique (event_id, match_order)
);

-- 🔸 コメント（description）
comment on table public.matches is
'大会(Event)内の各試合を表すテーブル。対戦カード名と試合順を保持する。';
comment on column public.matches.id is '試合ID（UUID）';
comment on column public.matches.event_id is '所属大会のID（events.idへの外部キー）';
comment on column public.matches.card_title is '対戦カード名。対戦カードは様々な組み合わせに対応するため非正規化して保持している（例：彩羽匠 & 桃野美桜 VS RIKO & Maria）';
comment on column public.matches.match_order is '試合順。Enum: 1〜9, SEMI, MAIN';
comment on column public.matches.created_at is '作成日時';

