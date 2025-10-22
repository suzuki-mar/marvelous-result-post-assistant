import { describe, it, expect } from 'vitest'
import { validatePreEvent } from './validators'
import type { EventPreRegisterType } from '@/models/types'
import { HourDateTime } from '@/models/domains/HourDateTime'

describe('validatePreEvent (temporary sample test)', () => {
  it('invalid: タイトルが短い場合は ValidationError になる', () => {
    const invalid: EventPreRegisterType = {
      title: '短',
      hostingPrefecture: '東京都',
      eventDatetime: HourDateTime.create(new Date('2025-10-22T18:00:00+09:00')),
      matches: null,
    }

    const result = validatePreEvent(invalid)

    expect(result.status).toBe('error')
    if (result.status === 'error') {
      expect(result.error.kind).toBe('ValidationError')
      expect(result.error.message).toContain('タイトル')
    }
  })

  it('valid: 正常な入力は ok になる', () => {
    const valid: EventPreRegisterType = {
      title: 'サンプル大会',
      hostingPrefecture: '大阪府',
      eventDatetime: HourDateTime.create(new Date('2025-10-22T18:00:00+09:00')),
      matches: [
        { name: '第1試合', order: '1' },
        { name: 'メインイベント', order: '2' },
      ],
    }

    const result = validatePreEvent(valid)

    expect(result.status).toBe('ok')
    if (result.status === 'ok') {
      expect(result.value.title).toBe('サンプル大会')
    }
  })
})
