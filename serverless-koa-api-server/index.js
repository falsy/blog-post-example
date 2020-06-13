const Koa = require("koa");
const Router = require("koa-router");
const cors = require('@koa/cors');
const router = new Router();

const app = new Koa();
app.use(cors());

router.get('/test1', (ctx) => {
  ctx.body = 'hello';
});

router.get('/test2', (ctx) => {
  ctx.body = 'world';
});

app.use(router.routes());

app.listen(4000, () => {
  console.log(`Server is running on port 4000!`);
});