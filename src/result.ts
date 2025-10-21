export type Error =
  | { kind: 'ValidationError'; message: string }
  | { kind: 'Conflict'; message: string }
  | { kind: 'NotFound'; message: string }
  | { kind: 'Unknown'; message?: string }

export type Result<Ok> = { status: 'ok'; value: Ok } | { status: 'error'; error: Error }
