はい、見出しを正しい Markdown 構造に整えたバージョンはこちらです👇

---

# 実行基盤の前提

常駐 **Node.js ランタイム**で Server Actions / Route Handlers が同一プロセス内で動作し、UseCase と Domain を **プロセス内呼び出し** で連結すること。
通信越しの責務呼び出しは設計上禁止。

---

# 実行基盤の選定（Vercel + Supabase）

## 採用理由 — Vercel（アプリ実行）

- Server Action 正式対応（Next.js 公式基盤）
- インフラ管理不要（スケール・証明書・CDN 最適化）
- Node ランタイムの安定性／Edge 配信の自動最適化

## 採用理由 — Supabase（永続化）

- PostgreSQL マネージド（スキーマ・制約・Tx 設計が可能）
- Server Action 内から直接 SDK 利用可（構造内に閉じる）
- Auth／Storage を同一基盤で提供（infra 集約）

---

# 外部依存の取り扱い

| 対象     | 実装層                    | 指針                                                    |
| -------- | ------------------------- | ------------------------------------------------------- |
| DB       | `infra/repositories_impl` | 抽象 Repo を実装。物理一意制約・例外型標準化            |
| 外部 API | `infra/services`          | クライアント実装を隔離。再試行・タイムアウト方針        |
| 認証     | `usecases → infra`        | 抽象 AuthService 経由で扱う（Server Action 入口で付与） |

---

# 通知・リマインダー基盤（Web Push）

- Server Action／UseCase でスケジュール生成。
- `infra` の `WebPushNotifier` が VAPID 署名で Push 送信。
- ブラウザの Service Worker が受信し OS 通知を表示。
- Firebase Cloud Messaging へ依存せず、**Node 環境内で自己完結**。

---

# セキュリティと運用

- **Secrets/Env** は Vercel の環境変数管理で注入。ローカルは `.env.local` を使用。
- **DB 権限** は最小権限・ローテーションを徹底。監査ログを有効化。
- **監視**：アプリ（Vercel Analytics）＋ DB（Supabase Studio）を最低限とし、障害時はロールバック PR を即時用意。

---

# まとめ（インフラ観点の要点）

- Node 常駐基盤上で Server Action を中核に **責務連鎖をプロセス内で完結**。
- 永続化・認証・外部 API は infra に **閉じ込める**。差し替え容易性と運用負荷の最小化を両立。
- 通知は Web Push を採用し、**人の最終判断を前提とした運用を支援**。
