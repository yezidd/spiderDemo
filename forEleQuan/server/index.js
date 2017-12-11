require("babel-polyfill");

import Koa from 'koa';

const app = new Koa();




app.use((ctx) => {
  ctx.body = "Hello world";
});



app.listen(3000, () => {
  console.log("----服务器启动-----");
});