import type { Result } from '@/result'
import type { EventPreRegisterType } from '.'
import { EventPreRegisterSchema } from './entity-schemas'
import { validate, type ValidationErrorOnly } from './validator-helpers/validate'

export function validateEvent(
  value: EventPreRegisterType,
): Result<EventPreRegisterType, ValidationErrorOnly> {
  return validate(EventPreRegisterSchema, value)
}
