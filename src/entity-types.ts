export type EventMatchType = {
  name: string
  order: string
}

export type EventEntityType = {
  id: string
  title: string
  scheduledAt: Date
  hostingPrefecture: string
  hostingVenueDetail: string
  matches: Array<EventMatchType> | null
  createdAt: Date
}
