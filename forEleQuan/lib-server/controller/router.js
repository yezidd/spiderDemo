'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _authMiddle = require('../middleware/authMiddle');

var _auth = require('./auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//restful API服务器的前缀
var router = new _koaRouter2.default({
  prefix: '/api/v1'
});

//想想对于router的拆分然后类似配置文件的形式，更便于管理
router.post("/login", _authMiddle.checkToken, _auth.login);

module.exports = router;