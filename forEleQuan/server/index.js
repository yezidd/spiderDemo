import Koa from 'koa';
import data from './data.json';
import db from './util/db';
import router from './controller/router';

const app = new Koa();


db
  .authenticate()
  .then(() => {
    console.log('success');
  })
  .catch(err => {
    console.error('not success:', err);
  });


//加载路由
app.use(router.routes());

app.listen(3000, () => {
  console.log("----服务器启动-----");
});