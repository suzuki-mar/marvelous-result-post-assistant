import { type EventRepository, EventRepositoryError } from '@/models/repositories/EventRepository'
import { type Event } from '@/models/domains/Event'
import { writeLog } from '@/infra/logger'
import type { SupabaseClient } from '@supabase/supabase-js'
import { type EventEntityType } from '@/entity-types'
import type { ToDBRow } from '@/infra/type-helper/to-db-row'

type EventRow = ToDBRow<EventEntityType>

export class EventRepositoryImpl implements EventRepository {
  constructor(private readonly client: SupabaseClient) {}

  async registerEvent(
    event: Event,
  ): Promise<{ ok: true } | { ok: false; error: EventRepositoryError }> {
    try {
      const value = event.getValue()
      const row: EventRow = {
        id: value.id,
        title: value.title,
        hosting_prefecture: value.hostingPrefecture,
        created_at: value.createdAt.toISOString(),
      }

      const { error } = await this.client.from('events').insert(row)

      if (error) {
        return { ok: false, error: new EventRepositoryError(error.message) }
      }

      await writeLog(`✅ Supabase insert success: ${value.title}`)
      return { ok: true }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error'
      return { ok: false, error: new EventRepositoryError(message) }
    }
  }
}
