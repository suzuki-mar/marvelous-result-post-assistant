import type { EventEntityType } from '@/entity-types'

export type EventData = EventEntityType

export class Event {
  constructor(private readonly props: EventData) {}

  getValue(): EventData {
    return this.props
  }
}
