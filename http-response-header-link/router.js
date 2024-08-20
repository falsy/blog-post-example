const Router = require('koa-router');

module.exports = () => {
  const router = new Router();
  
  router.get('/link-test', ctx => {
    ctx.set('Link', `<https://falsy.me>; rel="home"`);
    ctx.set('Access-Control-Expose-Headers', 'Link');

    ctx.body = {
      results: 'ok'
    };
  });

  return router;
 };