import { describe, it, expect } from 'vitest'
import { validateEvent } from './validators'
import type { EventPreRegisterType } from '@/entity-types'

describe('validateEvent (temporary sample test)', () => {
  it('invalid: タイトルが短い場合は ValidationError になる', () => {
    const invalid: EventPreRegisterType = {
      title: '短',
      hostingPrefecture: '東京都',
      matches: null,
    }

    const result = validateEvent(invalid)

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
      matches: [
        { name: '第1試合', order: '1' },
        { name: 'メインイベント', order: '2' },
      ],
    }

    const result = validateEvent(valid)

    expect(result.status).toBe('ok')
    if (result.status === 'ok') {
      expect(result.value.title).toBe('サンプル大会')
    }
  })
})
