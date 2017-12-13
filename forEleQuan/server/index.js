import Koa from 'koa';
import data from './data.json';
import db from './util/db';
import router from './controller/router';

var bodyParser = require('koa-bodyparser');

const app = new Koa();


db
  .authenticate()
  .then(() => {
    console.log('success');
  })
  .catch(err => {
    console.error('not success:', err);
  });

//加载解析post参数
app.use(bodyParser());

//加载路由
app.use(router.routes());

app.listen(3000, () => {
  console.log("----服务器启动-----");
});