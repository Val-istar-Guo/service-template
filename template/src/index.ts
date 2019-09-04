import createServer from './create-server'
import { logger } from '@/utils'

const PORT: number = Number(process.env.PORT) || 8080
const HOST: string = process.env.HOST || '0.0.0.0'

async function start(): Promise<void> {
  logger.info('Create server')
  const server = await createServer()
  server.listen(PORT, HOST)
  logger.info(`Server start at ${HOST}:${PORT}`)
}

start()
