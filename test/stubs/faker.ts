type FutureOptions = {
  years?: number
}

const baseDate = Date.now()

export const fakerJA = {
  lorem: {
    words(count: number): string {
      return Array.from({ length: count }, (_, idx) => `word${idx + 1}`).join(' ')
    },
  },
  date: {
    future(options: FutureOptions = {}): Date {
      const years = options.years ?? 1
      const days = years * 365
      return new Date(baseDate + days * 24 * 60 * 60 * 1000)
    },
  },
  location: {
    state(): string {
      return 'Tokyo'
    },
  },
  company: {
    name(): string {
      return 'Marvelous Arena'
    },
  },
}
