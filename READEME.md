# 🎬 Marvelous Result Post Assistant (MRPA)

女子プロレス **Marvelous** の大会結果とショート動画を、ミスなく素早く届けるための**発信支援ツール**です。目的は自動投稿ではなく、**人が最終確認して安全に投稿できる状態**を一貫して用意すること。大会後の慌ただしい時間でも、文面整形・リンク生成・時刻リマインド・ワンタッチ準備までを半自動で整え、事故を防ぎます。

---

## これは何？
MRPA は「結果登録 → 通知 → ワンタッチ準備」の流れを安定化する Web アプリです。YouTube ショート連携や X（旧Twitter）向けの文面・ハッシュタグ整形を支援し、**“投稿の直前まで” を自動化**、公開の決定は人に残します。

## コンセプト
> 投稿は人が決め、準備はシステムが整える。
- 誤投稿の抑止・権限リスクの最小化  
- 多忙時でも同じ手順で進められる**再現性**  
- 設計〜実装を同一構造で往復可能にする **SRD 駆動**

## 主な機能
- 大会・会場・試合結果の登録（セミ/メイン含む順序整合）  
- 文面テンプレ整形、リンク生成、ハッシュタグ補助  
- 指定時刻に通知（Web Push）し、投稿画面をワンタッチで準備  
- 反応チェック（再生数・高評価の参照予定）

## 技術スタック / 設計
- **Next.js × WebSustainMVC** / Clean Architecture / CQRSES-Light  
- **Vercel + Supabase**（Node 常駐・Server Actions を中核にプロセス内連鎖）  
- 設計仕様は **SRD（Story Realization Diagram）** を単一の原本として管理

---

## ドキュメント
### 🗂 Product
- [docs/product/overview.md](docs/product/overview.md) — システム概要・目的  
- [docs/product/roadmap.md](docs/product/roadmap.md) — フェーズ別の開発計画

### 🏗 Architecture
- [docs/architecture/principles.md](docs/architecture/principles.md) — 基本方針（変わらない原則）  
- [docs/architecture/implementation-guide.md](docs/architecture/implementation-guide.md) — 実装ルールと構成指針  
- [docs/architecture/infra.md](docs/architecture/infra.md) — 実行基盤・運用ポリシー

### 🧩 User Stories (SRD)
- [docs/user_stories/about_srd.md](docs/user_stories/about_srd.md) — SRDの解説とテンプレート  
- [docs/user_stories/register_event_srd.d2](docs/user_stories/register_event_srd.d2) — 大会登録ストーリー

### 🤖 Agents
- [docs/agents/ca-personality.md](docs/agents/ca-personality.md) — 設計支援AI「CA」の人格定義  
- [docs/agents/ca-actions.md](docs/agents/ca-actions.md) — ふるまい・行動仕様  
- [docs/agents/human-communication.md](docs/agents/human-communication.md) — AIと人の協調ルール

---

## 現在のフェーズ
**Phase 0:** 「大会登録」機能と設計基盤（SRD/PM/UseCase）を整備中。次段で通知・ワンタッチ準備、続いて動画連携へ拡張予定です。

---

## リポジトリ方針（重要）
- **コード公開のみ**：本リポジトリは成果物の公開・記録を目的としています。  
- **コントリビュート非受付**：外部からの Issue / Pull Request は受け付けていません。議論・問い合わせには個別に対応しません。  
- **セットアップ記載なし**：詳細なセットアップ手順は提供しません。内容はアーカイブ・参照用途を想定しています。
