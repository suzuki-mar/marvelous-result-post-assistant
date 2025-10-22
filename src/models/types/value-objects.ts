import { z } from 'zod'
import { HourDateTime } from '@/models/domains/HourDateTime'

export const PREFECTURES = [
  // 北海道・東北
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',

  // 関東
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',

  // 中部
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',

  // 近畿
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',

  // 中国
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',

  // 四国
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',

  // 九州・沖縄
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
] as const

export type PrefectureType = (typeof PREFECTURES)[number]

export const PrefectureSchema = z.enum(PREFECTURES).superRefine((value, ctx) => {
  if (!PREFECTURES.includes(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '都道府県の指定が不正です',
    })
  }
})

export type HourDateTimeType = HourDateTime

export const HourDateTimeSchema = z
  .any()
  .transform((val, ctx) => {
    const toDate = (input: unknown): Date | null => {
      if (input instanceof HourDateTime) {
        return input.toDate()
      }

      if (input instanceof Date) {
        return input
      }

      if (typeof input === 'string' || typeof input === 'number') {
        const parsed = new Date(input)
        return Number.isNaN(parsed.getTime()) ? null : parsed
      }

      return null
    }

    const date = toDate(val)

    if (!date || Number.isNaN(date.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '日時の形式が不正です',
      })
      return z.NEVER
    }

    return date
  })
  .transform((date) => HourDateTime.create(date))
