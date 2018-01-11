"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

//将uuid存储到数据库中
var saveInSql = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item, callback) {
    var match, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            match = item.url_item.match(/group_sn=([0-9|a-z]{32})/ig);

            console.log("----12---", match);

            if (!match) {
              _context.next = 22;
              break;
            }

            _context.prev = 3;
            _context.next = 6;
            return Quan.findOne({ where: { uuid: match[0].split("=")[1] }, raw: true });

          case 6:
            data = _context.sent;

            if (!data) {
              _context.next = 10;
              break;
            }

            _context.next = 12;
            break;

          case 10:
            _context.next = 12;
            return Quan.create({
              uuid: match[0].split("=")[1]
            });

          case 12:
            console.log("----完成---");
            callback(null, "完成");
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](3);

            console.log("错误---", _context.t0.message);
            callback(_context.t0, _context.t0.message);

          case 20:
            _context.next = 24;
            break;

          case 22:
            console.log("----完成无数据---");
            callback(null, "完成无数据");

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 16]]);
  }));

  return function saveInSql(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//函数主入口


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require("superagent");

var cheerio = require("cheerio");

var Async = require("async");

var fs = require("fs");

var db = require("./util/db");

var Quan = require('./model/Quan');

var url_home = "http://www.quanmama.com/quan_ele_me";

var url_data = [];

//获取到券妈妈页面的主页信息
//提取相互想要的饿了么券的项目
function getItem(callback) {
  request.get(url_home).end(function (err, res) {
    if (err) {
      console.log("发生错误");
    }
    // console.log(res.text);


    var $ = cheerio.load(res.text, { decodeEntities: false });

    $("ul#J_CouponsList").find("li").each(function (i, e) {
      var url = $(e).find("a").attr("href");
      url_data.push({
        home_url: url,
        index: i
      });
    });
    callback(null, url_data);
  });
}

function getQuanUrl(item, callback) {
  // console.log(item);
  request.get(item.home_url).end(function (err, res) {
    if (err) {
      console.log("发生错误");
    }
    var $ = cheerio.load(res.text, { decodeEntities: false });

    var urlItem = $("div.buy").find('a').attr("href");
    // console.log(decodeURIComponent(urlItem));
    url_data[item.index].url_item = decodeURIComponent(urlItem);
    callback(null, "wancheng");
  });
}function run() {
  db.authenticate().then(function () {
    console.log('success');
  }).catch(function (err) {
    console.error('not success:', err);
  });
  Async.waterfall([function (done) {
    getItem(done);
  }, function (data, done) {
    Async.eachSeries(data, getQuanUrl, function () {
      done(null, url_data);
    });
    // done(null, "完成");
  }, function (data, done) {
    Async.eachSeries(data, saveInSql, function () {
      done(null, url_data);
    });
  }], function (err, result) {
    if (err) {
      console.log("发生错误");
    }
    fs.writeFileSync("data.json", (0, _stringify2.default)(result), 'utf-8');
  });
}

run();