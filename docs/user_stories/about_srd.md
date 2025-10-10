# Story Realization Diagram（SRD）ガイド for AI

### ― D2記法で書く、生成AIが理解できる設計仕様 ―

---

## 1. SRDとは何か

**SRD（Story Realization Diagram）** は、1つのユーザーストーリーを「Why / What / How / Rule / Flow」まで
**1本のD2記法ファイル** に統合して記述する設計仕様です。
人間が読んでも理解でき、生成AIが構文解析して自動生成にも使える**単一ソース設計書**が目的です。

D2 は [D2 Language](https://d2lang.com) による **テキストベースの図言語** で、
Markdown とクラス図・関係線を同じファイル内で表現できます。
SRD はこの構文をベースに、設計ドキュメント・図・コードの三者を接続します。

ファイル配置は以下のように統一します。

```
docs/usecases/<story_name>_srd.d2
```

各ユースケース（ユーザーストーリー）を1ファイル完結で管理します。

---

## 2. SRDをD2で書く理由（AIが理解しやすい構造）

| 要素            | 意味                                                 |    |                                   |
| ------------- | -------------------------------------------------- | -- | --------------------------------- |
| `container`   | セクションの論理単位。ブロックを明確に区切れるため、AIがパースしやすい。              |    |                                   |
| `shape`       | クラス図やオブジェクトの種類（class / rectangle / hexagon など）を定義。 |    |                                   |
| `+prop: Type` | プロパティと型を一行で表せる。AIはこれをクラス定義に変換可能。                   |    |                                   |
| `Enum(...)`   | 限定された選択肢。Union型・列挙型を自動生成できる。                       |    |                                   |
| Markdown (`   | md ...                                             | `) | 人間向けの説明。AIもブロック構造を維持したまま内容を抽出できる。 |

D2記法は見た目の整形と構文構造の両方を兼ねるため、
生成AIが「文」ではなく「構造」としてストーリーを理解できる点が最大の強みです。

---

## 3. SRDファイルの基本構成（8ブロック）

1. **StoryHeader** — 目的・価値・完了条件
2. **Use Case Description** — 操作手順・例外・事後条件
3. **Presentation Model Diagram** — UI状態と入力構造
4. **Domain Model Diagram** — Entity / ValueObject 構造
5. **Invariant Definition** — 不変条件・整合性ルール
6. **Robustness Diagram** — Boundary / Control / Entity の責務関係
7. **Communication Diagram** — 呼び出し順・メッセージの流れ
8. **Notes / Phase** — 開発段階・補足・備考

これらは **同一D2ファイル内に順序固定** で記述します。
AIはこの順序で情報を抽出し、UI → UseCase → Domain → Test の生成を行います。

---

## 4. 記述ルール（AIが誤読しないための約束）

* 各ブロックは `container <名前> { ... }` で囲む。
* Markdown部分には `|md` と `|` の終端を明記。
* クラス図では `shape: class` を必ず指定し、`+prop: Type` を省略しない。
* Enum型は必ず明示（`Enum(1,2,3,SEMI,MAIN)` のように）。
* 関係線は `"1..*"` / `"1"` など明確なMultiplicityを付与。
* 不変条件では「〜であってはならない」「〜でなければならない」と否定形で書く。
* container名や構文順を変更しない（AIはこれをキーに抽出する）。

---

## 5. SRDから自動生成される構造（AI側の理解）

| SRDブロック                    | 出力対象                           | 主な生成内容                        |
| -------------------------- | ------------------------------ | ----------------------------- |
| Presentation Model         | `src/models/presentation/*.ts` | FormPMクラス・状態Enum・入力検証         |
| Domain Model               | `src/models/domains/*.ts`      | Entity / VO / Repository抽象クラス |
| Invariant                  | `*_guard.ts` / TestCase        | 不変条件ガード・単体テスト                 |
| Robustness / Communication | `src/usecases/*.ts`            | UseCase / Control / 呼び出し順     |
| StoryHeader / UseCase記述    | JSDocコメント・TestDoc              | 仕様説明・シナリオ                     |
| Notes / Phase              | ADR参照ラベル・開発メモ                  | 進行状況や補足文                      |

---

## 6. SRDテンプレート（共通形式）

```d2
direction: right

container StoryHeader {
  desc: |md
    ## 🎯 Purpose
    このストーリーの目的・価値・完了条件を記述する。
  |
}

container ユースケース記述 {
  label: "Use Case Description"
  UC: |md
    ## UC-XXX: ユースケース名
    **アクター:** 主利用者  
    **メインフロー**
    1. 入力
    2. 検証
    3. ドメイン操作
    4. 永続化と応答  
    **例外フロー**
    - 入力不備 → エラー表示  
    - 一意制約違反 → 重複エラー  
    **事後条件**
    - 成功時UI更新
  |
}

container プレゼンテーションモデル {
  label: "Presentation Model Diagram"
  FormPM: { shape: class, label: "FormPM\n+ fieldA: String\n+ fieldB: Date\n+ state: Enum(INITIAL,VALIDATING,SUCCESS,ERROR)" }
}

container ドメインモデル {
  label: "Domain Model Diagram"
  EntityX: { shape: class, label: "EntityX\n+ id: ID\n+ prop: Type" }
}

container 不変条件 {
  label: "Invariant Definition"
  EntityX: |md
    ## EntityX
    - prop は空であってはならない
    - id は一意でなければならない
  |
}

container ロバストネス図 {
  label: "Robustness Diagram"
  B: { label: "《boundary》 FormPM", shape: rectangle }
  C: { label: "《control》 UseCase", shape: hexagon }
  E: { label: "《entity》 EntityX", shape: class }
  B -> C: "submit()"
  C -> E: "validateAndSave()"
  C -> B: "updateState(SUCCESS|ERROR)"
}
```

---

## 7. SRDの具体例（大会＋試合登録）

```d2
container StoryHeader {
  desc: |md
    ## 🎯 Purpose
    大会と試合を一括登録し、運営者の投稿準備を効率化する。
    完了条件: Event/Match が保存され、UI に登録完了が表示される。
  |
}
```

以降はドメインモデル・不変条件・ロバストネス図などで
`Event`, `Match`, `Venue` を定義し、試合順や会場Enumを明示する。

---

## 8. AI実装側の読み取りアルゴリズム（推奨フロー）

1. `.d2` ファイルを読み込み、`container`単位で分割。
2. `shape: class` を持つノードからクラス構造を抽出。
3. `|md` ブロックを要約してドキュメンテーションコメント生成。
4. `Event -> Match` のような矢印は関係（1対多・依存）として扱う。
5. 不変条件を`assert()`またはZodスキーマに変換。
6. ロバストネス図・コミュニケーション図をUseCase呼び出し骨格に反映。

---

## 9. SRD運用ルール

* **設計の唯一の真実（Single Source of Truth）** はSRD。
* コード・テスト・ドキュメントはいずれもSRDから生成または同期。
* 生成AIが誤認しないよう、命名・構文・順序を厳密に保つ。
* D2Studio・Cursor・Claude Code・Codex CLI などのツールで
  SRDを**直接構文解析し、設計→実装を連結**させる。

---

> SRDは「人とAIが共有できる設計言語」。
> 文章ではなく構造で仕様を伝え、変更も再生成も同じ地点から始められる。
> 設計と生成を、ひとつの `.d2` で結ぶのがこのガイドの目的です。
