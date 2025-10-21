import { writeLog } from '@/infra/logger'
import { type EventRepository } from '@/models/entities/EventRepository'
import { type Event } from '@/models/domains/Event'
import type { Result } from '@/result'

export async function registerEventUseCase(
  repository: EventRepository,
  event: Event,
): Promise<Result<Event>> {
  const repositoryResult = await repository.registerEvent(event)

  if (!repositoryResult.ok) {
    return {
      status: 'error',
      error: {
        kind: 'Unknown',
        message: `登録に失敗しました: ${repositoryResult.error.message}`,
      },
    }
  }

  await writeLog(`✅ UseCase: 大会登録完了: ${event.getValue().title}`)

  return {
    status: 'ok',
    value: event,
  }
}
