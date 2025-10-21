import type { Event } from '@/models/domains/Event'

export interface EventRepository {
  registerEvent(event: Event): Promise<{ ok: true } | { ok: false; error: EventRepositoryError }>
}

export class EventRepositoryError {
  constructor(public readonly message: string) {}
}
