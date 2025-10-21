-- ===========================================
-- 🧱 Migration: create_events_table
-- ===========================================

create table if not exists public.events (
  id uuid primary key,
  title text not null,
  scheduled_at timestamptz not null,
  hosting_prefecture text not null,
  hosting_venue_detail text not null,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

grant usage on schema public to service_role;
grant select, insert, update, delete on public.events to service_role;

do
$$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'events' and policyname = 'events_service_inserts'
  ) then
    create policy events_service_inserts on public.events
      for insert to service_role
      with check (true);
  end if;
end
$$;
