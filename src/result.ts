export type AppError =
  | { kind: 'ValidationError'; message: string }
  | { kind: 'Conflict'; message: string }
  | { kind: 'NotFound'; message: string }
  | { kind: 'Unknown'; message?: string }

export type Result<Ok, Err extends AppError = AppError> =
  | { status: 'ok'; value: Ok }
  | { status: 'error'; error: Err }
