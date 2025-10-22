import type { EventEntityType, PrefectureType } from '@/models/types'

type EventFormBaseFields = Omit<EventEntityType, 'id' | 'createdAt'>

export type EventFormPmType = Omit<EventFormBaseFields, 'hostingPrefecture'> & {
  hostingPrefecture: PrefectureType | ''
  scheduledAtInput: string
} // 大会だけ登録をする場合があるためmatchesはnullableのまま維持する

export class EventFormPm {
  private state: EventFormPmType = {
    title: '',
    scheduledAtInput: '',
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
