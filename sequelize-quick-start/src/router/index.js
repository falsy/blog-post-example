const Router = require('koa-router');
const db = require('../db');

module.exports = () => {
  const router = new Router();
  const models = db.models;

  router.get('/list', async (ctx) => {
    
  	const results = await models.boards.findAll().then(boardList => {
      return boardList.map((board) => board);
    });

    ctx.body = {
      results
    };
    
  });

  return router;
};