'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _data = require('./data.json');

var _data2 = _interopRequireDefault(_data);

var _db = require('./util/db');

var _db2 = _interopRequireDefault(_db);

var _router = require('./controller/router');

var _router2 = _interopRequireDefault(_router);

var _checkModel = require('./middleware/checkModel');

var _checkModel2 = _interopRequireDefault(_checkModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyParser = require('koa-bodyparser');

var app = new _koa2.default();

_db2.default.authenticate().then(function () {
  console.log('success');
}).catch(function (err) {
  console.error('not success:', err);
});

(0, _checkModel2.default)();

//加载解析post参数
app.use(bodyParser());

//加载路由
app.use(_router2.default.routes());

app.listen(3000, function () {
  console.log("----服务器启动-----");
});