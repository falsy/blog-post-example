const Router = require("koa-router");
const db = require("../db");

module.exports = () => {
  const router = new Router();
  const models = db.models;

  router.get("/list", async ctx => {
    const results = await models.boards
      .findAll()
      .map(({ id, name, content, created_at }) => {
        return { id, name, content, created_at };
      });

    ctx.body = {
      results
    };
  });

  router.post("/add", async ctx => {
    const { name, content } = ctx.request.body;

    await models.boards
      .create({
        name,
        content
      })
      .catch(e => {
        console.log(e);
      });

    ctx.status = 204;
  });

  router.post("/addList", async ctx => {
    await models.boards
      .bulkCreate([
        {
          name: "blue",
          content: "hello"
        },
        {
          name: "red",
          content: "world"
        }
      ])
      .catch(e => {
        console.log(e);
      });
    ctx.status = 204;
  });

  router.put("/update", async ctx => {
    await models.boards
      .update(
        {
          content: "hi, world"
        },
        {
          where: {
            name: "falsy"
          }
        }
      )
      .catch(e => {
        console.log(e);
      });
    ctx.status = 204;
  });

  return router;
};
