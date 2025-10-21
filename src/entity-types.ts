export type EventMatchType = {
  name: string
  order: string
}

export type EventEntityType = {
  id: string
  title: string
  hostingPrefecture: string
  matches: Array<EventMatchType> | null
  createdAt: Date
}
