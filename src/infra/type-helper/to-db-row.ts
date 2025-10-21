/* eslint-disable @typescript-eslint/no-explicit-any */
// 型レベル変換の内部実装で any を使用しているため、 ESLint ルールを無効化しています。

/**
 * --------------------------------------------------------------------------
 * to-db-row.ts
 * --------------------------------------------------------------------------
 *
 * 目的:
 *   ドメイン層の Entity 型を、データベース保存用の Row 型に変換するためのユーティリティ。
 *
 * 変換ルール:
 *   - プロパティ名を camelCase → snake_case に変換
 *   - Date 型を string（ISO形式）に変換
 *   - Array 型や Array | null 型のプロパティは原則除外（DBに配列は持たせない）
 *   - JSONB カラムとして保持したい場合のみ、明示的に指定して残す
 *   - 特定のプロパティを除外したい場合は OmitKeys で指定可能
 *
 * 典型的な使い方:
 *   import type { ToDBRow } from '@/models/type-helpers/to-db-row'
 *   import type { EventEntityType } from '@/models/entity-types'
 *
 *   export type EventRow = ToDBRow<EventEntityType>
 *   export type EventRowJsonb = ToDBRow<EventEntityType, 'matches'>
 *
 * 注意点:
 *   - このユーティリティは infra 層（永続化用）でのみ使用する
 *   - Domain 層では使用しない（語彙の汚染防止）
 *   - export されるのは ToDBRow のみ。他の型は内部実装
 *   - WebSustainMVC の「単一責務・読みやすい構造」を保つ設計
 *
 * 変換例:
 *   // Domain 側の Entity 定義（例）
 *   type EventEntity = {
 *     id: string
 *     title: string
 *     hostingPrefecture: string
 *     matches: Match[] | null
 *     createdAt: Date
 *   }
 *
 *   // 1) 基本的な変換
 *   type EventRow = ToDBRow<EventEntity>
 *
 *   // 変換結果:
 *   // {
 *   //   id: string
 *   //   title: string
 *   //   hosting_prefecture: string
 *   //   created_at: string
 *   // }
 *
 *   // 2) JSONBを使用して matches を保持したい場合
 *   type EventRowJsonb = ToDBRow<EventEntity, 'matches'>
 *
 *   // 変換結果:
 *   // {
 *   //   id: string
 *   //   title: string
 *   //   hosting_prefecture: string
 *   //   matches: Match[]
 *   //   created_at: string
 *   // }
 * --------------------------------------------------------------------------
 */

/* -------------------------------------------------------------------------- */
/* 内部実装型（非公開）                                                     */
/* -------------------------------------------------------------------------- */

/** camelCase → snake_case 変換 */
type CamelToSnake<S extends string> = S extends `${infer H}${infer T}`
  ? T extends Uncapitalize<T>
    ? `${Lowercase<H>}${CamelToSnake<T>}`
    : `${Lowercase<H>}_${CamelToSnake<Uncapitalize<T>>}`
  : S

/** never を除外してクリーンな型に整える */
type DropNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}

/** DB保存用に型を変換（Date→string, Array除外, snake_case化） */
type SnakeCaseKeys<T, KeepArrayKeys extends keyof any = never> = {
  [K in keyof T as CamelToSnake<Extract<K, string>>]: T[K] extends Date // Date → string
    ? string
    : // Arrayを含む型（null含む）→原則除外。Keep指定時のみ残す
      Extract<T[K], ReadonlyArray<any>> extends never
      ? T[K]
      : K extends KeepArrayKeys
        ? NonNullable<T[K]> // JSONB保持時はnull除去
        : never
}

/* -------------------------------------------------------------------------- */
/* 公開型: ToDBRow                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Domain Entity → DB Row 変換型
 *
 * @typeParam T - 変換対象の Entity 型
 * @typeParam KeepArrayKeys - JSONB として保持したい配列プロパティ名（例: 'matches'）
 * @typeParam OmitKeys - 明示的に除外したいプロパティ名
 */
export type ToDBRow<
  T,
  KeepArrayKeys extends keyof any = never,
  OmitKeys extends keyof any = never,
> = Omit<DropNever<SnakeCaseKeys<T, KeepArrayKeys>>, OmitKeys>
