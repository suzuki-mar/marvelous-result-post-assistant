import { writeLog } from '@/infra/logger'

type UpdateResultArgs = {
  matchId: string
}

export async function updateResultAction(args: UpdateResultArgs): Promise<void> {
  const message = `update:${args.matchId}`
  await writeLog(message)
  await writeLog('completed')
}
