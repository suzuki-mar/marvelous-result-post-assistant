## Supabase テスト環境の変数読み込み

Vitest では Next.js の `.env` ローダーが動作しないため、テスト用の環境変数は `dotenv` と `dotenv-expand` を使って `vitest.config.ts` で読み込む。

```ts
import { config as loadEnv } from 'dotenv'
import { expand } from 'dotenv-expand'

const result = loadEnv({ path: '.env.test' })
expand(result)
```

`.env.test` が存在しない場合は `.env.local` をフォールバックとして使用する。

### `.env.test` のサンプル

```
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
TEST_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
TEST_SUPABASE_SERVICE_ROLE_KEY=replace-with-service-role-key
```

`dotenv-expand` によって `${NEXT_PUBLIC_SUPABASE_URL}` が展開され、`TEST_SUPABASE_URL` へ反映される。CI では `env` を直接注入するか、`.env.test` を用意する。
