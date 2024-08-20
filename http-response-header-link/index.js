const koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const router = require('./router');

const run = async () => {
  const app = new koa();
  const _router = router(router);

  app.use(cors());
  app.use(logger());
  app.use(koaBody());
  app.use(_router.routes());

  const port = 9999;
  const server = await app.listen(port);
  console.log(`server run ${port}`);
  return server;
}

run();