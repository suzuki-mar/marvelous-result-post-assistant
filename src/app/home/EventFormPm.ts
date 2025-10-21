import type { EventEntityType } from '@/entity-types'

type EventFormBaseFields = Omit<EventEntityType, 'id' | 'scheduledAt' | 'createdAt'>

export type EventFormPmType = EventFormBaseFields & {
  scheduledAtInput: string
} // 大会だけ登録をする場合があるためmatchesはnullableのまま維持する

export class EventFormPm {
  private state: EventFormPmType = {
    title: '',
    scheduledAtInput: '',
    hostingPrefecture: '',
    hostingVenueDetail: '',
    matches: null,
  }

  constructor(private readonly data: EventFormPmType) {}

  setAll(values: Partial<EventFormPmType>): void {
    Object.assign(this.state, values)
  }

  getAll(): EventFormPmType {
    return this.state
  }
}
