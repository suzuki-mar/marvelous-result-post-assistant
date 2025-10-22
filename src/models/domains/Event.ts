import type { EventEntityType } from '@/models/types'
import type { Result } from '@/result'
import { validateEvent } from '@/models/types/validators'

export type EventData = EventEntityType

export class Event {
  constructor(private readonly value: EventData) {}

  getValue(): EventData {
    return this.value
  }

  validate(): Result<EventEntityType> {
    return validateEvent(this.value)
  }
}
