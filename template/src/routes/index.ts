import Router from 'koa-router'
import koaBody from 'koa-body'

const router = new Router()

router.use(koaBody())

export default router
