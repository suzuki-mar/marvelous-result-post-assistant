import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { registerEventUseCase } from './register-event-usecase'
import { EventRepositoryImpl } from '@/infra/repositories_impl/EventRepositoryImpl'
import { createSupabaseClient } from '@/infra/supabase-client-factory'
import { Event } from '@/models/domains/Event'
import { fakerJA as faker } from '@faker-js/faker'

type RegisterEventUseCaseTestCase = {
  label: string
  input: Event
  expected: {
    status: 'ok'
    title: string
    prefecture: string
    eventDatetime: Date
  }
}

const buildNormalCase = (): RegisterEventUseCaseTestCase => {
  const event = new Event({
    id: crypto.randomUUID(),
    title: faker.lorem.words(3),
    hostingPrefecture: faker.location.state(),
    matches: null,
    eventDatetime: faker.date.future(),
    createdAt: new Date(),
  })

  const value = event.getValue()

  return {
    label: '正常系：有効な入力を渡すと登録成功となる',
    input: event,
    expected: {
      status: 'ok',
      title: value.title,
      prefecture: value.hostingPrefecture,
      eventDatetime: value.eventDatetime,
    },
  }
}

const cases: Array<RegisterEventUseCaseTestCase> = [buildNormalCase()]

describe.each(cases)('🧪 %s', ({ input, expected }): void => {
  const repo = new EventRepositoryImpl(createSupabaseClient('test'))
  let result: Awaited<ReturnType<typeof registerEventUseCase>>
  const createdEventIds: Array<string> = []

  beforeAll(async () => {
    result = await registerEventUseCase(repo, input)
    if (result.status === 'ok') {
      createdEventIds.push(result.value.getValue().id)
    }
  })

  it('✅ ステータスが ok であること', () => {
    expect(result.status).toBe(expected.status)
  })

  it('✅ 登録結果が expected と一致すること', () => {
    if (result.status !== 'ok') {
      throw new Error(`期待した成功結果が得られませんでした: ${JSON.stringify(result)}`)
    }

    const event = result.value.getValue()
    expect(event.title).toBe(expected.title)
    expect(event.hostingPrefecture).toBe(expected.prefecture)
    expect(event.eventDatetime).toEqual(expected.eventDatetime)
  })

  afterAll(async () => {
    const client = createSupabaseClient('test')
    for (const id of createdEventIds) {
      await client.from('events').delete().eq('id', id)
    }
  })
})
