import type { EventEntityType, PrefectureType } from '@/models/types'

type EventFormBaseFields = Omit<EventEntityType, 'id' | 'createdAt' | 'eventDatetime'>

export type EventFormPmType = Omit<EventFormBaseFields, 'hostingPrefecture'> & {
  hostingPrefecture: PrefectureType | ''
  eventDatetimeInput: string
} // 大会だけ登録をする場合があるためmatchesはnullableのまま維持する

export class EventFormPm {
  private state: EventFormPmType = {
    title: '',
    eventDatetimeInput: '',
    hostingPrefecture: '',
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
