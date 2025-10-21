import { z } from 'zod'
import { PREFECTURES } from './value-objects'
import type { EventEntityType, EventMatchType, EventPreRegisterType } from '.'

export const EventMatchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, '試合名は1文字以上で入力してください')
    .max(50, '試合名は50文字以内で入力してください'),
  order: z
    .string()
    .trim()
    .min(1, '試合順は必須です')
    .max(10, '試合順は10文字以内で入力してください'),
}) satisfies z.ZodType<EventMatchType>

export const EventSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .trim()
    .min(4, 'タイトルは4文字以上で入力してください')
    .max(30, 'タイトルは30文字以内で入力してください'),
  hostingPrefecture: z.enum(PREFECTURES),
  matches: z.array(EventMatchSchema).nullable(),
  createdAt: z.date(),
}) satisfies z.ZodType<EventEntityType>

export const EventPreRegisterSchema = EventSchema.omit({
  id: true,
  createdAt: true,
}) satisfies z.ZodType<EventPreRegisterType>
