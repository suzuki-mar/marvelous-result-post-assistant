-- ===========================================
-- 🧱 Migration: create_reset_test_data_function
-- ===========================================

set check_function_bodies = off;

create or replace function public.reset_test_data()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  truncate table public.events restart identity cascade;
end;
$$;

revoke all on function public.reset_test_data() from public;
grant execute on function public.reset_test_data() to service_role;

comment on function public.reset_test_data() is
'テスト実行前に events を TRUNCATE し関連テーブルも cascade で初期化する。';
