import { describe, it, expect } from 'vitest'
import { Event } from './Event'
import { HourDateTime } from '@/models/domains/HourDateTime'
import type { EventEntityType } from '@/models/types'

const createValidData = (): EventEntityType => ({
  id: crypto.randomUUID(),
  title: 'Marvelous Autumn Battle',
  hostingPrefecture: '東京都',
  matches: null,
  eventDatetime: HourDateTime.create(new Date('2025-10-22T18:00:00+09:00')),
  createdAt: new Date('2025-10-01T12:00:00+09:00'),
})

type ValidationCase = {
  label: string
  modify: (data: EventEntityType) => EventEntityType
  expectMessage: string
}

const cases: Array<ValidationCase> = [
  {
    label: 'タイトルが短すぎる',
    modify: (d) => ({ ...d, title: '短' }),
    expectMessage: '4文字以上',
  },
  {
    label: 'タイトルが長すぎる',
    modify: (d) => ({ ...d, title: 'あ'.repeat(31) }),
    expectMessage: '30文字以内',
  },
  {
    label: '開催日時が不正',
    modify: (d) => ({
      ...d,
      eventDatetime: HourDateTime.create(new Date('invalid')),
    }),
    expectMessage: '日時',
  },
]

describe('🧪 Event.validate — 正常・異常データの検証', () => {
  it('✅ 正常データはバリデーションOK', () => {
    const event = new Event(createValidData())
    const result = event.validate()
    expect(result.status).toBe('ok')
  })

  describe.each(cases)('%s', ({ modify, expectMessage }) => {
    it('🚨 異常データは ValidationError', () => {
      const invalidEvent = new Event(modify(createValidData()))
      const result = invalidEvent.validate()
      expect(result.status).toBe('error')
      if (result.status === 'error') {
        expect(result.error.message).toContain(expectMessage)
      }
    })
  })
})
