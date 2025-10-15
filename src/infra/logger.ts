export async function writeLog(message: string): Promise<void> {
  await Promise.resolve(message)
}
