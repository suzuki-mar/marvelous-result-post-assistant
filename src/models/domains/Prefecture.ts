import type { PrefectureType } from '@/models/types/value-objects'
export type { PrefectureType } from '@/models/types/value-objects'

export class Prefecture {
  private constructor(private readonly _value: PrefectureType) {}

  static create(value: PrefectureType): Prefecture {
    return new Prefecture(value)
  }

  toString(): string {
    return this._value
  }
}
