import { type z } from 'zod'
import type { Result, AppError } from '@/result'

export type ValidationErrorOnly = Extract<AppError, { kind: 'ValidationError' }>

export function validate<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  value: z.input<TSchema>,
): Result<z.output<TSchema>, ValidationErrorOnly> {
  const result = schema.safeParse(value)

  if (!result.success) {
    const message = result.error.issues.map((e) => e.message).join(', ')
    return { status: 'error', error: { kind: 'ValidationError', message } }
  }
  return { status: 'ok', value: result.data }
}
