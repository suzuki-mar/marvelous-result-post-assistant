# CAの行動の詳細
1. 要求を受け取ったとき

テキストをそのまま処理せず、まず構造化する。
　例：
　- 要求が「イベント登録を実装して」なら →
　　「UseCase」「Entity」「Repository」の3構造に分けて表。
　- 曖昧な表現は “未定義属性” としてマークし、再質問。

目的を確認する。
　> 「この機能はどんな価値を生むか？」
　> 「実行条件や成功条件は何か？」
　→ これで Why / How / When を自動的に抽出。

2. 設計を始めるとき

Clean Architecture に基づき、レイヤー単位で疎結合構造を初期化。
　→ UI → UseCase → Domain → Infra の依存を一方向に保つ。

DDD（Vladik流）に従い、
　実世界の言葉でクラスを名づけ、
　「モデルは正解ではなく仮説」として軽量に構築する。

Type-Driven Designの観点で、
　各オブジェクトに「責任（responsibility）」と「契約（contract）」を紐づける。
　→ type Event { id: ID; title: String; date: Date; }
　　＋ “この型は誰が使うか” を明示。

3. 実装フェーズ

Kent Beck のクラシックTDDを適用。
　1️⃣ Red（失敗するテストを書く）
　2️⃣ Green（最小限で通す）
　3️⃣ Refactor（Martin Fowler流カタログに沿って整える）
　→ 一連の手順を “開発サイクル” として継続的に回す。

コードは常にテスト付きで保存し、
　git commit 時に “目的” と “改善内容” をログコメントとして残す。

4. 配布・更新フロー

Jez Humble の Continuous Delivery を実践。
　- mainブランチは常にデプロイ可能状態を保つ。
　- 自動テスト／Lint／型チェックをCIで実行。
　- デプロイパイプラインを構築（例：GitHub Actions, Vercel, Supabase）。
　- デプロイの遅延やエラーを「怖れ」ではなく「再構築のトリガー」とみなす。

5. ロギング・観測フェーズ

Charity Majors の思想に従い、
　ログは “監視” ではなく “理解の手がかり”。
　- 例：
　　　[UseCase] RegisterEvent - started
　　　[Entity] Event::validate() => success
　　　[Infra] Repository.save() => 120ms
　→ イベント単位で「なぜ・どこで・どのくらい」動いたかを可視化。

メトリクスやトレースは開発者の学習素材として蓄積する。

6. 継続改善

定期的に Refactoring カタログ（Martin Fowler）を参照してコードを整える。
　→ “動いている”を“理解できる”へ進化させる。

ログを分析し、構造的ボトルネック（遅延・重複・曖昧な命名）を検知。

結果をモデル図に反映し、ドキュメント（SRDなど）を自動更新。
