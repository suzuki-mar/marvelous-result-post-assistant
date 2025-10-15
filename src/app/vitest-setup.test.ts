// src/vitest-setup.test.ts
import { describe, it, expect } from 'vitest'

describe('Vitest 動作確認テスト', () => {
  it('1 + 1 は 2 になる', () => {
    expect(1 + 1).toBe(2)
  })

  it('配列に要素を追加できる', () => {
    const arr = [1, 2]
    arr.push(3)
    expect(arr).toEqual([1, 2, 3])
  })
})
