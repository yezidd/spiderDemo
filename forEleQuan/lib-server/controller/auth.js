'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reg = exports.login = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

//登录函数
var login = exports.login = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var phone, password, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(ctx.request.body, "-----1-2-----");

            phone = ctx.request.body.phone;
            password = ctx.request.body.password;
            _context.prev = 3;
            _context.next = 6;
            return _User2.default.findOne({
              where: {
                phone: phone,
                password: password
              },
              raw: true
            });

          case 6:
            result = _context.sent;

            if (result) {
              ctx.status = 200;
              ctx.body = {
                data: {
                  token: result.token
                },
                status: "ok",
                message: "验证成功"
              };
            } else {
              ctx.status = 403;
              ctx.body = {
                status: "error",
                data: {},
                message: "用户名或者密码错误"
              };
            }
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](3);
            throw 500, { status: "服务器发生错误" }, _context.t0.message;

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 10]]);
  }));

  return function login(_x) {
    return _ref.apply(this, arguments);
  };
}();

//注册函数


var reg = exports.reg = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User2.default.create({
              phone: "17816890887",
              password: "yjs10086",
              token: "hello " + (0, _v2.default)()
            });

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2['catch'](0);
            throw 500, { status: "服务器发生错误" }, _context2.t0.message;

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 5]]);
  }));

  return function reg(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _User = require('../model/User');

var _User2 = _interopRequireDefault(_User);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }