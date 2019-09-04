import { resolve } from 'path'
import Koa from 'koa'
import csp from 'koa-csp'
import logger from 'koa-logger'
import staticServer from 'koa-static'
import * as config from '@/config'
import router from '@/routes'
import connectTypeorm from '@/middleware/connect-typeorm'

export default async function(): Promise<Koa> {
  const server = new Koa()

  server
    .use(connectTypeorm(config.orm))
    .use(logger())
    .use(csp())
    .use(router.routes())
    .use(staticServer(resolve(__dirname, '../client')))

  return server
}
