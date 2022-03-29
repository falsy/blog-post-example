const koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const app = new koa()

app.use(bodyParser())

const router = new Router()

router.post('/upload', (ctx) => {
  console.log(ctx.req)
  ctx.body = {
    success: true
  }
})

app.use(router.routes())

const port = 7777

app.listen(port)
console.log('server start port:' + port)