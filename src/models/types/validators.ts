import type { Result } from '@/result'
import type { EventEntityType, EventPreRegisterType } from '.'
import { EventSchema, EventPreRegisterSchema } from './entity-schemas'
import { validate, type ValidationErrorOnly } from './validator-helpers/validate'

export function validatePreEvent(
  value: EventPreRegisterType,
): Result<EventPreRegisterType, ValidationErrorOnly> {
  return validate(EventPreRegisterSchema, value)
}

export function validateEvent(
  value: EventEntityType,
): Result<EventEntityType, ValidationErrorOnly> {
  return validate(EventSchema, value)
}
