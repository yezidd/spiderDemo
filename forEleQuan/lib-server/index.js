'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _data = require('data.json');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

var app = new _koa2.default();

app.use(function (ctx) {
  ctx.body = _data2.default;
});

app.listen(3000, function () {
  console.log("----服务器启动-----");
});