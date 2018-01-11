"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuans = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

//插曲所有券的uuid展示到页面上
//GET offset---->20
//page  pagesize
var getQuans = exports.getQuans = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var config, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(ctx.request.query);
            config = (0, _extends3.default)({}, ctx.request.query);
            _context.prev = 2;
            _context.next = 5;
            return _Quan2.default.findAll({
              offset: Number(config.page * config.pageSize),
              limit: Number(config.pageSize),
              raw: true
            });

          case 5:
            result = _context.sent;


            ctx.status = 200;

            ctx.body = {
              status: "ok",
              message: "",
              data: result
            };
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);

            console.log(_context.t0.message);
            throw 500, {}, '服务器内部错误';

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 10]]);
  }));

  return function getQuans(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _Quan = require("../model/Quan");

var _Quan2 = _interopRequireDefault(_Quan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }