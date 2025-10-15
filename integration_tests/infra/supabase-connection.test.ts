import { describe, it, expect } from 'vitest'
import { createClient } from '@supabase/supabase-js'

// ✅ Supabaseクライアントを作成
const supabase = createClient(
  process.env.TEST_SUPABASE_URL!,
  process.env.TEST_SUPABASE_SERVICE_ROLE_KEY!,
)

describe('Supabase 接続テスト', () => {
  it('events テーブルからデータを取得できる', async () => {
    const { data, error } = await supabase.from('events').select('*')

    expect(error).toBeNull()
    expect(Array.isArray(data)).toBe(true)
  })
})
