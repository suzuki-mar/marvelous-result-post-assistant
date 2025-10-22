import { type HourDateTime } from '../domains/HourDateTime'
import type { PrefectureType } from './value-objects'

export type EventMatchType = {
  name: string
  order: string
}

export type EventEntityType = {
  id: string
  title: string
  hostingPrefecture: PrefectureType
  matches: Array<EventMatchType> | null
  eventDatetime: HourDateTime
  createdAt: Date
}

export type EventPreRegisterType = Omit<EventEntityType, 'id' | 'createdAt'>

export type { PrefectureType }
