import Router from 'koa-router';
import {checkToken} from '../middleware/authMiddle';
import {login} from './auth';

//restful API服务器的前缀
const router = new Router({
  prefix: '/api/v1'
});


//想想对于router的拆分然后类似配置文件的形式，更便于管理
router.post("/login", checkToken, login);


module.exports = router;

