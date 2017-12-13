"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkToken = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var checkToken = exports.checkToken = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(ctx.request.header.authorization);

            if (!validateAuth(ctx.request.header.authorization)) {
              _context.next = 7;
              break;
            }

            console.log("验证成功");
            _context.next = 5;
            return next();

          case 5:
            _context.next = 9;
            break;

          case 7:
            console.log("验证失败");
            ctx.throw(401, {}, "token 验证失败");

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function checkToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//检查header中auth的正确性


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateAuth(authorization) {
  if (authorization.substring(0, 6) === "hello " && authorization.length > 10) {
    return true;
  } else {
    return false;
  }
}