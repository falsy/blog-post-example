const koa = require('koa');
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());


const port = 4321;
const server = app.listen(port);
console.log('server start port:' + port);