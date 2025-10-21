import { beforeEach } from 'vitest'
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.test' })

const supabaseUrl = process.env.TEST_SUPABASE_URL
const serviceRoleKey = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('TEST_SUPABASE_URL もしくは TEST_SUPABASE_SERVICE_ROLE_KEY が未設定です')
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

beforeEach(async () => {
  const { error } = await supabase.rpc('reset_test_data')
  if (error) {
    console.error('❌ DBリセット失敗:', error)
    throw error
  }
})
