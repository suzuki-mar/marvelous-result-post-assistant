import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type SupabaseEnvironment = 'test' | 'production'

type SupabaseConfig = {
  url: string
  serviceRoleKey: string
}

export function createSupabaseClient(
  env: SupabaseEnvironment = _detectEnvironment(),
): SupabaseClient {
  const config = _resolveConfig(env)

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
    },
  })
}

function _detectEnvironment(): SupabaseEnvironment {
  return process.env.VITEST === 'true' ? 'test' : 'production'
}

function _resolveConfig(env: SupabaseEnvironment): SupabaseConfig {
  if (env === 'test') {
    return {
      url: _requireEnv('TEST_SUPABASE_URL'),
      serviceRoleKey: _requireEnv('TEST_SUPABASE_SERVICE_ROLE_KEY'),
    }
  }

  return {
    url: _requireEnv('PROD_SUPABASE_URL'),
    serviceRoleKey: _requireEnv('PROD_SUPABASE_SERVICE_ROLE_KEY'),
  }
}

function _requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`)
  }
  return value
}
