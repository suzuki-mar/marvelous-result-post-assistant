import path from 'path'
import { config as loadEnv, type DotenvConfigOutput } from 'dotenv'
import { expand } from 'dotenv-expand'
import { defineConfig } from 'vitest/config'

const loadEnvFile = (path: string): DotenvConfigOutput => {
  const result = loadEnv({ path })
  if (!result.error) {
    expand(result)
  }
  return result
}

const testEnvResult = loadEnvFile('.env.test')

if (testEnvResult.error) {
  loadEnvFile('.env.local')
}

const scope = process.env.TEST_SCOPE

const includePatterns = ((): Array<string> => {
  // Scope-specific selection keeps unit tests under src and integration under integration_tests.
  if (scope === 'unit') {
    return ['src/**/*.test.ts', 'src/**/*.spec.ts']
  }
  if (scope === 'integration') {
    return ['integration_tests/**/*.test.ts', 'integration_tests/**/*.spec.ts']
  }
  return ['**/*.test.ts', '**/*.spec.ts']
})()

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: includePatterns,
    exclude: ['node_modules', 'dist'],
    setupFiles: ['test/stubs/dbReset.ts'],

  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@faker-js/faker': path.resolve(__dirname, 'test/stubs/faker.ts'),
    },
  },
})
