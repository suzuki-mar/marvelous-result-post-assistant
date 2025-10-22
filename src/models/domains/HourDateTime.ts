export class HourDateTime {
  private readonly value: Date

  private constructor(date: Date) {
    this.value = HourDateTime.normalize(date)
  }

  private static normalize(date: Date): Date {
    const d = new Date(date)
    d.setMinutes(0, 0, 0)
    return d
  }

  static create(date: Date): HourDateTime {
    return new HourDateTime(date)
  }

  static fromISO(isoString: string): HourDateTime {
    return new HourDateTime(new Date(isoString))
  }

  equals(other: HourDateTime): boolean {
    return this.value.getTime() === other.value.getTime()
  }

  toJSTString(): string {
    const d = this.value
    return d.toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
    })
  }

  toISOString(): string {
    return this.value.toISOString()
  }

  toDate(): Date {
    return this.value
  }
}
