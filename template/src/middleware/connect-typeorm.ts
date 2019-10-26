import 'reflect-metadata'
import {
  ConnectionOptions,
  createConnection,
  Connection,
  getConnection,
} from 'typeorm'
import { Middleware } from 'koa'
import { logger } from '@/utils'
import mount from 'koa-mount'
import compose from 'koa-compose'

const connectMiddleware = (options: ConnectionOptions): Middleware => {
  let connection: Connection | null = null

  process.on('exit', () => {
    if (connection) connection.close()
    logger.info('close database connect before nodejs exit')
  })

  return async (ctx, next) => {
    if (connection && connection.isConnected) {
      await next()
      return
    }

    connection = await createConnection(options)
    await next()
  }
}

const resetDatebaseMiddleware = mount('/reset-database', async ctx => {
  const { drop = false } = ctx.query

  const connection = getConnection()
  if (drop) await connection.dropDatabase()
  await connection.synchronize()
  ctx.status = 200
})

// export default env.is.dev ? (options: ConnectionOptions) => compose([connectMiddleware(options), resetDatebaseMiddleware]) : connectMiddleware
export default (options: ConnectionOptions) =>
  compose([connectMiddleware(options), resetDatebaseMiddleware])
